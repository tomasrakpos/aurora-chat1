import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'

/* جلد تایپوگرافیک بازی‌ها — بدون استفاده از کاورهای دارای حق نشر */
const COVER_BG = {
  pitch: 'linear-gradient(160deg,#052e16 0%,#14532d 45%,#0f766e 100%)',
  vice: 'linear-gradient(160deg,#3b0764 0%,#be185d 55%,#f97316 100%)',
  dark: 'linear-gradient(160deg,#0c0a09 0%,#450a0a 60%,#7f1d1d 100%)',
  war: 'linear-gradient(160deg,#1c1917 0%,#3f3f46 55%,#78716c 100%)',
  ops: 'linear-gradient(160deg,#020617 0%,#1e293b 55%,#0e7490 100%)',
  sakura: 'linear-gradient(160deg,#1e1b4b 0%,#831843 60%,#f472b6 120%)',
  kart: 'linear-gradient(160deg,#1e3a8a 0%,#2563eb 55%,#facc15 130%)',
  jungle: 'linear-gradient(160deg,#052e16 0%,#166534 55%,#ca8a04 120%)',
  strand: 'linear-gradient(160deg,#0f172a 0%,#334155 55%,#64748b 100%)',
  hollow: 'linear-gradient(160deg,#022c22 0%,#134e4a 55%,#5eead4 130%)',
  ring: 'linear-gradient(160deg,#1c1917 0%,#713f12 60%,#fbbf24 130%)',
  claw: 'linear-gradient(160deg,#18181b 0%,#7f1d1d 60%,#f59e0b 130%)'
}

export function GameCover({ cover, className = '' }) {
  const bg = COVER_BG[cover?.bg] || COVER_BG.dark
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4 text-center ${className}`} style={{ background: bg }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgb(255 255 255 / 0.14), transparent 60%)' }} />
      <span dir="ltr" className="text-grad absolute top-3 left-3 text-[10px] font-black tracking-widest opacity-80">AURORA GAMES</span>
      <h3 dir="ltr" className="relative text-balance text-lg font-black uppercase leading-tight tracking-wide text-white drop-shadow-lg md:text-xl">
        {cover?.title}
      </h3>
      {cover?.sub && (
        <span dir="ltr" className="relative mt-2 rounded-full border border-white/30 bg-black/30 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white/90">
          {cover.sub}
        </span>
      )}
    </div>
  )
}

/* کارت هدیه — طراحی اختصاصی با رنگ برند */
export function GiftArt({ gift, className = '' }) {
  const [c1, c2] = gift?.colors || ['#8b5cf6', '#22d3ee']
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden p-6 ${className}`} style={{ background: 'linear-gradient(150deg,#0d1220,#151c2e)' }}>
      <div dir="ltr" className="relative aspect-[1.586] w-full max-w-[300px] overflow-hidden rounded-2xl shadow-2xl" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(120% 100% at 0% 0%, white, transparent 55%)' }} />
        <div className="absolute left-4 top-4 h-6 w-8 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
        <div className="absolute bottom-3 left-4 text-sm font-black tracking-wide text-white/95">{gift?.brand}</div>
        <div className="absolute bottom-2 right-4 text-2xl font-black text-white drop-shadow">{gift?.value}</div>
        <div className="absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Gift Card</div>
      </div>
    </div>
  )
}

/* تصویر محصول با حالت جایگزین در صورت نبود تصویر */
export function ProductVisual({ product, className = '', eager = false }) {
  const [err, setErr] = useState(false)
  if (product.cover) return <GameCover cover={product.cover} className={className} />
  if (product.gift) return <GiftArt gift={product.gift} className={className} />
  if (!product.image || err) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-elev/60 text-mute ${className}`}>
        <ImageOff size={30} />
        <span className="text-[11px]">تصویر به‌زودی</span>
      </div>
    )
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setErr(true)}
      className={`h-full w-full object-contain ${className}`}
    />
  )
}
