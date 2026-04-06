# 查看原型联动 Bug 修复 - 2026-04-06

## 问题描述

点击 PRD 中的"查看原型"按钮时，右侧原型 iframe 无法正确高亮对应的功能模块。

**根本原因**：PRD 文档中的功能标识已更新为带前缀的格式（如 `h5_back_form_edit`），但原型文件中的 `data-prototype` 属性仍使用旧格式（如 `back_form_edit`），导致选择器匹配失败。

## 问题分析

### 功能标识不一致

| 位置 | 功能标识格式 | 示例 |
|------|------------|------|
| PRD 文档（prd_v1.2.html） | 带前缀的新格式 | `h5_back_form_edit`、`admin_activity_admin` |
| H5 原型（h5_v1.2.html） | 旧格式 | `back_form_edit`、`back_form_success` |
| 运营后台原型（admin_v1.2.html） | 旧格式 | `activity_admin`、`back_form_admin` |
| App 原型（app_v1.2.html） | 新格式（正确） | `app_order_list` |

### 联动流程

```
用户点击"查看原型"按钮
  ↓
PRD 发送消息: { type: 'prd-focus', id: 'h5_back_form_edit' }
  ↓
主控文档接收消息，根据前缀判断产品形态
  ↓
切换到对应的原型 iframe（h5_v1.2.html）
  ↓
发送高亮指令: { action: 'highlight', featureId: 'h5_back_form_edit' }
  ↓
原型文件尝试查找: .prototype-module[data-prototype="h5_back_form_edit"]
  ↓
❌ 找不到！因为 data-prototype="back_form_edit"
  ↓
高亮失败
```

## 修复方案

### 1. 更新 H5 原型的 data-prototype 属性

**文件**: `v1.2/prototype_html/h5_v1.2.html`

#### 变更 1.1: 回填单填写模块
```html
<!-- 变更前 -->
<div class="section prototype-module" data-prototype="back_form_edit">

<!-- 变更后 -->
<div class="section prototype-module" data-prototype="h5_back_form_edit">
```

#### 变更 1.2: 回填单成功模块
```html
<!-- 变更前 -->
<div class="section prototype-module" data-prototype="back_form_success">

<!-- 变更后 -->
<div class="section prototype-module" data-prototype="h5_back_form_success">
```

#### 变更 1.3: 更新 aliasMap（消息监听器）
```javascript
// 变更前
const aliasMap = {
    back_form_edit: 'feature_01',
    back_form_success: 'feature_03',
    feature_01: 'back_form_edit',
    feature_03: 'back_form_success'
};

// 变更后（支持新旧功能标识兼容）
const aliasMap = {
    'h5_back_form_edit': 'back_form_edit',
    'h5_back_form_success': 'back_form_success',
    'back_form_edit': 'h5_back_form_edit',
    'back_form_success': 'h5_back_form_success'
};
```

#### 变更 1.4: 更新 aliasMap（Focus Mode）
```javascript
// 变更前
const aliasMap = {
    back_form_edit: 'feature_01',
    back_form_success: 'feature_03',
    feature_01: 'back_form_edit',
    feature_03: 'back_form_success'
};

// 变更后
const aliasMap = {
    'h5_back_form_edit': 'back_form_edit',
    'h5_back_form_success': 'back_form_success',
    'back_form_edit': 'h5_back_form_edit',
    'back_form_success': 'h5_back_form_success'
};
```

### 2. 更新运营后台原型的 data-prototype 属性

**文件**: `v1.2/prototype_html/admin_v1.2.html`

#### 变更 2.1: 线下场次管理模块
```html
<!-- 变更前 -->
<tr class="prototype-module" data-prototype="activity_admin">

<!-- 变更后 -->
<tr class="prototype-module" data-prototype="admin_activity_admin">
```

#### 变更 2.2: 回填单管理模块
```html
<!-- 变更前 -->
<tr class="prototype-module" data-prototype="back_form_admin">

<!-- 变更后 -->
<tr class="prototype-module" data-prototype="admin_back_form_admin">
```

#### 变更 2.3: 更新 aliasMap
```javascript
// 变更前
const aliasMap = {
    'activity_admin': 'admin_01',
    'back_form_admin': 'admin_02',
    'admin_01': 'activity_admin',
    'admin_02': 'back_form_admin'
};

// 变更后（支持新旧功能标识兼容）
const aliasMap = {
    'admin_activity_admin': 'activity_admin',
    'admin_back_form_admin': 'back_form_admin',
    'activity_admin': 'admin_activity_admin',
    'back_form_admin': 'admin_back_form_admin'
};
```

### 3. App 原型无需修改

App 原型的 `data-prototype="app_order_list"` 已经是新格式，无需修改。

## 修复后的联动流程

```
用户点击"查看原型"按钮
  ↓
PRD 发送消息: { type: 'prd-focus', id: 'h5_back_form_edit' }
  ↓
主控文档接收消息，根据前缀判断产品形态
  ↓
切换到对应的原型 iframe（h5_v1.2.html）
  ↓
发送高亮指令: { action: 'highlight', featureId: 'h5_back_form_edit' }
  ↓
原型文件查找: .prototype-module[data-prototype="h5_back_form_edit"]
  ↓
✅ 找到！data-prototype="h5_back_form_edit"
  ↓
添加高亮样式 + 平滑滚动到目标元素
  ↓
✅ 高亮成功！
```

## 兼容性设计

### 双向映射机制

aliasMap 采用双向映射，同时支持新旧功能标识：

```javascript
const aliasMap = {
    // 新格式 → 旧格式（用于向后兼容）
    'h5_back_form_edit': 'back_form_edit',
    'h5_back_form_success': 'back_form_success',
    
    // 旧格式 → 新格式（用于向前兼容）
    'back_form_edit': 'h5_back_form_edit',
    'back_form_success': 'h5_back_form_success'
};
```

### 候选列表策略

```javascript
const fid = String(e.data.featureId);
const candidates = [fid, aliasMap[fid]].filter(Boolean);
const selector = candidates.map(id => `.prototype-module[data-prototype="${id}"]`).join(',');
const targetModule = document.querySelector(selector);
```

**工作原理**：
1. 将传入的功能标识和它的别名都加入候选列表
2. 生成 CSS 选择器：`.prototype-module[data-prototype="h5_back_form_edit"], .prototype-module[data-prototype="back_form_edit"]`
3. 浏览器会按顺序查找，只要有一个匹配就返回

**优势**：
- ✅ 支持新功能标识（`h5_back_form_edit`）
- ✅ 兼容旧功能标识（`back_form_edit`）
- ✅ 无需担心历史遗留代码或外部引用

## 测试验证

### 场景 1: H5 回填单填写
- **操作**: 点击 PRD 中"5.1.1 回填单填写"的"查看原型"按钮
- **预期**: 右侧切换到 H5 原型，滚动到回填单填写模块并高亮
- **结果**: ✅ 通过

### 场景 2: H5 回填单成功弹层
- **操作**: 点击 PRD 中"5.1.2 回填单成功弹层"的"查看原型"按钮
- **预期**: 右侧切换到 H5 原型，滚动到成功弹层模块并高亮
- **结果**: ✅ 通过

### 场景 3: 运营后台线下场次管理
- **操作**: 点击 PRD 中"5.2.1 快闪店 - 线下场次管理"的"查看原型"按钮
- **预期**: 右侧切换到运营后台原型，滚动到场次管理表格行并高亮
- **结果**: ✅ 通过

### 场景 4: 运营后台回填单管理
- **操作**: 点击 PRD 中"5.2.2 快闪店-回填单管理"的"查看原型"按钮
- **预期**: 右侧切换到运营后台原型，滚动到回填单管理表格行并高亮
- **结果**: ✅ 通过

### 场景 5: App 订单列表
- **操作**: 点击 PRD 中"5.3.1 快闪店订单列表"的"查看原型"按钮
- **预期**: 右侧切换到 App 原型，滚动到订单列表模块并高亮
- **结果**: ✅ 通过

### 场景 6: 跨产品形态切换
- **操作**: 当前显示 H5 原型，点击运营后台功能的"查看原型"
- **预期**: 
  1. 先切换到运营后台原型
  2. 等待加载完成
  3. 高亮对应模块
- **结果**: ✅ 通过

### 场景 7: Focus Mode URL 参数
- **操作**: 访问 `h5_v1.2.html?focus=h5_back_form_edit`
- **预期**: 直接进入回填单填写页面并高亮对应模块
- **结果**: ✅ 通过

## 技术要点

### 1. CSS 选择器组合

```javascript
const selector = candidates.map(id => `.prototype-module[data-prototype="${id}"]`).join(',');
```

生成的选择器示例：
```css
.prototype-module[data-prototype="h5_back_form_edit"], 
.prototype-module[data-prototype="back_form_edit"]
```

**优势**：
- 浏览器原生支持，性能优异
- 按顺序查找，第一个匹配即返回
- 支持任意数量的候选项

### 2. 异步加载处理

```javascript
protoFrame.addEventListener('load', () => {
  if (!pendingHighlightId) return;
  protoFrame.contentWindow.postMessage({ action: 'highlight', featureId: pendingHighlightId }, '*');
  pendingHighlightId = null;
});
```

**工作流程**：
1. 切换原型时，设置 `pendingHighlightId`
2. 监听 iframe 的 `load` 事件
3. 加载完成后发送高亮指令
4. 清除 `pendingHighlightId`

**避免的问题**：
- ❌ 在原型未加载时发送高亮指令（无效）
- ❌ 重复发送高亮指令（浪费资源）

### 3. 页面可见性检查（运营后台）

```javascript
const pageSection = targetModule.closest('.page-section');
if (pageSection && pageSection.id && pageSection.id.startsWith('page-')) {
    showPage(pageSection.id.replace('page-', ''));
}
```

**必要性**：
- 运营后台采用 Tab 切换机制，不同功能模块在不同页面
- 如果目标模块在隐藏的页面中，用户看不到高亮效果
- 先切换到对应页面，再执行高亮

## 影响范围

### 修改的文件

| 文件 | 变更类型 | 行数变化 |
|------|---------|---------|
| `h5_v1.2.html` | data-prototype 属性更新 + aliasMap 更新 | ~10 行 |
| `admin_v1.2.html` | data-prototype 属性更新 + aliasMap 更新 | ~8 行 |

### 未修改的文件

| 文件 | 原因 |
|------|------|
| `app_v1.2.html` | 已是新格式，无需修改 |
| `prd_v1.2.html` | 功能标识已正确 |
| `index.html` | 主控逻辑已正确 |

## 后续优化建议

1. **统一功能标识规范**
   - 建立功能标识命名规范文档
   - 所有新项目必须遵循前缀规范

2. **自动化检测工具**
   - 开发脚本自动检测 PRD 和原型的功能标识一致性
   - CI/CD 流程中加入校验步骤

3. **功能标识注册表**
   - 创建中央注册表，统一管理所有功能标识
   - 自动生成映射关系和文档

4. **版本迁移指南**
   - 提供从旧格式到新格式的迁移脚本
   - 记录所有历史版本的标识映射关系