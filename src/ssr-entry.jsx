/* تست رندر سمت سرور همه‌ی مسیرها برای کشف خطاهای زمان اجرا */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { StoreProvider } from './lib/store.jsx'

globalThis.localStorage = globalThis.localStorage || { getItem: () => null, setItem: () => {} }

const routes = [
  '/', '/products', '/products?sort=new', '/category/consoles', '/category/consoles?sub=playstation',
  '/category/digital', '/category/games?sub=preorder', '/category/monitors', '/category/pc-parts',
  '/product/ps5-pro', '/product/ps5-slim-disc', '/product/fc27-steam', '/product/psn-25',
  '/product/gta6-ps5-std', '/product/rog-xg27uqr', '/product/does-not-exist',
  '/search?q=ps5', '/search?q=گیفت', '/cart', '/wishlist', '/checkout',
  '/login', '/register', '/support', '/admin',
  '/account', '/account/orders', '/account/wishlist', '/account/addresses', '/account/downloads',
  '/account/support', '/account/notifications', '/account/security', '/nope'
]

let fail = 0
for (const r of routes) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[r]}>
        <StoreProvider><App /></StoreProvider>
      </MemoryRouter>
    )
    console.log(`OK   ${r}  (${html.length} chars)`)
  } catch (e) {
    fail++
    console.log(`FAIL ${r}\n     ${e.message.split('\n')[0]}`)
  }
}
console.log(fail ? `\n${fail} ROUTE(S) FAILED` : '\nALL ROUTES RENDERED')
process.exit(fail ? 1 : 0)
