
document.addEventListener("DOMContentLoaded", () => {
    const dailyView = document.getElementById("daily-view");
    const weeklyView = document.getElementById("weekly-view");
    const btnDaily = document.getElementById("btn-daily-view");
    const btnWeekly = document.getElementById("btn-weekly-view");

    // دالة التبديل وإدارة الكلاسات النشطة بالأزرار
    function switchView(viewType) {
        if (viewType === "daily") {
            dailyView.classList.remove("hidden");
            weeklyView.classList.add("hidden");

            // تحديث تصميم الزر النشط (العرض اليومي)
            btnDaily.className = "px-4 py-2 rounded-lg font-bold transition-all bg-primary text-white dark:bg-[#003A87]";
            btnWeekly.className = "px-4 py-2 rounded-lg font-bold transition-all text-gray-500 dark:text-gray-400";
        } else if (viewType === "weekly") {
            weeklyView.classList.remove("hidden");
            dailyView.classList.add("hidden");

            // تحديث تصميم الزر النشط (العرض الأسبوعي)
            btnWeekly.className = "px-4 py-2 rounded-lg font-bold transition-all bg-primary text-white dark:bg-[#003A87]";
            btnDaily.className = "px-4 py-2 rounded-lg font-bold transition-all text-gray-500 dark:text-gray-400";
        }
    }

    // تفعيل النقر على الأزرار العليا
    btnDaily.addEventListener("click", () => switchView("daily"));
    btnWeekly.addEventListener("click", () => switchView("weekly"));

    // تفعيل ميزة النقر على أيام المخطط الأسبوعي للعودة السريعة للعرض اليومي
    const weekDayCards = document.querySelectorAll("#weekly-view .grid-cols-7 > div");

    weekDayCards.forEach((card) => {
        // حماية هيدر أيام الأسبوع من النقر
        if (!card.classList.contains("text-gray-600") && !card.classList.contains("text-secondary")) {
            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                const dateText = card.querySelector(".text-\\[10px\\]")?.innerText || "المحدد";
                const dateTitle = document.getElementById("current-date-title");

                if (dateTitle) {
                    dateTitle.innerText = dateText;
                }
                // العودة للعرض اليومي فوراً واستعراض الحالات
                switchView("daily");
            });
        }
    });
});
