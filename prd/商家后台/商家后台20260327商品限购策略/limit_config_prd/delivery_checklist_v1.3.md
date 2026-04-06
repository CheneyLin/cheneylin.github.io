# PRD v1.3 交付清单

**交付日期：** 2026-04-06  
**版本：** v1.3  
**主题：** Vercel 设计规范全面应用

---

## 📦 交付内容

### 1. 核心文档
- ✅ `v1.3/prd_md/prd_v1.3.md` - Markdown 格式 PRD 文档（版本号更新至 v1.3）
- ✅ `v1.3/prd_html/prd_v1.3.html` - HTML 格式 PRD 主控文档（应用 Vercel 设计规范）
- ✅ `v1.3/prototype_html/admin_v1.3.html` - 商家后台管理原型（应用 Vercel 设计规范）
- ✅ `v1.3/prototype_html/app_v1.3.html` - APP 端用户界面原型（应用 Vercel 设计规范）

### 2. 资源文件
- ✅ `v1.3/assets/limit_flow.md` - 业务流程图 Mermaid 源文件

### 3. 主控文档
- ✅ `index.html` - 版本切换器默认指向 v1.3，头部样式更新为 Vercel 风格

### 4. 变更日志
- ✅ `history/qwen3_2026_04_06_09_48_v1.3_vercel_design_sync.md` - 详细变更记录

---

## 🎨 设计规范应用详情

### 字体系统
| 元素类型 | 字号 | 字重 | 字间距 | 行高 | 应用场景 |
|---------|------|------|--------|------|---------|
| Display Hero | 48px | 600 | -2.4px | 1.00 | PRD 主标题 |
| Section Heading | 32px | 600 | -1.28px | 1.25 | 章节标题 |
| Sub-heading | 24px | 600 | -0.96px | 1.33 | 卡片标题 |
| Body Large | 16px | 400 | normal | 1.50 | 正文段落 |
| Button / Link | 14px | 500 | normal | 1.43 | 按钮文本 |
| Caption | 12px | 500 | normal | 1.33 | 徽章/标签 |

### 色彩映射
| 原色彩 | Vercel 色彩 | 用途 |
|-------|------------|------|
| #333333 | #171717 (Geist Black) | 主文本/标题 |
| #666666 | #4d4d4d (Gray 600) | 次要文本 |
| #999999 | #666666 (Gray 500) | 辅助文本 |
| #e0e0e0 | #ebebeb (Gray 100) | 边框/分割线 |
| #f5f7fa | #fafafa (Gray 50) | 背景底色 |
| #667eea (Primary) | #171717 | 主要按钮 |
| #ff4d4f | #ff5b4f (Ship Red) | 价格/警示 |
| 无 | #0a72ef (Develop Blue) | 交互高亮 |

### 阴影系统
```css
/* 标准边框替代 */
--border-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

/* 卡片完整阴影栈 */
--card-shadow: 
  rgba(0,0,0,0.08) 0px 0px 0px 1px,      /* 边框层 */
  rgba(0,0,0,0.04) 0px 2px 2px,           /* 微抬升 */
  rgba(0,0,0,0.04) 0px 8px 8px -8px,      /* 环境深度 */
  #fafafa 0px 0px 0px 1px;                /* 内发光 */

/* 焦点环 */
--focus-ring: 0 0 0 2px hsla(212, 100%, 48%, 0.2);
```

### 圆角规范
| 组件类型 | 圆角值 | 示例 |
|---------|--------|------|
| 按钮/输入框 | 6px | `.btn`, `.form-control` |
| 卡片/容器 | 8px | `.card`, `.form-card` |
| Pill 徽章 | 9999px | `.badge-passed`, `.feature-id` |
| 手机框架 | 30px | `.phone-frame` |

---

## ✅ 质量检查清单

### 文档完整性
- [x] PRD Markdown 文档已创建并更新版本号
- [x] PRD HTML 文档应用新设计规范
- [x] 商家后台原型应用新设计规范
- [x] APP 端原型应用新设计规范
- [x] 资源文件已同步至新版本目录

### 版本控制
- [x] index.html 版本徽章显示 v1.3
- [x] 版本选择器 v1.3 选项带 `selected` 属性
- [x] PRD iframe src 指向 `./v1.3/prd_html/prd_v1.3.html`
- [x] 原型 iframe src 指向 `./v1.3/prototype_html/admin_v1.3.html`
- [x] JavaScript 中 `currentVersion` 初始值为 `'1.3'`

### 语法验证
- [x] prd_v1.3.html 无语法错误
- [x] admin_v1.3.html 无语法错误
- [x] app_v1.3.html 无语法错误
- [x] index.html 无语法错误

### 设计规范遵循
- [x] Geist 字体家族全局引入
- [x] 负向字间距按规范分级应用
- [x] 零传统 CSS border 声明（全部使用阴影边框）
- [x] 卡片组件使用多层阴影栈
- [x] 工作流色彩场景化应用（Ship Red 用于价格）
- [x] Pill 徽章统一使用 9999px 圆角
- [x] Focus Ring 使用蓝色焦点环
- [x] 垂直间距符合 Gallery 留白哲学（80px+）

### 功能完整性
- [x] PRD 与原型联动功能正常（postMessage 通信）
- [x] 页面切换逻辑完整（商家后台 / APP 端）
- [x] 版本切换功能正常
- [x] 可调节分隔线功能保留
- [x] localStorage 布局状态持久化保留

---

## 📊 关键指标对比

| 指标项 | v1.2 | v1.3 | 改进说明 |
|-------|------|------|---------|
| 主色调 | #667eea (紫色渐变) | #171717 (Vercel Black) | 更专业的工程化视觉 |
| 字体家族 | 系统默认 | Geist Sans | 统一的 typographic identity |
| 边框技术 | 传统 CSS border | 阴影边框 | 更平滑的视觉效果 |
| 卡片阴影 | 单层简单阴影 | 四层复合阴影栈 | 更细腻的深度表达 |
| 按钮圆角 | 4px | 6px | 更符合现代设计趋势 |
| 徽章形状 | 矩形 | Pill (9999px) | 更柔和的视觉反馈 |
| 页面边距 | 24px | 80px 40px | 更强的呼吸感与专业度 |
| 字间距 | 无特殊处理 | 严格负向追踪 | 更紧凑的工程化排版 |

---

## 🚀 使用说明

### 快速开始
1. 用浏览器打开 `index.html`
2. 默认加载 v1.3 版本（PRD + 商家后台原型）
3. 使用顶部下拉菜单切换版本
4. 使用"后台管理"/"APP 端"按钮切换产品形态
5. 拖动中间分隔线调整左右面板宽度

### 原型联动
- 在 PRD 文档中点击"查看原型"按钮
- 右侧原型面板会自动滚动并高亮对应功能模块
- 高亮效果持续 3 秒后自动消失

### 本地访问注意
- 由于使用 `file://` 协议，部分浏览器可能限制 postMessage 通信
- 如遇联动失效，请在本地服务器环境（如 `python -m http.server`）中打开

---

## 📝 变更日志摘要

**本次升级核心变更：**
1. 全面应用 Vercel Geist 设计系统
2. 字体、色彩、阴影、圆角规范化
3. 提升视觉专业度与一致性
4. 保持原有功能完整性

**详细变更记录请查阅：**
`history/qwen3_2026_04_06_09_48_v1.3_vercel_design_sync.md`

---

## 🔗 相关文档

- **设计规范源文件：** `.agents/vercel/DESIGN.md`
- **上一版本：** `v1.2/`
- **项目根目录：** `limit_config_prd/`

---

**交付确认：** 所有文件已通过语法检查，设计规范已全面应用，功能完整性已验证。✅
