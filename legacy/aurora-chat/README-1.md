# Aurora Chat — راهنمای راه‌اندازی

## ۱. Supabase
1. یه پروژه جدید در [supabase.com](https://supabase.com) بساز.
2. برو به **SQL Editor** و کل محتوای `schema.sql` رو اجرا کن.
3. برو به **Project Settings → API** و این دو مقدار رو بردار:
   - Project URL
   - anon public key
4. این مقادیر رو داخل `js/supabase-config.js` جایگزین کن.

## ۲. تست لوکال
فایل `index.html` رو مستقیم باز نکن (به‌خاطر ES Modules بهتره از یه سرور محلی استفاده کنی):
```
npx serve .
```
یا با افزونه Live Server در VS Code.

## ۳. GitHub + Netlify
- این پوشه رو push کن به یه ریپازیتوری GitHub.
- توی Netlify، ریپو رو وصل کن → چون سایت استاتیکه، Build command خالی بمونه و Publish directory رو `.` بذار.

## نکته درباره‌ی ساخت گفتگو
در نسخه‌ی فعلی، لیست گفتگوها از جدول‌های `conversations` / `conversation_members` خونده می‌شه اما فرم «شروع گفتگوی جدید» ساخته نشده — فعلاً باید یک ردیف تستی مستقیم از Supabase Table Editor اضافه کنی. اگه بخوای این قابلیت (جستجوی کاربر + ساخت چت جدید) رو هم اضافه کنم بگو.
