import { useEffect, useState } from 'react'

/** شبیه‌سازی بارگذاری برای نمایش اسکلتون هنگام تغییر صفحه/فیلتر */
export function useSimLoad(deps = [], ms = 350) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return loading
}

/** بازگشت به بالای صفحه هنگام تغییر مسیر */
export function useScrollTop(dep) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [dep])
}
