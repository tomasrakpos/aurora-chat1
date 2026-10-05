import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, User, MapPin, Truck, CreditCard, BadgeCheck, KeyRound } from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { cartDetails } from '../data/index.js'
import { EmptyCart } from '../components/ui.jsx'
import { faNum } from '../lib/format.js'

const STEPS = [
  { id: 1, label: 'حساب', icon: User },
  { id: 2, label: 'آدرس', icon: MapPin },
  { id: 3, label: 'ارسال', icon: Truck },
  { id: 4, label: 'پرداخت', icon: CreditCard },
  { id: 5, label: 'تأیید', icon: BadgeCheck }
]

const demoCode = () => `AUR-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

export default function Checkout() {
  const nav = useNavigate()
  const { cart, overrides, user, addresses, addAddress, placeOrder, notify, toast } = useStore()
  const d = cartDetails(cart, overrides)
  const [step, setStep] = useState(1)
  const [guest, setGuest] = useState({ firstName: '', lastName: '', email: '' })
  const [addr, setAddr] = useState({ receiver: '', phone: '', city: '', detail: '', postal: '' })
  const [selectedAddr, setSelectedAddr] = useState(addresses[0]?.id || null)
  const [delivery, setDelivery] = useState('post')
  const [payment, setPayment] = useState('gateway')
  const [order, setOrder] = useState(null)
  const [codes] = useState({})

  if (d.items.length === 0 && !order) {
    return <main className="container-x py-10"><EmptyCart action={<Link to="/products" className="btn btn-primary h-11 px-6 text-sm">مشاهده محصولات</Link>} /></main>
  }

  const digitalOnly = d.hasDigital && !d.hasPhysical

  const next = () => {
    if (step === 1 && !user && (!guest.firstName || !guest.email.includes('@'))) { toast('نام و ایمیل معتبر وارد کنید', 'err'); return }
    if (step === 2 && !digitalOnly) {
      const okSel = selectedAddr || (addr.receiver && addr.phone && addr.city && addr.detail)
      if (!okSel) { toast('آدرس را کامل وارد کنید یا یک آدرس انتخاب کنید', 'err'); return }
      if (!selectedAddr && addr.receiver) addAddress({ ...addr, label: 'منزل' })
    }
    setStep(step + 1)
  }

  const finalize = () => {
    const codesMap = {}
    d.items.filter((p) => p.type === 'digital').forEach((p) => { codesMap[p.id] = demoCode() })
    const o = placeOrder({
      items: d.items.map((p) => ({ id: p.id, name: p.name, qty: p.qty, price: p.price?.final || 0, digital: p.type === 'digital', code: codesMap[p.id] })),
      subtotal: d.subtotal, discount: d.discount, shipping: d.shipping, total: d.total,
      delivery: digitalOnly ? 'digital' : delivery, payment,
      customer: user ? `${user.firstName} ${user.lastName || ''}` : `${guest.firstName} ${guest.lastName}`
    })
    setOrder(o)
    setStep(5)
    notify(`سفارش ${o.id} با موفقیت ثبت شد`)
  }

  const Summary = (
    <div className="rounded-2xl border border-line bg-card p-5">
      <h2 className="mb-3 text-base font-extrabold">خلاصه سفارش</h2>
      <div className="max-h-56 space-y-2 overflow-y-auto">
        {d.items.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-2 text-xs">
            <span className="line-clamp-1 flex-1 text-sub">{p.name}</span>
            <bdi className="shrink-0 text-mute tnum">×{faNum(p.qty)}</bdi>
            <bdi className="shrink-0 font-bold text-ink tnum">{faNum((p.price.final || 0) * p.qty)}</bdi>
          </div>
        ))}
      </div>
      <dl className="mt-4 space-y-2 border-t border-line pt-3 text-sm">
        <div className="flex justify-between text-sub"><dt>جمع</dt><dd className="tnum">{faNum(d.subtotal)}</dd></div>
        {d.discount > 0 && <div className="flex justify-between text-hot"><dt>تخفیف</dt><dd className="tnum">{faNum(d.discount)}−</dd></div>}
        <div className="flex justify-between text-sub"><dt>ارسال</dt><dd>{d.shipping === 0 && d.hasPhysical ? 'رایگان' : d.hasPhysical ? <span className="tnum">{faNum(d.shipping)}</span> : 'دیجیتال'}</dd></div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-extrabold"><dt>قابل پرداخت</dt><dd className="tnum">{faNum(d.total)} تومان</dd></div>
      </dl>
    </div>
  )

  return (
    <main className="container-x py-6 md:py-8">
      {/* مراحل */}
      <ol className="mb-8 flex items-center justify-center gap-1 md:gap-3" aria-label="مراحل خرید">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <li className="flex flex-col items-center gap-1.5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${step >= s.id ? 'border-brand bg-brand/15 text-brand' : 'border-line bg-panel text-mute'}`}>
                {step > s.id ? <Check size={15} /> : <s.icon size={15} />}
              </span>
              <span className={`text-[10px] font-bold ${step >= s.id ? 'text-ink' : 'text-mute'}`}>{s.label}</span>
            </li>
            {i < STEPS.length - 1 && <span className={`mb-5 h-px w-6 md:w-14 ${step > s.id ? 'bg-brand' : 'bg-line'}`} />}
          </React.Fragment>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-base font-extrabold">اطلاعات حساب</h2>
              {user ? (
                <p className="rounded-xl bg-panel p-4 text-sm text-sub">وارد شده‌اید: <b className="text-ink">{user.firstName} {user.lastName}</b> — {user.email}</p>
              ) : (
                <>
                  <p className="mb-4 text-xs leading-6 text-mute">حساب دارید؟ <Link to={`/login?next=/checkout`} className="font-bold text-brand-2">وارد شوید</Link> یا به‌عنوان مهمان ادامه دهید.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className="field-label" htmlFor="fn">نام *</label><input id="fn" className="field-input" value={guest.firstName} onChange={(e) => setGuest({ ...guest, firstName: e.target.value })} /></div>
                    <div><label className="field-label" htmlFor="ln">نام خانوادگی</label><input id="ln" className="field-input" value={guest.lastName} onChange={(e) => setGuest({ ...guest, lastName: e.target.value })} /></div>
                    <div className="sm:col-span-2"><label className="field-label" htmlFor="em">ایمیل *</label><input id="em" dir="ltr" type="email" className="field-input text-left" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="you@email.com" /></div>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-base font-extrabold">آدرس تحویل</h2>
              {digitalOnly ? (
                <p className="rounded-xl bg-panel p-4 text-sm leading-7 text-sub">سفارش شما کاملاً دیجیتال است و نیازی به آدرس ندارد. کدها پس از پرداخت در همین صفحه و در حساب کاربری نمایش داده می‌شوند.</p>
              ) : (
                <>
                  {addresses.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {addresses.map((a) => (
                        <label key={a.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${selectedAddr === a.id ? 'border-brand bg-brand/10' : 'border-line bg-panel'}`}>
                          <input type="radio" name="addr" checked={selectedAddr === a.id} onChange={() => setSelectedAddr(a.id)} className="mt-1 accent-violet-500" />
                          <span className="text-sm text-sub"><b className="text-ink">{a.receiver}</b> — {a.city}، {a.detail}</span>
                        </label>
                      ))}
                      <button onClick={() => setSelectedAddr(null)} className="text-xs font-bold text-brand-2">+ ثبت آدرس جدید</button>
                    </div>
                  )}
                  {!selectedAddr && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div><label className="field-label">گیرنده *</label><input className="field-input" value={addr.receiver} onChange={(e) => setAddr({ ...addr, receiver: e.target.value })} /></div>
                      <div><label className="field-label">شماره تماس *</label><input className="field-input" dir="ltr" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} /></div>
                      <div><label className="field-label">شهر *</label><input className="field-input" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} /></div>
                      <div><label className="field-label">کد پستی</label><input className="field-input" dir="ltr" value={addr.postal} onChange={(e) => setAddr({ ...addr, postal: e.target.value })} /></div>
                      <div className="sm:col-span-2"><label className="field-label">نشانی کامل *</label><textarea rows={2} className="field-input" value={addr.detail} onChange={(e) => setAddr({ ...addr, detail: e.target.value })} /></div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-4 text-base font-extrabold">روش تحویل</h2>
              <div className="space-y-2.5">
                {d.hasDigital && (
                  <div className="flex items-start gap-3 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
                    <KeyRound size={17} className="mt-0.5 text-sky-300" />
                    <div><p className="text-sm font-bold text-ink">کالاهای دیجیتال</p><p className="mt-1 text-xs leading-6 text-sub">کدها بلافاصله پس از پرداخت به‌صورت آنی تحویل می‌شوند.</p></div>
                  </div>
                )}
                {d.hasPhysical && [
                  { id: 'post', t: 'پست / تیپاکس', s: 'تحویل ۲ تا ۴ روز کاری — هزینه بر اساس خلاصه سفارش', price: d.shipping },
                  { id: 'express', t: 'پیک فوری (تهران)', s: 'تحویل همان روز برای سفارش‌های ثبت‌شده تا ساعت ۱۴', price: d.shipping },
                  { id: 'pickup', t: 'تحویل حضوری', s: 'دریافت از دفتر آورورا پس از هماهنگی با پشتیبانی', price: 0 }
                ].map((o) => (
                  <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${delivery === o.id ? 'border-brand bg-brand/10' : 'border-line bg-panel'}`}>
                    <input type="radio" name="del" checked={delivery === o.id} onChange={() => setDelivery(o.id)} className="accent-violet-500" />
                    <span className="flex-1"><b className="block text-sm text-ink">{o.t}</b><span className="mt-0.5 block text-xs text-mute">{o.s}</span></span>
                    <span className="text-xs font-bold text-sub">{o.price === 0 ? 'رایگان' : `${faNum(o.price)} تومان`}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="mb-4 text-base font-extrabold">روش پرداخت</h2>
              <div className="space-y-2.5">
                {[
                  { id: 'gateway', t: 'درگاه بانکی', s: 'پرداخت امن با همه‌ی کارت‌های عضو شتاب (شبیه‌سازی در نسخه‌ی نمایشی)' },
                  { id: 'crypto', t: 'پرداخت ارزی / تتر', s: 'پس از ثبت سفارش، هماهنگی با پشتیبانی' }
                ].map((o) => (
                  <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${payment === o.id ? 'border-brand bg-brand/10' : 'border-line bg-panel'}`}>
                    <input type="radio" name="pay" checked={payment === o.id} onChange={() => setPayment(o.id)} className="accent-violet-500" />
                    <span><b className="block text-sm text-ink">{o.t}</b><span className="mt-0.5 block text-xs text-mute">{o.s}</span></span>
                  </label>
                ))}
              </div>
              <button onClick={finalize} className="btn btn-primary mt-6 h-12 w-full text-sm">پرداخت و ثبت نهایی سفارش — {faNum(d.total)} تومان</button>
              <p className="mt-2 text-center text-[11px] text-mute">این نسخه نمایشی است؛ هیچ تراکنش واقعی انجام نمی‌شود.</p>
            </div>
          )}

          {step === 5 && order && (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15"><Check size={30} className="text-ok" /></span>
              <h2 className="mt-4 text-xl font-extrabold">سفارش شما ثبت شد</h2>
              <p className="mt-2 text-sm text-sub">شماره سفارش: <bdi className="font-extrabold text-brand-2">{order.id}</bdi></p>
              {order.items.some((i) => i.digital) && (
                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 text-right">
                  <p className="mb-2 flex items-center gap-2 text-sm font-extrabold text-sky-300"><KeyRound size={15} /> کدهای دیجیتال شما</p>
                  {order.items.filter((i) => i.digital).map((i) => (
                    <div key={i.id} className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                      <span className="line-clamp-1 flex-1 text-sub">{i.name}</span>
                      <code dir="ltr" className="rounded-lg bg-deep px-2 py-1 font-bold tracking-wider text-cyan-300">{i.code}</code>
                    </div>
                  ))}
                  <p className="mt-2 text-[10px] leading-5 text-mute">این کدها نمونه‌ی نمایشی هستند. در فروشگاه واقعی، کدهای فعال‌سازی معتبر اینجا قرار می‌گیرند.</p>
                </div>
              )}
              <div className="mt-6 flex justify-center gap-2">
                <Link to="/account/orders" className="btn btn-primary h-11 px-6 text-sm">پیگیری سفارش</Link>
                <Link to="/" className="btn btn-ghost h-11 px-6 text-sm">بازگشت به فروشگاه</Link>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => (step === 1 ? nav('/cart') : setStep(step - 1))} className="btn btn-ghost h-11 px-5 text-sm">مرحله قبل</button>
              {step < 4 && <button onClick={next} className="btn btn-primary h-11 px-8 text-sm">ادامه</button>}
            </div>
          )}
        </div>

        <aside className="h-fit lg:sticky lg:top-36">{Summary}</aside>
      </div>
    </main>
  )
}
