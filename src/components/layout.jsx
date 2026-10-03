import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Search, ShoppingCart, Heart, User, Home, LayoutGrid, Gamepad2, Cpu, Monitor, Mouse,
  Disc3, Gift, Cable, Mic, Armchair, Puzzle, X, ChevronDown, ChevronLeft, Menu, Headset, LogOut,
  Package, MapPin, LifeBuoy, Shield, Bell, Download, Settings, Instagram, Send, MessageCircle, Zap, Flame
} from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { CATEGORIES, PRODUCTS, POPULAR_SEARCHES, CATEGORY_TILES, catById, suggestProducts, productById } from '../data/index.js'
import { faNum, normalize } from '../lib/format.js'
import { ProductVisual } from './media.jsx'
import { PriceBlock } from './ui.jsx'

export const CAT_ICON = {
  gamepad: Gamepad2, cpu: Cpu, pc: Monitor, monitor: Monitor, mouse: Mouse, disc: Disc3,
  gift: Gift, cable: Cable, mic: Mic, chair: Armchair, figure: Puzzle
}

/* ------------------------------ لوگو ------------------------------ */
export function Logo({ small = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="آورورا — صفحه اصلی">
      <span className="grad-brand flex h-9 w-9 items-center justify-center rounded-xl shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M4 18 L12 4 L20 18" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!small && (
        <span className="flex flex-col leading-none">
          <b className="text-lg font-extrabold tracking-tight text-ink">آورورا</b>
          <span className="mt-1 text-[10px] font-medium text-mute">فروشگاه تخصصی گیمینگ</span>
        </span>
      )}
    </Link>
  )
}

/* ------------------------------ جعبه جستجو ------------------------------ */
export function SearchBox({ autoFocus = false, onNavigate, mobile = false }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const { recentSearches, pushSearch } = useStore()
  const nav = useNavigate()
  const boxRef = useRef(null)

  const results = useMemo(() => (q.trim() ? suggestProducts(q, 5) : []), [q])
  const catMatches = useMemo(() => {
    if (!q.trim()) return []
    const n = normalize(q)
    return CATEGORIES.filter((c) => normalize(c.name).includes(n) || normalize(c.en).includes(n)).slice(0, 3)
  }, [q])
  const brandMatches = useMemo(() => {
    if (!q.trim()) return []
    const n = normalize(q)
    const set = new Set()
    PRODUCTS.forEach((p) => { if (normalize(p.brand).includes(n)) set.add(p.brand) })
    return [...set].slice(0, 3)
  }, [q])

  useEffect(() => {
    const onClick = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const submit = (term) => {
    const t = (term ?? q).trim()
    if (!t) return
    pushSearch(t)
    setOpen(false)
    setQ('')
    onNavigate?.()
    nav(`/search?q=${encodeURIComponent(t)}`)
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={(e) => { e.preventDefault(); submit() }} role="search">
        <label className="relative block">
          <span className="sr-only">جستجو در محصولات</span>
          <Search size={17} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-mute" />
          <input
            value={q}
            autoFocus={autoFocus}
            onChange={(e) => { setQ(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder="جستجوی کنسول، بازی، قطعات و…"
            className="field-input h-11 rounded-xl pr-10 text-sm"
          />
        </label>
      </form>

      {open && (
        <div className="glass pop-in absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-[70vh] overflow-y-auto rounded-2xl p-3">
          {!q.trim() ? (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <p className="mb-2 text-[11px] font-bold text-mute">جستجوهای اخیر شما</p>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((s) => (
                      <button key={s} onMouseDown={() => submit(s)} className="rounded-lg border border-line bg-panel px-2.5 py-1 text-xs text-sub hover:border-brand/40 hover:text-ink">{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 text-[11px] font-bold text-mute">جستجوهای پرطرفدار</p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((s) => (
                    <button key={s} onMouseDown={() => submit(s)} className="rounded-lg border border-line bg-panel px-2.5 py-1 text-xs text-sub hover:border-brand/40 hover:text-ink">{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {results.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold text-mute">محصولات</p>
                  {results.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} onMouseDown={() => { pushSearch(q); onNavigate?.() }}
                      className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/5">
                      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#eef1f6]"><ProductVisual product={p} /></span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-1 text-[13px] font-semibold text-ink">{p.name}</span>
                        <span className="text-[11px] text-mute">{p.brand}</span>
                      </span>
                      <span className="shrink-0"><PriceBlock price={p.price} size="sm" /></span>
                    </Link>
                  ))}
                </div>
              )}
              {catMatches.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold text-mute">دسته‌بندی‌ها</p>
                  {catMatches.map((c) => (
                    <Link key={c.id} to={`/category/${c.id}`} onMouseDown={() => onNavigate?.()} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sub hover:bg-white/5 hover:text-ink">
                      <LayoutGrid size={14} /> {c.name}
                    </Link>
                  ))}
                </div>
              )}
              {brandMatches.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] font-bold text-mute">برندها</p>
                  <div className="flex flex-wrap gap-1.5">
                    {brandMatches.map((b) => (
                      <button key={b} onMouseDown={() => submit(b)} className="rounded-lg border border-line bg-panel px-2.5 py-1 text-xs text-sub hover:text-ink">{b}</button>
                    ))}
                  </div>
                </div>
              )}
              <button onMouseDown={() => submit()} className="btn btn-soft h-9 w-full text-xs">مشاهده‌ی همه‌ی نتایج برای «{q}»</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------ مگامنو + هدر دسکتاپ ------------------------------ */
export function Header() {
  const { cart, wishlist, user } = useStore()
  const [mega, setMega] = useState(false)
  const [megaCat, setMegaCat] = useState(CATEGORIES[0]?.id)
  const [userMenu, setUserMenu] = useState(false)
  const megaTimer = useRef(null)
  const nav = useNavigate()
  const loc = useLocation()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const userMenuRef = useRef(null)

  useEffect(() => { setMega(false); setUserMenu(false) }, [loc.pathname])
  useEffect(() => {
    const onClick = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenu(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const enter = () => { clearTimeout(megaTimer.current); setMega(true) }
  const leave = () => { megaTimer.current = setTimeout(() => setMega(false), 140) }

  const active = catById(megaCat) || CATEGORIES[0]
  const activeTile = CATEGORY_TILES.find((t) => t.id === active?.id)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/92 backdrop-blur-md">
      {/* ردیف اول: لوگو، جستجو، اکشن‌ها */}
      <div className="container-x flex h-16 items-center gap-3 md:h-[76px] md:gap-5">
        <div className="hidden shrink-0 md:block"><Logo /></div>
        <div className="min-w-0 flex-1 md:max-w-2xl"><SearchBox /></div>

        <div className="mr-auto flex items-center md:gap-1">
          {/* ورود | ثبت‌نام */}
          <div ref={userMenuRef} className="relative hidden md:block">
            <button
              onClick={() => (user ? setUserMenu((v) => !v) : nav('/login'))}
              className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition ${user ? 'border-line text-ink hover:border-brand/50' : 'border-line text-sub hover:border-brand/50 hover:text-ink'}`}
              aria-haspopup="menu"
            >
              <User size={16} />
              {user ? user.firstName : 'ورود | ثبت‌نام'}
            </button>
            {userMenu && user && (
              <div className="glass pop-in absolute left-0 top-[calc(100%+8px)] z-50 w-60 rounded-2xl p-2" role="menu">
                <p className="border-b border-line px-3 py-2 text-xs text-mute">{user.email}</p>
                {[
                  { to: '/account', icon: User, label: 'حساب کاربری' },
                  { to: '/account/orders', icon: Package, label: 'سفارش‌ها' },
                  { to: '/account/wishlist', icon: Heart, label: 'علاقه‌مندی‌ها' },
                  { to: '/account/support', icon: LifeBuoy, label: 'تیکت‌های پشتیبانی' },
                  { to: '/admin', icon: Shield, label: 'پنل مدیریت (نسخه‌ی نمایشی)' }
                ].map((i) => (
                  <Link key={i.to} to={i.to} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-sub transition hover:bg-white/5 hover:text-ink">
                    <i.icon size={15} /> {i.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <span className="mx-1 hidden h-6 w-px bg-line md:block" />

          <Link to="/wishlist" aria-label="علاقه‌مندی‌ها" className="btn btn-ghost relative hidden h-10 w-10 p-0 md:flex">
            <Heart size={19} />
            {wishlist.length > 0 && <bdi className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-hot px-1 text-[10px] font-bold text-white tnum">{faNum(wishlist.length)}</bdi>}
          </Link>

          <Link to="/cart" aria-label="سبد خرید" className="btn btn-ghost relative h-10 w-10 p-0">
            <ShoppingCart size={19} />
            {cartCount > 0 && <bdi className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[10px] font-bold text-white tnum">{faNum(cartCount)}</bdi>}
          </Link>
        </div>
      </div>

      {/* ردیف دوم: دسته‌بندی کالاها + لینک‌های سریع */}
      <nav className="hidden border-t border-line-soft md:block" aria-label="دسته‌بندی‌ها">
        <div className="container-x flex items-center gap-0.5" onMouseLeave={leave}>
          <button
            onMouseEnter={enter}
            onFocus={enter}
            onClick={() => nav('/products')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-bold transition ${mega ? 'text-ink' : 'text-sub hover:text-ink'}`}
            aria-expanded={mega}
          >
            <Menu size={16} />
            دسته‌بندی کالاها
            <ChevronDown size={13} className={`transition-transform ${mega ? 'rotate-180' : ''}`} />
          </button>
          <span className="mx-2 h-4 w-px bg-line" />
          <Link to="/#deals" className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-sub transition hover:text-ink">
            <Zap size={15} className="text-warn" /> پیشنهاد امروز
          </Link>
          <Link to="/category/games?sub=preorder" className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-sub transition hover:text-ink">
            <Flame size={15} className="text-hot" /> پیش‌خریدها
          </Link>
          <Link to="/category/digital" className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-sub transition hover:text-ink">
            استور دیجیتال
          </Link>
          <Link to="/category/systems" className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-sub transition hover:text-ink">
            سیستم‌های گیمینگ
          </Link>
          <Link to="/support" className="mr-auto flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-sub transition hover:text-ink">
            <Headset size={15} /> پشتیبانی
          </Link>
        </div>

        {/* مگامنو: ستون دسته‌ها + زیردسته‌ها */}
        {mega && active && (
          <div className="absolute inset-x-0 border-b border-line bg-panel/97 shadow-pop backdrop-blur-xl fade-in" onMouseEnter={enter}>
            <div className="container-x flex">
              <div className="w-60 shrink-0 border-l border-line-soft py-3">
                {CATEGORIES.map((c) => {
                  const Icon = CAT_ICON[c.icon] || Gamepad2
                  const on = megaCat === c.id
                  return (
                    <button
                      key={c.id}
                      onMouseEnter={() => setMegaCat(c.id)}
                      onFocus={() => setMegaCat(c.id)}
                      onClick={() => nav(`/category/${c.id}`)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-right text-[13px] font-semibold transition ${on ? 'bg-elev text-ink' : 'text-sub hover:bg-white/5 hover:text-ink'}`}
                    >
                      <Icon size={16} className={on ? 'text-brand-2' : ''} />
                      {c.name}
                      <ChevronLeft size={13} className={`mr-auto transition ${on ? 'text-brand-2' : 'text-faint'}`} />
                    </button>
                  )
                })}
              </div>
              <div className="flex-1 py-4 pr-8">
                <p className="mb-3 text-sm font-extrabold text-ink">{active.name} <span className="mr-2 text-xs font-medium text-mute">{active.en}</span></p>
                <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                  <Link to={`/category/${active.id}`} className="rounded-lg px-2 py-2 text-[13px] font-bold text-brand-2 transition hover:bg-white/5">همه‌ی {active.name}</Link>
                  {active.subs.map((s) => (
                    <Link key={s.id} to={`/category/${active.id}?sub=${s.id}`} className="rounded-lg px-2 py-2 text-[13px] text-sub transition hover:bg-white/5 hover:text-ink">{s.name}</Link>
                  ))}
                </div>
                {activeTile?.img && (
                  <Link to={`/category/${active.id}`} className="group mt-4 relative block h-32 overflow-hidden rounded-xl border border-line">
                    <img src={activeTile.img} alt={active.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-xs font-bold text-white">{active.desc}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

/* ------------------------------ جستجوی موبایل ------------------------------ */
function MobileSearch({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-base">
      <div className="container-x flex items-center gap-3 pt-4">
        <div className="flex-1"><SearchBox autoFocus onNavigate={onClose} mobile /></div>
        <button onClick={onClose} aria-label="بستن جستجو" className="btn btn-ghost h-10 w-10 p-0"><X size={18} /></button>
      </div>
      <p className="container-x mt-6 text-xs text-mute">نتایج پیشنهادی حین تایپ نمایش داده می‌شود.</p>
    </div>
  )
}

/* ------------------------------ ناوبری موبایل ------------------------------ */
export function MobileNav() {
  const { cart, wishlist } = useStore()
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const loc = useLocation()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  useEffect(() => { setDrawer(false) }, [loc.pathname])

  const items = [
    { to: '/', icon: Home, label: 'خانه' },
    { key: 'cats', icon: LayoutGrid, label: 'دسته‌ها' },
    { to: '/cart', icon: ShoppingCart, label: 'سبد', badge: cartCount },
    { to: '/wishlist', icon: Heart, label: 'پسندیده‌ها', badge: wishlist.length },
    { to: '/account', icon: User, label: 'پروفایل' }
  ]

  return (
    <>
      {/* نوار پایین شیشه‌ای */}
      <nav className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),10px)] md:hidden" aria-label="ناوبری موبایل">
        <div className="glass mx-3 flex items-stretch justify-between rounded-[1.6rem] px-2 py-2">
          {items.map((it) => {
            const active = it.to ? loc.pathname === it.to : false
            const Comp = it.to ? Link : 'button'
            return (
              <Comp key={it.label} {...(it.to ? { to: it.to } : { onClick: () => setDrawer(true) })}
                className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition-all duration-300 ${active ? 'text-brand-2' : 'text-sub'}`}>
                <span className={`flex h-7 w-12 items-center justify-center rounded-full transition-all duration-300 ${active ? 'bg-brand/15' : ''}`}>
                  <it.icon size={19} className={active ? 'scale-110' : 'scale-100 transition-transform'} />
                  {it.badge > 0 && (
                    <bdi className="absolute -top-0.5 left-1/2 flex h-4 min-w-4 -translate-x-2 items-center justify-center rounded-full bg-hot px-1 text-[9px] font-bold text-white tnum">{faNum(it.badge)}</bdi>
                  )}
                </span>
                <span className={`text-[10px] font-semibold ${active ? 'text-brand-2' : ''}`}>{it.label}</span>
              </Comp>
            )
          })}
        </div>
      </nav>

      {/* کشوی دسته‌ها */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button aria-label="بستن" className="absolute inset-0 bg-black/60 fade-in" onClick={() => setDrawer(false)} />
          <div className="glass absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-3xl p-5 pop-in safe-bottom">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold">دسته‌بندی‌ها</h3>
              <button onClick={() => setDrawer(false)} aria-label="بستن" className="btn btn-ghost h-9 w-9 p-0"><X size={16} /></button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <Link to="/products" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-brand-2 transition hover:bg-white/5">
                <LayoutGrid size={18} /> همه‌ی محصولات
              </Link>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/category/${c.id}`} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-sub transition hover:bg-white/5 hover:text-ink">
                  {React.createElement(CAT_ICON[c.icon] || Gamepad2, { size: 18 })}
                  {c.name}
                  <span className="mr-auto text-[11px] text-mute">{c.subs.length > 0 ? `${faNum(c.subs.length)} زیردسته` : ''}</span>
                </Link>
              ))}
              <Link to="/support" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-sub transition hover:bg-white/5 hover:text-ink">
                <Headset size={18} /> پشتیبانی
              </Link>
            </div>
          </div>
        </div>
      )}

      <MobileSearch open={search} onClose={() => setSearch(false)} />

      {/* هدر موبایل: لوگو + پیل جستجو + سبد */}
      <div className="sticky top-0 z-40 border-b border-line bg-base/92 backdrop-blur-md md:hidden">
        <div className="container-x flex h-14 items-center gap-2.5">
          <Logo small />
          <button
            onClick={() => setSearch(true)}
            className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-line-soft bg-elev/60 px-3 text-xs text-mute transition active:bg-elev"
            aria-label="جستجو در محصولات"
          >
            <Search size={15} />
            <span className="truncate">جستجو در آورورا…</span>
          </button>
          <Link to="/cart" aria-label="سبد خرید" className="btn btn-ghost relative h-9 w-9 shrink-0 p-0">
            <ShoppingCart size={18} />
            {cartCount > 0 && <bdi className="absolute -left-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta px-1 text-[9px] font-bold text-white tnum">{faNum(cartCount)}</bdi>}
          </Link>
        </div>
      </div>
    </>
  )
}

/* ------------------------------ فوتر ------------------------------ */
export function Footer() {
  const [openAcc, setOpenAcc] = useState(null)
  const { toast } = useStore()
  const [email, setEmail] = useState('')

  const cols = [
    { title: 'دسته‌بندی‌ها', links: CATEGORIES.slice(0, 7).map((c) => ({ label: c.name, to: `/category/${c.id}` })) },
    {
      title: 'خدمات مشتریان', links: [
        { label: 'مرکز پشتیبانی', to: '/support' },
        { label: 'سوالات متداول', to: '/support#faq' },
        { label: 'پیگیری سفارش', to: '/account/orders' },
        { label: 'شرایط بازگشت', to: '/support' }
      ]
    },
    {
      title: 'راهنمای خرید', links: [
        { label: 'نحوه‌ی ثبت سفارش', to: '/support' },
        { label: 'فروشگاه دیجیتال', to: '/category/digital' },
        { label: 'پیش‌خرید بازی‌ها', to: '/category/games?sub=preorder' },
        { label: 'سیستم‌های اسمبل‌شده', to: '/category/systems' }
      ]
    }
  ]

  return (
    <footer className="mt-16 border-t border-line bg-deep pb-28 md:pb-10">
      <div className="container-x pt-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-6 text-mute">
              آورورا فروشگاه تخصصی گیمینگ است؛ کنسول، قطعات، بازی و محصولات دیجیتال با قیمت شفاف و به‌روز.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a href="#" aria-label="اینستاگرام" className="btn btn-ghost h-9 w-9 p-0"><Instagram size={16} /></a>
              <a href="#" aria-label="تلگرام" className="btn btn-ghost h-9 w-9 p-0"><Send size={16} /></a>
              <a href="#" aria-label="واتساپ" className="btn btn-ghost h-9 w-9 p-0"><MessageCircle size={16} /></a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              {/* دسکتاپ */}
              <div className="hidden md:block">
                <h4 className="mb-3 text-sm font-extrabold text-ink">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => <li key={l.label}><Link to={l.to} className="text-[13px] text-mute transition hover:text-ink">{l.label}</Link></li>)}
                </ul>
              </div>
              {/* موبایل: آکاردئون */}
              <div className="md:hidden">
                <button onClick={() => setOpenAcc(openAcc === col.title ? null : col.title)} className="flex w-full items-center justify-between border-b border-line py-3 text-sm font-bold text-ink">
                  {col.title}
                  <ChevronDown size={15} className={`transition-transform ${openAcc === col.title ? 'rotate-180' : ''}`} />
                </button>
                {openAcc === col.title && (
                  <ul className="space-y-2.5 py-3 fade-in">
                    {col.links.map((l) => <li key={l.label}><Link to={l.to} className="text-[13px] text-mute">{l.label}</Link></li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-ink">خبرنامه</h4>
            <p className="text-[13px] leading-6 text-mute">از تخفیف‌ها و عرضه‌های مهم باخبر شوید؛ بدون هرزنامه.</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) { toast('عضویت شما ثبت شد'); setEmail('') } else toast('ایمیل معتبر وارد کنید', 'err') }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" dir="ltr" placeholder="you@email.com" aria-label="ایمیل برای خبرنامه" className="field-input h-10 flex-1 text-left text-xs" />
              <button className="btn btn-primary h-10 px-4 text-xs">عضویت</button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[11px] text-mute md:flex-row">
          <p>© ۱۴۰۵ فروشگاه آورورا — نسخه‌ی نمایشی؛ قیمت‌ها به تومان و برگرفته از منابع معتبر بازار است.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Shield size={13} /> پرداخت امن</span>
            <span className="flex items-center gap-1.5"><TruckIcon /> ارسال سراسری</span>
            <span className="flex items-center gap-1.5"><Headset size={13} /> پشتیبانی ۷ روز هفته</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TruckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
    </svg>
  )
}

/* ------------------------------ توست‌ها ------------------------------ */
export function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-24 left-3 z-[70] flex flex-col gap-2 md:bottom-6 md:left-6">
      {toasts.map((t) => (
        <div key={t.id} className={`pop-in glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-pop ${t.type === 'err' ? 'text-hot' : 'text-ink'}`}>
          <span className={`h-2 w-2 rounded-full ${t.type === 'err' ? 'bg-hot' : 'bg-ok'}`} />
          {t.msg}
        </div>
      ))}
    </div>
  )
}
