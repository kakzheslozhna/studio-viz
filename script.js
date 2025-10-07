document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'ru';

    const translations = {
        en: { showreel: 'SHOWREEL', product: 'PRODUCT', friends: 'FRIENDS', interesting: 'INTERESTING', contacts: 'CONTACTS', showreel_sub_0: 'Events decoration', showreel_sub_1: '3D visualization', showreel_sub_2: 'INTERACTIVE', product_sub_0: '3D VISUALIZATION', product_sub_1: 'Archviz', product_sub_2: 'CG content', product_sub_3: 'Museum', product_sub_4: 'Exhibition stands', interesting_sub_0: 'INTERACTIVE', interesting_sub_1: '3D realtime', interesting_sub_2: 'VR/AR/XR', interesting_sub_3: 'touches' },
        ru: { showreel: 'ШОУРИЛ', product: 'ПРОДУКТ', friends: 'ДРУЗЬЯ', interesting: 'ИНТЕРЕСНОЕ', contacts: 'КОНТАКТЫ', showreel_sub_0: 'Декорация событий', showreel_sub_1: '3D визуализация', showreel_sub_2: 'ИНТЕРАКТИВ', product_sub_0: '3D ВИЗУАЛИЗАЦИЯ', product_sub_1: 'Архвиз', product_sub_2: 'CG контент', product_sub_3: 'Музеи', product_sub_4: 'Выставочные стенды', interesting_sub_0: 'ИНТЕРАКТИВ', interesting_sub_1: '3D в реальном времени', interesting_sub_2: 'VR/AR/XR', interesting_sub_3: 'касания' }
    };
    
    const translatableElements = document.querySelectorAll('.translatable');

    function changeLanguage(lang) {
        translatableElements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang][key]) el.textContent = translations[lang][key];
        });
    }

    function animateAndChangeLanguage(newLang) {
        gsap.timeline()
          .to(translatableElements, { opacity: 0, y: -5, duration: 0.2, ease: 'power2.in' })
          .call(() => {
              currentLang = newLang;
              changeLanguage(newLang);
          })
          .to(translatableElements, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.02 });
    }

    const langToggle = document.getElementById('language-toggle');
    
    changeLanguage('ru');

    langToggle.addEventListener('click', () => {
        const isRu = currentLang === 'ru';
        const newLang = isRu ? 'en' : 'ru';
        langToggle.classList.toggle('en-active');
        animateAndChangeLanguage(newLang);
    });

    function toggleSubMenu(menuId) {
        const menuToToggle = document.getElementById(menuId);
        if (!menuToToggle) return;
        
        const isAlreadyActive = menuToToggle.classList.contains('active');
        const currentlyOpen = document.querySelector('.button-container.active');
        
        if (currentlyOpen && currentlyOpen !== menuToToggle) {
            currentlyOpen.classList.remove('active');
            gsap.to(currentlyOpen.querySelector('.sub-menu'), { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: function() { this.targets()[0].style.display = 'none'; } });
        }
        
        if (!isAlreadyActive) {
            menuToToggle.classList.add('active');
            const subMenu = menuToToggle.querySelector('.sub-menu');
            subMenu.style.display = 'block';
            gsap.fromTo(subMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: (currentlyOpen && currentlyOpen !== menuToToggle) ? 0.2 : 0 });
        } else {
            menuToToggle.classList.remove('active');
            gsap.to(menuToToggle.querySelector('.sub-menu'), { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: function() { this.targets()[0].style.display = 'none'; } });
        }
    }
    
    document.querySelectorAll('.button-container').forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.closest('.number')) return;
            toggleSubMenu(container.id)
        });
        container.querySelector('.number').addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleSubMenu(container.id);
        });
    });

    document.addEventListener('keydown', e => {
        if (['1', '2', '3', '4', '5'].includes(e.key)) toggleSubMenu(`menu-${e.key}`);
    });
    
    document.querySelectorAll('.sub-menu').forEach(sub => sub.style.display = 'none');

    document.querySelectorAll('.icon').forEach(icon => {
        const number = icon.closest('.button-container').querySelector('.number');

        // --- ИЗМЕНЕНИЕ: Новое значение тени для состояния покоя
        const originalBoxShadow = `
            inset -4px -4px 8px rgba(255, 255, 255, 0.7),
            inset 4px 4px 8px rgba(0, 0, 50, 0.15),
            8px 8px 18px rgba(0, 0, 0, 0.1)`;
        
        gsap.set(icon, { boxShadow: originalBoxShadow });

        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = (y / rect.height - 0.5) * -30; // Уменьшил наклон для большей "массивности"
            const rotateY = (x / rect.width - 0.5) * 30;
            
            gsap.to(icon, { 
                rotationX: rotateX, 
                rotationY: rotateY, 
                scale: 1.1, // Уменьшил масштаб для более "тяжелого" ощущения
                // --- ИЗМЕНЕНИЕ: Новое значение тени для состояния наведения (эффект усиливается)
                boxShadow: `
                    inset -3px -3px 6px rgba(255, 255, 255, 0.9),
                    inset 3px 3px 6px rgba(0, 0, 50, 0.2),
                    15px 15px 30px rgba(0, 0, 0, 0.15)`,
                duration: 0.5,
                ease: 'power2.out' 
            });

            gsap.to(number, {
                y: -10,
                x: 10,
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, { 
                rotationX: 0, 
                rotationY: 0, 
                scale: 1, 
                boxShadow: originalBoxShadow,
                duration: 1.2, 
                ease: 'elastic.out(1, 0.5)' 
            });

            gsap.to(number, {
                y: 0,
                x: 0,
                scale: 1,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // --- PSP WAVE ANIMATIONS & PAGE LOAD ---
    
    const wave1 = document.getElementById('wave-1');
    const wave2 = document.getElementById('wave-2');
    
    gsap.from('.logo-container', { y: -80, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
    gsap.from('.button-container', { y: 50, opacity: 0, duration: 1, stagger: 0.15, delay: 0.7, ease: 'power3.out' });

    [wave1, wave2].forEach((wave, index) => {
        const length = wave.getTotalLength();
        gsap.set(wave, {
            strokeDasharray: length,
            strokeDashoffset: length
        });
        gsap.to(wave, {
            strokeDashoffset: 0,
            duration: 3,
            delay: 0.5 + index * 0.2, 
            ease: 'power2.out'
        });
    });

    gsap.to(wave1, {
        x: "-=730",
        y: "+=10",
        repeat: -1,
        duration: 20,
        ease: 'sine.inOut',
        yoyo: true
    });

    gsap.to(wave2, {
        x: "+=730",
        y: "-=12",
        repeat: -1,
        duration: 25,
        ease: 'sine.inOut',
        yoyo: true
    });
});