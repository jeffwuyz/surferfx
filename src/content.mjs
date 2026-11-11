export const business = [
 {id:'research',imageAlt:['研究者在价格图上标注关键价位的示意图','Illustration of a researcher marking price levels on a chart'],pageTitle:['GoldArmor AI 黄金与多资产策略研发','GoldArmor AI strategy research for gold and other assets'],n:'01',icon:'wave',name:['策略研发','Strategy research'],brand:'GoldArmor AI',desc:['让交易逻辑，经得起研究。','Trading logic. Built on research.'],body:['从市场观察到策略设计，围绕黄金与多资产市场探索规则化执行、AI辅助分析和风险管理。','From market observation to strategy design, exploring systematic execution, AI-assisted analysis and risk management across gold and multi-asset markets.'],url:'https://www.goldarmorai.com/',bullets:[['策略设计与验证','Strategy design & validation'],['自动化执行研究','Automated execution research'],['版本与风险管理','Version & risk management']]},
 {id:'markets',imageAlt:['世界地图和跨市场报价屏示意图','Illustration of a world map and global market quotes'],pageTitle:['股票、期货、黄金与外汇行情研究','Equity, futures, gold and forex market research'],n:'02',icon:'chart',name:['全球行情','Global markets'],brand:'VIS Markets',desc:['从全球视野，理解市场变化。','A global perspective on market change.'],body:['通过 VIS Markets 了解股票、期货、黄金、外汇与数字资产行情。比较历史数据时，先确认交易时段、报价单位以及股票复权和期货换月的处理方式。','Explore equities, futures, gold, forex and digital assets with VIS Markets. When comparing price histories, check trading hours, quote units, equity price adjustments and futures rolls.'],url:'https://www.vismarkets.com/',bullets:[['股票行情与复权','Equity prices and adjustments'],['期货合约与换月','Futures contracts and rolls'],['黄金与外汇报价','Gold and forex quotes']],
  details:[
    ['拆股或分红会改变历史价格的比较口径。研究一只股票的长期走势时，要记录数据使用原始收盘价还是复权价，以及复权处理了哪些公司行动。','Splits and dividends affect historical comparisons. When studying a stock, record whether the series uses raw or adjusted closes and which corporate actions the adjustment covers.'],
    ['同一品种有不同到期月份。比较期货价格前，先看合约代码与到期日。使用连续合约时，还要了解换月日期与价格拼接规则。','The same underlying can have multiple delivery months. Check the contract code and expiry. For a continuous series, also check when the data rolls and how prices are joined.'],
    ['比较 XAUUSD 或外汇货币对时，先对齐报价时间和时区，再确认记录的是买价、卖价还是中间价。点差会影响对策略执行成本的估计。','For XAUUSD or a currency pair, align timestamps and time zones. Identify whether a series records bids, asks or midpoints before estimating spread costs.']
  ]},
 {id:'signals',imageAlt:['研究者查看价格曲线与信号触发点的示意图','Illustration of an analyst reviewing a price curve and a marked signal'],pageTitle:['FD-Signal 交易信号研究与评估','FD-Signal trading signal research and evaluation'],n:'03',icon:'signal',name:['交易信号','Trading signals'],brand:'FD-Signal',desc:['让策略信息，更透明可理解。','Making strategy information clearer.'],body:['围绕策略研究、信号评估与专业展示，连接信号供应方、专业交易者和机构客户。','Connecting signal providers, professional traders and institutions through strategy research, signal assessment and transparent presentation.'],url:'https://www.fd-signal.com/',bullets:[['信号研究与评估','Signal research & assessment'],['历史记录与来源','Historical records & sources'],['供应商合作对接','Provider collaboration']]},
 {id:'infrastructure',imageAlt:['数据中心服务器机柜通道示意图','Illustration of a data-center aisle lined with server racks'],pageTitle:['量化研究的 AI 算力与数据服务','AI compute and data services for quantitative research'],n:'04',icon:'grid',name:['AI基础设施','AI infrastructure'],brand:'Data · Compute · Infrastructure',desc:['为每一次研究，提供运行基础。','The foundation behind every study.'],body:['汇聚数据库、AI算力、服务器与机房服务，为量化研究与智能交易提供数据、算力及部署运维支持。','Bringing together databases, AI compute, servers and data-center services to support quantitative research, deployment and operations.'],bullets:[['数据服务与研究支持','Data & research support'],['AI算力与机房服务','AI compute & data centers'],['部署与运行维护','Deployment & operations']]}
];
export const strategies = [
  {
    id: "goldarmor",
    pageTitle: ["黄金甲策略：XAUUSD 黄金 EA 的突破逻辑", "GoldArmor strategy: how the XAUUSD gold EA trades breakouts"],
    name: ["黄金甲", "GoldArmor"],
    en: "GoldArmor AI",
    type: "gold",
    tag: ["黄金 · 自动化执行", "GOLD · SYSTEMATIC EXECUTION"],
    summary: ["黄金甲AI（GoldArmor AI）以 XAUUSD 为交易品种，黄金甲策略先观察多个周期的价格结构。出现突破后，程序结合趋势动量判断是否参与，再根据波动和已有持仓调整退出条件。", "GoldArmor EA monitors XAUUSD price structure across timeframes. After a breakout, momentum informs entry and volatility and open positions guide the exit."],
    logic: ["同一段黄金涨跌在不同周期上可能呈现不同结构。黄金甲先检查多个周期的突破条件，再判断价格方向与动量是否支持信号。符合该版本规则时，程序处理下单、持仓和退出。具体启用的分析功能以对应版本为准。", "A gold price move can look different across timeframes. GoldArmor checks breakout conditions at several levels, then evaluates direction and momentum. When its rules are met, the EA handles orders, open positions and exits. The available analysis features depend on the version."],
    risk: ["波动和持仓结构会改变止损及退出条件。若报价跳空、流动性下降或多笔指令接连成交，实际退出价格与预设价格可能不同。核对回撤时，要确认账户、版本和统计区间。", "Volatility and existing positions affect the exit rules. Price gaps, thin liquidity or a cluster of fills can move the exit away from its intended price. Match the account, strategy version and reporting period when reviewing drawdown."],
    env: ["官网列出的参考环境为 XAUUSD 和 ECN 账户。对高频执行，点差、佣金及下单延迟都会影响实际成本。下表沿用黄金甲官网引用的 2026 年 9 月 6 日项目资料。", "The product site describes an ECN account trading XAUUSD. Spreads, commissions and order latency affect the cost of frequent execution. The figures below come from project materials cited by GoldArmor for September 6, 2026."],
    source: ["黄金甲官方网站", "GoldArmor official website"],
    url: "https://www.goldarmorai.com/goldarmor-ea/",
    record: "https://www.goldarmorai.com/#performance",
    origin: ["集团业务品牌", "Group business brand"],
    artAlt: ["黄金甲盾牌、头盔与金色 K 线品牌标志", "GoldArmor shield and helmet with gold candlesticks"],
    activity: ["100–200 手 / 日", "100–200 lots / day"],
    capital: "100,000",
    stop: ["1%–10%（资料止损区间）", "1%–10% (documented stop range)"],
    markets: "XAUUSD",
  },
  {
    id: "surfer",
    pageTitle: ["冲浪者外汇 EA：多货币对组合策略", "Surfer forex EA: a multi-pair trading strategy"],
    name: ["冲浪者", "Surfer"],
    en: "Surfer",
    type: "fx",
    tag: ["外汇 · 组合策略", "FX · MULTI-PAIR STRATEGY"],
    summary: ["冲浪者外汇 EA（Surfer EA）组合交易欧美、镑美、美日和美瑞四个货币对。波段延续时跟踪止盈，行情转为极端单边走势时可触发锁仓；判断风险要看四组持仓合计的美元敞口。", "Surfer EA trades four USD currency pairs as a portfolio. It trails profits during sustained moves and can lock positions in extreme trends. The combined USD exposure matters across all four pairs."],
    logic: ["系统随行情节奏在顺势和逆势布局之间切换。波段延续时，追踪止盈随价格调整；极端单边走势可触发反向锁仓。经典版、前进版与百万版的加仓和解锁规则需按各自版本核对。", "The system switches between trend-following and counter-trend positioning. As a swing extends, the trailing exit adjusts with price. An extreme directional move can trigger an offsetting position. Scaling and unlocking rules depend on the Classic, Radical or Million version."],
    risk: ["四组货币对都包含美元。如果组合同时在多个货币对上买入美元，这些头寸会放大同一方向的敞口。锁仓期间仍需承担交易成本和保证金占用；部分历史版本还含有亏损后加仓机制。", "All four pairs include the US dollar. Buying dollars across several pairs concentrates the same directional exposure. Locked positions still use margin and incur costs, and some historical versions add to losing positions."],
    env: ["资料列出欧元/美元、英镑/美元、美元/日元和美元/瑞郎，日成交量约 100 手。复核组合时，应同时检查各货币对的合约规格、账户是否支持对冲，以及锁仓后的保证金计算方式。", "The source lists EUR/USD, GBP/USD, USD/JPY and USD/CHF, with about 100 lots of daily volume. Review contract sizes for each pair, whether the account permits hedging and how margin is calculated on locked positions."],
    source: ["《SurferFx 核心交易策略》及原有策略资料", "SurferFx Core Trading Strategies and the strategy archive"],
    origin: ["冲浪者策略系列", "Surfer strategy family"],
    artAlt: ["冲浪者原图，蓝色海浪环绕四个外汇货币对代码", "Surfer EA artwork with a blue wave and four currency pair symbols"],
    activity: ["约 100 手 / 日", "About 100 lots / day"],
    capital: "100,000",
    stop: ["1%–20%（原文单笔范围）", "1%–20% per trade in the source"],
    markets: "EURUSD · GBPUSD · USDJPY · USDCHF",
  },
  {
    id: "goldhunter",
    pageTitle: ["黄金猎人 GoldHunter 历史黄金波段突破策略", "GoldHunter historical gold swing breakout strategy"],
    name: ["黄金猎人", "GoldHunter"],
    en: "GoldHunter",
    type: "gold",
    tag: ["黄金 · 波段突破", "GOLD · SWING BREAKOUT"],
    summary: ["黄金猎人是更名前的黄金波段突破 EA。它在 XAUUSD 的短周期波动中识别多层级突破，行情加速时可连续下单，再按波动和持仓动态减仓或退出。", "GoldHunter is the historical gold breakout EA. It looks for short-cycle XAUUSD breakouts across multiple levels, can place a series of orders as momentum builds, and adjusts exposure as volatility changes."],
    logic: ["策略在短周期内跟踪黄金价格反复测试的突破位置。行情从震荡转入快速单边走势时，动量模块可连续触发多笔指令。管理对象既包括单笔交易，也包括这批交易叠加后的持仓。", "The strategy monitors breakout levels during short gold price swings. When a range gives way to a fast directional move, its momentum module can trigger several orders in succession. Exposure is managed both per trade and across the resulting group of positions."],
    risk: ["批量成交会在短时间内占用更多保证金。原文将 1%–20% 描述为单笔或阶段性止损触发区间；行情跳空、滑点或流动性变化会影响实际损失。不同历史版本的加仓规则需分别核对。", "A batch of fills can use margin quickly. The source describes 1%–20% as a stop trigger for a trade or trading phase. Gaps, slippage and liquidity affect realized losses. Position-scaling rules also vary across historical versions."],
    env: ["原文以 XAUUSD 的 ECN 账户为例，日成交量按“手”统计。一日内同一批次可以包含多笔订单，单看笔数无法判断这批订单实际占用的保证金。", "The source describes an ECN account trading XAUUSD and reports daily volume in lots. A single batch can contain several orders, so the order count alone does not describe the margin it uses."],
    source: ["《SurferFx 核心交易策略》及原有策略资料", "SurferFx Core Trading Strategies and the strategy archive"],
    origin: ["冲浪者策略系列", "Surfer strategy family"],
    artAlt: ["黄金猎人原图，猎手瞄准金条，背景为黄金行情", "GoldHunter artwork with a hunter, a gold bar and market prices"],
    activity: ["100–200 手 / 日", "100–200 lots / day"],
    capital: "100,000",
    stop: ["1%–20%（单笔或阶段性触发）", "1%–20% (trade or phase trigger)"],
    markets: "XAUUSD",
  },
  {
    id: "goldcheetah",
    pageTitle: ["黄金猎豹 GoldCheetah 黄金趋势动量策略", "GoldCheetah gold trend momentum strategy"],
    name: ["黄金猎豹", "GoldCheetah"],
    en: "GoldCheetah",
    type: "gold",
    tag: ["黄金 · 趋势动量", "GOLD · TREND MOMENTUM"],
    summary: ["黄金猎豹等待 XAUUSD 盘整后的趋势突破。价格结构与动量同时满足条件才入场，每笔开仓即设置止损，并各自完成止盈或止损退出。", "GoldCheetah waits for XAUUSD to break out after consolidation. Entry requires both price structure and momentum to qualify. Each trade opens with a stop and has its own exit."],
    logic: ["盘整期间，系统持续观察区间边界与突破动量。价格穿过边界后，只有动量过滤条件也成立，才顺着突破方向开仓。每笔交易独立完成入场、止盈或止损、退出的全过程。", "During consolidation, the EA tracks the range boundaries and the strength of a possible breakout. It trades in the breakout direction only once the momentum filter also qualifies. Each position has its own entry, take-profit or stop-loss, and exit."],
    risk: ["价格可能突破后立即回到区间，连续几次假突破会累积损失。原文的 1%–5% 是单笔止损设置范围；即使下单时已设止损，跳空或滑点仍会影响成交价格。", "A breakout can reverse back into the range, and successive false signals can compound losses. The source gives a per-trade stop setting of 1%–5%. Gaps and slippage can affect the fill even when the stop is set at entry."],
    env: ["原文以 ECN 账户交易 XAUUSD，平均每日约 1–2 笔。没有满足条件的突破时，系统继续等待。具体授权和执行环境由对应合作团队确认。", "The source describes an ECN account trading XAUUSD, averaging about one or two trades a day. The system waits when no setup qualifies. Licensing and execution arrangements are specific to the strategy partner."],
    source: ["《SurferFx 核心交易策略》及原有策略资料", "SurferFx Core Trading Strategies and the strategy archive"],
    origin: ["合作策略", "Partner strategy"],
    artAlt: ["黄金猎豹原图，金色猎豹沿突破走势跃起", "GoldCheetah artwork showing a gold cheetah leaping along a breakout"],
    activity: ["约 1–2 笔 / 日", "About 1–2 trades / day"],
    capital: "10,000",
    stop: ["1%–5%（单笔）", "1%–5% per trade"],
    markets: "XAUUSD",
  },
  {
    id: "goldowl",
    pageTitle: ["黄金猫头鹰 GoldOwl 黄金期现价差策略", "GoldOwl gold futures–spot basis strategy"],
    name: ["黄金猫头鹰", "GoldOwl"],
    en: "GoldOwl",
    type: "spread",
    tag: ["黄金 · 期现价差", "GOLD · BASIS STRATEGY"],
    summary: ["黄金猫头鹰跟踪黄金期货价与现货价之差，也就是基差。价差出现偏离时，系统在两端建立方向相反的头寸，交易结果取决于价差能否回归及双边成本。", "GoldOwl tracks the difference between gold futures and spot prices, known as the basis. When it detects a divergence, it takes opposing positions. The result depends on convergence and the cost of both legs."],
    logic: ["假设期货相对现货走高，两者之间的基差便会扩大。策略跟踪这种偏离并在满足条件时建立期现对冲。如果之后基差收窄，两端价格的相对变化才是这组交易的主要收益来源。", "If futures rise relative to spot, the basis widens. GoldOwl tracks that deviation and opens a futures–spot hedge when its conditions are met. If the basis then narrows, the relative movement between the two legs drives the result."],
    risk: ["基差可能持续扩大。即使判断方向正确，两端也可能因交易时段、流动性或成交延迟而无法同时建仓或平仓。点差、手续费和期货展期都会改变对冲后的净结果。", "The basis can keep widening. Different trading hours, thin liquidity or delays can leave one leg unfilled while the other is open. Spreads, fees and futures rolls all affect the net result."],
    env: ["原文参数表列出 XAUUSD，策略说明还涉及黄金期货一端。核对部署条件时，需要同时明确期货合约月份、两端合约规模、对冲比例与可重叠的交易时段。", "The source table lists XAUUSD, while the strategy also requires a gold futures leg. Deployment depends on the futures contract month, the size of both contracts, the hedge ratio and overlapping trading hours."],
    source: ["《SurferFx 核心交易策略》及原有策略资料", "SurferFx Core Trading Strategies and the strategy archive"],
    origin: ["合作策略", "Partner strategy"],
    artAlt: ["黄金猫头鹰原图，猫头鹰旁分别标出期货与现货走势", "GoldOwl artwork with an owl and separate futures and spot price lines"],
    activity: ["2–20 笔 / 日", "2–20 trades / day"],
    capital: "10,000",
    stop: ["1%–5%（单笔）", "1%–5% per trade"],
    markets: ["黄金期货与现货（XAUUSD）", "Gold futures and spot (XAUUSD)"],
  },
];
export const articles = [
 {
  id:'what-is-an-ea',imageAlt:['金条与显示行情和自动化规则的交易终端','A gold bar beside a trading screen showing price action and automated rules'],
  related:{route:'strategies/surfer',label:['查看冲浪者外汇 EA 的交易逻辑与运行条件','Explore the rules and operating conditions of Surfer forex EA']},
  reference:{url:'https://www.metatrader5.com/en/terminal/help/algotrading/trade_robots_indicators',label:['MetaTrader 5 官方 EA 使用说明（英文）','MetaTrader 5 documentation on Expert Advisors']},
  category:['量化交易入门','QUANTITATIVE TRADING BASICS'],
  title:['EA 是什么？黄金与外汇量化交易入门','What is an Expert Advisor (EA) in gold and forex trading?'],
  intro:['EA 是 Expert Advisor 的缩写。在 MetaTrader 中，这类程序可以按预设规则分析行情，并在获得交易权限后发出交易指令。以黄金与外汇为例，理解信号、成交和账户记录之间的区别。','An Expert Advisor (EA) is a MetaTrader program that can analyse prices and, with trading permission, send orders. Gold and forex examples show how signals, fills and account records differ.'],
  time:['3分钟阅读','3 min read'],
  parts:[
    [['从策略规则到交易指令','From a strategy rule to an order'],['以黄金突破规则为例，即使价格曾经越过某个水平，“盘中触及”和“收盘确认”也可能产生不同信号。阅读 EA 说明时，先找出它使用的品种、时间周期和触发条件，再看它何时发单、怎样退出。','A gold price can briefly cross a level and close below it. A rule triggered on a touch and one triggered on a close can therefore produce different signals. Check the instrument, timeframe and trigger before looking at the order and exit rules.']],
    [['为什么有信号却没有同价成交','Why a signal and a fill can differ'],['外汇图表显示的价格与订单可执行的价格可能不同。核对一笔交易时，可以按时间依次查看程序日志、订单状态和成交价，再结合当时的点差与交易时段解释差异。','The price shown on a forex chart can differ from the price available for an order. To trace a trade, compare the program log, order status and fill price in time order, alongside the spread and trading session.']],
    [['用哪个版本、哪类记录比较','Which version and records to compare'],['比较两个 EA 时，记录程序版本、品种、参数和测试区间。回测使用历史数据，模拟和实盘成交条件也可能不同。检查报告是否计入点差与佣金，以及回撤根据余额还是包含浮动盈亏的净值计算。','When comparing two EAs, record the version, instruments, settings and test period. Backtests use historical data and demo fills can differ from live fills. Check the cost assumptions and whether drawdown uses balance or equity including open positions.']]
  ]
 },
 {id:'read-a-strategy',imageAlt:['两张标出突破点的图表，对比价格延续突破与回落至区间的情形','Two annotated charts compare a sustained breakout with a reversal into the range'],related:{route:'strategies',label:['比较黄金与外汇策略的交易逻辑','Compare gold and forex strategy profiles']},category:['策略研究','STRATEGY RESEARCH'],title:['如何评估量化策略的交易逻辑与失效条件','How to evaluate a trading strategy and when it can fail'],intro:['看收益之前，先弄清楚它在什么条件下开仓、退出，以及可能在哪些市场环境中失效。','Before considering returns, understand when a strategy enters, exits and may fail.'],time:['4分钟阅读','4 min read'],parts:[
 [['先看收益来源','Start with the return drivers'],['趋势、震荡、价差与组合交易有不同的收益来源。策略介绍应清楚说明触发条件、持仓周期及退出原则，使读者能够理解表现与市场环境之间的关系。','Trend, range, spread and portfolio strategies rely on different return drivers. A useful description explains triggers, holding periods and exits, connecting performance with market conditions.']],
 [['把版本放回记录中','Put the version back into the record'],['当品种、参数、加仓方式或执行逻辑发生变化时，新的表现应与对应版本关联。相同产品名称，并不意味着多年的数据来自同一套交易方法。','When instruments, parameters, scaling or execution change, results should remain tied to the relevant version. An unchanged product name does not mean years of results came from one method.']],
 [['理解可能的失效情形','Understand possible failure conditions'],['有用的策略说明应同时包含不利情形，例如假突破、持续单边、相关性改变或交易成本上升。知道何时暂停、怎样处理异常，是研究的一部分。','Useful documentation includes adverse conditions such as false breakouts, persistent one-way markets, correlation shifts and rising costs. Pause criteria and exception handling are part of the research.']]]},
 {id:'records-and-drawdown',imageAlt:['示意净值曲线，阴影标出从峰值到低谷的回撤','Illustrative equity curve with a shaded peak-to-trough drawdown'],related:{route:'performance',label:['查看黄金甲历史实盘记录与回撤','Explore GoldArmor historical records and drawdowns']},category:['实盘观察','LIVE-RECORD GUIDE'],title:['如何解读实盘记录中的收益、净值与回撤','How to read returns, equity and drawdown in a trading record'],intro:['一条增长曲线只是起点，时间区间、资金变动与净值信息决定了记录能否正确比较。','A growth curve is a starting point. Time periods, cash flows and equity data determine meaningful comparisons.'],time:['5分钟阅读','5 min read'],parts:[
 [['明确时间与账户类型','Identify the period and account type'],['实盘、模拟与历史回测应分开展示。累计收益应注明起止日期；静态截图只能代表截取时点，不能作为当前表现。','Live, demo and backtested results should be separated. Cumulative returns need start and end dates. A snapshot represents its capture time, not current performance.']],
 [['同时观察余额与净值','Look at balance and equity'],['余额侧重已实现的结果，净值还反映未平仓盈亏。只看余额可能忽略浮动亏损，回撤也需要明确基于余额还是净值以及采样频率。','Balance reflects realized results; equity also includes open profit and loss. Balance alone can hide floating losses. Drawdowns need a defined basis and sampling frequency.']],
 [['保留来源与计算口径','Retain sources and methodology'],['入出金、费用、不同杠杆和不同版本会影响可比性。查看第三方记录时，应了解验证项目和更新时间，不能把一个链接当作所有数据均已验证的证明。','Cash flows, fees, leverage and versions affect comparability. For third-party records, check verification scope and update times; a link is not proof that every metric has been validated.']]]},
 {id:'execution-environment',imageAlt:['前景中的网络交换机与光纤连接线，背景为报价终端','A fiber link and network switch in front of a market quote screen'],related:{route:'strategies/goldhunter',label:['了解黄金猎人的执行条件与成本','Review GoldHunter execution conditions and costs']},category:['运行与风控','EXECUTION & RISK'],title:['点差、滑点与网络如何影响策略执行','How spreads, slippage and connectivity affect trade execution'],intro:['从点差、滑点到网络连接，执行环境会进入每一笔交易的结果。','From spreads and slippage to connectivity, execution conditions affect every trade.'],time:['4分钟阅读','4 min read'],parts:[
 [['交易成本会累积','Trading costs accumulate'],['交易频率越高，点差、佣金和滑点对结果的影响可能越明显。比较策略时，需了解展示结果是否包含费用，以及使用的账户类型。','At higher trading frequencies, spreads, commissions and slippage can have a larger effect. Understand whether displayed results include costs and which account type was used.']],
 [['稳定运行需要可观察性','Reliable operations need visibility'],['网络断线、终端停止与数据更新延迟都需要明确的告警与处理方式。运行支持应包括状态检查、日志、恢复流程和责任分工。','Disconnections, terminal failures and delayed data need clear alerts and procedures. Operational support should include health checks, logs, recovery plans and ownership.']],
 [['先测试，再确定部署方案','Test before selecting a deployment'],['平台兼容性、合约规格、交易时间及运行资源应在实际环境中验证。通用的延迟宣传不能替代指定路径下的测量。','Verify compatibility, contract specifications, trading sessions and resource needs in the actual environment. Generic latency claims cannot replace path-specific measurements.']]]},
 {id:'data-to-research',imageAlt:['桌上的数据存储盘与装有处理器的主板','Storage drives and a processor on a motherboard at a research workstation'],related:{route:'services/infrastructure',label:['了解量化研究的数据与算力服务','Explore data and compute services for quantitative research']},category:['AI基础设施','AI INFRASTRUCTURE'],title:['量化研究如何选择历史数据与算力','Choosing historical data and compute for quantitative research'],intro:['数据覆盖、质量和授权，与算力规格同样影响研究工作的可重复性。','Coverage, quality and licensing matter as much as compute specifications for reproducible research.'],time:['4分钟阅读','4 min read'],parts:[
 [['数据需要说明书','Data needs documentation'],['一份可用的数据说明应包含来源、字段、时区、粒度、覆盖区间、缺失处理与更新周期。样本可以帮助确认格式是否符合研究要求。','Useful documentation includes sources, fields, timezone, granularity, coverage, missing-data treatment and update cadence. Samples help verify compatibility with research requirements.']],
 [['研究与执行分别验证','Validate research and execution separately'],['历史数据上的效果不等于未来有效，也不等于已经具备实时执行能力。样本外测试、版本记录与运行验证各自解决不同的问题。','Historical results do not establish future effectiveness or live execution readiness. Out-of-sample testing, version records and operational validation answer different questions.']],
 [['按任务选择基础设施','Match infrastructure to the task'],['回测、模型训练、数据处理和交易终端运行的资源需求不同。提出需求时，说明工作负载、数据规模、运行周期及支持要求，有助于形成合适的方案。','Backtesting, model training, data processing and trading terminals require different resources. Describe workloads, data size, operating schedules and support needs to shape an appropriate solution.']]]},
{
  "id": "stock-price-adjustments",
  "category": [
    "股票行情研究",
    "EQUITY DATA"
  ],
  "title": [
    "股票量化回测：拆股前后的价格怎样比较？",
    "Stock backtesting: comparing prices across a split"
  ],
  "intro": [
    "股票拆股会同时改变每股报价与持股数量。用一个一拆二的例子，核对原始收盘价、复权因子和策略回测产生的交易信号。",
    "A stock split changes the share price and the number of shares. A worked two-for-one example shows how to check raw closes, adjustment factors and backtest signals."
  ],
  "imageAlt": [
    "成组的股票凭证用于示意拆股前后的份额变化",
    "Share certificates illustrating a change in share count"
  ],
  "reference": {
    "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-split",
    "label": [
      "Investor.gov 对股票拆分的说明（英文）",
      "Investor.gov explanation of stock splits"
    ]
  },
  "related": {
    "route": "services/markets",
    "label": [
      "查看股票行情数据与公司行动的处理口径",
      "Explore equity market data and corporate actions"
    ]
  },
  "parts": [
    [
      [
        "先算持仓价值，再看价格曲线",
        "Start with the value of the holding"
      ],
      [
        "假设持有 4 股，每股 60 元。公司一拆二后，持仓变为 8 股，理论参考价是每股 30 元。在没有其他价格变动和费用的例子里，两边都是 240 元。直接拿 30 除以 60 会得到 −50%，这个数记录的是报价单位变化。",
        "Suppose you hold four shares priced at 60 each. A two-for-one split leaves eight shares at a reference price of 30 each. With no other price movement or fees, the holding is worth 240 on both sides. Dividing 30 by 60 produces a misleading 50% decline."
      ]
    ],
    [
      [
        "同一条均线规则，为什么会发出不同信号？",
        "Why a moving-average signal can change"
      ],
      [
        "若把拆股当天的原始收盘价，与拆股前十天未调整的均价直接比较，程序可能误判为向下突破。按拆股后的股数口径重算，拆股前 60 元对应 30 元，再比较相邻交易日才有意义。检查数据商的字段说明，分别记录是否处理拆股、现金分红以及复权基准日。",
        "Comparing a raw post-split close with a ten-day average of unadjusted pre-split closes can trigger a false downside breakout. On the new share basis, the earlier price of 60 becomes 30. Check the vendor’s treatment of splits and cash dividends separately, along with the reference date for adjustments."
      ]
    ],
    [
      [
        "复核一次异常跌幅",
        "Audit an apparent price drop"
      ],
      [
        "取公司行动前后各一个交易日，保存原始价、调整价、拆股比例和持股数。先重算持仓价值，再重放策略信号。若信号只出现在原始价格序列上，检查规则是否混用了不同口径。模拟下单和核对成交时，另保留当日可交易的原始报价。",
        "Save the raw close, adjusted close, split ratio and share count on either side of the event. Recalculate the holding value, then replay the signal. If the signal appears only in the raw series, inspect the price basis. Keep the actual tradable quote separately for simulated orders and fill checks."
      ]
    ]
  ],
  "time": [
    "3分钟阅读",
    "3 min read"
  ]
},
{
  "id": "futures-contract-roll",
  "category": [
    "期货行情研究",
    "FUTURES DATA"
  ],
  "title": [
    "期货量化回测：连续合约换月时怎样计算盈亏？",
    "Futures backtesting: reading prices and P&L across a contract roll"
  ],
  "intro": [
    "连续期货图在换月处可能出现跳点。用两个交割月的报价拆开跨月价差、持仓损益和执行成本，检查黄金期货策略回测的计算口径。",
    "A continuous futures chart can jump when it switches delivery months. Two example quotes separate the calendar spread from position P&L and execution costs in a gold futures backtest."
  ],
  "imageAlt": [
    "金条与相邻日历页上的两张合约示意黄金期货换月",
    "Gold bullion and two contract sheets illustrating a change of delivery month"
  ],
  "reference": {
    "url": "https://www.cmegroup.com/education/courses/introduction-to-futures/understanding-futures-expiration-contract-roll",
    "label": [
      "芝商所对期货到期与移仓的说明（英文）",
      "CME Group on futures expiration and contract rolls"
    ]
  },
  "related": {
    "route": "strategies/goldowl",
    "label": [
      "延伸阅读：黄金猫头鹰如何观察期货与现货的基差",
      "Read how GoldOwl studies the gold futures–spot basis"
    ]
  },
  "parts": [
    [
      [
        "先核对合约月份",
        "Identify both delivery months"
      ],
      [
        "同一时刻，黄金期货的近月和远月可以有不同报价。连续合约按数据商的规则切换报价来源，真实持仓则对应一个明确的合约月份。复核数据时记下合约代码、交易时段、报价单位与切换时间。",
        "Near and deferred gold futures can have different prices at the same time. A continuous series switches its price source according to a data rule, while a position belongs to a particular contract month. Record the contract codes, session, quote unit and switch time."
      ]
    ],
    [
      [
        "同一时刻相差 6 个报价单位，盈亏是多少？",
        "A six-point difference at the instant of the roll"
      ],
      [
        "假设近月多头开仓价为 98，在 100 平仓，同时以 106 买入远月。忽略手续费，旧合约每单位实现盈利 2；新合约刚以 106 建仓，此时每单位盈亏为零。把近月的 100 与远月的 106 拼接，会得到一段 6 点跳升。它反映两个到期月的价差。若远月随后升至 107，新合约才多出 1 点持仓盈利。",
        "Suppose a long near-month position opened at 98 closes at 100, and the deferred contract opens at 106 at the same moment. Before fees, the old contract earns two points per unit. The new position starts at zero P&L. A stitched chart jumps six points between contracts. Only a subsequent move from 106 to 107 earns a point on the new position."
      ]
    ],
    [
      [
        "用两笔成交重建移仓记录",
        "Reconstruct the roll from its two fills"
      ],
      [
        "回测可用处理过的连续序列计算趋势信号。重建盈亏时，用各自合约的开平仓价、数量和合约乘数，将两端手续费与滑点计入同一笔移仓记录。跨月价差来自两个期货月份；期现基差还需要同一时点的现货价格，两项计算应分别保存。",
        "A backtest may calculate trend signals on an adjusted continuous series. Reconstruct P&L from each contract’s fills, size and multiplier, accounting for fees and slippage on both legs. A calendar spread compares delivery months. A futures–spot basis also needs a matched spot price. Keep those calculations separate."
      ]
    ]
  ],
  "time": [
    "3分钟阅读",
    "3 min read"
  ]
}
];
