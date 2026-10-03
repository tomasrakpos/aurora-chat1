import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ChevronLeft, Heart, ShoppingCart, Zap, ShieldCheck, Truck, KeyRound, Info,
  ThumbsUp, BadgeCheck, ChevronDown, PhoneCall, PackagePlus
} from 'lucide-react'
import { productById, relatedProducts, frequentlyBought, SEED_REVIEWS, effective, catById } from '../data/index.js'
import ProductCard from '../components/ProductCard.jsx'
import { ProductVisual } from '../components/media.jsx'
import { Badge, Rating, StockLabel, SectionHeader, EmptyState, PageSkeleton } from '../components/ui.jsx'
import { useStore } from '../lib/store.jsx'
import { faNum, faDate, faRelative } from '../lib/format.js'
import { useSimLoad } from '../lib/hooks.js'

export default function ProductDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { overrides, addToCart, toggleWishlist, wishlist, viewProduct, userReviews, addReview, user, toast, orders } = useStore()
  const p = productById(id) ? effective(productById(id), overrides) : null
  const loading = useSimLoad([id], 300)
  const [tab, setTab] = useState('overview')
  const [reviewText, setReviewText] = useState('')
  const [reviewStars, setReviewStars] = useState(5)

  useEffect(() => { if (p) viewProduct(p.id) }, [id])
  useEffect(() => { setTab('overview'); window.scrollTo({ top: 0 }) }, [id])

  if (loading) return <PageSkeleton />

  if (!p) {
    return (
      <main className="container-x py-16">
        <EmptyState
          title="محصول پیدا نشد"
          desc="این کالا حذف شده یا نشانی اشتباه است. از دسته‌بندی‌ها یا جستجو استفاده کنید."
          action={<div className="flex gap-2"><Link to="/products" className="btn btn-primary h-10 px-5 text-sm">همه‌ی محصولات</Link><Link to="/" className="btn btn-ghost h-10 px-5 text-sm">صفحه اصلی</Link></div>}
        />
      </main>
    )
  }

  const inWish = wishlist.includes(p.id)
  const seedReviews = SEED_REVIEWS[p.id] || []
  const userRs = userReviews.filter((r) => r.productId === p.id)
  const allReviews = [...userRs, ...seedReviews]
  const dist = [5, 4, 3, 2, 1].map((s) => ({ s, n: allReviews.filter((r) => r.rating === s).length }))
  const maxDist = Math.max(1, ...dist.map((d) => d.n))
  const verifiedIds = new Set(orders.flatMap((o) => o.items?.map((i) => i.id) || []))
  const rel = relatedProducts(p, 8)
  const fbt = frequentlyBought(p)

  const TABS = [
    { id: 'overview', label: 'نمای کلی' },
    { id: 'specs', label: 'مشخصات' },
    ...(p.delivery ? [{ id: 'delivery', label: 'تحویل دیجیتال' }] : []),
    { id: 'reviews', label: `نظرات (${faNum(allReviews.length)})` },
    { id: 'qa', label: 'پرسش و پاسخ' }
  ]

  const submitReview = (e) => {
    e.preventDefault()
    if (!user) { toast('برای ثبت نظر ابتدا وارد شوید', 'err'); nav('/login'); return }
    if (reviewText.trim().length < 10) { toast('متن نظر باید حداقل ۱۰ حرف باشد', 'err'); return }
    addReview({ productId: p.id, user: `${user.firstName} ${user.lastName?.[0] || ''}.`, rating: reviewStars, text: reviewText.trim(), verified: verifiedIds.has(p.id) })
    setReviewText('')
    toast('نظر شما ثبت شد')
  }

  return (
    <main className="container-x py-6 md:py-8">
      {/* سرنخ */}
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-mute" aria-label="مسیر">
        <Link to="/" className="hover:text-ink">خانه</Link>
        <ChevronLeft size={12} />
        <Link to={`/category/${p.cat}`} className="hover:text-ink">{catById(p.cat)?.name || p.cat}</Link>
        {p.sub && (<><ChevronLeft size={12} /><span>{catById(p.cat)?.subs.find((s) => s.id === p.sub)?.name || p.sub}</span></>)}
        <ChevronLeft size={12} />
        <span className="line-clamp-1 text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        {/* گالری */}
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-[#eef1f6]">
            <div className="aspect-square">
              <ProductVisual product={p} eager />
            </div>
            <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
              {p.badges?.map((b) => <Badge key={b} type={b} />)}
              {p.stock === 'out' && <Badge type="out" />}
            </div>
          </div>

          {/* اعتماد */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card p-3 text-center">
              <ShieldCheck size={18} className="text-ok" />
              <span className="text-[11px] leading-5 text-sub">{p.warranty || 'ضمانت اصالت کالا'}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card p-3 text-center">
              {p.type === 'digital' ? <KeyRound size={18} className="text-sky-400" /> : <Truck size={18} className="text-brand-2" />}
              <span className="text-[11px] leading-5 text-sub">{p.type === 'digital' ? 'تحویل آنی کد پس از پرداخت' : 'ارسال به سراسر کشور'}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card p-3 text-center">
              <Info size={18} className="text-warn" />
              <span className="text-[11px] leading-5 text-sub">قیمت با ذکر منبع و تاریخ بررسی</span>
            </div>
          </div>
        </div>

        {/* اطلاعات خرید */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <span dir="ltr" className="text-[11px] font-bold uppercase tracking-wider text-mute">{p.brand}</span>
          <h1 className="mt-1.5 text-xl font-extrabold leading-8 md:text-2xl md:leading-9">{p.name}</h1>
          <div dir="ltr" className="mt-1 text-left text-[11px] text-mute ltr">{p.nameEn}</div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Rating value={p.rating?.avg} count={p.rating?.count} />
            <StockLabel stock={p.stock} qty={p.qty} />
          </div>

          <p className="mt-3 text-sm leading-7 text-sub">{p.short}</p>

          {/* جعبه قیمت */}
          <div className="mt-5 rounded-2xl border border-line bg-card p-4">
            {p.price?.inquiry ? (
              <div>
                <span className="text-lg font-extrabold text-warn">استعلام قیمت</span>
                <p className="mt-2 text-xs leading-6 text-mute">
                  قیمت روز این کالا هنوز از منبع معتبر تأیید نشده است؛ طبق سیاست آورورا قیمت را حدس نمی‌زنیم. برای قیمت لحظه‌ای با پشتیبانی تماس بگیرید.
                </p>
                <div className="mt-3 flex gap-2">
                  <Link to="/support" className="btn btn-primary h-11 flex-1 text-sm"><PhoneCall size={16} /> استعلام قیمت</Link>
                  <button onClick={() => { toggleWishlist(p.id); toast(inWish ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد') }}
                    className={`btn h-11 w-11 p-0 ${inWish ? 'btn-danger-soft' : 'btn-ghost'}`} aria-label="افزودن به علاقه‌مندی‌ها">
                    <Heart size={18} fill={inWish ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <div>
                    {p.price.old > p.price.final && <bdi className="block text-sm text-mute line-through tnum">{faNum(p.price.old)} تومان</bdi>}
                    <span className="flex items-baseline gap-2">
                      <bdi className="text-2xl font-extrabold text-ink tnum md:text-3xl">{faNum(p.price.final)}</bdi>
                      <span className="text-sm text-mute">تومان</span>
                    </span>
                  </div>
                  {p.price.old > p.price.final && <Badge type="sale">{`${Math.round((1 - p.price.final / p.price.old) * 100)}٪ تخفیف`}</Badge>}
                </div>

                {/* شفافیت قیمت */}
                <div className="mt-3 rounded-xl bg-panel p-3 text-[11px] leading-5 text-mute">
                  <p>منبع قیمت: <bdi className="font-bold text-sub">{p.price.source}</bdi></p>
                  <p>آخرین بررسی: {faRelative(p.price.lastChecked)}</p>
                  {p.price.sourcePrice && (
                    <p>
                      قیمت مبدأ: <bdi className="font-bold text-sub tnum">{p.price.sourcePrice} {p.price.sourceCurrency}</bdi>
                      {' '}با نرخ تبدیل <bdi className="tnum">{faNum(p.price.exchangeRate)}</bdi> تومان
                    </p>
                  )}
                  {p.price.note && <p className="mt-1 text-warn">{p.price.note}</p>}
                </div>

                <div className="mt-4 space-y-2">
                  {p.stock === 'soon' ? (
                    <span className="btn btn-soft h-12 w-full cursor-not-allowed text-sm opacity-70">به‌زودی موجود می‌شود</span>
                  ) : p.stock === 'custom' ? (
                    <Link to="/support" className="btn btn-primary h-12 w-full text-sm"><PhoneCall size={16} /> مشاوره و سفارش کانفیگ</Link>
                  ) : (
                    <>
                      <button onClick={() => { addToCart(p.id); toast('به سبد خرید اضافه شد') }} className="btn btn-primary h-12 w-full text-sm">
                        <ShoppingCart size={17} /> افزودن به سبد خرید
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => { addToCart(p.id); nav('/checkout') }} className="btn btn-soft h-11 flex-1 text-sm"><Zap size={15} /> خرید فوری</button>
                        <button onClick={() => { toggleWishlist(p.id); toast(inWish ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد') }}
                          className={`btn h-11 flex-1 text-sm ${inWish ? 'btn-danger-soft' : 'btn-ghost'}`}>
                          <Heart size={15} fill={inWish ? 'currentColor' : 'none'} /> {inWish ? 'در علاقه‌مندی‌ها' : 'علاقه‌مندی‌ها'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* خرید با هم */}
          {fbt.length > 0 && (
            <div className="mt-4 rounded-2xl border border-line bg-card p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-extrabold"><PackagePlus size={16} className="text-brand" /> اغلب با هم خریداری می‌شوند</p>
              <div className="space-y-2">
                {fbt.slice(0, 3).map((f) => (
                  <Link key={f.id} to={`/product/${f.id}`} className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-white/5">
                    <span className="h-10 w-10 overflow-hidden rounded-lg bg-[#eef1f6]"><ProductVisual product={f} /></span>
                    <span className="line-clamp-1 flex-1 text-xs text-sub">{f.name}</span>
                    <span className="text-[11px] font-bold text-ink tnum">{f.price?.final ? `${faNum(f.price.final)}` : 'استعلام'}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* تب‌ها */}
      <div className="mt-10">
        <div className="flex gap-1 overflow-x-auto border-b border-line no-scrollbar" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${tab === t.id ? 'border-brand text-ink' : 'border-transparent text-mute hover:text-sub'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === 'overview' && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-3 text-base font-extrabold">درباره این محصول</h2>
                <p className="text-sm leading-8 text-sub">{p.desc}</p>
                {p.features?.length > 0 && (
                  <>
                    <h3 className="mb-2 mt-6 text-sm font-extrabold">ویژگی‌های کلیدی</h3>
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-sub"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              {p.inBox?.length > 0 && (
                <div className="h-fit rounded-2xl border border-line bg-card p-5">
                  <h3 className="mb-3 text-sm font-extrabold">محتویات جعبه</h3>
                  <ul className="space-y-2">
                    {p.inBox.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-sub"><BadgeCheck size={15} className="shrink-0 text-ok" />{f}</li>
                    ))}
                  </ul>
                  {p.region && <p className="mt-4 border-t border-line pt-3 text-xs text-mute">ریجن: <b className="text-sub">{p.region}</b></p>}
                </div>
              )}
            </div>
          )}

          {tab === 'specs' && (
            <div className="grid gap-4 md:grid-cols-2">
              {(Array.isArray(p.specs?.[0]) ? p.specs[0] : p.specs || []).map((g) => (
                <div key={g.title} className="overflow-hidden rounded-2xl border border-line bg-card">
                  <p className="border-b border-line bg-panel px-4 py-2.5 text-sm font-extrabold">{g.title}</p>
                  <table className="w-full text-sm">
                    <tbody>
                      {g.items.map(([k, v]) => (
                        <tr key={k} className="border-b border-line-soft last:border-0">
                          <td className="w-2/5 px-4 py-2.5 text-xs text-mute">{k}</td>
                          <td className="px-4 py-2.5 text-[13px] font-semibold text-ink">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {tab === 'delivery' && p.delivery && (
            <div className="max-w-2xl rounded-2xl border border-line bg-card p-6">
              <h2 className="mb-4 text-base font-extrabold">جزئیات تحویل دیجیتال</h2>
              <dl className="space-y-3 text-sm">
                {[
                  ['روش تحویل', p.delivery.method],
                  ['زمان تحویل', p.delivery.time],
                  ['راهنمای فعال‌سازی', p.delivery.instructions],
                  ['اعتبار', p.delivery.validity],
                  ['محدودیت‌ها', p.delivery.restrictions]
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                    <dt className="w-32 shrink-0 text-xs font-bold text-mute">{k}</dt>
                    <dd className="text-[13px] leading-6 text-sub">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
              <div className="h-fit rounded-2xl border border-line bg-card p-5">
                <div className="flex items-center gap-3">
                  <bdi className="text-4xl font-extrabold tnum">{faNum(p.rating?.avg || 0)}</bdi>
                  <div>
                    <Rating value={p.rating?.avg || 0} showCount={false} />
                    <p className="mt-1 text-[11px] text-mute"><bdi className="tnum">{faNum(p.rating?.count || 0)}</bdi> امتیاز ثبت‌شده</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {dist.map(({ s, n }) => (
                    <div key={s} className="flex items-center gap-2 text-[11px] text-mute">
                      <span className="w-3 tnum">{faNum(s)}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elev">
                        <div className="h-full rounded-full bg-warn" style={{ width: `${(n / maxDist) * 100}%` }} />
                      </div>
                      <bdi className="w-6 text-left tnum">{faNum(n)}</bdi>
                    </div>
                  ))}
                </div>
                {allReviews.length === 0 && <p className="mt-4 text-xs leading-6 text-mute">هنوز نظری برای این محصول ثبت نشده است. اولین نفر باشید.</p>}
              </div>

              <div>
                <div className="space-y-3">
                  {allReviews.map((r) => (
                    <article key={r.id} className="rounded-2xl border border-line bg-card p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <b className="text-sm text-ink">{r.user}</b>
                        {r.verified && <span className="flex items-center gap-1 rounded-md bg-ok/10 px-1.5 py-0.5 text-[10px] font-bold text-ok"><BadgeCheck size={11} /> خرید تأییدشده</span>}
                        <span className="mr-auto text-[11px] text-mute">{faDate(r.date || r.createdAt)}</span>
                      </div>
                      <div className="mt-1.5"><Rating value={r.rating} showCount={false} size={12} /></div>
                      <p className="mt-2 text-sm leading-7 text-sub">{r.text}</p>
                      <button className="mt-2 flex items-center gap-1.5 text-[11px] text-mute transition hover:text-ink">
                        <ThumbsUp size={12} /> مفید بود ({faNum(r.helpful || 0)})
                      </button>
                    </article>
                  ))}
                </div>

                <form onSubmit={submitReview} className="mt-5 rounded-2xl border border-line bg-card p-5">
                  <h3 className="mb-3 text-sm font-extrabold">نظر خود را بنویسید</h3>
                  <div className="mb-3 flex items-center gap-1" role="radiogroup" aria-label="امتیاز">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" role="radio" aria-checked={reviewStars === s} onClick={() => setReviewStars(s)}
                        className={`text-xl transition ${s <= reviewStars ? 'text-warn' : 'text-faint'}`}>★</button>
                    ))}
                  </div>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={3}
                    placeholder="تجربه‌ی خود را کوتاه و صادقانه بنویسید…" className="field-input text-sm" />
                  <button className="btn btn-primary mt-3 h-10 px-6 text-xs">ثبت نظر</button>
                </form>
              </div>
            </div>
          )}

          {tab === 'qa' && (
            <div className="max-w-2xl">
              <p className="rounded-2xl border border-line bg-card p-5 text-sm leading-7 text-sub">
                پرسش و پاسخ این محصول به‌زودی فعال می‌شود. تا آن زمان اگر سوالی دارید، از <Link to="/support" className="font-bold text-brand-2">مرکز پشتیبانی</Link> بپرسید؛ معمولاً در کمتر از چند ساعت پاسخ می‌دهیم.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* مرتبط */}
      {rel.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="محصولات مرتبط" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {rel.slice(0, 4).map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </main>
  )
}
