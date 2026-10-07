const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const patient = {
  id: 'p-1001',
  name: 'أحمد المعيبد',
  age: 32,
  bloodType: 'A+',
  phone: '+966 55 123 4567',
  conditions: ['سكري نوع 2', 'ضغط منخفض'],
  medication: ['أومبرازول 20mg', 'فيتامين D3', 'لوسارتان 50mg'],
};

const appointments = [
  { doctor: 'د. ريم السعيد', date: '2026-10-10T10:30:00', type: 'متابعة', status: 'مؤكد' },
  { doctor: 'د. فواز الخالدي', date: '2026-10-13T15:00:00', type: 'فحص', status: 'قيد الانتظار' },
  { doctor: 'د. لينا النعيمي', date: '2026-10-17T09:00:00', type: 'تحليل', status: 'مؤكد' },
];

const records = [
  { title: 'نتيجة تحليل سكر الدم', date: '15 يونيو 2026', status: 'طبيعي' },
  { title: 'تقرير ضغط الدم', date: '04 يونيو 2026', status: 'مستقر' },
  { title: 'ملف متابعة القلب', date: '20 مايو 2026', status: 'مراجعة' },
];

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    service: 'sehati-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/patient', (_, res) => {
  res.json(patient);
});

app.get('/api/appointments', (_, res) => {
  res.json(appointments);
});

app.get('/api/records', (_, res) => {
  res.json(records);
});

app.listen(PORT, () => {
  console.log(`API available at http://localhost:${PORT}`);
});
