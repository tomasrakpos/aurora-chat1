import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Header, MobileNav, Footer, Toasts, FloatingNav } from './components/layout.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import SearchPage from './pages/SearchPage.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'
import Wishlist from './pages/Wishlist.jsx'
import { Login, Register } from './pages/Auth.jsx'
import Support from './pages/Support.jsx'
import Admin from './pages/Admin.jsx'
import { AccountHome, Orders, AccountWishlist, Addresses, Downloads, SupportTickets, NotificationsPage, Security } from './pages/Account.jsx'
import { EmptyState } from './components/ui.jsx'

function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <main className="container-x py-16">
      <EmptyState
        title="صفحه پیدا نشد"
        desc="نشانی واردشده وجود ندارد یا جابه‌جا شده است."
        action={<Link to="/" className="btn btn-primary h-11 px-6 text-sm">بازگشت به صفحه اصلی</Link>}
      />
    </main>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollTop />
      <div className="hidden md:block"><Header /></div>
      <MobileNav />
      <FloatingNav />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/category/:catId" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account" element={<AccountHome />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/wishlist" element={<AccountWishlist />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/account/downloads" element={<Downloads />} />
          <Route path="/account/support" element={<SupportTickets />} />
          <Route path="/account/notifications" element={<NotificationsPage />} />
          <Route path="/account/security" element={<Security />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <Toasts />
    </div>
  )
}
