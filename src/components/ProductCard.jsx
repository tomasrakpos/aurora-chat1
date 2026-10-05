import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, PhoneCall } from 'lucide-react'
import { useStore } from '../lib/store.jsx'
import { effective, discountPct, isBuyable } from '../data/index.js'
import { faNum } from '../lib/format.js'
import { ProductVisual } from './media.jsx'
import { Badge, Rating, PriceBlock, StockLabel } from './ui.jsx'

export default function ProductCard({ product: p, compact = false }) {
  const { addToCart, toggleWishlist, wishlist, overrides, toast } = useStore()
  const ep = effective(p, overrides)
  const pct = discountPct(ep)
  const inWish = wishlist.includes(p.id)
  const buyable = isBuyable(ep)

  const onAdd = (e) => {
    e.preventDefault()
    if (!buyable) return
    addToCart(p.id)
    toast('به سبد خرید اضافه شد')
  }

  const badges = [...(ep.badges || [])]
  if (ep.stock === 'out') badges.unshift('out')

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-pop">
      <Link to={`/product/${p.id}`} className="absolute inset-0 z-[1]" aria-label={p.name} />

      {/* تصویر */}
      <div className="relative aspect-square overflow-hidden bg-[#eef1f6]">
        <ProductVisual product={ep} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute right-2 top-2 z-[2] flex flex-col items-end gap-1">
          {pct > 0 && <Badge type="sale">{`${pct}٪ تخفیف`}</Badge>}
          {badges.slice(0, 2).map((b) => <Badge key={b} type={b} />)}
        </div>
        <button
          type="button"
          aria-label={inWish ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          onClick={(e) => { e.preventDefault(); toggleWishlist(p.id); toast(inWish ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد') }}
          className={`absolute left-2 top-2 z-[2] flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all duration-200 ${inWish ? 'bg-hot text-white' : 'bg-white/90 text-zinc-500 hover:text-hot'}`}
        >
          <Heart size={15} fill={inWish ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* محتوا */}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <span dir="ltr" className="self-start text-[10px] font-bold uppercase tracking-wider text-mute">{p.brand}</span>
        <h3 className="line-clamp-2 min-h-[2.9rem] text-[13px] font-semibold leading-6 text-ink">{p.name}</h3>

        {!compact && (
          <div className="mb-0.5"><Rating value={ep.rating?.avg} count={ep.rating?.count} /></div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between gap-2">
            <PriceBlock price={ep.price} size="sm" />
            {pct > 0 && (
              <bdi className="shrink-0 rounded-lg bg-hot px-1.5 py-0.5 text-[10px] font-extrabold text-white tnum">{faNum(pct)}٪</bdi>
            )}
          </div>
          <div className="mt-1.5"><StockLabel stock={ep.stock} qty={ep.qty} /></div>
        </div>

        <div className="relative z-[2] mt-2.5">
          {buyable ? (
            <div className="md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
              <button
                type="button"
                onClick={onAdd}
                className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-transparent text-xs font-bold text-sub transition-all duration-200 hover:border-cta hover:bg-cta hover:text-white active:scale-[0.98]"
              >
                <ShoppingCart size={14} /> افزودن به سبد
              </button>
            </div>
          ) : ep.price?.inquiry ? (
            <Link to="/support" onClick={(e) => e.stopPropagation()} className="btn btn-soft h-9 w-full text-xs">
              <PhoneCall size={14} /> استعلام قیمت
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
