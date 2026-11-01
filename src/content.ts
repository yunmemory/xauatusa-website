export type Lang = 'zh' | 'en'

export const EMAIL = 'info@xauatusa.org'

const zh = {
  nav: [
    { id: 'about', label: '关于' },
    { id: 'mission', label: '宗旨' },
    { id: 'emblem', label: '会徽' },
    { id: 'timeline', label: '创会进程' },
    { id: 'join', label: '加入我们' },
  ],
  langSwitch: 'EN',
  nameShort: '西建大美国校友会',
  nameFull: '西安建筑科技大学美国校友会',
  nameEn: 'XAUAT U.S. Alumni Association',
  hero: {
    status: '筹备中 · 拟于 2026 年感恩节前后成立',
    titleTop: '西安建筑科技大学',
    titleBottom: '美国校友会',
    tagline: ['散迹海外，如群星熠熠各自闪耀；', '同心聚力，循同心圆汇聚成星河。'],
    ctaJoin: '加入我们',
    ctaMore: '了解校友会',
  },
  about: {
    eyebrow: 'About',
    title: '以母校为圆心',
    body: [
      '西安建筑科技大学美国校友会由在美校友自发发起，从一个美国校友微信群发展而来。我们希望把散居全美各地的建大人重新联系起来：彼此照应，提携后辈，也为母校的发展尽一份力。',
      '校友会面向全美国的建大校友，计划在纽约州注册为独立的会员制非营利组织。会员不缴强制会费，捐赠完全自愿。',
    ],
    stats: [
      { value: '约 100', label: '位在美校友已在群中' },
      { value: '全美', label: '覆盖范围，按地区组织聚会' },
      { value: '0', label: '强制会费，捐赠完全自愿' },
      { value: '2026', label: '创会之年' },
    ],
  },
  mission: {
    eyebrow: 'Mission',
    title: '我们的宗旨',
    lead: '联络校友、服务校友、支持母校。',
    items: [
      { t: '联络校友', d: '建立校友名册和地区联络网，让每一位在美建大人都能找到组织。' },
      { t: '服务校友', d: '落脚安家、职业发展、退休规划，校友之间互通信息、互相帮助。' },
      { t: '支持母校', d: '接待母校来访，促进与母校之间的学术、人才和文化交流。' },
      { t: '教育与学术', d: '以学术科研、建筑设计、房地产与开发等专业工作组为纽带开展交流。' },
      { t: '青年与职业', d: '迎接新来美国的年轻校友，资深校友担任导师，帮助他们成长。' },
      { t: '文化与公益', d: '组织节日聚会和文化活动，参与公益服务，传承建大精神。' },
    ],
    programsTitle: '计划开展的活动',
    programs: [
      { t: '年度大会', d: '每年至少一次，线下与线上结合，外地校友也能参加。' },
      { t: '地区聚会', d: '春节、中秋、校庆日，各地区校友就近相聚。' },
      { t: '专业工作组', d: '学术科研 · 建筑设计 · 房地产与开发 · 职业发展与导师计划。' },
      { t: '校友会联络', d: '与西安、北京、上海等国内校友会及加拿大、澳大利亚、欧洲等海外校友组织平等往来。' },
    ],
  },
  emblem: {
    eyebrow: 'Arch · Star',
    title: '拱与星',
    lead: '以母校为圆心，拱为骨，星为记。',
    points: [
      { k: '拱', en: 'ARCH', d: '取自母校主入口大门。拱是构筑之始，也是连接之形，撑起整枚会徽的骨架。' },
      { k: '星', en: 'STAR', d: '承袭母校校旗“群星荟聚”的意象，也是中美两国国旗共有的元素，象征美国校友会。' },
      { k: '环', en: 'RING', d: '沿用母校校徽的同心圆结构。校友散居北美、各自闪耀，又因同一个圆心连成一体。' },
      { k: '色', en: 'COLOR', d: '延续母校校徽的棕金色系：米杏为底，建大棕与星辉金点睛。' },
    ],
    paletteTitle: '标准色',
    palette: [
      { n: '建大棕', hex: '#9C6845' },
      { n: '星辉金', hex: '#C89B5A' },
      { n: '杏', hex: '#F5E3CE' },
      { n: '象牙白', hex: '#FBF6EE' },
      { n: '深赭', hex: '#5C3A22' },
      { n: '星夜蓝', hex: '#1B2A45' },
    ],
  },
  timeline: {
    eyebrow: 'Timeline',
    title: '创会进程',
    done: '已完成',
    now: '进行中',
    next: '计划中',
    steps: [
      { when: '2026 年 10 月', t: '成立筹备组', d: '启动会徽征集，起草章程，注册域名 xauatusa.org 和校友会公共邮箱。', state: 'done' },
      { when: '2026 年 11 月', t: '章程定稿 · 会徽投票', d: '章程讨论稿征求校友意见，全体校友投票确定会徽，建立校友名册。', state: 'now' },
      { when: '感恩节周末（暂定 11 月 28 日）', t: '成立大会', d: '线下举行成立仪式，同步线上直播，宣读章程、颁发聘书、合影留念。', state: 'next' },
      { when: '成立之后', t: '长期建设', d: '注册非营利组织，建立每年迎新机制，定期举办地区聚会，接待母校来访。', state: 'next' },
    ],
  },
  join: {
    eyebrow: 'Join Us',
    title: '欢迎每一位建大人',
    who: '西安建筑科技大学及其前身院校的校友、华清学院毕业生，以及曾在建大学习、进修、访学或任教的朋友，只要在美国生活、学习或工作，都欢迎加入。',
    steps: [
      { t: '写信给我们', d: `发邮件到 ${EMAIL}，写上姓名、入学年份、专业和所在城市。` },
      { t: '核验身份', d: '筹备组确认后，会邀请你加入美国校友微信群。' },
      { t: '登记名册', d: '留下联系方式，就能收到所在地区的聚会和活动通知。' },
    ],
    cta: '发邮件申请加入',
    mailSubject: '申请加入西建大美国校友会',
    mailBody: '您好！我想加入西安建筑科技大学美国校友会。\n\n姓名：\n入学年份：\n学院 / 专业：\n所在城市、州：\n微信号：\n',
    contact: '联系邮箱',
  },
  footer: {
    note: '本站由校友会筹备组维护。',
    rights: '© 2026 西安建筑科技大学美国校友会（筹）',
  },
}

type Content = typeof zh

const en: Content = {
  nav: [
    { id: 'about', label: 'About' },
    { id: 'mission', label: 'Mission' },
    { id: 'emblem', label: 'Emblem' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'join', label: 'Join' },
  ],
  langSwitch: '中文',
  nameShort: 'XAUAT U.S. Alumni',
  nameFull: 'XAUAT U.S. Alumni Association',
  nameEn: '西安建筑科技大学美国校友会',
  hero: {
    status: 'In formation · Founding planned for Thanksgiving 2026',
    titleTop: "Xi'an University of Architecture and Technology",
    titleBottom: 'U.S. Alumni Association',
    tagline: ['Scattered across America, each of us shines like a star;', 'drawn to one center, together we form a constellation.'],
    ctaJoin: 'Join us',
    ctaMore: 'Learn more',
  },
  about: {
    eyebrow: 'About',
    title: 'Centered on our alma mater',
    body: [
      'The XAUAT U.S. Alumni Association was started by alumni living in the United States and grew out of a WeChat group for XAUAT graduates here. Our aim is to reconnect alumni scattered across the country: to look out for one another, support those who come after us, and give back to our university.',
      'The association serves XAUAT alumni nationwide and plans to incorporate in New York State as an independent, membership-based nonprofit. Membership carries no mandatory dues; all giving is voluntary.',
    ],
    stats: [
      { value: '~100', label: 'alumni already in our group' },
      { value: 'Nationwide', label: 'with regional gatherings' },
      { value: '$0', label: 'mandatory dues — giving is voluntary' },
      { value: '2026', label: 'year of founding' },
    ],
  },
  mission: {
    eyebrow: 'Mission',
    title: 'What we stand for',
    lead: 'Connect alumni, serve alumni, support XAUAT.',
    items: [
      { t: 'Connect', d: 'Build an alumni directory and regional network so every XAUAT graduate in the U.S. can find us.' },
      { t: 'Serve', d: 'Share information and lend a hand — settling in, career growth, retirement planning.' },
      { t: 'Support XAUAT', d: 'Host university delegations and foster academic, talent and cultural exchange.' },
      { t: 'Education & scholarship', d: 'Professional working groups in research, architecture, real estate and development.' },
      { t: 'Young alumni & careers', d: 'Welcome new graduates arriving in the U.S., with senior alumni as mentors.' },
      { t: 'Culture & service', d: 'Holiday gatherings, cultural events and community service.' },
    ],
    programsTitle: 'Planned programs',
    programs: [
      { t: 'Annual meeting', d: 'At least once a year, in person and online, so alumni everywhere can take part.' },
      { t: 'Regional gatherings', d: 'Lunar New Year, Mid-Autumn and university anniversary meetups near you.' },
      { t: 'Working groups', d: 'Research · Architecture · Real estate & development · Careers & mentorship.' },
      { t: 'Alumni network', d: "Peer ties with XAUAT alumni groups in Xi'an, Beijing, Shanghai and beyond, and abroad in Canada, Australia and Europe." },
    ],
  },
  emblem: {
    eyebrow: 'Arch · Star',
    title: 'The arch and the star',
    lead: 'Our alma mater at the center; the arch as frame, the star as mark.',
    points: [
      { k: '拱', en: 'ARCH', d: "Drawn from the university's main gate. The arch is where building begins and a shape that connects; it frames the whole emblem." },
      { k: '星', en: 'STAR', d: "Echoes the gathered stars of the university flag, and the star shared by the Chinese and U.S. flags — the mark of our U.S. association." },
      { k: '环', en: 'RING', d: "Keeps the concentric rings of the university emblem: alumni shine on their own across North America, joined by one center." },
      { k: '色', en: 'COLOR', d: "Carries on the university's brown-and-gold palette: apricot as the ground, XAUAT brown and star gold as accents." },
    ],
    paletteTitle: 'Brand colors',
    palette: [
      { n: 'XAUAT Brown', hex: '#9C6845' },
      { n: 'Star Gold', hex: '#C89B5A' },
      { n: 'Apricot', hex: '#F5E3CE' },
      { n: 'Ivory', hex: '#FBF6EE' },
      { n: 'Deep Ochre', hex: '#5C3A22' },
      { n: 'Night Blue', hex: '#1B2A45' },
    ],
  },
  timeline: {
    eyebrow: 'Timeline',
    title: 'Road to founding',
    done: 'Done',
    now: 'In progress',
    next: 'Planned',
    steps: [
      { when: 'October 2026', t: 'Organizing committee formed', d: 'Emblem call for designs, bylaws drafted, xauatusa.org and the association email registered.', state: 'done' },
      { when: 'November 2026', t: 'Bylaws & emblem vote', d: 'Draft bylaws open for alumni comment; all alumni vote on the emblem; alumni directory launched.', state: 'now' },
      { when: 'Thanksgiving weekend (tentatively Nov 28)', t: 'Founding ceremony', d: 'In-person ceremony with a live stream: bylaws read, officers appointed, group photo.', state: 'next' },
      { when: 'After founding', t: 'Building for the long term', d: 'Nonprofit registration, a yearly welcome program, regular regional gatherings and university visits.', state: 'next' },
    ],
  },
  join: {
    eyebrow: 'Join Us',
    title: 'Every XAUAT alum is welcome',
    who: 'Graduates of XAUAT and its predecessor institutions, Huaqing College graduates, and anyone who has studied, trained, visited or taught at XAUAT — if you live, study or work in the U.S., you are welcome.',
    steps: [
      { t: 'Write to us', d: `Email ${EMAIL} with your name, year of entry, major and city.` },
      { t: 'Verification', d: 'Once confirmed, the committee will invite you to our U.S. alumni WeChat group.' },
      { t: 'Join the directory', d: 'Leave your contact details to hear about gatherings and events near you.' },
    ],
    cta: 'Email to join',
    mailSubject: 'Joining the XAUAT U.S. Alumni Association',
    mailBody: 'Hello! I would like to join the XAUAT U.S. Alumni Association.\n\nName:\nYear of entry:\nSchool / Major:\nCity, State:\nWeChat ID:\n',
    contact: 'Contact',
  },
  footer: {
    note: 'Maintained by the association’s organizing committee.',
    rights: '© 2026 XAUAT U.S. Alumni Association (in formation)',
  },
}

export const content: Record<Lang, Content> = { zh, en }
