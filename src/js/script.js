var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

});


// --- الجزء الثاني: التحكم بالـ Sidebar (فتح وإغلاق المتجاوب) ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const sidebarCloseButton = document.getElementById('sidebar-close-button');
const mobileSidebar = document.getElementById('mobile-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarContent = document.getElementById('sidebar-content');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

function openSidebar() {
  mobileSidebar.classList.remove('pointer-events-none');
  sidebarOverlay.classList.remove('opacity-0');
  sidebarOverlay.classList.add('opacity-100');
  sidebarContent.classList.remove('translate-x-full');
  sidebarContent.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden'; // تجميد التمرير في الخلفية
}

function closeSidebar() {
  sidebarOverlay.classList.remove('opacity-100');
  sidebarOverlay.classList.add('opacity-0');
  sidebarContent.classList.remove('translate-x-0');
  sidebarContent.classList.add('translate-x-full');

  setTimeout(() => {
    mobileSidebar.classList.add('pointer-events-none');
    document.body.style.overflow = ''; // إلغاء تجميد التمرير
  }, 300); // متوافق مع وقت الـ transition (duration-300)
}

mobileMenuButton?.addEventListener('click', openSidebar);
sidebarCloseButton?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// ربط زر موبايل سايدبار بالزر الرئيسي منعاً لتكرار الأكواد
themeToggleMobileBtn?.addEventListener('click', () => {
  themeToggleBtn?.click();
});
// section statistics
document.addEventListener("DOMContentLoaded", () => {
  // بيانات القسم مصاغة بطريقة تسمح بفصل الأرقام عن الرموز لعرضها بجمالية هائلة
  const linearStatsData = [
    {
      targetNumber: 15,
      prefix: "+",
      suffix: "",
      label: "عاماً من الخبرة الجراحية",
      icon: "fa-user-doctor"
    },
    {
      targetNumber: 8000,
      prefix: "+",
      suffix: "",
      label: "عملية منظار ناجحة",
      icon: "fa-laptop-medical"
    },
    {
      targetNumber: 99.2,
      prefix: "",
      suffix: "%",
      label: "نسبة الأمان والتعافي",
      icon: "fa-heart-pulse"
    },
    {
      targetNumber: 20,
      prefix: "+",
      suffix: "",
      label: "اعتماداً طبياً دولياً",
      icon: "fa-award"
    }
  ];

  const linearContainer = document.getElementById("linear-counters-container");

  if (!linearContainer) return;

  // 1. بناء الهيكل المفتوح وضخ الأعمدة الفاصلة الذكية
  linearContainer.innerHTML = linearStatsData.map((stat, index) => {
    // إضافة خط فاصل عمودي بين العناصر يختفي في الشاشات الصغيرة
    const isLast = index === linearStatsData.length - 1;
    const borderClasses = !isLast ? "lg:border-l lg:border-slate-200/60 lg:dark:border-white/5" : "";

    return `
      <div class="flex flex-col items-center lg:items-start px-8 py-4 text-center lg:text-right group relative transition-all duration-500 ${borderClasses}">
        
        <div class="text-slate-300 dark:text-slate-600 group-hover:text-secondary dark:group-hover:text-icon text-base mb-4 transition-colors duration-500 transform group-hover:-translate-y-1">
          <i class="fa-solid ${stat.icon}"></i>
        </div>

        <div class="space-y-2">
          <h3 class="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tighter text-primary dark:text-white flex items-baseline justify-center lg:justify-start gap-0.5">
            <span class="count-number-linear" data-index="${index}">0</span>
            <span class="text-secondary dark:text-icon text-2xl lg:text-3xl font-bold font-primary opacity-80 group-hover:opacity-100 transition-opacity">${stat.prefix || stat.suffix}</span>
          </h3>
          
          <p class="text-xs md:text-sm font-primary font-black text-slate-400 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">
            ${stat.label}
          </p>
        </div>

        <div class="absolute bottom-0 right-8 left-8 lg:left-auto lg:w-0 h-[2px] bg-secondary dark:bg-icon rounded-full lg:group-hover:w-24 transition-all duration-500"></div>

      </div>
    `;
  }).join('');

  // 2. دالة تشغيل العداد السينمائي (Cinematic Counter Animation)
  const animateCounter = (element, target) => {
    const duration = 2500; // مدة الحركة هادئة وانسيابية للغاية
    const startTime = performance.now();
    const isFloat = target % 1 !== 0;

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // معادلة تباطؤ فائقة النعومة (Quart Ease-Out) لمنع أي قفزات بصرية
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeProgress * target;

      if (isFloat) {
        element.textContent = currentValue.toFixed(1);
      } else {
        element.textContent = Math.floor(currentValue).toLocaleString('en-US');
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = isFloat ? target.toFixed(1) : target.toLocaleString('en-US');
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // 3. تفعيل مراقبة الشاشة الحساسة (Intersection Observer)
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberElements = entry.target.querySelectorAll('.count-number-linear');
        numberElements.forEach(el => {
          const index = el.getAttribute('data-index');
          const target = linearStatsData[index].targetNumber;
          animateCounter(el, target);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(linearContainer);
});

// section casses 
document.addEventListener("DOMContentLoaded", () => {
  // مصفوفة البيانات بالصور الجراحية والسريرية الحقيقية تحت بعضها
  const verticalCasesData = [
    {
      code: "حالة رقم #812",
      title: "جراحة مناظير الجهاز الهضمي الدقيقة",
      duration: "فترة المتابعة: 3 أشهر",
      notes: "تم استئصال الأنسجة المتضخمة بالمنظار المتقدم بنجاح كامل وبدون أي شق جراحي مفتوح، وعادت المؤشرات الحيوية لطبيعتها.",
      // صور حقيقية تخصصية (فحص وتنظير ومتابعة)
      imgBefore: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      imgAfter: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
    },
    {
      code: "حالة رقم #405",
      title: "إصلاح الفتق الإربي وترميم جدار البطن",
      duration: "فترة المتابعة: 6 أشهر",
      notes: "تمت تقوية الجدار العضلي وتثبيت الشبكة الداعمة المتطورة بنجاح، مما سمح للمريض بالعودة للحياة الطبيعية والأنشطة البدنية.",
      imgBefore: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      imgAfter: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const gridContainer = document.getElementById("vertical-cases-grid");

  // بناء الكروت بهيكل رأسي (الصور تحت بعضها مباشرة)
  gridContainer.innerHTML = verticalCasesData.map((item) => {
    return `
          <div class="bg-slate-50 dark:bg-[#001D47]/40 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-sm text-right">
            
            <div class="flex justify-between items-center gap-4">
              <h3 class="text-base sm:text-lg font-primary font-bold text-primary dark:text-white leading-tight">${item.title}</h3>
              <span class="text-[10px] font-mono font-bold bg-white dark:bg-[#00265C] border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md shrink-0 shadow-sm">${item.code}</span>
            </div>

            <div class="flex flex-col gap-4">
              
              <div class="relative h-[220px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner bg-slate-100 dark:bg-[#00265C]">
                <img src="${item.imgBefore}" class="w-full h-full object-cover" alt="Before Surgery" />
                <span class="absolute bottom-3 right-3 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-md shadow-md tracking-wide">وضع الحالة: قـبـل الجراحة</span>
              </div>

              <div class="relative h-[220px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner bg-slate-100 dark:bg-[#00265C]">
                <img src="${item.imgAfter}" class="w-full h-full object-cover" alt="After Recovery" />
                <span class="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-md shadow-md tracking-wide">النتيجة: بـعـد الـتـعـافـي ✓</span>
              </div>

            </div>

            <div class="pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-3">
              <p class="text-xs font-secondary text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong class="text-primary dark:text-white font-medium">البيان الطبي للمتابعة:</strong> ${item.notes}
              </p>
              <div class="flex justify-start">
                <span class="text-[10px] font-secondary text-secondary dark:text-icon bg-white dark:bg-[#00265C] border border-slate-200/60 dark:border-white/10 px-3 py-1 rounded-md font-bold shadow-sm">
                  <i class="fa-solid fa-clock-rotate-left ml-1"></i>${item.duration}
                </span>
              </div>
            </div>

          </div>
        `;
  }).join('');
});

// section doctor
document.addEventListener("DOMContentLoaded", () => {
  // مصفوفة الشهادات والخبرات الطبية للجرّاح لسهولة التعديل والتخصيص
  const surgeonCredentials = [
    {
      icon: "fa-graduation-cap",
      title: "الزمالة الملكية البريطانية (FRCS)",
      desc: "زميل كلية الجراحين الملكية في لندن وجراحة الجهاز الهضمي."
    },
    {
      icon: "fa-award",
      title: "خبرة سريرية +15 عاماً",
      desc: "إجراء أكثر من 8000 تدخل جراحي وتنظيري متقدم بنجاح."
    },
    {
      icon: "fa-microscope",
      title: "دبلوم الجراحة الفوق دقيقة",
      desc: "متخصص في استئصال الأورام وإصلاح الفتوق المعقدة بالمناظير."
    },
    {
      icon: "fa-hospital-user",
      title: "عضوية الجمعية العالمية (IFSO)",
      desc: "عضو فاعل ومشارك في المؤتمرات الدولية لأبحاث جراحات السمنة."
    }
  ];

  const credentialsGrid = document.getElementById("surgeon-credentials-grid");

  // بناء وحقن بطاقات المؤهلات بستايل هندسي نظيف متوازن
  credentialsGrid.innerHTML = surgeonCredentials.map((cred) => {
    return `
          <div class="bg-slate-50 dark:bg-[#001D47]/40 border border-slate-200/60 dark:border-white/5 rounded-2xl p-4 flex gap-4 transition-all duration-300 hover:shadow-sm">
            <div class="w-10 h-10 rounded-xl bg-white dark:bg-[#00265C] border border-slate-100 dark:border-white/10 text-secondary dark:text-icon flex items-center justify-center text-base shrink-0 shadow-sm">
              <i class="fa-solid ${cred.icon}"></i>
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-primary font-bold text-primary dark:text-white leading-tight">${cred.title}</h4>
              <p class="text-xs font-secondary text-slate-500 dark:text-slate-400 leading-relaxed">${cred.desc}</p>
            </div>
          </div>
        `;
  }).join('');
});

//Section FQA
document.addEventListener("DOMContentLoaded", () => {
  // مصفوفة بيانات الأسئلة والأجوبة الطبية والجراحية
  const faqData = [
    {
      question: "كم تستغرق فترة التعافي بعد جراحة المنظار المتقدمة؟",
      answer: "في معظم جراحات التدخل المحدود والمناظير، يستطيع المريض مغادرة المستشفى خلال 24 ساعة فقط، والعودة لممارسة الأنشطة اليومية الخفيفة والعمل المكتبي في غضون 5 إلى 7 أيام، بينما يكتمل الشفاء العضلي التام خلال 4 أسابيع."
    },
    {
      question: "هل عمليات تكميم المعدة آمنة على المدى الطويل؟",
      answer: "نعم، تُصنف جراحات السمنة الحديثة اليوم كإجراءات آمنة للغاية وتماثل نسب أمان جراحات المرارة، حيث نعتمد على الدباسات الذكية المتطورة ونظام التحضير الطبي الدقيق للمريض قبل العملية لتفادي أي مضاعفات."
    },
    {
      question: "متى يمكنني ممارسة الرياضة وحمل الأثقال بعد جراحة الفتق؟",
      answer: "يمكن البدء بالمشي الخفيف من اليوم الأول بعد الجراحة لتعشيق الدورة الدموية. أما بالنسبة للتمارين العنيفة، الجري، أو رفع الأوزان الثقيلة، فيجب تجنبها تماماً لمدة تتراوح بين 6 إلى 8 أسابيع لضمان ثبات الشبكة الداعمة والتحام الأنسجة."
    },
    {
      question: "هل تترك جراحات المناظير ندبات واضحة على البطن؟",
      answer: "بالتأكيد لا؛ تتميز جراحات المناظير بأنها تُجرى عبر فتحات مجهرية دقيقة تتراوح بين 5 إلى 10 ملم فقط، ويتم إغلاقها تجميلياً بغرز داخلية مخفية، مما يجعلها تختفي تدريجياً وبشكل شبه كامل بعد أشهر قليلة من التعافي."
    }
  ];

  const faqContainer = document.getElementById("faq-accordion-container");

  // 1. بناء وحقن كود الأكورديون داخل الصفحة
  faqContainer.innerHTML = faqData.map((item, index) => {
    return `
        <div class="faq-item border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-[#001D47]/40 rounded-2xl overflow-hidden transition-all duration-300">
          
          <button class="faq-trigger w-full flex items-center justify-between p-6 text-right focus:outline-none group select-none">
            <span class="text-base font-primary font-bold text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-icon transition-colors duration-300">
              ${item.question}
            </span>
            <span class="faq-icon w-8 h-8 rounded-xl bg-white dark:bg-[#00265C] border border-slate-100 dark:border-white/10 flex items-center justify-center text-primary/50 dark:text-slate-400 text-xs shrink-0 transition-transform duration-300 shadow-sm">
              <i class="fa-solid fa-chevron-down"></i>
            </span>
          </button>

          <div class="faq-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div class="p-6 pt-0 border-t border-slate-200/40 dark:border-white/5 mt-0">
              <p class="text-sm font-secondary text-slate-500 dark:text-slate-300 leading-relaxed">
                ${item.answer}
              </p>
            </div>
          </div>

        </div>
      `;
  }).join('');

  // 2. تفعيل منطق الحركة والفتح التبادلي (تأثير آرت جرافيك مرن)
  const triggers = document.querySelectorAll(".faq-trigger");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", function () {
      const parent = this.parentElement;
      const content = parent.querySelector(".faq-content");
      const icon = this.querySelector(".faq-icon");

      // التحقق مما إذا كان السؤال الحالي مفتوحاً بالفعل
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      // إغلاق كافة الأسئلة الأخرى المفتوحة أولاً لضمان تجربة مستخدم نظيفة (اختياري)
      document.querySelectorAll(".faq-content").forEach(c => {
        c.style.maxHeight = "0px";
        c.style.opacity = "0";
      });
      document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("bg-white", "dark:bg-[#001D47]", "shadow-md");
        item.classList.add("bg-slate-50/50", "dark:bg-[#001D47]/40");
      });

      // إذا لم يكن مفتوحاً، قم بفتحه وتدوير الأيقونة
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        icon.style.transform = "rotate(180deg)";

        // تمييز الكارت المفتوح بظلال وألوان مريحة للعين
        parent.classList.remove("bg-slate-50/50", "dark:bg-[#001D47]/40");
        parent.classList.add("bg-white", "dark:bg-[#001D47]", "shadow-md");
      }
    });
  });
});


const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownArrow = document.getElementById('dropdownArrow');

// عند الضغط على الزر
dropdownBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // منع انتشار الحدث
  dropdownMenu.classList.toggle('hidden');
  dropdownArrow.classList.toggle('rotate-180');
});

// إغلاق القائمة تلقائياً إذا نقر المستخدم في أي مكان آخر خارج القائمة
document.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add('hidden');
    dropdownArrow.classList.remove('rotate-180');
  }
});


