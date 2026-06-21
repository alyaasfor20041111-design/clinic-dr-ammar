document.addEventListener('DOMContentLoaded', () => {
  // جلب العناصر الحيوية من الـ HTML بواسطة المعرفات (IDs)
  const toggleBtn = document.getElementById('mobile-sidebar-toggle');
  const closeBtn = document.getElementById('doctor-sidebar-close');
  const overlay = document.getElementById('doctor-sidebar-overlay');
  const content = document.getElementById('doctor-sidebar-content');
  const sidebarContainer = document.getElementById('doctor-mobile-sidebar');

  // دالة المسؤولة عن فتح القائمة الجانبية وتفعيل التأثيرات البصرية
  function openSidebar() {
    sidebarContainer.classList.remove('pointer-events-none');
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
    content.classList.remove('translate-x-full');
    content.classList.add('translate-x-0');
  }

  // الدالة المسؤولة عن إغلاق القائمة الجانبية وإرجاع التأثيرات لوضعها الافتراضي
  function closeSidebar() {
    sidebarContainer.classList.add('pointer-events-none');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    content.classList.remove('translate-x-0');
    content.classList.add('translate-x-full');
  }

  // ربط الأحداث (Event Listeners) بالعناصر عند النقر
  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
});