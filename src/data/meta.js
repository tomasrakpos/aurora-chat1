// ============================================================
// منابع قیمت و کارخانه‌ی ساخت رکورد قیمت
// هر قیمت حتماً منبع، لینک و زمان بررسی دارد.
// اگر قیمت معتبری پیدا نشود، قیمت «استعلام» ثبت می‌شود و هرگز حدس زده نمی‌شود.
// ============================================================

export const FX = {
  rate: 266000, // تومان به ازای هر دلار
  source: 'نرخ بازار آزاد ارز — اعلام ۱۱ مهر ۱۴۰۵',
  sourceUrl: 'https://tosebrand.ir/',
  checked: '2026-10-03T10:00:00+03:30',
  margin: 1.08 // ۸٪ کارمزد خرید و سرویس
}

const S = {
  nabz: { source: 'nabzgheymat.ir', url: 'https://nabzgheymat.ir/', checked: '2026-09-27T11:00:00+03:30' },
  iranjib: { source: 'iranjib.ir', url: 'https://www.iranjib.ir/shownews/148390/', checked: '2026-10-02T11:00:00+03:30' },
  zoomg: { source: 'zoomg.ir', url: 'https://www.zoomg.ir/game-articles/407228-playstation-console-latest-price-iran/', checked: '2026-07-15T11:00:00+03:30' },
  zoomgN: { source: 'zoomg.ir', url: 'https://www.zoomg.ir/game-articles/407270-nintendo-console-prices-iran/', checked: '2026-10-03T11:00:00+03:30' },
  pspro: { source: 'pspro.ir', url: 'https://pspro.ir/', checked: '2026-10-03T13:00:00+03:30' },
  torob: { source: 'torob.com', url: 'https://torob.com/', checked: '2026-10-03T13:30:00+03:30' },
  nakhl: { source: 'nakhlmarket.com', url: 'https://nakhlmarket.com/product-category/console/mini-pc/steamdeck/', checked: '2026-10-03T13:30:00+03:30' },
  jahan: { source: 'jahanbazar.com', url: 'https://jahanbazar.com/c/janebi/keyboard/', checked: '2026-10-03T13:30:00+03:30' },
  ircon: { source: 'iranianconsole.com', url: 'https://iranianconsole.com/product/ps5-controller', checked: '2026-10-03T13:30:00+03:30' },
  west: { source: 'westgamestore.ir', url: 'https://westgamestore.ir/', checked: '2026-10-03T13:30:00+03:30' },
  itskala: { source: 'itskala.com', url: 'https://itskala.com/', checked: '2026-10-03T13:30:00+03:30' },
  dragon: { source: 'dragon-shop.ir', url: 'https://dragon-shop.ir/', checked: '2026-10-03T13:30:00+03:30' },
  zoomit: { source: 'zoomit.ir', url: 'https://www.zoomit.ir/product/microsoft-xbox-series-x-s-wireless-controller/price/', checked: '2026-10-03T13:30:00+03:30' },
  ea: { source: 'ea.com', url: 'https://www.ea.com/games/ea-sports-fc/fc-27/buy', checked: '2026-10-03T12:00:00+03:30' },
  rockstar: { source: 'rockstargames.com / forbes.com', url: 'https://www.forbes.com/sites/brianmazique/2026-05-12/grand-theft-auto-6-release-date-and-everything-confirmed/', checked: '2026-10-03T12:00:00+03:30' }
}
export const SOURCES = S

/** قیمت تومانی با منبع */
export const P = (final, srcKey, extra = {}) => ({
  inquiry: false,
  final,
  old: extra.old ?? null,
  source: S[srcKey]?.source || srcKey,
  sourceUrl: S[srcKey]?.url || '',
  sourcePrice: extra.sourcePrice ?? null,
  sourceCurrency: extra.sourceCurrency ?? null,
  exchangeRate: extra.exchangeRate ?? null,
  lastChecked: extra.checked || S[srcKey]?.checked || '2026-10-03T13:00:00+03:30',
  note: extra.note || null
})

/** قیمت بر پایه‌ی دلار: مقدار اصلی + نرخ تبدیل + کارمزد، با شفافیت کامل */
export const PUSD = (usd, srcKey, opts = {}) => {
  const raw = Math.round(usd * FX.rate * FX.margin)
  const final = opts.round ? Math.round(raw / 10000) * 10000 : raw
  return {
    inquiry: false,
    final,
    old: null,
    source: `${S[srcKey]?.source || srcKey} + ${FX.source}`,
    sourceUrl: S[srcKey]?.url || '',
    sourcePrice: usd,
    sourceCurrency: 'USD',
    exchangeRate: FX.rate,
    margin: FX.margin,
    lastChecked: FX.checked,
    note: opts.note || `مبنای تبدیل: دلار آزاد ${FX.rate.toLocaleString('fa-IR')} تومان (۱۱ مهر ۱۴۰۵) + ۸٪ کارمزد`
  }
}

/** قیمت نیازمند بررسی — هرگز حدس زده نمی‌شود */
export const INQ = (note = 'در انتظار بررسی قیمت روز') => ({ inquiry: true, final: null, old: null, note })
