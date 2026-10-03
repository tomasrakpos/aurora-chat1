import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Heart, ArrowLeft, KeyRound, Truck } from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { cartDetails, FREE_SHIPPING_THRESHOLD } from '../data/index.js'
import { ProductVisual } from '../components/media.jsx'
import { QtyPicker, EmptyCart, Badge, StockLabel } from '../components/ui.jsx'
import { faNum } from '../lib/format.js'

export default function CartPage() {
  const { cart, setQty, removeFromCart, toggleWishlist, wishlist, overrides } = useStore()
  const d = cartDetails(cart, overrides)

  if (d.items.length === 0) {
    return (
      <main className="container-x py-10">
        <EmptyCart action={<Link to="/products" className="btn btn-primary h-11 px-6 text-sm">مشاهده محصولات</Link>} />
      </main>
    )
  }

  return (
    <main className="container-x py-6 md:py-8">
      <h1 className="mb-6 text-xl font-extrabold md:text-2xl">سبد خرید <bdi className="mr-1 text-sm font-medium text-mute tnum">({faNum(d.items.length)} کالا)</bdi></h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {d.items.map((p) => (
            <div key={p.id} className="flex gap-3.5 rounded-2xl border border-line bg-card p-3.5 md:gap-5 md:p-4">
              <Link to={`/product/${p.id}`} className="block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eef1f6] md:h-28 md:w-28">
                <ProductVisual product={p} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/product/${p.id}`} className="line-clamp-2 text-[13px] font-bold leading-6 text-ink hover:text-brand-2">{p.name}</Link>
                    <p className="mt-0.5 text-[11px] text-mute">{p.brand}{p.region ? ` — ریجن ${p.region}` : ''}</p>
                    {p.type === 'digital' && <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-sky-300"><KeyRound size={11} /> تحویل آنی کد دیجیتال</span>}
                  </div>
                  <button onClick={() => removeFromCart(p.id)} aria-label="حذف از سبد" className="btn btn-danger-soft h-8 w-8 shrink-0 p-0"><Trash2 size={14} /></button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center gap-2">
                    <QtyPicker small value={p.qty} onChange={(q) => setQty(p.id, q)} />
                    <button
                      onClick={() => { if (!wishlist.includes(p.id)) toggleWishlist(p.id); removeFromCart(p.id) }}
                      className="flex items-center gap-1 text-[11px] text-mute transition hover:text-hot" aria-label="انتقال به علاقه‌مندی‌ها">
                      <Heart size={12} /> ذخیره برای بعد
                    </button>
                  </div>
                  <div className="text-left">
                    {p.price.old > p.price.final && <bdi className="block text-[11px] text-mute line-through tnum">{faNum(p.price.old)}</bdi>}
                    <bdi className="text-sm font-extrabold text-ink tnum">{faNum((p.price.final || 0) * p.qty)}</bdi>
                    <span className="mr-1 text-[11px] text-mute">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* خلاصه */}
        <aside className="h-fit lg:sticky lg:top-36">
          <div className="rounded-2xl border border-line bg-card p-5">
            <h2 className="mb-4 text-base font-extrabold">خلاصه سفارش</h2>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between text-sub"><dt>جمع کالاها</dt><dd className="tnum">{faNum(d.subtotal)} تومان</dd></div>
              {d.discount > 0 && <div className="flex justify-between text-hot"><dt>تخفیف</dt><dd className="tnum">{faNum(d.discount)}− تومان</dd></div>}
              <div className="flex justify-between text-sub">
                <dt className="flex items-center gap-1.5"><Truck size={14} /> هزینه ارسال</dt>
                <dd>{d.hasPhysical ? (d.shipping === 0 ? <span className="font-bold text-ok">رایگان</span> : <span className="tnum">{faNum(d.shipping)} تومان</span>) : <span className="text-sky-300">دیجیتال — بدون ارسال</span>}</dd>
              </div>
              {d.hasPhysical && d.shipping > 0 && (
                <p className="rounded-lg bg-panel px-3 py-2 text-[11px] leading-5 text-mute">با خرید بالای {faNum(FREE_SHIPPING_THRESHOLD / 1000000)} میلیون تومان، ارسال رایگان می‌شود.</p>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base font-extrabold text-ink"><dt>مبلغ قابل پرداخت</dt><dd className="tnum">{faNum(d.total)} تومان</dd></div>
            </dl>
            <Link to="/checkout" className="btn btn-primary mt-5 h-12 w-full text-sm">ادامه فرآیند خرید <ArrowLeft size={16} /></Link>
            <p className="mt-3 text-center text-[11px] text-mute">پرداخت امن با درگاه بانکی — قابل بازگشت طبق شرایط</p>
          </div>
        </aside>
      </div>

      {/* نوار چسبان موبایل */}
      <div className="fixed inset-x-0 bottom-[84px] z-30 md:hidden">
        <div className="container-x">
          <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <div>
              <p className="text-[10px] text-mute">مبلغ قابل پرداخت</p>
              <bdi className="text-sm font-extrabold tnum">{faNum(d.total)} تومان</bdi>
            </div>
            <Link to="/checkout" className="btn btn-primary h-10 px-6 text-xs">ادامه خرید</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
