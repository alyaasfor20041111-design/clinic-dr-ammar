document.addEventListener("DOMContentLoaded", () => {

  // 1. ⚠️ شرط تسجيل الدخول المسبق (Authentication Guard)
  const checkUserAuthentication = () => {
    // محاكاة حالة التحقق من الجلسة؛ يمكن تبديلها إلى false لغلق الصفحة
    const isUserLoggedIn = true; 

    if (!isUserLoggedIn) {
      alert("⚠️ وصول غير مصرح: يجب عليك تسجيل الدخول مسبقاً للوصول إلى صفحة حجز الموعد.");
      window.location.href = "login.html"; // التوجيه الفوري لصفحة تسجيل الدخول
      return false;
    }
    return true;
  };

  // إيقاف تشغيل الكود في حال لم يتحقق الشرط الأساسي
  if (!checkUserAuthentication()) return;

  const bookingForm = document.getElementById("medical-booking-form");
  const cancelButton = document.getElementById("btn-cancel");

  if (bookingForm) {
    
    // 2. 📎 مراقبة وتحديث واجهة تسمية الملفات المرفوعة ديناميكياً
    const fileFields = [
      { id: "file-lab", statusId: "status-lab", defaultText: "تحاليل طبية" },
      { id: "file-xray", statusId: "status-xray", defaultText: "أشعة سينية / مقطعية" },
      { id: "file-echo", statusId: "status-echo", defaultText: "تخطيط قلب / إيكو" }
    ];

    fileFields.forEach(field => {
      const inputEl = document.getElementById(field.id);
      const statusEl = document.getElementById(field.statusId);

      if (inputEl && statusEl) {
        inputEl.addEventListener("change", (e) => {
          if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            statusEl.innerHTML = `<i class="fa-solid fa-paperclip text-emerald-500 ml-1"></i> جاهز: ${fileName.substring(0, 15)}...`;
            statusEl.classList.add("text-emerald-500", "font-bold");
          } else {
            statusEl.textContent = "اضغط للرفع";
            statusEl.classList.remove("text-emerald-500", "font-bold");
          }
        });
      }
    });

    // 3. 🔘 زر إلغاء وتفريغ الاستمارة
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        if (confirm("هل أنت متأكد من رغبتك في إلغاء الحجز وتصفير الحقول؟")) {
          bookingForm.reset();
          fileFields.forEach(field => {
            const statusEl = document.getElementById(field.statusId);
            if (statusEl) {
              statusEl.textContent = "اضغط للرفع";
              statusEl.classList.remove("text-emerald-500", "font-bold");
            }
          });
        }
      });
    }

    // 4. 📌 عند إرسال الاستمارة وتطبيق منطق السجلات الطبية
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("patient-name").value;
      const age = document.getElementById("patient-age").value;
      const gender = document.getElementById("patient-gender").value === "male" ? "ذكر" : "أنثى";
      const hasVisitedBefore = document.getElementById("clinic-visited").value;
      const notes = document.getElementById("additional-notes").value;

      // تطبيق منطق شرط المراجع المذكور في المتطلبات
      let recordLogText = "";
      if (hasVisitedBefore === "yes") {
        recordLogText = "🔄 منطق النظام: تم العثور على مراجع سابق. استخدام نفس السجل الطبي الحالي للربط المباشر.";
      } else {
        recordLogText = "🆕 منطق النظام: مراجع جديد بالكامل. إنشاء سجل طبي رقمي جديد وإسناد الملفات المرفقة إليه.";
      }

      // تجميع الكائن الإحصائي للبيانات النهائية
      const payload = {
        authenticated: true,
        patient_profile: { name, age: parseInt(age), gender },
        system_logic: { visited_before: hasVisitedBefore === "yes", action: hasVisitedBefore === "yes" ? "USE_EXISTING_RECORD" : "CREATE_NEW_RECORD" },
        attachments_linked: true,
        free_textarea_notes: notes
      };

      console.log("📂 Data Layer Object Created:", payload);

      // إشعار التأكيد النهائي المنبثق
      alert(
        `✅ تم استلام طلب تأكيد الحجز بنجاح!\n\n` +
        `👤 المريض: ${name} (${age} سنة - ${gender})\n` +
        `📝 الملاحظات المرفقة: ${notes ? notes : "لا يوجد"}\n\n` +
        `${recordLogText}`
      );

      // تفريغ النموذج بعد إتمام العملية بنجاح
      bookingForm.reset();
      fileFields.forEach(field => {
        const statusEl = document.getElementById(field.statusId);
        if (statusEl) {
          statusEl.textContent = "اضغط للرفع";
          statusEl.classList.remove("text-emerald-500", "font-bold");
        }
      });
    });

  }
});