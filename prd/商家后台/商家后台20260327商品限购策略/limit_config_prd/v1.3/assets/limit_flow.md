```mermaid
flowchart TD
    A[用户进入商品详情页] --> B[查看商品信息]
    B --> C[点击购买按钮]

    C --> D{下单校验开始}
    D --> E[获取用户人群包]
    E --> F[筛选生效限购策略]
    F --> G{找到匹配策略?}

    G -->|是| H[计算限购值<br/>取最小值]
    H --> I{购买数量<br/>≤限购上限?}

    G -->|否| J[无限制<br/>继续下单]

    I -->|是| K[校验通过<br/>继续下单流程]
    I -->|否| L[校验失败<br/>返回限购提示]

    L --> M[前端显示提示弹窗<br/>"购买失败，本商品仅限购1件"]
    M --> N[用户确认<br/>结束流程]

    K --> O[进入订单确认页]
    O --> P[提交订单]
    P --> Q[订单创建成功]

    J --> O

    style A fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style L fill:#ffebee
    style M fill:#ffebee
    style Q fill:#e8f5e9
```