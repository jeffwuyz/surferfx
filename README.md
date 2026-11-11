# 冲浪者量化集团网站

集团域名：www.surferfx.com。首版包含四大业务板块：策略研发、全球行情、交易信号、AI基础设施。AI基础设施下分数据服务与智算服务。

## 页面与功能

- 58个中文及英文内容页，另有入口与404页。
- 首页、5项策略详情、4项业务详情、研究中心、7篇双语研究指南及8篇黄金甲中文原文。
- 集团介绍、全球网络、附来源与日期的历史实盘摘要。
- 研究中心全站关键词搜索、策略分类筛选、响应式导航、对应页面语言切换。
- 咨询内容整理和复制，微信及WhatsApp联系二维码。
- 独立页面地址、标题、描述、双语链接和站点地图。

咨询工具不接收或发送后台线索，也不模拟提交成功；用户复制内容后自行通过微信或WhatsApp发送。此版本未包含会员、支付、交易执行、实时绩效接口或可视化内容后台。

## 本地开发

无第三方运行依赖。需要Node.js与Python 3。

```sh
node scripts/assets.mjs
node scripts/build.mjs
node scripts/check.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

打开 http://127.0.0.1:4173/zh/ 。

- `src/content.mjs`：业务、策略、研究文章的中英文内容。
- `scripts/build.mjs`：页面模板及静态页面生成。
- `src/style.css`：响应式视觉与样式。品牌色、字号和间距由文件顶部的变量定义。
- [网站视觉识别规范](docs/网站视觉识别规范.html)：标志用法、配色、双语排版、组件与页面示例。
- `src/app.js`：菜单、筛选、咨询交互。
- `scripts/assets.mjs`：原创矢量图形生成。
- `dist/`：完整部署目录。

二维码来自本项目已有宣传资产。正式运营时可替换为最新团队联系二维码。

## 正式网站

[中文官网](https://www.surferfx.com/zh/) · [English](https://www.surferfx.com/en/)
