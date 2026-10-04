import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Search, ShoppingCart, Heart, User, Home, LayoutGrid, Gamepad2, Cpu, Monitor, Mouse,
  Disc3, Gift, Cable, Mic, Armchair, Puzzle, X, ChevronDown, ChevronLeft, Menu, Headset, LogOut,
  Package, MapPin, LifeBuoy, Shield, ShieldCheck, Bell, Download, Settings, Instagram, Send,
  MessageCircle, Zap, Flame, Truck, CreditCard, Move, RotateCw
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

/* ------------------------------ ناوبر شیشه‌ای شناور: تحلیل نور ------------------------------ */
const GN_BINS = 24

function gnMkMap(w, h) {
  const R = Math.min(w, h) / 2
  const a = []
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const ux = (x - Math.min(Math.max(x, R), w - R)) / R
      const uy = (y - h / 2) / R
      const q = Math.hypot(ux, uy)
      if (q > 1) continue
      const m = Math.sin(Math.pow(q, 2.8) * Math.PI)
      a.push(-ux * m, -uy * m)
    }
  }
  return { n: (w * h) / 4, a }
}

function gnAnalyze(M, az) {
  const pf = new Array(GN_BINS).fill(0)
  const ct = new Array(GN_BINS).fill(0)
  let sx = 0, sy = 0, sm = 0, mx = 0
  const a = M.a
  for (let i = 0; i < a.length; i += 2) {
    const bx = a[i], by = a[i + 1]
    const mg = Math.hypot(bx, by)
    if (mg < 0.02) continue
    const an = Math.atan2(by, bx)
    const fc = Math.max(0, Math.cos(an - az))
    const br = mg * (0.35 + 0.65 * fc)
    sx += Math.cos(an) * br; sy += Math.sin(an) * br; sm += br
    let bn = Math.floor(((an + Math.PI) / (2 * Math.PI)) * GN_BINS) % GN_BINS
    if (bn < 0) bn += GN_BINS
    pf[bn] += br; ct[bn]++
  }
  for (let b = 0; b < GN_BINS; b++) { if (ct[b]) pf[b] /= ct[b]; if (pf[b] > mx) mx = pf[b] }
  if (mx > 0) for (let b = 0; b < GN_BINS; b++) pf[b] /= mx
  return { prof: pf, dom: Math.atan2(sy, sx), mag: Math.min(1, (sm / Math.max(1, M.n)) * 6) }
}

function gnConic(pf, deg) {
  const st = []
  for (let b = 0; b <= GN_BINS; b++) st.push(`rgba(255,255,255,${(0.07 + pf[b % GN_BINS] * 0.63).toFixed(3)}) ${((b / GN_BINS) * 360).toFixed(1)}deg`)
  return `conic-gradient(from ${deg.toFixed(1)}deg at 50% 50%, ${st.join(', ')})`
}

function gnLighten(el, M, cx, cy, th, W, H) {
  const az = Math.atan2(0 - cy / H, 0.5 - cx / W) - th
  const k = az.toFixed(2)
  if (el._k === k) return
  el._k = k
  const A = gnAnalyze(M, az)
  const it = 0.4 + A.mag * 0.6
  const st = el.style
  st.setProperty('--cos', (-Math.cos(A.dom) * it).toFixed(3))
  st.setProperty('--sin', (-Math.sin(A.dom) * it).toFixed(3))
  st.setProperty('--rim', A.mag.toFixed(3))
  st.setProperty('--rg', gnConic(A.prof, (A.dom * 180) / Math.PI + 90))
}

/* ------------------------------ ناوبر شیشه‌ای شناور ------------------------------ */
export function FloatingNav() {
  const { cart, wishlist } = useStore()
  const [drawer, setDrawer] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  useEffect(() => setDrawer(false), [loc.pathname])

  const items = [
    { id: 'home', to: '/', label: 'خانه', icon: Home },
    { id: 'cats', label: 'دسته‌ها', icon: LayoutGrid, drawer: true },
    { id: 'cart', to: '/cart', label: 'سبد', icon: ShoppingCart, badge: cartCount },
    { id: 'wish', to: '/wishlist', label: 'پسندیده', icon: Heart, badge: wishlist.length },
    { id: 'me', to: '/account', label: 'پروفایل', icon: User }
  ]
  const matchIdx = (path) => {
    const i = items.findIndex((it) => (it.to === '/' ? path === '/' : it.to && path.startsWith(it.to)))
    return i < 0 ? 0 : i
  }
  const [activeIdx, setActiveIdx] = useState(() => matchIdx(loc.pathname))
  useEffect(() => { setActiveIdx(matchIdx(loc.pathname)) }, [loc.pathname])

  const barRef = useRef(null), glassRef = useRef(null), pillRef = useRef(null), haloRef = useRef(null)
  const mvRef = useRef(null), rtRef = useRef(null), cvRef = useRef(null)
  const itemRefs = useRef([])
  const api = useRef({})
  const activeIdxRef = useRef(activeIdx)
  useEffect(() => { activeIdxRef.current = activeIdx }, [activeIdx])

  api.current.select = (i) => {
    const it = items[i]
    if (!it) return
    if (it.drawer) setDrawer(true)
    else if (it.to) nav(it.to)
  }

  useEffect(() => {
    const bar = barRef.current, glass = glassRef.current, pill = pillRef.current, halo = haloRef.current
    const mv = mvRef.current, rt = rtRef.current
    if (!bar || !glass || !pill || !halo || !mv || !rt) return undefined
    const cl = (v, a, b) => Math.min(Math.max(v, a), b)
    let W = 0, H = 0, BW = 0, BH = 0, PW = 0, PH = 0, MB = null, MP = null
    const S = { cx: 0, cy: 0, tcx: 0, tcy: 0, vx: 0, vy: 0, th: 0, tth: 0, vth: 0 }
    const P = { xL: 0, xR: 0, vL: 0, vR: 0, pf: 1, tpf: 1 }
    const Gl = { g: 0, tg: 0 }
    let PV = 0, LX = 0, LY = 0, lx = 0, lt = 0
    let slot = [], lo = 0, hi = 0, idx = 0, tgtC = 0
    let drag = false, mode = null, first = true, run = false, last = 0, rz = 0
    let ox = 0, oy = 0, la = 0, rafId = 0, tintId = 0, t0 = performance.now()
    let disposed = false

    /* ---------- WebGL: شکست نور پشت شیشه ---------- */
    const cv = cvRef.current
    let gl = null, G = false
    const U = {}
    let TW = 2000, TH = 1125, pgMode = false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
    const FS = 'precision highp float;uniform sampler2D u_t;uniform vec2 u_res,u_img,u_off,u_barC,u_barS,u_pillC,u_pillS;uniform float u_dpr,u_ang,u_scale,u_pg;'
      + 'vec2 lens(vec2 p,vec2 c,vec2 sz,out float ins){vec2 d=p-c;float ca=cos(u_ang),sa=sin(u_ang);vec2 l=vec2(ca*d.x+sa*d.y,-sa*d.x+ca*d.y);'
      + 'float R=min(sz.x,sz.y)*.5,hx=max(sz.x*.5-R,0.);vec2 q=vec2(l.x-clamp(l.x,-hx,hx),l.y)/R;float qq=length(q);ins=step(qq,1.);'
      + 'float m=sin(exp2(2.8*log2(max(qq,1e-4)))*3.14159265);vec2 v=-q*m;return vec2(ca*v.x-sa*v.y,sa*v.x+ca*v.y)*ins;}'
      + 'vec3 smp(vec2 p){return texture2D(u_t,(p-u_off)/u_img).rgb;}'
      + 'void main(){vec2 p=vec2(gl_FragCoord.x,u_res.y-gl_FragCoord.y)/u_dpr;float a,b;vec2 v1=lens(p,u_barC,u_barS,a);vec2 v2=lens(p,u_pillC,u_pillS,b);'
      + 'if(a+b<.5){discard;}'
      + 'vec2 v=mix(v1,v2*(1.+u_pg),b)*u_scale*.5;float ds=mix(.05,.12,b);gl_FragColor=vec4(smp(p+v*(1.+ds)).r,smp(p+v).g,smp(p+v*(1.-ds)).b,1.);}'

    function sh(type, src) { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o }
    if (cv) {
      try {
        gl = cv.getContext('webgl', { alpha: true, antialias: false }) || cv.getContext('experimental-webgl', { alpha: true, antialias: false })
      } catch { gl = null }
    }
    if (gl) {
      const pr = gl.createProgram()
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS))
      gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS))
      gl.linkProgram(pr)
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) gl = null
      else {
        gl.useProgram(pr)
        gl.clearColor(0, 0, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
        const al = gl.getAttribLocation(pr, 'p')
        gl.enableVertexAttribArray(al)
        gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0)
        ;['t', 'res', 'img', 'off', 'barC', 'barS', 'pillC', 'pillS', 'dpr', 'ang', 'scale', 'pg'].forEach((n) => { U[n] = gl.getUniformLocation(pr, 'u_' + n) })
        gl.uniform1i(U.t, 0)
        const tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        ;[[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]]
          .forEach((q) => gl.texParameteri(gl.TEXTURE_2D, q[0], q[1]))

        function uploadSource(source) {
          if (disposed || !gl) return
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
          if (!G) { G = true; cv.classList.add('on') }
          sizeCanvas()
          setStatic()
          wake()
        }

        /* عکس‌برداری زنده از خود صفحه برای شکست نور پشت شیشه (با موتور رندر خود مرورگر) */
        let capTimer = 0, cropTimer = 0, lastFull = 0, lastCrop = 0, fails = 0
        let fullCnv = null, fullScale = 1

        function cropUpload() {
          if (disposed || !gl || !fullCnv) return
          const vw = window.innerWidth, vh = window.innerHeight
          const ow = Math.max(1, Math.round(vw * fullScale))
          const oh = Math.max(1, Math.round(vh * fullScale))
          const sy = Math.max(0, Math.min(window.scrollY * fullScale, fullCnv.height - oh))
          const out = document.createElement('canvas')
          out.width = ow; out.height = oh
          out.getContext('2d').drawImage(fullCnv, 0, sy, ow, oh, 0, 0, ow, oh)
          TW = ow; TH = oh; pgMode = true
          uploadSource(out)
        }

        async function snapFull() {
          const { toCanvas } = await import('html-to-image')
          if (disposed || !gl) return
          const vw = window.innerWidth, vh = window.innerHeight
          fullScale = Math.min(0.6, 1500 / Math.max(vw, vh))
          const docH = Math.min(document.body.scrollHeight, window.scrollY + vh * 2 + 300)
          fullCnv = await toCanvas(document.body, {
            width: vw, height: docH, pixelRatio: fullScale,
            backgroundColor: '#0a0c12',
            filter: (node) => !(node === bar || node === cv || (node.classList && (node.classList.contains('gn-bar') || node.classList.contains('gn-cv'))))
          })
          if (disposed || !gl) return
          cropUpload()
        }

        function capture(delay = 0) {
          if (disposed || !gl) return
          clearTimeout(capTimer)
          capTimer = setTimeout(async () => {
            if (disposed || !gl) return
            lastFull = performance.now()
            try { await snapFull(); fails = 0 }
            catch {
              fails++
              if (fails === 2) document.documentElement.classList.add('gn-nogl')
            }
          }, delay)
        }
        function captureScroll() {
          if (disposed || !gl) return
          if (!fullCnv) { capture(150); return }
          if (performance.now() - lastFull > 900) { capture(120); return }
          const now = performance.now()
          if (now - lastCrop < 120) {
            clearTimeout(cropTimer)
            cropTimer = setTimeout(cropUpload, 130)
            return
          }
          lastCrop = now
          cropUpload()
        }
        api.current.capture = capture

        capture(350)
        const onWinLoad = () => capture(900)
        const onScrollCap = () => captureScroll()
        window.addEventListener('load', onWinLoad)
        window.addEventListener('scroll', onScrollCap, { passive: true })
        api.current.glCleanup = () => {
          clearTimeout(capTimer); clearTimeout(cropTimer)
          window.removeEventListener('load', onWinLoad)
          window.removeEventListener('scroll', onScrollCap)
        }
      }
    }
    if (!gl) document.documentElement.classList.add('gn-nogl')

    function sizeCanvas() { if (cv) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr) } }
    function setStatic() {
      if (!gl || !G) return
      let iw, ih, ox0, oy0
      if (pgMode) { iw = W; ih = H; ox0 = 0; oy0 = 0 }
      else {
        const sc = Math.max(W / TW, H / TH)
        iw = TW * sc; ih = TH * sc
        ox0 = (W - iw) * 0.62; oy0 = (H - ih) * 0.5
      }
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(U.res, cv.width, cv.height)
      gl.uniform1f(U.dpr, dpr)
      gl.uniform2f(U.img, iw, ih)
      gl.uniform2f(U.off, ox0, oy0)
      gl.uniform1f(U.scale, 44)
    }

    function physics() {
      S.vx = (S.vx + (S.tcx - S.cx) * 0.14) * 0.74; S.cx += S.vx
      S.vy = (S.vy + (S.tcy - S.cy) * 0.14) * 0.74; S.cy += S.vy
      S.vth = (S.vth + (S.tth - S.th) * 0.12) * 0.76; S.th += S.vth
      P.pf += (P.tpf - P.pf) * 0.16; PV *= 0.88
      Gl.g += (Gl.tg - Gl.g) * (Gl.tg > Gl.g ? 0.4 : 0.045)
      const hw = (PW * P.pf) / 2, c = (P.xL + P.xR) / 2
      const d = Math.abs(PV) > 2 ? (PV > 0 ? 1 : -1) : (tgtC >= c ? 1 : -1)
      const E = Math.min(120, Math.max(Math.abs(PV) * 3.2, Math.abs(tgtC - c) * 0.5))
      const kl = drag ? 0.22 : 0.12, dl = drag ? 0.7 : 0.775
      const tR = tgtC + hw + (d < 0 ? E : 0), tL = tgtC - hw - (d > 0 ? E : 0)
      const MW = PW * 3.3
      if (d > 0) { P.vR = (P.vR + (tR - P.xR) * kl) * dl; P.vL = (P.vL + (tL - P.xL) * 0.032) * 0.85 }
      else { P.vL = (P.vL + (tL - P.xL) * kl) * dl; P.vR = (P.vR + (tR - P.xR) * 0.032) * 0.85 }
      P.xL += P.vL; P.xR += P.vR
      if (P.xL < -2) { P.xL = -2; P.vL = 0 }
      if (P.xR > BW + 2) { P.xR = BW + 2; P.vR = 0 }
      if (P.xR - P.xL > MW) { if (d > 0) { P.xL = P.xR - MW; P.vL = P.vR } else { P.xR = P.xL + MW; P.vR = P.vL } }
      if (P.xR - P.xL < PW * 0.7) { const m = (P.xL + P.xR) / 2; P.xL = m - PW * 0.35; P.xR = m + PW * 0.35; P.vL = P.vR = 0 }
    }

    function moving() {
      const hw = (PW * P.tpf) / 2
      const e = Math.abs(S.tcx - S.cx) + Math.abs(S.tcy - S.cy) + Math.abs(S.vx) + Math.abs(S.vy)
        + Math.abs(P.xL - (tgtC - hw)) + Math.abs(P.xR - (tgtC + hw)) + Math.abs(P.vL) + Math.abs(P.vR)
        + Math.abs(P.pf - P.tpf) * 50 + (Math.abs(S.tth - S.th) + Math.abs(S.vth)) * 200
      return drag || mode || Gl.g > 0.01 || Gl.tg > 0 || e + Math.abs(PV) > 0.15
    }

    function render() {
      if (!PW || !slot.length) return
      const c = Math.cos(S.th), s = Math.sin(S.th)
      const w = P.xR - P.xL, pc = (P.xL + P.xR) / 2
      const hs = cl(Math.pow((PW * P.pf) / w, 0.45), 0.72, 1.15)
      const h = Math.min(PH * P.pf * hs, w, BH + 6)
      const px = S.cx + c * (pc - BW / 2), py = S.cy + s * (pc - BW / 2)
      const st = pill.style
      bar.style.transform = `translate(${(S.cx - BW / 2).toFixed(2)}px,${(S.cy - BH / 2).toFixed(2)}px) rotate(${S.th.toFixed(4)}rad)`
      st.left = P.xL.toFixed(2) + 'px'; st.width = w.toFixed(2) + 'px'
      st.top = ((BH - h) / 2).toFixed(2) + 'px'; st.height = h.toFixed(2) + 'px'
      st.borderRadius = (Math.min(w, h) / 2).toFixed(1) + 'px'
      const hh = halo.style
      const gx = cl((LX - P.xL) / w, 0, 1) * 100
      const gy = cl((LY - (BH - h) / 2) / h, 0, 1) * 100
      const gg = Gl.g.toFixed(3)
      hh.left = st.left; hh.width = st.width; hh.top = st.top; hh.height = st.height; hh.borderRadius = st.borderRadius
      st.setProperty('--gx', gx.toFixed(1) + '%'); st.setProperty('--gy', gy.toFixed(1) + '%'); st.setProperty('--g', gg)
      hh.setProperty('--g', gg)
      gnLighten(glass, MB, S.cx, S.cy, S.th, W, H)
      gnLighten(pill, MP, px, py, S.th, W, H)
      if (G) {
        gl.uniform2f(U.barC, S.cx, S.cy)
        gl.uniform2f(U.barS, BW, BH)
        gl.uniform2f(U.pillC, px, py)
        gl.uniform2f(U.pillS, w, h)
        gl.uniform1f(U.ang, S.th)
        gl.uniform1f(U.pg, 0.3 * Gl.g)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    }

    function loop(t) {
      const n = cl(Math.round((t - last) / 16.67), 1, 4); last = t
      let k = n; while (k--) physics()
      render()
      if (moving()) rafId = requestAnimationFrame(loop)
      else run = false
    }
    function wake() { if (!run) { run = true; last = performance.now(); rafId = requestAnimationFrame(loop) } }

    function build() {
      W = window.innerWidth; H = window.innerHeight
      BW = bar.offsetWidth; BH = bar.offsetHeight
      if (!BW) return
      PH = BH - 12
      const its = itemRefs.current.filter(Boolean)
      if (its.length) PW = Math.round(its[0].offsetWidth - 4)
      slot = its.map((b) => b.offsetLeft + b.offsetWidth / 2)
      lo = Math.min(...slot); hi = Math.max(...slot)
      MB = gnMkMap(BW, BH); MP = gnMkMap(PW, PH)
      glass._k = pill._k = null
      if (first) {
        idx = activeIdxRef.current
        S.cx = S.tcx = W / 2
        S.cy = S.tcy = H - 24 - BH / 2
        first = false
      } else {
        S.cx = S.tcx = cl(S.cx, 30, W - 30)
        S.cy = S.tcy = cl(S.cy, 100, H - 40)
      }
      tgtC = slot[idx] ?? tgtC
      P.xL = tgtC - PW / 2; P.xR = tgtC + PW / 2; P.vL = P.vR = 0
      sizeCanvas()
      if (G) setStatic()
      api.current.capture?.(250)
      render()
    }

    function locPt(e) {
      const dx = e.clientX - S.cx, dy = e.clientY - S.cy
      const c = Math.cos(S.th), s = Math.sin(S.th)
      LX = c * dx + s * dy + BW / 2
      LY = -s * dx + c * dy + BH / 2
      return LX
    }
    const soft = (x) => (x < lo ? lo - Math.min(34, (lo - x) * 0.3) : x > hi ? hi + Math.min(34, (x - hi) * 0.3) : x)
    function near(x) { let b = 0; slot.forEach((s0, i) => { if (Math.abs(s0 - x) < Math.abs(slot[b] - x)) b = i }); return b }
    function pick(i) {
      idx = i; tgtC = slot[i] ?? tgtC
      api.current.setActive?.(i)
      api.current.select?.(i)
      wake()
    }

    api.current.sync = (i) => { if (slot.length) { idx = i; tgtC = slot[i]; wake() } }
    api.current.kb = (i) => { Gl.g = 0.8; pick(i) }
    api.current.zeroRot = () => { S.tth = 0; wake() }
    api.current.setActive = setActiveIdx

    const onBarDown = (e) => { drag = true; P.tpf = 1.16; Gl.tg = 1; Gl.g = Math.max(Gl.g, 0.55); PV = 0; bar.setPointerCapture(e.pointerId); lx = locPt(e); lt = e.timeStamp; tgtC = soft(lx); wake() }
    const onBarMove = (e) => { if (!drag) return; const x = locPt(e); const dt = Math.max(1, (e.timeStamp - lt) / 16.67); PV += ((x - lx) / dt - PV) * 0.55; lx = x; lt = e.timeStamp; tgtC = soft(x) }
    const onBarUp = (e) => { if (!drag) return; drag = false; P.tpf = 1; Gl.tg = 0; pick(near(locPt(e))) }
    const onBarCancel = () => { drag = false; P.tpf = 1; Gl.tg = 0; pick(idx) }
    const onMvDown = (e) => { e.stopPropagation(); mode = 'm'; ox = e.clientX - S.tcx; oy = e.clientY - S.tcy; mv.setPointerCapture(e.pointerId); wake() }
    const onMvMove = (e) => { if (mode === 'm') { S.tcx = cl(e.clientX - ox, 30, W - 30); S.tcy = cl(e.clientY - oy, 100, H - 40); wake() } }
    const onRtDown = (e) => { e.stopPropagation(); mode = 'r'; la = Math.atan2(e.clientY - S.cy, e.clientX - S.cx); rt.setPointerCapture(e.pointerId); wake() }
    const onRtMove = (e) => { if (mode !== 'r') return; const a = Math.atan2(e.clientY - S.cy, e.clientX - S.cx); let d = a - la; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; la = a; S.tth += d; wake() }
    const onHandleUp = () => { mode = null; wake() }
    const onResize = () => { clearTimeout(rz); rz = setTimeout(build, 150) }

    bar.addEventListener('pointerdown', onBarDown)
    bar.addEventListener('pointermove', onBarMove)
    bar.addEventListener('pointerup', onBarUp)
    bar.addEventListener('pointercancel', onBarCancel)
    mv.addEventListener('pointerdown', onMvDown)
    mv.addEventListener('pointermove', onMvMove)
    mv.addEventListener('pointerup', onHandleUp)
    rt.addEventListener('pointerdown', onRtDown)
    rt.addEventListener('pointermove', onRtMove)
    rt.addEventListener('pointerup', onHandleUp)
    window.addEventListener('resize', onResize)

    build()
    wake()

    const tint = (t) => {
      bar.style.setProperty('--tc', `hsl(${(119 - 91 * Math.cos(((t - t0) / 7000) * 6.2832)).toFixed(1)},100%,62%)`)
      tintId = requestAnimationFrame(tint)
    }
    tintId = requestAnimationFrame(tint)

    return () => {
      disposed = true
      api.current.glCleanup?.()
      cancelAnimationFrame(rafId); cancelAnimationFrame(tintId); clearTimeout(rz)
      bar.removeEventListener('pointerdown', onBarDown)
      bar.removeEventListener('pointermove', onBarMove)
      bar.removeEventListener('pointerup', onBarUp)
      bar.removeEventListener('pointercancel', onBarCancel)
      mv.removeEventListener('pointerdown', onMvDown)
      mv.removeEventListener('pointermove', onMvMove)
      mv.removeEventListener('pointerup', onHandleUp)
      rt.removeEventListener('pointerdown', onRtDown)
      rt.removeEventListener('pointermove', onRtMove)
      rt.removeEventListener('pointerup', onHandleUp)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => { api.current.sync?.(activeIdx) }, [activeIdx])
  useEffect(() => { api.current.capture?.(450) }, [loc.pathname])

  return (
    <>
      <canvas ref={cvRef} className="gn-cv" aria-hidden="true" />
      <nav ref={barRef} className="gn-bar" aria-label="ناوبری اصلی">
        <i ref={glassRef} className="gn-gl gn-glass" aria-hidden="true" />
        <i ref={haloRef} className="gn-halo" aria-hidden="true" />
        <i ref={pillRef} className="gn-gl gn-pill" aria-hidden="true" />
        {items.map((it, i) => {
          const Ic = it.icon
          return (
            <button
              key={it.id}
              ref={(el) => { itemRefs.current[i] = el }}
              type="button"
              className="gn-it"
              aria-current={activeIdx === i}
              aria-label={it.label}
              onClick={(e) => { if (e.detail === 0) api.current.kb?.(i) }}
            >
              <Ic size={25} strokeWidth={1.8} />
              <span>{it.label}</span>
              {it.badge > 0 && <bdi className="gn-bd">{faNum(it.badge)}</bdi>}
            </button>
          )
        })}
        <button ref={mvRef} type="button" className="gn-hd gn-mv" aria-label="جابه‌جایی ناوبری">
          <Move size={20} strokeWidth={2} />
        </button>
        <button ref={rtRef} type="button" className="gn-hd gn-rt" aria-label="چرخاندن ناوبری (دوبار کلیک: صفر)" onDoubleClick={() => api.current.zeroRot?.()}>
          <RotateCw size={20} strokeWidth={2} />
        </button>
      </nav>

      {/* کشوی دسته‌ها */}
      {drawer && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
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
    </>
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
  const [search, setSearch] = useState(false)
  const loc = useLocation()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)



  return (
    <>
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

        {/* چیپ‌های دسته‌بندی */}
        <div className="no-scrollbar container-x flex gap-1.5 overflow-x-auto pb-2.5" aria-label="دسته‌بندی‌ها">
          <Link to="/products" className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition ${loc.pathname === '/products' ? 'border-brand/60 bg-brand/10 text-brand-2' : 'border-line bg-elev/50 text-sub active:text-ink'}`}>
            همه‌ی محصولات
          </Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${loc.pathname === `/category/${c.id}` ? 'border-brand/60 bg-brand/10 text-brand-2' : 'border-line bg-elev/50 text-sub active:text-ink'}`}>
              {c.name}
            </Link>
          ))}
          <Link to="/support" className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${loc.pathname === '/support' ? 'border-brand/60 bg-brand/10 text-brand-2' : 'border-line bg-elev/50 text-sub active:text-ink'}`}>
            پشتیبانی
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
    <footer className="mt-16 border-t border-line bg-deep pb-36 md:pb-28">
      <div className="container-x pt-10">
        {/* نوار خدمات */}
        <div className="grid grid-cols-2 gap-6 border-b border-line pb-9 sm:grid-cols-3 md:grid-cols-5">
          {[
            { icon: Truck, t: 'ارسال سریع', s: 'تحویل اکسپرس سفارش‌ها' },
            { icon: ShieldCheck, t: 'ضمانت اصالت کالا', s: 'اورجینال با گارانتی معتبر' },
            { icon: Zap, t: 'تحویل آنی دیجیتال', s: 'کد بلافاصله پس از پرداخت' },
            { icon: Headset, t: 'پشتیبانی ۷ روز هفته', s: 'پاسخ‌گویی هر روز' },
            { icon: CreditCard, t: 'پرداخت امن', s: 'درگاه مطمئن بانکی' }
          ].map((i) => (
            <div key={i.t} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-2">
                <i.icon size={20} />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">{i.t}</p>
                <p className="mt-0.5 text-[10px] text-mute">{i.s}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
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
