import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, Sparkles, Gift, Newspaper, Monitor, Mouse, Gamepad2, Zap } from 'lucide-react'
import { PRODUCTS, HERO_SLIDES, CATEGORIES, CATEGORY_TILES, BRANDS, NEWS } from '../data/index.js'
import { CAT_ICON } from '../components/layout.jsx'
import { HeroSlider, ProductCarousel } from '../components/carousels.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { ProductVisual, GameCover, GiftArt } from '../components/media.jsx'
import { SectionHeader, Badge } from '../components/ui.jsx'
import { useStore } from '../lib/store.jsx'
import { faDate } from '../lib/format.js'

export default function Home() {
  const { recent } = useStore()

  const d = useMemo(() => {
    const priced = PRODUCTS.filter((p) => p.price && !p.price.inquiry)
    return {
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
    <main className="container-x space-y-14 py-5 md:space-y-20 md:py-7">
      {/* اسلایدر اصلی */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* دسته‌بندی‌ها */}
      <section aria-label="دسته‌بندی‌ها">
        <SectionHeader title="دسته‌بندی‌ها" sub="آنچه برای یک ستاپ کامل نیاز دارید" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {CATEGORIES.map((c, i) => {
            const tile = CATEGORY_TILES.find((t) => t.id === c.id)
            const Icon = CAT_ICON[c.icon] || Gamepad2
            return (
              <Link key={c.id} to={`/category/${c.id}`}
                className="group relative overflow-hidden rounded-2xl border border-line-soft bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-pop"
                style={{ animationDelay: `${i * 40}ms` }}>
                <div className="relative h-28 overflow-hidden md:h-32">
                  {tile?.img ? (
                    <img src={tile.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : c.id === 'games' ? (
                    <GameCover cover={{ bg: 'vice', title: 'GAMES', sub: 'بازی' }} />
                  ) : (
                    <GiftArt gift={{ brand: 'Gift Cards', value: 'DIGITAL', colors: ['#8b5cf6', '#22d3ee'] }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-white">{c.name}</span>
                    <Icon size={15} className="text-white/80" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* جدیدترین‌ها */}
      <section>
        <SectionHeader title="جدیدترین کالاها" sub="تازه‌های انبار آورورا" link="/products?sort=new" />
        <ProductCarousel products={d.newArrivals} id="new-arrivals" />
      </section>

      {/* پرفروش‌ها */}
      <section>
        <SectionHeader title="پرفروش‌ترین‌ها" sub="انتخاب خود گیمرها" link="/products?sort=popular" />
        <ProductCarousel products={d.bestSellers} id="best-sellers" />
      </section>

      {/* بازی‌های داغ */}
      <section>
        <SectionHeader title="بازی‌های داغ" sub="از پیش‌خریدهای بزرگ تا عنوان‌های عرضه‌شده" link="/category/games" />
        <ProductCarousel products={d.trendingGames} id="trending-games" />
      </section>

      {/* بنر پیش‌خرید */}
      {d.preorders.length > 0 && (
        <section className="overflow-hidden rounded-3xl border border-line bg-panel">
          <div className="relative">
            <img src="/img/hero/hero-gta6.jpg" alt="" className="h-56 w-full object-cover opacity-60 md:h-72" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-l from-panel via-panel/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-x w-full">
                <div className="max-w-lg">
                  <Badge type="preorder" />
                  <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">پیش‌خریدهای فعال</h2>
                  <p className="mt-2 text-sm leading-6 text-sub">GTA VI و عنوان‌های در راه را زودتر از همه رزرو کنید؛ مبلغ هنگام ثبت سفارش دریافت و کالا در تاریخ عرضه ارسال می‌شود.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {d.preorders.slice(0, 3).map((p) => (
                      <Link key={p.id} to={`/product/${p.id}`} className="btn btn-soft h-9 px-4 text-xs">{p.name.split('—')[0]}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* کنسول‌ها */}
      <section>
        <SectionHeader title="کنسول‌ها" sub="پلی‌استیشن، ایکس‌باکس، نینتندو و دستی‌ها" link="/category/consoles" />
        <ProductCarousel products={d.consoles} id="consoles" />
      </section>

      {/* استور دیجیتال */}
      <section>
        <SectionHeader title="استور دیجیتال" sub="گیفت‌کارت و اشتراک قانونی — تحویل آنی" link="/category/digital" />
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

      {/* مانیتور و قطعات */}
      <section>
        <SectionHeader title="مانیتور و سخت‌افزار" sub="از پنل‌های اولد تا کارت‌های گرافیک" link="/category/monitors" />
        <ProductCarousel products={d.monitorsPc} id="monitors-pc" />
      </section>

      {/* تجهیزات جانبی */}
      <section>
        <SectionHeader title="تجهیزات جانبی" sub="دسته، هدست، کیبورد و ماوس" link="/category/peripherals" />
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
        <SectionHeader title="برندها" sub="نمایندگان محبوب دنیای گیمینگ" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {BRANDS.slice(0, 21).map((b) => (
            <Link key={b} to={`/search?q=${encodeURIComponent(b)}`} className="flex h-14 items-center justify-center rounded-xl border border-line-soft bg-card px-2 text-center transition hover:border-brand/40">
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
