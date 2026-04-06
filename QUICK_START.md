# 🚀 快速开始 - Apple 设计风格

## 立即查看效果

### 1. 启动本地服务器

```bash
# 在项目根目录执行
bundle exec jekyll serve
```

### 2. 访问页面

打开浏览器访问：
- **主页**: http://localhost:4000/
- **组件展示**: http://localhost:4000/design-showcase.html
- **文档**: http://localhost:4000/APPLE_DESIGN_SYSTEM.md

## 🎨 核心特性一览

### ✨ 视觉特色
- 🖤 **交替背景**: 黑色 (#000000) ↔ 浅灰 (#f5f5f7)
- 🔵 **Apple Blue**: #0071e3（唯一强调色）
- 🪟 **毛玻璃导航**: backdrop-filter: blur(20px)
- 📐 **980px 内容宽度**: 经典 Apple 布局

### 📝 字体系统
- **SF Pro Display**: 标题（≥20px）
- **SF Pro Text**: 正文（<20px）
- **负字距**: 所有字号都应用
- **光学尺寸**: 自动适应字号

### 🧩 可用组件

#### 按钮
```html
<a href="#" class="button-primary">Primary</a>
<a href="#" class="button-dark">Dark</a>
<a href="#" class="pill-link">Learn More</a>
```

#### Section
```html
<section class="section dark-section">...</section>
<section class="section light-section">...</section>
<section class="hero-section dark-section">...</section>
```

#### 卡片
```html
<div class="card">
  <h3 class="card-title">Title</h3>
  <p class="card-description">Description</p>
</div>
```

## 📱 响应式测试

调整浏览器窗口大小，观察：
- **< 480px**: 单列布局 + 汉堡菜单
- **480-834px**: 双列网格
- **> 834px**: 三列网格 + 完整导航

## 🎯 下一步

1. **阅读完整文档**: [APPLE_DESIGN_SYSTEM.md](APPLE_DESIGN_SYSTEM.md)
2. **查看组件示例**: [design-showcase.html](design-showcase.html)
3. **了解设计理念**: [.agents/apple/DESIGN.md](.agents/apple/DESIGN.md)

## 💡 提示

- 样式更改后，Jekyll 会自动重新编译
- 修改 `_sass/` 中的文件会立即生效
- 清除浏览器缓存以查看最新样式

---

**享受全新的 Apple 风格网站！** 🎉
