// booking-requests.html
let activePatient = "";

function openConfirmationModal(name) {
    activePatient = name;
    document.getElementById('modalPatientName').innerText = name;
    document.getElementById('appointmentDay').value = "";
    document.getElementById('appointmentTime').value = "";
    showModal('confirmModal');
}

function processConfirmation() {
    const day = document.getElementById('appointmentDay').value;
    const time = document.getElementById('appointmentTime').value;

    if (!day || !time) {
        alert("يرجى إدخال اليوم وتوقيت الساعة أولاً لإجراء العملية بنجاح.");
        return;
    }

    closeModal('confirmModal');
    // طباعة الصيغة المطلوبة بدقة متناهية
    alert(`تم تأكيد حجز المريض بنجاح:\n\n"موعدك يوم (${day}) الساعة (${time})"`);
}

function openPatientModal(name, age, phone, reason) {
    document.getElementById('pModalName').innerText = name;
    document.getElementById('pModalAge').innerText = age;
    document.getElementById('pModalPhone').innerText = phone;
    document.getElementById('pModalReason').innerText = reason;
    showModal('patientModal');
}

function openFilesModal(filesArray) {
    const container = document.getElementById('filesModalContainer');
    container.innerHTML = "";
    filesArray.forEach(file => {
        container.innerHTML += `
          <div class="p-2.5 bg-input/60 dark:bg-[#001D47] border border-border dark:border-white/5 rounded-xl flex items-center justify-between">
            <span class="text-primary dark:text-white font-bold"><i class="fa-solid fa-file-pdf text-red-500 ml-1.5"></i>${file}</span>
            <a href="#" class="text-secondary dark:text-icon underline hover:opacity-80">تحميل واستعراض</a>
          </div>
        `;
    });
    showModal('filesModal');
}

function rejectRequest(name) {
    confirm(`هل أنت متأكد من رفض طلب الحجز الإلكتروني المقدم من المريض: ${name}؟`);
}

function showModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}



// appointments-management.html
let selectedPatient = "";

// فتح نافذة التعديل
function openEditModal(name, currentTime) {
    selectedPatient = name;
    document.getElementById('editPatientName').innerText = name;
    document.getElementById('newTimeInput').value = currentTime;
    showModal('editModal');
}

function processEdit() {
    const time = document.getElementById('newTimeInput').value;
    alert(`تم تعديل موعد المريض (${selectedPatient}) بنجاح إلى التوقيت الجديد: ${time}`);
    closeModal('editModal');
}

// فتح نافذة التأجيل
function openDeferModal(name) {
    selectedPatient = name;
    document.getElementById('deferPatientName').innerText = name;
    showModal('deferModal');
}

function processDefer() {
    alert(`تمت عملية تأجيل موعد المريض (${selectedPatient}) بنجاح وترحيل البيانات بالجدول.`);
    closeModal('deferModal');
}

// تفعيل إلغاء الموعد الفوري
function cancelAppointment(name) {
    const confirmAction = confirm(`هل أنت متأكد تماماً من إلغاء حجز الموعد الحالي للمريض: ${name}؟`);
    if (confirmAction) {
        alert("تم إلغاء الموعد بنجاح وحذف السجل من جدول اليوم الحالي.");
    }
}

// وظائف المساعدين للمودال
function showModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

//center-notifications.html



// 1. معالجة إرسال إشعار لمريض معين
function sendCustomNotification(event) {
    event.preventDefault();
    const patient = document.getElementById('targetPatient').value;
    const type = document.getElementById('notificationType').value;
    const msg = document.getElementById('notificationText').value;

    if (!msg.trim()) {
        alert("يرجى كتابة نص التنبيه أولاً قبل الإرسال.");
        return;
    }

    alert(`تم بث الإشعار الموجه بنجاح:\nالمستلم: ${patient}\nالتصنيف: ${type}\nالرسالة المرسلة: "${msg}"`);
    document.getElementById('notificationText').value = ""; // تفريغ الحقل
}

// 2. معالجة تغيير موعد وإرسال التحديث للمريض
function sendTimeChangeNotification(event) {
    event.preventDefault();
    const patient = document.getElementById('changePatient').value;
    const day = document.getElementById('changeDay').value;
    const time = document.getElementById('changeTime').value;

    if (!day.trim() || !time.trim()) {
        alert("يرجى إدخال البيانات المطلوبة لليوم الجديد والساعة لتغيير الموعد.");
        return;
    }

    // إظهار التنبيه التعديلي بصيغته المنظمة والمحاكاة لربط الباكيند 
    alert(`تم تغيير موعد المريض (${patient}) بنجاح وإرسال التنبيه الآلي التالي له:\n\n"تم تعديل موعدك ليصبح يوم (${day}) الساعة (${time})"`);

    // تفريغ الحقول بعد نجاح التثبيت
    document.getElementById('changeDay').value = "";
    document.getElementById('changeTime').value = "";
}
