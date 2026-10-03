import { P, INQ } from './meta.js'

export const CONTROLLERS = [
  {
    id: 'dualsense-white', sku: 'AUR-CTL-1001',
    name: 'دسته بی‌سیم پلی‌استیشن ۵ دوال‌سنس — سفید', nameEn: 'DualSense Wireless Controller — White',
    brand: 'Sony', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(8400000, 'ircon', { sourceUrl: 'https://iranianconsole.com/product/ps5-controller' }), stock: 'in', qty: 12,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: ['best'], rating: { avg: 4.8, count: 324 }, sold: 876, addedAt: '2026-01-15',
    short: 'دسته‌ی استاندارد پلی‌استیشن ۵ با بازخورد لمسی و تریگرهای تطبیقی.',
    desc: 'دوال‌سنس با بازخورد لمسی دقیق و تریگرهای تطبیقی، حس بازی را تغییر داده است. روی پلی‌استیشن ۵ و کامپیوتر کار می‌کند.',
    features: ['بازخورد لمسی', 'تریگرهای تطبیقی', 'میکروفون داخلی', 'سازگار با کامپیوتر'],
    inBox: ['دسته', 'کابل شارژ'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C'], ['باتری', 'قابل شارژ'], ['سازگاری', 'پلی‌استیشن ۵، کامپیوتر']] }
    ],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/dualsense-white.jpg', gallery: ['/img/p/dualsense-white.jpg'],
    fbt: ['ps5-slim-disc', 'dualsense-dock']
  },
  {
    id: 'dualsense-black', sku: 'AUR-CTL-1002',
    name: 'دسته بی‌سیم پلی‌استیشن ۵ دوال‌سنس — مشکی', nameEn: 'DualSense Wireless Controller — Midnight Black',
    brand: 'Sony', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(8400000, 'ircon'), stock: 'in', qty: 10,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: [], rating: { avg: 4.8, count: 298 }, sold: 812, addedAt: '2026-01-15',
    short: 'رنگ مشکی دوال‌سنس؛ محبوب‌ترین رنگ دسته‌ی پلی‌استیشن.',
    desc: 'همان دوال‌سنس استاندارد با رنگ میدنایت بلک.',
    features: ['بازخورد لمسی', 'تریگرهای تطبیقی'],
    inBox: ['دسته', 'کابل شارژ'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C'], ['سازگاری', 'پلی‌استیشن ۵، کامپیوتر']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/dualsense-black.jpg', gallery: ['/img/p/dualsense-black.jpg']
  },
  {
    id: 'dualsense-red', sku: 'AUR-CTL-1003',
    name: 'دسته بی‌سیم پلی‌استیشن ۵ دوال‌سنس — قرمز', nameEn: 'DualSense Wireless Controller — Cosmic Red',
    brand: 'Sony', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(8200000, 'ircon'), stock: 'in', qty: 6,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: ['sale'], rating: { avg: 4.7, count: 141 }, sold: 356, addedAt: '2026-02-01',
    short: 'رنگ کازمیک رد؛ جذاب‌ترین رنگ دوال‌سنس.',
    desc: 'دوال‌سنس قرمز برای ستاپ‌های خاص.',
    features: ['بازخورد لمسی', 'تریگرهای تطبیقی'],
    inBox: ['دسته', 'کابل شارژ'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/dualsense-white.jpg', gallery: ['/img/p/dualsense-white.jpg']
  },
  {
    id: 'dualsense-edge', sku: 'AUR-CTL-1004',
    name: 'دسته پلی‌استیشن دوال‌سنس اج', nameEn: 'DualSense Edge Wireless Controller',
    brand: 'Sony', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(25900000, 'zoomg', { checked: '2026-07-15T11:00:00+03:30' }), stock: 'in', qty: 3,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: ['hot', 'limited'], rating: { avg: 4.7, count: 87 }, sold: 132, addedAt: '2026-03-05',
    short: 'دسته‌ی حرفه‌ای سونی با دکمه‌های پشتی قابل‌تنظیم و استیک قابل‌تعویض.',
    desc: 'دوال‌سنس اج برای بازیکن‌های رقابتی ساخته شده: پدال‌های پشتی، تریگرهای قابل‌تنظیم، پروفایل‌های شخصی و استیک‌های قابل‌تعویض.',
    features: ['دکمه‌های پشتی قابل‌برنامه‌ریزی', 'تریگر قابل‌تنظیم', 'استیک قابل‌تعویض', 'کیف همراه'],
    inBox: ['دسته', 'کیف', 'کابل بافته', 'دو جوی‌استیک اضافه'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C'], ['امکانات حرفه‌ای', 'پدال پشتی، پروفایل']] }
    ],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/pro-controller.jpg', gallery: ['/img/p/pro-controller.jpg']
  },
  {
    id: 'xbox-ctrl-carbon', sku: 'AUR-CTL-2001',
    name: 'دسته بی‌سیم ایکس‌باکس — کربن بلک', nameEn: 'Xbox Wireless Controller — Carbon Black',
    brand: 'Microsoft', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(9900000, 'torob', { sourceUrl: 'https://torob.com/p/d08cebba-dd95-4475-ad8d-4b7482b7c520/' }), stock: 'in', qty: 9,
    warranty: '۶ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.7, count: 267 }, sold: 645, addedAt: '2026-01-20',
    short: 'دسته‌ی استاندارد ایکس‌باکس سری ایکس/اس؛ سازگار با کنسول و کامپیوتر.',
    desc: 'دسته‌ی بی‌سیم ایکس‌باکس یکی از راحت‌ترین دسته‌های بازار است و روی کنسول، کامپیوتر و موبایل کار می‌کند.',
    features: ['بلوتوث و ایکس‌باکس وایرلس', 'دکمه‌ی شیر (Share)', 'سازگار با کامپیوتر و موبایل'],
    inBox: ['دسته', 'دو باتری قلمی'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C'], ['باتری', 'دو باتری قلمی (حدود ۴۰ ساعت)']] }
    ],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'ایکس‌باکس' },
    image: '/img/p/xbox-controller.jpg', gallery: ['/img/p/xbox-controller.jpg']
  },
  {
    id: 'xbox-ctrl-white', sku: 'AUR-CTL-2002',
    name: 'دسته بی‌سیم ایکس‌باکس — سفید', nameEn: 'Xbox Wireless Controller — White',
    brand: 'Microsoft', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: P(11600000, 'zoomit'), stock: 'in', qty: 5,
    warranty: '۶ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 154 }, sold: 321, addedAt: '2026-01-20',
    short: 'رنگ سفید دسته‌ی ایکس‌باکس.',
    desc: 'همان دسته‌ی استاندارد با رنگ سفید.',
    features: ['بلوتوث', 'سازگار با کنسول و کامپیوتر'],
    inBox: ['دسته', 'دو باتری قلمی'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'ایکس‌باکس' },
    image: '/img/p/xbox-controller.jpg', gallery: ['/img/p/xbox-controller.jpg']
  },
  {
    id: 'elite-series-2', sku: 'AUR-CTL-2003',
    name: 'دسته ایکس‌باکس الیت سری ۲', nameEn: 'Xbox Elite Series 2 Controller',
    brand: 'Microsoft', cat: 'peripherals', sub: 'controller', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۶ ماه گارانتی', region: 'جهانی',
    badges: ['limited'], rating: { avg: 4.6, count: 112 }, sold: 165, addedAt: '2026-02-12',
    short: 'دسته‌ی حرفه‌ای مایکروسافت با پدل و تریگر قابل‌تنظیم.',
    desc: 'الیت سری ۲ استاندارد دسته‌های حرفه‌ی کنسولی است: پدل‌های فلزی، تریگر سه‌حالته و باتری داخلی.',
    features: ['پدل‌های قابل‌تعویض', 'تریگر قابل‌تنظیم', 'باتری داخلی'],
    inBox: ['دسته', 'کیف شارژ', 'پدل‌ها'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث / USB-C']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'ایکس‌باکس' },
    image: '/img/p/pro-controller.jpg', gallery: ['/img/p/pro-controller.jpg']
  }
]

export const AUDIO = [
  {
    id: 'pulse-3d', sku: 'AUR-HDS-1001',
    name: 'هدست بی‌سیم سونی Pulse 3D', nameEn: 'Sony Pulse 3D Wireless Headset',
    brand: 'Sony', cat: 'peripherals', sub: 'headset', type: 'physical',
    price: P(16600000, 'zoomg', { checked: '2026-07-15T11:00:00+03:30' }), stock: 'in', qty: 6,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: [], rating: { avg: 4.6, count: 189 }, sold: 342, addedAt: '2026-01-30',
    short: 'هدست رسمی پلی‌استیشن با صدای سه‌بعدی.',
    desc: 'پالس تری‌دی برای صدای سه‌بعدی پلی‌استیشن ۵ بهینه‌سازی شده و دو میکروفون حذف‌کننده‌ی نویز دارد.',
    features: ['صدای سه‌بعدی', 'دو میکروفون حذف نویز', 'باتری تا ۱۲ ساعت'],
    inBox: ['هدست', 'دانگل بی‌سیم', 'کابل شارژ'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'بی‌سیم ۲٫۴ گیگاهرتز / جک ۳٫۵'], ['باتری', 'تا ۱۲ ساعت'], ['میکروفون', 'دوگانه حذف نویز'], ['سازگاری', 'پلی‌استیشن، کامپیوتر، موبایل']] }
    ],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/headset-wireless.jpg', gallery: ['/img/p/headset-wireless.jpg']
  },
  {
    id: 'pulse-elite', sku: 'AUR-HDS-1002',
    name: 'هدست بی‌سیم سونی Pulse Elite', nameEn: 'Sony Pulse Elite Wireless Headset',
    brand: 'Sony', cat: 'peripherals', sub: 'headset', type: 'physical',
    price: P(24900000, 'zoomg', { checked: '2026-07-15T11:00:00+03:30' }), stock: 'in', qty: 4,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: ['new'], rating: { avg: 4.7, count: 76 }, sold: 118, addedAt: '2026-04-22',
    short: 'نسل جدید هدست‌های سونی با درایورهای پلنر مغناطیسی.',
    desc: 'پالس الیت با درایورهای پلنر، کیفیت صدای بالاتری نسبت به پالس تری‌دی دارد و از بلوتوث هم پشتیبانی می‌کند.',
    features: ['درایور پلنر مغناطیسی', 'بلوتوث و دانگل', 'حذف نویز هوشمند'],
    inBox: ['هدست', 'دانگل', 'کابل شارژ', 'هوک آویز'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث'], ['درایور', 'پلنر مغناطیسی']] }
    ],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'پلی‌استیشن ۵' },
    image: '/img/p/headset-wireless.jpg', gallery: ['/img/p/headset-wireless.jpg']
  },
  {
    id: 'hyperx-cloud-alpha', sku: 'AUR-HDS-2001',
    name: 'هدست گیمینگ هایپرایکس Cloud Alpha', nameEn: 'HyperX Cloud Alpha Gaming Headset',
    brand: 'HyperX', cat: 'peripherals', sub: 'headset', type: 'physical',
    price: P(25900000, 'torob', { sourceUrl: 'https://torob.com/p/f8e797fc-1de8-4f8d-8149-cd00fe573c88/', note: 'ارزان‌ترین فروشنده‌ی کالای اصل در ترب' }), stock: 'in', qty: 5,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 236 }, sold: 421, addedAt: '2026-02-20',
    short: 'یکی از محبوب‌ترین هدست‌های سیمی بازار با درایور دو محفظه‌ای.',
    desc: 'کلاد آلفا سال‌هاست استاندارد هدست گیمینگ خوش‌قیمت است: صدای شفاف، بدنه‌ی آلومینیومی و راحتی بالا.',
    features: ['درایور دو محفظه‌ای', 'بدنه‌ی آلومینیومی', 'میکروفون جداشونده'],
    inBox: ['هدست', 'میکروفون', 'کیف'],
    specs: [
      { title: 'مشخصات', items: [['اتصال', 'جک ۳٫۵ میلی‌متر'], ['درایور', '۵۰ میلی‌متر دو محفظه‌ای'], ['میکروفون', 'جداشونده حذف نویز']] }
    ],
    attrs: { connection: 'باسیم', wireless: 'خیر', for: 'همه‌ی پلتفرم‌ها' },
    image: '/img/p/headset-hyperx.jpg', gallery: ['/img/p/headset-hyperx.jpg']
  },
  {
    id: 'cloud-stinger-s', sku: 'AUR-HDS-2002',
    name: 'هدست گیمینگ هایپرایکس Cloud Stinger S', nameEn: 'HyperX Cloud Stinger S',
    brand: 'HyperX', cat: 'peripherals', sub: 'headset', type: 'physical',
    price: P(12950000, 'torob', { sourceUrl: 'https://torob.com/p/7fbbec63-963a-4188-a253-d35b966a9c8e/' }), stock: 'in', qty: 7,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.5, count: 128 }, sold: 234, addedAt: '2026-03-15',
    short: 'گزینه‌ی اقتصادی هایپرایکس با صدای مجازی ۷٫۱.',
    desc: 'کلاد استینجر اس برای شروع گیمینگ با بودجه‌ی محدود مناسب است.',
    features: ['صدای مجازی ۷٫۱', 'سبک و راحت'],
    inBox: ['هدست'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'جک ۳٫۵ / دانگل']] }]],
    attrs: { connection: 'باسیم', wireless: 'خیر', for: 'همه‌ی پلتفرم‌ها' },
    image: '/img/p/headset-hyperx.jpg', gallery: ['/img/p/headset-hyperx.jpg']
  },
  {
    id: 'arctis-nova-7', sku: 'AUR-HDS-3001',
    name: 'هدست استیل‌سریز Arctis Nova 7 Wireless', nameEn: 'SteelSeries Arctis Nova 7 Wireless',
    brand: 'SteelSeries', cat: 'peripherals', sub: 'headset', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 94 }, sold: 156, addedAt: '2026-05-06',
    short: 'هدست بی‌سیم محبوب استیل‌سریز با بلوتوث هم‌زمان.',
    desc: 'آرکتیس نوا ۷ هم‌زمان به دانگل و بلوتوث وصل می‌شود؛ برای پلی‌استیشن، ایکس‌باکس (نسخه‌ی مخصوص) و کامپیوتر.',
    features: ['اتصال هم‌زمان دانگل + بلوتوث', 'باتری تا ۳۸ ساعت'],
    inBox: ['هدست', 'دانگل', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / بلوتوث'], ['باتری', 'تا ۳۸ ساعت']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', for: 'همه‌ی پلتفرم‌ها' },
    image: '/img/p/headset-wireless.jpg', gallery: ['/img/p/headset-wireless.jpg']
  }
]

export const KEYBOARDS_MICE = [
  {
    id: 'kumara-k552', sku: 'AUR-KEY-1001',
    name: 'کیبورد مکانیکال ردراگون Kumara K552 RGB', nameEn: 'Redragon Kumara K552 RGB',
    brand: 'Redragon', cat: 'peripherals', sub: 'keyboard', type: 'physical',
    price: P(10500000, 'jahan', { sourceUrl: 'https://jahanbazar.com/c/janebi/keyboard/' }), stock: 'in', qty: 8,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.6, count: 198 }, sold: 387, addedAt: '2026-03-01',
    short: 'کیبورد کامپکت و پرفروش برای شروع گیمینگ مکانیکال.',
    desc: 'کومارا K552 یکی از پرفروش‌ترین کیبوردهای مکانیکال اقتصادی بازار ایران است؛ بدنه‌ی محکم و نورپردازی کامل.',
    features: ['طراحی کامپکت', 'نورپردازی قابل تنظیم', 'سوییچ‌های قابل‌اعتماد'],
    inBox: ['کیبورد', 'کی‌کش'],
    specs: [
      { title: 'مشخصات', items: [['چیدمان', 'کامپکت'], ['نورپردازی', 'قابل تنظیم'], ['اتصال', 'باسیم']] }
    ],
    attrs: { connection: 'باسیم', wireless: 'خیر', switch: 'مکانیکال' },
    image: '/img/p/keyboard.jpg', gallery: ['/img/p/keyboard.jpg']
  },
  {
    id: 'kali-k577r', sku: 'AUR-KEY-1002',
    name: 'کیبورد مکانیکال ردراگون Kali K577R RGB', nameEn: 'Redragon Kali K577R RGB',
    brand: 'Redragon', cat: 'peripherals', sub: 'keyboard', type: 'physical',
    price: P(7400000, 'jahan'), stock: 'in', qty: 10,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['sale'], rating: { avg: 4.5, count: 143 }, sold: 298, addedAt: '2026-03-01',
    short: 'کیبورد بی‌سیم/باسیم با نورپردازی کامل.',
    desc: 'کالی K577R هم بی‌سیم و هم باسیم کار می‌کند و قیمت مناسبی دارد.',
    features: ['بی‌سیم و باسیم', 'نورپردازی کامل'],
    inBox: ['کیبورد', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم / باسیم'], ['نورپردازی', 'قابل تنظیم']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله', switch: 'مکانیکال' },
    image: '/img/p/keyboard.jpg', gallery: ['/img/p/keyboard.jpg']
  },
  {
    id: 'sacredblade-k712', sku: 'AUR-KEY-1003',
    name: 'کیبورد مکانیکال ردراگون SacredBlade K712 RGB-M', nameEn: 'Redragon SacredBlade K712 RGB-M',
    brand: 'Redragon', cat: 'peripherals', sub: 'keyboard', type: 'physical',
    price: P(9200000, 'jahan'), stock: 'in', qty: 6,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 87 }, sold: 142, addedAt: '2026-04-02',
    short: 'کیبورد مکانیکال با طراحی گیمینگ و نورپردازی کامل.',
    desc: 'سیکردبلید K712 از خانواده‌ی کیبوردهای مکانیکال ردراگون است.',
    features: ['نورپردازی کامل', 'بدنه‌ی محکم'],
    inBox: ['کیبورد'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'باسیم']] }]],
    attrs: { connection: 'باسیم', wireless: 'خیر', switch: 'مکانیکال' },
    image: '/img/p/keyboard.jpg', gallery: ['/img/p/keyboard.jpg']
  },
  {
    id: 'blackwidow-v4', sku: 'AUR-KEY-2001',
    name: 'کیبورد مکانیکال ریزر BlackWidow V4', nameEn: 'Razer BlackWidow V4 Mechanical',
    brand: 'Razer', cat: 'peripherals', sub: 'keyboard', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 64 }, sold: 78, addedAt: '2026-05-11',
    short: 'کیبورد مکانیکال رده‌بالای ریزر با سوییچ‌های اختصاصی.',
    desc: 'بلک‌ویدو وی‌فور از کیبوردهای محبوب رده‌بالای ریزر است.',
    features: ['سوییچ مکانیکال اختصاصی ریزر', 'نورپردازی کامل'],
    inBox: ['کیبورد'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'باسیم']] }]],
    attrs: { connection: 'باسیم', wireless: 'خیر', switch: 'مکانیکال' },
    image: '/img/p/keyboard.jpg', gallery: ['/img/p/keyboard.jpg']
  },
  {
    id: 'g502-x', sku: 'AUR-MSE-1001',
    name: 'ماوس گیمینگ لاجیتک G502 X', nameEn: 'Logitech G502 X Gaming Mouse',
    brand: 'Logitech', cat: 'peripherals', sub: 'mouse', type: 'physical',
    price: INQ(), stock: 'in', qty: 5,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 176 }, sold: 312, addedAt: '2026-02-08',
    short: 'نسل جدید محبوب‌ترین ماوس گیمینگ تاریخ.',
    desc: 'جی‌فور‌اور ایکس ادامه‌ی مسیر ماوس افسانه‌ی لاجیتک است: سنسور هیرو، سوییچ‌های هیبریدی و طراحی ارگونومیک.',
    features: ['سنسور هیرو', '۱۳ دکمه‌ی قابل‌برنامه‌ریزی'],
    inBox: ['ماوس'],
    specs: [[{ title: 'مشخصات', items: [['سنسور', 'هیرو'], ['اتصال', 'باسیم']] }]],
    attrs: { connection: 'باسیم', wireless: 'خیر' },
    image: '/img/p/mouse.jpg', gallery: ['/img/p/mouse.jpg']
  },
  {
    id: 'viper-v3-pro', sku: 'AUR-MSE-2001',
    name: 'ماوس گیمینگ ریزر Viper V3 Pro', nameEn: 'Razer Viper V3 Pro Wireless',
    brand: 'Razer', cat: 'peripherals', sub: 'mouse', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['hot'], rating: { avg: 4.9, count: 58 }, sold: 94, addedAt: '2026-06-14',
    short: 'ماوس بی‌سیم فوق‌سبک حرفه‌ای‌ها.',
    desc: 'وایپر وی‌فور پرو انتخاب بسیاری از بازیکن‌های حرفه‌ای شوتر است.',
    features: ['فوق‌سبک', 'بی‌سیم'],
    inBox: ['ماوس', 'دانگل'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'بی‌سیم']] }]],
    attrs: { connection: 'بی‌سیم', wireless: 'بله' },
    image: '/img/p/mouse.jpg', gallery: ['/img/p/mouse.jpg']
  }
]

export const ACCESSORIES = [
  {
    id: 'dualsense-dock', sku: 'AUR-ACC-1001',
    name: 'پایه شارژ دسته دوال‌سنس سونی', nameEn: 'DualSense Charging Station',
    brand: 'Sony', cat: 'accessories', sub: 'charging', type: 'physical',
    price: INQ(), stock: 'in', qty: 6,
    warranty: '۶ ماه گارانتی', region: 'اروپا',
    badges: [], rating: { avg: 4.7, count: 134 }, sold: 267, addedAt: '2026-01-25',
    short: 'شارژ هم‌زمان دو دسته‌ی دوال‌سنس.',
    desc: 'پایه‌ی شارژ رسمی سونی دو دسته را هم‌زمان و بدون اشغال پورت کنسول شارژ می‌کند.',
    features: ['شارژ دو دسته هم‌زمان', 'طراحی رسمی سونی'],
    inBox: ['پایه شارژ', 'آداپتور'],
    specs: [[{ title: 'مشخصات', items: [['سازگار با', 'دوال‌سنس']] }]],
    attrs: { for: 'پلی‌استیشن ۵' },
    image: '/img/p/charging-dock.jpg', gallery: ['/img/p/charging-dock.jpg']
  },
  {
    id: 'switch2-pro-ctrl', sku: 'AUR-ACC-2001',
    name: 'دسته پرو نینتندو سوییچ ۲', nameEn: 'Nintendo Switch 2 Pro Controller',
    brand: 'Nintendo', cat: 'accessories', sub: 'charging', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۶ ماه گارانتی', region: 'جهانی',
    badges: ['new'], rating: { avg: 4.8, count: 42 }, sold: 58, addedAt: '2026-07-10',
    short: 'دسته‌ی حرفه‌ای نینتندو برای سوییچ ۲.',
    desc: 'دسته‌ی پرو سوییچ ۲ بهترین تجربه‌ی بازی‌های رقابتی نینتندو را دارد.',
    features: ['باتری داخلی', 'ارتباط بهبودیافته'],
    inBox: ['دسته', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['سازگار با', 'سوییچ ۲']] }]],
    attrs: { for: 'سوییچ ۲' },
    image: '/img/p/pro-controller.jpg', gallery: ['/img/p/pro-controller.jpg']
  },
  {
    id: 'hdmi21-cable', sku: 'AUR-ACC-3001',
    name: 'کابل HDMI 2.1 — ۲ متر', nameEn: 'HDMI 2.1 Cable 2m',
    brand: 'AURORA', cat: 'accessories', sub: 'cables', type: 'physical',
    price: INQ(), stock: 'in', qty: 20,
    warranty: '۶ ماه گارانتی', region: 'ایران',
    badges: [], rating: { avg: 4.5, count: 87 }, sold: 342, addedAt: '2026-02-02',
    short: 'برای استفاده از 4K@120 کنسول‌های نسل جدید ضروری است.',
    desc: 'کابل دارای گواهی ۴۸ گیگابیت برای انتقال 4K@120 و 8K.',
    features: ['۴۸ گیگابیت بر ثانیه', 'سازگار با پلی‌استیشن ۵ و ایکس‌باکس'],
    inBox: ['کابل'],
    specs: [[{ title: 'مشخصات', items: [['استاندارد', 'HDMI 2.1']] }]],
    attrs: { for: 'همه‌ی کنسول‌ها' },
    image: '/img/p/hdmi.jpg', gallery: ['/img/p/hdmi.jpg']
  },
  {
    id: 'headset-stand', sku: 'AUR-ACC-4001',
    name: 'پایه هدست گیمینگ با نورپردازی', nameEn: 'Gaming Headset Stand with RGB',
    brand: 'AURORA', cat: 'accessories', sub: 'charging', type: 'physical',
    price: INQ(), stock: 'in', qty: 8,
    warranty: '۶ ماه گارانتی', region: 'ایران',
    badges: [], rating: { avg: 4.4, count: 52 }, sold: 121, addedAt: '2026-03-22',
    short: 'نگهدارنده‌ی هدست با نورپردازی و هاب یو‌اس‌بی.',
    desc: 'پایه‌ی هدست با نورپردازی ملایم و دو پورت یو‌اس‌بی.',
    features: ['هاب یو‌اس‌بی', 'نورپردازی'],
    inBox: ['پایه'],
    specs: [[{ title: 'مشخصات', items: [['جنس', 'آلومینیوم']] }]],
    attrs: { for: 'همه‌ی هدست‌ها' },
    image: '/img/p/headset-stand.jpg', gallery: ['/img/p/headset-stand.jpg']
  }
]

export const STREAMING = [
  {
    id: 'hd60-x', sku: 'AUR-STR-1001',
    name: 'کپچرکارت الجیتو HD60 X', nameEn: 'Elgato HD60 X Capture Card',
    brand: 'Elgato', cat: 'streaming', sub: 'capture', type: 'physical',
    price: INQ(), stock: 'in', qty: 4,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 96 }, sold: 134, addedAt: '2026-04-01',
    short: 'استاندارد استریم؛ ضبط و پخش 4K30 و 1080p240.',
    desc: 'اچ‌دی‌سیکس‌اکس محبوب‌ترین کپچرکارت استریمرهاست.',
    features: ['پاس‌ترو 4K60', 'ضبط 1080p240'],
    inBox: ['کپچرکارت', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['ورودی', 'HDMI 2.0']] }]],
    attrs: {},
    image: '/img/p/capture-card.jpg', gallery: ['/img/p/capture-card.jpg']
  },
  {
    id: 'stream-deck-mk2', sku: 'AUR-STR-2001',
    name: 'استریم‌دک الجیتو MK.2', nameEn: 'Elgato Stream Deck MK.2',
    brand: 'Elgato', cat: 'streaming', sub: 'streamgear', type: 'physical',
    price: INQ(), stock: 'in', qty: 5,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.9, count: 143 }, sold: 218, addedAt: '2026-04-01',
    short: '۱۵ کلید قابل‌برنامه‌ریزی برای کنترل استریم.',
    desc: 'استریم‌دک ابزار استاندارد استریمرها برای کنترل صحنه‌ها، صدا و اکشن‌هاست.',
    features: ['۱۵ کلید نمایشگردار'],
    inBox: ['استریم‌دک', 'پایه', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['کلید', '۱۵']] }]],
    attrs: {},
    image: '/img/p/stream-deck.jpg', gallery: ['/img/p/stream-deck.jpg']
  },
  {
    id: 'key-light-air', sku: 'AUR-STR-3001',
    name: 'نور استودیویی الجیتو Key Light Air', nameEn: 'Elgato Key Light Air',
    brand: 'Elgato', cat: 'streaming', sub: 'streamlight', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 68 }, sold: 87, addedAt: '2026-04-01',
    short: 'نور حرفه‌ای استریم با کنترل از نرم‌افزار.',
    desc: 'کی‌لایت ایر نور ملایم و یکنواختی برای تصویر استریم می‌سازد.',
    features: ['کنترل از نرم‌افزار', 'نور بدون فلیکر'],
    inBox: ['نور', 'پایه'],
    specs: [[{ title: 'مشخصات', items: [['توان', '۱۴۰۰ لومن']] }]],
    attrs: {},
    image: '/img/p/key-light.jpg', gallery: ['/img/p/key-light.jpg']
  },
  {
    id: 'wave-3', sku: 'AUR-STR-4001',
    name: 'میکروفون الجیتو Wave:3', nameEn: 'Elgato Wave:3 Microphone',
    brand: 'Elgato', cat: 'streaming', sub: 'streamaudio', type: 'physical',
    price: INQ(), stock: 'in', qty: 4,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 112 }, sold: 165, addedAt: '2026-05-15',
    short: 'میکروفون یو‌اس‌بی محبوب استریمرها.',
    desc: 'ویو‌تری با نرم‌افزار میکس قدرتمند الجیتو یکی از بهترین میکروفون‌های استریم است.',
    features: ['کیفیت ۲۴ بیت / ۹۶ کیلوهرتز', 'نرم‌افزار میکس'],
    inBox: ['میکروفون', 'پایه', 'کابل'],
    specs: [[{ title: 'مشخصات', items: [['اتصال', 'USB-C']] }]],
    attrs: {},
    image: '/img/p/microphone.jpg', gallery: ['/img/p/microphone.jpg']
  },
  {
    id: 'brio-4k', sku: 'AUR-STR-5001',
    name: 'وب‌کم لاجیتک Brio 4K', nameEn: 'Logitech Brio 4K Webcam',
    brand: 'Logitech', cat: 'streaming', sub: 'streamgear', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۱۲ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 84 }, sold: 112, addedAt: '2026-05-20',
    short: 'وب‌کم 4K برای استریم و تماس‌های حرفه‌ای.',
    desc: 'بریو فورکی کیفیت تصویر بالایی برای استریم و جلسات دارد.',
    features: ['4K', 'محدوده‌ی دینامیک بالا'],
    inBox: ['وب‌کم', 'کیف'],
    specs: [[{ title: 'مشخصات', items: [['رزولوشن', '4K']] }]],
    attrs: {},
    image: '/img/p/webcam.jpg', gallery: ['/img/p/webcam.jpg']
  }
]

export const FURNITURE_COLLECTIBLES = [
  {
    id: 'chair-racing', sku: 'AUR-FUR-1001',
    name: 'صندلی گیمینگ ارگونومیک با پشتی کامل', nameEn: 'Ergonomic Gaming Chair',
    brand: 'AURORA', cat: 'furniture', sub: 'chair', type: 'physical',
    price: INQ(), stock: 'in', qty: 4,
    warranty: '۲۴ ماه گارانتی', region: 'ایران',
    badges: [], rating: { avg: 4.5, count: 76 }, sold: 98, addedAt: '2026-03-08',
    short: 'صندلی گیمینگ با تنظیم کامل و پشتی کمری.',
    desc: 'برای نشست‌های طولانی، تنظیم ارتفاع، پشتی و دسته‌ها اهمیت دارد.',
    features: ['تنظیم کامل', 'بالش کمری و گردنی'],
    inBox: ['صندلی', 'ابزار نصب'],
    specs: [[{ title: 'مشخصات', items: [['تحمل وزن', 'تا ۱۵۰ کیلوگرم']] }]],
    attrs: {},
    image: '/img/p/gaming-chair.jpg', gallery: ['/img/p/gaming-chair.jpg']
  },
  {
    id: 'desk-l', sku: 'AUR-FUR-2001',
    name: 'میز گیمینگ ال با سطح کربن', nameEn: 'L-Shaped Gaming Desk',
    brand: 'AURORA', cat: 'furniture', sub: 'desk', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۲۴ ماه گارانتی', region: 'ایران',
    badges: [], rating: { avg: 4.4, count: 38 }, sold: 41, addedAt: '2026-04-18',
    short: 'میز ال شکل با سطح طرح کربن و مدیریت کابل.',
    desc: 'میز ال برای ستاپ‌های چندمانیتوره مناسب است.',
    features: ['سطح طرح کربن', 'مدیریت کابل'],
    inBox: ['قطعات میز', 'ابزار نصب'],
    specs: [[{ title: 'مشخصات', items: [['ابعاد', '۱۴۰×۱۴۰ سانتی‌متر']] }]],
    attrs: {},
    image: '/img/p/gaming-desk.jpg', gallery: ['/img/p/gaming-desk.jpg']
  },
  {
    id: 'funko-warrior', sku: 'AUR-COL-1001',
    name: 'فیگور فانکو پاپ — شخصیت جنگجوی افسانه‌ای', nameEn: 'Funko Pop! Gaming Figure',
    brand: 'Funko', cat: 'collectibles', sub: 'figure', type: 'physical',
    price: INQ(), stock: 'in', qty: 10,
    warranty: 'ضمانت اصالت', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 54 }, sold: 87, addedAt: '2026-05-01',
    short: 'فیگور کلکسیونی اورجینال برای طرفدارهای بازی.',
    desc: 'فیگورهای فانکو پاپ از محبوب‌ترین کلکسیون‌های دنیای گیمینگ هستند.',
    features: ['اورجینال', 'جعبه‌ی کلکسیونی'],
    inBox: ['فیگور در جعبه'],
    specs: [[{ title: 'مشخصات', items: [['ارتفاع', 'حدود ۱۰ سانتی‌متر']] }]],
    attrs: {},
    image: '/img/p/figure.jpg', gallery: ['/img/p/figure.jpg']
  },
  {
    id: 'amiibo-set', sku: 'AUR-COL-2001',
    name: 'فیگور آمیبو نینتندو — شخصیت قهرمان', nameEn: 'Nintendo amiibo Figure',
    brand: 'Nintendo', cat: 'collectibles', sub: 'figure', type: 'physical',
    price: INQ(), stock: 'in', qty: 6,
    warranty: 'ضمانت اصالت', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 41 }, sold: 63, addedAt: '2026-05-05',
    short: 'فیگور آمیبو با قابلیت ان‌اف‌سی برای بازی‌های نینتندو.',
    desc: 'آمییبو علاوه بر کلکسیون، در بعضی بازی‌های نینتندو آیتم ویژه باز می‌کند.',
    features: ['قابلیت ان‌اف‌سی', 'اورجینال'],
    inBox: ['فیگور در جعبه'],
    specs: [[{ title: 'مشخصات', items: [['سازگاری', 'سوییچ / سوییچ ۲']] }]],
    attrs: {},
    image: '/img/p/amiibo.jpg', gallery: ['/img/p/amiibo.jpg']
  }
]
