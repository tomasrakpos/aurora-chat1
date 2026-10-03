import { CONSOLES } from './products-consoles.js'
import { PC_PARTS, MONITORS, SYSTEMS } from './products-pc.js'
import { GAMES, DIGITAL } from './products-games.js'
import { CONTROLLERS, AUDIO, KEYBOARDS_MICE, ACCESSORIES, STREAMING, FURNITURE_COLLECTIBLES } from './products-gear.js'
import { normalize } from '../lib/format.js'

export const PRODUCTS = [
  ...CONSOLES, ...PC_PARTS, ...MONITORS, ...SYSTEMS,
  ...GAMES, ...DIGITAL, ...CONTROLLERS, ...AUDIO,
  ...KEYBOARDS_MICE, ...ACCESSORIES, ...STREAMING, ...FURNITURE_COLLECTIBLES
]

const byId = new Map(PRODUCTS.map((p) => [p.id, p]))
export const productById = (id) => byId.get(id)

/** اعمال تغییرات پنل مدیریت روی قیمت/موجودی */
export const effective = (p, overrides = {}) => {
  const o = overrides[p.id]
  if (!o) return p
  return {
    ...p,
    price: o.final !== undefined ? { ...p.price, inquiry: o.final === null, final: o.final, note: 'به‌روزرسانی در پنل مدیریت' } : p.price,
    stock: o.stock ?? p.stock,
    qty: o.qty ?? p.qty
  }
}

export const discountPct = (p) => {
  if (!p.price || p.price.inquiry || !p.price.old || !p.price.final) return 0
  return Math.round((1 - p.price.final / p.price.old) * 100)
}

export const isBuyable = (p) => p.price && !p.price.inquiry && p.stock !== 'out' && p.stock !== 'soon' && p.stock !== 'custom'

/** جمع‌بندی سبد خرید */
export const FREE_SHIPPING_THRESHOLD = 30000000
export const SHIPPING_COST = 145000

export function cartDetails(cart, overrides = {}) {
  const items = cart
    .map(({ id, qty }) => { const p = productById(id); return p ? { ...effective(p, overrides), qty } : null })
    .filter(Boolean)
  const subtotal = items.reduce((s, p) => s + (p.price?.final || 0) * p.qty, 0)
  const discount = items.reduce((s, p) => {
    const d = (p.price?.old || 0) - (p.price?.final || 0)
    return s + (d > 0 ? d * p.qty : 0)
  }, 0)
  const hasPhysical = items.some((p) => p.type !== 'digital')
  const hasDigital = items.some((p) => p.type === 'digital')
  const shipping = hasPhysical ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST) : 0
  return { items, subtotal, discount, shipping, total: subtotal + shipping, hasPhysical, hasDigital }
}

/* ------------------------------ جستجو ------------------------------ */
export const searchProducts = (q, limit = 60) => {
  const n = normalize(q)
  if (!n) return []
  const terms = n.split(' ')
  return PRODUCTS.map((p) => {
    const hay = normalize(`${p.name} ${p.nameEn || ''} ${p.brand} ${p.short || ''}`)
    let score = 0
    for (const t of terms) {
      if (!t) continue
      if (hay.includes(t)) score += 2
      if (normalize(p.brand).includes(t)) score += 1
    }
    return { p, score }
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || b.p.sold - a.p.sold).slice(0, limit).map((x) => x.p)
}

export const suggestProducts = (q, limit = 6) => searchProducts(q, limit)

/* ------------------------------ محصولات مرتبط ------------------------------ */
export const relatedProducts = (p, n = 8) => {
  const pool = PRODUCTS.filter((x) => x.id !== p.id)
  const sameSub = pool.filter((x) => x.sub === p.sub && x.cat === p.cat)
  const sameCat = pool.filter((x) => x.cat === p.cat && x.sub !== p.sub)
  const cross = (p.fbt || []).map(productById).filter(Boolean)
  const seen = new Set()
  const out = []
  for (const x of [...cross, ...sameSub, ...sameCat]) {
    if (seen.has(x.id)) continue
    seen.add(x.id)
    out.push(x)
    if (out.length >= n) break
  }
  return out
}

export const frequentlyBought = (p) => (p.fbt || []).map(productById).filter(Boolean)

/* ------------------------------ اسلایدهای صفحه اول ------------------------------ */
export const HERO_SLIDES = [
  {
    id: 'ps5-pro', img: '/img/hero/hero-ps5pro.jpg', kicker: 'پرچمدار نسل نهم',
    title: 'پلی‌استیشن ۵ پرو', sub: 'گرافیک ۱۶٫۷ ترافلاپسی، ۲ ترابایت حافظه و فناوری آپ‌اسکیل هوشمند.',
    cta: 'مشاهده و خرید', link: '/product/ps5-pro', chip: 'موجودی محدود'
  },
  {
    id: 'fc27', img: '/img/hero/hero-fc27.jpg', kicker: 'شبیه‌ساز فوتبال',
    title: 'EA SPORTS FC 27', sub: 'حالت جدید The Grounds؛ بیش از ۳۵ لیگ و ۲۱ هزار بازیکن. برای همه‌ی پلتفرم‌ها.',
    cta: 'نسخه‌های بازی', link: '/search?q=EA+FC+27', chip: 'جدید'
  },
  {
    id: 'gta6', img: '/img/hero/hero-gta6.jpg', kicker: 'پیش‌خرید رسمی',
    title: 'Grand Theft Auto VI', sub: '۱۹ نوامبر ۲۰۲۶ روی پلی‌استیشن ۵ و ایکس‌باکس. همین حالا پیش‌خرید کنید.',
    cta: 'پیش‌خرید', link: '/product/gta6-ps5-std', chip: 'پیش‌خرید'
  },
  {
    id: 'switch2', img: '/img/hero/hero-switch2.jpg', kicker: 'نینتندو',
    title: 'نینتندو سوییچ ۲', sub: 'نسل جدید کنسول هیبریدی؛ نمایشگر بزرگ‌تر و جوی‌کان مغناطیسی.',
    cta: 'مشاهده کنسول', link: '/product/switch-2', chip: 'موجود'
  },
  {
    id: 'rtx', img: '/img/hero/hero-rtx.jpg', kicker: 'سیستم‌های آماده',
    title: 'سیستم‌های گیمینگ آورورا', sub: 'اسمبل حرفه‌ای با قطعات اصلی، تست پایداری و گارانتی.',
    cta: 'کانفیگ‌ها', link: '/category/systems', chip: 'اسمبل سفارشی'
  }
]

/* ------------------------------ کاشی‌های دسته‌بندی ------------------------------ */
export const CATEGORY_TILES = [
  { id: 'consoles', img: '/img/p/ps5-slim.jpg' },
  { id: 'pc-parts', img: '/img/p/gpu.jpg' },
  { id: 'systems', img: '/img/p/gaming-pc.jpg' },
  { id: 'monitors', img: '/img/p/monitor-oled.jpg' },
  { id: 'peripherals', img: '/img/p/dualsense-white.jpg' },
  { id: 'games', img: null },
  { id: 'digital', img: null },
  { id: 'streaming', img: '/img/p/microphone.jpg' },
  { id: 'furniture', img: '/img/p/gaming-chair.jpg' },
  { id: 'collectibles', img: '/img/p/figure.jpg' }
]

/* ------------------------------ نظرات اولیه ------------------------------ */
export const SEED_REVIEWS = {
  'ps5-slim-disc': [
    { id: 'r1', user: 'امیرحسین م.', rating: 5, date: '2026-08-14', verified: true, helpful: 23, text: 'کنسول پلمب با گارانتی معتبر رسید. قیمتش از چند فروشگاه دیگه مناسب‌تر بود و ارسال هم سریع انجام شد.' },
    { id: 'r2', user: 'سارا ک.', rating: 5, date: '2026-07-02', verified: true, helpful: 14, text: 'برای هدیه خریدم. بسته‌بندی خیلی مرتب بود و خود کنسول هم کاملاً سالم و ریجن اروپا بود.' },
    { id: 'r3', user: 'محمد ر.', rating: 4, date: '2026-06-11', verified: false, helpful: 6, text: 'کیفیت خود کنسول مشخصه، فقط کاش پایه عمودی هم داخل جعبه بود.' }
  ],
  'ps5-pro': [
    { id: 'r4', user: 'علی ت.', rating: 5, date: '2026-09-02', verified: true, helpful: 31, text: 'اختلاف کیفیت با مدل معمولی توی بازی‌هایی که از آپ‌اسکیل جدید استفاده می‌کنن کاملاً محسوسه. ارزش خریدش بالاست.' },
    { id: 'r5', user: 'نگین ش.', rating: 5, date: '2026-08-20', verified: true, helpful: 9, text: 'سریع‌ترین تحویلی که از یه فروشگاه آنلاین دیدم. دستگاه پلمب و بدون مشکل.' }
  ],
  'dualsense-white': [
    { id: 'r6', user: 'حسین د.', rating: 5, date: '2026-09-15', verified: true, helpful: 12, text: 'دسته اورجینال با سریال قابل استعلام. بازخورد لمسیش توی بازی‌های انحصاری واقعاً تجربه رو عوض می‌کنه.' },
    { id: 'r7', user: 'مریم الف.', rating: 4, date: '2026-08-01', verified: true, helpful: 5, text: 'خود دسته عالیه، فقط باتریش مثل همه دوال‌سنس‌ها زود تموم میشه.' }
  ],
  'asus-tuf-rtx5070': [
    { id: 'r8', user: 'پویا ن.', rating: 5, date: '2026-09-10', verified: true, helpful: 18, text: 'برای گیم ۱۴۴۰ خریدم و با تنظیمات بالا فریم‌ریت عالی می‌گیرم. خنک‌کنندش هم واقعاً ساکته.' }
  ],
  'rog-xg27uqr': [
    { id: 'r9', user: 'کیان م.', rating: 5, date: '2026-08-28', verified: true, helpful: 11, text: 'با پلی‌استیشن ۵ فوق‌العاده‌ست. رنگ‌ها دقیقن و ۱۴۴ هرتز بودنش توی بازی‌های شوتر حس میشه.' }
  ],
  'psn-25': [
    { id: 'r10', user: 'آرش ب.', rating: 5, date: '2026-09-20', verified: true, helpful: 27, text: 'کد بلافاصله بعد از پرداخت اومد و بدون مشکل روی اکانتم فعال شد. چندمین خریدمه.' },
    { id: 'r11', user: 'الناز ح.', rating: 5, date: '2026-09-05', verified: true, helpful: 8, text: 'تحویل آنی واقعاً آنی بود. ممنون از پشتیبانی که راهنمایی کرد.' }
  ],
  'steam-deck-oled-512': [
    { id: 'r12', user: 'سینا ق.', rating: 5, date: '2026-07-19', verified: true, helpful: 16, text: 'صفحه اولدش با نسل اول قابل مقایسه نیست. برای سفر و بازی‌های مستقل بهترین خریده امسالم بود.' }
  ],
  'hyperx-cloud-alpha': [
    { id: 'r13', user: 'رضا ج.', rating: 5, date: '2026-06-30', verified: true, helpful: 10, text: 'چند ساله از این مدل استفاده می‌کنم و هنوز سالمه. برای شروع بهترین انتخابه.' }
  ]
}

/* ------------------------------ سوالات متداول ------------------------------ */
export const FAQS = [
  { q: 'محصولات دیجیتال چطور تحویل داده می‌شوند؟', a: 'کدهای دیجیتال (گیفت‌کارت، اشتراک و کد بازی) بلافاصله بعد از پرداخت موفق در صفحه‌ی سفارش و در حساب کاربری شما نمایش داده می‌شوند. نیازی به هماهنگی یا تماس نیست.' },
  { q: 'قیمت‌ها چطور به‌روزرسانی می‌شوند؟', a: 'قیمت هر کالا از منابع معتبر بازار بررسی و با ذکر منبع و تاریخ در صفحه‌ی محصول ثبت می‌شود. اگر قیمت کالایی «استعلام» باشد، یعنی قیمت معتبر لحظه‌ای در دسترس نیست و باید با پشتیبانی تماس بگیرید.' },
  { q: 'آیا کالاهای دیجیتال قابل بازگشت هستند؟', a: 'به‌خاطر ماهیت کدهای دیجیتال، بعد از تحویل کد امکان بازگشت وجود ندارد. اگر کد فعال نشود، پشتیبانی تا حل کامل مشکل همراه شماست.' },
  { q: 'کالاهای فیزیکی چطور ارسال می‌شوند؟', a: 'سفارش‌های فیزیکی با بسته‌بندی ایمن از طریق پست یا تیپاکس ارسال می‌شوند. برای تهران امکان ارسال با پیک در همان روز وجود دارد.' },
  { q: 'گارانتی محصولات شامل چه مواردی می‌شود؟', a: 'جزئیات گارانتی هر کالا در صفحه‌ی همان محصول نوشته شده است. سلامت فیزیکی همه‌ی کالاها در زمان تحویل تضمین می‌شود.' },
  { q: 'آیا می‌توانم سفارش را حضوری تحویل بگیرم؟', a: 'بله. در مرحله‌ی ارسال می‌توانید تحویل حضوری را انتخاب کنید و بعد از هماهنگی با پشتیبانی، سفارش را از دفتر آورورا تحویل بگیرید.' },
  { q: 'پیش‌خرید بازی‌ها چطور کار می‌کند؟', a: 'مبلغ پیش‌خرید هنگام ثبت سفارش دریافت می‌شود و کالای فیزیکی در تاریخ عرضه ارسال می‌شود. اگر عرضه‌ی بازی به تعویق بیفتد، تاریخ جدید اطلاع‌رسانی می‌شود.' },
  { q: 'آیا اکانت مشترک یا ظرفیتی هم می‌فروشید؟', a: 'خیر. همه‌ی محصولات دیجیتال ما کد یا اشتراک قانونی هستند که مستقیم روی اکانت شخصی خودتان فعال می‌شوند. اکانت مشترک و موارد مشابه را عرضه نمی‌کنیم.' }
]

/* ------------------------------ اخبار (فقط موارد واقعی با منبع) ------------------------------ */
export const NEWS = [
  { id: 'n1', tag: 'عرضه بازی', date: '2026-05-12', title: 'تاریخ عرضه‌ی GTA VI رسماً ۱۹ نوامبر شد', text: 'راک‌استار پس از دو تأخیر، عرضه‌ی جی‌تی‌ای ۶ را برای ۱۹ نوامبر ۲۰۲۶ روی پلی‌استیشن ۵ و ایکس‌باکس تأیید کرد. نسخه‌ی کامپیوتر هنوز اعلام نشده است.', source: 'rockstargames.com' },
  { id: 'n2', tag: 'عرضه بازی', date: '2026-09-25', title: 'EA SPORTS FC 27 با حالت جدید The Grounds منتشر شد', text: 'جدیدترین شبیه‌ساز فوتبال الکترونیک آرتز با هاب اجتماعی جدید، بیش از ۳۵ لیگ و ۲۱ هزار بازیکن لایسنس‌شده عرضه شد.', source: 'ea.com' },
  { id: 'n3', tag: 'کنسول', date: '2025-06-05', title: 'نینتندو سوییچ ۲ وارد بازار شد', text: 'نسل جدید کنسول هیبریدی نینتندو با نمایشگر بزرگ‌تر و جوی‌کان‌های مغناطیسی عرضه شد و رکوردهای فروش نینتندو را جابه‌جا کرد.', source: 'nintendo.com' },
  { id: 'n4', tag: 'بازار', date: '2026-09-27', title: 'قیمت کنسول‌ها در بازار ایران؛ فاصله‌ی ۸۴ میلیونی سری ایکس و سری اس', text: 'بررسی قیمت‌های بازار در مهر ۱۴۰۵ نشان می‌دهد پلی‌استیشن ۵ پرو حدود ۳۱۲ میلیون تومان و ایکس‌باکس سری اس حدود ۱۱۷ میلیون تومان معامله می‌شود.', source: 'nabzgheymat.ir' }
]

export { CATEGORIES, BRANDS, FILTER_DEFS, POPULAR_SEARCHES, catById, subById } from './catalog.js'
export { FX, SOURCES } from './meta.js'
