class TutorBiodata {
  String name;
  String gender;
  String bloodGroup;
  String phone;
  String email;
  String nidOrStudentId;
  String presentAddress;
  String permanentAddress;
  String university;
  String department;
  String yearCgpa;
  String hscCollege;
  String hscResult;
  String sscSchool;
  String sscResult;
  String experience;
  String preferredClasses;
  String subjects;
  String preferredLocations;
  int minSalary;
  String bioText;

  TutorBiodata({
    required this.name,
    required this.gender,
    required this.bloodGroup,
    required this.phone,
    required this.email,
    required this.nidOrStudentId,
    required this.presentAddress,
    required this.permanentAddress,
    required this.university,
    required this.department,
    required this.yearCgpa,
    required this.hscCollege,
    required this.hscResult,
    required this.sscSchool,
    required this.sscResult,
    required this.experience,
    required this.preferredClasses,
    required this.subjects,
    required this.preferredLocations,
    required this.minSalary,
    required this.bioText,
  });
}

class SubscriptionPlan {
  final String id;
  final String name;
  final String duration;
  final int price;
  final int credits;
  final bool isPopular;
  final List<String> features;

  const SubscriptionPlan({
    required this.id,
    required this.name,
    required this.duration,
    required this.price,
    required this.credits,
    this.isPopular = false,
    required this.features,
  });
}

class TutorApplication {
  final String tutorId;
  final String tutorName;
  final String university;
  final String phone;
  final String experience;
  final String coverNote;
  final TutorBiodata? biodata;
  String status; // 'Pending', 'Shortlisted', 'Hired'

  TutorApplication({
    required this.tutorId,
    required this.tutorName,
    required this.university,
    required this.phone,
    required this.experience,
    required this.coverNote,
    this.biodata,
    this.status = 'Pending',
  });
}

class TuitionPost {
  final String id;
  final String title;
  final String studentClass;
  final String medium;
  final List<String> subjects;
  final int salary;
  final String daysPerWeek;
  final String preferredGender;
  final String location;
  final String address;
  final String guardianName;
  final String guardianPhone;
  final String note;
  final String postedAt;
  final List<TutorApplication> applicants;

  TuitionPost({
    required this.id,
    required this.title,
    required this.studentClass,
    required this.medium,
    required this.subjects,
    required this.salary,
    required this.daysPerWeek,
    required this.preferredGender,
    required this.location,
    required this.address,
    required this.guardianName,
    required this.guardianPhone,
    required this.note,
    required this.postedAt,
    List<TutorApplication>? applicants,
  }) : applicants = applicants ?? [];
}

class PaymentRequest {
  final String id;
  final String tutorName;
  final String senderPhone;
  final String planName;
  final String planId;
  final int amount;
  final String gateway; // 'bKash' | 'Nagad' | 'SSLCommerz'
  final String trxId;
  String status; // 'Pending' | 'Approved' | 'Rejected'

  PaymentRequest({
    required this.id,
    required this.tutorName,
    required this.senderPhone,
    required this.planName,
    required this.planId,
    required this.amount,
    required this.gateway,
    required this.trxId,
    this.status = 'Pending',
  });
}
