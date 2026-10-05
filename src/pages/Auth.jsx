import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { HERO_SLIDES } from '../data/index.js'

/* اسلایدر نمایشگر محصولات/بازی‌ها برای ستون بصری صفحات ورود */
function Showcase() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])
  const s = HERO_SLIDES[idx]
  return (
    <div className="relative hidden h-full min-h-[560px] overflow-hidden rounded-3xl border border-line lg:block">
      {HERO_SLIDES.map((sl, i) => (
        <img key={sl.id} src={sl.img} alt="" aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <span key={`k-${idx}`} className="anim-in inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{s.kicker}</span>
        <h3 key={`t-${idx}`} className="anim-in mt-3 text-2xl font-extrabold text-white" style={{ animationDelay: '60ms' }}><bdi>{s.title}</bdi></h3>
        <p key={`s-${idx}`} className="anim-in mt-2 max-w-sm text-sm leading-6 text-white/70" style={{ animationDelay: '120ms' }}>{s.sub}</p>
        <div className="mt-5 flex gap-1.5">
          {HERO_SLIDES.map((x, i) => (
            <button key={x.id} aria-label={`اسلاید ${i + 1}`} onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AuthShell({ children }) {
  return (
    <main className="container-x grid gap-6 py-8 lg:grid-cols-2 lg:py-12">
      <div className="order-2 lg:order-1">{children}</div>
      <div className="order-1 lg:order-2"><Showcase /></div>
    </main>
  )
}

export function Register() {
  const { register, toast } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState({ firstName: '', lastName: '', email: '', mobile: '', password: '', confirm: '', terms: false })
  const [showPw, setShowPw] = useState(false)
  const [errs, setErrs] = useState({})

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!f.firstName.trim()) er.firstName = 'نام را وارد کنید'
    if (!f.lastName.trim()) er.lastName = 'نام خانوادگی را وارد کنید'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'ایمیل معتبر وارد کنید'
    if (f.mobile && !/^09\d{9}$/.test(f.mobile)) er.mobile = 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد'
    if (f.password.length < 8) er.password = 'رمز عبور باید حداقل ۸ حرف باشد'
    if (f.password !== f.confirm) er.confirm = 'تکرار رمز عبور یکسان نیست'
    if (!f.terms) er.terms = 'پذیرش قوانین برای ساخت حساب لازم است'
    setErrs(er)
    if (Object.keys(er).length) return
    const res = register(f)
    if (!res.ok) { toast(res.error, 'err'); return }
    toast('حساب شما ساخته شد؛ خوش آمدید')
    nav('/')
  }

  const Field = ({ id, label, required, children, error }) => (
    <div>
      <label className="field-label" htmlFor={id}>{label}{required && ' *'}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  )

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-md">
        {/* بنر کوچک موبایل */}
        <div className="mb-6 h-28 overflow-hidden rounded-2xl border border-line lg:hidden">
          <img src={HERO_SLIDES[0].img} alt="" className="h-full w-full object-cover" />
        </div>

        <h1 className="text-2xl font-extrabold">ساخت حساب کاربری</h1>
        <p className="mt-2 text-sm leading-6 text-sub">برای پیگیری سفارش، دریافت کدهای دیجیتال و مدیریت علاقه‌مندی‌ها حساب بسازید.</p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fn" label="نام" required error={errs.firstName}>
              <input id="fn" className={`field-input ${errs.firstName ? 'has-error' : ''}`} value={f.firstName} onChange={(e) => setF({ ...f, firstName: e.target.value })} autoComplete="given-name" />
            </Field>
            <Field id="ln" label="نام خانوادگی" required error={errs.lastName}>
              <input id="ln" className={`field-input ${errs.lastName ? 'has-error' : ''}`} value={f.lastName} onChange={(e) => setF({ ...f, lastName: e.target.value })} autoComplete="family-name" />
            </Field>
          </div>
          <Field id="em" label="ایمیل" required error={errs.email}>
            <input id="em" dir="ltr" type="email" className={`field-input text-left ${errs.email ? 'has-error' : ''}`} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" autoComplete="email" />
          </Field>
          <Field id="mob" label="شماره موبایل (اختیاری)" error={errs.mobile}>
            <input id="mob" dir="ltr" inputMode="numeric" className={`field-input text-left ${errs.mobile ? 'has-error' : ''}`} value={f.mobile} onChange={(e) => setF({ ...f, mobile: e.target.value.replace(/\D/g, '') })} placeholder="09xxxxxxxxx" />
          </Field>
          <Field id="pw" label="رمز عبور" required error={errs.password}>
            <div className="relative">
              <input id="pw" dir="ltr" type={showPw ? 'text' : 'password'} className={`field-input pl-10 text-left ${errs.password ? 'has-error' : ''}`} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPw(!showPw)} aria-label="نمایش رمز" className="absolute left-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
          </Field>
          <Field id="cf" label="تکرار رمز عبور" required error={errs.confirm}>
            <input id="cf" dir="ltr" type={showPw ? 'text' : 'password'} className={`field-input text-left ${errs.confirm ? 'has-error' : ''}`} value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} autoComplete="new-password" />
          </Field>

          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-6 text-sub">
            <input type="checkbox" checked={f.terms} onChange={(e) => setF({ ...f, terms: e.target.checked })} className="mt-1 h-4 w-4 accent-violet-500" />
            <span><Link to="/support" className="font-bold text-brand-2">قوانین و حریم خصوصی</Link> آورورا را خوانده‌ام و می‌پذیرم.</span>
          </label>
          {errs.terms && <p className="field-error">{errs.terms}</p>}

          <button className="btn btn-primary h-12 w-full text-sm">ساخت حساب</button>
        </form>

        <p className="mt-5 text-center text-sm text-sub">قبلاً حساب دارید؟ <Link to="/login" className="font-extrabold text-brand-2">ورود</Link></p>
      </div>
    </AuthShell>
  )
}

export function Login() {
  const { login, toast } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [showPw, setShowPw] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!f.email || !f.password) { setErr('ایمیل و رمز عبور را وارد کنید'); return }
    const res = login(f.email, f.password)
    if (!res.ok) { setErr(res.error); return }
    toast('خوش برگشتید')
    nav('/account')
  }

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 h-28 overflow-hidden rounded-2xl border border-line lg:hidden">
          <img src={HERO_SLIDES[3].img} alt="" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-2xl font-extrabold">ورود به حساب</h1>
        <p className="mt-2 text-sm leading-6 text-sub">سفارش‌ها، کدهای دیجیتال و علاقه‌مندی‌های شما در انتظارتان است.</p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="field-label" htmlFor="lem">ایمیل</label>
            <input id="lem" dir="ltr" type="email" className="field-input text-left" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" autoComplete="email" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="field-label mb-0" htmlFor="lpw">رمز عبور</label>
              <Link to="/support" className="text-[11px] font-bold text-brand-2">رمز را فراموش کرده‌ام</Link>
            </div>
            <div className="relative">
              <input id="lpw" dir="ltr" type={showPw ? 'text' : 'password'} className="field-input pl-10 text-left" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPw(!showPw)} aria-label="نمایش رمز" className="absolute left-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
          </div>
          {err && <p className="rounded-xl bg-hot/10 px-3 py-2 text-xs font-bold text-hot">{err}</p>}
          <button className="btn btn-primary h-12 w-full text-sm">ورود</button>
        </form>

        <p className="mt-5 text-center text-sm text-sub">حساب ندارید؟ <Link to="/register" className="font-extrabold text-brand-2">ساخت حساب</Link></p>
      </div>
    </AuthShell>
  )
}
