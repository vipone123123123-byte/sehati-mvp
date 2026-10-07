# صحتي

تطبيق MVP عربي مصمم لتجربة مستخدم صحية سهلة وواضحة، يركز على:
- الملف الصحي
- المواعيد
- السجل الطبي
- الأدوية
- التنبيهات اليومية

## البنية

- `App.tsx`: تطبيق React Native / Expo الرئيسي
- `server/`: خادم Node.js Express Mock API

## تشغيل التطبيق (Expo)

```bash
npm install
npm start
```

ثم اختر:
- Android: `a`
- iOS: `i`
- Web: `w`

## تشغيل الخادم الوهمي (API)

```bash
cd server
npm install
npm run dev
```

## الموارد

- التطبيق يعمل على iOS و Android عبر Expo
- الخادم يوفّر بيانات mock للتجربة السريعة
