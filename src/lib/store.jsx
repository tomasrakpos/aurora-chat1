import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { uid } from './format.js'

const StoreCtx = createContext(null)
const LS_KEY = 'aurora-store-v1'

const readLS = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
}

export function StoreProvider({ children }) {
  const init = useMemo(readLS, [])
  const [cart, setCart] = useState(init.cart || [])
  const [wishlist, setWishlist] = useState(init.wishlist || [])
  const [user, setUser] = useState(init.user || null)
  const [users, setUsers] = useState(init.users || [])
  const [orders, setOrders] = useState(init.orders || [])
  const [addresses, setAddresses] = useState(init.addresses || [])
  const [recent, setRecent] = useState(init.recent || [])
  const [overrides, setOverrides] = useState(init.overrides || {}) // تغییرات پنل مدیریت
  const [userReviews, setUserReviews] = useState(init.userReviews || [])
  const [tickets, setTickets] = useState(init.tickets || [])
  const [notifications, setNotifications] = useState(init.notifications || [])
  const [recentSearches, setRecentSearches] = useState(init.recentSearches || [])
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        cart, wishlist, user, users, orders, addresses, recent, overrides, userReviews, tickets, notifications, recentSearches
      }))
    } catch { /* فضای ذخیره‌سازی پر است */ }
  }, [cart, wishlist, user, users, orders, addresses, recent, overrides, userReviews, tickets, notifications, recentSearches])

  const toast = useCallback((msg, type = 'ok') => {
    const id = uid()
    setToasts((t) => [...t, { id, msg, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  /* ------------------------------ سبد خرید ------------------------------ */
  const addToCart = useCallback((id, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id)
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 10) } : i))
      return [...c, { id, qty }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, 10)) } : i)))
  }, [])

  const removeFromCart = useCallback((id) => setCart((c) => c.filter((i) => i.id !== id)), [])
  const clearCart = useCallback(() => setCart([]), [])

  /* ------------------------------ علاقه‌مندی‌ها ------------------------------ */
  const toggleWishlist = useCallback((id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  }, [])

  /* ------------------------------ حساب کاربری ------------------------------ */
  const register = useCallback((data) => {
    const exists = users.find((u) => u.email === data.email)
    if (exists) return { ok: false, error: 'با این ایمیل قبلاً حساب ساخته شده است.' }
    const u = { id: uid(), ...data, createdAt: new Date().toISOString() }
    setUsers((s) => [...s, u])
    setUser(u)
    return { ok: true }
  }, [users])

  const login = useCallback((email, password) => {
    const u = users.find((x) => x.email === email)
    if (!u) return { ok: false, error: 'حسابی با این ایمیل پیدا نشد.' }
    if (u.password !== password) return { ok: false, error: 'رمز عبور درست نیست.' }
    setUser(u)
    return { ok: true }
  }, [users])

  const logout = useCallback(() => setUser(null), [])

  const addAddress = useCallback((a) => setAddresses((s) => [...s, { id: uid(), ...a }]), [])
  const removeAddress = useCallback((id) => setAddresses((s) => s.filter((x) => x.id !== id)), [])

  const placeOrder = useCallback((payload) => {
    const order = { id: `AUR-${Date.now().toString().slice(-8)}`, createdAt: new Date().toISOString(), status: 'در حال پردازش', ...payload }
    setOrders((o) => [order, ...o])
    setCart([])
    return order
  }, [])

  /* ------------------------------ بازدید اخیر ------------------------------ */
  const viewProduct = useCallback((id) => {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 12))
  }, [])

  /* ------------------------------ جستجو ------------------------------ */
  const pushSearch = useCallback((q) => {
    if (!q.trim()) return
    setRecentSearches((s) => [q, ...s.filter((x) => x !== q)].slice(0, 8))
  }, [])

  /* ------------------------------ نظرات ------------------------------ */
  const addReview = useCallback((r) => {
    setUserReviews((s) => [{ id: uid(), createdAt: new Date().toISOString(), helpful: 0, ...r }, ...s])
  }, [])

  /* ------------------------------ تیکت پشتیبانی ------------------------------ */
  const addTicket = useCallback((t) => {
    const ticket = { id: uid(), createdAt: new Date().toISOString(), status: 'باز', ...t }
    setTickets((s) => [ticket, ...s])
    return ticket
  }, [])

  /* ------------------------------ پنل مدیریت ------------------------------ */
  const setOverride = useCallback((id, patch) => {
    setOverrides((o) => ({ ...o, [id]: { ...(o[id] || {}), ...patch, updatedAt: new Date().toISOString() } }))
  }, [])

  const notify = useCallback((msg) => {
    setNotifications((n) => [{ id: uid(), createdAt: new Date().toISOString(), read: false, msg }, ...n].slice(0, 30))
  }, [])

  const value = {
    cart, wishlist, user, users, orders, addresses, recent, overrides, userReviews, tickets, notifications, recentSearches, toasts,
    addToCart, setQty, removeFromCart, clearCart, toggleWishlist,
    register, login, logout, addAddress, removeAddress, placeOrder,
    viewProduct, pushSearch, addReview, addTicket, setOverride, notify, toast
  }

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

export const useStore = () => useContext(StoreCtx)
