import 'package:flutter/material.dart';
import 'models/tuition_models.dart';

void main() {
  runApp(const TutarBDApp());
}

class TutarBDApp extends StatelessWidget {
  const TutarBDApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TutarBD — Subscription Tuition App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF4F46E5),
          primary: const Color(0xFF4F46E5),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        useMaterial3: true,
      ),
      home: const MainShellScreen(),
    );
  }
}

class MainShellScreen extends StatefulWidget {
  const MainShellScreen({super.key});

  @override
  State<MainShellScreen> createState() => _MainShellScreenState();
}

class _MainShellScreenState extends State<MainShellScreen> {
  int _selectedIndex = 0;

  // Tutor State & Complete Bio-Data
  String tutorId = 'TUT-101';
  bool isTutorSubscribed = false;
  String? activePlanName;
  int remainingCredits = 0;

  late TutorBiodata tutorBio;

  // Search & Filter
  String searchQuery = '';
  String selectedLocation = 'সকল লোকেশন';

  final List<SubscriptionPlan> plans = const [
    SubscriptionPlan(
      id: 'starter_monthly',
      name: 'Starter Tutor Pack',
      duration: '১ মাস (30 Days)',
      price: 299,
      credits: 15,
      features: [
        '১৫টি ভেরিফাইড টিউশনে Apply করার সুযোগ',
        'গার্ডিয়ানের সরাসরি মোবাইল নম্বর আনলক',
        'সম্পূর্ণ বায়োডাটা (CV) গার্ডিয়ানের কাছে প্রেরণ',
      ],
    ),
    SubscriptionPlan(
      id: 'pro_quarterly',
      name: 'Pro Tutor Pack',
      duration: '৩ মাস (90 Days)',
      price: 699,
      credits: 50,
      isPopular: true,
      features: [
        '৫০টি ভেরিফাইড টিউশনে Apply করার সুযোগ',
        'গার্ডিয়ানের সরাসরি নম্বর ও WhatsApp কন্টাক্ট',
        'Priority Top Tutor ব্যাজ ও বায়োডাটা হাইলাইট',
      ],
    ),
    SubscriptionPlan(
      id: 'unlimited_yearly',
      name: 'Unlimited Yearly Pack',
      duration: '১ বছর (365 Days)',
      price: 1499,
      credits: 999,
      features: [
        'আনলিমিটেড টিউশনে Apply করার সুবিধা',
        'সকল গার্ডিয়ানের সরাসরি কন্টাক্ট নম্বর আনলক',
        'Featured Tutor ব্যাজ ও সর্বোচ্চ অগ্রাধিকার',
      ],
    ),
  ];

  late List<TuitionPost> tuitions;
  late List<PaymentRequest> paymentRequests;

  @override
  void initState() {
    super.initState();
    tutorBio = TutorBiodata(
      name: 'আরিফুল ইসলাম',
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '01715-223344',
      email: 'ariful.cse.buet@gmail.com',
      nidOrStudentId: 'BUET-CSE-1905042',
      presentAddress: 'আহসানউল্লাহ হল, বুয়েট, ঢাকা',
      permanentAddress: 'কান্দিরপাড়, কুমিল্লা',
      university: 'BUET (বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়)',
      department: 'Computer Science & Engineering (CSE)',
      yearCgpa: '4th Year (CGPA 3.78)',
      hscCollege: 'নটর ডেম কলেজ, ঢাকা',
      hscResult: '2020 — GPA 5.00 (Science)',
      sscSchool: 'কুমিল্লা জিলা স্কুল',
      sscResult: '2018 — GPA 5.00 (Science)',
      experience: '৩ বছর (SSC, HSC ও Engineering Admission)',
      preferredClasses: 'Class 9-10 (SSC), HSC 1st & 2nd Year, Admission',
      subjects: 'Higher Math, Physics, Chemistry, ICT',
      preferredLocations: 'ধানমন্ডি, কলাবাগান, আজিমপুর, শাহবাগ, ফার্মগেট',
      minSalary: 6000,
      bioText:
          'আমি গত ৩ বছর ধরে নটর ডেম ও ভিকারুননিসা কলেজের ৮+ জন HSC ও SSC স্টুডেন্টকে সফলভাবে পড়িয়েছি। বেসিক কনসেপ্ট ও নিয়মিত পরীক্ষার মাধ্যমে পড়াই।',
    );

    tuitions = [
      TuitionPost(
        id: 'TUI-2041',
        title: 'HSC 1st Year স্টুডেন্টের জন্য Physics ও Higher Math টিউটর প্রয়োজন',
        studentClass: 'HSC 1st / 2nd Year',
        medium: 'বাংলা মিডিয়াম',
        subjects: ['Physics', 'Higher Math'],
        salary: 7000,
        daysPerWeek: '৪ দিন/সপ্তাহ',
        preferredGender: 'Any',
        location: 'ধানমন্ডি, ঢাকা',
        address: 'রোড ৯/এ, ধানমন্ডি, ঢাকা',
        guardianName: 'মাহমুদুল হাসান',
        guardianPhone: '01711-987654',
        note: 'পাবলিক বিশ্ববিদ্যালয়ের অভিজ্ঞ টিউটর অগ্রাধিকার পাবেন।',
        postedAt: '২৫ মিনিট আগে',
        applicants: [
          TutorApplication(
            tutorId: 'TUT-209',
            tutorName: 'সাদিয়া রহমান',
            university: 'Dhaka University — Applied Math',
            phone: '01612-889900',
            experience: '৪ বছরের অভিজ্ঞতা',
            coverNote: 'গত ৩ বছর ধরে HSC স্টুডেন্টকে Physics ও Math পড়াচ্ছি।',
            status: 'Shortlisted',
            biodata: TutorBiodata(
              name: 'সাদিয়া রহমান',
              gender: 'Female',
              bloodGroup: 'B+',
              phone: '01612-889900',
              email: 'sadia.du@gmail.com',
              nidOrStudentId: 'DU-AM-2020115',
              presentAddress: 'রোকেয়া হল, ঢাকা বিশ্ববিদ্যালয়',
              permanentAddress: 'রাজশাহী সদর',
              university: 'Dhaka University',
              department: 'Applied Mathematics',
              yearCgpa: 'Final Year (CGPA 3.85)',
              hscCollege: 'হলি ক্রস কলেজ, ঢাকা',
              hscResult: '2019 — GPA 5.00',
              sscSchool: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
              sscResult: '2017 — GPA 5.00',
              experience: '৪ বছর',
              preferredClasses: 'Class 8-10, HSC',
              subjects: 'Higher Math, Physics',
              preferredLocations: 'ধানমন্ডি, আজিমপুর, নিউ মার্কেট',
              minSalary: 6500,
              bioText: 'সহজ উদাহরণ ও শর্টকাট টেকনিক দিয়ে গণিত ও পদার্থবিজ্ঞান পড়াই।',
            ),
          ),
        ],
      ),
      TuitionPost(
        id: 'TUI-2040',
        title: 'English Version Class 9 (SSC) স্টুডেন্টের জন্য Science টিউটর চাই',
        studentClass: 'Class 9 - 10 (SSC)',
        medium: 'ইংলিশ ভার্সন',
        subjects: ['General Math', 'Higher Math', 'Chemistry'],
        salary: 8500,
        daysPerWeek: '৪ দিন/সপ্তাহ',
        preferredGender: 'Male',
        location: 'উত্তরা, ঢাকা',
        address: 'সেক্টর ৭, রোড ১২, উত্তরা',
        guardianName: 'ফারজানা করিম',
        guardianPhone: '01812-334455',
        note: 'ইংলিশ ভার্সনের বই পড়ানোর পূর্ব অভিজ্ঞতা থাকতে হবে।',
        postedAt: '১ ঘণ্টা আগে',
      ),
      TuitionPost(
        id: 'TUI-2039',
        title: 'O Level স্টুডেন্টের জন্য Math-D ও Physics টিউটর প্রয়োজন',
        studentClass: 'O Level / A Level',
        medium: 'ইংলিশ মিডিয়াম (O/A Level)',
        subjects: ['Mathematics D', 'Physics'],
        salary: 12000,
        daysPerWeek: '৩ দিন/সপ্তাহ',
        preferredGender: 'Any',
        location: 'গুলশান / বনানী, ঢাকা',
        address: 'বনানী ব্লক ই, রোড ১১, ঢাকা',
        guardianName: 'ব্যারিস্টার রাশেদ চৌধুরী',
        guardianPhone: '01713-445566',
        note: 'O/A Level ব্যাকগ্রাউন্ড অথবা অভিজ্ঞ টিউটর আবশ্যক।',
        postedAt: '৩ ঘণ্টা আগে',
      ),
    ];

    paymentRequests = [
      PaymentRequest(
        id: 'PAY-901',
        tutorName: 'তানভীর আহমেদ (DU)',
        senderPhone: '01819-556677',
        planName: 'Pro Tutor Pack (৩ মাস)',
        planId: 'pro_quarterly',
        amount: 699,
        gateway: 'bKash',
        trxId: 'BK9823X71A',
        status: 'Pending',
      ),
    ];
  }

  void _toggleDemoSubscription() {
    setState(() {
      isTutorSubscribed = !isTutorSubscribed;
      if (isTutorSubscribed) {
        activePlanName = 'Pro Tutor Pack';
        remainingCredits = 50;
      } else {
        activePlanName = null;
        remainingCredits = 0;
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isTutorSubscribed
              ? '✅ টিউটর সাবস্ক্রিপশন ACTIVE করা হয়েছে! এখন টিউশনে Apply ও নম্বর দেখতে পারবেন।'
              : '🔒 টিউটর সাবস্ক্রিপশন INACTIVE করা হয়েছে! Apply ও কন্টাক্ট লক থাকবে।',
        ),
      ),
    );
  }

  void _showBiodataDialog(TutorBiodata bio) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('📄 ${bio.name}-এর সম্পূর্ণ বায়োডাটা'),
        content: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('${bio.university} — ${bio.department}',
                  style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
              Text('বর্ষ ও ফলাফল: ${bio.yearCgpa}'),
              const Divider(),
              const Text('🎓 শিক্ষাগত যোগ্যতা:', style: TextStyle(fontWeight: FontWeight.bold)),
              Text('• Honours: ${bio.university} (${bio.yearCgpa})'),
              Text('• HSC: ${bio.hscCollege} (${bio.hscResult})'),
              Text('• SSC: ${bio.sscSchool} (${bio.sscResult})'),
              const Divider(),
              const Text('📘 টিউশন অভিজ্ঞতা ও প্রিফারেন্স:', style: TextStyle(fontWeight: FontWeight.bold)),
              Text('• অভিজ্ঞতা: ${bio.experience}'),
              Text('• বিষয়সমূহ: ${bio.subjects}'),
              Text('• ক্লাস: ${bio.preferredClasses}'),
              Text('• এলাকা: ${bio.preferredLocations}'),
              Text('• সর্বনিম্ন স্যালারি: ৳${bio.minSalary}/মাস'),
              const Divider(),
              const Text('🪪 ব্যক্তিগত তথ্য:', style: TextStyle(fontWeight: FontWeight.bold)),
              Text('• মোবাইল: ${bio.phone}'),
              Text('• ইমেইল: ${bio.email}'),
              Text('• NID/Student ID: ${bio.nidOrStudentId}'),
              Text('• বর্তমান ঠিকানা: ${bio.presentAddress}'),
              Text('• স্থায়ী ঠিকানা: ${bio.permanentAddress}'),
              const SizedBox(height: 8),
              Text('💡 নিজের সম্পর্কে: "${bio.bioText}"',
                  style: const TextStyle(fontStyle: FontStyle.italic)),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('বন্ধ করুন')),
        ],
      ),
    );
  }

  void _openSubscriptionCheckout(SubscriptionPlan plan, {TuitionPost? lockedTuition}) {
    String selectedGateway = 'bKash';
    final phoneCtrl = TextEditingController(text: tutorBio.phone);
    final trxCtrl = TextEditingController(text: 'TXN784512');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
              ),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          '💎 টিউটর সাবস্ক্রিপশন পেমেন্ট',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        IconButton(
                          onPressed: () => Navigator.pop(ctx),
                          icon: const Icon(Icons.close),
                        ),
                      ],
                    ),
                    if (lockedTuition != null)
                      Container(
                        padding: const EdgeInsets.all(12),
                        margin: const EdgeInsets.only(bottom: 12),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFEF3C7),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '🔒 "${lockedTuition.title}" টিউশনে Apply করতে ও গার্ডিয়ানের নম্বর দেখতে সাবস্ক্রাইব করুন।',
                          style: const TextStyle(color: Color(0xFF92400E), fontSize: 13),
                        ),
                      ),
                    Text(
                      'প্ল্যান: ${plan.name} (${plan.duration}) — ৳${plan.price}',
                      style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                    ),
                    const SizedBox(height: 12),
                    const Text('পেমেন্ট গেটওয়ে নির্বাচন করুন:', style: TextStyle(fontWeight: FontWeight.w600)),
                    const SizedBox(height: 8),
                    Row(
                      children: ['bKash', 'Nagad', 'SSLCommerz'].map((gw) {
                        final isSelected = selectedGateway == gw;
                        return Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 4),
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                backgroundColor: isSelected ? const Color(0xFFEEF2FF) : Colors.white,
                                side: BorderSide(
                                  color: isSelected ? const Color(0xFF4F46E5) : Colors.grey.shade300,
                                  width: isSelected ? 2 : 1,
                                ),
                              ),
                              onPressed: () => setModalState(() => selectedGateway = gw),
                              child: Text(gw, style: const TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                        ),
                        onPressed: () {
                          setState(() {
                            isTutorSubscribed = true;
                            activePlanName = plan.name;
                            remainingCredits = plan.credits;
                            paymentRequests.insert(
                              0,
                              PaymentRequest(
                                id: 'PAY-${100 + paymentRequests.length}',
                                tutorName: tutorBio.name,
                                senderPhone: tutorBio.phone,
                                planName: plan.name,
                                planId: plan.id,
                                amount: plan.price,
                                gateway: selectedGateway,
                                trxId: 'SANDBOX-INSTANT',
                                status: 'Approved',
                              ),
                            );
                          });
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('🎉 ৳${plan.price} পেমেন্ট সফল! আপনার ${plan.name} এখন সচল।'),
                            ),
                          );
                        },
                        icon: const Icon(Icons.flash_on),
                        label: Text('Instant Sandbox Pay ৳${plan.price} ($selectedGateway)'),
                      ),
                    ),
                    const Divider(height: 28),
                    const Text(
                      'অথবা, ম্যানুয়াল সেন্ড মানি TrxID জমা দিন (Admin Approval):',
                      style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                    ),
                    const SizedBox(height: 8),
                    TextField(
                      controller: phoneCtrl,
                      decoration: InputDecoration(
                        labelText: 'আপনার $selectedGateway নম্বর',
                        border: const OutlineInputBorder(),
                        isDense: true,
                      ),
                    ),
                    const SizedBox(height: 10),
                    TextField(
                      controller: trxCtrl,
                      decoration: const InputDecoration(
                        labelText: 'Transaction ID (TrxID)',
                        border: OutlineInputBorder(),
                        isDense: true,
                      ),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton(
                        onPressed: () {
                          setState(() {
                            paymentRequests.insert(
                              0,
                              PaymentRequest(
                                id: 'PAY-${100 + paymentRequests.length}',
                                tutorName: tutorBio.name,
                                senderPhone: phoneCtrl.text,
                                planName: plan.name,
                                planId: plan.id,
                                amount: plan.price,
                                gateway: selectedGateway,
                                trxId: trxCtrl.text,
                                status: 'Pending',
                              ),
                            );
                          });
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('📤 পেমেন্ট রিকোয়েস্ট জমা হয়েছে! Admin ট্যাব থেকে Approve করুন।'),
                            ),
                          );
                        },
                        child: const Text('📤 ভেরিফিকেশনের জন্য TrxID জমা দিন'),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  void _openApplyDialog(TuitionPost tuition) {
    if (!isTutorSubscribed) {
      _openSubscriptionCheckout(plans[1], lockedTuition: tuition);
      return;
    }

    final noteCtrl = TextEditingController(
      text:
          'আসসালামু আলাইকুম, আমি ${tutorBio.university}-এ (${tutorBio.department}) পড়াশোনা করছি। আমার ${tutorBio.experience} অভিজ্ঞতা রয়েছে। আমার সম্পূর্ণ বায়োডাটা সংযুক্ত করলাম।',
    );

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Apply: #${tuition.id}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(tuition.title, style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text('📞 গার্ডিয়ান নম্বর: ${tuition.guardianPhone}',
                style: const TextStyle(color: Color(0xFF065F46), fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            TextField(
              controller: noteCtrl,
              maxLines: 3,
              decoration: const InputDecoration(
                labelText: 'গার্ডিয়ানের জন্য সংক্ষিপ্ত নোট',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('বাতিল')),
          ElevatedButton(
            onPressed: () {
              setState(() {
                tuition.applicants.insert(
                  0,
                  TutorApplication(
                    tutorId: tutorId,
                    tutorName: tutorBio.name,
                    university: '${tutorBio.university} — ${tutorBio.department}',
                    phone: tutorBio.phone,
                    experience: tutorBio.experience,
                    coverNote: noteCtrl.text,
                    biodata: tutorBio,
                  ),
                );
                if (remainingCredits > 0 && remainingCredits < 900) {
                  remainingCredits--;
                }
              });
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('✅ টিউশন #${tuition.id}-এ বায়োডাটা সহ আপনার আবেদন সম্পন্ন হয়েছে!')),
              );
            },
            child: const Text('🚀 বায়োডাটা সহ Apply করুন'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pendingPaymentsCount = paymentRequests.where((p) => p.status == 'Pending').length;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E1B4B),
        foregroundColor: Colors.white,
        title: Row(
          children: [
            const Icon(Icons.school, color: Color(0xFF818CF8)),
            const SizedBox(width: 8),
            const Text('TutarBD', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(width: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: isTutorSubscribed ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                borderRadius: BorderRadius.circular(99),
              ),
              child: Text(
                isTutorSubscribed ? '✅ Subscribed ($remainingCredits)' : '🔒 Free Tutor',
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ),
          ],
        ),
        actions: [
          TextButton.icon(
            onPressed: _toggleDemoSubscription,
            icon: const Icon(Icons.swap_horiz, color: Colors.white, size: 18),
            label: Text(
              isTutorSubscribed ? 'Lock টেস্ট' : '1-Click Sub',
              style: const TextStyle(color: Colors.white, fontSize: 12),
            ),
          ),
        ],
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: [
          _buildTuitionBoardTab(),
          _buildTutorBiodataTab(),
          _buildSubscriptionsTab(),
          _buildGuardianPostTab(),
          _buildAdminTab(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
        destinations: [
          const NavigationDestination(icon: Icon(Icons.work_outline), label: 'টিউশন বোর্ড'),
          const NavigationDestination(icon: Icon(Icons.badge_outlined), label: 'টিউটর বায়োডাটা'),
          const NavigationDestination(icon: Icon(Icons.workspace_premium), label: 'সাবস্ক্রিপশন'),
          const NavigationDestination(icon: Icon(Icons.post_add), label: 'গার্ডিয়ান পোস্ট'),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: pendingPaymentsCount > 0,
              label: Text('$pendingPaymentsCount'),
              child: const Icon(Icons.admin_panel_settings_outlined),
            ),
            label: 'অ্যাডমিন',
          ),
        ],
      ),
    );
  }

  // ==================== TAB 1: TUITION BOARD ====================
  Widget _buildTuitionBoardTab() {
    final filtered = tuitions.where((t) {
      final matchesSearch = searchQuery.isEmpty ||
          t.title.toLowerCase().contains(searchQuery.toLowerCase()) ||
          t.location.toLowerCase().contains(searchQuery.toLowerCase()) ||
          t.subjects.join(' ').toLowerCase().contains(searchQuery.toLowerCase());
      final matchesLoc = selectedLocation == 'সকল লোকেশন' || t.location == selectedLocation;
      return matchesSearch && matchesLoc;
    }).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(14),
          margin: const EdgeInsets.only(bottom: 14),
          decoration: BoxDecoration(
            color: isTutorSubscribed ? const Color(0xFFD1FAE5) : const Color(0xFFFEF3C7),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: isTutorSubscribed ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
            ),
          ),
          child: Row(
            children: [
              Icon(
                isTutorSubscribed ? Icons.verified : Icons.lock_outline,
                color: isTutorSubscribed ? const Color(0xFF065F46) : const Color(0xFF92400E),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  isTutorSubscribed
                      ? 'আপনার $activePlanName সচল আছে! সরাসরি গার্ডিয়ানের নম্বর দেখুন ও বায়োডাটা সহ Apply করুন।'
                      : 'টিউশনে Apply করতে এবং গার্ডিয়ানের মোবাইল নম্বর আনলক করতে সাবস্ক্রিপশন প্রয়োজন।',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: isTutorSubscribed ? const Color(0xFF065F46) : const Color(0xFF92400E),
                  ),
                ),
              ),
              if (!isTutorSubscribed)
                ElevatedButton(
                  onPressed: () => setState(() => _selectedIndex = 2),
                  child: const Text('প্ল্যান দেখুন'),
                ),
            ],
          ),
        ),
        TextField(
          onChanged: (val) => setState(() => searchQuery = val),
          decoration: InputDecoration(
            hintText: 'লোকেশন, সাবজেক্ট বা ক্লাস দিয়ে সার্চ করুন...',
            prefixIcon: const Icon(Icons.search),
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
        const SizedBox(height: 14),
        Text(
          '🔥 মোট ${filtered.length}টি ভেরিফাইড টিউশন পাওয়া গেছে',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        const SizedBox(height: 10),
        ...filtered.map((t) {
          final hasApplied = t.applicants.any((a) => a.tutorId == tutorId);
          final maskedPhone = '${t.guardianPhone.substring(0, 5)}-XXXXXX';

          return Card(
            margin: const EdgeInsets.only(bottom: 14),
            elevation: 1,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFEEF2FF),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          '#${t.id}',
                          style: const TextStyle(
                            color: Color(0xFF4F46E5),
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                      Text('🕒 ${t.postedAt} • 📍 ${t.location}',
                          style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(t.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    children: t.subjects
                        .map((s) => Chip(
                              label: Text(s, style: const TextStyle(fontSize: 12)),
                              visualDensity: VisualDensity.compact,
                            ))
                        .toList(),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('📚 ${t.studentClass} (${t.medium})', style: const TextStyle(fontSize: 13)),
                      Text(
                        '৳${t.salary}/মাস (${t.daysPerWeek})',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF10B981),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: isTutorSubscribed ? const Color(0xFFECFDF5) : const Color(0xFFFFFBEB),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            isTutorSubscribed
                                ? '📞 গার্ডিয়ান (${t.guardianName}): ${t.guardianPhone}'
                                : '🔒 গার্ডিয়ান নম্বর: $maskedPhone (সাবস্ক্রিপশন প্রয়োজন)',
                            style: TextStyle(
                              fontSize: 12.5,
                              fontWeight: FontWeight.w600,
                              color: isTutorSubscribed
                                  ? const Color(0xFF065F46)
                                  : const Color(0xFF92400E),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: hasApplied
                            ? const Color(0xFF10B981)
                            : const Color(0xFF4F46E5),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      onPressed: hasApplied ? null : () => _openApplyDialog(t),
                      icon: Icon(
                        hasApplied
                            ? Icons.check_circle
                            : isTutorSubscribed
                                ? Icons.send
                                : Icons.lock,
                        size: 18,
                      ),
                      label: Text(
                        hasApplied
                            ? 'আবেদন করা হয়েছে (Applied)'
                            : isTutorSubscribed
                                ? 'Apply Now (বায়োডাটা সহ আবেদন)'
                                : 'Apply করতে সাবস্ক্রাইব করুন',
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  // ==================== TAB 2: COMPLETE TUTOR BIO-DATA ====================
  Widget _buildTutorBiodataTab() {
    final nameCtrl = TextEditingController(text: tutorBio.name);
    final phoneCtrl = TextEditingController(text: tutorBio.phone);
    final nidCtrl = TextEditingController(text: tutorBio.nidOrStudentId);
    final uniCtrl = TextEditingController(text: tutorBio.university);
    final deptCtrl = TextEditingController(text: tutorBio.department);
    final cgpaCtrl = TextEditingController(text: tutorBio.yearCgpa);
    final hscCtrl = TextEditingController(text: '${tutorBio.hscCollege} (${tutorBio.hscResult})');
    final sscCtrl = TextEditingController(text: '${tutorBio.sscSchool} (${tutorBio.sscResult})');
    final expCtrl = TextEditingController(text: tutorBio.experience);
    final subCtrl = TextEditingController(text: tutorBio.subjects);
    final locCtrl = TextEditingController(text: tutorBio.preferredLocations);
    final addrCtrl = TextEditingController(text: tutorBio.presentAddress);
    final bioCtrl = TextEditingController(text: tutorBio.bioText);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Expanded(
                      child: Text(
                        '📄 টিউটর পূর্ণাঙ্গ বায়োডাটা (Complete Bio-Data)',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ),
                    OutlinedButton.icon(
                      onPressed: () => _showBiodataDialog(tutorBio),
                      icon: const Icon(Icons.visibility, size: 16),
                      label: const Text('CV প্রিভিউ'),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                const Text('১. ব্যক্তিগত ও পরিচয় তথ্য',
                    style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                const SizedBox(height: 8),
                TextField(
                  controller: nameCtrl,
                  decoration: const InputDecoration(labelText: 'পূর্ণ নাম', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: phoneCtrl,
                        decoration: const InputDecoration(labelText: 'মোবাইল নম্বর', border: OutlineInputBorder()),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: nidCtrl,
                        decoration: const InputDecoration(
                            labelText: 'NID / Student ID', border: OutlineInputBorder()),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: addrCtrl,
                  decoration: const InputDecoration(labelText: 'বর্তমান ঠিকানা', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 16),
                const Text('২. শিক্ষাগত যোগ্যতা (University, HSC, SSC)',
                    style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                const SizedBox(height: 8),
                TextField(
                  controller: uniCtrl,
                  decoration: const InputDecoration(
                      labelText: 'বিশ্ববিদ্যালয় (Honours/B.Sc)', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: deptCtrl,
                        decoration: const InputDecoration(labelText: 'ডিপার্টমেন্ট / বিষয়', border: OutlineInputBorder()),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: cgpaCtrl,
                        decoration:
                            const InputDecoration(labelText: 'বর্ষ ও CGPA', border: OutlineInputBorder()),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: hscCtrl,
                  decoration:
                      const InputDecoration(labelText: 'HSC কলেজ ও ফলাফল (GPA)', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: sscCtrl,
                  decoration:
                      const InputDecoration(labelText: 'SSC স্কুল ও ফলাফল (GPA)', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 16),
                const Text('৩. টিউশন প্রিফারেন্স ও অভিজ্ঞতা',
                    style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF4F46E5))),
                const SizedBox(height: 8),
                TextField(
                  controller: expCtrl,
                  decoration: const InputDecoration(labelText: 'টিউশন অভিজ্ঞতা', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: subCtrl,
                  decoration: const InputDecoration(labelText: 'পছন্দের বিষয়সমূহ', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: locCtrl,
                  decoration:
                      const InputDecoration(labelText: 'পছন্দের লোকেশন / এলাকা', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: bioCtrl,
                  maxLines: 3,
                  decoration: const InputDecoration(
                      labelText: 'নিজের সম্পর্কে ও পড়ানোর কৌশল', border: OutlineInputBorder()),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF4F46E5),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                    onPressed: () {
                      setState(() {
                        tutorBio.name = nameCtrl.text;
                        tutorBio.phone = phoneCtrl.text;
                        tutorBio.nidOrStudentId = nidCtrl.text;
                        tutorBio.presentAddress = addrCtrl.text;
                        tutorBio.university = uniCtrl.text;
                        tutorBio.department = deptCtrl.text;
                        tutorBio.yearCgpa = cgpaCtrl.text;
                        tutorBio.hscCollege = hscCtrl.text;
                        tutorBio.sscSchool = sscCtrl.text;
                        tutorBio.experience = expCtrl.text;
                        tutorBio.subjects = subCtrl.text;
                        tutorBio.preferredLocations = locCtrl.text;
                        tutorBio.bioText = bioCtrl.text;
                      });
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('💾 আপনার সম্পূর্ণ বায়োডাটা সেভ করা হয়েছে!')),
                      );
                    },
                    icon: const Icon(Icons.save),
                    label: const Text('সম্পূর্ণ বায়োডাটা সেভ করুন'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // ==================== TAB 3: SUBSCRIPTION PLANS ====================
  Widget _buildSubscriptionsTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          '💎 টিউটর মেম্বারশিপ প্ল্যান',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        const Text(
          'কোনো মিডিয়া কমিশন নেই! সাবস্ক্রিপশন নিয়ে সরাসরি গার্ডিয়ানের সাথে যোগাযোগ করুন ও টিউশনে Apply করুন।',
          style: TextStyle(color: Colors.black54),
        ),
        const SizedBox(height: 16),
        ...plans.map((plan) => Card(
              margin: const EdgeInsets.only(bottom: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: BorderSide(
                  color: plan.isPopular ? const Color(0xFF4F46E5) : Colors.grey.shade300,
                  width: plan.isPopular ? 2 : 1,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (plan.isPopular)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        margin: const EdgeInsets.only(bottom: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF4F46E5),
                          borderRadius: BorderRadius.circular(99),
                        ),
                        child: const Text(
                          '🔥 সবচেয়ে জনপ্রিয়',
                          style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    Text(plan.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    Text(plan.duration, style: const TextStyle(color: Colors.grey)),
                    const SizedBox(height: 8),
                    Text(
                      '৳${plan.price}',
                      style: const TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF4F46E5),
                      ),
                    ),
                    const Divider(height: 20),
                    ...plan.features.map((f) => Padding(
                          padding: const EdgeInsets.symmetric(vertical: 3),
                          child: Row(
                            children: [
                              const Icon(Icons.check_circle, color: Color(0xFF10B981), size: 18),
                              const SizedBox(width: 8),
                              Expanded(child: Text(f, style: const TextStyle(fontSize: 13.5))),
                            ],
                          ),
                        )),
                    const SizedBox(height: 14),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF4F46E5),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        onPressed: () => _openSubscriptionCheckout(plan),
                        child: Text('সাবস্ক্রাইব করুন (৳${plan.price})'),
                      ),
                    ),
                  ],
                ),
              ),
            )),
      ],
    );
  }

  // ==================== TAB 4: GUARDIAN POST & APPLICANTS ====================
  Widget _buildGuardianPostTab() {
    final titleCtrl = TextEditingController();
    final subjectCtrl = TextEditingController();
    final salaryCtrl = TextEditingController(text: '6000');
    final locationCtrl = TextEditingController(text: 'ধানমন্ডি, ঢাকা');
    final phoneCtrl = TextEditingController(text: '01711-987654');

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '📢 ফ্রি টিউশন রিকোয়েস্ট পোস্ট করুন (Guardian / Student)',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: titleCtrl,
                  decoration: const InputDecoration(
                    labelText: 'টিউশন টাইটেল (যেমন: Class 10 Math ও Physics টিউটর চাই)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: subjectCtrl,
                  decoration: const InputDecoration(
                    labelText: 'বিষয়সমূহ (কমা দিয়ে লিখুন: Math, Physics)',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: salaryCtrl,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'স্যালারি (BDT)',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: locationCtrl,
                        decoration: const InputDecoration(
                          labelText: 'লোকেশন / এলাকা',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: phoneCtrl,
                  decoration: const InputDecoration(
                    labelText: 'গার্ডিয়ানের মোবাইল নম্বর',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF4F46E5),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                    onPressed: () {
                      if (titleCtrl.text.trim().isEmpty) return;
                      setState(() {
                        tuitions.insert(
                          0,
                          TuitionPost(
                            id: 'TUI-${2042 + tuitions.length}',
                            title: titleCtrl.text.trim(),
                            studentClass: 'Class 9 - 10 (SSC)',
                            medium: 'বাংলা মিডিয়াম',
                            subjects: subjectCtrl.text.trim().isEmpty
                                ? ['All Subjects']
                                : subjectCtrl.text.split(',').map((s) => s.trim()).toList(),
                            salary: int.tryParse(salaryCtrl.text) ?? 6000,
                            daysPerWeek: '৪ দিন/সপ্তাহ',
                            preferredGender: 'Any',
                            location: locationCtrl.text.trim(),
                            address: locationCtrl.text.trim(),
                            guardianName: 'মাহমুদুল হাসান (অভিভাবক)',
                            guardianPhone: phoneCtrl.text.trim(),
                            note: 'অভিজ্ঞ টিউটর অগ্রাধিকার পাবেন।',
                            postedAt: 'এইমাত্র',
                          ),
                        );
                      });
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('🎉 নতুন টিউশন রিকোয়েস্ট সফলভাবে পাবলিশ হয়েছে!')),
                      );
                    },
                    icon: const Icon(Icons.publish),
                    label: const Text('টিউশন রিকোয়েস্ট পাবলিশ করুন'),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          '👨‍🏫 আবেদনকারী টিউটর ও তাদের সম্পূর্ণ বায়োডাটা',
          style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        ...tuitions.map((t) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('#${t.id} — ${t.title}', style: const TextStyle(fontWeight: FontWeight.bold)),
                    Text('আবেদনকারী টিউটর: ${t.applicants.length} জন',
                        style: const TextStyle(color: Colors.grey, fontSize: 12)),
                    const Divider(),
                    if (t.applicants.isEmpty)
                      const Text('এখনো কোনো টিউটর আবেদন করেননি।', style: TextStyle(fontSize: 13))
                    else
                      ...t.applicants.map((app) => Padding(
                            padding: const EdgeInsets.only(bottom: 10),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('${app.tutorName} (${app.university})',
                                    style: const TextStyle(fontWeight: FontWeight.bold)),
                                Text('📞 ${app.phone} • স্ট্যাটাস: ${app.status}\n"${app.coverNote}"',
                                    style: const TextStyle(fontSize: 12.5)),
                                const SizedBox(height: 6),
                                Row(
                                  children: [
                                    OutlinedButton.icon(
                                      onPressed: () => _showBiodataDialog(app.biodata ?? tutorBio),
                                      icon: const Icon(Icons.description, size: 16),
                                      label: const Text('সম্পূর্ণ বায়োডাটা দেখুন'),
                                    ),
                                    const SizedBox(width: 8),
                                    ElevatedButton(
                                      onPressed: () {
                                        setState(() => app.status = 'Hired');
                                        ScaffoldMessenger.of(context).showSnackBar(
                                          SnackBar(content: Text('🎉 ${app.tutorName}-কে Hired করা হয়েছে!')),
                                        );
                                      },
                                      child: const Text('Hire'),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          )),
                  ],
                ),
              ),
            )),
      ],
    );
  }

  // ==================== TAB 5: ADMIN PANEL ====================
  Widget _buildAdminTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          '🛡️ অ্যাডমিন সাবস্ক্রিপশন ও টিউশন কন্ট্রোল',
          style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        ...paymentRequests.map((req) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                title: Text('${req.tutorName} — ${req.planName}'),
                subtitle: Text(
                  '${req.gateway} (${req.senderPhone}) • TrxID: ${req.trxId}\nপরিমাণ: ৳${req.amount} • স্ট্যাটাস: ${req.status}',
                ),
                trailing: req.status == 'Pending'
                    ? ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                        ),
                        onPressed: () {
                          setState(() {
                            req.status = 'Approved';
                            isTutorSubscribed = true;
                            activePlanName = req.planName;
                            remainingCredits = 50;
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('✅ পেমেন্ট ${req.id} Approve করা হয়েছে!')),
                          );
                        },
                        child: const Text('Approve'),
                      )
                    : const Icon(Icons.verified, color: Color(0xFF10B981)),
              ),
            )),
      ],
    );
  }
}
