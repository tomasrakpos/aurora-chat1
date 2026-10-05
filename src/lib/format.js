// ابزارهای فرمت‌دهی اعداد، قیمت و تاریخ (فارسی)

export const faNum = (n) => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return Number(n).toLocaleString('fa-IR')
}

export const faPrice = (n) => (n === null || n === undefined ? null : Number(n).toLocaleString('fa-IR'))

/** «۳۱۲ میلیون» برای نمایش فشرده */
export const compactToman = (n) => {
  if (n === null || n === undefined) return '—'
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toLocaleString('fa-IR', { maximumFractionDigits: 2 })} میلیارد تومان`
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString('fa-IR', { maximumFractionDigits: 1 })} میلیون تومان`
  if (n >= 1_000) return `${(n / 1_000).toLocaleString('fa-IR', { maximumFractionDigits: 0 })} هزار تومان`
  return `${faNum(n)} تومان`
}

export const faDate = (iso, opts = { dateStyle: 'medium' }) => {
  try { return new Intl.DateTimeFormat('fa-IR', opts).format(new Date(iso)) } catch { return '—' }
}

export const faDateTime = (iso) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  } catch { return '—' }
}

/** «امروز، ۱۶:۳۰» یا «دیروز» یا تاریخ کامل */
export const faRelative = (iso) => {
  try {
    const d = new Date(iso)
    const now = new Date()
    const sameDay = d.toDateString() === now.toDateString()
    const yest = new Date(now); yest.setDate(now.getDate() - 1)
    if (sameDay) return `امروز، ${new Intl.DateTimeFormat('fa-IR', { timeStyle: 'short' }).format(d)}`
    if (d.toDateString() === yest.toDateString()) return `دیروز، ${new Intl.DateTimeFormat('fa-IR', { timeStyle: 'short' }).format(d)}`
    return faDateTime(iso)
  } catch { return '—' }
}

/** نرمال‌سازی متن برای جستجو: یکدست‌سازی ی/ک عربی، حذف نیم‌فاصله و علائم */
export const normalize = (s = '') =>
  String(s)
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u200c\u200f\u200e]/g, ' ')
    .replace(/‌/g, ' ')
    .replace(/[^\w\u0600-\u06FF\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const uid = () => Math.random().toString(36).slice(2, 10)

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
