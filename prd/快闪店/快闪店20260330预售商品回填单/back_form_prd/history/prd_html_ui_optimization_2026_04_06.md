# PRD HTML 界面优化 - 2026-04-06

## 变更概述

优化 PRD HTML 文档的界面展示，删除冗余的英文功能标识，修复定位联动功能。

## 变更详情

### 1. 删除英文功能标识显示

**变更前**：
```html
<h3>5.1.1 回填单填写（h5_back_form_edit） 
  <span class="feature-id">h5_back_form_edit</span> 
  <button class="highlight-btn" onclick="highlightFeature('h5_back_form_edit')">查看原型</button>
</h3>
```

**变更后**：
```html
<h3>5.1.1 回填单填写 
  <button class="highlight-btn" onclick="highlightFeature('h5_back_form_edit')">查看原型</button>
</h3>
```

**影响范围**：
- ✅ 删除标题括号内的英文标识：`（h5_back_form_edit）`
- ✅ 删除 `<span class="feature-id">` 标签及其内容
- ✅ 保留 `id` 属性用于锚点定位
- ✅ 保留按钮的 `onclick` 事件用于联动

### 2. 修复缺失的章节内容

补充了以下缺失的章节：
- ✅ **6. 业务流程图**：包含用户端、运营端、App 订单查看三个流程图
- ✅ **7. 异常与边界处理**：8 个异常场景的处理方案
- ✅ **8. 数据追踪与埋点**：9 个埋点事件定义
- ✅ **9. 未来演进规划**：v1.3-v1.5 版本规划
- ✅ **10. 附件**：相关参考文档清单

### 3. 修复 JavaScript 代码

添加了完整的 `<script>` 标签：
```javascript
<script>
  mermaid.initialize({ startOnLoad: true });
  
  function highlightFeature(featureId) {
    // 发送消息给父窗口，触发原型高亮
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'prd-focus', id: featureId }, '*');
    }
  }
</script>
```

**功能说明**：
- 初始化 Mermaid 流程图渲染引擎
- `highlightFeature()` 函数通过 `postMessage` 向父窗口（主控文档）发送消息
- 主控文档接收消息后，根据功能标识前缀自动切换到对应的产品形态原型

### 4. 更新的模块列表

| 模块 | 功能标识 | 标题显示 | 状态 |
|------|---------|---------|------|
| 5.1.1 | `h5_back_form_edit` | 回填单填写 | ✅ 已优化 |
| 5.1.2 | `h5_back_form_success` | 回填单成功弹层 | ✅ 已优化 |
| 5.2.1 | `admin_activity_admin` | 快闪店 - 线下场次管理 | ✅ 已优化 |
| 5.2.2 | `admin_back_form_admin` | 快闪店-回填单管理 | ✅ 已优化 |
| 5.3.1 | `app_order_list` | 快闪店订单列表 | ✅ 已优化 |

## 视觉效果对比

### 变更前
```
5.1.1 回填单填写（h5_back_form_edit） [h5_back_form_edit] [查看原型]
```
- ❌ 信息重复（标题括号 + span 标签）
- ❌ 视觉混乱（多个标识堆叠）
- ❌ 占用过多空间

### 变更后
```
5.1.1 回填单填写 [查看原型]
```
- ✅ 简洁清晰
- ✅ 重点突出
- ✅ 节省空间

## 定位联动机制

### 工作流程

1. **用户点击"查看原型"按钮**
   ```
   用户在 PRD 中点击某个功能的"查看原型"按钮
   ```

2. **触发 highlightFeature 函数**
   ```javascript
   onclick="highlightFeature('h5_back_form_edit')"
   ↓
   调用 highlightFeature('h5_back_form_edit')
   ```

3. **发送消息到父窗口**
   ```javascript
   window.parent.postMessage({ 
     type: 'prd-focus', 
     id: 'h5_back_form_edit' 
   }, '*');
   ```

4. **主控文档接收并处理**
   ```javascript
   // index.html 中的监听器
   window.addEventListener('message', (e) => {
     const fid = e.data.id; // 'h5_back_form_edit'
     
     // 根据前缀判断产品形态
     if (fid.startsWith('h5_')) {
       targetProduct = 'h5';
     }
     
     // 切换原型 iframe
     switchProduct('h5');
     
     // 等待加载完成后发送高亮指令
     protoFrame.contentWindow.postMessage({ 
       action: 'highlight', 
       featureId: 'h5_back_form_edit' 
     }, '*');
   });
   ```

5. **原型文件接收并高亮**
   ```javascript
   // h5_v1.2.html 中的监听器
   window.addEventListener('message', (e) => {
     if (e.data.action === 'highlight') {
       const element = document.getElementById(e.data.featureId);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
         element.style.boxShadow = '0 0 0 3px #667eea';
         setTimeout(() => {
           element.style.boxShadow = '';
         }, 2000);
       }
     }
   });
   ```

## 技术优势

### 1. 跨域通信安全
- 使用 `postMessage` API 实现跨 iframe 通信
- 通过 `window.parent !== window` 检查确保在 iframe 环境中执行
- 消息格式标准化：`{ type: 'prd-focus', id: featureId }`

### 2. 智能路由判断
- 主控文档根据功能标识前缀自动判断目标产品形态
- 支持 `h5_`、`admin_`、`app_` 三种前缀
- 避免硬编码映射关系，易于扩展

### 3. 异步加载处理
- 使用 `pendingHighlightId` 变量缓存待高亮的功能 ID
- 监听 iframe 的 `load` 事件，确保原型加载完成后再发送高亮指令
- 避免在原型未加载时发送无效的高亮消息

### 4. 用户体验优化
- 平滑滚动到目标元素：`scrollIntoView({ behavior: 'smooth' })`
- 临时高亮效果：蓝色边框闪烁 2 秒后消失
- 自动切换产品形态，无需手动选择

## 测试验证

### 场景 1：H5 功能联动
- **操作**：点击"5.1.1 回填单填写"的"查看原型"按钮
- **预期**：右侧切换到 H5 原型，滚动到对应模块并高亮
- **结果**：✅ 通过

### 场景 2：运营后台功能联动
- **操作**：点击"5.2.1 快闪店 - 线下场次管理"的"查看原型"按钮
- **预期**：右侧切换到运营后台原型，滚动到对应模块并高亮
- **结果**：✅ 通过

### 场景 3：App 功能联动
- **操作**：点击"5.3.1 快闪店订单列表"的"查看原型"按钮
- **预期**：右侧切换到 App 原型，滚动到对应模块并高亮
- **结果**：✅ 通过

### 场景 4：跨产品形态切换
- **操作**：当前显示 H5 原型，点击运营后台功能的"查看原型"
- **预期**：先切换到运营后台原型，再高亮对应模块
- **结果**：✅ 通过

## 向后兼容性

- ✅ 功能标识 ID 保持不变，仅删除显示文本
- ✅ `highlightFeature()` 函数签名不变
- ✅ 消息格式保持不变
- ✅ 主控文档兼容逻辑无需修改

## 后续优化建议

1. **添加高亮动画效果**：在原型文件中实现更丰富的视觉反馈
2. **支持键盘快捷键**：例如 `Ctrl+P` 快速查看原型
3. **添加面包屑导航**：显示当前所在的功能模块路径
4. **实现搜索功能**：快速定位到特定功能模块