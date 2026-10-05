import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { productById, effective } from '../data/index.js'
import ProductCard from '../components/ProductCard.jsx'
import { EmptyWishlist } from '../components/ui.jsx'

export default function Wishlist() {
  const { wishlist, overrides } = useStore()
  const items = wishlist.map(productById).filter(Boolean).map((p) => effective(p, overrides))

  if (items.length === 0) {
    return (
      <main className="container-x py-10">
        <EmptyWishlist action={<Link to="/products" className="btn btn-primary h-11 px-6 text-sm">کشف محصولات</Link>} />
      </main>
    )
  }

  const priceChanged = (p) => Boolean(overrides[p.id]?.final !== undefined)

  return (
    <main className="container-x py-6 md:py-8">
      <h1 className="mb-2 text-xl font-extrabold md:text-2xl">علاقه‌مندی‌ها</h1>
      <p className="mb-6 text-sm text-sub">اگر قیمت کالایی بعد از ذخیره تغییر کرده باشد، اینجا اطلاع می‌دهیم.</p>

      {items.some(priceChanged) && (
        <p className="mb-4 rounded-xl border border-warn/30 bg-warn/10 px-4 py-3 text-xs font-bold text-warn">
          قیمت برخی از این محصولات پس از ذخیره تغییر کرده است.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
