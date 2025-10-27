// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // === ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ===
    let currentLang = 'ru';

    const translations = {
        en: { showreel: 'SHOWREEL', showreel_sub_0: 'Event (Decorations)', showreel_sub_1: 'Visualization', showreel_sub_2: 'Interactive', production: 'PRODUCTION', production_sub_0: 'Visualization', production_sub_1: 'Archive', production_sub_2: 'CG content', production_sub_3: 'Museums', production_sub_4: 'Exhibition stands', production_sub_5: 'Interactive', production_sub_6: '3D realtime', production_sub_7: 'VR/AR/XR', production_sub_8: 'Touch screens', friends: 'FRIENDS', friends_sub_0: 'Fabrika Art (Stage design & decorations)', friends_sub_1: 'Archgenerate (Architect)', friends_sub_2: 'Zimina (Architect & Decor)', friends_sub_3: 'Mainroad Post (CGI/Postprod)', friends_sub_4: 'Sanshi Team (Motion capture artist)', friends_sub_5: 'Planetarium (SPB)', friends_sub_6: 'Vintov', friends_sub_7: 'Melnitsa (Animation)', friends_sub_8: 'Kraft (Film decorations)', interesting: 'INTERESTING', interesting_sub_0: 'Retro video games', interesting_sub_1: '3D printing', interesting_sub_2: 'Decor, Floral compositions', interesting_sub_3: 'YouTube channel', interesting_sub_4: 'Our workshop', interesting_sub_5: 'Touch devices (Rental)', interesting_sub_6: 'Places online (WEB)', contacts: 'CONTACTS', contacts_sub_0: 'Mobile', contacts_sub_1: 'Email', contacts_sub_2: 'Telegram', contacts_sub_3: 'Instagram', contacts_sub_4: 'About us' },
        ru: { showreel: 'ШОУРИЛ', showreel_sub_0: 'Эвент (Декорации)', showreel_sub_1: 'Визуализация', showreel_sub_2: 'Интерактив', production: 'ПРОДУКЦИЯ', production_sub_0: 'Визуализация', production_sub_1: 'Архив', production_sub_2: 'CG контент', production_sub_3: 'Музеи', production_sub_4: 'Выставочные стенды', production_sub_5: 'Интерактив', production_sub_6: '3D реалтайм', production_sub_7: 'VR/AR/XR', production_sub_8: 'Тач-экраны', friends: 'ДРУЗЬЯ', friends_sub_0: 'Фабрика Арт (Stage design & decorations)', friends_sub_1: 'Archgenerate (Architect)', friends_sub_2: 'Zimina (Architect & Decor)', friends_sub_3: 'Mainroad post (CGI/Postprod)', friends_sub_4: 'Sanshi team (Motion capture artist)', friends_sub_5: 'Планетарий (СПБ)', friends_sub_6: 'Винтов', friends_sub_7: 'Мельница (Анимация)', friends_sub_8: 'Крафт (Декорации кино)', interesting: 'ИНТЕРЕСНОЕ', interesting_sub_0: 'Ретро видео игры', interesting_sub_1: '3D печать', interesting_sub_2: 'Декор, цветочные композиции', interesting_sub_3: 'Youtube-канал', interesting_sub_4: 'Наша мастерская', interesting_sub_5: 'Тач-устройства (Аренда)', interesting_sub_6: 'Онлайн-площадки (WEB)', contacts: 'КОНТАКТЫ', contacts_sub_0: 'Мобильный', contacts_sub_1: 'Почта', contacts_sub_2: 'Telegram', contacts_sub_3: 'Instagram', contacts_sub_4: 'О нас' }
    };

    // === ССЫЛКИ НА DOM-ЭЛЕМЕНТЫ ===
    const translatableElements = document.querySelectorAll('.translatable');
    const langToggle = document.getElementById('language-toggle');
    const preloader = document.getElementById('preloader');
    const preloaderVideo = document.getElementById('preloader-video');
    const appContainer = document.getElementById('app-container');

    // === ОСНОВНЫЕ ФУНКЦИИ ===
    function changeLanguage(lang) { translatableElements.forEach(el => { const key = el.dataset.key; if (translations[lang][key]) el.textContent = translations[lang][key]; }); }
    function animateAndChangeLanguage(newLang) { gsap.timeline().to(translatableElements, { opacity: 0, y: -5, duration: 0.2, ease: 'power2.in' }).call(() => { currentLang = newLang; changeLanguage(newLang); }).to(translatableElements, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.02 }); }
    
    // НОВАЯ ФУНКЦИЯ: Проверка на мобильное устройство
    function isMobile() {
        return window.matchMedia("(max-width: 800px)").matches;
    }

    // ПЕРЕРАБОТАННАЯ ФУНКЦИЯ: Управляет открытием/закрытием меню
    function toggleSubMenu(menuId) {
        const menuToToggle = document.getElementById(menuId);
        if (!menuToToggle) return;
        
        const subMenuToToggle = menuToToggle.querySelector('.sub-menu');
        const isAlreadyActive = menuToToggle.classList.contains('active');
        const currentlyOpen = document.querySelector('.button-container.active');
        
        // Закрываем текущее открытое меню, если оно есть и не является тем, на которое кликнули
        if (currentlyOpen && currentlyOpen !== menuToToggle) {
            currentlyOpen.classList.remove('active');
            const subMenuToClose = currentlyOpen.querySelector('.sub-menu');
            
            if (isMobile()) {
                // ИЗМЕНЕНО: Анимация закрытия для мобильных
                gsap.to(subMenuToClose, { maxHeight: 0, duration: 0.3, ease: 'expo.in' });
            } else {
                const listItemsToClose = subMenuToClose.querySelectorAll('li');
                gsap.timeline({ onComplete: () => { subMenuToClose.style.display = 'none'; } })
                    .to(listItemsToClose, { opacity: 0, y: 10, stagger: { amount: 0.3 }, duration: 0.3, ease: 'expo.in' })
                    // ИЗМЕНЕНО: Анимация закрытия для десктопа
                    .to(subMenuToClose, { opacity: 0, scale: 0.95, y: -20, duration: 0.3, ease: 'expo.in' }, "-=0.4");
            }
        }
        
        // Открываем или закрываем меню, на которое кликнули
        if (!isAlreadyActive) {
            menuToToggle.classList.add('active');
            if (isMobile()) {
                // ИЗМЕНЕНО: Анимация открытия для мобильных
                gsap.to(subMenuToToggle, { maxHeight: subMenuToToggle.scrollHeight, duration: 0.4, ease: 'expo.out' });
            } else {
                const listItemsToToggle = subMenuToToggle.querySelectorAll('li');
                subMenuToToggle.style.display = 'grid'; // Используем grid для multi-column
                if (!subMenuToToggle.classList.contains('multi-column')) {
                    subMenuToToggle.style.display = 'block';
                }
                // ИЗМЕНЕНО: Анимация открытия для десктопа
                gsap.timeline()
                    .fromTo(subMenuToToggle, { opacity: 0, scale: 0.95, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' })
                    .fromTo(listItemsToToggle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: { amount: 0.2 }, duration: 0.4, ease: 'expo.out' }, "-=0.4");
            }
        } else {
            menuToToggle.classList.remove('active');
            if (isMobile()) {
                // ИЗМЕНЕНО: Анимация закрытия для мобильных (повторный клик)
                 gsap.to(subMenuToToggle, { maxHeight: 0, duration: 0.3, ease: 'expo.in' });
            } else {
                const listItemsToToggle = subMenuToToggle.querySelectorAll('li');
                gsap.timeline({ onComplete: () => { subMenuToToggle.style.display = 'none'; } })
                    .to(listItemsToToggle, { opacity: 0, y: 10, stagger: { amount: 0.3 }, duration: 0.3, ease: 'expo.in' })
                    // ИЗМЕНЕНО: Анимация закрытия для десктопа (повторный клик)
                    .to(subMenuToToggle, { opacity: 0, scale: 0.95, y: -20, duration: 0.3, ease: 'expo.in' }, "-=0.4");
            }
        }
    }

    function startMainPageAnimation() {
        appContainer.classList.remove('hidden'); const tl = gsap.timeline(); tl.to(appContainer, { opacity: 1, duration: 0.5, ease: 'power2.out' }); tl.from('.logo-container', { y: -80, opacity: 0, duration: 1.2, ease: 'power3.out' }, '>-0.2'); tl.from('.button-container', { y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '<0.5');
        const wave1 = document.getElementById('wave-1'); const wave2 = document.getElementById('wave-2');
        [wave1, wave2].forEach((wave, index) => { const length = wave.getTotalLength(); gsap.set(wave, { strokeDasharray: length, strokeDashoffset: length }); gsap.to(wave, { strokeDashoffset: 0, duration: 3, delay: 1 + index * 0.2, ease: 'power2.out' }); });
        gsap.to(wave1, { x: "-=730", y: "+=10", repeat: -1, duration: 20, ease: 'sine.inOut', yoyo: true }); gsap.to(wave2, { x: "+=730", y: "-=12", repeat: -1, duration: 25, ease: 'sine.inOut', yoyo: true });
    }
    
    function initPreloader() {
        preloaderVideo.addEventListener('ended', () => { gsap.timeline().to(preloader, { opacity: 0, scale: 1.05, duration: 1.2, ease: 'power3.inOut' }).set(preloader, { display: 'none' }).call(startMainPageAnimation, null, "-=0.8"); });
        preloaderVideo.play().catch(() => { console.warn("Autoplay was blocked."); gsap.to(preloader, { opacity: 0, duration: 1, onComplete: () => { preloader.style.display = 'none'; startMainPageAnimation(); } }); });
    }

    // --- Универсальная функция для анимации ВСЕХ иконок ---
    function createIconAnimation(menuId, folderName, filePrefix) {
        const iconContainer = document.querySelector(`#${menuId} .icon`);
        if (!iconContainer) return;

        const frameCount = 50;
        const imageUrls = [];
        const imagePromises = [];

        for (let i = 1; i <= frameCount; i++) {
            const frameNumber = String(i).padStart(3, '0');
            imageUrls.push(`media/${folderName}/${filePrefix}_${frameNumber}.png`);
        }

        imageUrls.forEach(src => {
            const promise = new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
            imagePromises.push(promise);
        });

        Promise.all(imagePromises).then(() => {
            console.log(`Все кадры для ${menuId} предзагружены.`);
            let animationState = { frame: 0 };
            iconContainer.style.backgroundImage = `url('${imageUrls[0]}')`;

            const tl = gsap.timeline({
                repeat: -1, yoyo: true,
                onUpdate: () => {
                    const frameIndex = Math.round(animationState.frame);
                    iconContainer.style.backgroundImage = `url('${imageUrls[frameIndex]}')`;
                }
            });
            
            tl.to(animationState, {
                frame: frameCount - 1, duration: 2.5, ease: `steps(${frameCount - 1})`,
            });
            
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) { tl.pause(); } else { tl.resume(); }
            });
        }).catch(error => console.error(`Ошибка при предзагрузке изображений для ${menuId}:`, error));
    }

    function initAllIconAnimations() {
        const iconAnimationsConfig = [
            { menuId: 'menu-1', folderName: '01DEMOREELS', filePrefix: '01' },
            { menuId: 'menu-2', folderName: '02PRODUCT', filePrefix: '02' },
            { menuId: 'menu-3', folderName: '03FRIENDS', filePrefix: '03' },
            { menuId: 'menu-4', folderName: '04INTERESTING', filePrefix: '04' },
            { menuId: 'menu-5', folderName: '05CONTACTS', filePrefix: '05' },
        ];

        iconAnimationsConfig.forEach(config => {
            createIconAnimation(config.menuId, config.folderName, config.filePrefix);
        });
    }

    // === НАСТРОЙКА И ЗАПУСК ОБРАБОТЧИКОВ ===
    changeLanguage('ru');
    langToggle.addEventListener('click', () => { const isRu = currentLang === 'ru'; const newLang = isRu ? 'en' : 'ru'; langToggle.classList.toggle('en-active'); animateAndChangeLanguage(newLang); });
    document.querySelectorAll('.button-container').forEach(container => { 
        // В мобильной версии клик по всей плашке открывает меню
        container.addEventListener('click', (e) => { 
            toggleSubMenu(container.id) 
        }); 
    });

    document.addEventListener('keydown', e => { if (['1', '2', '3', '4', '5'].includes(e.key)) toggleSubMenu(`menu-${e.key}`); });
    document.querySelectorAll('.sub-menu').forEach(sub => {
        if (!isMobile()) {
            sub.style.display = 'none';
        }
    });

    // --- НОВЫЙ, УПРОЩЕННЫЙ КОД ---
    document.querySelectorAll('.icon').forEach(icon => {
        const number = icon.closest('.button-container').querySelector('.number');
        const parentContainer = icon.closest('.button-container');

        parentContainer.addEventListener('mouseenter', () => {
            if (isMobile()) return; // Отключаем hover-эффект на мобильных
            gsap.to(icon, { scale: 1.1, duration: 0.4, ease: 'power2.out' });
            gsap.to(number, { y: -5, scale: 1.1, duration: 0.4, ease: 'power2.out' });
        });

        parentContainer.addEventListener('mouseleave', () => {
            if (isMobile()) return; // Отключаем hover-эффект на мобильных
            gsap.to(icon, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
            gsap.to(number, { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // === ТОЧКА ВХОДА ===
    initPreloader();
    initAllIconAnimations();
});
