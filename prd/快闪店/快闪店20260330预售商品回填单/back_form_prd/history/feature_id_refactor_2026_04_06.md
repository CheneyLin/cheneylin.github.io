# 功能标识规范化升级 - 2026-04-06

## 变更概述

为所有功能标识添加产品形态前缀（`h5_`、`admin_`、`app_`），优化主控文档的原型切换逻辑。

## 变更详情

### 1. 功能标识重命名

#### H5 回填单端
- `back_form_edit` → `h5_back_form_edit`
- `back_form_success` → `h5_back_form_success`

#### 运营后台端
- `activity_admin` → `admin_activity_admin`
- `back_form_admin` → `admin_back_form_admin`

#### App 端
- `app_order_list` （保持不变，已有前缀）

### 2. 更新的文件

| 文件 | 变更内容 |
|------|----------|
| `v1.2/prd_md/prd_v1.2.md` | 更新功能清单表格和详细方案中的功能标识 |
| `v1.2/prd_html/prd_v1.2.html` | 更新功能模块 ID、显示文本和按钮 onclick 事件 |
| `index.html` | 优化原型切换逻辑，根据前缀自动判断目标产品形态 |

### 3. 主控文档逻辑优化

**变更前**：
```javascript
// 简单的字符串包含判断
if (fid.includes('admin')) targetProduct = 'admin';
else if (fid.includes('app')) targetProduct = 'app';
```

**变更后**：
```javascript
// 使用前缀精确匹配
if (fid.startsWith('admin_')) {
  targetProduct = 'admin';
} else if (fid.startsWith('app_')) {
  targetProduct = 'app';
} else if (fid.startsWith('h5_')) {
  targetProduct = 'h5';
}
```

**优势**：
- ✅ 避免误判（例如：`app_order_list` 不会误判为包含 "admin"）
- ✅ 更清晰的语义表达
- ✅ 易于扩展新的产品形态

### 4. 功能标识映射表

| 功能标识 | 产品形态 | 原型文件 | 说明 |
|---------|---------|---------|------|
| `h5_back_form_edit` | H5 | `h5_v1.2.html` | 回填单填写页面 |
| `h5_back_form_success` | H5 | `h5_v1.2.html` | 回填单成功弹层 |
| `admin_activity_admin` | 运营后台 | `admin_v1.2.html` | 线下场次管理 |
| `admin_back_form_admin` | 运营后台 | `admin_v1.2.html` | 回填单管理 |
| `app_order_list` | App | `app_v1.2.html` | 订单列表页 |

## 测试验证

### 场景 1：点击 H5 功能"查看原型"
- **操作**：在 PRD 中点击 `h5_back_form_edit` 的"查看原型"按钮
- **预期**：右侧 iframe 切换到 `h5_v1.2.html`
- **结果**：✅ 通过

### 场景 2：点击运营后台功能"查看原型"
- **操作**：在 PRD 中点击 `admin_activity_admin` 的"查看原型"按钮
- **预期**：右侧 iframe 切换到 `admin_v1.2.html`
- **结果**：✅ 通过

### 场景 3：点击 App 功能"查看原型"
- **操作**：在 PRD 中点击 `app_order_list` 的"查看原型"按钮
- **预期**：右侧 iframe 切换到 `app_v1.2.html`
- **结果**：✅ 通过

### 场景 4：跨产品形态切换
- **操作**：当前显示 H5 原型，点击运营后台功能的"查看原型"
- **预期**：先切换到运营后台原型，再高亮对应功能模块
- **结果**：✅ 通过

## 向后兼容性

- ⚠️ **破坏性变更**：旧的功能标识已废弃
- 📌 **影响范围**：仅 v1.2 版本
- 🔧 **迁移建议**：如需引用历史版本的功能标识，请使用对应的 v1.0 或 v1.1 版本

## 未来规划

建议在后续版本中：
1. 建立功能标识命名规范文档
2. 添加功能标识注册表，统一管理
3. 实现功能标识到原型文件的自动映射