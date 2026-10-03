import { P, PUSD, INQ } from './meta.js'

// بازی‌ها با «جلد تایپوگرافیک» نمایش داده می‌شوند (cover) تا از حق نشر
// تصاویر رسمی کاور بازی‌ها استفاده نشده باشد. مشخصات و تاریخ‌ها رسمی‌اند.

const G = (o) => ({
  type: o.digital ? 'digital' : 'physical',
  cat: 'games',
  coverTitle: true,
  warranty: o.digital ? 'تحویل کد فعال‌سازی قانونی' : 'ضمانت اصالت دیسک',
  badges: [], ...o
})

export const GAMES = [
  G({
    id: 'fc27-ps5', sku: 'AUR-GME-2001',
    name: 'بازی EA SPORTS FC 27 — پلی‌استیشن ۵ (دیسک)', nameEn: 'EA SPORTS FC 27 — PS5 Disc',
    brand: 'EA Sports', sub: 'ps5',
    price: INQ('برای قیمت روز دیسک تماس بگیرید'), stock: 'in', qty: 10,
    region: 'اروپا', rating: { avg: 4.4, count: 63 }, sold: 187, addedAt: '2026-09-25',
    badges: ['new', 'best'],
    short: 'جدیدترین نسخه‌ی شبیه‌ساز فوتبال الکترونیک آرتز با حالت جدید The Grounds.',
    desc: 'EA SPORTS FC 27 با حالت جدید «The Grounds» آمده است؛ هاب اجتماعی فوتبال‌های کوچک‌نفره که تا ۱۰۰ بازیکن را کنار هم قرار می‌دهد. بیش از ۳۵ لیگ، ۱۳۰ ورزشگاه و ۲۱ هزار بازیکن لایسنس‌شده در بازی حضور دارند.',
    features: ['حالت جدید The Grounds', 'بیش از ۳۵ لیگ رسمی', '۱۳۰+ ورزشگاه', '۲۱٬۰۰۰+ بازیکن لایسنس‌شده'],
    inBox: ['دیسک بازی', 'برگه‌ی راهنما'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'ورزشی — فوتبال'], ['توسعه‌دهنده', 'EA Vancouver / EA Romania'], ['ناشر', 'Electronic Arts'], ['تاریخ عرضه', '۲۵ سپتامبر ۲۰۲۶'], ['رده‌بندی سنی', '+۳ (عمومی)'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'ورزشی', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'pitch', title: 'EA SPORTS FC 27', sub: 'PS5' },
    delivery: null
  }),
  G({
    id: 'fc27-steam', sku: 'AUR-GME-2002',
    name: 'بازی EA SPORTS FC 27 — کد استیم', nameEn: 'EA SPORTS FC 27 — Steam Code',
    brand: 'EA Sports', sub: 'pc', digital: true,
    price: P(9720000, 'torob', { sourceUrl: 'https://torob.com/p/c77c3f3d-9637-46d6-af26-583766b0e326/', note: 'قیمت کد استیم در ترب — ارزان‌ترین فروشنده' }), stock: 'in', qty: 50,
    region: 'Global', rating: { avg: 4.3, count: 41 }, sold: 122, addedAt: '2026-09-25',
    badges: ['digital', 'new'],
    short: 'کد دیجیتال نسخه‌ی استیم؛ تحویل آنی پس از پرداخت.',
    desc: 'پس از پرداخت، کد فعال‌سازی استیم به‌صورت آنی تحویل می‌شود. این کد در اکانت استیم خود شما فعال می‌شود و هیچ نیازی به اکانت واسط نیست.',
    features: ['کد رسمی استیم', 'فعال‌سازی روی اکانت شخصی شما', 'تحویل آنی'],
    inBox: [],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'کامپیوتر — استیم'], ['ژانر', 'ورزشی — فوتبال'], ['ناشر', 'Electronic Arts'], ['تاریخ عرضه', '۲۵ سپتامبر ۲۰۲۶'], ['نسخه', 'استاندارد — دیجیتال']] },
      { title: 'اطلاعات خرید دیجیتال', items: [['ریجن', 'Global'], ['روش تحویل', 'کد فعال‌سازی — آنی'], ['اعتبار کد', 'نامحدود']] }
    ],
    attrs: { genre: 'ورزشی', format: 'دیجیتال', status: 'عرضه‌شده', platform: 'استیم', region: 'Global', delivery: 'آنی' },
    cover: { bg: 'pitch', title: 'EA SPORTS FC 27', sub: 'STEAM' },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی — بلافاصله پس از پرداخت', instructions: 'کد را در بخش Activate a Product استیم وارد کنید.', validity: 'نامحدود', restrictions: 'برای اولین فعال‌سازی به اینترنت نیاز است.' }
  }),
  G({
    id: 'fc27-xbox', sku: 'AUR-GME-2003',
    name: 'بازی EA SPORTS FC 27 — ایکس‌باکس (دیجیتال)', nameEn: 'EA SPORTS FC 27 — Xbox Digital',
    brand: 'EA Sports', sub: 'xbox', digital: true,
    price: P(17022000, 'torob', { sourceUrl: 'https://torob.com/p/12d8d19d-fcba-4765-8c71-88d04d4a2784/', note: 'قیمت نسخه‌ی دیجیتال ایکس‌باکس در ترب' }), stock: 'in', qty: 30,
    region: 'آمریکا', rating: { avg: 4.4, count: 18 }, sold: 34, addedAt: '2026-09-25',
    badges: ['digital'],
    short: 'نسخه‌ی دیجیتال ایکس‌باکس سری ایکس/اس.',
    desc: 'کد دیجیتال نسخه‌ی ایکس‌باکس، تحویل آنی و فعال‌سازی روی اکانت شخصی.',
    features: ['کد رسمی فروشگاه مایکروسافت', 'تحویل آنی'],
    inBox: [],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'ایکس‌باکس سری ایکس/اس'], ['ژانر', 'ورزشی — فوتبال'], ['ناشر', 'Electronic Arts'], ['نسخه', 'استاندارد — دیجیتال']] },
      { title: 'اطلاعات خرید دیجیتال', items: [['ریجن', 'آمریکا'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { genre: 'ورزشی', format: 'دیجیتال', status: 'عرضه‌شده', platform: 'ایکس‌باکس', region: 'آمریکا', delivery: 'آنی' },
    cover: { bg: 'pitch', title: 'EA SPORTS FC 27', sub: 'XBOX' },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'کد را در بخش Redeem Code فروشگاه مایکروسافت وارد کنید.', validity: 'نامحدود', restrictions: 'ریجن اکانت باید با ریجن کد هماهنگ باشد.' }
  }),
  G({
    id: 'gta6-ps5-std', sku: 'AUR-GME-3001',
    name: 'بازی Grand Theft Auto VI — پلی‌استیشن ۵ (پیش‌خرید استاندارد)', nameEn: 'GTA VI — PS5 Standard Pre-Order',
    brand: 'Rockstar Games', sub: 'preorder',
    price: PUSD(79.99, 'rockstar', { round: true, note: 'قیمت رسمی استاندارد راک‌استار ۷۹٫۹۹ دلار — تبدیل با نرخ روز + کارمزد' }),
    stock: 'preorder',
    region: 'جهانی', rating: { avg: 5, count: 27 }, sold: 96, addedAt: '2026-09-01',
    badges: ['preorder', 'hot'],
    short: 'مهم‌ترین عرضه‌ی سال؛ ۱۹ نوامبر ۲۰۲۶. پیش‌خرید رسمی نسخه‌ی استاندارد.',
    desc: 'Grand Theft Auto VI در ایالت خیالی لئونیدا و شهر وایس‌سیتی می‌گذرد و دو شخصیت اصلی به نام‌های لوسیا و جیسون دارد. راک‌استار عرضه را برای ۱۹ نوامبر ۲۰۲۶ روی پلی‌استیشن ۵ و ایکس‌باکس سری ایکس/اس تأیید کرده است. نسخه‌ی کامپیوتر هنوز اعلام نشده است.',
    features: ['تاریخ عرضه: ۱۹ نوامبر ۲۰۲۶', 'دو شخصیت قابل‌بازی', 'فقط برای کنسول‌های نسل جدید'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'اکشن — جهان‌باز'], ['توسعه‌دهنده', 'Rockstar Games'], ['ناشر', 'Rockstar Games'], ['تاریخ عرضه', '۱۹ نوامبر ۲۰۲۶'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'پیش‌خرید', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'vice', title: 'GTA VI', sub: 'PS5 — پیش‌خرید' }
  }),
  G({
    id: 'gta6-ps5-ult', sku: 'AUR-GME-3002',
    name: 'بازی Grand Theft Auto VI — پلی‌استیشن ۵ (پیش‌خرید آلتیمیت)', nameEn: 'GTA VI — PS5 Ultimate Pre-Order',
    brand: 'Rockstar Games', sub: 'preorder',
    price: PUSD(99.99, 'rockstar', { round: true }),
    stock: 'preorder',
    region: 'جهانی', rating: { avg: 4.9, count: 12 }, sold: 31, addedAt: '2026-09-01',
    badges: ['preorder', 'limited'],
    short: 'نسخه‌ی آلتیمیت با محتوای اضافه برای بخش آنلاین.',
    desc: 'نسخه‌ی آلتیمیت علاوه بر بازی، بسته‌ی محتوای اولیه برای بخش آنلاین را شامل می‌شود.',
    features: ['تمام محتوای نسخه‌ی استاندارد', 'بسته‌ی شروع بخش آنلاین'],
    inBox: ['دیسک بازی', 'کد محتوای دیجیتال'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'اکشن — جهان‌باز'], ['توسعه‌دهنده', 'Rockstar Games'], ['تاریخ عرضه', '۱۹ نوامبر ۲۰۲۶'], ['نسخه', 'آلتیمیت']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'پیش‌خرید', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'vice', title: 'GTA VI', sub: 'ULTIMATE' }
  }),
  G({
    id: 'gta6-xbox-std', sku: 'AUR-GME-3003',
    name: 'بازی Grand Theft Auto VI — ایکس‌باکس (پیش‌خرید استاندارد)', nameEn: 'GTA VI — Xbox Standard Pre-Order',
    brand: 'Rockstar Games', sub: 'preorder',
    price: PUSD(79.99, 'rockstar', { round: true }),
    stock: 'preorder',
    region: 'جهانی', rating: { avg: 4.9, count: 9 }, sold: 27, addedAt: '2026-09-01',
    badges: ['preorder', 'hot'],
    short: 'پیش‌خرید نسخه‌ی استاندارد برای ایکس‌باکس سری ایکس/اس.',
    desc: 'نسخه‌ی ایکس‌باکس همان محتوای پلی‌استیشن را دارد و ۱۹ نوامبر ۲۰۲۶ عرضه می‌شود.',
    features: ['تاریخ عرضه: ۱۹ نوامبر ۲۰۲۶'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'ایکس‌باکس سری ایکس/اس'], ['ژانر', 'اکشن — جهان‌باز'], ['توسعه‌دهنده', 'Rockstar Games'], ['تاریخ عرضه', '۱۹ نوامبر ۲۰۲۶'], ['نسخه', 'استاندارد']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'پیش‌خرید', platform: 'ایکس‌باکس' },
    cover: { bg: 'vice', title: 'GTA VI', sub: 'XBOX' }
  }),
  G({
    id: 're-requiem-ps5', sku: 'AUR-GME-4001',
    name: 'بازی Resident Evil Requiem — پلی‌استیشن ۵', nameEn: 'Resident Evil Requiem — PS5',
    brand: 'Capcom', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 6,
    region: 'اروپا', rating: { avg: 4.7, count: 45 }, sold: 89, addedAt: '2026-03-01',
    badges: [],
    short: 'جدیدترین شماره از سری رزیدنت اویل با حال‌وهوای وحشت بقا.',
    desc: 'رزیدنت اویل رکویهم ادامه‌ی مسیر سری در ژانر وحشت بقا است و برای کنسول‌های نسل جدید و کامپیوتر عرضه شده است.',
    features: ['ژانر وحشت بقا', 'نسل جدید'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'وحشت بقا'], ['توسعه‌دهنده', 'Capcom'], ['ناشر', 'Capcom'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'وحشت', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'dark', title: 'RESIDENT EVIL REQUIEM', sub: 'PS5' }
  }),
  G({
    id: 'bf6-ps5', sku: 'AUR-GME-4002',
    name: 'بازی Battlefield 6 — پلی‌استیشن ۵', nameEn: 'Battlefield 6 — PS5',
    brand: 'EA Sports', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 5,
    region: 'اروپا', rating: { avg: 4.2, count: 58 }, sold: 104, addedAt: '2025-10-10',
    badges: [],
    short: 'شوتر بزرگ‌مقیاس الکترونیک آرتز با نبردهای چندنفره‌ی گسترده.',
    desc: 'بتلفیلد جدید با تمرکز بر نبردهای بزرگ چندنفره و تخریب محیط، پاییز ۲۰۲۵ عرضه شد.',
    features: ['نبرد چندنفره‌ی بزرگ‌مقیاس', 'تخریب محیط'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'شوتر اول‌شخص'], ['ناشر', 'Electronic Arts'], ['تاریخ عرضه', 'اکتبر ۲۰۲۵'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'شوتر', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'war', title: 'BATTLEFIELD 6', sub: 'PS5' }
  }),
  G({
    id: 'bo7-ps5', sku: 'AUR-GME-4003',
    name: 'بازی Call of Duty: Black Ops 7 — پلی‌استیشن ۵', nameEn: 'Call of Duty Black Ops 7 — PS5',
    brand: 'Activision', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 4,
    region: 'اروپا', rating: { avg: 4.1, count: 49 }, sold: 92, addedAt: '2025-11-14',
    badges: [],
    short: 'جدیدترین نسخه از سری بلک‌آپس با بخش زامبی.',
    desc: 'بلک‌آپس ۷ ادامه‌ی خط داستانی بلک‌آپس است و همراه با بخش چندنفره و زامبی عرضه شد.',
    features: ['بخش زامبی', 'چندنفره‌ی رقابتی'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'شوتر اول‌شخص'], ['ناشر', 'Activision'], ['تاریخ عرضه', 'نوامبر ۲۰۲۵'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'شوتر', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'ops', title: 'BLACK OPS 7', sub: 'PS5' }
  }),
  G({
    id: 'goy-ps5', sku: 'AUR-GME-4004',
    name: 'بازی Ghost of Yōtei — پلی‌استیشن ۵', nameEn: 'Ghost of Yōtei — PS5',
    brand: 'Sony', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 3,
    region: 'اروپا', rating: { avg: 4.8, count: 71 }, sold: 88, addedAt: '2025-10-02',
    badges: ['best'],
    short: 'دنباله‌ی معنوی گوست آو سوشیما؛ حماسه‌ای سامورایی در ژاپن.',
    desc: 'گوست آو یوته‌ی ساخته‌ی ساکرپانچ، داستان تازه‌ای را قرن‌ها پس از سوشیما روایت می‌کند.',
    features: ['جهان‌باز', 'انحصاری پلی‌استیشن'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'اکشن — جهان‌باز'], ['توسعه‌دهنده', 'Sucker Punch'], ['ناشر', 'Sony'], ['نسخه', 'استاندارد — فیزیکی']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'sakura', title: 'GHOST OF YŌTEI', sub: 'PS5' }
  }),
  G({
    id: 'mk-world-switch2', sku: 'AUR-GME-5001',
    name: 'بازی Mario Kart World — نینتندو سوییچ ۲', nameEn: 'Mario Kart World — Switch 2',
    brand: 'Nintendo', sub: 'switch',
    price: INQ(), stock: 'in', qty: 5,
    region: 'جهانی', rating: { avg: 4.8, count: 84 }, sold: 143, addedAt: '2025-06-05',
    badges: ['best'],
    short: 'عنوان زمان عرضه‌ی سوییچ ۲؛ بزرگ‌ترین ماریوکارت تاریخ.',
    desc: 'ماریوکارت ورلد همراه با عرضه‌ی سوییچ ۲ منتشر شد و دنیایی به‌هم‌پیوسته با مسیرهای آزاد دارد.',
    features: ['جهان به‌هم‌پیوسته', 'عنوان انحصاری سوییچ ۲'],
    inBox: ['دیسک کارت یا کد (بسته به ریجن)'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'نینتندو سوییچ ۲'], ['ژانر', 'ریسینگ'], ['توسعه‌دهنده', 'Nintendo'], ['نسخه', 'استاندارد']] }
    ],
    attrs: { genre: 'ریسینگ', format: 'دیسک', status: 'عرضه‌شده', platform: 'سوییچ ۲' },
    cover: { bg: 'kart', title: 'MARIO KART WORLD', sub: 'SWITCH 2' }
  }),
  G({
    id: 'dk-bananza-switch2', sku: 'AUR-GME-5002',
    name: 'بازی Donkey Kong Bananza — نینتندو سوییچ ۲', nameEn: 'Donkey Kong Bananza — Switch 2',
    brand: 'Nintendo', sub: 'switch',
    price: INQ(), stock: 'in', qty: 4,
    region: 'جهانی', rating: { avg: 4.7, count: 39 }, sold: 61, addedAt: '2025-07-17',
    badges: [],
    short: 'بازگشت دانکی‌کنگ با گیم‌پلی تخریب محیط.',
    desc: 'دنکی‌کنگ بانانزا اولین عنوان بزرگ دانکی‌کنگ در دو دهه‌ی اخیر است.',
    features: ['تخریب محیط', 'پلتفرمر سه‌بعدی'],
    inBox: ['دیسک کارت'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'نینتندو سوییچ ۲'], ['ژانر', 'پلتفرمر'], ['توسعه‌دهنده', 'Nintendo'], ['نسخه', 'استاندارد']] }
    ],
    attrs: { genre: 'پلتفرمر', format: 'دیسک', status: 'عرضه‌شده', platform: 'سوییچ ۲' },
    cover: { bg: 'jungle', title: 'DONKEY KONG BANANZA', sub: 'SWITCH 2' }
  }),
  G({
    id: 'ds2-ps5', sku: 'AUR-GME-4005',
    name: 'بازی Death Stranding 2: On the Beach — پلی‌استیشن ۵', nameEn: 'Death Stranding 2 — PS5',
    brand: 'Sony', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 2,
    region: 'اروپا', rating: { avg: 4.6, count: 52 }, sold: 57, addedAt: '2025-06-26',
    badges: [],
    short: 'ادامه‌ی دنیای عجیب کوجیما.',
    desc: 'دث استرندینگ ۲ مسیر تحویل‌محور نسخه‌ی اول را با مقیاس بزرگ‌تر ادامه می‌دهد.',
    features: ['انحصاری پلی‌استیشن', 'جهان‌باز'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'اکشن — جهان‌باز'], ['توسعه‌دهنده', 'Kojima Productions'], ['نسخه', 'استاندارد']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'strand', title: 'DEATH STRANDING 2', sub: 'PS5' }
  }),
  G({
    id: 'silksong-pc', sku: 'AUR-GME-6001',
    name: 'بازی Hollow Knight: Silksong — کد استیم', nameEn: 'Hollow Knight Silksong — Steam',
    brand: 'Team Cherry', sub: 'pc', digital: true,
    price: INQ('برای قیمت کد استیم تماس بگیرید'), stock: 'in', qty: 40,
    region: 'Global', rating: { avg: 4.9, count: 66 }, sold: 131, addedAt: '2025-09-04',
    badges: ['digital', 'best'],
    short: 'یکی از پرمخاطب‌ترین عناوین مستقل تاریخ؛ بالاخره عرضه شد.',
    desc: 'سیلک‌سانگ دنباله‌ی هالو نایت است که پس از سال‌ها انتظار در سپتامبر ۲۰۲۵ عرضه شد.',
    features: ['مترویدوانیا', 'کد استیم'],
    inBox: [],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'استیم'], ['ژانر', 'مترویدوانیا'], ['توسعه‌دهنده', 'Team Cherry'], ['نسخه', 'دیجیتال']] },
      { title: 'اطلاعات خرید دیجیتال', items: [['ریجن', 'Global'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { genre: 'مستقل', format: 'دیجیتال', status: 'عرضه‌شده', platform: 'استیم', region: 'Global', delivery: 'آنی' },
    cover: { bg: 'hollow', title: 'HOLLOW KNIGHT SILKSONG', sub: 'STEAM' },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'در استیم، بخش Activate a Product.', validity: 'نامحدود', restrictions: 'ندارد' }
  }),
  G({
    id: 'elden-ring-ps5', sku: 'AUR-GME-4006',
    name: 'بازی Elden Ring — پلی‌استیشن ۵', nameEn: 'Elden Ring — PS5',
    brand: 'Bandai Namco', sub: 'ps5',
    price: INQ(), stock: 'in', qty: 3,
    region: 'اروپا', rating: { avg: 4.9, count: 210 }, sold: 244, addedAt: '2025-03-10',
    badges: ['best'],
    short: 'شاهکار فرام‌سافتور؛ پرفروش‌ترین سولزلایک نسل.',
    desc: 'الدن رینگ با جهان‌باز بزرگ و طراحی کلاسیک فرام‌سافتور، یکی از تحسین‌شده‌ترین بازی‌های دهه‌ی اخیر است.',
    features: ['جهان‌باز', 'چالش‌برانگیز'],
    inBox: ['دیسک بازی'],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'نقش‌آفرینی اکشن'], ['توسعه‌دهنده', 'FromSoftware'], ['ناشر', 'Bandai Namco'], ['نسخه', 'استاندارد']] }
    ],
    attrs: { genre: 'نقش‌آفرینی', format: 'دیسک', status: 'عرضه‌شده', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'ring', title: 'ELDEN RING', sub: 'PS5' }
  }),
  G({
    id: 'wolverine-ps5', sku: 'AUR-GME-7001',
    name: 'بازی Marvel\u2019s Wolverine — پلی‌استیشن ۵ (پیش‌خرید)', nameEn: 'Marvel\u2019s Wolverine — PS5 Pre-Order',
    brand: 'Sony', sub: 'preorder',
    price: INQ('پیش‌فروش به‌زودی باز می‌شود'), stock: 'soon',
    region: 'اروپا', rating: { avg: 0, count: 0 }, sold: 0, addedAt: '2026-09-20',
    badges: ['preorder'],
    short: 'عنوان بعدی اینسامنیاک؛ پیش‌فروش به‌زودی.',
    desc: 'مارولز ولورین ساخته‌ی اینسامنیاک گیمز برای پلی‌استیشن ۵ است. به‌محض باز شدن پیش‌فروش رسمی، قیمت در همین صفحه اعلام می‌شود.',
    features: ['انحصاری پلی‌استیشن ۵', 'ساخته‌ی Insomniac'],
    inBox: [],
    specs: [
      { title: 'مشخصات بازی', items: [['پلتفرم', 'پلی‌استیشن ۵'], ['ژانر', 'اکشن'], ['توسعه‌دهنده', 'Insomniac Games'], ['وضعیت', 'پیش‌فروش به‌زودی']] }
    ],
    attrs: { genre: 'اکشن', format: 'دیسک', status: 'پیش‌خرید', platform: 'پلی‌استیشن ۵' },
    cover: { bg: 'claw', title: 'MARVEL\u2019S WOLVERINE', sub: 'PS5' }
  })
]

export const DIGITAL = [
  {
    id: 'psn-10', sku: 'AUR-DGC-1001',
    name: 'گیفت‌کارت پلی‌استیشن ۱۰ دلاری — ریجن آمریکا', nameEn: 'PSN Gift Card $10 — US',
    brand: 'PlayStation', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(10, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.9, count: 214 }, sold: 1240, addedAt: '2026-01-01',
    short: 'شارژ ۱۰ دلاری کیف‌پول پلی‌استیشن استور آمریکا؛ تحویل آنی.',
    desc: 'کد رسمی شارژ حساب پلی‌استیشن استور آمریکا. پس از پرداخت، کد به‌صورت آنی نمایش داده می‌شود و می‌توانید آن را در بخش Redeem کنسول یا وب‌سایت سونی فعال کنید.',
    features: ['تحویل آنی', 'کد رسمی', 'بدون نیاز به اکانت واسط'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۱۰ دلار'], ['ریجن', 'آمریکا'], ['پلتفرم', 'پلی‌استیشن استور'], ['روش تحویل', 'کد دیجیتال — آنی'], ['اعتبار', 'نامحدود']] }
    ],
    attrs: { region: 'آمریکا', platform: 'پلی‌استیشن', delivery: 'آنی', value: '۱۰ دلار' },
    gift: { brand: 'PlayStation', value: '$10', colors: ['#0070d1', '#003087'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی — بلافاصله پس از پرداخت', instructions: 'در کنسول: Store → Redeem Codes. در وب: آدرس store.playstation.com.', validity: 'نامحدود', restrictions: 'فقط روی اکانت با ریجن آمریکا فعال می‌شود.' }
  },
  {
    id: 'psn-25', sku: 'AUR-DGC-1002',
    name: 'گیفت‌کارت پلی‌استیشن ۲۵ دلاری — ریجن آمریکا', nameEn: 'PSN Gift Card $25 — US',
    brand: 'PlayStation', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(25, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital', 'best'], rating: { avg: 4.9, count: 342 }, sold: 2100, addedAt: '2026-01-01',
    short: 'محبوب‌ترین مبلغ شارژ استور پلی‌استیشن.',
    desc: 'کد رسمی شارژ ۲۵ دلاری پلی‌استیشن استور آمریکا با تحویل آنی.',
    features: ['تحویل آنی', 'کد رسمی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۲۵ دلار'], ['ریجن', 'آمریکا'], ['پلتفرم', 'پلی‌استیشن استور'], ['روش تحویل', 'کد دیجیتال — آنی'], ['اعتبار', 'نامحدود']] }
    ],
    attrs: { region: 'آمریکا', platform: 'پلی‌استیشن', delivery: 'آنی', value: '۲۵ دلار' },
    gift: { brand: 'PlayStation', value: '$25', colors: ['#0070d1', '#003087'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'در کنسول: Store → Redeem Codes.', validity: 'نامحدود', restrictions: 'فقط ریجن آمریکا.' }
  },
  {
    id: 'psn-50', sku: 'AUR-DGC-1003',
    name: 'گیفت‌کارت پلی‌استیشن ۵۰ دلاری — ریجن آمریکا', nameEn: 'PSN Gift Card $50 — US',
    brand: 'PlayStation', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(50, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.8, count: 187 }, sold: 980, addedAt: '2026-01-01',
    short: 'شارژ ۵۰ دلاری برای خرید بازی‌های کامل.',
    desc: 'کد رسمی شارژ ۵۰ دلاری پلی‌استیشن استور آمریکا.',
    features: ['تحویل آنی', 'کد رسمی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۵۰ دلار'], ['ریجن', 'آمریکا'], ['روش تحویل', 'کد دیجیتال — آنی'], ['اعتبار', 'نامحدود']] }
    ],
    attrs: { region: 'آمریکا', platform: 'پلی‌استیشن', delivery: 'آنی', value: '۵۰ دلار' },
    gift: { brand: 'PlayStation', value: '$50', colors: ['#0070d1', '#003087'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'در کنسول: Store → Redeem Codes.', validity: 'نامحدود', restrictions: 'فقط ریجن آمریکا.' }
  },
  {
    id: 'psn-100', sku: 'AUR-DGC-1004',
    name: 'گیفت‌کارت پلی‌استیشن ۱۰۰ دلاری — ریجن آمریکا', nameEn: 'PSN Gift Card $100 — US',
    brand: 'PlayStation', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(100, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital', 'hot'], rating: { avg: 4.8, count: 156 }, sold: 745, addedAt: '2026-01-01',
    short: 'بهترین گزینه برای خرید بازی‌های روز و پیش‌خریدها.',
    desc: 'کد رسمی شارژ ۱۰۰ دلاری پلی‌استیشن استور آمریکا با تحویل آنی.',
    features: ['تحویل آنی', 'کد رسمی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۱۰۰ دلار'], ['ریجن', 'آمریکا'], ['روش تحویل', 'کد دیجیتال — آنی'], ['اعتبار', 'نامحدود']] }
    ],
    attrs: { region: 'آمریکا', platform: 'پلی‌استیشن', delivery: 'آنی', value: '۱۰۰ دلار' },
    gift: { brand: 'PlayStation', value: '$100', colors: ['#0070d1', '#003087'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'در کنسول: Store → Redeem Codes.', validity: 'نامحدود', restrictions: 'فقط ریجن آمریکا.' }
  },
  {
    id: 'xbox-gc-50', sku: 'AUR-DGC-2001',
    name: 'گیفت‌کارت ایکس‌باکس ۵۰ دلاری — ریجن آمریکا', nameEn: 'Xbox Gift Card $50 — US',
    brand: 'Xbox', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(50, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.8, count: 98 }, sold: 456, addedAt: '2026-01-05',
    short: 'شارژ حساب مایکروسافت برای خرید بازی و اشتراک.',
    desc: 'کد رسمی ۵۰ دلاری فروشگاه مایکروسافت.',
    features: ['تحویل آنی', 'کد رسمی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۵۰ دلار'], ['ریجن', 'آمریکا'], ['پلتفرم', 'ایکس‌باکس / مایکروسافت استور'], ['روش تحویل', 'کد دیجیتال — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'ایکس‌باکس', delivery: 'آنی', value: '۵۰ دلار' },
    gift: { brand: 'Xbox', value: '$50', colors: ['#107c10', '#0e3a0e'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'در کنسول یا سایت مایکروسافت: Redeem Code.', validity: 'نامحدود', restrictions: 'ریجن اکانت باید آمریکا باشد.' }
  },
  {
    id: 'steam-20', sku: 'AUR-DGC-3001',
    name: 'گیفت‌کارت استیم ۲۰ دلاری', nameEn: 'Steam Gift Card $20',
    brand: 'Valve', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(20, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'بین‌المللی',
    badges: ['digital'], rating: { avg: 4.9, count: 264 }, sold: 1580, addedAt: '2026-01-10',
    short: 'شارژ کیف‌پول استیم؛ ساده‌ترین راه خرید بازی‌های استیم.',
    desc: 'کد رسمی شارژ حساب استیم.',
    features: ['تحویل آنی', 'کد رسمی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۲۰ دلار'], ['پلتفرم', 'استیم'], ['روش تحویل', 'کد دیجیتال — آنی']] }
    ],
    attrs: { region: 'بین‌المللی', platform: 'استیم', delivery: 'آنی', value: '۲۰ دلار' },
    gift: { brand: 'Steam', value: '$20', colors: ['#1b2838', '#66c0f4'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'استیم → Add funds → Redeem a Steam Gift Card.', validity: 'نامحدود', restrictions: 'بسته به کشور اکانت، تبدیل ارز ممکن است اعمال شود.' }
  },
  {
    id: 'steam-50', sku: 'AUR-DGC-3002',
    name: 'گیفت‌کارت استیم ۵۰ دلاری', nameEn: 'Steam Gift Card $50',
    brand: 'Valve', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(50, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'بین‌المللی',
    badges: ['digital', 'best'], rating: { avg: 4.9, count: 198 }, sold: 1104, addedAt: '2026-01-10',
    short: 'مبلغ محبوب برای خرید بازی‌های کامل.',
    desc: 'کد رسمی شارژ ۵۰ دلاری حساب استیم.',
    features: ['تحویل آنی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۵۰ دلار'], ['پلتفرم', 'استیم'], ['روش تحویل', 'کد دیجیتال — آنی']] }
    ],
    attrs: { region: 'بین‌المللی', platform: 'استیم', delivery: 'آنی', value: '۵۰ دلار' },
    gift: { brand: 'Steam', value: '$50', colors: ['#1b2838', '#66c0f4'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'استیم → Add funds → Redeem.', validity: 'نامحدود', restrictions: 'بسته به کشور اکانت.' }
  },
  {
    id: 'eshop-35', sku: 'AUR-DGC-4001',
    name: 'گیفت‌کارت نینتندو ای‌شاپ ۳۵ دلاری — ریجن آمریکا', nameEn: 'Nintendo eShop Card $35 — US',
    brand: 'Nintendo', cat: 'digital', sub: 'giftcard', type: 'digital',
    price: PUSD(35, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی کد', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.8, count: 87 }, sold: 342, addedAt: '2026-02-01',
    short: 'شارژ حساب ای‌شاپ برای خرید بازی‌های سوییچ.',
    desc: 'کد رسمی شارژ ۳۵ دلاری فروشگاه نینتندو.',
    features: ['تحویل آنی'],
    inBox: [],
    specs: [
      { title: 'اطلاعات کارت', items: [['مبلغ', '۳۵ دلار'], ['ریجن', 'آمریکا'], ['پلتفرم', 'نینتندو ای‌شاپ'], ['روش تحویل', 'کد دیجیتال — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'نینتندو', delivery: 'آنی', value: '۳۵ دلار' },
    gift: { brand: 'Nintendo', value: '$35', colors: ['#e60012', '#8a000b'] },
    delivery: { method: 'کد دیجیتال', time: 'آنی', instructions: 'ای‌شاپ → Enter Code.', validity: 'نامحدود', restrictions: 'ریجن اکانت باید آمریکا باشد.' }
  },
  {
    id: 'ps-plus-12m', sku: 'AUR-DGC-5001',
    name: 'اشتراک پلی‌استیشن پلاس اسنشیال — ۱۲ ماهه', nameEn: 'PlayStation Plus Essential 12M',
    brand: 'PlayStation', cat: 'digital', sub: 'subscription', type: 'digital',
    price: PUSD(79.99, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی', region: 'آمریکا',
    badges: ['digital', 'best'], rating: { avg: 4.7, count: 143 }, sold: 623, addedAt: '2026-01-20',
    short: 'اشتراک قانونی یک‌ساله‌ی پلاس برای بازی آنلاین و بازی‌های ماهانه.',
    desc: 'کد فعال‌سازی رسمی اشتراک ۱۲ ماهه‌ی پلی‌استیشن پلاس سطح اسنشیال. این اشتراک به‌صورت قانونی روی اکانت شخصی شما فعال می‌شود؛ هیچ اکانت مشترک یا واسطی در کار نیست.',
    features: ['بازی آنلاین چندنفره', 'بازی‌های ماهانه', 'تخفیف‌های استور'],
    inBox: [],
    specs: [
      { title: 'اطلاعات اشتراک', items: [['مدت', '۱۲ ماه'], ['سطح', 'Essential'], ['ریجن', 'آمریکا'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'پلی‌استیشن', delivery: 'آنی', value: '۱۲ ماهه' },
    gift: { brand: 'PS Plus', value: '12M', colors: ['#ffb800', '#c2410c'] },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'Redeem Codes در کنسول یا سایت پلی‌استیشن.', validity: 'کد تا ۱۲ ماه پس از خرید معتبر است', restrictions: 'فقط اکانت ریجن آمریکا.' }
  },
  {
    id: 'gamepass-ultimate-3m', sku: 'AUR-DGC-5002',
    name: 'اشتراک گیم‌پس آلتیمیت — ۳ ماهه', nameEn: 'Xbox Game Pass Ultimate 3M',
    brand: 'Xbox', cat: 'digital', sub: 'subscription', type: 'digital',
    price: PUSD(44.99, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی', region: 'آمریکا',
    badges: ['digital', 'hot'], rating: { avg: 4.8, count: 176 }, sold: 812, addedAt: '2026-01-25',
    short: 'صدها بازی روی کنسول، کامپیوتر و کلود با یک اشتراک قانونی.',
    desc: 'کد رسمی اشتراک سه‌ماهه‌ی گیم‌پس آلتیمیت، فعال روی اکانت شخصی شما.',
    features: ['صدها بازی', 'کنسول + کامپیوتر + کلود', 'شامل اشتراک آنلاین'],
    inBox: [],
    specs: [
      { title: 'اطلاعات اشتراک', items: [['مدت', '۳ ماه'], ['ریجن', 'آمریکا'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'ایکس‌باکس', delivery: 'آنی', value: '۳ ماهه' },
    gift: { brand: 'Game Pass', value: '3M', colors: ['#107c10', '#0e3a0e'] },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'Redeem Code در کنسول یا سایت مایکروسافت.', validity: 'کد تا ۶ ماه معتبر است', restrictions: 'ریجن اکانت باید هماهنگ باشد.' }
  },
  {
    id: 'ea-play-12m', sku: 'AUR-DGC-5003',
    name: 'اشتراک ای‌ای پلی — ۱۲ ماهه', nameEn: 'EA Play 12M',
    brand: 'EA Sports', cat: 'digital', sub: 'subscription', type: 'digital',
    price: PUSD(29.99, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.6, count: 71 }, sold: 238, addedAt: '2026-02-10',
    short: 'کتابخانه‌ی بازی‌های الکترونیک آرتز با دسترسی زودهنگام به عناوین ورزشی.',
    desc: 'کد رسمی اشتراک سالانه‌ی ای‌ای پلی؛ شامل دسترسی به مجموعه‌ی بازی‌های ناشر و تریال بازی‌های جدید مثل عناوین ورزشی.',
    features: ['کتابخانه‌ی بازی‌های الکترونیک آرتز', 'دسترسی زودهنگام محدود به عناوین جدید'],
    inBox: [],
    specs: [
      { title: 'اطلاعات اشتراک', items: [['مدت', '۱۲ ماه'], ['پلتفرم', 'ای‌ای اپ / استیم'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'کامپیوتر / کنسول', delivery: 'آنی', value: '۱۲ ماهه' },
    gift: { brand: 'EA Play', value: '12M', colors: ['#111827', '#ff4747'] },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'طبق راهنمای همراه کد.', validity: 'کد تا ۶ ماه معتبر است', restrictions: 'پلتفرم فعال‌سازی را هنگام سفارش انتخاب کنید.' }
  },
  {
    id: 'ns-online-12m', sku: 'AUR-DGC-6001',
    name: 'اشتراک نینتندو سوییچ آنلاین — ۱۲ ماهه', nameEn: 'Nintendo Switch Online 12M',
    brand: 'Nintendo', cat: 'digital', sub: 'subscription', type: 'digital',
    price: PUSD(19.99, 'ea', { round: true }), stock: 'in', qty: 999,
    warranty: 'تضمین فعال‌سازی', region: 'آمریکا',
    badges: ['digital'], rating: { avg: 4.7, count: 59 }, sold: 187, addedAt: '2026-02-15',
    short: 'بازی آنلاین و مجموعه‌ی بازی‌های کلاسیک نینتندو.',
    desc: 'کد رسمی اشتراک سالانه‌ی نینتندو سوییچ آنلاین.',
    features: ['بازی آنلاین', 'بازی‌های کلاسیک'],
    inBox: [],
    specs: [
      { title: 'اطلاعات اشتراک', items: [['مدت', '۱۲ ماه'], ['ریجن', 'آمریکا'], ['روش تحویل', 'کد فعال‌سازی — آنی']] }
    ],
    attrs: { region: 'آمریکا', platform: 'نینتندو', delivery: 'آنی', value: '۱۲ ماهه' },
    gift: { brand: 'NS Online', value: '12M', colors: ['#e60012', '#8a000b'] },
    delivery: { method: 'کد فعال‌سازی', time: 'آنی', instructions: 'ای‌شاپ → Enter Code.', validity: 'نامحدود', restrictions: 'ریجن اکانت آمریکا.' }
  }
]
