import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard.jsx'

/* ------------------------------ اسلایدر قهرمان صفحه اول ------------------------------ */
export function HeroSlider({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28, direction: 'rtl' }, [Autoplay({ delay: 5500, stopOnInteraction: false })])
  const [selected, setSelected] = useState(0)
  const autoplayRef = useRef(null)

  useEffect(() => {
    if (!emblaApi) return
    autoplayRef.current = emblaApi.plugins()?.autoplay
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const next = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const prev = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div
      className="embla relative overflow-hidden rounded-3xl border border-line bg-panel"
      onMouseEnter={() => autoplayRef.current?.stop()}
      onMouseLeave={() => autoplayRef.current?.play()}
    >
      <div ref={emblaRef} className="embla__container">
        {slides.map((s) => (
          <div key={s.id} className="embla__slide relative h-[340px] min-w-0 md:h-[430px] lg:h-[480px]">
            <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-l from-base via-base/70 to-transparent md:bg-gradient-to-l md:from-base md:via-base/60" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-x w-full">
                <div className="max-w-xl">
                  <span className="anim-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-ink backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-2" /> {s.kicker}
                  </span>
                  <h2 className="anim-in mt-4 text-3xl font-extrabold leading-tight text-ink md:text-5xl" style={{ animationDelay: '80ms' }}>
                    <bdi>{s.title}</bdi>
                  </h2>
                  <p className="anim-in mt-3 max-w-md text-sm leading-7 text-sub md:text-base" style={{ animationDelay: '140ms' }}>{s.sub}</p>
                  <div className="anim-in mt-6 flex items-center gap-3" style={{ animationDelay: '200ms' }}>
                    <Link to={s.link} className="btn btn-primary h-11 px-6 text-sm">{s.cta}</Link>
                    <span className="rounded-lg border border-line bg-panel/60 px-3 py-2 text-xs font-semibold text-sub backdrop-blur-sm">{s.chip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ناوبری */}
      <button type="button" aria-label="اسلاید قبلی" onClick={next} className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 md:flex">
        <ChevronRight size={20} />
      </button>
      <button type="button" aria-label="اسلاید بعدی" onClick={prev} className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 md:flex">
        <ChevronLeft size={20} />
      </button>

      {/* نقطه‌ها */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((s, i) => (
          <button key={s.id} aria-label={`اسلاید ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === selected ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------ کاروسل محصولات ------------------------------ */
export function ProductCarousel({ products, id }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, direction: 'rtl', align: 'start', containScroll: 'trimSnaps' })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const update = () => { setCanPrev(emblaApi.canScrollPrev()); setCanNext(emblaApi.canScrollNext()) }
    update()
    emblaApi.on('select', update)
    return () => emblaApi.off('select', update)
  }, [emblaApi])

  if (!products.length) return null

  return (
    <div className="relative" id={id}>
      <div className="embla -mx-1">
        <div ref={emblaRef} className="embla__container px-1">
          {products.map((p) => (
            <div key={p.id} className="embla__slide min-w-0 flex-[0_0_48%] pl-3 sm:flex-[0_0_32%] md:flex-[0_0_24%] xl:flex-[0_0_19%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -top-12 left-0 hidden items-center gap-2 md:flex">
        <button type="button" aria-label="قبلی" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel text-sub transition hover:text-ink disabled:opacity-30">
          <ChevronRight size={16} />
        </button>
        <button type="button" aria-label="بعدی" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel text-sub transition hover:text-ink disabled:opacity-30">
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  )
}
