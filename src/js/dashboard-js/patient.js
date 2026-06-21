// patient-record.html 
function switchRecordTab(tabName) {
    const sections = ['tests', 'xray', 'echo', 'history'];

    sections.forEach(s => {
        document.getElementById(`section-${s}`).classList.add('hidden');

        // إرجاع الأزرار الغير نشطة لشكلها الافتراضي
        const btn = document.getElementById(`tab-${s}`);
        btn.className = "px-5 py-3 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white font-medium transition-all";
    });

    // إظهار القسم المطلوب وتنشيط الزر الخاص به
    document.getElementById(`section-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-${tabName}`).className = "px-5 py-3 border-b-2 border-secondary dark:border-icon text-secondary dark:text-icon font-bold transition-all";
}
