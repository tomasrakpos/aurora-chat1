import { P, INQ } from './meta.js'

// قیمت‌ها از منابع معتبر بازار ایران با تاریخ بررسی ثبت شده‌اند.
// هر جا قیمت معتبر پیدا نشود: «استعلام قیمت» — بدون حدس.

export const CONSOLES = [
  {
    id: 'ps5-slim-disc', sku: 'AUR-CON-1001',
    name: 'کنسول پلی‌استیشن ۵ اسلیم — نسخه دیسک‌خور', nameEn: 'PlayStation 5 Slim (Disc Edition) 1TB',
    brand: 'Sony', cat: 'consoles', sub: 'playstation', type: 'physical',
    price: P(177000000, 'nabz'), stock: 'in', qty: 6,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'اروپا',
    badges: ['best'], rating: { avg: 4.8, count: 214 }, sold: 431, addedAt: '2026-06-10',
    short: 'نسخه‌ی استاندارد نسل نهم سونی با درایو بلوری و یک ترابایت حافظه‌ی پرسرعت.',
    desc: 'پلی‌استیشن ۵ اسلیم جایگزین مدل اصلی شد؛ کوچک‌تر، سبک‌تر و با یک ترابایت حافظه‌ی داخلی. درایو دیسک این نسخه امکان اجرای بازی‌های فیزیکی و تماشای بلوری را می‌دهد. خروجی 4K تا 120 هرتز، پشتیبانی از ری‌تریسینگ و کنترلر DualSense از ویژگی‌های اصلی آن است.',
    features: ['خروجی 4K تا 120 فریم', 'حافظه‌ی داخلی ۱ ترابایت SSD', 'سازگار با بازی‌های نسل قبل پلی‌استیشن', 'پشتیبانی از صدای سه‌بعدی Tempest 3D'],
    inBox: ['کنسول', 'دسته بی‌سیم DualSense', 'کابل برق', 'کابل HDMI', 'پایه‌ی افقی'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Zen 2 — ۸ هسته‌ای ۳٫۵ گیگاهرتز'], ['گرافیک', 'AMD RDNA 2 — ۱۰٫۲۸ ترافلاپس'], ['رم', '16 گیگابایت GDDR6']] },
      { title: 'حافظه و درایو', items: [['حافظه‌ی داخلی', '۱ ترابایت NVMe SSD'], ['درایو نوری', 'بلوری 4K UHD']] },
      { title: 'خروجی و اتصال', items: [['خروجی تصویر', '4K@120Hz / پشتیبانی 8K'], ['پورت', 'HDMI 2.1، USB-A و USB-C'], ['شبکه', 'Wi-Fi 6، گیگابیت اترنت']] },
      { title: 'سایر', items: [['ابعاد', 'حدود ۳۵۸ × ۹۶ × ۲۱۶ میلی‌متر'], ['ریجن', 'اروپا']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'دیسک‌خور' },
    image: '/img/p/ps5-slim.jpg', gallery: ['/img/p/ps5-slim.jpg'],
    fbt: ['dualsense-black', 'wd-sn850x-ps5', 'pulse-3d']
  },
  {
    id: 'ps5-slim-digital', sku: 'AUR-CON-1002',
    name: 'کنسول پلی‌استیشن ۵ اسلیم — نسخه دیجیتال', nameEn: 'PlayStation 5 Slim Digital Edition 1TB',
    brand: 'Sony', cat: 'consoles', sub: 'playstation', type: 'physical',
    price: P(171900000, 'nabz'), stock: 'in', qty: 4,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'اروپا',
    badges: ['best'], rating: { avg: 4.7, count: 168 }, sold: 356, addedAt: '2026-06-10',
    short: 'نسخه‌ی تمام‌دیجیتال پلی‌استیشن ۵ اسلیم؛ بدون درایو دیسک و کمی ارزان‌تر.',
    desc: 'اگر کتابخانه‌ی بازی شما دیجیتالی است، نسخه‌ی دیجیتال انتخاب منطقی‌تری است: همان سخت‌افزار، بدون درایو نوری. در صورت نیاز، درایو بلوری جداگانه به این مدل اضافه می‌شود.',
    features: ['خروجی 4K تا 120 فریم', 'حافظه‌ی داخلی ۱ ترابایت', 'امکان نصب درایو بلوری جداگانه', 'طراحی فشرده‌تر از نسل قبل'],
    inBox: ['کنسول', 'دسته بی‌سیم DualSense', 'کابل برق', 'کابل HDMI', 'پایه‌ی افقی'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Zen 2 — ۸ هسته‌ای ۳٫۵ گیگاهرتز'], ['گرافیک', 'AMD RDNA 2 — ۱۰٫۲۸ ترافلاپس'], ['رم', '16 گیگابایت GDDR6']] },
      { title: 'حافظه', items: [['حافظه‌ی داخلی', '۱ ترابایت NVMe SSD'], ['درایو نوری', 'ندارد']] },
      { title: 'خروجی و اتصال', items: [['خروجی تصویر', '4K@120Hz'], ['پورت', 'HDMI 2.1، USB-A و USB-C'], ['شبکه', 'Wi-Fi 6، گیگابیت اترنت']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'دیجیتال' },
    image: '/img/p/ps5-slim-digital.jpg', gallery: ['/img/p/ps5-slim-digital.jpg'],
    fbt: ['dualsense-white', 'psn-100', 'pulse-elite']
  },
  {
    id: 'ps5-pro', sku: 'AUR-CON-1003',
    name: 'کنسول پلی‌استیشن ۵ پرو — ۲ ترابایت', nameEn: 'PlayStation 5 Pro 2TB',
    brand: 'Sony', cat: 'consoles', sub: 'playstation', type: 'physical',
    price: P(312000000, 'nabz'), stock: 'low', qty: 2,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'اروپا',
    badges: ['hot', 'limited'], rating: { avg: 4.9, count: 96 }, sold: 141, addedAt: '2026-05-02',
    short: 'قوی‌ترین کنسول سونی؛ گرافیک ۱۶٫۷ ترافلاپسی، ۲ ترابایت حافظه و فناوری PSSR.',
    desc: 'پلی‌استیشن ۵ پرو برای بازیکنندگانی ساخته شده که بالاترین کیفیت تصویر را می‌خواهند. پردازنده‌ی گرافیکی قوی‌تر، ری‌تریسینگ پیشرفته و آپ‌اسکیل هوشمند PSSR باعث شده بسیاری از بازی‌ها هم‌زمان کیفیت و نرخ فریم بهتری داشته باشند. این کنسول بدون درایو دیسک عرضه می‌شود و درایو بلوری آن جداگانه در دسترس است.',
    features: ['گرافیک ۱۶٫۷ ترافلاپس', 'فناوری آپ‌اسکیل هوشمند PSSR', 'حافظه‌ی داخلی ۲ ترابایت', 'ری‌تریسینگ پیشرفته'],
    inBox: ['کنسول', 'دسته بی‌سیم DualSense', 'کابل برق', 'کابل HDMI', 'پایه‌ی افقی'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Zen 2 — ۸ هسته‌ای ۳٫۸۵ گیگاهرتز'], ['گرافیک', 'AMD RDNA — ۱۶٫۷ ترافلاپس'], ['رم', '16 گیگابایت GDDR6 + 2 گیگابایت']] },
      { title: 'حافظه', items: [['حافظه‌ی داخلی', '۲ ترابایت NVMe SSD'], ['درایو نوری', 'ندارد — قابل خرید جداگانه']] },
      { title: 'خروجی و اتصال', items: [['خروجی تصویر', '4K@120Hz / پشتیبانی 8K'], ['پورت', 'HDMI 2.1، USB-C'], ['شبکه', 'Wi-Fi 7']] }
    ],
    attrs: { storage: '۲ ترابایت', condition: 'نو', edition: 'پرو' },
    image: '/img/p/ps5-pro.jpg', gallery: ['/img/p/ps5-pro.jpg'],
    fbt: ['dualsense-edge', 'rog-xg27uqdms', 'psn-100']
  },
  {
    id: 'ps4-slim-1tb', sku: 'AUR-CON-1004',
    name: 'کنسول پلی‌استیشن ۴ اسلیم — ۱ ترابایت', nameEn: 'PlayStation 4 Slim 1TB',
    brand: 'Sony', cat: 'consoles', sub: 'playstation', type: 'physical',
    price: P(148100000, 'nabz'), stock: 'in', qty: 3,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'اروپا',
    badges: [], rating: { avg: 4.6, count: 342 }, sold: 512, addedAt: '2026-03-14',
    short: 'هنوز هم یکی از پرفروش‌های بازار ایران؛ کتابخانه‌ی بازی بسیار بزرگ و قیمت مناسب.',
    desc: 'با وجود عرضه‌ی نسل جدید، پلی‌استیشن ۴ اسلیم به‌خاطر کتابخانه‌ی بزرگ بازی و قیمت پایین‌تر همچنان محبوب است. اگر بودجه‌ی محدودی دارید یا برای اتاق دوم کنسول می‌خواهید، گزینه‌ی منطقی است.',
    features: ['کتابخانه‌ی بزرگ بازی', 'درایو بلوری', 'سازگار با هدست‌ها و دسته‌های رایج'],
    inBox: ['کنسول', 'دسته بی‌سیم DualShock 4', 'کابل برق', 'کابل HDMI'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Jaguar — ۸ هسته‌ای ۱٫۶ گیگاهرتز'], ['گرافیک', '۱٫۸۴ ترافلاپس']] },
      { title: 'حافظه', items: [['حافظه‌ی داخلی', '۱ ترابایت']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'اسلیم' },
    image: '/img/p/ps4-slim.jpg', gallery: ['/img/p/ps4-slim.jpg']
  },
  {
    id: 'xbox-series-x', sku: 'AUR-CON-2001',
    name: 'کنسول ایکس‌باکس سری ایکس — ۱ ترابایت', nameEn: 'Xbox Series X 1TB',
    brand: 'Microsoft', cat: 'consoles', sub: 'xbox', type: 'physical',
    price: P(201000000, 'nabz'), stock: 'in', qty: 5,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'آمریکا',
    badges: ['best'], rating: { avg: 4.8, count: 187 }, sold: 298, addedAt: '2026-04-20',
    short: 'قدرتمندترین کنسول مایکروسافت؛ ۱۲ ترافلاپس، ۴K@120 و سرویس گیم‌پس.',
    desc: 'ایکس‌باکس سری ایکس با ۱۲ ترافلاپس قدرت پردازشی، سریع‌ترین تجربه‌ی نسل جدید مایکروسافت را ارائه می‌دهد. نقاط قوت اصلی آن سرویس گیم‌پس، سازگاری گسترده با بازی‌های نسل‌های قبل و خروجی 4K@120 است.',
    features: ['گرافیک ۱۲ ترافلاپس', 'حافظه‌ی ۱ ترابایت پرسرعت', 'اجرای 4K تا 120 فریم', 'بهترین پلتفرم برای گیم‌پس'],
    inBox: ['کنسول', 'دسته بی‌سیم', 'کابل برق', 'کابل HDMI'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Zen 2 — ۸ هسته‌ای ۳٫۸ گیگاهرتز'], ['گرافیک', 'AMD RDNA 2 — ۱۲ ترافلاپس'], ['رم', '16 گیگابایت GDDR6']] },
      { title: 'حافظه', items: [['حافظه‌ی داخلی', '۱ ترابایت'], ['درایو نوری', 'بلوری 4K UHD']] },
      { title: 'خروجی و اتصال', items: [['خروجی تصویر', '4K@120Hz / پشتیبانی 8K'], ['پورت', 'HDMI 2.1، USB-A']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'سری ایکس' },
    image: '/img/p/xbox-series-x.jpg', gallery: ['/img/p/xbox-series-x.jpg'],
    fbt: ['xbox-ctrl-carbon', 'gamepass-ultimate-3m', 'hyperx-cloud-alpha']
  },
  {
    id: 'xbox-series-s', sku: 'AUR-CON-2002',
    name: 'کنسول ایکس‌باکس سری اس — ۵۱۲ گیگابایت', nameEn: 'Xbox Series S 512GB',
    brand: 'Microsoft', cat: 'consoles', sub: 'xbox', type: 'physical',
    price: P(117000000, 'nabz'), stock: 'in', qty: 7,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'آمریکا',
    badges: [], rating: { avg: 4.6, count: 154 }, sold: 267, addedAt: '2026-04-20',
    short: 'ارزان‌ترین راه ورود به نسل جدید ایکس‌باکس؛ کاملاً دیجیتال و جمع‌وجور.',
    desc: 'سری اس نسخه‌ی دیجیتال و اقتصادی ایکس‌باکس جدید است. اجرای بازی‌ها تا 1440p و 120 فریم، ابعاد کوچک و قیمت مناسب، آن را برای گیمرهای دیجیتال و کاربران گیم‌پس جذاب کرده است.',
    features: ['طراحی جمع‌وجور و بدون درایو', 'خروجی 1440p تا 120 فریم', 'مناسب برای گیم‌پس'],
    inBox: ['کنسول', 'دسته بی‌سیم', 'کابل برق', 'کابل HDMI'],
    specs: [
      { title: 'پردازنده و گرافیک', items: [['پردازنده', 'AMD Zen 2 — ۸ هسته‌ای ۳٫۶ گیگاهرتز'], ['گرافیک', '۴ ترافلاپس']] },
      { title: 'حافظه', items: [['حافظه‌ی داخلی', '۵۱۲ گیگابایت']] }
    ],
    attrs: { storage: '۵۱۲ گیگابایت', condition: 'نو', edition: 'سری اس' },
    image: '/img/p/xbox-series-s.jpg', gallery: ['/img/p/xbox-series-s.jpg'],
    fbt: ['xbox-ctrl-white', 'gamepass-ultimate-3m']
  },
  {
    id: 'switch-2', sku: 'AUR-CON-3001',
    name: 'کنسول نینتندو سوییچ ۲', nameEn: 'Nintendo Switch 2',
    brand: 'Nintendo', cat: 'consoles', sub: 'nintendo', type: 'physical',
    price: P(88800000, 'west'), stock: 'in', qty: 4,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'جهانی',
    badges: ['new', 'hot'], rating: { avg: 4.9, count: 88 }, sold: 203, addedAt: '2026-07-01',
    short: 'نسل جدید کنسول هیبریدی نینتندو؛ نمایشگر بزرگ‌تر، جوی‌کان مغناطیسی و سخت‌افزار قوی‌تر.',
    desc: 'سوییچ ۲ ادامه‌ی مسیر کنسول هیبریدی نینتندو است: هم روی تلویزیون و هم به‌صورت دستی. نمایشگر بزرگ‌تر با نرخ نوسازی بالاتر، جوی‌کان‌های مغناطیسی و سخت‌افزار به‌روز، تجربه‌ی روان‌تری برای بازی‌های جدید نینتندو می‌سازد.',
    features: ['حالت دستی و تلویزیون', 'جوی‌کان مغناطیسی', 'سازگاری با بخش بزرگی از بازی‌های سوییچ اول'],
    inBox: ['کنسول', 'جوی‌کان چپ و راست', 'داک', 'آداپتور', 'کابل HDMI'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۷٫۹ اینچ'], ['حافظه‌ی داخلی', '۲۵۶ گیگابایت']] },
      { title: 'سایر', items: [['حالت استفاده', 'دستی / رومیزی / تلویزیون']] }
    ],
    attrs: { storage: '۲۵۶ گیگابایت', condition: 'نو', edition: 'استاندارد' },
    image: '/img/p/switch2.jpg', gallery: ['/img/p/switch2.jpg'],
    fbt: ['mk-world-switch2', 'switch2-pro-ctrl']
  },
  {
    id: 'switch-oled', sku: 'AUR-CON-3002',
    name: 'کنسول نینتندو سوییچ — مدل OLED', nameEn: 'Nintendo Switch OLED Model',
    brand: 'Nintendo', cat: 'consoles', sub: 'nintendo', type: 'physical',
    price: P(74000000, 'west'), stock: 'in', qty: 5,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 261 }, sold: 389, addedAt: '2026-02-10',
    short: 'نسخه‌ی اولد سوییچ با نمایشگر ۷ اینچی باکیفیت؛ همچنان محبوب و پرفروش.',
    desc: 'مدل OLED با نمایشگر ۷ اینچی، رنگ‌های زنده و پایه‌ی نگهدارنده‌ی بزرگ، بهترین تجربه‌ی دستی سوییچ نسل اول را دارد و با قیمت فعلی یکی از منطقی‌ترین انتخاب‌هاست.',
    features: ['نمایشگر ۷ اینچی OLED', 'پایه‌ی قابل تنظیم', '۶۴ گیگابایت حافظه‌ی داخلی'],
    inBox: ['کنسول', 'جوی‌کان', 'داک', 'آداپتور', 'کابل HDMI'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۷ اینچ OLED'], ['حافظه‌ی داخلی', '۶۴ گیگابایت']] }
    ],
    attrs: { storage: '۶۴ گیگابایت', condition: 'نو', edition: 'OLED' },
    image: '/img/p/switch-oled.jpg', gallery: ['/img/p/switch-oled.jpg']
  },
  {
    id: 'switch-lite', sku: 'AUR-CON-3003',
    name: 'کنسول نینتندو سوییچ لایت', nameEn: 'Nintendo Switch Lite',
    brand: 'Nintendo', cat: 'consoles', sub: 'nintendo', type: 'physical',
    price: INQ('قیمت بازار در حال نوسان است؛ برای قیمت روز تماس بگیرید'), stock: 'in', qty: 3,
    warranty: '۱۸ ماه گارانتی سلامت فیزیکی و اصالت کالا', region: 'جهانی',
    badges: [], rating: { avg: 4.5, count: 176 }, sold: 240, addedAt: '2026-01-15',
    short: 'نسخه‌ی دستی و اقتصادی سوییچ؛ سبک، جمع‌وجور و مناسب بازی در حرکت.',
    desc: 'سوییچ لایت فقط برای حالت دستی طراحی شده و به تلویزیون وصل نمی‌شود. برای کسانی که بیشتر در سفر یا تخت بازی می‌کنند، سبک‌ترین گزینه‌ی نینتندو است.',
    features: ['فقط حالت دستی', 'سبک و جمع‌وجور', 'سازگار با بازی‌های حالت دستی سوییچ'],
    inBox: ['کنسول', 'آداپتور'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۵٫۵ اینچ']] }
    ],
    attrs: { storage: '۳۲ گیگابایت', condition: 'نو', edition: 'لایت' },
    image: '/img/p/switch-lite.jpg', gallery: ['/img/p/switch-lite.jpg']
  },
  {
    id: 'steam-deck-oled-512', sku: 'AUR-CON-4001',
    name: 'استیم دک اولد — ۵۱۲ گیگابایت', nameEn: 'Valve Steam Deck OLED 512GB',
    brand: 'Valve', cat: 'consoles', sub: 'handheld', type: 'physical',
    price: P(93980000, 'nakhl'), stock: 'in', qty: 3,
    warranty: '۲۴ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 132 }, sold: 178, addedAt: '2026-05-25',
    short: 'کتابخانه‌ی کامل استیم در جیب شما؛ نمایشگر اولد و باتری بهتر از نسل اول.',
    desc: 'استیم دک اولد نسخه‌ی بهبودیافته‌ی کنسول دستی ولو است: نمایشگر اولد با روشنایی بیشتر، باتری قوی‌تر و وزن کمتر. دسترسی مستقیم به کتابخانه‌ی استیم، آن را به یکی از بهترین گزینه‌های گیمینگ دستی تبدیل کرده است.',
    features: ['نمایشگر ۷٫۴ اینچ اولد', 'دسترسی کامل به استیم', 'باتری بهبودیافته', 'پشتیبانی از کارت حافظه‌ی میکرو'],
    inBox: ['کنسول', 'کیف محافظ', 'شارژر'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۷٫۴ اینچ اولد'], ['حافظه', '۵۱۲ گیگابایت']] },
      { title: 'پلتفرم', items: [['سیستم', 'SteamOS']] }
    ],
    attrs: { storage: '۵۱۲ گیگابایت', condition: 'نو', edition: 'OLED' },
    image: '/img/p/steam-deck.jpg', gallery: ['/img/p/steam-deck.jpg'],
    fbt: ['steam-50']
  },
  {
    id: 'steam-deck-oled-1tb', sku: 'AUR-CON-4002',
    name: 'استیم دک اولد — ۱ ترابایت', nameEn: 'Valve Steam Deck OLED 1TB',
    brand: 'Valve', cat: 'consoles', sub: 'handheld', type: 'physical',
    price: P(109980000, 'nakhl'), stock: 'low', qty: 1,
    warranty: '۲۴ ماه گارانتی', region: 'جهانی',
    badges: ['limited'], rating: { avg: 4.9, count: 64 }, sold: 71, addedAt: '2026-05-25',
    short: 'بالاترین ظرفیت استیم دک با شیشه‌ی مات ضدبازتاب.',
    desc: 'نسخه‌ی یک ترابایتی استیم دک اولد علاوه بر حافظه‌ی بیشتر، شیشه‌ی مات ضدبازتاب دارد که برای بازی در محیط‌های پرنور مناسب‌تر است.',
    features: ['۱ ترابایت حافظه', 'شیشه‌ی مات ضدبازتاب', 'نمایشگر اولد'],
    inBox: ['کنسول', 'کیف محافظ', 'شارژر'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۷٫۴ اینچ اولد — مات'], ['حافظه', '۱ ترابایت']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'OLED' },
    image: '/img/p/steam-deck.jpg', gallery: ['/img/p/steam-deck.jpg']
  },
  {
    id: 'rog-ally-x', sku: 'AUR-CON-4003',
    name: 'ایسوس راگ الای ایکس', nameEn: 'ASUS ROG Ally X',
    brand: 'ASUS', cat: 'consoles', sub: 'handheld', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 58 }, sold: 44, addedAt: '2026-06-30',
    short: 'کنسول دستی ویندوزی ایسوس با باتری بزرگ‌تر و ۲۴ گیگابایت رم.',
    desc: 'راگ الای ایکس نسخه‌ی تقویت‌شده‌ی الای است: باتری بزرگ‌تر، رم بیشتر و ارگونومی بهتر. چون ویندوز دارد، علاوه بر استیم به ایکس‌باکس، اپیک و سایر پلتفرم‌ها هم دسترسی دارید.',
    features: ['پردازنده‌ی AMD Z1 Extreme', '۲۴ گیگابایت رم', 'ویندوز ۱۱ — سازگار با همه‌ی پلتفرم‌ها'],
    inBox: ['کنسول', 'شارژر'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۷ اینچ 1080p 120Hz']] }
    ],
    attrs: { storage: '۱ ترابایت', condition: 'نو', edition: 'X' },
    image: '/img/p/rog-ally.jpg', gallery: ['/img/p/rog-ally.jpg']
  },
  {
    id: 'legion-go', sku: 'AUR-CON-4004',
    name: 'لنوو لیجن گو', nameEn: 'Lenovo Legion Go',
    brand: 'Lenovo', cat: 'consoles', sub: 'handheld', type: 'physical',
    price: INQ(), stock: 'soon',
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.4, count: 31 }, sold: 18, addedAt: '2026-07-20',
    short: 'کنسول دستی لنوو با نمایشگر بزرگ ۸٫۸ اینچی و کنترلرهای جداشونده.',
    desc: 'لیجن گو با نمایشگر بزرگ و کنترلرهای جداشونده، تجربه‌ای متفاوت در گیمینگ دستی ارائه می‌دهد.',
    features: ['نمایشگر ۸٫۸ اینچ', 'کنترلرهای جداشونده'],
    inBox: ['کنسول', 'شارژر'],
    specs: [[{ title: 'نمایشگر', items: [['صفحه', '۸٫۸ اینچ']] }]],
    attrs: { storage: '۵۱۲ گیگابایت', condition: 'نو', edition: 'استاندارد' },
    image: '/img/p/rog-ally.jpg', gallery: ['/img/p/rog-ally.jpg']
  },
  {
    id: 'quest-3-512', sku: 'AUR-CON-5001',
    name: 'هدست واقعیت مجازی متا کوئست ۳ — ۵۱۲ گیگابایت', nameEn: 'Meta Quest 3 512GB',
    brand: 'Meta', cat: 'consoles', sub: 'vr', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 94 }, sold: 88, addedAt: '2026-04-05',
    short: 'هدست مستقل واقعیت مجازی متا با رنگ پاس‌ترو و بدون نیاز به کامپیوتر.',
    desc: 'کوئست ۳ بدون نیاز به کامپیوتر یا کنسول کار می‌کند. وضوح بالا، رنگ پاس‌ترو و کتابخانه‌ی بزرگ بازی‌های مستقل، آن را به محبوب‌ترین هدست واقعیت مجازی بازار تبدیل کرده است.',
    features: ['مستقل — بدون نیاز به کامپیوتر', 'رنگ پاس‌ترو', 'کنترلرهای لمسی نسل جدید'],
    inBox: ['هدست', 'دو کنترلر', 'شارژر'],
    specs: [
      { title: 'نمایشگر', items: [['وضوح', '۲۰۶۴×۲۲۰۸ برای هر چشم']] }
    ],
    attrs: { storage: '۵۱۲ گیگابایت', condition: 'نو', edition: 'استاندارد' },
    image: '/img/p/quest3.jpg', gallery: ['/img/p/quest3.jpg']
  },
  {
    id: 'psvr2', sku: 'AUR-CON-5002',
    name: 'هدست واقعیت مجازی پلی‌استیشن VR2', nameEn: 'PlayStation VR2',
    brand: 'Sony', cat: 'consoles', sub: 'vr', type: 'physical',
    price: P(88000000, 'zoomg', { checked: '2026-07-15T11:00:00+03:30' }), stock: 'low', qty: 1,
    warranty: '۱۸ ماه گارانتی', region: 'اروپا',
    badges: ['limited'], rating: { avg: 4.6, count: 72 }, sold: 54, addedAt: '2026-03-01',
    short: 'واقعیت مجازی نسل جدید برای پلی‌استیشن ۵؛ نمایشگر اولد و ردیابی چشم.',
    desc: 'پلی‌استیشن VR2 با نمایشگر اولد، ردیابی چشم و کنترلرهای هوشمند، عمیق‌ترین تجربه‌ی واقعیت مجازی روی کنسول را ارائه می‌دهد. برای استفاده به کنسول پلی‌استیشن ۵ نیاز دارید.',
    features: ['نمایشگر اولد 4K', 'ردیابی چشم', 'نیازمند پلی‌استیشن ۵'],
    inBox: ['هدست', 'دو کنترلر', 'هندزفری', 'کابل'],
    specs: [
      { title: 'نمایشگر', items: [['وضوح', '۲۰۰۰×۲۰۴۰ برای هر چشم'], ['پنل', 'اولد']] }
    ],
    attrs: { condition: 'نو', edition: 'استاندارد' },
    image: '/img/p/psvr2.jpg', gallery: ['/img/p/psvr2.jpg']
  },
  {
    id: 'ps-portal', sku: 'AUR-CON-5003',
    name: 'پلی‌استیشن پورتال', nameEn: 'PlayStation Portal',
    brand: 'Sony', cat: 'consoles', sub: 'handheld', type: 'physical',
    price: P(34900000, 'zoomg', { checked: '2026-07-15T11:00:00+03:30' }), stock: 'in', qty: 4,
    warranty: '۱۸ ماه گارانتی', region: 'اروپا',
    badges: [], rating: { avg: 4.3, count: 118 }, sold: 167, addedAt: '2026-02-18',
    short: 'نمایشگر ۸ اینچی برای ریموت‌پلی بازی‌های پلی‌استیشن ۵ روی شبکه‌ی خانگی.',
    desc: 'پورتال یک کنسول مستقل نیست؛ بازی‌های پلی‌استیشن ۵ شما را از طریق ریموت‌پلی روی نمایشگر ۸ اینچی خودش اجرا می‌کند. اگر می‌خواهید وقتی تلویزیون در اختیار شما نیست بازی کنید، راه‌حل ساده‌ای است.',
    features: ['نمایشگر ۸ اینچ 1080p 60Hz', 'کنترلر با قابلیت‌های دوال‌سنس', 'نیازمند پلی‌استیشن ۵ و شبکه‌ی پایدار'],
    inBox: ['دستگاه', 'کابل شارژ'],
    specs: [
      { title: 'نمایشگر', items: [['صفحه', '۸ اینچ 1080p']] }
    ],
    attrs: { condition: 'نو', edition: 'استاندارد' },
    image: '/img/p/ps-portal.jpg', gallery: ['/img/p/ps-portal.jpg']
  }
]
