# 🎓 TutarBD — Subscription-Based Tuition & Tutor Platform (Web + Mobile App)

টিউটর এবং গার্ডিয়ান/স্টুডেন্টদের জন্য একটি সম্পূর্ণ **Subscription-based Tuition Finder Platform**। এখানে গার্ডিয়ানরা সম্পূর্ণ ফ্রি-তে টিউশন রিকোয়েস্ট পোস্ট করতে পারেন এবং টিউটররা সাবস্ক্রিপশন ফি (bKash / Nagad / SSLCommerz) প্রদানের মাধ্যমে টিউশনে Apply ও সরাসরি গার্ডিয়ানের কন্টাক্ট নম্বর দেখতে পারেন।

---

## 📂 প্রজেক্ট স্ট্রাকচার

1. **`web-app/` (Responsive Web App + Mobile Frame Preview + PWA)**
   - [`web-app/index.html`](web-app/index.html) — মূল অ্যাপ্লিকেশন ইন্টারফেস (Tutor View, Guardian Portal, Subscription Checkout, Admin Panel)
   - [`web-app/styles.css`](web-app/styles.css) — রেসপনসিভ UI ও Mobile App Frame ডিজাইন
   - [`web-app/app.js`](web-app/app.js) — সাবস্ক্রিপশন লক লজিক, bKash/Nagad/SSLCommerz পেমেন্ট সিমুলেটর ও ডেটা স্টোরেজ (`localStorage`)
   - [`web-app/manifest.json`](web-app/manifest.json) — PWA ম্যানিফেস্ট

2. **`flutter_app/` (Cross-Platform Android / iOS / Web App in Flutter)**
   - [`flutter_app/pubspec.yaml`](flutter_app/pubspec.yaml) — Flutter প্রজেক্ট কনফিগারেশন
   - [`flutter_app/lib/models/tuition_models.dart`](flutter_app/lib/models/tuition_models.dart) — ডেটা মডেল (`TuitionPost`, `SubscriptionPlan`, `TutorApplication`, `PaymentRequest`)
   - [`flutter_app/lib/main.dart`](flutter_app/lib/main.dart) — সম্পূর্ণ মোবাইল ও ওয়েব স্ক্রিনসমূহ

---

## ✨ মূল ফিচারসমূহ (Core Features)

### ১. 👨‍🏫 টিউটর ভিউ ও সাবস্ক্রিপশন লক (Tutor Flow)
- **আনসাবস্ক্রাইবড অবস্থায় লক:** টিউটরের সাবস্ক্রিপশন অ্যাক্টিভ না থাকলে গার্ডিয়ানের মোবাইল নম্বর মাস্ক করা থাকে (`01711-XXXXXX 🔒`) এবং **Apply** বাটনে ক্লিক করলে সাবস্ক্রিপশন চেকআউট পপ-আপ ওপেন হয়।
- **সাবস্ক্রিপশন প্ল্যান:**
  - **Starter Tutor Pack:** ৳২৯৯ / ১ মাস (১৫টি টিউশন Apply)
  - **Pro Tutor Pack:** ৳৬৯৯ / ৩ মাস (৫০টি টিউশন Apply + Priority Listing)
  - **Unlimited Yearly Pack:** ৳১,৪৯৯ / ১ বছর (আনলিমিটেড টিউশন Apply)
- **পেমেন্ট সিস্টেম (bKash / Nagad / SSLCommerz):**
  - **Instant Sandbox Payment:** এক ক্লিকে পেমেন্ট সম্পন্ন হয়ে সাথে সাথে সাবস্ক্রিপশন চালু হয়।
  - **Manual TrxID Verification:** টিউটর তার নম্বর ও `TrxID` সাবমিট করলে সেটি অ্যাডমিন প্যানেলে `Pending` হিসেবে জমা হয় এবং অ্যাডমিন `Approve` করলে সাবস্ক্রিপশন চালু হয়।

### ২. 👪 গার্ডিয়ান / স্টুডেন্ট পোর্টাল (Guardian Flow)
- ক্লাস, মিডিয়াম, বিষয়সমূহ, মাসিক সম্মানী (Salary), সপ্তাহে কত দিন, টিউটর জেন্ডার প্রিফারেন্স ও লোকেশন দিয়ে ফ্রি টিউশন রিকোয়েস্ট পোস্ট করা যায়।
- নিজের পোস্ট করা টিউশনে কোন কোন টিউটর আবেদন করেছেন তাদের বিশ্ববিদ্যালয়, অভিজ্ঞতা, ফোন নম্বর দেখা এবং **Shortlist / Hire** করার সুবিধা।

### ৩. 🛡️ অ্যাডমিন প্যানেল (Admin Panel)
- মোট টিউশন, পেন্ডিং সাবস্ক্রিপশন, আবেদন সংখ্যা এবং মোট রেভিনিউ ড্যাশবোর্ড।
- টিউটরদের পাঠানো bKash/Nagad পেমেন্ট রিকোয়েস্ট (`TrxID`) **Approve / Reject** করা।
- সকল টিউশন পোস্ট মডারেশন ও ডিলিট করার সুবিধা।

---

## 🚀 কীভাবে রান করবেন?

### অপশন ১: Web App (সাথে সাথে ব্রাউজারে ওপেন করুন)
`d:\Tutar\web-app\index.html` ফাইলটি যেকোনো ব্রাউজারে ডাবল-ক্লিক করে ওপেন করুন অথবা লোকাল সার্ভার চালান:
```powershell
python -m http.server 8080 --directory d:\Tutar\web-app
```
এরপর ব্রাউজারে `http://localhost:8080` ভিজিট করুন। উপরের **Role Switcher** বার থেকে ১ ক্লিকেই **Tutor**, **Guardian**, **Admin** এবং **📱 Mobile App View** টগল করে টেস্ট করতে পারবেন!

### অপশন ২: Flutter Mobile / Web App
```powershell
cd d:\Tutar\flutter_app
flutter run -d chrome
# অথবা Android Emulator / ফোনের জন্য:
flutter run
```

