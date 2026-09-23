# 🇸🇦 جواز المواطن | Citizen Passport

<p align="center">
  تجربة ويب تفاعلية بمناسبة اليوم الوطني السعودي ٩٦
</p>

<p align="center">
  <strong>Explore · Learn · Collect</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-Django-blue">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-orange">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-informational">
  <img src="https://img.shields.io/badge/Deployment-Render-success">
</p>

---

## 🌐 Live Demo

**[جرّب جواز المواطن](ضع-رابط-Render-هنا)**

---

## عن المشروع

**جواز المواطن** هو تجربة رقمية تفاعلية مبنية باستخدام Django، تأخذ المستخدم في رحلة قصيرة عبر عدد من مناطق المملكة العربية السعودية.

بدلًا من تقديم محتوى اليوم الوطني في صفحة تقليدية، يحوّل المشروع التجربة إلى **جواز رقمي تذكاري** يجمع فيه المستخدم أختامًا أثناء مروره على خمس محطات.

في كل محطة يتعرف المستخدم على جانب من ثقافة المملكة أو معالمها، ثم يجيب على سؤال بسيط للحصول على ختم جديد.

بعد إكمال الرحلة، يستطيع المستخدم إنشاء **بطاقة تذكارية شخصية بصيغة PNG** وتحميلها أو مشاركتها.

> المشروع تجربة تذكارية مستقلة وغير رسمية، ولا يمثل أي جهة حكومية.

---

## 🎯 الفكرة

الفكرة مبنية على تحويل التصفح من تجربة مشاهدة فقط إلى تجربة مشاركة.

بدلًا من:

```text
فتح صفحة → قراءة محتوى → الخروج
```

تصبح التجربة:

```text
إصدار الجواز
      ↓
اختيار الاسم والرمز
      ↓
استكشاف المحطات
      ↓
الإجابة على التحديات
      ↓
جمع الأختام
      ↓
إكمال الجواز
      ↓
إنشاء بطاقة تذكارية
```

الهدف هو الجمع بين:

**الثقافة السعودية + Gamification + Web Development + UX/UI**

---

# 🧭 تجربة المستخدم

## 01 — إصدار الجواز

يبدأ المستخدم بإصدار جوازه الرقمي من الصفحة الرئيسية وإدخال اسمه واختيار رمز شخصي.

![Citizen Passport Home](docs/screenshots/home.png)

---

## 02 — استكشاف المحطات

بعد إصدار الجواز تظهر خمس محطات يمكن للمستخدم زيارتها بأي ترتيب، مع عرض تقدمه الحالي وعدد الأختام التي تم جمعها.

![Stations](docs/screenshots/stations.png)

---

## 03 — تحدي المحطة

داخل كل محطة يظهر سؤال مرتبط بأحد المعالم أو العناصر الثقافية السعودية.

يمكن للمستخدم اختيار الإجابة والاستفادة من تلميح عند الحاجة.

![Challenge](docs/screenshots/question.png)

---

## 04 — جمع الأختام

بعد الإجابة الصحيحة يتم تسجيل الزيارة وإضافة ختم المحطة إلى الجواز.

![Digital Passport](docs/screenshots/passport.png)

---

## 05 — البطاقة التذكارية

بعد إكمال الرحلة يمكن إنشاء بطاقة باسم المستخدم وأختامه.

يتم رسم البطاقة مباشرة داخل المتصفح باستخدام **JavaScript Canvas API**.

![Souvenir Card](docs/screenshots/card.png)

---

## 📍 المحطات الحالية

| المنطقة | التجربة |
|---|---|
| الرياض | قصر المصمك |
| مكة المكرمة | الرواشين في جدة التاريخية |
| المدينة المنورة | جبل الفيل في العلا |
| عسير | فن القط العسيري |
| المنطقة الشرقية | مركز إثراء |

---

## ✨ Features

- واجهة عربية كاملة تدعم RTL.
- تصميم Responsive للجوال والحاسوب.
- جواز رقمي باسم المستخدم.
- رمز شخصي للجواز.
- خمس محطات تفاعلية.
- أسئلة اختيار من متعدد.
- نظام تلميحات.
- حفظ الأختام في قاعدة البيانات.
- منع تكرار الختم للمحطة نفسها.
- تتبع تقدم المستخدم.
- Django Sessions لربط المستخدم بجوازه.
- إنشاء بطاقة PNG مباشرة داخل المتصفح.
- دعم Web Share API عند توفرها.
- إمكانية حذف الجواز والبدء من جديد.
- لا يحتاج إلى إنشاء حساب أو كلمة مرور.

---

## ⚙️ Technical Highlights

من أبرز الجوانب التقنية في المشروع:

### Django Sessions

يتم استخدام جلسة المتصفح لربط المستخدم بالجواز الخاص به بدون الحاجة إلى تسجيل حساب تقليدي.

### Database Persistence

يتم حفظ الجوازات والأختام في قاعدة البيانات بدل الاعتماد فقط على Local Storage أو بيانات المتصفح.

### Duplicate Prevention

يمنع Backend المستخدم من الحصول على الختم نفسه أكثر من مرة.

### Dynamic Templates

تعتمد صفحات المشروع على Django Templates لعرض حالة المستخدم، الأختام، المحطات والتقدم بشكل ديناميكي.

### PNG Generation

تُنشأ البطاقة التذكارية داخل المتصفح باستخدام:

```text
JavaScript Canvas API
```

### Production Deployment

المشروع مجهز للنشر باستخدام:

```text
Gunicorn
WhiteNoise
PostgreSQL
Render
```

---

## 🛠️ Tech Stack

### Backend

![Python](https://img.shields.io/badge/Python-3.x-blue)
![Django](https://img.shields.io/badge/Django-Web_Framework-darkgreen)

- Python
- Django

### Frontend

- HTML5
- CSS3
- JavaScript
- Canvas API

### Database

- SQLite — Local Development
- PostgreSQL — Production

### Deployment

- Render
- Gunicorn
- WhiteNoise

### Design

- RTL Layout
- Responsive Design
- Thmanyah Font

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │     Browser     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Django URLs   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Views      │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
       ┌─────────────────┐       ┌─────────────────┐
       │ Django Templates│       │     Models      │
       └────────┬────────┘       └────────┬────────┘
                │                         │
                ▼                         ▼
       HTML / CSS / JavaScript       PostgreSQL
```

---

## 📂 Project Structure

```text
citizen-passport/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── journey/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── data.py
│   └── tests.py
│
├── templates/
│
├── static/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
│
├── docs/
│   └── screenshots/
│
├── manage.py
├── requirements.txt
├── build.sh
└── README.md
```

---

## 🚀 Future Development

النسخة الحالية تمثل **MVP** للفكرة، ويمكن تطويرها مستقبلًا لتصبح منصة رحلات رقمية أكبر.

من التطويرات الممكنة:

- إضافة جميع مناطق المملكة.
- إضافة أكثر من مسار للمستخدم.
- مسار للتراث.
- مسار للسياحة.
- مسار للأكلات الشعبية.
- مسار للمعالم التاريخية.
- إضافة نظام نقاط وإنجازات.
- Leaderboard.
- QR Codes للحصول على الأختام في الفعاليات.
- Location-based stamps.
- دعم لغات متعددة.
- إدارة المحطات من Django Admin.
- حسابات مستخدمين اختيارية.
- مشاركة الإنجازات اجتماعيًا.
- Progressive Web App.
- تطبيق Mobile مستقبلًا.

كما يمكن إعادة استخدام نفس الفكرة خارج اليوم الوطني في:

**السياحة، المتاحف، المعارض، الجامعات، الفعاليات والتجارب التعليمية.**

---

## 🔐 Privacy

لا يتطلب المشروع:

- بريد إلكتروني.
- رقم جوال.
- كلمة مرور.
- بيانات شخصية حساسة.

يعتمد فقط على اسم المستخدم والرمز الذي يختاره، مع استخدام Django Session لحفظ رحلته.

---

## 💻 Local Setup

### Windows

```powershell
py -m venv .venv

.\.venv\Scripts\python.exe -m pip install -r requirements.txt

.\.venv\Scripts\python.exe manage.py migrate

.\.venv\Scripts\python.exe manage.py runserver
```

ثم:

```text
http://127.0.0.1:8000/
```

### macOS / Linux

```bash
python3 -m venv .venv

.venv/bin/python -m pip install -r requirements.txt

.venv/bin/python manage.py migrate

.venv/bin/python manage.py runserver
```

---

## 🧪 Tests

```powershell
python manage.py test
```

---

## 🌐 Deployment

المشروع مجهز للنشر على Render.

### Build Command

```bash
./build.sh
```

### Start Command

```bash
gunicorn config.wsgi:application
```

ويتم استخدام PostgreSQL في بيئة الإنتاج.

---

## 🔒 Git Ignore

الملفات التالية لا يتم رفعها إلى GitHub:

```text
.venv/
__pycache__/
*.pyc
db.sqlite3
.local-secret
staticfiles/
.env
```

---

## 👩🏻‍💻 Developed By

**Areeg Thallab**

Software Engineering Student  
Backend & Web Development

---

<p align="center">
  🇸🇦 <strong>جواز المواطن</strong><br>
  رحلة رقمية صغيرة لاكتشاف جانب من وطن كبير.
</p>
