import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  User, Package, Heart, MapPin, LifeBuoy, Shield, Bell, Download, LogOut, Plus, Trash2, KeyRound, ChevronLeft
} from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { productById } from '../data/index.js'
import { ProductVisual } from '../components/media.jsx'
import { EmptyOrders, EmptyNotifications, Badge } from '../components/ui.jsx'
import Wishlist from './Wishlist.jsx'
import { faNum, faDateTime, faDate } from '../lib/format.js'

const MENU = [
  { to: '/account', label: 'نمای کلی', icon: User, end: true },
  { to: '/account/orders', label: 'سفارش‌ها', icon: Package },
  { to: '/account/wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
  { to: '/account/addresses', label: 'آدرس‌ها', icon: MapPin },
  { to: '/account/downloads', label: 'خریدهای دیجیتال', icon: Download },
  { to: '/account/support', label: 'تیکت‌های پشتیبانی', icon: LifeBuoy },
  { to: '/account/notifications', label: 'اعلان‌ها', icon: Bell },
  { to: '/account/security', label: 'امنیت', icon: Shield }
]

function Shell({ children }) {
  const { user, logout } = useStore()
  const nav = useNavigate()
  if (!user) {
    return (
      <main className="container-x py-16 text-center">
        <h1 className="text-xl font-extrabold">برای دسترسی به حساب کاربری وارد شوید</h1>
        <p className="mt-2 text-sm text-sub">سفارش‌ها، کدهای دیجیتال و تنظیمات شما اینجاست.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/login" className="btn btn-primary h-11 px-8 text-sm">ورود</Link>
          <Link to="/register" className="btn btn-ghost h-11 px-8 text-sm">ساخت حساب</Link>
        </div>
      </main>
    )
  }
  return (
    <main className="container-x py-6 md:py-8">
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside>
          <div className="rounded-2xl border border-line bg-card p-4 lg:sticky lg:top-36">
            <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
              <span className="grad-brand flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold text-white">{user.firstName?.[0]}</span>
              <span className="min-w-0">
                <b className="block truncate text-sm text-ink">{user.firstName} {user.lastName}</b>
                <span dir="ltr" className="block truncate text-[11px] text-mute ltr">{user.email}</span>
              </span>
            </div>
            <nav className="flex gap-1 overflow-x-auto no-scrollbar lg:flex-col">
              {MENU.map((m) => (
                <NavLink key={m.to} to={m.to} end={m.end}
                  className={({ isActive }) => `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${isActive ? 'bg-brand/15 text-brand' : 'text-sub hover:bg-white/5 hover:text-ink'}`}>
                  <m.icon size={16} /> {m.label}
                </NavLink>
              ))}
              <button onClick={() => { logout(); nav('/') }} className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-hot transition hover:bg-hot/10">
                <LogOut size={16} /> خروج
              </button>
            </nav>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}

export function AccountHome() {
  const { user, orders, wishlist, recent, notifications } = useStore()
  return (
    <Shell>
      <h1 className="text-lg font-extrabold md:text-xl">سلام {user?.firstName} 👋</h1>
      <p className="mt-1 text-sm text-sub">خلاصه‌ی فعالیت شما در آورورا</p>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'سفارش', value: orders.length, to: '/account/orders' },
          { label: 'علاقه‌مندی', value: wishlist.length, to: '/account/wishlist' },
          { label: 'بازدید اخیر', value: recent.length, to: '/' },
          { label: 'اعلان', value: notifications.length, to: '/account/notifications' }
        ].map((s) => (
          <Link key={s.label} to={s.to} className="rounded-2xl border border-line bg-card p-4 transition hover:border-brand/40">
            <bdi className="block text-2xl font-extrabold tnum">{faNum(s.value)}</bdi>
            <span className="mt-1 block text-xs text-mute">{s.label}</span>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-base font-extrabold">آخرین سفارش‌ها</h2>
      {orders.length === 0 ? (
        <EmptyOrders action={<Link to="/products" className="btn btn-primary h-10 px-5 text-sm">شروع خرید</Link>} />
      ) : (
        <div className="space-y-2">
          {orders.slice(0, 3).map((o) => (
            <Link key={o.id} to="/account/orders" className="flex items-center justify-between rounded-2xl border border-line bg-card p-4 transition hover:border-brand/40">
              <span className="text-sm font-bold text-ink">{o.id}</span>
              <span className="text-xs text-mute">{faDateTime(o.createdAt)}</span>
              <bdi className="text-sm font-extrabold tnum">{faNum(o.total)} تومان</bdi>
            </Link>
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-base font-extrabold">بازدیدهای اخیر</h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {recent.slice(0, 6).map((id) => {
              const p = productById(id)
              if (!p) return null
              return (
                <Link key={id} to={`/product/${id}`} className="overflow-hidden rounded-xl border border-line bg-card transition hover:border-brand/40">
                  <div className="aspect-square bg-[#eef1f6]"><ProductVisual product={p} /></div>
                  <p className="line-clamp-1 p-2 text-[10px] text-sub">{p.name}</p>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </Shell>
  )
}

export function Orders() {
  const { orders } = useStore()
  return (
    <Shell>
      <h1 className="mb-5 text-lg font-extrabold">سفارش‌های من</h1>
      {orders.length === 0 ? (
        <EmptyOrders action={<Link to="/products" className="btn btn-primary h-10 px-5 text-sm">شروع خرید</Link>} />
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-2xl border border-line bg-card">
              <header className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 text-xs">
                <b className="text-sm text-ink">{o.id}</b>
                <span className="text-mute">{faDateTime(o.createdAt)}</span>
                <span className="mr-auto rounded-md bg-sky-500/15 px-2 py-1 font-bold text-sky-300">{o.status}</span>
              </header>
              <div className="divide-y divide-line-soft">
                {o.items.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#eef1f6]">
                      {productById(i.id) ? <ProductVisual product={productById(i.id)} /> : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-[13px] font-semibold text-ink">{i.name}</p>
                      <p className="text-[11px] text-mute">تعداد: <bdi className="tnum">{faNum(i.qty)}</bdi>{i.digital && ' — دیجیتال'}</p>
                    </div>
                    {i.code && <code dir="ltr" className="hidden rounded-lg bg-deep px-2 py-1 text-[10px] font-bold text-cyan-300 sm:block ltr">{i.code}</code>}
                    <bdi className="text-[13px] font-bold tnum">{faNum(i.price * i.qty)}</bdi>
                  </div>
                ))}
              </div>
              <footer className="flex items-center justify-between border-t border-line px-4 py-3 text-sm">
                <span className="text-xs text-mute">{o.delivery === 'digital' ? 'تحویل دیجیتال' : o.delivery === 'pickup' ? 'تحویل حضوری' : 'ارسال پستی'}</span>
                <bdi className="font-extrabold tnum">{faNum(o.total)} تومان</bdi>
              </footer>
            </article>
          ))}
        </div>
      )}
    </Shell>
  )
}

export function AccountWishlist() {
  return <Wishlist />
}

export function Addresses() {
  const { addresses, addAddress, removeAddress, toast } = useStore()
  const [f, setF] = useState({ receiver: '', phone: '', city: '', detail: '' })
  const submit = (e) => {
    e.preventDefault()
    if (!f.receiver || !f.city || !f.detail) { toast('فیلدهای ستاره‌دار را کامل کنید', 'err'); return }
    addAddress({ ...f, label: 'منزل' })
    setF({ receiver: '', phone: '', city: '', detail: '' })
    toast('آدرس ذخیره شد')
  }
  return (
    <Shell>
      <h1 className="mb-5 text-lg font-extrabold">آدرس‌های من</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-sm font-extrabold text-ink">{a.receiver}</p>
            <p className="mt-1.5 text-xs leading-6 text-sub">{a.city}، {a.detail}</p>
            <p dir="ltr" className="mt-1 text-[11px] text-mute ltr">{a.phone}</p>
            <button onClick={() => removeAddress(a.id)} className="btn btn-danger-soft mt-3 h-8 px-3 text-[11px]"><Trash2 size={12} /> حذف</button>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 rounded-2xl border border-line bg-card p-5">
        <p className="mb-3 flex items-center gap-2 text-sm font-extrabold"><Plus size={15} /> افزودن آدرس جدید</p>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <input className="field-input" placeholder="نام گیرنده *" value={f.receiver} onChange={(e) => setF({ ...f, receiver: e.target.value })} />
          <input className="field-input" dir="ltr" placeholder="شماره تماس" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <input className="field-input" placeholder="شهر *" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
          <input className="field-input sm:col-span-2" placeholder="نشانی کامل *" value={f.detail} onChange={(e) => setF({ ...f, detail: e.target.value })} />
        </div>
        <button className="btn btn-primary mt-4 h-10 px-6 text-xs">ذخیره آدرس</button>
      </form>
    </Shell>
  )
}

export function Downloads() {
  const { orders } = useStore()
  const digital = orders.flatMap((o) => o.items.filter((i) => i.digital).map((i) => ({ ...i, orderId: o.id, date: o.createdAt })))
  return (
    <Shell>
      <h1 className="mb-5 text-lg font-extrabold">خریدهای دیجیتال</h1>
      {digital.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-panel/60 p-8 text-center">
          <KeyRound size={26} className="mx-auto text-mute" />
          <p className="mt-3 text-sm font-bold text-ink">هنوز خرید دیجیتالی ندارید</p>
          <p className="mt-1 text-xs text-sub">کدهای گیفت‌کارت و بازی‌های دیجیتال پس از خرید اینجا قرار می‌گیرند.</p>
          <Link to="/category/digital" className="btn btn-primary mx-auto mt-4 h-10 px-5 text-sm">استور دیجیتال</Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {digital.map((i) => (
            <div key={i.orderId + i.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card p-4">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[13px] font-bold text-ink">{i.name}</p>
                <p className="mt-0.5 text-[11px] text-mute">سفارش {i.orderId} — {faDateTime(i.date)}</p>
              </div>
              <code dir="ltr" className="rounded-lg bg-deep px-3 py-1.5 text-xs font-bold tracking-wider text-cyan-300 ltr">{i.code}</code>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}

export function SupportTickets() {
  const { tickets } = useStore()
  return (
    <Shell>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg font-extrabold">تیکت‌های پشتیبانی</h1>
        <Link to="/support#ticket" className="btn btn-primary h-9 px-4 text-xs"><Plus size={13} /> تیکت جدید</Link>
      </div>
      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-panel/60 p-8 text-center">
          <LifeBuoy size={26} className="mx-auto text-mute" />
          <p className="mt-3 text-sm font-bold text-ink">تیکتی ثبت نکرده‌اید</p>
          <p className="mt-1 text-xs text-sub">اگر سوال یا مشکلی دارید، از مرکز پشتیبانی تیکت بسازید.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tickets.map((t) => (
            <div key={t.id} className="rounded-2xl border border-line bg-card p-4">
              <div className="flex items-center gap-2">
                <b className="text-sm text-ink">{t.subject}</b>
                <span className={`mr-auto rounded-md px-2 py-0.5 text-[10px] font-bold ${t.status === 'باز' ? 'bg-amber-500/15 text-amber-300' : 'bg-ok/15 text-ok'}`}>{t.status}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-sub">{t.body}</p>
              <p className="mt-2 text-[10px] text-mute">{faDateTime(t.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}

export function NotificationsPage() {
  const { notifications } = useStore()
  return (
    <Shell>
      <h1 className="mb-5 text-lg font-extrabold">اعلان‌ها</h1>
      {notifications.length === 0 ? <EmptyNotifications /> : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-faint' : 'bg-brand-2'}`} />
              <div><p className="text-sm text-ink">{n.msg}</p><p className="mt-1 text-[11px] text-mute">{faDateTime(n.createdAt)}</p></div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}

export function Security() {
  const { user, toast } = useStore()
  const [f, setF] = useState({ current: '', next: '', confirm: '' })
  const submit = (e) => {
    e.preventDefault()
    if (f.next.length < 8) { toast('رمز جدید باید حداقل ۸ حرف باشد', 'err'); return }
    if (f.next !== f.confirm) { toast('تکرار رمز یکسان نیست', 'err'); return }
    toast('رمز عبور شما تغییر کرد')
    setF({ current: '', next: '', confirm: '' })
  }
  return (
    <Shell>
      <h1 className="mb-5 text-lg font-extrabold">امنیت حساب</h1>
      <form onSubmit={submit} className="max-w-md space-y-4 rounded-2xl border border-line bg-card p-5">
        <div><label className="field-label">رمز فعلی</label><input dir="ltr" type="password" className="field-input text-left" value={f.current} onChange={(e) => setF({ ...f, current: e.target.value })} /></div>
        <div><label className="field-label">رمز جدید</label><input dir="ltr" type="password" className="field-input text-left" value={f.next} onChange={(e) => setF({ ...f, next: e.target.value })} /></div>
        <div><label className="field-label">تکرار رمز جدید</label><input dir="ltr" type="password" className="field-input text-left" value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} /></div>
        <button className="btn btn-primary h-10 w-full text-sm">تغییر رمز عبور</button>
        <p className="text-[11px] leading-5 text-mute">عضویت شما: {user?.email}. در فروشگاه واقعی، تغییر رمز با تأیید ایمیلی همراه است.</p>
      </form>
    </Shell>
  )
}
