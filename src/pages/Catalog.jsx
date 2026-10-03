import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, Filter, RotateCcw, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES, catById, FILTER_DEFS } from '../data/index.js'
import { effective } from '../data/index.js'
import ProductCard from '../components/ProductCard.jsx'
import { GridSkeleton, NoResults, Badge } from '../components/ui.jsx'
import { useStore } from '../lib/store.jsx'
import { useSimLoad } from '../lib/hooks.js'
import { faNum, compactToman, clamp } from '../lib/format.js'

const getVal = (p, key) => {
  if (key === 'brand') return p.brand
  if (key === 'sub') return p.sub
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), p)
}

const SORTS = [
  { id: 'popular', label: 'محبوب‌ترین' },
  { id: 'new', label: 'جدیدترین' },
  { id: 'cheap', label: 'ارزان‌ترین' },
  { id: 'expensive', label: 'گران‌ترین' },
  { id: 'rating', label: 'بالاترین امتیاز' }
]

function FacetGroup({ def, options, selected, onToggle }) {
  const [open, setOpen] = useState(true)
  if (!options.length) return null
  return (
    <div className="border-b border-line-soft py-3">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-[13px] font-bold text-ink">
        {def.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2.5 space-y-1.5 fade-in">
          {options.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-2 text-[13px] text-sub hover:text-ink">
              <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(def.key, o.value)}
                className="h-4 w-4 rounded border-line accent-violet-500" />
              <span className="flex-1">{o.label}</span>
              <bdi className="text-[11px] text-mute tnum">{faNum(o.count)}</bdi>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Catalog() {
  const { catId } = useParams()
  const [sp, setSp] = useSearchParams()
  const cat = catId ? catById(catId) : null
  const subId = sp.get('sub')
  const sort = sp.get('sort') || 'popular'
  const { overrides } = useStore()

  const [facetSel, setFacetSel] = useState({})
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => { setFacetSel({}); setPriceMin(''); setPriceMax(''); setInStockOnly(false) }, [catId, subId])

  const scope = useMemo(() => {
    let list = PRODUCTS.map((p) => effective(p, overrides))
    if (cat) list = list.filter((p) => p.cat === cat.id)
    if (subId) list = list.filter((p) => p.sub === subId)
    return list
  }, [cat, subId, overrides])

  const priceBounds = useMemo(() => {
    const priced = scope.filter((p) => p.price && !p.price.inquiry).map((p) => p.price.final)
    if (!priced.length) return [0, 0]
    return [Math.min(...priced), Math.max(...priced)]
  }, [scope])

  const defs = useMemo(() => {
    const base = cat ? (FILTER_DEFS[cat.id] || []) : [{ key: 'brand', label: 'برند' }, { key: 'sub', label: 'زیردسته' }]
    return base
  }, [cat])

  const facetOptions = useMemo(() => defs.map((def) => {
    const map = new Map()
    scope.forEach((p) => {
      const v = getVal(p, def.key)
      if (!v) return
      let label = v
      if (def.type === 'sub' && cat) label = cat.subs.find((s) => s.id === v)?.name || v
      map.set(v, { value: v, label: String(label), count: (map.get(v)?.count || 0) + 1 })
    })
    return { def, options: [...map.values()].sort((a, b) => b.count - a.count).slice(0, 10) }
  }), [defs, scope, cat])

  const filtered = useMemo(() => {
    let list = scope
    for (const { def, options } of facetOptions) {
      const sel = facetSel[def.key]
      if (sel?.length) list = list.filter((p) => sel.includes(String(getVal(p, def.key) ?? '')))
    }
    const mn = Number(priceMin) || 0
    const mx = Number(priceMax) || Infinity
    if (priceMin || priceMax) list = list.filter((p) => p.price && !p.price.inquiry && p.price.final >= mn && p.price.final <= mx)
    if (inStockOnly) list = list.filter((p) => p.stock === 'in' || p.stock === 'low')
    const arr = [...list]
    switch (sort) {
      case 'new': arr.sort((a, b) => (b.addedAt || '').localeCompare(a.addedAt || '')); break
      case 'cheap': arr.sort((a, b) => (a.price?.final ?? Infinity) - (b.price?.final ?? Infinity)); break
      case 'expensive': arr.sort((a, b) => (b.price?.final ?? 0) - (a.price?.final ?? 0)); break
      case 'rating': arr.sort((a, b) => (b.rating?.avg ?? 0) - (a.rating?.avg ?? 0)); break
      default: arr.sort((a, b) => b.sold - a.sold)
    }
    return arr
  }, [scope, facetSel, priceMin, priceMax, inStockOnly, sort, facetOptions])

  const loading = useSimLoad([catId, subId, sort], 300)
  const activeCount = Object.values(facetSel).flat().length + (priceMin || priceMax ? 1 : 0) + (inStockOnly ? 1 : 0)

  const toggle = (key, value) => setFacetSel((s) => {
    const cur = s[key] || []
    return { ...s, [key]: cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value] }
  })

  const clearAll = () => { setFacetSel({}); setPriceMin(''); setPriceMax(''); setInStockOnly(false) }

  const FiltersPanel = (
    <>
      {defs.some((d) => d.key === 'brand') === false && cat?.subs.length > 0 && (
        <FacetGroup def={{ key: 'sub', label: 'زیردسته', type: 'sub' }}
          options={cat.subs.map((s) => ({ value: s.id, label: s.name, count: PRODUCTS.filter((p) => p.cat === cat.id && p.sub === s.id).length }))}
          selected={facetSel.sub || []} onToggle={toggle} />
      )}
      {facetOptions.map(({ def, options }) => (
        <FacetGroup key={def.key} def={def} options={options} selected={facetSel[def.key] || []} onToggle={toggle} />
      ))}
      <div className="py-3">
        <p className="mb-2 text-[13px] font-bold text-ink">محدوده قیمت (تومان)</p>
        <div className="flex items-center gap-2">
          <input inputMode="numeric" value={priceMin} onChange={(e) => setPriceMin(e.target.value.replace(/\D/g, ''))} placeholder="از" aria-label="حداقل قیمت" className="field-input h-9 flex-1 text-xs" />
          <span className="text-mute">—</span>
          <input inputMode="numeric" value={priceMax} onChange={(e) => setPriceMax(e.target.value.replace(/\D/g, ''))} placeholder="تا" aria-label="حداکثر قیمت" className="field-input h-9 flex-1 text-xs" />
        </div>
        {priceBounds[1] > 0 && (
          <p className="mt-2 text-[11px] text-mute">محدوده موجود: {compactToman(priceBounds[0])} تا {compactToman(priceBounds[1])}</p>
        )}
      </div>
      <label className="flex cursor-pointer items-center gap-2 border-b border-line-soft py-3 text-[13px] text-sub">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-violet-500" />
        فقط کالاهای موجود
      </label>
      {activeCount > 0 && (
        <button onClick={clearAll} className="btn btn-danger-soft mt-3 h-9 w-full text-xs"><RotateCcw size={13} /> حذف فیلترها ({faNum(activeCount)})</button>
      )}
    </>
  )

  return (
    <main className="container-x py-6 md:py-8">
      {/* سرنخ */}
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-mute" aria-label="مسیر">
        <Link to="/" className="hover:text-ink">خانه</Link>
        <ChevronLeft size={12} />
        {cat ? <Link to={`/category/${cat.id}`} className="hover:text-ink">{cat.name}</Link> : <span className="text-ink">همه‌ی محصولات</span>}
        {subId && cat && (<><ChevronLeft size={12} /><span className="text-ink">{cat.subs.find((s) => s.id === subId)?.name}</span></>)}
      </nav>

      {/* سربرگ دسته */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold md:text-2xl">{cat ? cat.name : 'همه‌ی محصولات'}</h1>
          <p className="mt-1 text-xs text-mute md:text-sm">{cat ? cat.desc : 'مرور کامل فروشگاه؛ با فیلتر و مرتب‌سازی'} — <bdi className="tnum">{faNum(filtered.length)}</bdi> کالا</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSheetOpen(true)} className="btn btn-ghost h-10 px-3 text-xs lg:hidden">
            <Filter size={15} /> فیلتر {activeCount > 0 && <bdi className="rounded-full bg-cta px-1.5 text-[10px] text-white tnum">{faNum(activeCount)}</bdi>}
          </button>
          <label className="flex items-center gap-2 text-xs text-sub">
            <span className="hidden sm:inline">مرتب‌سازی:</span>
            <select value={sort} onChange={(e) => { const n = new URLSearchParams(sp); n.set('sort', e.target.value); setSp(n) }}
              className="field-input h-10 w-36 cursor-pointer text-xs">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* فیلتر دسکتاپ */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 max-h-[calc(100vh-160px)] overflow-y-auto rounded-2xl border border-line bg-card p-4">
            <p className="mb-1 flex items-center gap-2 text-sm font-extrabold text-ink"><Filter size={15} /> فیلترها</p>
            {FiltersPanel}
          </div>
        </aside>

        {/* محصولات */}
        <div>
          {loading ? <GridSkeleton count={8} />
            : filtered.length === 0 ? (
              <NoResults action={<button onClick={clearAll} className="btn btn-primary h-10 px-5 text-sm">حذف فیلترها</button>} />
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
        </div>
      </div>

      {/* برگه‌ی فیلتر موبایل */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button aria-label="بستن" className="absolute inset-0 bg-black/60 fade-in" onClick={() => setSheetOpen(false)} />
          <div className="glass absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto rounded-t-3xl p-5 pop-in">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-extrabold">فیلترها</h3>
              <button onClick={() => setSheetOpen(false)} className="btn btn-ghost h-9 w-9 p-0" aria-label="بستن"><X size={16} /></button>
            </div>
            {FiltersPanel}
            <button onClick={() => setSheetOpen(false)} className="btn btn-primary mt-4 h-11 w-full text-sm">نمایش {faNum(filtered.length)} کالا</button>
          </div>
        </div>
      )}
    </main>
  )
}
