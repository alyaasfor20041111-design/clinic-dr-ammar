
document.querySelectorAll('input[name="user-role"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        const role = e.target.value;
        const infoTitle = document.querySelector('#section-info-title span');
        const infoIcon = document.querySelector('#section-info-icon');
        const lblName = document.querySelector('#lbl-name');

        const dynamicField1 = document.querySelector('#dynamic-field-1');
        const dynamicField2 = document.querySelector('#dynamic-field-2');

        if (role === 'patient') {
            infoTitle.textContent = 'البيانات الشخصية للمريض';
            infoIcon.className = 'fa-solid fa-user-injured text-secondary dark:text-icon';
            lblName.textContent = 'الاسم الكامل الثلاثي:';

            // إعادة بناء الحقول المتغيرة للمريض (عمر وجنس)
            dynamicField1.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">العمر:</label>
            <input type="number" placeholder="مثال: 35" class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-right" required />
          `;
            dynamicField2.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">الجنس:</label>
            <div class="relative">
              <select class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-right appearance-none" required>
                <option value="" disabled selected>اختر الجنس</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-primary/50 dark:text-white/50"><i class="fa-solid fa-chevron-down text-[10px]"></i></div>
            </div>
          `;
        } else if (role === 'doctor') {
            infoTitle.textContent = 'البيانات المهنية والطبية للطبيب';
            infoIcon.className = 'fa-solid fa-user-doctor text-secondary dark:text-icon';
            lblName.textContent = 'اسم الطبيب (كما هو بالترخيص):';

            // تغيير الحقول لتناسب الطبيب (التخصص ورقم الترخيص)
            dynamicField1.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">التخصص الطبي:</label>
            <input type="text" placeholder="مثال: طب وجراحة القلب" class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-right" required />
          `;
            dynamicField2.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">رقم ترخيص الممارسة الطبي:</label>
            <input type="text" placeholder="مثال: DOC-123456" class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-left" dir="ltr" required />
          `;
        } else if (role === 'secretary') {
            infoTitle.textContent = 'البيانات الشخصية والوظيفية للسكرتارية';
            infoIcon.className = 'fa-solid fa-user-tie text-secondary dark:text-icon';
            lblName.textContent = 'الاسم الكامل للموظف/ـة:';

            // تغيير الحقول لتناسب السكرتارية (المؤهل ورقم الهوية الموظف)
            dynamicField1.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">المؤهل الدراسي / الخبرة:</label>
            <input type="text" placeholder="مثال: دبلوم إدارة مستشفيات أو إدارة أعمال" class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-right" required />
          `;
            dynamicField2.innerHTML = `
            <label class="text-xs font-bold text-primary/70 dark:text-gray-300 block">الرقم الوظيفي أو الداخلي المخصص للعيادة:</label>
            <input type="text" placeholder="مثال: SEC-2026" class="w-full bg-input/50 dark:bg-[#00265C]/50 border border-border/60 dark:border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-button dark:focus:border-icon transition-colors text-left" dir="ltr" required />
          `;
        }
    });
});
