# Apple Design System for Jekyll (Dark Mode)

本项目已使用 **Apple 设计规范（暗黑模式）**完全重写样式系统，遵循 Jekyll 官方的 Sass 集成方法。

## 📁 文件结构

```
cheneylin.github.io/
├── _sass/                          # Jekyll Sass 目录（官方标准）
│   ├── _apple-variables.scss      # Apple 设计变量（颜色、字体、间距）
│   ├── _apple-base.scss           # 基础样式重置和排版
│   ├── _apple-layout.scss         # 布局组件（导航、section、网格）
│   └── _apple-components.scss     # UI 组件（按钮、卡片、列表）
├── css/
│   └── main.scss                   # 主样式文件（导入所有模块）
└── _layouts/
    └── home.html                   # 主页布局（Apple 风格）
```

## 🎨 设计特点（暗黑模式）

### 1. **配色方案**
- **纯黑**: `#000000` - 主要背景色
- **深灰**: `#1c1c1e` - 卡片和交替 section 背景
- **浅灰**: `#f5f5f7` - 主要文本色
- **Apple Blue**: `#0a84ff` - 唯一强调色（更亮以适应暗黑模式）

### 2. **字体系统**
- **SF Pro Display**: 用于标题（20px 以上）
- **SF Pro Text**: 用于正文（19px 以下）
- 光学尺寸自动调整
- 负字距应用于所有字号

### 3. **布局特色**
- 全宽 section 交替背景色（黑/深灰）
- 毛玻璃效果导航栏（`backdrop-filter: blur(20px)`）
- 980px 最大内容宽度
- 响应式网格系统

### 4. **组件库**
- **按钮**: Primary Blue, Dark, Pill Link
- **卡片**: 带阴影和悬停效果（深色表面）
- **应用列表**: 网格布局，图标展示
- **分页**: Pill 形状按钮

## 🚀 使用方法

### 在布局中使用 Section

```html
<!-- Dark Section (Black Background) -->
<section class="section dark-section">
  <div class="wrapper">
    <h1>标题</h1>
    <p>内容...</p>
  </div>
</section>

<!-- Light Section (Dark Gray Background in Dark Mode) -->
<section class="section light-section">
  <div class="wrapper">
    <h2>标题</h2>
    <p>内容...</p>
  </div>
</section>
```

### 使用按钮组件

```html
<!-- Primary Button -->
<a href="#" class="button-primary">Buy Now</a>

<!-- Pill Link -->
<a href="#" class="pill-link">Learn More</a>

<!-- Button Group -->
<div class="button-group">
  <a href="#" class="pill-link">Learn more</a>
  <a href="#" class="button-primary">Buy</a>
</div>
```

### 使用卡片组件

```html
<div class="card">
  <h3 class="card-title">卡片标题</h3>
  <p class="card-description">卡片描述...</p>
</div>
```

### Hero Section

``html
<section class="hero-section dark-section">
  <div class="wrapper">
    <h1 class="hero-title">大标题</h1>
    <p class="hero-subtitle">副标题</p>
    <div class="button-group">
      <a href="#" class="pill-link">Learn more</a>
      <a href="#" class="button-primary">Buy</a>
    </div>
  </div>
</section>
```

### Hero Section with Background Image

```html
<section class="hero-section dark-section">
  <div class="wrapper">
    <h1 class="hero-title">大标题</h1>
    <p class="hero-subtitle">副标题</p>
    <p class="hero-credit">署名信息</p>
    <div class="button-group">
      <a href="#" class="pill-link">Learn more</a>
      <a href="#" class="button-primary">Buy</a>
    </div>
  </div>
</section>
```

**背景图片特性：**
- 图片路径：`/images/hero.jpg`
- 渐变遮罩：黑色半透明渐变（60%-70%）确保文本可读性
- 视差滚动：`background-attachment: fixed` 创建深度感
- 文本阴影：增强在复杂背景上的可读性
- 响应式：在所有设备上保持居中显示

## 📱 响应式断点

| 断点名称 | 宽度 | 用途 |
|---------|------|------|
| Mobile | < 480px | 单列布局 |
| Tablet | 480px - 834px | 双列布局 |
| Desktop | > 834px | 完整布局 |

## 🎯 关键设计原则

### ✅ Do's
- 使用 SF Pro Display（≥20px）和 SF Pro Text（<20px）
- Apple Blue (`#0a84ff`) 仅用于交互元素（暗黑模式下更亮）
- 交替使用黑色和深灰背景创建节奏感
- 使用 980px pill radius 作为 CTA 链接
- 导航栏使用毛玻璃效果
- 确保文本在深色背景上有足够的对比度

### ❌ Don'ts
- 不要引入额外的强调色
- 不要使用重阴影或多层阴影
- 不要在卡片上使用边框
- 不要对 SF Pro 使用宽字距
- 不要使用超过 700 的字重
- 避免使用纯白色文本（使用 `#f5f5f7` 以减少眼部疲劳）

## 🔧 自定义样式

如需自定义，编辑 `_sass/_apple-variables.scss` 中的变量：

```scss
// 修改主色调（暗黑模式建议使用更亮的蓝色）
$apple-blue: #0a84ff;

// 调整间距
$apple-spacing-xl: 32px;

// 更改圆角
$apple-radius-standard: 12px;

// 调整深色表面
$apple-dark-surface-1: #1c1c1e;
```

## 🌓 暗黑模式特性

### 配色反转
- **背景**: 从浅色反转为深色（黑/深灰）
- **文本**: 从深色反转为浅色（浅灰/白）
- **强调色**: 调整为更亮的蓝色以提高可见性
- **阴影**: 加深以在深色背景上保持层次感

### 可访问性
- 所有文本与背景的对比度符合 WCAG AA 标准
- 链接颜色在暗黑模式下更亮（`#409cff`）
- 焦点状态使用明亮的蓝色轮廓

## 📐 Grid 布局优化

### Post List 响应式网格

`.post-list` 使用 CSS Grid 实现自适应布局，确保在所有屏幕尺寸下都能均匀分布：

```scss
.post-list {
  display: grid;
  // Desktop: 自动填充，最小 300px
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  // Tablet (≤1024px): 固定 2 列
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Mobile (≤640px): 单列
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
```

**关键特性：**
- ✅ 等宽列：所有卡片宽度完全一致
- ✅ 等高卡片：Flexbox 确保卡片高度统一
- ✅ 无多余空白：Grid 自动调整列数以填满容器
- ✅ 平滑过渡：悬停动画和响应式切换流畅

### 修复的问题

**之前的问题：**
- 旧样式使用 `width: 50%` 和 `width: 25%` 导致不同屏幕下宽度不均
- Float 布局造成列高不一致
- 响应式断点之间出现空白区域

**现在的解决方案：**
- 使用 CSS Grid 的 `auto-fill` 和 `minmax()` 实现智能列数
- Flexbox 确保卡片内部内容垂直分布均匀
- 明确的断点控制，避免中间状态的布局问题

## 📖 参考文档

完整的设计规范详见：`.agents/apple/DESIGN.md`

## 🌐 本地开发

```bash
# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

---

**Powered by LockLive Team** | 采用 Apple 设计规范（暗黑模式）
