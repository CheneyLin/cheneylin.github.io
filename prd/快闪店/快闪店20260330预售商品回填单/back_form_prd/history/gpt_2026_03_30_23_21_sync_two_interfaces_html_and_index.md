## 更新摘要（两界面同步）

已根据确认结果，将 H5 侧方案统一为“**表单填写** + **提交成功**”两个主界面，并同步更新 PRD HTML、原型 HTML 与主控 index 联动入口。

## 本次同步内容

- `v1.0/prd_html/prd_v1.0.html`
  - 5.1 章节改为：
    - `1.1 回填单填写（feature_01）`
    - `1.2 提交成功（feature_03）`
  - 原 `feature_02` 不再作为独立界面章节，改为 `feature_01` 内嵌提交流程描述（校验 + 提交 + 跳转成功界面）。

- `v1.0/prototype_html/h5_v1.0.html`
  - 顶部 Tab 仅保留两个入口：`回填单`、`提交成功`
  - 提交失败不再跳转“反馈页”作为独立界面，调整为提示后返回 `combined` 重试
  - `validPages` 与 tab 映射同步收敛为两界面
  - Focus 映射中 `feature_04` 兜底映射到 `combined`，避免联动失效

- `index.html`
  - 切换到 H5 原型时，默认落在 `h5_v1.0.html#combined`，与“两界面”结构保持一致

## 说明

- 为兼容历史联动，原型文件中保留了 `feature_02` 的模块锚点（作为 `feature_01` 内嵌提交模块）。
- 若后续确定彻底下线 `feature_04`，可再清理 PRD HTML 中旧章节的相关按钮与描述。

