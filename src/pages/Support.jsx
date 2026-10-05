import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Headset, KeyRound, Package, CreditCard, Truck, RotateCcw, Send, Phone, Clock, Mail } from 'lucide-react'
import { FAQS } from '../data/index.js'
import { useStore } from '../lib/store.jsx'

const TOPICS = [
  { icon: Package, t: 'کمک درباره سفارش', s: 'پیگیری، تغییر یا لغو سفارش', link: '/account/orders' },
  { icon: CreditCard, t: 'مشکل پرداخت', s: 'درگاه، بازگشت وجه و خطاها' },
  { icon: KeyRound, t: 'محصولات دیجیتال', s: 'فعال‌سازی کد، ریجن و محدودیت‌ها', link: '/category/digital' },
  { icon: Truck, t: 'ارسال و تحویل', s: 'زمان‌بندی، تیپاکس و تحویل حضوری' },
  { icon: RotateCcw, t: 'بازگشت و گارانتی', s: 'شرایط بازگشت و خدمات گارانتی' },
  { icon: Headset, t: 'مشاوره خرید', s: 'انتخاب کنسول، قطعات یا ستاپ' }
]

export default function Support() {
  const { addTicket, user, toast } = useStore()
  const [open, setOpen] = useState(0)
  const [f, setF] = useState({ subject: '', body: '', email: user?.email || '' })

  const submit = (e) => {
    e.preventDefault()
    if (!f.subject || f.body.trim().length < 10) { toast('موضوع و متن پیام را کامل کنید', 'err'); return }
    addTicket({ ...f, email: f.email || user?.email || 'مهمان' })
    toast('تیکت شما ثبت شد؛ در حساب کاربری پیگیری کنید')
    setF({ subject: '', body: '', email: f.email })
  }

  return (
    <main className="container-x py-6 md:py-10">
      <div className="dotgrid rounded-3xl border border-line bg-panel px-6 py-10 text-center md:py-14">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15"><Headset size={26} className="text-brand" /></span>
        <h1 className="mt-4 text-2xl font-extrabold md:text-3xl">مرکز پشتیبانی آورورا</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-sub">هر روز هفته از ۱۰ صبح تا ۱۰ شب پاسخگو هستیم. سوال سفارش، کد دیجیتال یا مشاوره خرید — همینجا بپرسید.</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((tp) => {
          const inner = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-elev"><tp.icon size={20} className="text-brand-2" /></span>
              <span className="mr-3">
                <b className="block text-sm font-extrabold text-ink">{tp.t}</b>
                <span className="mt-0.5 block text-xs text-mute">{tp.s}</span>
              </span>
            </>
          )
          return tp.link
            ? <Link key={tp.t} to={tp.link} className="flex items-center rounded-2xl border border-line bg-card p-4 transition hover:border-brand/40">{inner}</Link>
            : <a key={tp.t} href="#ticket" className="flex items-center rounded-2xl border border-line bg-card p-4 transition hover:border-brand/40">{inner}</a>
        })}
      </div>

      <div id="faq" className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* سوالات متداول */}
        <section>
          <h2 className="mb-4 text-lg font-extrabold">سوالات متداول</h2>
          <div className="space-y-2">
            {FAQS.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-line bg-card">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 p-4 text-right" aria-expanded={open === i}>
                  <span className="text-sm font-bold text-ink">{item.q}</span>
                  <ChevronDown size={16} className={`shrink-0 text-mute transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && <p className="border-t border-line-soft px-4 py-3 text-sm leading-7 text-sub fade-in">{item.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* تماس و تیکت */}
        <section id="ticket">
          <h2 className="mb-4 text-lg font-extrabold">ثبت تیکت</h2>
          <div className="rounded-2xl border border-line bg-card p-5">
            <form onSubmit={submit} className="space-y-3.5">
              <div>
                <label className="field-label" htmlFor="ts">موضوع *</label>
                <input id="ts" className="field-input" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} placeholder="مثلاً: مشکل فعال‌سازی کد" />
              </div>
              {!user && (
                <div>
                  <label className="field-label" htmlFor="te">ایمیل *</label>
                  <input id="te" dir="ltr" type="email" className="field-input text-left" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" />
                </div>
              )}
              <div>
                <label className="field-label" htmlFor="tb">متن پیام *</label>
                <textarea id="tb" rows={4} className="field-input" value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} placeholder="جزئیات را بنویسید؛ اگر مربوط به سفارش است شماره سفارش را ذکر کنید." />
              </div>
              <button className="btn btn-primary h-11 w-full text-sm"><Send size={15} /> ارسال تیکت</button>
            </form>

            <div className="mt-5 grid grid-cols-1 gap-2 border-t border-line pt-4 text-xs text-mute sm:grid-cols-3">
              <span className="flex items-center gap-2"><Phone size={13} /> ۰۲۱-۹۱۰۰۹۹۰۰</span>
              <span className="flex items-center gap-2"><Clock size={13} /> هر روز ۱۰ تا ۲۲</span>
              <span className="flex items-center gap-2"><Mail size={13} /> support@aurora.gg</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
