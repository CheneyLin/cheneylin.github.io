# XML报表规则生成工具

## 项目概述

这是一个基于Web技术开发的小工具，用于生成指定格式的JSON数据。主要用于数据上报模块的配置文件生成。

## 功能需求

### 1. 输入模块
- 用户输入 `mod_type`（模块英文标识）
- 自动生成符合格式的JSON骨架

### 2. JSON数据格式
```json
{
  "mod_type": "likelist_history",
  "mod_id": "likelist_history",
  "$slot_content": ["title"],
  "goods_id": ["goods_id"],
  "$extra": {
    "jump_url": ["jumpUrl"]
  }
}
```

### 3. 核心功能
- **自动生成**：根据输入的mod_type生成JSON骨架
- **二次编辑**：支持用户在生成的JSON基础上进行修改
- **JSON验证**：检验JSON格式是否正确
- **本地保存**：支持将生成的JSON保存到本地文件

## UI设计

### 布局结构
- 顶部：标题和说明
- 左侧：输入区域（mod_type输入框 + 生成按钮）
- 中间：JSON编辑器（支持语法高亮）
- 右侧：操作按钮（验证、保存、复制等）
- 底部：状态栏/提示信息

### 交互流程
1. 用户输入 mod_type
2. 点击"生成"按钮
3. 系统自动填充JSON骨架
4. 用户可编辑JSON内容
5. 点击"验证"检查格式
6. 点击"保存"下载JSON文件

## 技术实现

- 纯HTML/CSS/JavaScript实现
- 使用Textarea作为JSON编辑器
- 使用File API实现本地保存功能
- 使用JSON.parse进行格式验证

## 实施计划

- [x] 创建项目文档 project.md
- [ ] 实现HTML页面结构
- [ ] 实现CSS样式美化
- [ ] 实现JavaScript逻辑
- [ ] 测试验证功能