export const renameSource = 'https://www.goldarmorai.com/articles/goldhunter-to-goldarmor-20260905/';

export const questions = [
  {
    id: 'brand',
    title: ['SurferFX、冲浪者AI量化和冲浪者 EA 有什么关系？', 'How are SurferFX, Surfer Quant and the Surfer EA related?'],
    answer: [
      'SurferFX 是冲浪者量化（冲浪者AI量化，英文名 Surfer Quant）的官方网站。冲浪者 EA 是网站收录的一项多货币对外汇策略。查找团队和业务时可参考集团介绍，核对交易规则和版本时可参考冲浪者 EA 策略页。',
      'SurferFX is the website of Surfer Quant, also known in Chinese as 冲浪者量化 and 冲浪者AI量化. Surfer EA is the name of a multi-pair forex strategy covered on the site. The group profile describes the team, while the EA profile describes trading rules and versions.'
    ],
    links: [
      {route:'about', label:['集团介绍','Group profile']},
      {route:'strategies/surfer', label:['冲浪者外汇 EA','Surfer forex EA']}
    ]
  },
  {
    id: 'gold-or-forex',
    title: ['黄金甲策略与冲浪者外汇 EA 有什么区别？', 'How does GoldArmor differ from Surfer forex EA?'],
    answer: [
      '黄金甲 EA 研究黄金兑美元（XAUUSD）的价格突破和趋势动量，冲浪者 EA 则在多个外汇货币对上使用趋势、震荡与对冲规则。比较两者时，黄金甲要看突破信号和成交成本，冲浪者还要看多个货币对是否同时放大同一种货币的风险敞口。',
      'GoldArmor EA uses breakout and momentum rules on gold quoted in US dollars (XAUUSD). Surfer EA combines trend, range and hedging rules across currency pairs. For GoldArmor, review breakout signals and execution costs. For Surfer, also check whether several pairs concentrate exposure to the same currency.'
    ],
    links: [
      {route:'strategies/goldarmor', label:['黄金甲策略说明','GoldArmor strategy profile']},
      {route:'strategies/surfer', label:['冲浪者策略说明','Surfer strategy profile']}
    ]
  },
  {
    id: 'goldhunter-name',
    title: ['黄金猎人和黄金甲量化是什么关系？', 'How are GoldHunter and GoldArmor AI related?'],
    answer: [
      '据黄金甲官网整理的 2026 年 9 月 5 日品牌资料，黄金猎人（GoldHunter）更名为黄金甲量化（GoldArmor AI）。查阅更名前后的历史表现时，应分别核对账户、策略版本和统计区间。名称沿革本身无法证明不同记录使用了相同参数。',
      'According to GoldArmor’s brand history, materials dated September 5, 2026 announced the change from GoldHunter to GoldArmor AI. When comparing records before and after the name change, check the account, strategy version and reporting period. The name alone does not identify the parameters used.'
    ],
    links: [
      {url:renameSource, label:['黄金甲官网的更名资料','GoldArmor’s account of the name change (Chinese)']},
      {route:'strategies/goldhunter', label:['黄金猎人历史策略资料','Historical GoldHunter strategy profile']}
    ]
  },
  {
    id: 'historical-records',
    title: ['黄金甲页面上的收益和回撤对应哪个时间点？', 'What date do the GoldArmor gain and drawdown figures describe?'],
    answer: [
      'SurferFX 引用的是黄金甲官网标注为 2026 年 9 月 6 日的 STARTRADER 与 TMGM 两份账户快照。每组累计收益和最大回撤只对应各自账户截至该快照的记录。判断后续表现需要查阅原始账户记录及其更新时间。',
      'SurferFX cites two account snapshots from the GoldArmor website, dated September 6, 2026. The cumulative gain and maximum drawdown belong to the individual STARTRADER or TMGM account at that snapshot. To assess later results, consult the underlying account record and its update time.'
    ],
    links: [
      {route:'performance', label:['逐账户查看日期、收益与回撤','Dates, gains and drawdowns by account']},
      {url:'https://www.goldarmorai.com/#performance', label:['黄金甲官网历史快照','GoldArmor’s historical snapshots (Chinese)']}
    ]
  },
  {
    id: 'market-coverage',
    title: ['SurferFX 的股票、期货行情研究与黄金、外汇策略有何区别？', 'How does stock and futures coverage differ from the gold and forex strategies?'],
    answer: [
      '股票和期货在 SurferFX 的全球行情栏目中介绍。股票研究关注复权处理，期货研究关注合约到期与换月。黄金与外汇量化策略另有详情页，说明各策略交易的品种、信号逻辑、执行条件和风险。',
      'SurferFX covers equities and futures in its market research section. Equity comparisons require a consistent treatment of price adjustments, while futures comparisons require a contract and roll convention. Separate gold and forex strategy profiles describe the instruments, signals, execution requirements and risks.'
    ],
    links: [
      {route:'services/markets', label:['股票与期货行情研究','Equity and futures market research']},
      {route:'strategies', label:['黄金与外汇量化策略','Gold and forex strategy profiles']}
    ]
  }
];
