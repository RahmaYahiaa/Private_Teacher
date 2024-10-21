import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next) // pass i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    language: 'Language', // Key for language dropdown
                    english: 'English',
                    arabic: 'العربية',
                    // category
                    "Categories": "Categories",
                    "Teachers Majors": "Teachers Majors",
                    "All Categories": "All Categories",
                    "teachers": "Teachers: ",
                    "Search": "Search",
                    // navbar
                    "Your best choice": "Your best choice",
                    "Login": "Login",
                    "Register as Student": "Register as Student",
                    "Register as Teacher": "Register as Teacher",
                    "Contact us": "Contact us",
                    "Admin DashBoard": "Admin DashBoard",
                    "English": "English",
                    "اللغه العربية": "اللغة العربية",
                    "Profile": "Profile",
                    "Log out": "Log out",
                    // main hero
                    "Home": "Home",
                    "About": "About",
                    "Teacher": "Teacher",
                    "Contact": "Contact",
                    "looking_for_teacher": "Are you looking for a teacher?",
                    "welcome_message": "You have just come to the right place, all you have to do is search here",
                    "search_placeholder": "Type Your Search Content",
                    "City": "City",
                    "Category": "Category",
                    "Biology": "Biology",
                    "History": "History",
                    "Geography": "Geography",
                    "Math": "Math",
                    "Science": "Science",
                    "Philosophy": "Philosophy",
                    "Physics": "Physics",
                    "Chemistry": "Chemistry",
                    "French": "French",
                    "Arabic": "Arabic",
                    "Psychology": "Psychology",
                    // footer
                    "Your best choice for your Private Teacher": "Your best choice for your Private Teacher",
                    "Connect with us": "Connect with us",
                    "Site Map": "Site Map",
                    "Teachers": "Teachers",
                    "Additional links": "Additional links",
                    "soon": "Coming Soon",
                    "soon 2": "Coming Soon 2",
                    "Mailing List": "Mailing List",
                    "Enter your email address": "Enter your email address",
                    "Your information is safe with us! Unsubscribe at any time": "Your information is safe with us! Unsubscribe at any time",
                    "Privacy policy": "Privacy policy",
                    "Help and support": "Help and support",
                    "Development By": "Development By",
                    "Subscription": "Subscription",
                    // contact hero
                    "home": "Home",
                    "teacher": "Teacher",
                    "contact": "Contact",
                    "registerTeacher": "Register As Teacher",
                    "contactPage": "Contact",
                    "contactHeroTitle": "Contact", // Added for Contact Hero
                    "contactHeroDescription": "Feel free to reach out to us for any inquiries.",
                    //title in about hero
                    "Start with sefihat": "Start with sefihat",
                    "About us": "About us",
                    "Teachers site is your ideal guide for choosing the best teachers": "Teachers site is your ideal guide for choosing the best teachers",
                    "about-hero-title": "The private tutor site is one of the most pioneering sites in the field of education that adds to the students a lot and a lot, so every student or parent can search for the right teacher in the material he desires through a large group of CVs provided on the site that help him make the most appropriate choice",
                    //teacher left
                    "All levels": " All levels",
                    "junior": "junior",
                    "middle": "middle",
                    "senior": "senior",
                    "Filter by rating": "Filter by rating",
                    "Majors": "Majors",
                    "Type your search content here": "Type your search content here",
                    "Language teacher": "Language teacher",
                    "geography":"geography",
                    "The Level":"The Level",
                    //login
                    "You do not have an account":"You do not have an account",
                    "Student":"Student",
                    //registration
                    "Register as a teacher":"Register as a teacher",
                    "First Name":"First Name",
                    "Last Name":"Last Name",
                    "E-mail":"E-mail",
                    "Password":"Password",
                    "Confirm Password":"Confirm Password",
                    "Phone":"Phone",
                    "Your description":"Your description",
                    "Register":"Register",
                    "I already have an account":"I already have an account",
                    //admin dashboard
                    "Delete":"Delete",
                    "Add Subject":"Add Subject",
                    "Add New Subject":"Add New Subject",
                    "Subject Name":"Subject Name",
                    "Teacher Count":"Teacher Count",
                    "Enter subject name":"Enter subject name",
                    "Upload Image":"  Upload Image",
                    "Admin Dashboard":"Admin Dashboard",
                    "Image":"Image",
                    "Actions":"Actions",
                    //Favorite pages
                    "Your Favorite Teachers":"Your Favorite Teachers",
                    "No favorite teachers added yet.":"No favorite teachers added yet.",


                    "about": {
                        "about": "About",
                        "title": "Start with Sfihat",
                        "heading": "Why do you choose Al Mudares Al Khosisi website?",
                        "description": "We in the private teacher site are keen to choose the best experiences provided through the teachers’ sifters, in order to provide a selection of the best educational cadres present in the educational field during the current period.",
                        "easy_tutor": "It is easy to find your desired tutor",
                        "easy_tutor_desc": "It is easy to find your desired tutor."
                    },

                    "videoSection": {
                        "title": "The best choice for teachers",
                        "description": "Best place to choose private teachers"
                    },

                    "clientSection": {
                        "title": "The opinions of our customers",
                        "heading": "What do our customers say?",
                        "description": "To be added soon",
                        "client_message": "Start your search now on the site Sefhat teachers",
                        "client_name": "Mohamed Ibrahim",
                        "client_role": "Student"
                    },
                    "contactUs": {
                        "contactUs": "Contact us",
                        "emailTitle": "E-mail",
                        "email1": "info@tqniait.com",
                        "email2": "info@tqniait.com",
                        "phoneTitle": "Phone",
                        "privateTeacherSiteArabic": "موقع مدرس خصوصي",
                        "privateTeacherSiteEnglish": "Private Teacher Site",
                        "locationTitle": "Our Location",
                        "locationDescription": "Your best choice for your Private Teacher",
                        "stayInTouch": "Stay in touch with us",
                        "writeMessage": "Write a message:",
                        "titlePlaceholder": "Title",
                        "mailOrPhonePlaceholder": "Mail or Phone",
                        "messagePlaceholder": "The message",
                        "sendButton": "Send"
                    }

                }
            },
            ar: {
                translation: {
                    language: 'لغة', // Key for language dropdown in Arabic
                    english: 'إنجليزي',
                    arabic: 'العربية',
                    // category
                    "Categories": "الفئات",
                    "Teachers Majors": "تخصصات المعلمين",
                    "All Categories": "جميع الفئات",
                    "teachers": "المعلمين: ",
                    "Search": "ابحث",
                    // navbar
                    "Your best choice": "أفضل اختيارك",
                    "Login": "تسجيل الدخول",
                    "Register as Student": "سجل كطالب",
                    "Register as Teacher": "سجل كمدرس",
                    "Contact us": "اتصل بنا",
                    "Admin DashBoard": "لوحة التحكم",
                    "English": "اللغة الإنجليزية",
                    "اللغة العربية": "اللغة العربية",
                    "Profile": "الملف الشخصي",
                    "Log out": "تسجيل الخروج",
                    // main hero
                    "Home": "الصفحة الرئيسبه",
                    "About": "عنا",
                    "Teacher": "مدرس",
                    "Contact": "اتصل بنا",
                    "looking_for_teacher": "هل تبحث عن مدرس",
                    "welcome_message": "أنت على الطريق الصحيح , فقط تحتاج إلى البحث هنا",
                    "search_placeholder": "اكتب محتوى البحث",
                    "City": "مدينة",
                    "Category": "التصنيف",
                    "Biology": "الاحياء",
                    "History": "التاريخ",
                    "Geography": "الجغرافيا",
                    "Math": "الرياضيات",
                    "Science": "العلوم",
                    "Philosophy": "الفلسفة",
                    "Physics": "الفيزياء",
                    "Chemistry": "الكمياء",
                    "French": "الفرنسي",
                    "Arabic": "العربية",
                    "Psychology": "العلم النفس",
                    // footer
                    "Your best choice for your Private Teacher": "أفضل خيار لك للحصول على مدرس خصوصي",
                    "Connect with us": "تواصل معنا",
                    "Site Map": "خريطة الموقع",
                    "Teachers": "المعلمين",
                    "Additional links": "روابط إضافية",
                    "soon": "قريبًا",
                    "soon 2": "قريبًا 2",
                    "Mailing List": "قائمة البريد",
                    "Enter your email address": "أدخل عنوان بريدك الإلكتروني",
                    "Your information is safe with us! Unsubscribe at any time": "معلوماتك آمنة معنا! يمكنك إلغاء الاشتراك في أي وقت",
                    "Privacy policy": "سياسة الخصوصية",
                    "Help and support": "المساعدة والدعم",
                    "Development By": "تم التطوير بواسطة",
                    "Subscription": "اشتراك",
                    // contact hero
                    "home": "الصفحة الرئيسية",
                    "teacher": "المعلم",
                    "contact": "اتصل",
                    "registerTeacher": "سجل كمعلم",
                    "contactPage": "اتصل",
                    "contactHeroTitle": "اتصل", // Added for Contact Hero
                    "contactHeroDescription": "لا تتردد في التواصل معنا لأي استفسارات.",
                    //title in about hero
                    "Start with sefihat": "ابدأ مع الصفحات",
                    "About us": "معلومات عنا",
                    "Teachers site is your ideal guide for choosing the best teachers": "موقع المعلمين هو دليلك المثالي لاختيار أفضل المعلمين",
                    "about-hero-title": "موقع المعلم الخاص هو من بين المواقع الرائدة في مجال التعليم التي تضيف للطلاب الكثير، لذلك يمكن لكل طالب أو ولي أمر البحث عن المعلم المناسب في المادة التي يرغب فيها من خلال مجموعة كبيرة من السير الذاتية المتاحة على الموقع التي تساعده في اتخاذ القرار المناسب.",
                    //teacher left
                    "All levels": "كل المراحل",
                    "junior": "مبتدئ",
                    "middle": "متوسط",
                    "senior": "محترف",
                    "Filter by rating": "التصنيف حسب التقييم",
                    "Type your search content here": "اكتب محتوى البحث هنا",
                    "geography":"جغرافيا",
                    "Majors": "التخصصات",
                    "Language teacher": "لغه المعلم",
                    "The Level":"المستوى",
                    //login
                    "You do not have an account":"هل لديك حساب",
                    "Student":" طالب",
                    //registration
                    "Register as a teacher":"سجل كمعلم",
                    "First Name":"الاسم الاول",
                    "Last Name":"الاسم الاخير",
                    "E-mail":"الايميل",
                    "Password":"كلمة المرور",
                    "Confirm Password": "تاكيد كلمه المرور",
                    "Phone":"رقم التليفون",
                    "Your description":"وصفك",
                    "Register":"تسجيل",
                    "I already have an account":"لدي حساب بالتأكيد",
                    //admin dashboard
                    "Delete":"حذف",
                    "Add Subject":"اضافه ماده",
                    "Add New Subject":"اضافه ماده جديدة",
                    "Subject Name":"اسم المادة ",
                    "Teacher Count":"عدد المعلمين",
                    "Enter subject name":"ادخل اسم المادة ",
                    "Upload Image":" ارفع الصوره",
                    "Admin Dashboard":"لوحه التحكم ",
                    "Actions":"التحكم",
                    "Image":"الصورة",
                    //Favorite pages
                    "Your Favorite Teachers":"المعلمين المفضلة لديك",
                    "No favorite teachers added yet.":"لم تتم إضافة أي مدرسين مفضلين حتى الآن.",


                    "about": {
                        "about": "حول",
                        "title": "ابدأ بـ Sfihat",
                        "heading": "لماذا تختار موقع المدرس الخصوصي؟",
                        "description": "نحن في موقع المدرس الخصوصي حريصون على اختيار أفضل الخبرات المقدمة من خلال مدرسي السيفتر، من أجل تقديم أفضل الكوادر التعليمية المتاحة في المجال التعليمي في الفترة الحالية.",
                        "easy_tutor": "من السهل العثور على المعلم المطلوب",
                        "easy_tutor_desc": "من السهل العثور على المعلم المطلوب."
                    },

                    "videoSection": {
                        "title": "أفضل اختيار للمعلمين",
                        "description": "أفضل مكان لاختيار المعلمين الخصوصيين"
                    },

                    "clientSection": {
                        "title": "آراء زبائننا",
                        "heading": "ماذا يقول زبائننا؟",
                        "description": "سيتم الإضافة قريبًا",
                        "client_message": "ابدأ بحثك الآن على موقع سيفهات المعلمين",
                        "client_name": "محمد ابراهيم",
                        "client_role": "طالب"
                    },
                    "contactUs": {
                        "contactUs": "اتصل بنا",
                        "emailTitle": "البريد الإلكتروني",
                        "email1": "info@tqniait.com",
                        "email2": "info@tqniait.com",
                        "phoneTitle": "الهاتف",
                        "privateTeacherSiteArabic": "موقع مدرس خصوصي",
                        "privateTeacherSiteEnglish": "موقع مدرس خصوصي",
                        "locationTitle": "موقعنا",
                        "locationDescription": "أفضل اختيار لك للحصول على مدرس خصوصي",
                        "stayInTouch": "ابقى على اتصال معنا",
                        "writeMessage": "اكتب رسالة:",
                        "titlePlaceholder": "العنوان",
                        "mailOrPhonePlaceholder": "البريد الإلكتروني أو الهاتف",
                        "messagePlaceholder": "الرسالة",
                        "sendButton": "إرسال"
                    }

                }
            }
        },
        lng: localStorage.getItem('i18nextLng') || 'en', // Load the saved language or default to English
        fallbackLng: 'en',
        interpolation: {
        escapeValue: false,
    },
    });

export default i18n;
