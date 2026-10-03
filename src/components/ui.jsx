import React from 'react'
import { Star, StarHalf, PackageSearch, SearchX, HeartOff, ShoppingCart, Inbox, BellOff } from 'lucide-react'
import { faNum, compactToman } from '../lib/format.js'

/* ------------------------------ بج‌ها ------------------------------ */
const BADGE_STYLE = {
  new: { label: 'جدید', cls: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
  hot: { label: 'داغ', cls: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  best: { label: 'پرفروش', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  sale: { label: 'تخفیف', cls: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  limited: { label: 'محدود', cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  preorder: { label: 'پیش‌خرید', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  digital: { label: 'دیجیتال', cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  out: { label: 'ناموجود', cls: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30' }
}

export function Badge({ type = 'new', children }) {
  const s = BADGE_STYLE[type] || BADGE_STYLE.new
  return <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${s.cls}`}>{children || s.label}</span>
}

/* ------------------------------ امتیاز ------------------------------ */
export function Rating({ value = 0, count, size = 14, showCount = true }) {
  if (!value && !count) return <span className="text-xs text-mute">هنوز نظری ثبت نشده</span>
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="inline-flex items-center gap-1" aria-label={`امتیاز ${value} از ۵`}>
      <span className="flex items-center gap-0.5 text-warn">
        {[1, 2, 3, 4, 5].map((i) => (
          i <= full ? <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
            : (i === full + 1 && half) ? <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />
            : <Star key={i} size={size} className="text-faint" fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <bdi className="text-xs font-semibold text-sub tnum">{faNum(value)}</bdi>
      {showCount && count !== undefined && <bdi className="text-[11px] text-mute tnum">({faNum(count)} نظر)</bdi>}
    </span>
  )
}

/* ------------------------------ قیمت ------------------------------ */
export function PriceBlock({ price, size = 'md', showNote = false }) {
  if (!price || price.inquiry) {
    return (
      <div>
        <span className="text-sm font-bold text-warn">استعلام قیمت</span>
        {showNote && <p className="mt-1 text-[11px] leading-5 text-mute">قیمت روز این کالا در حال بررسی است. برای اطلاع از قیمت با پشتیبانی تماس بگیرید.</p>}
      </div>
    )
  }
  const sm = size === 'sm'
  return (
    <div className="flex flex-col items-start">
      <span className="flex items-baseline gap-1.5">
        <bdi className={`${sm ? 'text-sm' : 'text-lg'} font-extrabold text-ink tnum`}>{faNum(price.final)}</bdi>
        <span className={`${sm ? 'text-[10px]' : 'text-xs'} text-mute`}>تومان</span>
      </span>
      {price.old > price.final && (
        <bdi className="text-xs text-mute line-through tnum">{faNum(price.old)} تومان</bdi>
      )}
    </div>
  )
}

export const shortPrice = (n) => compactToman(n)

/* ------------------------------ وضعیت موجودی ------------------------------ */
export function StockLabel({ stock, qty }) {
  if (stock === 'in' || stock === undefined) {
    return <span className="inline-flex items-center gap-1 text-[11px] text-ok"><span className="h-1.5 w-1.5 rounded-full bg-ok" /> موجود در انبار{qty !== undefined && qty <= 3 ? ` — ${faNum(qty)} عدد` : ''}</span>
  }
  if (stock === 'low') return <span className="inline-flex items-center gap-1 text-[11px] text-warn"><span className="h-1.5 w-1.5 rounded-full bg-warn" /> موجودی محدود</span>
  if (stock === 'preorder') return <span className="inline-flex items-center gap-1 text-[11px] text-amber-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> پیش‌خرید</span>
  if (stock === 'custom') return <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> اسمبل سفارشی</span>
  if (stock === 'soon') return <span className="inline-flex items-center gap-1 text-[11px] text-sub"><span className="h-1.5 w-1.5 rounded-full bg-faint" /> به‌زودی</span>
  return <span className="inline-flex items-center gap-1 text-[11px] text-hot"><span className="h-1.5 w-1.5 rounded-full bg-hot" /> ناموجود</span>
}

/* ------------------------------ سرتیتر بخش ------------------------------ */
export function SectionHeader({ title, sub, link, linkText = 'مشاهده همه', action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-extrabold text-ink md:text-xl">{title}</h2>
        {sub && <p className="mt-0.5 text-xs text-mute md:text-sm">{sub}</p>}
      </div>
      <div className="flex items-center gap-2">
        {action}
        {link && (
          <a href={link} className="whitespace-nowrap rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-sub transition hover:border-brand/50 hover:text-ink">
            {linkText}
          </a>
        )}
      </div>
    </div>
  )
}

/* ------------------------------ اسکلتون ------------------------------ */
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="skeleton aspect-square w-full rounded-none" />
      <div className="space-y-2.5 p-3.5">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-5 w-1/2" />
        <div className="skeleton h-9 w-full" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="container-x py-8">
      <div className="skeleton mb-6 h-5 w-40" />
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="skeleton aspect-square w-full" />
        <div className="space-y-4">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-24 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ حالت خالی ------------------------------ */
export function EmptyState({ icon: Icon = PackageSearch, title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-panel/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-elev">
        <Icon size={28} className="text-mute" />
      </div>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {desc && <p className="mt-2 max-w-sm text-sm leading-6 text-sub">{desc}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export const EmptyCart = ({ action }) => <EmptyState icon={ShoppingCart} title="سبد خرید شما خالی است" desc="هنوز چیزی به سبد اضافه نکرده‌اید. از دسته‌بندی‌ها یا پیشنهادهای صفحه اول شروع کنید." action={action} />
export const EmptyWishlist = ({ action }) => <EmptyState icon={HeartOff} title="لیست علاقه‌مندی خالی است" desc="با لمس آیکون قلب روی هر محصول، آن را اینجا ذخیره کنید تا بعداً راحت پیدایش کنید." action={action} />
export const EmptyOrders = ({ action }) => <EmptyState icon={Inbox} title="هنوز سفارشی ثبت نکرده‌اید" desc="اولین سفارش شما اینجا نمایش داده می‌شود؛ با وضعیت، مرسوله و کدهای دیجیتال." action={action} />
export const EmptyNotifications = () => <EmptyState icon={BellOff} title="اعلان جدیدی ندارید" desc="به‌روزرسانی سفارش‌ها و پیشنهادها اینجا اعلام می‌شود." />
export const NoResults = ({ q, action }) => <EmptyState icon={SearchX} title="نتیجه‌ای پیدا نشد" desc={q ? `برای «${q}» چیزی پیدا نکردیم. املای دیگری را امتحان کنید یا دسته‌بندی‌ها را مرور کنید.` : 'موردی مطابق فیلترها پیدا نشد.'} action={action} />

/* ------------------------------ انتخاب تعداد ------------------------------ */
export function QtyPicker({ value, onChange, min = 1, max = 10, small = false }) {
  return (
    <div className={`inline-flex items-center rounded-xl border border-line bg-panel ${small ? 'h-8' : 'h-10'}`}>
      <button type="button" aria-label="افزایش تعداد" onClick={() => onChange(Math.min(max, value + 1))} className={`px-2.5 text-lg font-bold text-sub transition hover:text-ink ${small ? 'px-2 text-base' : ''}`}>+</button>
      <bdi className="min-w-8 text-center text-sm font-bold text-ink tnum">{faNum(value)}</bdi>
      <button type="button" aria-label="کاهش تعداد" onClick={() => onChange(Math.max(min, value - 1))} className={`px-2.5 text-lg font-bold text-sub transition hover:text-ink ${small ? 'px-2 text-base' : ''}`}>−</button>
    </div>
  )
}

/* ------------------------------ مودال / شیت ------------------------------ */
export function Sheet({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <button aria-label="بستن" className="absolute inset-0 bg-black/60 fade-in" onClick={onClose} />
      <div className="glass pop-in relative m-0 w-full max-w-lg rounded-t-3xl p-5 sm:m-4 sm:rounded-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-extrabold">{title}</h3>
          <button onClick={onClose} className="rounded-lg border border-line px-2.5 py-1 text-xs text-sub hover:text-ink">بستن</button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------ مودال عمومی ------------------------------ */
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button aria-label="بستن" className="absolute inset-0 bg-black/60 fade-in" onClick={onClose} />
      <div className="glass pop-in relative w-full max-w-md rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-extrabold">{title}</h3>
          <button onClick={onClose} className="rounded-lg border border-line px-2.5 py-1 text-xs text-sub hover:text-ink">بستن</button>
        </div>
        {children}
      </div>
    </div>
  )
}
