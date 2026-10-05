import React, { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { searchProducts, POPULAR_SEARCHES } from '../data/index.js'
import ProductCard from '../components/ProductCard.jsx'
import { GridSkeleton, NoResults } from '../components/ui.jsx'
import { useSimLoad } from '../lib/hooks.js'
import { faNum } from '../lib/format.js'

export default function SearchPage() {
  const [sp] = useSearchParams()
  const q = sp.get('q') || ''
  const results = useMemo(() => searchProducts(q), [q])
  const loading = useSimLoad([q], 350)

  return (
    <main className="container-x py-6 md:py-8">
      <h1 className="text-xl font-extrabold md:text-2xl">جستجو</h1>
      {q ? (
        <p className="mt-2 text-sm text-sub">نتایج برای «<b className="text-ink">{q}</b>» — <bdi className="tnum">{faNum(results.length)}</bdi> کالا</p>
      ) : (
        <p className="mt-2 text-sm text-sub">عبارت موردنظر را از نوار جستجوی بالای صفحه وارد کنید.</p>
      )}

      {!q && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-bold text-mute">جستجوهای پرطرفدار</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <Link key={s} to={`/search?q=${encodeURIComponent(s)}`} className="rounded-lg border border-line bg-card px-3 py-1.5 text-xs text-sub transition hover:border-brand/40 hover:text-ink">{s}</Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        {loading && q ? <GridSkeleton count={8} />
          : q && results.length === 0 ? (
            <NoResults q={q} action={<Link to="/products" className="btn btn-primary h-10 px-5 text-sm">مرور همه‌ی محصولات</Link>} />
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
      </div>
    </main>
  )
}
