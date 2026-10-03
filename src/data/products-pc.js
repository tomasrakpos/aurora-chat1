import { P, INQ } from './meta.js'

export const PC_PARTS = [
  {
    id: 'asus-tuf-rtx5070', sku: 'AUR-GPU-1001',
    name: 'کارت گرافیک ایسوس TUF Gaming GeForce RTX 5070 OC — ۱۲ گیگابایت', nameEn: 'ASUS TUF Gaming RTX 5070 OC 12GB',
    brand: 'ASUS', cat: 'pc-parts', sub: 'gpu', type: 'physical',
    price: P(126000000, 'torob', { sourceUrl: 'https://torob.com/p/0eee2336-4f3f-4c1f-8bbb-509f9e55c21c/' }), stock: 'in', qty: 3,
    warranty: '۱۸ ماه گارانتی هوشمند سرویس', region: 'جهانی',
    badges: ['new', 'best'], rating: { avg: 4.8, count: 47 }, sold: 62, addedAt: '2026-08-01',
    short: 'گرافیک میان‌رده‌ی قدرتمند انویدیا با معماری بلک‌ول، ۱۲ گیگابایت GDDR7 و DLSS 4.',
    desc: 'RTX 5070 با معماری بلک‌ول و پشتیبانی از DLSS 4، انتخاب منطقی برای گیمینگ 1440p با نرخ فریم بالا است. نسخه‌ی TUF ایسوس خنک‌کننده‌ی سه‌فن، ساخت مقاوم و اورکلاک کارخانه‌ای دارد.',
    features: ['۱۲ گیگابایت GDDR7', 'پشتیبانی DLSS 4 و ری‌تریسینگ نسل جدید', 'خنک‌کننده‌ی سه‌فن', 'خروجی تا 4 نمایشگر'],
    inBox: ['کارت گرافیک', 'پایه‌ی نگهدارنده', 'دفترچه'],
    specs: [
      { title: 'پردازنده‌ی گرافیکی', items: [['معماری', 'NVIDIA Blackwell'], ['هسته‌های CUDA', '۶٬۱۴۴'], ['فرکانس بوست', '۲٬۵۴۲ مگاهرتز (حالت اورکلاک)']] },
      { title: 'حافظه', items: [['ظرفیت', '۱۲ گیگابایت GDDR7'], ['باس', '۱۹۲ بیت'], ['سرعت', '۲۸ گیگابیت بر ثانیه']] },
      { title: 'اتصال و تغذیه', items: [['رابط', 'PCIe 5.0'], ['توان پیشنهادی پاور', '۷۵۰ وات']] }
    ],
    attrs: { vram: '۱۲ گیگابایت', gpuBrand: 'NVIDIA', generation: 'RTX 50' },
    image: '/img/p/gpu.jpg', gallery: ['/img/p/gpu.jpg'],
    fbt: ['ryzen-9800x3d', 'ddr5-32g', 'rm850x']
  },
  {
    id: 'rtx-5080-ventus', sku: 'AUR-GPU-1002',
    name: 'کارت گرافیک ام‌اس‌آی RTX 5080 Ventus 3X — ۱۶ گیگابایت', nameEn: 'MSI GeForce RTX 5080 Ventus 3X 16GB',
    brand: 'MSI', cat: 'pc-parts', sub: 'gpu', type: 'physical',
    price: INQ(), stock: 'in', qty: 1,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: ['hot'], rating: { avg: 4.9, count: 18 }, sold: 14, addedAt: '2026-08-10',
    short: 'گرافیک رده‌بالای بلک‌ول برای گیمینگ 4K؛ ۱۶ گیگابایت GDDR7.',
    desc: 'RTX 5080 برای گیمینگ 4K و کارهای سنگین گرافیکی طراحی شده است. نسخه‌ی ونتوس ۳ فن ام‌اس‌آی طراحی ساده و خنک‌کنندگی مناسبی دارد.',
    features: ['۱۶ گیگابایت GDDR7', 'مناسب 4K', 'سه فن'],
    inBox: ['کارت گرافیک', 'پایه‌ی نگهدارنده'],
    specs: [
      { title: 'حافظه', items: [['ظرفیت', '۱۶ گیگابایت GDDR7']] }
    ],
    attrs: { vram: '۱۶ گیگابایت', gpuBrand: 'NVIDIA', generation: 'RTX 50' },
    image: '/img/p/gpu.jpg', gallery: ['/img/p/gpu.jpg']
  },
  {
    id: 'rx-9070-xt', sku: 'AUR-GPU-1003',
    name: 'کارت گرافیک گیگابایت Radeon RX 9070 XT Gaming OC — ۱۶ گیگابایت', nameEn: 'Gigabyte Radeon RX 9070 XT Gaming OC 16GB',
    brand: 'Gigabyte', cat: 'pc-parts', sub: 'gpu', type: 'physical',
    price: INQ(), stock: 'soon',
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 12 }, sold: 6, addedAt: '2026-08-15',
    short: 'پرچمدار جدید ای‌ام‌دی برای رقابت در رده‌ی بالا؛ ۱۶ گیگابایت حافظه.',
    desc: 'RX 9070 XT با معماری RDNA 4 گزینه‌ی قدرتمند ای‌ام‌دی برای گیمینگ 1440p و 4K است.',
    features: ['۱۶ گیگابایت', 'معماری RDNA 4'],
    inBox: ['کارت گرافیک'],
    specs: [[{ title: 'حافظه', items: [['ظرفیت', '۱۶ گیگابایت']] }]],
    attrs: { vram: '۱۶ گیگابایت', gpuBrand: 'AMD', generation: 'RX 9000' },
    image: '/img/p/gpu.jpg', gallery: ['/img/p/gpu.jpg']
  },
  {
    id: 'ryzen-9800x3d', sku: 'AUR-CPU-1001',
    name: 'پردازنده ای‌ام‌دی Ryzen 7 9800X3D', nameEn: 'AMD Ryzen 7 9800X3D',
    brand: 'AMD', cat: 'pc-parts', sub: 'cpu', type: 'physical',
    price: INQ('موجود — برای قیمت روز تماس بگیرید'), stock: 'in', qty: 4,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: ['hot', 'best'], rating: { avg: 4.9, count: 83 }, sold: 97, addedAt: '2026-06-05',
    short: 'بهترین پردازنده‌ی گیمینگ بازار با فناوری 3D V-Cache.',
    desc: 'رایزن ۷ ۹۸۰۰X3D با کش سه‌بعدی نسل جدید، در بسیاری از بازی‌ها سریع‌ترین پردازنده‌ی دسکتاپ است. سوکت AM5 و پشتیبانی از DDR5، مسیر ارتقای آینده را هم باز نگه می‌دارد.',
    features: ['۸ هسته / ۱۶ رشته', 'فناوری 3D V-Cache', 'سوکت AM5'],
    inBox: ['پردازنده'],
    specs: [
      { title: 'مشخصات', items: [['هسته / رشته', '۸ / ۱۶'], ['سوکت', 'AM5'], ['کش', '۱۰۴ مگابایت']] }
    ],
    attrs: { socket: 'AM5', cores: '۸ هسته', cpuBrand: 'AMD' },
    image: '/img/p/cpu.jpg', gallery: ['/img/p/cpu.jpg'],
    fbt: ['b650-tomahawk', 'ak620']
  },
  {
    id: 'ryzen-5-7600x', sku: 'AUR-CPU-1002',
    name: 'پردازنده ای‌ام‌دی Ryzen 5 7600X', nameEn: 'AMD Ryzen 5 7600X',
    brand: 'AMD', cat: 'pc-parts', sub: 'cpu', type: 'physical',
    price: INQ(), stock: 'in', qty: 6,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 129 }, sold: 156, addedAt: '2026-03-20',
    short: 'گزینه‌ی خوش‌قیمت ۶ هسته‌ای برای سیستم‌های گیمینگ میان‌رده.',
    desc: 'رایزن ۵ ۷۶۰۰X برای سیستم‌های گیمینگ میان‌رده یکی از متعادل‌ترین انتخاب‌هاست: ۶ هسته‌ی سریع و قیمت مناسب.',
    features: ['۶ هسته / ۱۲ رشته', 'سوکت AM5'],
    inBox: ['پردازنده'],
    specs: [[{ title: 'مشخصات', items: [['هسته / رشته', '۶ / ۱۲'], ['سوکت', 'AM5']] }]],
    attrs: { socket: 'AM5', cores: '۶ هسته', cpuBrand: 'AMD' },
    image: '/img/p/cpu.jpg', gallery: ['/img/p/cpu.jpg']
  },
  {
    id: 'i7-14700k', sku: 'AUR-CPU-1003',
    name: 'پردازنده اینتل Core i7-14700K', nameEn: 'Intel Core i7-14700K',
    brand: 'Intel', cat: 'pc-parts', sub: 'cpu', type: 'physical',
    price: INQ(), stock: 'in', qty: 3,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 96 }, sold: 121, addedAt: '2026-02-02',
    short: '۲۰ هسته برای ترکیب گیمینگ و کارهای سنگین.',
    desc: 'i7-14700K با ۲۰ هسته، هم در بازی و هم در رندر و ادیت عملکرد بسیار خوبی دارد.',
    features: ['۲۰ هسته / ۲۸ رشته', 'سوکت LGA1700', 'ضریب باز'],
    inBox: ['پردازنده'],
    specs: [[{ title: 'مشخصات', items: [['هسته / رشته', '۲۰ / ۲۸'], ['سوکت', 'LGA1700']] }]],
    attrs: { socket: 'LGA1700', cores: '۲۰ هسته', cpuBrand: 'Intel' },
    image: '/img/p/cpu.jpg', gallery: ['/img/p/cpu.jpg']
  },
  {
    id: 'b650-tomahawk', sku: 'AUR-MB-1001',
    name: 'مادربرد ام‌اس‌آی MAG B650 Tomahawk WiFi', nameEn: 'MSI MAG B650 Tomahawk WiFi',
    brand: 'MSI', cat: 'pc-parts', sub: 'motherboard', type: 'physical',
    price: INQ(), stock: 'in', qty: 5,
    warranty: '۱۸ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 64 }, sold: 82, addedAt: '2026-04-11',
    short: 'مادربرد محبوب و متعادل AM5 با وای‌فای داخلی.',
    desc: 'B650 توم‌هاوک یکی از پرفروش‌ترین مادربردهای سوکت AM5 است: مدار تغذیه‌ی قوی، وای‌فای داخلی و قیمت منطقی.',
    features: ['سوکت AM5', 'DDR5', 'Wi-Fi 6E'],
    inBox: ['مادربرد', 'آنتن', 'کابل ساتا'],
    specs: [[{ title: 'مشخصات', items: [['سوکت', 'AM5'], ['رم', '۴ اسلات DDR5']] }]],
    attrs: { socket: 'AM5', ramType: 'DDR5' },
    image: '/img/p/motherboard.jpg', gallery: ['/img/p/motherboard.jpg']
  },
  {
    id: 'ddr5-32g', sku: 'AUR-RAM-1001',
    name: 'رم کورسیر Vengeance DDR5 — ۳۲ گیگابایت ۶۰۰۰', nameEn: 'Corsair Vengeance DDR5 32GB 6000MHz',
    brand: 'Corsair', cat: 'pc-parts', sub: 'ram', type: 'physical',
    price: INQ(), stock: 'in', qty: 8,
    warranty: 'مادام‌العمر', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 77 }, sold: 134, addedAt: '2026-05-09',
    short: 'دو ماژول ۱۶ گیگابایتی ۶۰۰۰ مگاهرتز؛ انتخاب استاندارد سیستم‌های گیمینگ جدید.',
    desc: '۳۲ گیگابایت رم ۶۰۰۰ مگاهرتز امروز نقطه‌ی شیرین سیستم‌های گیمینگ است. ونجنس کورسیر پروفایل EXPO برای رایزن و XMP برای اینتل دارد.',
    features: ['۲×۱۶ گیگابایت', '۶۰۰۰ مگاهرتز', 'پروفایل EXPO و XMP'],
    inBox: ['دو ماژول رم'],
    specs: [[{ title: 'مشخصات', items: [['ظرفیت', '۲×۱۶ گیگابایت'], ['فرکانس', '۶۰۰۰ مگاهرتز'], ['نوع', 'DDR5']] }]],
    attrs: { ramType: 'DDR5', capacity: '۳۲ گیگابایت' },
    image: '/img/p/ram.jpg', gallery: ['/img/p/ram.jpg']
  },
  {
    id: 'samsung-990-pro', sku: 'AUR-SSD-1001',
    name: 'حافظه اس‌اس‌دی سامسونگ 990 Pro — ۲ ترابایت', nameEn: 'Samsung 990 Pro 2TB NVMe',
    brand: 'Samsung', cat: 'pc-parts', sub: 'storage', type: 'physical',
    price: INQ(), stock: 'in', qty: 6,
    warranty: '۶۰ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.9, count: 108 }, sold: 187, addedAt: '2026-03-30',
    short: 'یکی از سریع‌ترین درایوهای نسل چهارم؛ مناسب پلی‌استیشن ۵ و سیستم‌های گیمینگ.',
    desc: '990 Pro با سرعت خواندن تا ۷٬۴۵۰ مگابایت بر ثانیه، برای بازی، ادیت و استفاده در اسلات پلی‌استیشن ۵ (با هیت‌سینک) انتخاب مطمئنی است.',
    features: ['NVMe نسل چهارم', 'خواندن تا ۷٬۴۵۰ مگابایت بر ثانیه', 'سازگار با اسلات توسعه‌ی پلی‌استیشن ۵'],
    inBox: ['درایو'],
    specs: [[{ title: 'مشخصات', items: [['ظرفیت', '۲ ترابایت'], ['رابط', 'M.2 NVMe PCIe 4.0']] }]],
    attrs: { capacity: '۲ ترابایت', interface: 'NVMe' },
    image: '/img/p/ssd.jpg', gallery: ['/img/p/ssd.jpg']
  },
  {
    id: 'wd-sn850x-ps5', sku: 'AUR-SSD-1002',
    name: 'حافظه وسترن دیجیتال SN850X با هیت‌سینک — ۲ ترابایت', nameEn: 'WD Black SN850X 2TB (Heatsink)',
    brand: 'WD', cat: 'pc-parts', sub: 'storage', type: 'physical',
    price: INQ(), stock: 'in', qty: 4,
    warranty: '۶۰ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.8, count: 91 }, sold: 143, addedAt: '2026-04-15',
    short: 'درایو رسمی پیشنهادی برای ارتقای حافظه‌ی پلی‌استیشن ۵.',
    desc: 'SN850X با هیت‌سینک آماده‌ی نصب در اسلات توسعه‌ی پلی‌استیشن ۵ است و سرعت موردنیاز سونی را دارد.',
    features: ['هیت‌سینک داخلی', 'خواندن تا ۷٬۳۰۰ مگابایت بر ثانیه', 'سازگار با پلی‌استیشن ۵'],
    inBox: ['درایو با هیت‌سینک'],
    specs: [[{ title: 'مشخصات', items: [['ظرفیت', '۲ ترابایت'], ['رابط', 'M.2 NVMe PCIe 4.0']] }]],
    attrs: { capacity: '۲ ترابایت', interface: 'NVMe' },
    image: '/img/p/ssd.jpg', gallery: ['/img/p/ssd.jpg']
  },
  {
    id: 'rm850x', sku: 'AUR-PSU-1001',
    name: 'پاور کورسیر RM850x — ۸۵۰ وات تمام‌ماژولار', nameEn: 'Corsair RM850x 850W Fully Modular',
    brand: 'Corsair', cat: 'pc-parts', sub: 'psu', type: 'physical',
    price: INQ(), stock: 'in', qty: 5,
    warranty: '۱۲۰ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.9, count: 88 }, sold: 112, addedAt: '2026-05-18',
    short: 'پاور استاندارد طلایی و بی‌صدا برای سیستم‌های رده‌بالا.',
    desc: 'RM850x با گواهی طلایی، خازن‌های ژاپنی و فن بی‌صدا، یکی از مطمئن‌ترین پاورهای بازار است.',
    features: ['۸۵۰ وات', 'گواهی 80Plus طلایی', 'تمام‌ماژولار'],
    inBox: ['پاور', 'کابل‌ها'],
    specs: [[{ title: 'مشخصات', items: [['توان', '۸۵۰ وات'], ['گواهی', '80Plus طلایی']] }]],
    attrs: { wattage: '۸۵۰ وات' },
    image: '/img/p/psu.jpg', gallery: ['/img/p/psu.jpg']
  },
  {
    id: 'h5-flow', sku: 'AUR-CASE-1001',
    name: 'کیس ان‌زد‌ایکس‌تی H5 Flow', nameEn: 'NZXT H5 Flow',
    brand: 'NZXT', cat: 'pc-parts', sub: 'case', type: 'physical',
    price: INQ(), stock: 'in', qty: 4,
    warranty: '۲۴ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.7, count: 52 }, sold: 66, addedAt: '2026-06-08',
    short: 'کیس مینیمال با جریان هوای عالی و مدیریت کابل آسان.',
    desc: 'H5 Flow طراحی ساده و جریان هوای خوبی دارد و مدیریت کابل در آن راحت است.',
    features: ['جریان هوای بالا', 'پنل شیشه‌ای', 'دو فن همراه'],
    inBox: ['کیس', 'پیچ و متعلقات'],
    specs: [[{ title: 'مشخصات', items: [['فرم', 'ATX']] }]],
    attrs: { form: 'ATX' },
    image: '/img/p/case.jpg', gallery: ['/img/p/case.jpg']
  },
  {
    id: 'ak620', sku: 'AUR-COOL-1001',
    name: 'خنک‌کننده دیپ‌کول AK620', nameEn: 'DeepCool AK620',
    brand: 'DeepCool', cat: 'pc-parts', sub: 'cooling', type: 'physical',
    price: INQ(), stock: 'in', qty: 7,
    warranty: '۲۴ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 117 }, sold: 198, addedAt: '2026-02-25',
    short: 'خنک‌کننده‌ی بادی دوبرجی با عملکرد نزدیک به واترکولینگ.',
    desc: 'AK620 یکی از بهترین خنک‌کننده‌های بادی بازار است؛ ساکت، قوی و خوش‌قیمت.',
    features: ['دو برج / دو فن', 'مناسب پردازنده‌های پرمصرف', 'نصب آسان'],
    inBox: ['خنک‌کننده', 'خمیر سیلیکون', 'براکت'],
    specs: [[{ title: 'مشخصات', items: [['نوع', 'بادی دوبرجی']] }]],
    attrs: { coolerType: 'بادی' },
    image: '/img/p/cooler.jpg', gallery: ['/img/p/cooler.jpg']
  }
]

export const MONITORS = [
  {
    id: 'rog-xg27uqr', sku: 'AUR-MON-1001',
    name: 'مانیتور ایسوس ROG Strix XG27UQR — ۲۷ اینچ 4K 144Hz', nameEn: 'ASUS ROG Strix XG27UQR 27" 4K 144Hz',
    brand: 'ASUS', cat: 'monitors', sub: '4k', type: 'physical',
    price: P(189800000, 'pspro', { sourceUrl: 'https://pspro.ir/product/asus-rog-strix-xg27uqr-4k-gaming-monitor' }), stock: 'in', qty: 2,
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: ['best'], rating: { avg: 4.8, count: 41 }, sold: 37, addedAt: '2026-07-12',
    short: 'مانیتور 4K مناسب پلی‌استیشن ۵ و سیستم‌های رده‌بالا؛ ۱۴۴ هرتز با پنل فست‌آی‌پی‌اس.',
    desc: 'XG27UQR یکی از متعادل‌ترین مانیتورهای 4K گیمینگ است: رزولوشن کامل برای پلی‌استیشن ۵ و کارت‌های رده‌بالا، ۱۴۴ هرتز برای بازی‌های سریع و پنل فست‌آی‌پی‌اس با پوشش رنگی خوب.',
    features: ['4K 144Hz', 'پنل Fast IPS', 'مناسب کنسول نسل جدید'],
    inBox: ['مانیتور', 'پایه', 'کابل‌های اتصال'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '3840×2160'], ['پنل', 'Fast IPS'], ['نرخ نوسازی', '۱۴۴ هرتز'], ['زمان پاسخ', '۱ میلی‌ثانیه']] },
      { title: 'گیمینگ', items: [['سنکرون', 'G-Sync Compatible / FreeSync'], ['HDR', 'پشتیبانی']] },
      { title: 'پورت‌ها', items: [['ورودی', 'HDMI 2.1، DisplayPort']] }
    ],
    attrs: { resolution: '4K', refresh: '۱۴۴ هرتز', panel: 'IPS', size: '۲۷ اینچ', curved: 'تخت', sync: 'G-Sync/FreeSync' },
    image: '/img/p/monitor-4k.jpg', gallery: ['/img/p/monitor-4k.jpg'],
    fbt: ['ps5-pro', 'rog-ally-x']
  },
  {
    id: 'rog-xg27aqdng', sku: 'AUR-MON-1002',
    name: 'مانیتور ایسوس ROG Strix OLED XG27AQDNG — ۲۷ اینچ 2K 360Hz', nameEn: 'ASUS ROG Strix OLED XG27AQDNG 27" 2K 360Hz',
    brand: 'ASUS', cat: 'monitors', sub: 'oled', type: 'physical',
    price: P(340000000, 'pspro', { sourceUrl: 'https://pspro.ir/product/asus-rog-strix-oled-xg27aqdng-2k-gaming-monitor' }), stock: 'low', qty: 1,
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: ['hot', 'limited'], rating: { avg: 4.9, count: 22 }, sold: 12, addedAt: '2026-08-20',
    short: 'مانیتور حرفه‌ای ای‌اسپورت؛ اولد ۳۶۰ هرتز برای رقابتی‌ترین بازیکن‌ها.',
    desc: 'XG27AQDNG برای ای‌اسپورت حرفه‌ای ساخته شده: پنل اولد با نرخ نوسازی ۳۶۰ هرتز، پاسخ‌دهی آنی و سیاهی مطلق.',
    features: ['پنل اولد', '۳۶۰ هرتز', 'پاسخ‌دهی زیر ۰٫۱ میلی‌ثانیه'],
    inBox: ['مانیتور', 'پایه', 'کابل‌ها'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '2560×1440'], ['پنل', 'OLED'], ['نرخ نوسازی', '۳۶۰ هرتز'], ['زمان پاسخ', '۰٫۰۳ میلی‌ثانیه']] }
    ],
    attrs: { resolution: '2K', refresh: '۳۶۰ هرتز', panel: 'OLED', size: '۲۷ اینچ', curved: 'تخت', sync: 'G-Sync Compatible' },
    image: '/img/p/monitor-oled.jpg', gallery: ['/img/p/monitor-oled.jpg']
  },
  {
    id: 'rog-xg27uqdms', sku: 'AUR-MON-1003',
    name: 'مانیتور ایسوس ROG Strix OLED XG27UQDMS — ۲۷ اینچ 4K 240Hz', nameEn: 'ASUS ROG Strix OLED XG27UQDMS 27" 4K 240Hz',
    brand: 'ASUS', cat: 'monitors', sub: 'oled', type: 'physical',
    price: P(350000000, 'pspro', { sourceUrl: 'https://pspro.ir/product/asus-rog-strix-oled-xg27uqdms-4k-gaming-monitor' }), stock: 'low', qty: 1,
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: ['new', 'hot'], rating: { avg: 4.9, count: 15 }, sold: 8, addedAt: '2026-09-01',
    short: 'ترکیب کمیاب 4K و ۲۴۰ هرتز روی پنل اولد.',
    desc: 'اگر هم رزولوشن کامل و هم نرخ فریم بالا می‌خواهید، این مانیتور یکی از معدود گزینه‌های بازار است.',
    features: ['4K 240Hz', 'پنل اولد'],
    inBox: ['مانیتور', 'پایه', 'کابل‌ها'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '3840×2160'], ['پنل', 'OLED'], ['نرخ نوسازی', '۲۴۰ هرتز']] }
    ],
    attrs: { resolution: '4K', refresh: '۲۴۰ هرتز', panel: 'OLED', size: '۲۷ اینچ', curved: 'تخت', sync: 'G-Sync Compatible' },
    image: '/img/p/monitor-oled.jpg', gallery: ['/img/p/monitor-oled.jpg']
  },
  {
    id: 'tuf-vg279q5r', sku: 'AUR-MON-1004',
    name: 'مانیتور ایسوس TUF Gaming VG279Q5R — ۲۷ اینچ 200Hz', nameEn: 'ASUS TUF Gaming VG279Q5R 27" FHD 200Hz',
    brand: 'ASUS', cat: 'monitors', sub: 'fhd', type: 'physical',
    price: P(60000000, 'pspro', { sourceUrl: 'https://pspro.ir/product/asus-tuf-gaming-vg279q5r-fullhd-monitor' }), stock: 'in', qty: 3,
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.6, count: 57 }, sold: 74, addedAt: '2026-08-25',
    short: 'گزینه‌ی اقتصادی ای‌اسپورت؛ ۲۰۰ هرتز با قیمت مناسب.',
    desc: 'VG279Q5R برای بازیکن‌های شوتر که نرخ نوسازی بالا را به رزولوشن ترجیح می‌دهند، انتخاب هوشمندانه‌ای است.',
    features: ['۲۰۰ هرتز', 'پنل فست‌آی‌پی‌اس', 'مناسب شوتر رقابتی'],
    inBox: ['مانیتور', 'پایه', 'کابل‌ها'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '1920×1080'], ['پنل', 'IPS'], ['نرخ نوسازی', '۲۰۰ هرتز']] }
    ],
    attrs: { resolution: 'Full HD', refresh: '۲۰۰ هرتز', panel: 'IPS', size: '۲۷ اینچ', curved: 'تخت', sync: 'FreeSync' },
    image: '/img/p/monitor-esports.jpg', gallery: ['/img/p/monitor-esports.jpg']
  },
  {
    id: 'va279hg', sku: 'AUR-MON-1005',
    name: 'مانیتور ایسوس VA279HG — ۲۷ اینچ', nameEn: 'ASUS VA279HG 27" FHD',
    brand: 'ASUS', cat: 'monitors', sub: 'fhd', type: 'physical',
    price: P(49000000, 'pspro', { sourceUrl: 'https://pspro.ir/product/asus-va279hg-fullhd-monitor' }), stock: 'in', qty: 4,
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: [], rating: { avg: 4.4, count: 38 }, sold: 49, addedAt: '2026-08-25',
    short: 'مانیتور اقتصادی برای بازی سبک و استفاده‌ی روزمره.',
    desc: 'برای ستاپ دوم یا شروع گیمینگ با بودجه‌ی محدود، گزینه‌ی مناسبی است.',
    features: ['پنل IPS', 'محافظ چشم'],
    inBox: ['مانیتور', 'پایه', 'کابل‌ها'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '1920×1080'], ['پنل', 'IPS']] }
    ],
    attrs: { resolution: 'Full HD', refresh: '۱۰۰ هرتز', panel: 'IPS', size: '۲۷ اینچ', curved: 'تخت', sync: 'ندارد' },
    image: '/img/p/monitor-esports.jpg', gallery: ['/img/p/monitor-esports.jpg']
  },
  {
    id: 'odyssey-g9', sku: 'AUR-MON-1006',
    name: 'مانیتور سامسونگ Odyssey G9 — ۴۹ اینچ التراواید', nameEn: 'Samsung Odyssey G9 49" Ultrawide',
    brand: 'Samsung', cat: 'monitors', sub: 'ultrawide', type: 'physical',
    price: INQ(), stock: 'soon',
    warranty: '۳۶ ماه گارانتی', region: 'جهانی',
    badges: ['limited'], rating: { avg: 4.7, count: 26 }, sold: 9, addedAt: '2026-09-10',
    short: 'غول التراواید سامسونگ؛ معادل دو مانیتور ۲۷ اینچ کنار هم.',
    desc: 'G9 با انحنای زیاد و عرض ۴۹ اینچ، یکی از خاص‌ترین تجربه‌های گیمینگ را می‌سازد.',
    features: ['۴۹ اینچ التراواید', 'خمیده'],
    inBox: ['مانیتور', 'پایه', 'کابل‌ها'],
    specs: [
      { title: 'نمایشگر', items: [['اندازه', '۴۹ اینچ'], ['رزولوشن', '5120×1440']] }
    ],
    attrs: { resolution: 'DQHD', refresh: '۲۴۰ هرتز', panel: 'VA', size: '۴۹ اینچ', curved: 'خمیده', sync: 'G-Sync/FreeSync' },
    image: '/img/p/monitor-ultrawide.jpg', gallery: ['/img/p/monitor-ultrawide.jpg']
  }
]

export const SYSTEMS = [
  {
    id: 'aurora-start', sku: 'AUR-SYS-1001',
    name: 'سیستم گیمینگ آورورا START — Ryzen 7 9700X / RTX 5070', nameEn: 'AURORA START Gaming PC',
    brand: 'AURORA', cat: 'systems', sub: 'prebuilt', type: 'physical',
    price: INQ('اسمبل سفارشی — برای قیمت روز کانفیگ تماس بگیرید'), stock: 'custom',
    warranty: '۲۴ ماه گارانتی اسمبل + گارانتی قطعات', region: 'ایران',
    badges: ['best'], rating: { avg: 4.9, count: 34 }, sold: 41, addedAt: '2026-07-05',
    short: 'کانفیگ متعادل آورورا برای گیمینگ 1440p؛ اسمبل حرفه‌ای با تست پایداری.',
    desc: 'سیستم‌های آماده‌ی آورورا با قطعات اصلی، اسمبل مرتب با مدیریت کابل و تست پایداری ۲۴ ساعته تحویل می‌شوند. کانفیگ قابل شخصی‌سازی است.',
    features: ['پردازنده‌ی رایزن ۷ ۹۷۰۰X', 'گرافیک RTX 5070', '۳۲ گیگابایت رم DDR5', 'اسمبل و تست در آورورا'],
    inBox: ['سیستم اسمبل‌شده', 'کابل برق', 'جعبه‌ی قطعات'],
    specs: [
      { title: 'کانفیگ پایه', items: [['پردازنده', 'AMD Ryzen 7 9700X'], ['گرافیک', 'RTX 5070 12GB'], ['رم', '32GB DDR5'], ['حافظه', '1TB NVMe']] }
    ],
    attrs: { gpu: 'RTX 5070' },
    image: '/img/p/gaming-pc.jpg', gallery: ['/img/p/gaming-pc.jpg']
  },
  {
    id: 'aurora-ultra', sku: 'AUR-SYS-1002',
    name: 'سیستم گیمینگ آورورا ULTRA — Ryzen 9800X3D / RTX 5090', nameEn: 'AURORA ULTRA Gaming PC',
    brand: 'AURORA', cat: 'systems', sub: 'prebuilt', type: 'physical',
    price: INQ('اسمبل سفارشی — برای قیمت روز کانفیگ تماس بگیرید'), stock: 'custom',
    warranty: '۲۴ ماه گارانتی اسمبل + گارانتی قطعات', region: 'ایران',
    badges: ['hot', 'limited'], rating: { avg: 5, count: 11 }, sold: 7, addedAt: '2026-08-12',
    short: 'پرچمدار آورورا برای گیمینگ 4K بدون هیچ سازش.',
    desc: 'ULTRA قوی‌ترین سیستم آماده‌ی ماست؛ برای کسانی که بالاترین نرخ فریم را در 4K می‌خواهند.',
    features: ['پردازنده‌ی رایزن ۷ ۹۸۰۰X3D', 'گرافیک RTX 5090', '۶۴ گیگابایت رم', 'خنک‌کننده‌ی مایع ۳۶۰'],
    inBox: ['سیستم اسمبل‌شده', 'کابل برق', 'جعبه‌ی قطعات'],
    specs: [
      { title: 'کانفیگ پایه', items: [['پردازنده', 'AMD Ryzen 7 9800X3D'], ['گرافیک', 'RTX 5090'], ['رم', '64GB DDR5'], ['حافظه', '2TB NVMe']] }
    ],
    attrs: { gpu: 'RTX 5090' },
    image: '/img/p/gaming-pc.jpg', gallery: ['/img/p/gaming-pc.jpg']
  },
  {
    id: 'rog-strix-g16', sku: 'AUR-SYS-2001',
    name: 'لپ‌تاپ ایسوس ROG Strix G16 — RTX 5070 Laptop', nameEn: 'ASUS ROG Strix G16',
    brand: 'ASUS', cat: 'systems', sub: 'laptop', type: 'physical',
    price: INQ(), stock: 'in', qty: 2,
    warranty: '۲۴ ماه گارانتی', region: 'جهانی',
    badges: ['new'], rating: { avg: 4.7, count: 29 }, sold: 21, addedAt: '2026-08-30',
    short: 'لپ‌تاپ گیمینگ ۱۶ اینچی ایسوس با گرافیک نسل جدید.',
    desc: 'Strix G16 برای گیمرهایی که به جابه‌جایی نیاز دارند، قدرت دسکتاپ را در بدنه‌ی لپ‌تاپ ارائه می‌دهد.',
    features: ['نمایشگر ۱۶ اینچ', 'گرافیک سری ۵۰ لپ‌تاپ'],
    inBox: ['لپ‌تاپ', 'شارژر'],
    specs: [
      { title: 'مشخصات', items: [['نمایشگر', '۱۶ اینچ'], ['گرافیک', 'RTX 5070 Laptop']] }
    ],
    attrs: { gpu: 'RTX 5070' },
    image: '/img/p/gaming-laptop.jpg', gallery: ['/img/p/gaming-laptop.jpg']
  }
]
