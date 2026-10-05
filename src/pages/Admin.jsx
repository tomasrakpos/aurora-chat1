import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Package, CreditCard, LifeBuoy, Pencil, Check, X, RefreshCw } from 'lucide-react'
import { PRODUCTS, FX, effective } from '../data/index.js'
import { useStore } from '../lib/store.jsx'
import { faNum, faRelative, faDateTime } from '../lib/format.js'
import { StockLabel } from '../components/ui.jsx'

const STOCK_OPTS = [
  { v: 'in', l: 'موجود' }, { v: 'low', l: 'موجودی محدود' }, { v: 'out', l: 'ناموجود' },
  { v: 'preorder', l: 'پیش‌خرید' }, { v: 'soon', l: 'به‌زودی' }, { v: 'custom', l: 'سفارشی' }
]

export default function Admin() {
  const { overrides, setOverride, orders, tickets, toast } = useStore()
  const [tab, setTab] = useState('products')
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState({})

  const list = useMemo(() => PRODUCTS.map((p) => ({ raw: p, eff: effective(p, overrides) })), [overrides])
  const overriddenCount = Object.keys(overrides).length

  const startEdit = (p) => {
    setEditing(p.id)
    setDraft({ final: p.price?.inquiry ? '' : (p.price?.final || ''), stock: p.stock || 'in' })
  }
  const saveEdit = (p) => {
    const final = draft.final === '' ? null : Number(draft.final)
    setOverride(p.id, { final, stock: draft.stock })
    setEditing(null)
    toast('تغییرات ذخیره شد')
  }

  const TABS = [
    { id: 'products', label: `محصولات (${faNum(PRODUCTS.length)})`, icon: Package },
    { id: 'orders', label: `سفارش‌ها (${faNum(orders.length)})`, icon: CreditCard },
    { id: 'tickets', label: `تیکت‌ها (${faNum(tickets.length)})`, icon: LifeBuoy }
  ]

  return (
    <main className="container-x py-6 md:py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-extrabold"><Shield size={20} className="text-brand" /> پنل مدیریت</h1>
          <p className="mt-1 text-xs text-mute">نسخه‌ی نمایشی — تغییرات به‌صورت محلی ذخیره می‌شود و در معماری واقعی به بک‌اند متصل می‌شود.</p>
        </div>
        <span className="rounded-xl border border-line bg-card px-3 py-2 text-[11px] text-sub">
          نرخ مبنای ارز: <bdi className="font-bold tnum">{faNum(FX.rate)}</bdi> تومان — {FX.source}
        </span>
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-line no-scrollbar">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${tab === t.id ? 'border-brand text-ink' : 'border-transparent text-mute hover:text-sub'}`}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <>
          {overriddenCount > 0 && (
            <p className="mb-3 rounded-xl bg-brand/10 px-4 py-2.5 text-xs font-bold text-brand">
              <bdi className="tnum">{faNum(overriddenCount)}</bdi> محصول بازنویسی قیمت/موجودی دارد.
              <button onClick={() => Object.keys(overrides).forEach((k) => setOverride(k, { final: undefined, stock: undefined }))} className="mr-3 inline-flex items-center gap-1 text-mute underline hover:text-ink"><RefreshCw size={11} /> بازنشانی همه</button>
            </p>
          )}
          <div className="overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-line bg-panel text-right text-[11px] text-mute">
                  <th className="px-4 py-3 font-bold">محصول / SKU</th>
                  <th className="px-4 py-3 font-bold">قیمت (تومان)</th>
                  <th className="px-4 py-3 font-bold">منبع قیمت</th>
                  <th className="px-4 py-3 font-bold">آخرین بررسی</th>
                  <th className="px-4 py-3 font-bold">موجودی</th>
                  <th className="px-4 py-3 font-bold">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {list.map(({ raw: p, eff }) => (
                  <tr key={p.id} className="border-b border-line-soft align-middle last:border-0 hover:bg-white/[0.02]">
                    <td className="max-w-[300px] px-4 py-3">
                      <Link to={`/product/${p.id}`} className="line-clamp-1 text-[13px] font-bold text-ink hover:text-brand-2">{p.name}</Link>
                      <span dir="ltr" className="text-[10px] text-mute ltr">{p.sku}</span>
                      {overrides[p.id] && <span className="mr-2 rounded bg-brand/15 px-1.5 py-0.5 text-[9px] font-bold text-brand">ویرایش‌شده</span>}
                    </td>
                    <td className="px-4 py-3">
                      {editing === p.id ? (
                        <input inputMode="numeric" value={draft.final} onChange={(e) => setDraft({ ...draft, final: e.target.value.replace(/\D/g, '') })}
                          placeholder="خالی = استعلام" aria-label="قیمت" className="field-input h-8 w-36 text-xs" />
                      ) : eff.price?.inquiry ? (
                        <span className="text-xs font-bold text-warn">استعلام قیمت</span>
                      ) : (
                        <bdi className="text-[13px] font-bold tnum">{faNum(eff.price.final)}</bdi>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span dir="ltr" className="line-clamp-1 max-w-[160px] text-[11px] text-mute ltr">{p.price?.source || '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-mute">{p.price?.lastChecked ? faRelative(p.price.lastChecked) : '—'}</td>
                    <td className="px-4 py-3">
                      {editing === p.id ? (
                        <select value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} className="field-input h-8 w-32 text-xs">
                          {STOCK_OPTS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
                      ) : <StockLabel stock={eff.stock} />}
                    </td>
                    <td className="px-4 py-3">
                      {editing === p.id ? (
                        <span className="flex gap-1.5">
                          <button onClick={() => saveEdit(p)} aria-label="ذخیره" className="btn btn-primary h-8 w-8 p-0"><Check size={14} /></button>
                          <button onClick={() => setEditing(null)} aria-label="انصراف" className="btn btn-ghost h-8 w-8 p-0"><X size={14} /></button>
                        </span>
                      ) : (
                        <button onClick={() => startEdit(eff)} className="btn btn-ghost h-8 px-3 text-[11px]"><Pencil size={12} /> ویرایش</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'orders' && (
        orders.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-panel/60 p-10 text-center text-sm text-sub">هنوز سفارشی ثبت نشده است.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-line bg-card p-4">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <b className="text-ink">{o.id}</b>
                  <span className="text-xs text-mute">{faDateTime(o.createdAt)}</span>
                  <span className="text-xs text-sub">{o.customer}</span>
                  <span className="mr-auto rounded-md bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-300">{o.status}</span>
                  <bdi className="font-extrabold tnum">{faNum(o.total)} تومان</bdi>
                </div>
                <p className="mt-2 text-[11px] text-mute">{o.items.map((i) => `${i.name} ×${i.qty}`).join('، ')}</p>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'tickets' && (
        tickets.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-panel/60 p-10 text-center text-sm text-sub">تیکتی ثبت نشده است.</p>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-card p-4">
                <div className="flex items-center gap-2">
                  <b className="text-sm text-ink">{t.subject}</b>
                  <span className="text-[11px] text-mute">{t.email}</span>
                  <span className={`mr-auto rounded-md px-2 py-0.5 text-[10px] font-bold ${t.status === 'باز' ? 'bg-amber-500/15 text-amber-300' : 'bg-ok/15 text-ok'}`}>{t.status}</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-sub">{t.body}</p>
              </div>
            ))}
          </div>
        )
      )}
    </main>
  )
}
