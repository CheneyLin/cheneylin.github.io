# 电子吧唧 2 期 - APP 端原型文件说明

## 📁 目录结构

```
prototype_html/
├── app_prototype_v1.0.html          # 整合版原型（所有页面在一个文件中）
├── app_pages/                        # 独立页面目录
│   ├── index.html                   # 📋 导航索引页（推荐从这里开始）
│   ├── ip_list.html                 # IP 主题包列表页
│   ├── ip_detail.html               # IP 包详情页
│   ├── single_draw.html             # 单抽功能页
│   ├── ten_draw.html                # 10 连抽功能页
│   ├── badge_gallery.html           # 我的吧唧图库页
│   └── badge_delivery.html          # 申请邮寄页
└── assets/                           # 共享资源目录
    ├── app_styles.css               # 共享样式表
    └── app_scripts.js               # 共享脚本
```

## 🎯 使用方式

### 方式一：独立页面模式（推荐）

1. **打开导航页**：在浏览器中打开 `app_pages/index.html`
2. **点击卡片**：点击任意页面卡片即可跳转到对应的独立页面
3. **页面间跳转**：每个页面内部的按钮和链接会自动跳转到其他相关页面

**优点**：
- ✅ 每个页面都是独立的 HTML 文件，便于单独查看和测试
- ✅ 代码结构清晰，易于维护和修改
- ✅ 可以单独分享某个页面的链接

### 方式二：整合版模式

直接在浏览器中打开 `app_prototype_v1.0.html`，所有页面都在一个文件中，通过右上角的"全局视图"按钮切换显示模式。

**优点**：
- ✅ 单文件部署，便于分享
- ✅ 支持全局视图，一次性查看所有页面布局

## 📄 页面说明

### 1. IP 主题包列表页 (`ip_list.html`)
- **功能**：展示所有可抽选的 IP 包
- **特性**：
  - 排序标签（热门/新品/即将结束）
  - IP 包卡片展示（封面、名称、图片数量、价格）
  - 底部 TabBar 导航

### 2. IP 包详情页 (`ip_detail.html`)
- **功能**：展示单个 IP 包的详细信息
- **特性**：
  - IP 包封面大图
  - 收集进度条
  - **概率公示表格**（SSR 2%、SR 18%、R 80%）
  - 三种购买选项（单抽、10连抽、整包购买）

### 3. 单抽功能页 (`single_draw.html`)
- **功能**：单次抽选界面
- **特性**：
  - 抽选动效区域（渐变背景 + 旋转粒子效果）
  - 显示消耗免费次数
  - 抽选结果弹窗

### 4. 10 连抽功能页 (`ten_draw.html`)
- **功能**：批量抽选界面
- **特性**：
  - 展示 10 张图片结果网格
  - 突出显示保底 SSR 图片
  - 必中 SR 及以上等级提示

### 5. 我的吧唧图库页 (`badge_gallery.html`)
- **功能**：展示用户已拥有的吧唧图片
- **特性**：
  - Tab 切换（已拥有/待解锁）
  - 收集进度展示
  - 图片网格布局（2列）
  - 等级标签（SSR/SR/R）
  - 合并升级弹窗

### 6. 申请邮寄页 (`badge_delivery.html`)
- **功能**：填写收货地址，申请稀有吧唧实体配送
- **特性**：
  - SSR/SR 吧唧信息展示
  - 地址表单（收货人、手机、地区、详细地址）
  - 提交申请功能

## 🎨 技术栈

- **CSS 框架**：Tailwind CSS 2.2.19
- **图标库**：Font Awesome 6.0.0
- **手机框架**：固定尺寸 375px × 812px（iPhone X 比例）
- **样式管理**：外部 CSS 文件（`assets/app_styles.css`）
- **交互逻辑**：外部 JavaScript 文件（`assets/app_scripts.js`）

## 🔧 共享资源说明

### app_styles.css
包含所有 APP 端原型的通用样式：
- 手机框架样式
- 导航栏、TabBar 样式
- 卡片、按钮、表单样式
- 等级标签样式（SSR/SR/R）
- 弹窗样式
- 抽选动效样式
- Toast 提示样式

### app_scripts.js
包含所有通用交互逻辑：
- `showPage(pageId)` - 页面切换函数
- `toggleGlobalView()` - 全局视图切换
- `showDrawResult(type)` - 显示抽选结果弹窗
- `showMergeUpgrade()` - 显示合并升级弹窗
- `closeModal()` - 关闭弹窗
- `handlePackPurchase()` - 整包购买处理
- `submitDelivery()` - 提交邮寄申请
- `showToast(message)` - 显示 Toast 提示

## 📝 开发建议

### 修改样式
如需修改全局样式，请编辑 `assets/app_styles.css` 文件，所有页面会自动应用更新。

### 添加新页面
1. 在 `app_pages/` 目录下创建新的 HTML 文件
2. 引入共享资源：
   ```html
   <link href="../assets/app_styles.css" rel="stylesheet">
   <script src="../assets/app_scripts.js"></script>
   ```
3. 使用标准的页面结构（参考现有页面）

### 修改交互逻辑
如需修改通用交互逻辑，请编辑 `assets/app_scripts.js` 文件。

## 🚀 快速开始

1. **查看所有页面**：打开 `app_pages/index.html`
2. **查看整合版**：打开 `app_prototype_v1.0.html`
3. **查看单个页面**：直接打开 `app_pages/` 下的任意 HTML 文件

## 📞 技术支持

如有问题或建议，请联系项目团队。

---

**最后更新**：2026-04-08  
**版本**：v1.0
