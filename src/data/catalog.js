// ============================================================
// طبقه‌بندی محصولات، منوی مگا، برندها و تعریف فیلترهای هر دسته
// ============================================================

export const CATEGORIES = [
  {
    id: 'consoles', name: 'کنسول بازی', en: 'Consoles', icon: 'gamepad',
    desc: 'پلی‌استیشن، ایکس‌باکس، نینتندو، کنسول‌های دستی و VR',
    subs: [
      { id: 'playstation', name: 'پلی‌استیشن' },
      { id: 'xbox', name: 'ایکس‌باکس' },
      { id: 'nintendo', name: 'نینتندو' },
      { id: 'handheld', name: 'کنسول دستی' },
      { id: 'vr', name: 'واقعیت مجازی' }
    ]
  },
  {
    id: 'pc-parts', name: 'قطعات کامپیوتر', en: 'PC Components', icon: 'cpu',
    desc: 'پردازنده، گرافیک، مادربرد، رم و ذخیره‌سازی',
    subs: [
      { id: 'gpu', name: 'کارت گرافیک' },
      { id: 'cpu', name: 'پردازنده' },
      { id: 'motherboard', name: 'مادربرد' },
      { id: 'ram', name: 'رم' },
      { id: 'storage', name: 'حافظه SSD و HDD' },
      { id: 'psu', name: 'پاور' },
      { id: 'case', name: 'کیس' },
      { id: 'cooling', name: 'خنک‌کننده' }
    ]
  },
  {
    id: 'systems', name: 'سیستم گیمینگ', en: 'Gaming Systems', icon: 'pc',
    desc: 'سیستم‌های اسمبل‌شده، لپ‌تاپ و مینی‌پی‌سی',
    subs: [
      { id: 'prebuilt', name: 'سیستم آماده' },
      { id: 'laptop', name: 'لپ‌تاپ گیمینگ' },
      { id: 'custom', name: 'سیستم سفارشی' }
    ]
  },
  {
    id: 'monitors', name: 'مانیتور گیمینگ', en: 'Monitors', icon: 'monitor',
    desc: 'از Full HD تا 4K و OLED با نرخ نوسازی بالا',
    subs: [
      { id: 'oled', name: 'OLED و QD-OLED' },
      { id: '4k', name: '4K' },
      { id: '2k', name: '2K / 1440p' },
      { id: 'fhd', name: 'Full HD' },
      { id: 'ultrawide', name: 'التراواید' }
    ]
  },
  {
    id: 'peripherals', name: 'تجهیزات جانبی', en: 'Peripherals', icon: 'mouse',
    desc: 'ماوس، کیبورد، هدست، دسته و میکروفون',
    subs: [
      { id: 'mouse', name: 'ماوس گیمینگ' },
      { id: 'keyboard', name: 'کیبورد مکانیکال' },
      { id: 'headset', name: 'هدست' },
      { id: 'controller', name: 'دسته بازی' },
      { id: 'mousepad', name: 'ماوس‌پد' },
      { id: 'audio', name: 'میکروفون و صوتی' }
    ]
  },
  {
    id: 'games', name: 'بازی', en: 'Games', icon: 'disc',
    desc: 'دیسک و کد دیجیتال برای همه‌ی پلتفرم‌ها',
    subs: [
      { id: 'ps5', name: 'بازی PS5' },
      { id: 'ps4', name: 'بازی PS4' },
      { id: 'xbox', name: 'بازی ایکس‌باکس' },
      { id: 'switch', name: 'بازی نینتندو' },
      { id: 'pc', name: 'بازی کامپیوتر' },
      { id: 'preorder', name: 'پیش‌خرید' }
    ]
  },
  {
    id: 'digital', name: 'استور دیجیتال', en: 'Digital Store', icon: 'gift',
    desc: 'گیفت‌کارت، اشتراک قانونی و کردیت',
    subs: [
      { id: 'giftcard', name: 'گیفت‌کارت' },
      { id: 'subscription', name: 'اشتراک قانونی' },
      { id: 'gamecode', name: 'کد بازی' }
    ]
  },
  {
    id: 'accessories', name: 'لوازم جانبی کنسول', en: 'Console Accessories', icon: 'cable',
    desc: 'پایه شارژ، حافظه‌ی داخلی، کابل و نگهدارنده',
    subs: [
      { id: 'charging', name: 'شارژ و پایه' },
      { id: 'storageexp', name: 'حافظه و توسعه' },
      { id: 'cables', name: 'کابل و اتصال' }
    ]
  },
  {
    id: 'streaming', name: 'استریم و تولید محتوا', en: 'Streaming', icon: 'mic',
    desc: 'کپچرکارت، میکروفون، نور و استریم‌دک',
    subs: [
      { id: 'capture', name: 'کپچر کارت' },
      { id: 'streamaudio', name: 'صدا' },
      { id: 'streamlight', name: 'نور' },
      { id: 'streamgear', name: 'تجهیزات استریم' }
    ]
  },
  {
    id: 'furniture', name: 'مبلمان گیمینگ', en: 'Furniture', icon: 'chair',
    desc: 'صندلی، میز و پایه‌های ارگونومیک',
    subs: [
      { id: 'chair', name: 'صندلی گیمینگ' },
      { id: 'desk', name: 'میز گیمینگ' }
    ]
  },
  {
    id: 'collectibles', name: 'فیگور و کلکسیون', en: 'Collectibles', icon: 'figure',
    desc: 'فیگور، مجسمه و کالکشن‌های محدود',
    subs: [
      { id: 'figure', name: 'فیگور' },
      { id: 'merch', name: 'مرچ و پوشاک' }
    ]
  }
]

export const catById = (id) => CATEGORIES.find((c) => c.id === id)
export const subById = (catId, subId) => catById(catId)?.subs.find((s) => s.id === subId)

export const BRANDS = [
  'Sony', 'PlayStation', 'Microsoft', 'Xbox', 'Nintendo', 'Valve', 'ASUS', 'ROG', 'MSI',
  'Gigabyte', 'Acer', 'Alienware', 'Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX',
  'Samsung', 'LG', 'WD', 'Kingston', 'G.Skill', 'NZXT', 'Cooler Master', 'Elgato', 'Meta',
  'Redragon', 'DeepCool', 'Rockstar Games', 'EA Sports'
]

// فیلترهای اختصاصی هر دسته — بر اساس ویژگی‌های واقعی همان دسته
export const FILTER_DEFS = {
  consoles: [
    { key: 'sub', label: 'پلتفرم', type: 'sub' },
    { key: 'brand', label: 'برند' },
    { key: 'attrs.storage', label: 'حافظه داخلی' },
    { key: 'attrs.condition', label: 'وضعیت کالا' }
  ],
  'pc-parts': [
    { key: 'sub', label: 'نوع قطعه', type: 'sub' },
    { key: 'brand', label: 'برند' },
    { key: 'attrs.vram', label: 'حافظه گرافیک' },
    { key: 'attrs.socket', label: 'سوکت / نسل' },
    { key: 'attrs.ramType', label: 'نوع رم' }
  ],
  systems: [
    { key: 'sub', label: 'نوع سیستم', type: 'sub' },
    { key: 'brand', label: 'برند' },
    { key: 'attrs.gpu', label: 'کارت گرافیک' }
  ],
  monitors: [
    { key: 'brand', label: 'برند' },
    { key: 'attrs.resolution', label: 'رزولوشن' },
    { key: 'attrs.refresh', label: 'نرخ نوسازی' },
    { key: 'attrs.panel', label: 'پنل' },
    { key: 'attrs.size', label: 'اندازه' },
    { key: 'attrs.curved', label: 'خمیده' },
    { key: 'attrs.sync', label: 'سنکرون سازی' }
  ],
  peripherals: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'brand', label: 'برند' },
    { key: 'attrs.connection', label: 'اتصال' },
    { key: 'attrs.wireless', label: 'بی‌سیم' }
  ],
  games: [
    { key: 'sub', label: 'پلتفرم', type: 'sub' },
    { key: 'attrs.genre', label: 'ژانر' },
    { key: 'attrs.format', label: 'نسخه' },
    { key: 'attrs.status', label: 'وضعیت عرضه' }
  ],
  digital: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'attrs.region', label: 'ریجن' },
    { key: 'attrs.platform', label: 'پلتفرم' },
    { key: 'attrs.delivery', label: 'روش تحویل' }
  ],
  accessories: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'brand', label: 'برند' },
    { key: 'attrs.for', label: 'سازگار با' }
  ],
  streaming: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'brand', label: 'برند' }
  ],
  furniture: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'brand', label: 'برند' }
  ],
  collectibles: [
    { key: 'sub', label: 'نوع', type: 'sub' },
    { key: 'brand', label: 'برند' }
  ]
}

export const POPULAR_SEARCHES = [
  'PS5 Pro', 'نینتندو سوییچ 2', 'دسته دوال سنس', 'RTX 5070',
  'EA FC 27', 'GTA VI', 'مانیتور OLED', 'هدست گیمینگ'
]
