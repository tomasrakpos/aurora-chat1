import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Sparkles, Gamepad2, Zap, Flame, Truck, ShieldCheck, Headset, CreditCard,
  Mouse, Monitor
} from 'lucide-react'
import { PRODUCTS, HERO_SLIDES, CATEGORIES, BRANDS, NEWS } from '../data/index.js'
import { CAT_ICON } from '../components/layout.jsx'
import { HeroSlider, ProductCarousel } from '../components/carousels.jsx'
import { GiftArt } from '../components/media.jsx'
import { SectionHeader, Badge, Countdown } from '../components/ui.jsx'
import { useStore } from '../lib/store.jsx'
import { faDate } from '../lib/format.js'

/* ---------------- نوار خدمات (الگوی سرویس‌های دیجی‌کالا) ---------------- */
const USP = [
  { icon: Truck, title: 'ارسال سریع', sub: 'تحویل اکسپرس سفارش‌ها' },
  { icon: ShieldCheck, title: 'ضمانت اصالت کالا', sub: 'اورجینال با گارانتی معتبر' },
  { icon: Zap, title: 'تحویل آنی دیجیتال', sub: 'کد بلافاصله پس از پرداخت' },
  { icon: Headset, title: 'پشتیبانی ۷ روز هفته', sub: 'پاسخ‌گویی هر روز' },
  { icon: CreditCard, title: 'پرداخت امن', sub: 'درگاه مطمئن بانکی' }
]

export default function Home() {
  const { recent } = useStore()

  const endOfDay = useMemo(() => {
    const d = new Date()
    d.setHours(23, 59, 59, 999)
    return d.getTime()
  }, [])

  const d = useMemo(() => {
    const priced = PRODUCTS.filter((p) => p.price && !p.price.inquiry)
    const score = (p) => {
      let s = p.sold || 0
      if ((p.badges || []).some((b) => ['hot', 'best', 'limited'].includes(b))) s += 5000
      if (p.stock === 'in' || p.stock === 'low' || p.stock === undefined) s += 800
      return s
    }
    return {
      deals: priced
        .filter((p) => p.stock !== 'out' && p.stock !== 'soon')
        .sort((a, b) => score(b) - score(a))
        .slice(0, 10),
      newArrivals: [...PRODUCTS].sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || '')).slice(0, 12),
      bestSellers: [...priced].sort((a, b) => b.sold - a.sold).slice(0, 12),
      trendingGames: PRODUCTS.filter((p) => p.cat === 'games').sort((a, b) => b.sold - a.sold).slice(0, 10),
      consoles: PRODUCTS.filter((p) => p.cat === 'consoles' && p.price && !p.price.inquiry).slice(0, 10),
      monitorsPc: PRODUCTS.filter((p) => ['monitors', 'systems', 'pc-parts'].includes(p.cat) && p.sub !== 'cpu' && p.sub !== 'ram').sort((a, b) => b.sold - a.sold).slice(0, 10),
      peripherals: PRODUCTS.filter((p) => p.cat === 'peripherals').sort((a, b) => b.sold - a.sold).slice(0, 10),
      digital: PRODUCTS.filter((p) => p.cat === 'digital').slice(0, 8),
      preorders: PRODUCTS.filter((p) => p.stock === 'preorder'),
      recentViewed: recent.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)
    }
  }, [recent])

  return (
    <main className="container-x space-y-10 py-4 md:space-y-16 md:py-6">
      {/* اسلایدر اصلی */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* دایره‌های دسته‌بندی */}
      <section aria-label="دسته‌بندی‌ها">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-11 md:gap-2">
          {CATEGORIES.map((c) => {
            const Icon = CAT_ICON[c.icon] || Gamepad2
            return (
              <Link key={c.id} to={`/category/${c.id}`} className="group flex min-w-[76px] flex-col items-center gap-2 md:min-w-0">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line-soft bg-card text-brand-2 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:bg-elev md:h-16 md:w-16">
                  <Icon size={22} />
                </span>
                <span className="text-center text-[10px] font-semibold leading-4 text-sub transition group-hover:text-ink md:text-[11px]">{c.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* نوار خدمات */}
      <section aria-label="خدمات فروشگاه" className="rounded-2xl border border-line-soft bg-panel/60 px-4 py-4 md:px-6">
        <div className="no-scrollbar flex gap-6 overflow-x-auto md:grid md:grid-cols-5 md:gap-0">
          {USP.map((u, i) => (
            <div key={u.title} className="flex min-w-[170px] items-center gap-3 md:justify-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-2">
                <u.icon size={19} />
              </span>
              <div className={i > 0 ? 'md:border-r md:border-line-soft md:pr-6' : ''}>
                <p className="text-xs font-bold text-ink">{u.title}</p>
                <p className="mt-0.5 text-[10px] text-mute">{u.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* پیشنهاد امروز */}
      <section id="deals" aria-label="پیشنهاد امروز" className="scroll-mt-36 overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-l from-brand/20 via-panel to-panel">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-0 md:p-5">
          <div className="flex shrink-0 flex-row items-center gap-3 border-b border-line-soft pb-4 md:w-52 md:flex-col md:justify-center md:gap-2.5 md:border-b-0 md:border-l md:pb-0 md:pl-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warn/15 text-warn md:h-14 md:w-14">
              <Zap size={26} />
            </span>
            <div className="flex-1 md:flex-none md:text-center">
              <h2 className="text-base font-extrabold text-ink md:text-lg">پیشنهاد امروز</h2>
              <p className="mt-0.5 hidden text-[11px] leading-5 text-sub md:block">هر روز چند انتخاب ویژه از انبار آورورا</p>
            </div>
            <div className="hidden flex-col items-center gap-1 md:flex">
              <Countdown target={endOfDay} className="rounded-lg bg-deep/70 px-3 py-1.5 text-sm tracking-widest text-warn" />
              <span className="text-[10px] text-mute">تا پایان امروز</span>
            </div>
            <Link to="/products?sort=popular" className="hidden items-center gap-1 text-xs font-bold text-brand-2 transition hover:opacity-75 md:flex">
              مشاهده همه <ArrowLeft size={13} />
            </Link>
          </div>
          <div className="min-w-0 flex-1 md:pr-5">
            <ProductCarousel products={d.deals} id="daily-deals" />
          </div>
        </div>
      </section>

      {/* بنرهای دوقلو */}
      <section className="grid gap-3 md:grid-cols-2 md:gap-4" aria-label="بنرهای ویژه">
        <Link to="/category/games?sub=preorder" className="group relative block h-44 overflow-hidden rounded-2xl border border-line md:h-56">
          <img src="/img/hero/hero-gta6.jpg" alt="پیش‌خرید بازی‌های بزرگ" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <div>
              <Badge type="preorder" />
              <h3 className="mt-2 text-lg font-extrabold text-white md:text-xl">پیش‌خرید بازی‌های بزرگ</h3>
              <p className="mt-1 text-xs text-white/75">GTA VI و عنوان‌های در راه را زودتر رزرو کنید</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-brand">
              <ArrowLeft size={16} />
            </span>
          </div>
        </Link>
        <Link to="/category/digital" className="group relative block h-44 overflow-hidden rounded-2xl border border-line md:h-56">
          <img src="/img/hero/hero-fc27.jpg" alt="استور دیجیتال" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
            <div>
              <Badge type="digital" />
              <h3 className="mt-2 text-lg font-extrabold text-white md:text-xl">استور دیجیتال</h3>
              <p className="mt-1 text-xs text-white/75">گیفت‌کارت و اشتراک قانونی با تحویل آنی</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-brand">
              <ArrowLeft size={16} />
            </span>
          </div>
        </Link>
      </section>

      {/* جدیدترین‌ها */}
      <section>
        <SectionHeader title="جدیدترین کالاها" sub="تازه‌های انبار آورورا" link="/products?sort=new" icon={Sparkles} />
        <ProductCarousel products={d.newArrivals} id="new-arrivals" />
      </section>

      {/* پرفروش‌ها */}
      <section>
        <SectionHeader title="پرفروش‌ترین‌ها" sub="انتخاب خود گیمرها" link="/products?sort=popular" icon={Flame} />
        <ProductCarousel products={d.bestSellers} id="best-sellers" />
      </section>

      {/* بازی‌های داغ */}
      <section>
        <SectionHeader title="بازی‌های داغ" sub="از پیش‌خریدهای بزرگ تا عنوان‌های عرضه‌شده" link="/category/games" icon={Gamepad2} />
        <ProductCarousel products={d.trendingGames} id="trending-games" />
      </section>

      {/* کنسول‌ها */}
      <section>
        <SectionHeader title="کنسول‌ها" sub="پلی‌استیشن، ایکس‌باکس، نینتندو و دستی‌ها" link="/category/consoles" icon={Gamepad2} />
        <ProductCarousel products={d.consoles} id="consoles" />
      </section>

      {/* استور دیجیتال */}
      <section>
        <SectionHeader title="گیفت‌کارت و اشتراک" sub="تحویل آنی پس از پرداخت" link="/category/digital" icon={Zap} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {d.digital.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group relative overflow-hidden rounded-2xl border border-line-soft bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40">
              <div className="h-32 md:h-36"><GiftArt gift={p.gift} /></div>
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="line-clamp-1 text-xs font-bold text-ink">{p.name.split('—')[0]}</span>
                <span className="shrink-0 rounded-md bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">تحویل آنی</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* مانیتور و سخت‌افزار */}
      <section>
        <SectionHeader title="مانیتور و سخت‌افزار" sub="از پنل‌های اولد تا کارت‌های گرافیک" link="/category/monitors" icon={Monitor} />
        <ProductCarousel products={d.monitorsPc} id="monitors-pc" />
      </section>

      {/* تجهیزات جانبی */}
      <section>
        <SectionHeader title="تجهیزات جانبی" sub="دسته، هدست، کیبورد و ماوس" link="/category/peripherals" icon={Mouse} />
        <ProductCarousel products={d.peripherals} id="peripherals" />
      </section>

      {/* بازدید اخیر */}
      {d.recentViewed.length > 0 && (
        <section>
          <SectionHeader title="بازدید‌های اخیر شما" link="/account" linkText="حساب کاربری" />
          <ProductCarousel products={d.recentViewed} id="recent" />
        </section>
      )}

      {/* برندها */}
      <section>
        <SectionHeader title="خرید بر اساس برند" sub="برندهای محبوب دنیای گیمینگ" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {BRANDS.slice(0, 21).map((b) => (
            <Link key={b} to={`/search?q=${encodeURIComponent(b)}`} className="flex h-14 items-center justify-center rounded-xl border border-line-soft bg-card px-2 text-center transition hover:border-brand/40 hover:bg-elev">
              <span dir="ltr" className="text-xs font-bold tracking-wide text-sub">{b}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* اخبار */}
      <section>
        <SectionHeader title="اخبار گیمینگ" sub="گزیده‌ی خبرهای واقعی با ذکر منبع" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {NEWS.map((n) => (
            <article key={n.id} className="flex flex-col rounded-2xl border border-line-soft bg-card p-4 transition hover:border-brand/40">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-md bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-bold text-violet-300">{n.tag}</span>
                <span className="text-[10px] text-mute">{faDate(n.date)}</span>
              </div>
              <h3 className="text-sm font-extrabold leading-6 text-ink">{n.title}</h3>
              <p className="mt-2 line-clamp-3 text-xs leading-6 text-sub">{n.text}</p>
              <span className="mt-3 text-[10px] text-mute">منبع: <bdi className="font-semibold">{n.source}</bdi></span>
            </article>
          ))}
        </div>
      </section>

      {/* خبرنامه پایین صفحه */}
      <section className="dotgrid overflow-hidden rounded-3xl border border-line bg-panel px-6 py-10 text-center">
        <Sparkles className="mx-auto mb-3 text-brand" size={26} />
        <h2 className="text-xl font-extrabold md:text-2xl">اولین نفری باش که باخبر می‌شود</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-sub">تخفیف‌های محدود، موجودی کنسول‌ها و عرضه‌های مهم را در خبرنامه‌ی آورورا اطلاع‌رسانی می‌کنیم.</p>
        <Link to="/support" className="btn btn-primary mx-auto mt-5 h-11 px-8 text-sm">عضویت از طریق پشتیبانی <ArrowLeft size={16} /></Link>
      </section>
    </main>
  )
}
