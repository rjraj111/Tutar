// ============================================================================
// TutarBD — Subscription-Based Tuition Marketplace (Web + PWA + Full Bio-Data)
// ============================================================================

const STORAGE_KEY = 'tutarbd_state_v2';

const SUBSCRIPTION_PLANS = [
  {
    id: 'starter_monthly',
    name: 'Starter Tutor Pack',
    duration: '১ মাস (30 Days)',
    price: 299,
    credits: 15,
    popular: false,
    features: [
      '১৫টি ভেরিফাইড টিউশনে Apply করার সুযোগ',
      'গার্ডিয়ানের সরাসরি মোবাইল নম্বর আনলক',
      'টিউশন পাওয়ার পর কোনো মিডিয়া কমিশন নেই',
      'ভেরিফাইড বায়োডাটা ও সিভি প্রোফাইল শেয়ারিং'
    ]
  },
  {
    id: 'pro_quarterly',
    name: 'Pro Tutor Pack',
    duration: '৩ মাস (90 Days)',
    price: 699,
    credits: 50,
    popular: true,
    features: [
      '৫০টি ভেরিফাইড টিউশনে Apply করার সুযোগ',
      'গার্ডিয়ানের সরাসরি নম্বর ও WhatsApp কন্টাক্ট',
      'গার্ডিয়ানের কাছে Priority Top Tutor হিসেবে প্রদর্শন',
      'Verified Pro Tutor ব্যাজ ও সম্পূর্ণ বায়োডাটা হাইলাইট'
    ]
  },
  {
    id: 'unlimited_yearly',
    name: 'Unlimited Yearly Pack',
    duration: '১ বছর (365 Days)',
    price: 1499,
    credits: 999,
    popular: false,
    features: [
      'আনলিমিটেড টিউশনে Apply করার সুবিধা',
      'সকল গার্ডিয়ানের সরাসরি কন্টাক্ট নম্বর আনলক',
      'Featured Tutor ব্যাজ ও সর্বোচ্চ অগ্রাধিকার',
      '০% মিডিয়া ফি — পুরো মাসের স্যালারি আপনার!'
    ]
  }
];

const INITIAL_STATE = {
  currentRole: 'tutor', // 'tutor' | 'guardian' | 'admin'
  currentView: 'tuition-board',
  currentTutorSubTab: 'edit-bio', // 'edit-bio' | 'preview-bio' | 'my-apps'
  mobileFrameMode: false,

  tutor: {
    id: 'TUT-101',
    name: 'আরিফুল ইসলাম',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '01715-223344',
    whatsapp: '01715-223344',
    email: 'ariful.cse.buet@gmail.com',
    nidOrStudentId: 'BUET-CSE-1905042',
    fatherInfo: 'রফিকুল ইসলাম (সিনিয়র শিক্ষক)',
    religion: 'ইসলাম, বাংলাদেশি',
    presentAddress: 'আহসানউল্লাহ হল, বুয়েট, পলাশী, ঢাকা',
    permanentAddress: 'কান্দিরপাড়, আদর্শ সদর, কুমিল্লা',
    // Educational Qualifications
    university: 'BUET (বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়)',
    department: 'Computer Science & Engineering (CSE)',
    yearCgpa: '4th Year (CGPA 3.78 / 4.00)',
    hscCollege: 'নটর ডেম কলেজ, ঢাকা',
    hscGroup: 'Science (Dhaka Board)',
    hscResult: '2020 — GPA 5.00 (Golden A+)',
    sscSchool: 'কুমিল্লা জিলা স্কুল',
    sscGroup: 'Science (Cumilla Board)',
    sscResult: '2018 — GPA 5.00 (Golden A+)',
    // Tuition Preferences & Experience
    experience: '৩ বছর (SSC, HSC ও Engineering Admission)',
    mediums: 'বাংলা মিডিয়াম, ইংলিশ ভার্সন',
    minSalary: 6000,
    preferredClasses: 'Class 9-10 (SSC), HSC 1st & 2nd Year, Admission Test',
    subjects: 'Higher Math, Physics, Chemistry, ICT',
    preferredLocations: 'ধানমন্ডি, কলাবাগান, আজিমপুর, শাহবাগ, ফার্মগেট, মোহাম্মদপুর',
    availability: 'সপ্তাহে ৩-৪ দিন (বিকেল ৫টা থেকে রাত ৯টা)',
    bioText: 'আমি গত ৩ বছর ধরে নটর ডেম কলেজ, ভিকারুননিসা ও ঢাকা কলেজের ৮ জনেরও বেশি HSC ও SSC স্টুডেন্টকে সফলভাবে পড়িয়েছি। বেসিক কনসেপ্ট ক্লিয়ার করে পড়ানো এবং নিয়মিত সাপ্তাহিক পরীক্ষার মাধ্যমে স্টুডেন্টের প্রস্তুতি নিশ্চিত করি।',
    // Subscription status
    isSubscribed: false,
    activePlanName: null,
    remainingCredits: 0,
    expiresAt: null
  },

  subscriptionRequests: [
    {
      id: 'PAY-901',
      tutorName: 'তানভীর আহমেদ (DU - Physics)',
      tutorPhone: '01819-556677',
      planId: 'pro_quarterly',
      planName: 'Pro Tutor Pack (৩ মাস)',
      amount: 699,
      gateway: 'bKash',
      senderNumber: '01819-556677',
      trxId: 'BK9823X71A',
      status: 'Pending',
      isCurrentTutor: false,
      createdAt: '১০ মিনিট আগে'
    }
  ],

  tuitions: [
    {
      id: 'TUI-2041',
      title: 'HSC 1st Year স্টুডেন্টের জন্য Physics ও Higher Math টিউটর প্রয়োজন',
      studentClass: 'HSC 1st / 2nd Year',
      medium: 'বাংলা মিডিয়াম',
      subjects: ['Physics', 'Higher Math'],
      salary: 7000,
      daysPerWeek: '৪ দিন/সপ্তাহ',
      preferredGender: 'Any',
      location: 'ধানমন্ডি, ঢাকা',
      address: 'রোড ৯/এ, ইবনে সিনা হাসপাতালের পাশে, ধানমন্ডি',
      guardianName: 'মাহমুদুল হাসান (অভিভাবক)',
      guardianPhone: '01711-987654',
      note: 'ইঞ্জিনিয়ারিং বা পাবলিক বিশ্ববিদ্যালয়ের অভিজ্ঞ টিউটর অগ্রাধিকার পাবেন। সন্ধ্যা ৬টার পর।',
      postedAt: '২৫ মিনিট আগে',
      status: 'Approved',
      isOwnGuardianPost: true,
      applicants: [
        {
          tutorId: 'TUT-209',
          tutorName: 'সাদিয়া রহমান',
          university: 'Dhaka University — Applied Mathematics',
          phone: '01612-889900',
          experience: '৪ বছরের অভিজ্ঞতা',
          coverLetter: 'আমি গত ৩ বছর ধরে ভিকারুননিসা ও ঢাকা কলেজের ৩ জন HSC স্টুডেন্টকে Physics ও Math পড়াচ্ছি।',
          appliedAt: '১০ মিনিট আগে',
          status: 'Shortlisted',
          biodata: {
            name: 'সাদিয়া রহমান',
            gender: 'Female',
            bloodGroup: 'B+',
            phone: '01612-889900',
            whatsapp: '01612-889900',
            email: 'sadia.math.du@gmail.com',
            nidOrStudentId: 'DU-AM-2020115',
            fatherInfo: 'মাহবুবুর রহমান (ব্যাংকার)',
            religion: 'ইসলাম, বাংলাদেশি',
            presentAddress: 'রোকেয়া হল, ঢাকা বিশ্ববিদ্যালয়, ঢাকা',
            permanentAddress: 'রাজশাহী সদর, রাজশাহী',
            university: 'Dhaka University (ঢাকা বিশ্ববিদ্যালয়)',
            department: 'Applied Mathematics',
            yearCgpa: 'Final Year (CGPA 3.85 / 4.00)',
            hscCollege: 'হলি ক্রস কলেজ, ঢাকা',
            hscGroup: 'Science (Dhaka Board)',
            hscResult: '2019 — GPA 5.00',
            sscSchool: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
            sscGroup: 'Science (Dhaka Board)',
            sscResult: '2017 — GPA 5.00',
            experience: '৪ বছর (SSC, HSC ও English Version)',
            mediums: 'বাংলা মিডিয়াম, ইংলিশ ভার্সন',
            minSalary: 6500,
            preferredClasses: 'Class 8-10, HSC 1st & 2nd Year',
            subjects: 'Higher Math, Physics, General Math',
            preferredLocations: 'ধানমন্ডি, নিউ মার্কেট, আজিমপুর, কলাবাগান',
            availability: 'সপ্তাহে ৩-৪ দিন (বিকেল ৪টা - সন্ধ্যা ৭টা)',
            bioText: 'হলি ক্রস ও ঢাকা বিশ্ববিদ্যালয়ের ছাত্রী হিসেবে আমি গণিত ও পদার্থবিজ্ঞানের প্রতিটি অধ্যায় সহজ উদাহরণ ও শর্টকাট টেকনিক দিয়ে পড়াই।'
          }
        }
      ]
    },
    {
      id: 'TUI-2040',
      title: 'English Version Class 9 (SSC) স্টুডেন্টের জন্য Science Group টিউটর চাই',
      studentClass: 'Class 9 - 10 (SSC)',
      medium: 'ইংলিশ ভার্সন',
      subjects: ['General Math', 'Higher Math', 'Chemistry'],
      salary: 8500,
      daysPerWeek: '৪ দিন/সপ্তাহ',
      preferredGender: 'Male',
      location: 'উত্তরা, ঢাকা',
      address: 'সেক্টর ৭, রোড ১২, উত্তরা, ঢাকা',
      guardianName: 'ফারজানা করিম (অভিভাবক)',
      guardianPhone: '01812-334455',
      note: 'ইংলিশ ভার্সনের বই পড়ানোর পূর্ব অভিজ্ঞতা থাকতে হবে।',
      postedAt: '১ ঘণ্টা আগে',
      status: 'Approved',
      isOwnGuardianPost: true,
      applicants: []
    },
    {
      id: 'TUI-2039',
      title: 'O Level (Cambridge) স্টুডেন্টের জন্য Math-D ও Additional Math টিউটর',
      studentClass: 'O Level / A Level',
      medium: 'ইংলিশ মিডিয়াম (O/A Level)',
      subjects: ['Mathematics D', 'Add Math', 'Physics'],
      salary: 12000,
      daysPerWeek: '৩ দিন/সপ্তাহ',
      preferredGender: 'Any',
      location: 'গুলশান / বনানী, ঢাকা',
      address: 'বনানী ব্লক ই, রোড ১১, ঢাকা',
      guardianName: 'ব্যারিস্টার রাশেদ চৌধুরী',
      guardianPhone: '01713-445566',
      note: 'O/A Level ব্যাকগ্রাউন্ড অথবা অভিজ্ঞ টিউটর আবশ্যক।',
      postedAt: '৩ ঘণ্টা আগে',
      status: 'Approved',
      isOwnGuardianPost: false,
      applicants: []
    },
    {
      id: 'TUI-2038',
      title: 'Class 7 ছাত্রীকে সকল বিষয় পড়ানোর জন্য Female টিউটর প্রয়োজন',
      studentClass: 'Class 5 - 8',
      medium: 'বাংলা মিডিয়াম',
      subjects: ['English', 'Math', 'General Science'],
      salary: 5000,
      daysPerWeek: '৫ দিন/সপ্তাহ',
      preferredGender: 'Female',
      location: 'মিরপুর, ঢাকা',
      address: 'মিরপুর ১০, সেনপাড়া পর্বতা, ঢাকা',
      guardianName: 'নুসরাত জাহান',
      guardianPhone: '01914-778899',
      note: 'শুধুমাত্র ফিমেল টিউটর আবেদন করবেন। বিকেল ৪টা থেকে ৫:৩০টা।',
      postedAt: '৫ ঘণ্টা আগে',
      status: 'Approved',
      isOwnGuardianPost: false,
      applicants: []
    },
    {
      id: 'TUI-2037',
      title: 'Engineering Admission (BUET/CKRUET) পরীক্ষার্থীর জন্য গাইড ও মেন্টর টিউটর',
      studentClass: 'University Admission',
      medium: 'অ্যাডমিশন টেস্ট',
      subjects: ['Physics', 'Chemistry', 'Math'],
      salary: 10000,
      daysPerWeek: '৩ দিন/সপ্তাহ',
      preferredGender: 'Any',
      location: 'মোহাম্মদপুর, ঢাকা',
      address: 'তাজমহল রোড, মোহাম্মদপুর, ঢাকা',
      guardianName: 'আনোয়ার হোসেন',
      guardianPhone: '01552-667788',
      note: 'BUET বা সমমানের ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয়ে অধ্যয়নরত হতে হবে।',
      postedAt: 'গতকাল',
      status: 'Approved',
      isOwnGuardianPost: false,
      applicants: []
    },
    {
      id: 'TUI-2036',
      title: 'SSC পরীক্ষার্থীর জন্য English ও ICT স্পেশাল কেয়ার টিউটর',
      studentClass: 'Class 9 - 10 (SSC)',
      medium: 'বাংলা মিডিয়াম',
      subjects: ['English 1st & 2nd', 'ICT'],
      salary: 5500,
      daysPerWeek: '৩ দিন/সপ্তাহ',
      preferredGender: 'Any',
      location: 'চট্টগ্রাম',
      address: 'খুলশী আবাসিক এলাকা, রোড ৩, চট্টগ্রাম',
      guardianName: 'কামরুল ইসলাম',
      guardianPhone: '01817-112233',
      note: 'বেসিক গ্রামার ও রাইটিং স্কিল উন্নয়নে যত্নশীল হতে হবে।',
      postedAt: 'গতকাল',
      status: 'Approved',
      isOwnGuardianPost: false,
      applicants: []
    }
  ]
};

let state = loadState();
let selectedPlanForCheckout = SUBSCRIPTION_PLANS[1];
let selectedGateway = 'bKash';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new tutor biodata fields exist
      parsed.tutor = { ...INITIAL_STATE.tutor, ...(parsed.tutor || {}) };
      return parsed;
    }
  } catch (e) {
    console.warn('Could not read localStorage:', e);
  }
  return JSON.parse(JSON.stringify(INITIAL_STATE));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save localStorage:', e);
  }
  // Optional sync to SQLite backend if running via server.py
  if (location.protocol.startsWith('http')) {
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state })
    }).catch(() => {});
  }
}

function resetDemoData() {
  state = JSON.parse(JSON.stringify(INITIAL_STATE));
  saveState();
  renderAll();
  showToast('🔄 ডেমো ডেটা ও বায়োডাটা সফলভাবে রিসেট করা হয়েছে!');
}

// ============================================================================
// Role & View Navigation
// ============================================================================
function switchRole(role) {
  state.currentRole = role;
  if (role === 'tutor') {
    state.currentView = 'tuition-board';
  } else if (role === 'guardian') {
    state.currentView = 'guardian-portal';
  } else if (role === 'admin') {
    state.currentView = 'admin-panel';
  }
  saveState();
  renderAll();
  const roleNames = {
    tutor: '👨‍🏫 টিউটর ভিউ (Tutor Mode)',
    guardian: '👪 গার্ডিয়ান / স্টুডেন্ট ভিউ (Guardian Mode)',
    admin: '🛡️ অ্যাডমিন প্যানেল (Admin Mode)'
  };
  showToast(`সুইচ করা হয়েছে: ${roleNames[role]}`);
}

function navigateView(viewId) {
  state.currentView = viewId;
  saveState();
  renderAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTutorSubTab(subTabId) {
  state.currentTutorSubTab = subTabId;
  saveState();
  renderTutorDashboard();
}

function toggleMobileFrame() {
  state.mobileFrameMode = !state.mobileFrameMode;
  saveState();
  const wrapper = document.getElementById('appViewportWrapper');
  wrapper.classList.toggle('mobile-frame-mode', state.mobileFrameMode);
  showToast(state.mobileFrameMode ? '📱 Mobile App প্রিভিউ চালু হয়েছে' : '🖥️ Full Desktop প্রিভিউ চালু হয়েছে');
}

function toggleQuickSubscription() {
  state.tutor.isSubscribed = !state.tutor.isSubscribed;
  if (state.tutor.isSubscribed) {
    state.tutor.activePlanName = 'Pro Tutor Pack (৩ মাস)';
    state.tutor.remainingCredits = 50;
    state.tutor.expiresAt = '2027-02-08';
    showToast('✅ ডেমো: টিউটর সাবস্ক্রিপশন ACTIVE করা হয়েছে! এখন যেকোনো টিউশনে Apply ও নম্বর দেখতে পারবেন।');
  } else {
    state.tutor.activePlanName = null;
    state.tutor.remainingCredits = 0;
    state.tutor.expiresAt = null;
    showToast('🔒 ডেমো: টিউটর সাবস্ক্রিপশন INACTIVE করা হয়েছে! এখন Apply ও নম্বর লক থাকবে।');
  }
  saveState();
  renderAll();
}

// ============================================================================
// Master Render Function
// ============================================================================
function renderAll() {
  document.getElementById('appViewportWrapper').classList.toggle('mobile-frame-mode', !!state.mobileFrameMode);

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === state.currentRole);
  });

  const pendingCount = state.subscriptionRequests.filter(r => r.status === 'Pending').length;
  const adminBadge = document.getElementById('adminPendingBadge');
  adminBadge.textContent = pendingCount;
  adminBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';

  const quickBtn = document.getElementById('quickSubToggleBtn');
  if (state.tutor.isSubscribed) {
    quickBtn.textContent = '✅ Subscribed (আনসাবস্ক্রাইব টেস্ট করুন)';
    quickBtn.style.background = '#10b981';
  } else {
    quickBtn.textContent = '🔒 Unsubscribed (১-ক্লিকে Subscribed টেস্ট করুন)';
    quickBtn.style.background = '#f59e0b';
  }

  renderNavbar();

  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `view-${state.currentView}`);
  });

  renderTuitionBoard();
  renderSubscriptionsView();
  renderTutorDashboard();
  renderGuardianPortal();
  renderAdminPanel();
}

function renderNavbar() {
  const navContainer = document.getElementById('mainNavLinks');
  const mobNav = document.getElementById('mobileBottomNav');
  const statusPill = document.getElementById('userStatusPill');
  const heroActions = document.getElementById('heroActionButtons');

  let navItems = [];
  if (state.currentRole === 'tutor') {
    navItems = [
      { id: 'tuition-board', icon: '🔍', label: 'টিউশন জব বোর্ড' },
      { id: 'subscriptions', icon: '💎', label: 'সাবস্ক্রিপশন প্ল্যান' },
      { id: 'tutor-dashboard', icon: '📄', label: 'আমার বায়োডাটা ও আবেদন' }
    ];
  } else if (state.currentRole === 'guardian') {
    navItems = [
      { id: 'guardian-portal', icon: '📢', label: 'টিউশন পোস্ট ও আবেদনকারী' },
      { id: 'tuition-board', icon: '🌐', label: 'সকল টিউশন বোর্ড' }
    ];
  } else {
    navItems = [
      { id: 'admin-panel', icon: '🛡️', label: 'অ্যাডমিন ড্যাশবোর্ড' },
      { id: 'tuition-board', icon: '🔍', label: 'লাইভ টিউশন বোর্ড' },
      { id: 'subscriptions', icon: '💳', label: 'প্ল্যান প্রিভিউ' }
    ];
  }

  navContainer.innerHTML = navItems
    .map(item => `
      <button class="nav-item ${state.currentView === item.id ? 'active' : ''}" onclick="navigateView('${item.id}')">
        ${item.icon} ${item.label}
      </button>
    `)
    .join('');

  mobNav.innerHTML = navItems
    .map(item => `
      <button class="mob-nav-btn ${state.currentView === item.id ? 'active' : ''}" onclick="navigateView('${item.id}')">
        <span style="font-size:1.2rem">${item.icon}</span>
        <span>${item.label}</span>
      </button>
    `)
    .join('');

  if (state.currentRole === 'tutor') {
    if (state.tutor.isSubscribed) {
      statusPill.innerHTML = `
        <span class="status-pill subscribed">
          ✅ ${state.tutor.activePlanName} (${state.tutor.remainingCredits} Apply বাকি)
        </span>
      `;
    } else {
      statusPill.innerHTML = `
        <span class="status-pill unverified">🔒 Free Tutor (Apply লকড)</span>
        <button class="btn btn-primary" style="padding:6px 12px;font-size:0.82rem" onclick="navigateView('subscriptions')">
          💎 সাবস্ক্রাইব করুন
        </button>
      `;
    }
  } else if (state.currentRole === 'guardian') {
    statusPill.innerHTML = `
      <span class="status-pill guardian">👪 গার্ডিয়ান অ্যাকাউন্ট (ফ্রি পোস্ট)</span>
    `;
  } else {
    statusPill.innerHTML = `
      <span class="status-pill subscribed">🛡️ Super Admin</span>
    `;
  }

  if (heroActions) {
    heroActions.innerHTML = `
      <button class="btn btn-emerald" onclick="switchRole('guardian')">
        📢 ফ্রি টিউশন রিকোয়েস্ট পোস্ট করুন (Guardian)
      </button>
      <button class="btn btn-outline" style="background:rgba(255,255,255,0.16);color:#fff;border-color:rgba(255,255,255,0.35)" onclick="navigateView('tutor-dashboard')">
        📄 টিউটর বায়োডাটা যোগ / প্রিভিউ করুন
      </button>
      ${
        !state.tutor.isSubscribed
          ? `<button class="btn btn-amber" onclick="navigateView('subscriptions')">💎 টিউটর সাবস্ক্রিপশন নিন (৳২৯৯ থেকে শুরু)</button>`
          : ''
      }
    `;
  }
}

// ============================================================================
// VIEW 1: Tuition Board & Subscription Gate Logic
// ============================================================================
function renderTuitionBoard() {
  const approvedTuitions = state.tuitions.filter(t => t.status === 'Approved');
  document.getElementById('statTotalTuitions').textContent = approvedTuitions.length;
  document.getElementById('statTutorSubStatus').textContent = state.tutor.isSubscribed ? 'PRO Active' : 'Free (Locked)';

  const bannerEl = document.getElementById('tutorSubBanner');
  const pendingReq = state.subscriptionRequests.find(r => r.isCurrentTutor && r.status === 'Pending');

  if (state.tutor.isSubscribed) {
    bannerEl.innerHTML = `
      <div class="banner-box banner-unlocked">
        <div>
          <strong>🎉 আপনার টিউটর সাবস্ক্রিপশন সচল আছে (${state.tutor.activePlanName})!</strong>
          <p style="font-size:0.88rem">আপনি গার্ডিয়ানদের সরাসরি ফোন নম্বর দেখতে পারবেন এবং বাকি <strong>${state.tutor.remainingCredits}টি</strong> টিউশনে আপনার সম্পূর্ণ বায়োডাটা সহ সাথে সাথে Apply করতে পারবেন।</p>
        </div>
        <button class="btn btn-emerald" onclick="navigateView('tutor-dashboard')">📄 আমার বায়োডাটা ও আবেদন</button>
      </div>
    `;
  } else if (pendingReq) {
    bannerEl.innerHTML = `
      <div class="banner-box banner-locked">
        <div>
          <strong>⏳ আপনার সাবস্ক্রিপশন পেমেন্ট ভেরিফিকেশনের অপেক্ষায় আছে (TrxID: ${pendingReq.trxId})</strong>
          <p style="font-size:0.88rem">অ্যাডমিন প্যানেল থেকে পেমেন্ট Approve করলেই আপনার সাবস্ক্রিপশন চালু হয়ে যাবে। (উপরের <strong>🛡️ অ্যাডমিন প্যানেল</strong> বাটনে ক্লিক করে Approve করুন!)</p>
        </div>
        <button class="btn btn-primary" onclick="switchRole('admin')">🛡️ অ্যাডমিন প্যানেলে গিয়ে Approve করুন</button>
      </div>
    `;
  } else {
    bannerEl.innerHTML = `
      <div class="banner-box banner-locked">
        <div>
          <strong>🔒 টিউশনে Apply করতে এবং গার্ডিয়ানের কন্টাক্ট নম্বর দেখতে সাবস্ক্রিপশন প্রয়োজন</strong>
          <p style="font-size:0.88rem">আমাদের প্ল্যাটফর্মে টিউশন পাওয়ার পর কোনো মিডিয়া কমিশন দিতে হয় না! মাত্র <strong>৳২৯৯/মাস</strong> সাবস্ক্রিপশন নিয়ে আপনার বায়োডাটা পাঠান ও সরাসরি গার্ডিয়ানের সাথে যোগাযোগ করুন।</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline" onclick="navigateView('tutor-dashboard')">📝 আগে বায়োডাটা সাজান</button>
          <button class="btn btn-primary" onclick="navigateView('subscriptions')">💎 সাবস্ক্রিপশন প্ল্যান দেখুন</button>
        </div>
      </div>
    `;
  }

  const q = (document.getElementById('searchQuery')?.value || '').trim().toLowerCase();
  const loc = document.getElementById('filterLocation')?.value || 'all';
  const med = document.getElementById('filterMedium')?.value || 'all';
  const gen = document.getElementById('filterGender')?.value || 'all';

  const filtered = approvedTuitions.filter(t => {
    const matchQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.location.toLowerCase().includes(q) ||
      t.studentClass.toLowerCase().includes(q) ||
      t.subjects.join(' ').toLowerCase().includes(q);
    const matchLoc = loc === 'all' || t.location === loc;
    const matchMed = med === 'all' || t.medium === med;
    const matchGen = gen === 'all' || t.preferredGender === 'Any' || t.preferredGender === gen;
    return matchQuery && matchLoc && matchMed && matchGen;
  });

  document.getElementById('tuitionCountBadge').textContent = `${filtered.length} টি টিউশন পাওয়া গেছে`;

  const container = document.getElementById('tuitionCardsContainer');
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align:center; padding: 40px;">
        <h3>😕 এই ফিল্টারে কোনো টিউশন পাওয়া যায়নি</h3>
        <p class="text-muted">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(t => {
      const alreadyApplied = t.applicants.some(a => a.tutorId === state.tutor.id);
      const canSeeContact = state.tutor.isSubscribed || state.currentRole === 'admin' || t.isOwnGuardianPost;
      const maskedPhone = t.guardianPhone.slice(0, 5) + '-XXXXXX';

      return `
        <div class="tuition-card">
          <div>
            <div class="tuition-top">
              <span class="job-id">#${t.id}</span>
              <span class="job-time">🕒 ${t.postedAt} • 📍 ${t.location}</span>
            </div>
            <h3 class="tuition-title">${escapeHtml(t.title)}</h3>

            <div class="subject-tags">
              ${t.subjects.map(s => `<span class="subject-tag">📘 ${escapeHtml(s)}</span>`).join('')}
            </div>

            <div class="tuition-meta-grid">
              <div class="meta-item">
                <span class="meta-label">ক্লাস / লেভেল</span>
                <span class="meta-val">${escapeHtml(t.studentClass)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">মিডিয়াম</span>
                <span class="meta-val">${escapeHtml(t.medium)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">সপ্তাহে পড়াতে হবে</span>
                <span class="meta-val">${escapeHtml(t.daysPerWeek)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">মাসিক সম্মানী (Salary)</span>
                <span class="salary-highlight">৳ ${Number(t.salary).toLocaleString('bn-BD')} / মাস</span>
              </div>
            </div>

            <p class="text-muted" style="font-size:0.84rem; margin-bottom: 10px;">
              <strong>🏠 ঠিকানা:</strong> ${escapeHtml(t.address)}<br/>
              ${t.note ? `<strong>📝 নোট:</strong> ${escapeHtml(t.note)}` : ''}
            </p>

            ${
              canSeeContact
                ? `<div class="guardian-contact-box contact-unlocked">
                    <div>
                      <strong>📞 গার্ডিয়ান: ${escapeHtml(t.guardianName)}</strong><br/>
                      <span>মোবাইল: <strong>${escapeHtml(t.guardianPhone)}</strong> (আনলকড)</span>
                    </div>
                    <a href="tel:${escapeHtml(t.guardianPhone)}" class="btn btn-emerald" style="padding:6px 12px;font-size:0.8rem;text-decoration:none;">📲 কল করুন</a>
                  </div>`
                : `<div class="guardian-contact-box contact-locked">
                    <div>
                      <strong>🔒 গার্ডিয়ান নম্বর: ${maskedPhone}</strong><br/>
                      <span style="font-size:0.78rem">সাবস্ক্রিপশন নিলে সম্পূর্ণ নম্বর ও সরাসরি Apply আনলক হবে</span>
                    </div>
                    <button class="btn btn-amber" style="padding:6px 10px;font-size:0.78rem" onclick="openSubscriptionPrompt('${t.id}')">আনলক করুন</button>
                  </div>`
            }
          </div>

          <div class="tuition-footer">
            <span class="text-muted" style="font-size:0.82rem">
              👨‍🏫 প্রিফারেন্স: <strong>${t.preferredGender === 'Any' ? 'Male / Female' : t.preferredGender}</strong> • আবেদন: <strong>${t.applicants.length} জন</strong>
            </span>

            ${
              alreadyApplied
                ? `<button class="btn btn-emerald" disabled>✅ আবেদন করা হয়েছে</button>`
                : state.tutor.isSubscribed
                  ? `<button class="btn btn-primary" onclick="openApplyModal('${t.id}')">✉️ Apply Now</button>`
                  : `<button class="btn btn-primary" onclick="openSubscriptionPrompt('${t.id}')">🔒 Apply করতে সাবস্ক্রাইব করুন</button>`
            }
          </div>
        </div>
      `;
    })
    .join('');
}

// ============================================================================
// Subscription Lock & Payment Checkout Flow (bKash / Nagad / SSLCommerz)
// ============================================================================
function openSubscriptionPrompt(tuitionId) {
  const tuition = state.tuitions.find(t => t.id === tuitionId);
  openPaymentModal(SUBSCRIPTION_PLANS[1].id, tuition);
}

function openPaymentModal(planId, targetTuition = null) {
  selectedPlanForCheckout = SUBSCRIPTION_PLANS.find(p => p.id === planId) || SUBSCRIPTION_PLANS[1];
  const modal = document.getElementById('paymentModal');
  modal.classList.add('open');
  renderPaymentModalContent(targetTuition);
}

function selectGateway(gw) {
  selectedGateway = gw;
  renderPaymentModalContent();
}

function renderPaymentModalContent(targetTuition = null) {
  const plan = selectedPlanForCheckout;
  const body = document.getElementById('paymentModalBody');

  const merchantNumbers = {
    bKash: '01700-112233 (bKash Merchant)',
    Nagad: '01800-445566 (Nagad Merchant)',
    SSLCommerz: 'Online Instant Card / Mobile Banking Gateway'
  };

  body.innerHTML = `
    ${
      targetTuition
        ? `<div class="banner-box banner-locked" style="margin-bottom:16px;padding:12px">
            <div>
              <strong>🔒 "${escapeHtml(targetTuition.title)}"</strong> টিউশনটিতে আপনার বায়োডাটা সহ Apply করতে ও গার্ডিয়ানের নম্বর দেখতে একটি সাবস্ক্রিপশন প্ল্যান অ্যাক্টিভ করুন।
            </div>
          </div>`
        : ''
    }

    <div class="form-group">
      <label>📦 সাবস্ক্রিপশন প্ল্যান নির্বাচন করুন</label>
      <select onchange="changeModalPlan(this.value)">
        ${SUBSCRIPTION_PLANS.map(
          p => `<option value="${p.id}" ${p.id === plan.id ? 'selected' : ''}>${p.name} — ৳${p.price} (${p.duration} • ${p.credits === 999 ? 'Unlimited' : p.credits} Apply)</option>`
        ).join('')}
      </select>
    </div>

    <label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">💳 পেমেন্ট মেথড বেছে নিন</label>
    <div class="gateway-tabs">
      <button type="button" class="gateway-btn ${selectedGateway === 'bKash' ? 'active-bkash' : ''}" onclick="selectGateway('bKash')">
        💗 bKash
      </button>
      <button type="button" class="gateway-btn ${selectedGateway === 'Nagad' ? 'active-nagad' : ''}" onclick="selectGateway('Nagad')">
        🧡 Nagad
      </button>
      <button type="button" class="gateway-btn ${selectedGateway === 'SSLCommerz' ? 'active-ssl' : ''}" onclick="selectGateway('SSLCommerz')">
        💳 SSLCommerz
      </button>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px;border-radius:12px;margin-bottom:16px;font-size:0.88rem">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span>নির্বাচিত প্ল্যান:</span>
        <strong>${plan.name} (${plan.duration})</strong>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span>পেমেন্ট গেটওয়ে:</span>
        <strong>${selectedGateway} — ${merchantNumbers[selectedGateway]}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:1.05rem;color:var(--primary)">
        <span>মোট প্রদেয় ফি:</span>
        <strong>৳ ${plan.price} BDT</strong>
      </div>
    </div>

    <div style="background:#ecfdf5;border:1px solid #6ee7b7;padding:14px;border-radius:12px;margin-bottom:16px">
      <strong style="color:#065f46;display:block;margin-bottom:6px">⚡ অপশন ১: ইনস্ট্যান্ট স্যান্ডবক্স পেমেন্ট (অটো অ্যাক্টিভেশন)</strong>
      <p style="font-size:0.82rem;color:#047857;margin-bottom:10px">
        স্যান্ডবক্স গেটওয়ে দিয়ে পেমেন্ট করলে সাথে সাথেই আপনার সাবস্ক্রিপশন চালু হয়ে যাবে এবং এখনই টিউশনে Apply করতে পারবেন।
      </p>
      <button type="button" class="btn btn-emerald btn-block" onclick="completeInstantSandboxPayment()">
        ✅ Pay ৳${plan.price} with ${selectedGateway} Sandbox (Instant Active)
      </button>
    </div>

    <form onsubmit="submitManualPaymentRequest(event)" style="border-top:1px solid var(--border);padding-top:14px">
      <strong style="display:block;margin-bottom:8px">🧾 অপশন ২: ম্যানুয়াল সেন্ড মানি / পেমেন্ট (Admin Verification ফ্লো)</strong>
      <div class="form-row-2">
        <div class="form-group">
          <label>আপনার ${selectedGateway} নম্বর *</label>
          <input type="text" id="paySenderNum" value="${state.tutor.phone}" placeholder="017XXXXXXXX" required />
        </div>
        <div class="form-group">
          <label>Transaction ID (TrxID) *</label>
          <input type="text" id="payTrxId" value="TXN${Math.floor(100000 + Math.random() * 900000)}" required />
        </div>
      </div>
      <button type="submit" class="btn btn-outline btn-block">
        📤 ভেরিফিকেশনের জন্য TrxID জমা দিন (Admin Approval)
      </button>
    </form>
  `;
}

function changeModalPlan(planId) {
  selectedPlanForCheckout = SUBSCRIPTION_PLANS.find(p => p.id === planId) || SUBSCRIPTION_PLANS[1];
  renderPaymentModalContent();
}

function completeInstantSandboxPayment() {
  const plan = selectedPlanForCheckout;
  state.tutor.isSubscribed = true;
  state.tutor.activePlanName = `${plan.name}`;
  state.tutor.remainingCredits = plan.credits;
  state.tutor.expiresAt = '2027-02-08';

  state.subscriptionRequests.unshift({
    id: 'PAY-' + Math.floor(100 + Math.random() * 900),
    tutorName: `${state.tutor.name} (${state.tutor.university})`,
    tutorPhone: state.tutor.phone,
    planId: plan.id,
    planName: `${plan.name} (${plan.duration})`,
    amount: plan.price,
    gateway: selectedGateway,
    senderNumber: state.tutor.phone,
    trxId: 'SANDBOX-' + Math.floor(10000 + Math.random() * 90000),
    status: 'Approved',
    isCurrentTutor: true,
    createdAt: 'এইমাত্র'
  });

  saveState();
  closeModal('paymentModal');
  renderAll();
  showToast(`🎉 অভিনন্দন! ৳${plan.price} পেমেন্ট সফল হয়েছে এবং আপনার ${plan.name} সচল হয়েছে!`);
}

function submitManualPaymentRequest(e) {
  e.preventDefault();
  const plan = selectedPlanForCheckout;
  const senderNumber = document.getElementById('paySenderNum').value.trim();
  const trxId = document.getElementById('payTrxId').value.trim().toUpperCase();

  state.subscriptionRequests.unshift({
    id: 'PAY-' + Math.floor(100 + Math.random() * 900),
    tutorName: `${state.tutor.name} (${state.tutor.university})`,
    tutorPhone: state.tutor.phone,
    planId: plan.id,
    planName: `${plan.name} (${plan.duration})`,
    amount: plan.price,
    gateway: selectedGateway,
    senderNumber,
    trxId,
    status: 'Pending',
    isCurrentTutor: true,
    createdAt: 'এইমাত্র'
  });

  saveState();
  closeModal('paymentModal');
  renderAll();
  showToast(`📤 আপনার পেমেন্ট রিকোয়েস্ট (TrxID: ${trxId}) জমা হয়েছে! অ্যাডমিন প্যানেল থেকে Approve করুন।`);
}

// ============================================================================
// Apply to Tuition Modal (Attaches Full Tutor Bio-Data)
// ============================================================================
function openApplyModal(tuitionId) {
  if (!state.tutor.isSubscribed) {
    openSubscriptionPrompt(tuitionId);
    return;
  }

  const tuition = state.tuitions.find(t => t.id === tuitionId);
  if (!tuition) return;

  const modal = document.getElementById('applyModal');
  const body = document.getElementById('applyModalBody');
  modal.classList.add('open');

  body.innerHTML = `
    <div style="background:#f8fafc;padding:14px;border-radius:10px;margin-bottom:16px">
      <span class="job-id">#${tuition.id}</span>
      <h4 style="margin-top:6px">${escapeHtml(tuition.title)}</h4>
      <p class="text-muted" style="font-size:0.85rem">
        📍 ${escapeHtml(tuition.location)} • 💰 ৳${tuition.salary}/মাস • 📞 গার্ডিয়ান: <strong>${escapeHtml(tuition.guardianPhone)}</strong>
      </p>
    </div>

    <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:12px;border-radius:10px;margin-bottom:14px;font-size:0.84rem;color:#065f46">
      <strong>📄 আপনার সংযুক্ত বায়োডাটা (Attached Bio-Data Summary):</strong><br/>
      • <strong>নাম:</strong> ${escapeHtml(state.tutor.name)} (${escapeHtml(state.tutor.gender)})<br/>
      • <strong>বিশ্ববিদ্যালয়:</strong> ${escapeHtml(state.tutor.university)} — ${escapeHtml(state.tutor.department)} (${escapeHtml(state.tutor.yearCgpa)})<br/>
      • <strong>HSC ও SSC:</strong> ${escapeHtml(state.tutor.hscCollege)} (${escapeHtml(state.tutor.hscResult)}) | ${escapeHtml(state.tutor.sscSchool)} (${escapeHtml(state.tutor.sscResult)})<br/>
      • <strong>অভিজ্ঞতা:</strong> ${escapeHtml(state.tutor.experience)}
    </div>

    <form onsubmit="submitTuitionApplication(event, '${tuition.id}')">
      <div class="form-group">
        <label>গার্ডিয়ানের জন্য সংক্ষিপ্ত নোট / কভার লেটার *</label>
        <textarea id="applyCoverNote" rows="3" required>আসসালামু আলাইকুম, আমি ${escapeHtml(state.tutor.university)}-এর ${escapeHtml(state.tutor.department)} বিভাগে পড়াশোনা করছি (${escapeHtml(state.tutor.yearCgpa)})। আমার ${escapeHtml(state.tutor.experience)} পড়ানোর অভিজ্ঞতা রয়েছে। আমার সম্পূর্ণ বায়োডাটা সংযুক্ত করলাম।</textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-lg">
        🚀 সম্পূর্ণ বায়োডাটা সহ আবেদন নিশ্চিত করুন
      </button>
    </form>
  `;
}

function submitTuitionApplication(e, tuitionId) {
  e.preventDefault();
  const tuition = state.tuitions.find(t => t.id === tuitionId);
  if (!tuition) return;

  const coverLetter = document.getElementById('applyCoverNote').value.trim();

  tuition.applicants.unshift({
    tutorId: state.tutor.id,
    tutorName: state.tutor.name,
    university: `${state.tutor.university} — ${state.tutor.department}`,
    phone: state.tutor.phone,
    experience: state.tutor.experience,
    coverLetter,
    appliedAt: 'এইমাত্র',
    status: 'Pending',
    biodata: JSON.parse(JSON.stringify(state.tutor))
  });

  if (state.tutor.remainingCredits > 0 && state.tutor.remainingCredits < 900) {
    state.tutor.remainingCredits -= 1;
  }

  saveState();
  closeModal('applyModal');
  renderAll();
  showToast(`✅ টিউশন #${tuition.id}-এ আপনার সম্পূর্ণ বায়োডাটা সহ আবেদন সম্পন্ন হয়েছে!`);
}

// ============================================================================
// VIEW 2: Subscription Plans View
// ============================================================================
function renderSubscriptionsView() {
  const summaryEl = document.getElementById('currentPlanSummaryCard');
  if (state.tutor.isSubscribed) {
    summaryEl.innerHTML = `
      <div class="banner-box banner-unlocked" style="margin-bottom:24px">
        <div>
          <h3>✅ আপনার বর্তমান সচল প্ল্যান: ${state.tutor.activePlanName}</h3>
          <p>বাকি Apply ক্রেডিট: <strong>${state.tutor.remainingCredits}টি</strong> • মেয়াদ: <strong>${state.tutor.expiresAt}</strong> পর্যন্ত</p>
        </div>
        <button class="btn btn-outline" onclick="toggleQuickSubscription()">আনসাবস্ক্রাইব টেস্ট করুন</button>
      </div>
    `;
  } else {
    summaryEl.innerHTML = '';
  }

  const grid = document.getElementById('pricingPlansContainer');
  grid.innerHTML = SUBSCRIPTION_PLANS.map(plan => `
    <div class="pricing-card ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<span class="popular-ribbon">🔥 সবচেয়ে জনপ্রিয়</span>' : ''}
      <div>
        <h3>${plan.name}</h3>
        <p class="text-muted">${plan.duration}</p>
        <div class="plan-price">৳${plan.price} <span>/ ${plan.duration}</span></div>
        <ul class="plan-features">
          ${plan.features.map(f => `<li>✅ <span>${f}</span></li>`).join('')}
        </ul>
      </div>
      <button class="btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-block btn-lg" onclick="openPaymentModal('${plan.id}')">
        💎 ${plan.name} নিন (৳${plan.price})
      </button>
    </div>
  `).join('');

  const histEl = document.getElementById('tutorPaymentHistoryContainer');
  const myPayments = state.subscriptionRequests;
  if (myPayments.length === 0) {
    histEl.innerHTML = `<p class="text-muted">এখনো কোনো পেমেন্ট রেকর্ড নেই।</p>`;
    return;
  }

  histEl.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>পেমেন্ট ID</th>
          <th>টিউটর</th>
          <th>প্ল্যান</th>
          <th>গেটওয়ে ও TrxID</th>
          <th>পরিমাণ</th>
          <th>স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        ${myPayments
          .map(
            p => `
          <tr>
            <td><strong>${p.id}</strong></td>
            <td>${escapeHtml(p.tutorName)}</td>
            <td>${escapeHtml(p.planName)}</td>
            <td>${p.gateway} • <code>${escapeHtml(p.trxId)}</code></td>
            <td><strong>৳${p.amount}</strong></td>
            <td>
              <span class="status-pill ${p.status === 'Approved' ? 'subscribed' : p.status === 'Pending' ? 'pending' : 'unverified'}">
                ${p.status === 'Approved' ? '✅ Approved' : p.status === 'Pending' ? '⏳ Pending' : '❌ Rejected'}
              </span>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
}

// ============================================================================
// VIEW 3: Complete Tutor Bio-Data Builder, CV Preview & My Applications
// ============================================================================
function renderTutorDashboard() {
  const t = state.tutor;
  const subTab = state.currentTutorSubTab || 'edit-bio';

  document.getElementById('tabBtnBioEdit')?.classList.toggle('active', subTab === 'edit-bio');
  document.getElementById('tabBtnBioPreview')?.classList.toggle('active', subTab === 'preview-bio');
  document.getElementById('tabBtnMyApps')?.classList.toggle('active', subTab === 'my-apps');

  document.querySelectorAll('.tutor-subtab').forEach(el => {
    el.classList.toggle('active', el.id === `tutorSubTab-${subTab}`);
  });

  // Populate Form Fields
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('inputTutorName', t.name);
  setVal('inputTutorGender', t.gender);
  setVal('inputTutorBlood', t.bloodGroup);
  setVal('inputTutorPhone', t.phone);
  setVal('inputTutorWhatsapp', t.whatsapp);
  setVal('inputTutorEmail', t.email);
  setVal('inputTutorNid', t.nidOrStudentId);
  setVal('inputTutorFather', t.fatherInfo);
  setVal('inputTutorReligion', t.religion);
  setVal('inputTutorPresentAddr', t.presentAddress);
  setVal('inputTutorPermanentAddr', t.permanentAddress);

  setVal('inputTutorUni', t.university);
  setVal('inputTutorDept', t.department);
  setVal('inputTutorYearCgpa', t.yearCgpa);
  setVal('inputTutorHscCollege', t.hscCollege);
  setVal('inputTutorHscGroup', t.hscGroup);
  setVal('inputTutorHscResult', t.hscResult);
  setVal('inputTutorSscSchool', t.sscSchool);
  setVal('inputTutorSscGroup', t.sscGroup);
  setVal('inputTutorSscResult', t.sscResult);

  setVal('inputTutorExp', t.experience);
  setVal('inputTutorMediums', t.mediums);
  setVal('inputTutorMinSalary', t.minSalary);
  setVal('inputTutorClasses', t.preferredClasses);
  setVal('inputTutorSubjects', t.subjects);
  setVal('inputTutorLocations', t.preferredLocations);
  setVal('inputTutorAvailability', t.availability);
  setVal('inputTutorBioText', t.bioText);

  // Render CV Preview Card
  const cvContainer = document.getElementById('tutorBiodataCvCard');
  if (cvContainer) {
    cvContainer.innerHTML = buildBiodataCvHtml(t, true);
  }

  // My Applications Count & List
  const myAppliedTuitions = state.tuitions.filter(tui =>
    tui.applicants.some(a => a.tutorId === state.tutor.id)
  );
  const countBadge = document.getElementById('myAppsCountBadge');
  if (countBadge) countBadge.textContent = myAppliedTuitions.length;

  const listEl = document.getElementById('tutorApplicationsList');
  if (!listEl) return;

  if (myAppliedTuitions.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center;padding:32px;background:#f8fafc;border-radius:12px">
        <h4>আপনি এখনো কোনো টিউশনে আবেদন করেননি</h4>
        <p class="text-muted" style="margin:8px 0 16px">টিউশন জব বোর্ড থেকে আপনার পছন্দের টিউশনে Apply করুন।</p>
        <button class="btn btn-primary" onclick="navigateView('tuition-board')">🔍 টিউশন খুঁজুন</button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = myAppliedTuitions
    .map(tui => {
      const myApp = tui.applicants.find(a => a.tutorId === state.tutor.id);
      return `
        <div style="border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px">
            <span class="job-id">#${tui.id} • ${escapeHtml(tui.location)}</span>
            <span class="status-pill ${myApp.status === 'Hired' || myApp.status === 'Shortlisted' ? 'subscribed' : 'pending'}">
              স্ট্যাটাস: ${myApp.status === 'Hired' ? '🎉 কনফার্মড / Hired' : myApp.status === 'Shortlisted' ? '⭐ Shortlisted' : '⏳ গার্ডিয়ান রিভিউ করছেন'}
            </span>
          </div>
          <h4>${escapeHtml(tui.title)}</h4>
          <p class="text-muted" style="font-size:0.86rem;margin:6px 0">
            💰 স্যালারি: <strong>৳${tui.salary}/মাস</strong> • 📞 গার্ডিয়ান (${escapeHtml(tui.guardianName)}): <strong>${escapeHtml(tui.guardianPhone)}</strong>
          </p>
          <p style="font-size:0.84rem;background:#f8fafc;padding:8px 12px;border-radius:8px">
            <strong>আপনার নোট:</strong> "${escapeHtml(myApp.coverLetter)}"
          </p>
        </div>
      `;
    })
    .join('');
}

function buildBiodataCvHtml(bio, showActionButtons = false) {
  return `
    <div class="cv-sheet">
      <div class="cv-header-banner">
        <div style="display:flex;align-items:center;gap:16px">
          <div class="avatar-circle" style="width:72px;height:72px;font-size:2.2rem">
            ${bio.gender === 'Female' ? '👩‍🎓' : '👨‍🎓'}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <h2 style="font-size:1.45rem">${escapeHtml(bio.name)}</h2>
              <span class="status-pill subscribed">✅ Verified Tutor Bio-Data</span>
            </div>
            <p style="font-weight:600;color:var(--primary)">${escapeHtml(bio.university)} — ${escapeHtml(bio.department)}</p>
            <p class="text-muted" style="font-size:0.86rem">
              📞 ${escapeHtml(bio.phone)} • 💬 WhatsApp: ${escapeHtml(bio.whatsapp || bio.phone)} • ✉️ ${escapeHtml(bio.email || 'N/A')}
            </p>
          </div>
        </div>
        ${
          showActionButtons
            ? `<div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn btn-outline" onclick="switchTutorSubTab('edit-bio')">✏️ বায়োডাটা এডিট করুন</button>
                <button class="btn btn-primary" onclick="window.print()">🖨️ প্রিন্ট / PDF সেভ করুন</button>
              </div>`
            : `<a href="tel:${escapeHtml(bio.phone)}" class="btn btn-emerald" style="text-decoration:none">📲 সরাসরি কল করুন</a>`
        }
      </div>

      <!-- Bio Summary -->
      <div style="margin-top:16px;background:#eef2ff;padding:14px 16px;border-radius:12px">
        <strong style="color:var(--primary-dark);display:block;margin-bottom:4px">💡 নিজের সম্পর্কে ও পড়ানোর কৌশল (Tutor Summary):</strong>
        <p style="font-size:0.92rem">${escapeHtml(bio.bioText)}</p>
      </div>

      <!-- Educational Qualifications Table -->
      <h4 style="margin:20px 0 10px;color:var(--secondary)">🎓 শিক্ষাগত যোগ্যতা (Educational Qualifications)</h4>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>পরীক্ষা / ডিগ্রি</th>
              <th>শিক্ষাপ্রতিষ্ঠানের নাম</th>
              <th>বিভাগ / গ্রুপ ও বোর্ড</th>
              <th>পাশের সন / বর্তমান অবস্থা ও ফলাফল</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Honours / B.Sc</strong></td>
              <td>${escapeHtml(bio.university)}</td>
              <td>${escapeHtml(bio.department)}</td>
              <td><strong>${escapeHtml(bio.yearCgpa)}</strong></td>
            </tr>
            <tr>
              <td><strong>HSC / A-Level</strong></td>
              <td>${escapeHtml(bio.hscCollege)}</td>
              <td>${escapeHtml(bio.hscGroup)}</td>
              <td><strong>${escapeHtml(bio.hscResult)}</strong></td>
            </tr>
            <tr>
              <td><strong>SSC / O-Level</strong></td>
              <td>${escapeHtml(bio.sscSchool)}</td>
              <td>${escapeHtml(bio.sscGroup)}</td>
              <td><strong>${escapeHtml(bio.sscResult)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Tuition Preferences -->
      <h4 style="margin:20px 0 10px;color:var(--secondary)">📘 টিউশন প্রিফারেন্স ও অভিজ্ঞতা (Tuition Information)</h4>
      <div class="cv-grid-2">
        <div class="cv-info-item">
          <span>টিউশন অভিজ্ঞতা (Experience)</span>
          <strong>${escapeHtml(bio.experience)}</strong>
        </div>
        <div class="cv-info-item">
          <span>পড়াতে ইচ্ছুক মিডিয়াম (Mediums)</span>
          <strong>${escapeHtml(bio.mediums)}</strong>
        </div>
        <div class="cv-info-item">
          <span>পছন্দের ক্লাসসমূহ (Preferred Classes)</span>
          <strong>${escapeHtml(bio.preferredClasses)}</strong>
        </div>
        <div class="cv-info-item">
          <span>পছন্দের বিষয়সমূহ (Subjects)</span>
          <strong>${escapeHtml(bio.subjects)}</strong>
        </div>
        <div class="cv-info-item">
          <span>পছন্দের এলাকা / লোকেশন (Preferred Areas)</span>
          <strong>${escapeHtml(bio.preferredLocations)}</strong>
        </div>
        <div class="cv-info-item">
          <span>প্রত্যাশিত সর্বনিম্ন সম্মানী ও সময়</span>
          <strong>৳${escapeHtml(bio.minSalary)}/মাস • ${escapeHtml(bio.availability || 'আলোচনা সাপেক্ষে')}</strong>
        </div>
      </div>

      <!-- Personal & Identity Details -->
      <h4 style="margin:20px 0 10px;color:var(--secondary)">🪪 ব্যক্তিগত ও পরিচয় তথ্য (Personal & Verification Info)</h4>
      <div class="cv-grid-2">
        <div class="cv-info-item">
          <span>NID / ভার্সিটি স্টুডেন্ট আইডি</span>
          <strong>${escapeHtml(bio.nidOrStudentId)}</strong>
        </div>
        <div class="cv-info-item">
          <span>লিঙ্গ, রক্তের গ্রুপ ও ধর্ম</span>
          <strong>${escapeHtml(bio.gender)} • Blood: ${escapeHtml(bio.bloodGroup)} • ${escapeHtml(bio.religion)}</strong>
        </div>
        <div class="cv-info-item">
          <span>পিতার নাম ও পেশা</span>
          <strong>${escapeHtml(bio.fatherInfo)}</strong>
        </div>
        <div class="cv-info-item">
          <span>বর্তমান ও স্থায়ী ঠিকানা</span>
          <strong>বর্তমান: ${escapeHtml(bio.presentAddress)} | স্থায়ী: ${escapeHtml(bio.permanentAddress)}</strong>
        </div>
      </div>
    </div>
  `;
}

function saveTutorProfile(e) {
  e.preventDefault();
  const t = state.tutor;
  t.name = document.getElementById('inputTutorName').value.trim();
  t.gender = document.getElementById('inputTutorGender').value;
  t.bloodGroup = document.getElementById('inputTutorBlood').value;
  t.phone = document.getElementById('inputTutorPhone').value.trim();
  t.whatsapp = document.getElementById('inputTutorWhatsapp').value.trim();
  t.email = document.getElementById('inputTutorEmail').value.trim();
  t.nidOrStudentId = document.getElementById('inputTutorNid').value.trim();
  t.fatherInfo = document.getElementById('inputTutorFather').value.trim();
  t.religion = document.getElementById('inputTutorReligion').value.trim();
  t.presentAddress = document.getElementById('inputTutorPresentAddr').value.trim();
  t.permanentAddress = document.getElementById('inputTutorPermanentAddr').value.trim();

  t.university = document.getElementById('inputTutorUni').value.trim();
  t.department = document.getElementById('inputTutorDept').value.trim();
  t.yearCgpa = document.getElementById('inputTutorYearCgpa').value.trim();
  t.hscCollege = document.getElementById('inputTutorHscCollege').value.trim();
  t.hscGroup = document.getElementById('inputTutorHscGroup').value.trim();
  t.hscResult = document.getElementById('inputTutorHscResult').value.trim();
  t.sscSchool = document.getElementById('inputTutorSscSchool').value.trim();
  t.sscGroup = document.getElementById('inputTutorSscGroup').value.trim();
  t.sscResult = document.getElementById('inputTutorSscResult').value.trim();

  t.experience = document.getElementById('inputTutorExp').value.trim();
  t.mediums = document.getElementById('inputTutorMediums').value.trim();
  t.minSalary = Number(document.getElementById('inputTutorMinSalary').value) || 5000;
  t.preferredClasses = document.getElementById('inputTutorClasses').value.trim();
  t.subjects = document.getElementById('inputTutorSubjects').value.trim();
  t.preferredLocations = document.getElementById('inputTutorLocations').value.trim();
  t.availability = document.getElementById('inputTutorAvailability').value.trim();
  t.bioText = document.getElementById('inputTutorBioText').value.trim();

  state.currentTutorSubTab = 'preview-bio';
  saveState();
  renderAll();
  showToast('💾 আপনার সম্পূর্ণ টিউটর বায়োডাটা সফলভাবে সেভ হয়েছে!');
}

function openApplicantBiodataModal(tuitionId, applicantIndex) {
  const tuition = state.tuitions.find(t => t.id === tuitionId);
  if (!tuition || !tuition.applicants[applicantIndex]) return;
  const app = tuition.applicants[applicantIndex];
  const bio = app.biodata || state.tutor;

  const modal = document.getElementById('biodataModal');
  const body = document.getElementById('biodataModalBody');
  modal.classList.add('open');
  body.innerHTML = buildBiodataCvHtml(bio, false);
}

// ============================================================================
// VIEW 4: Guardian Portal (Post Tuition & Review Tutor Applications + Bio-Data)
// ============================================================================
function submitNewTuition(e) {
  e.preventDefault();
  const title = document.getElementById('postTitle').value.trim();
  const studentClass = document.getElementById('postClass').value;
  const medium = document.getElementById('postMedium').value;
  const subjectsRaw = document.getElementById('postSubjects').value;
  const subjects = subjectsRaw.split(',').map(s => s.trim()).filter(Boolean);
  const salary = Number(document.getElementById('postSalary').value) || 5000;
  const daysPerWeek = document.getElementById('postDays').value;
  const preferredGender = document.getElementById('postGender').value;
  const location = document.getElementById('postLocation').value;
  const address = document.getElementById('postAddress').value.trim();
  const guardianName = document.getElementById('postGuardianName').value.trim();
  const guardianPhone = document.getElementById('postGuardianPhone').value.trim();
  const note = document.getElementById('postNote').value.trim();

  const newTuition = {
    id: 'TUI-' + Math.floor(2042 + Math.random() * 900),
    title,
    studentClass,
    medium,
    subjects: subjects.length ? subjects : ['All Subjects'],
    salary,
    daysPerWeek,
    preferredGender,
    location,
    address,
    guardianName,
    guardianPhone,
    note,
    postedAt: 'এইমাত্র',
    status: 'Approved',
    isOwnGuardianPost: true,
    applicants: []
  };

  state.tuitions.unshift(newTuition);
  saveState();
  e.target.reset();
  document.getElementById('postGuardianName').value = guardianName;
  document.getElementById('postGuardianPhone').value = guardianPhone;
  renderAll();
  showToast(`🎉 আপনার টিউশন রিকোয়েস্ট (#${newTuition.id}) সফলভাবে পাবলিশ হয়েছে!`);
}

function renderGuardianPortal() {
  const container = document.getElementById('guardianPostsContainer');
  const myPosts = state.tuitions.filter(t => t.isOwnGuardianPost);

  if (myPosts.length === 0) {
    container.innerHTML = `<p class="text-muted">আপনি এখনো কোনো টিউশন পোস্ট করেননি। বাম পাশের ফর্মটি পূরণ করে ফ্রি পোস্ট করুন।</p>`;
    return;
  }

  container.innerHTML = myPosts
    .map(t => `
      <div style="border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:16px;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <span class="job-id">#${t.id} • ${escapeHtml(t.location)}</span>
          <span class="status-pill subscribed">${t.applicants.length} জন টিউটর আবেদন করেছেন</span>
        </div>
        <h4 style="margin-bottom:6px">${escapeHtml(t.title)}</h4>
        <p class="text-muted" style="font-size:0.85rem;margin-bottom:12px">
          📚 ${escapeHtml(t.studentClass)} (${escapeHtml(t.medium)}) • 💰 ৳${t.salary}/মাস • 🗓️ ${escapeHtml(t.daysPerWeek)}
        </p>

        <div style="border-top:1px solid var(--border);padding-top:12px">
          <strong style="font-size:0.88rem;display:block;margin-bottom:8px">👨‍🏫 আবেদনকারী টিউটর ও তাদের বায়োডাটা:</strong>
          ${
            t.applicants.length === 0
              ? `<p class="text-muted" style="font-size:0.84rem">এখনো কোনো টিউটর আবেদন করেননি। (টিউটর ভিউ-তে গিয়ে এই টিউশনে Apply করে টেস্ট করুন!)</p>`
              : t.applicants
                  .map(
                    (app, idx) => `
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:10px">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
                      <div>
                        <strong>${escapeHtml(app.tutorName)}</strong>
                        <span class="text-muted" style="font-size:0.82rem"> — ${escapeHtml(app.university)}</span>
                      </div>
                      <span class="status-pill ${app.status === 'Hired' ? 'subscribed' : app.status === 'Shortlisted' ? 'pending' : 'unverified'}">
                        ${app.status}
                      </span>
                    </div>
                    <p style="font-size:0.83rem;margin:6px 0">
                      📞 মোবাইল: <strong>${escapeHtml(app.phone)}</strong> • অভিজ্ঞতা: ${escapeHtml(app.experience)}
                    </p>
                    <p style="font-size:0.82rem;color:#334155;margin-bottom:10px">"${escapeHtml(app.coverLetter)}"</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap">
                      <button class="btn btn-primary" style="padding:5px 12px;font-size:0.8rem" onclick="openApplicantBiodataModal('${t.id}', ${idx})">
                        📄 সম্পূর্ণ বায়োডাটা দেখুন (Full Bio-Data)
                      </button>
                      <button class="btn btn-emerald" style="padding:5px 12px;font-size:0.8rem" onclick="updateApplicantStatus('${t.id}', ${idx}, 'Hired')">
                        ✅ Hire / কনফার্ম করুন
                      </button>
                      <button class="btn btn-outline" style="padding:5px 12px;font-size:0.8rem" onclick="updateApplicantStatus('${t.id}', ${idx}, 'Shortlisted')">
                        ⭐ Shortlist করুন
                      </button>
                    </div>
                  </div>
                `
                  )
                  .join('')
          }
        </div>
      </div>
    `)
    .join('');
}

function updateApplicantStatus(tuitionId, applicantIndex, newStatus) {
  const tuition = state.tuitions.find(t => t.id === tuitionId);
  if (!tuition || !tuition.applicants[applicantIndex]) return;
  tuition.applicants[applicantIndex].status = newStatus;
  saveState();
  renderAll();
  showToast(`🎉 টিউটর ${tuition.applicants[applicantIndex].tutorName}-কে "${newStatus}" হিসেবে মার্ক করা হয়েছে!`);
}

// ============================================================================
// VIEW 5: Admin Control Panel
// ============================================================================
function renderAdminPanel() {
  const totalRevenue = state.subscriptionRequests
    .filter(r => r.status === 'Approved')
    .reduce((sum, r) => sum + Number(r.amount), 0);
  const pendingSubs = state.subscriptionRequests.filter(r => r.status === 'Pending').length;
  const totalApplications = state.tuitions.reduce((sum, t) => sum + t.applicants.length, 0);

  document.getElementById('adminKpiContainer').innerHTML = `
    <div class="kpi-card">
      <span class="text-muted">মোট অ্যাক্টিভ টিউশন</span>
      <div class="kpi-val">${state.tuitions.length} টি</div>
    </div>
    <div class="kpi-card">
      <span class="text-muted">পেন্ডিং সাবস্ক্রিপশন পেমেন্ট</span>
      <div class="kpi-val" style="color:var(--amber)">${pendingSubs} টি</div>
    </div>
    <div class="kpi-card">
      <span class="text-muted">মোট টিউশন আবেদন</span>
      <div class="kpi-val" style="color:var(--primary)">${totalApplications} টি</div>
    </div>
    <div class="kpi-card">
      <span class="text-muted">সাবস্ক্রিপশন রেভিনিউ</span>
      <div class="kpi-val" style="color:var(--emerald)">৳ ${totalRevenue}</div>
    </div>
  `;

  const payTable = document.getElementById('adminPaymentsTableContainer');
  payTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID ও সময়</th>
          <th>টিউটর ও মোবাইল</th>
          <th>প্ল্যান</th>
          <th>গেটওয়ে ও TrxID</th>
          <th>ফি</th>
          <th>স্ট্যাটাস</th>
          <th>অ্যাকশন</th>
        </tr>
      </thead>
      <tbody>
        ${state.subscriptionRequests
          .map(
            (req, idx) => `
          <tr>
            <td><strong>${req.id}</strong><br/><span class="text-muted" style="font-size:0.78rem">${req.createdAt}</span></td>
            <td><strong>${escapeHtml(req.tutorName)}</strong><br/><span class="text-muted">${escapeHtml(req.senderNumber)}</span></td>
            <td>${escapeHtml(req.planName)}</td>
            <td><strong>${req.gateway}</strong><br/><code>${escapeHtml(req.trxId)}</code></td>
            <td><strong>৳${req.amount}</strong></td>
            <td>
              <span class="status-pill ${req.status === 'Approved' ? 'subscribed' : req.status === 'Pending' ? 'pending' : 'unverified'}">
                ${req.status}
              </span>
            </td>
            <td>
              ${
                req.status === 'Pending'
                  ? `<div style="display:flex;gap:6px">
                      <button class="btn btn-emerald" style="padding:5px 10px;font-size:0.8rem" onclick="adminHandleSubscription(${idx}, 'Approved')">✅ Approve</button>
                      <button class="btn btn-rose" style="padding:5px 10px;font-size:0.8rem" onclick="adminHandleSubscription(${idx}, 'Rejected')">❌ Reject</button>
                    </div>`
                  : `<span class="text-muted" style="font-size:0.82rem">সম্পন্ন</span>`
              }
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;

  const tuiTable = document.getElementById('adminTuitionsTableContainer');
  tuiTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>কোড</th>
          <th>টিউশন টাইটেল ও ক্লাস</th>
          <th>লোকেশন</th>
          <th>গার্ডিয়ান ও কন্টাক্ট</th>
          <th>স্যালারি</th>
          <th>আবেদনকারী</th>
          <th>অ্যাকশন</th>
        </tr>
      </thead>
      <tbody>
        ${state.tuitions
          .map(
            (t, idx) => `
          <tr>
            <td><strong>#${t.id}</strong></td>
            <td><strong>${escapeHtml(t.title)}</strong><br/><span class="text-muted" style="font-size:0.8rem">${escapeHtml(t.studentClass)} • ${escapeHtml(t.medium)}</span></td>
            <td>${escapeHtml(t.location)}</td>
            <td>${escapeHtml(t.guardianName)}<br/><code>${escapeHtml(t.guardianPhone)}</code></td>
            <td><strong>৳${t.salary}</strong></td>
            <td>${t.applicants.length} জন</td>
            <td>
              <button class="btn btn-rose" style="padding:5px 10px;font-size:0.78rem" onclick="adminDeleteTuition(${idx})">🗑️ ডিলিট</button>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
}

function adminHandleSubscription(index, status) {
  const req = state.subscriptionRequests[index];
  if (!req) return;
  req.status = status;

  if (status === 'Approved') {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === req.planId) || SUBSCRIPTION_PLANS[1];
    state.tutor.isSubscribed = true;
    state.tutor.activePlanName = plan.name;
    state.tutor.remainingCredits = plan.credits;
    state.tutor.expiresAt = '2027-02-08';
    showToast(`✅ পেমেন্ট ${req.id} Approve করা হয়েছে এবং টিউটরের সাবস্ক্রিপশন সচল হয়েছে!`);
  } else {
    showToast(`❌ পেমেন্ট ${req.id} Reject করা হয়েছে।`);
  }

  saveState();
  renderAll();
}

function adminDeleteTuition(index) {
  const removed = state.tuitions.splice(index, 1);
  saveState();
  renderAll();
  if (removed[0]) {
    showToast(`🗑️ টিউশন #${removed[0].id} ডিলিট করা হয়েছে।`);
  }
}

// ============================================================================
// OTP Login / Registration Modal
// ============================================================================
function openAuthModal() {
  const modal = document.getElementById('authModal');
  const body = document.getElementById('authModalBody');
  modal.classList.add('open');

  body.innerHTML = `
    <form onsubmit="handleOtpLogin(event)">
      <div class="form-group">
        <label>অ্যাকাউন্টের ধরন নির্বাচন করুন *</label>
        <select id="authRoleSelect">
          <option value="tutor" ${state.currentRole === 'tutor' ? 'selected' : ''}>👨‍🏫 টিউটর অ্যাকাউন্ট (Tutor)</option>
          <option value="guardian" ${state.currentRole === 'guardian' ? 'selected' : ''}>👪 গার্ডিয়ান / স্টুডেন্ট অ্যাকাউন্ট (Guardian)</option>
          <option value="admin" ${state.currentRole === 'admin' ? 'selected' : ''}>🛡️ অ্যাডমিন অ্যাকাউন্ট (Admin)</option>
        </select>
      </div>
      <div class="form-group">
        <label>মোবাইল নম্বর *</label>
        <input type="text" id="authPhoneInput" value="${state.tutor.phone}" required />
      </div>
      <div class="form-group">
        <label>৪-ডিজিট SMS OTP কোড (ডেমো কোড: 1234) *</label>
        <input type="text" value="1234" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-lg">✅ ভেরিফাই ও লগইন করুন</button>
    </form>
  `;
}

function handleOtpLogin(e) {
  e.preventDefault();
  const role = document.getElementById('authRoleSelect').value;
  closeModal('authModal');
  switchRole(role);
}

// ============================================================================
// Utilities & Modals
// ============================================================================
function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove('open');
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3800);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
