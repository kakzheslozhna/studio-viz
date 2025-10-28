document.addEventListener('DOMContentLoaded', () => {
    // === ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ===
    let currentLang = 'ru';

    // === ИЗМЕНЕНО: ОБНОВЛЕННЫЙ ОБЪЕКТ ПЕРЕВОДОВ ===
    const translations = {
        en: { 
            showreel: 'SHOWREEL', 
            showreel_sub_0: 'EVENTS DECORATION', 
            showreel_sub_1: '3D VISUALIZATION', 
            showreel_sub_2: 'INTERACTIVE', 
            production: 'PRODUCTION', 
            production_sub_header_0: 'VISUALIZATION', 
            production_sub_0: 'CONTENT', 
            production_sub_1: 'EXHIBITIONS', 
            production_sub_header_1: 'INTERACTIVE', 
            production_sub_2: 'VR / AR / XR', 
            production_sub_3: 'TOUCHES', 
            production_sub_4: 'WEB', 
            friends: 'FRIENDS', 
            friends_sub_0: 'FABRIKA ART', 
            friends_sub_1: 'VIDEO LAND', 
            friends_sub_2: 'AG', 
            friends_sub_3: 'ZIMINA', 
            friends_sub_4: 'MAIN ROAD POST', 
            friends_sub_5: 'SANSHI TEAM', 
            interesting: 'INTERESTING', 
            interesting_sub_0: 'ARENDA', 
            interesting_sub_1: '3D PLACES ONLINE', 
            interesting_sub_2: '3D PRINT', 
            interesting_sub_3: 'MAKETS', 
            interesting_sub_4: 'VIRTUAL PRODUCTION', 
            contacts: 'CONTACTS', 
            contacts_sub_0: 'STANKOVICH EVGENY', 
            contacts_sub_1: 'sjdee@mail.ru', 
            contacts_sub_2: '+7 926 731 22 25'
        },
        ru: { 
            showreel: 'ШОУРИЛ', 
            showreel_sub_0: 'ДЕКОРАЦИИ ДЛЯ МЕРОПРИЯТИЙ', 
            showreel_sub_1: '3D ВИЗУАЛИЗАЦИЯ', 
            showreel_sub_2: 'ИНТЕРАКТИВ', 
            production: 'ПРОДУКЦИЯ', 
            production_sub_header_0: 'ВИЗУАЛИЗАЦИЯ', 
            production_sub_0: 'КОНТЕНТ', 
            production_sub_1: 'ВЫСТАВКИ', 
            production_sub_header_1: 'ИНТЕРАКТИВ', 
            production_sub_2: 'VR / AR / XR', 
            production_sub_3: 'ТАЧ-УСТРОЙСТВА', 
            production_sub_4: 'WEB', 
            friends: 'ДРУЗЬЯ', 
            friends_sub_0: 'FABRIKA ART', 
            friends_sub_1: 'VIDEO LAND', 
            friends_sub_2: 'AG', 
            friends_sub_3: 'ZIMINA', 
            friends_sub_4: 'MAIN ROAD POST', 
            friends_sub_5: 'SANSHI TEAM', 
            interesting: 'ИНТЕРЕСНОЕ', 
            interesting_sub_0: 'АРЕНДА', 
            interesting_sub_1: '3D МИРЫ ОНЛАЙН', 
            interesting_sub_2: '3D ПЕЧАТЬ', 
            interesting_sub_3: 'МАКЕТЫ', 
            interesting_sub_4: 'VIRTUAL PRODUCTION', 
            contacts: 'КОНТАКТЫ', 
            contacts_sub_0: 'СТАНКОВИЧ ЕВГЕНИЙ', 
            contacts_sub_1: 'sjdee@mail.ru', 
            contacts_sub_2: '+7 926 731 22 25'
        }
    };

    // === ССЫЛКИ НА DOM-ЭЛЕМЕНТЫ ===
    const translatableElements = document.querySelectorAll('.translatable');
    const langToggle = document.getElementById('language-toggle');
    const preloader = document.getElementById('preloader');
    const preloaderVideo = document.getElementById('preloader-video');
    const appContainer = document.getElementById('app-container');

    // === ОСНОВНЫЕ ФУНКЦИИ ===
    
    // === ИЗМЕНЕНО: ФУНКЦИЯ ДЛЯ РАБОТЫ С КЛИКАБЕЛЬНЫМИ ССЫЛКАМИ ===
    function changeLanguage(lang) {
        translatableElements.forEach(el => {
            const key = el.dataset.key;
            if (translations[lang][key]) {
                const text = translations[lang][key];
                const linkType = el.dataset.linkType;

                if (linkType === 'mailto') {
                    el.innerHTML = `<a href="mailto:${text}" style="color: inherit; text-decoration: none; display: block;">${text}</a>`;
                } else if (linkType === 'tel') {
                    const phone = text.replace(/[\s-()]/g, '');
                    el.innerHTML = `<a href="tel:${phone}" style="color: inherit; text-decoration: none; display: block;">${text}</a>`;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    function animateAndChangeLanguage(newLang) { gsap.timeline().to(translatableElements, { opacity: 0, y: -5, duration: 0.2, ease: 'power2.in' }).call(() => { currentLang = newLang; changeLanguage(newLang); }).to(translatableElements, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.02 }); }
    
    function isMobile() {
        return window.matchMedia("(max-width: 800px)").matches;
    }

    function toggleSubMenu(menuId) {
        const menuToToggle = document.getElementById(menuId);
        if (!menuToToggle) return;
        
        const subMenuToToggle = menuToToggle.querySelector('.sub-menu');
        const isAlreadyActive = menuToToggle.classList.contains('active');
        const currentlyOpen = document.querySelector('.button-container.active');
        
        if (currentlyOpen && currentlyOpen !== menuToToggle) {
            // Trigger reverse rotation on closing other menu
            const otherIconContainer = currentlyOpen.querySelector('.icon');
            const otherAnim = animations.find(anim => anim.menuId === currentlyOpen.id);
            if (otherAnim && otherIconContainer) {
                playRotationAnimation(otherAnim, otherIconContainer, true); // Reverse
            }
            currentlyOpen.classList.remove('active');
            const subMenuToClose = currentlyOpen.querySelector('.sub-menu');
            
            if (isMobile()) {
                gsap.to(subMenuToClose, { maxHeight: 0, duration: 0.3, ease: 'expo.in' });
            } else {
                const listItemsToClose = subMenuToClose.querySelectorAll('li');
                gsap.timeline({ onComplete: () => { subMenuToClose.style.display = 'none'; } })
                    .to(listItemsToClose, { opacity: 0, y: 10, stagger: { amount: 0.3 }, duration: 0.3, ease: 'expo.in' })
                    .to(subMenuToClose, { opacity: 0, scale: 0.95, y: -20, duration: 0.3, ease: 'expo.in' }, "-=0.4");
            }
        }
        
        if (!isAlreadyActive) {
            // Trigger forward rotation on opening menu
            const iconContainer = menuToToggle.querySelector('.icon');
            const anim = animations.find(anim => anim.menuId === menuId);
            if (anim && iconContainer) {
                playRotationAnimation(anim, iconContainer, false); // Forward
            }
            menuToToggle.classList.add('active');
            if (isMobile()) {
                gsap.to(subMenuToToggle, { maxHeight: subMenuToToggle.scrollHeight, duration: 0.4, ease: 'expo.out' });
            } else {
                const listItemsToToggle = subMenuToToggle.querySelectorAll('li');
                // === ИЗМЕНЕНИЕ: Упрощена логика для исправления центрирования ===
                subMenuToToggle.style.display = 'block'; 
                gsap.timeline()
                    .fromTo(subMenuToToggle, { opacity: 0, scale: 0.95, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' })
                    .fromTo(listItemsToToggle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: { amount: 0.2 }, duration: 0.4, ease: 'expo.out' }, "-=0.4");
            }
        } else {
            // Trigger reverse rotation on closing current menu
            const iconContainer = menuToToggle.querySelector('.icon');
            const anim = animations.find(anim => anim.menuId === menuId);
            if (anim && iconContainer) {
                playRotationAnimation(anim, iconContainer, true); // Reverse
            }
            menuToToggle.classList.remove('active');
            if (isMobile()) {
                 gsap.to(subMenuToToggle, { maxHeight: 0, duration: 0.3, ease: 'expo.in' });
            } else {
                const listItemsToToggle = subMenuToToggle.querySelectorAll('li');
                gsap.timeline({ onComplete: () => { subMenuToToggle.style.display = 'none'; } })
                    .to(listItemsToToggle, { opacity: 0, y: 10, stagger: { amount: 0.3 }, duration: 0.3, ease: 'expo.in' })
                    .to(subMenuToToggle, { opacity: 0, scale: 0.95, y: -20, duration: 0.3, ease: 'expo.in' }, "-=0.4");
            }
        }
    }

    function startMainPageAnimation() {
        appContainer.classList.remove('hidden'); 
        const tl = gsap.timeline(); 
        tl.to(appContainer, { opacity: 1, duration: 0.5, ease: 'power2.out' }); 
        tl.from('.logo-container', { y: -80, opacity: 0, duration: 1.2, ease: 'power3.out' }, '>-0.2'); 
        tl.from('.button-container', { y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '<0.5');
    }
    
    function initPreloader() {
        preloaderVideo.addEventListener('ended', () => { gsap.timeline().to(preloader, { opacity: 0, scale: 1.05, duration: 1.2, ease: 'power3.inOut' }).set(preloader, { display: 'none' }).call(startMainPageAnimation, null, "-=0.8"); });
        preloaderVideo.play().catch(() => { console.warn("Autoplay was blocked."); gsap.to(preloader, { opacity: 0, duration: 1, onComplete: () => { preloader.style.display = 'none'; startMainPageAnimation(); } }); });
    }

    // === КОМБИНИРОВАННАЯ АНИМАЦИЯ ИКОНОК С CANVAS ===
    let animations = [];
    let ticker = null;
    const DESKTOP_ICON_SIZE = 70;
    const MOBILE_ICON_SIZE = 70;
    const BASE_FRAME_COUNT = 50;
    const ROTATION_FRAME_COUNT = 40;
    const BASE_ONE_WAY_DURATION = 1.5; // секунды
    const BASE_FULL_CYCLE_MS = BASE_ONE_WAY_DURATION * 2 * 1000;
    const ROTATION_DURATION_MS = 1000; // 1.5 секунды для ротации

    function startTicker() {
        if (ticker) return;
        let lastTime = performance.now();
        ticker = (currentTime) => {
            const delta = currentTime - lastTime;
            lastTime = currentTime;
            animations.forEach(anim => {
                let frame, frameIndex;
                if (anim.mode === 'base' && anim.isPlaying) {
                    const elapsed = (currentTime - anim.baseStartTime) % BASE_FULL_CYCLE_MS;
                    let cycleProgress = elapsed / BASE_FULL_CYCLE_MS;
                    let dirProgress;
                    if (cycleProgress < 0.5) {
                        dirProgress = cycleProgress * 2;
                    } else {
                        dirProgress = 1 - ((cycleProgress - 0.5) * 2);
                    }
                    frameIndex = Math.floor(dirProgress * (anim.baseFrameCount - 1));
                    frame = anim.baseFrames[frameIndex];
                } else if (anim.mode === 'rotating') {
                    const elapsed = currentTime - anim.rotationStartTime;
                    if (elapsed >= ROTATION_DURATION_MS) {
                        anim.mode = 'base';
                        anim.isPlaying = true;
                        
                        // === ИЗМЕНЕНИЕ №1: УДАЛЕНА СТРОКА, КОТОРАЯ ВОССТАНАВЛИВАЛА ПАУЗУ ===
                        // anim.baseStartTime = currentTime - anim.basePausedTime; // <--- ЭТА СТРОКА ВЫЗЫВАЛА РАССИНХРОН
                        // Теперь, когда анимация вращения заканчивается, мы просто возвращаемся
                        // к основному циклу, который никогда не останавливался.
                        
                        const baseElapsed = (currentTime - anim.baseStartTime) % BASE_FULL_CYCLE_MS;
                        let baseCycleProgress = baseElapsed / BASE_FULL_CYCLE_MS;
                        let baseDirProgress;
                        if (baseCycleProgress < 0.5) {
                            baseDirProgress = baseCycleProgress * 2;
                        } else {
                            baseDirProgress = 1 - ((baseCycleProgress - 0.5) * 2);
                        }
                        frameIndex = Math.floor(baseDirProgress * (anim.baseFrameCount - 1));
                        frame = anim.baseFrames[frameIndex];
                    } else {
                        let progress = elapsed / ROTATION_DURATION_MS;
                        if (anim.isReverse) progress = 1 - progress;
                        frameIndex = Math.floor(progress * (anim.rotFrameCount - 1));
                        frame = anim.rotationFrames[frameIndex];
                    }
                }
                // ... внутри функции ticker, в цикле animations.forEach
                if (frame && anim.ctx) {
                    // Важно: размер для очистки - это реальный размер canvas
                    anim.ctx.clearRect(0, 0, anim.canvas.width, anim.canvas.height);
                    // А размер для рисования - это базовый размер до умножения на dpr
                    anim.ctx.drawImage(frame, 0, 0, 70, 70); // Используем 70, т.к. iconSize=70
                }
            });
            requestAnimationFrame(ticker);
        };
        requestAnimationFrame(ticker);
    }

    function createCombinedAnimation(menuId, baseFolder, basePrefix, rotFolder, rotPrefix) {
        const iconContainer = document.querySelector(`#${menuId} .icon`);
        if (!iconContainer) return Promise.resolve(null);

        const isMobileDevice = isMobile();
        const iconSize = 70; 
        const dpr = window.devicePixelRatio || 1;

        // Загрузка базовых кадров
        const baseImageUrls = [];
        for (let i = 1; i <= BASE_FRAME_COUNT; i++) {
            const frameNumber = String(i).padStart(3, '0');
            baseImageUrls.push(`media/${baseFolder}/${basePrefix}_${frameNumber}.png`);
        }
        const baseFramePromises = baseImageUrls.map(url => new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        }));

        // Загрузка ротационных кадров
        const rotImageUrls = [];
        for (let i = 1; i <= ROTATION_FRAME_COUNT; i++) {
            const frameNumber = String(i).padStart(3, '0');
            rotImageUrls.push(`media/${rotFolder}/${rotPrefix}_${frameNumber}.png`);
        }
        const rotFramePromises = rotImageUrls.map(url => new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        }));

        return Promise.all([Promise.all(baseFramePromises), Promise.all(rotFramePromises)]).then(([loadedBaseFrames, loadedRotFrames]) => {
            const validBaseFrames = loadedBaseFrames.filter(img => img !== null);
            const validRotFrames = loadedRotFrames.filter(img => img !== null);

            if (validBaseFrames.length === 0 || validRotFrames.length === 0) {
                console.warn(`No valid frames loaded for ${menuId}`);
                return null;
            }

            console.log(`Кадры для ${menuId} предзагружены: базовые (${validBaseFrames.length}), ротационные (${validRotFrames.length}).`);

            // Создаем canvas
            const canvas = document.createElement('canvas');
            // Устанавливаем реальный размер canvas в пикселях с учетом dpr
            canvas.width = iconSize * dpr;
            canvas.height = iconSize * dpr;

            // Устанавливаем CSS-размер, который видит пользователь
            canvas.style.width = `${iconSize}px`;
            canvas.style.height = `${iconSize}px`;

            const ctx = canvas.getContext('2d');

            // Масштабируем контекст, чтобы рисовать в координатах iconSize
            ctx.scale(dpr, dpr);
            iconContainer.appendChild(canvas);
            iconContainer.style.backgroundImage = 'none';

            // Рисуем первый базовый кадр
            const firstFrame = validBaseFrames[0];
            if (firstFrame) {
                // Рисуем изображение в масштабированных координатах
                ctx.drawImage(firstFrame, 0, 0, iconSize, iconSize);
            }

            const anim = {
                menuId,
                canvas,
                ctx,
                baseFrames: validBaseFrames,
                rotationFrames: validRotFrames,
                baseFrameCount: validBaseFrames.length,
                rotFrameCount: validRotFrames.length,
                mode: 'base',
                baseStartTime: performance.now(),
                basePausedTime: 0,
                fullCycleMs: BASE_FULL_CYCLE_MS,
                isPlaying: true,
                rotationStartTime: 0,
                isReverse: false,
                isMobile: isMobileDevice
            };

            animations.push(anim);
            return anim;
        }).catch(error => {
            console.error(`Ошибка при предзагрузке изображений для ${menuId}:`, error);
            return null;
        });
    }

    function initAllAnimations() {
        const animationsConfig = [
            { menuId: 'menu-1', baseFolder: '01DEMOREELS', basePrefix: '01', rotFolder: '01DEMOREELS360', rotPrefix: '01A' },
            { menuId: 'menu-2', baseFolder: '02PRODUCT', basePrefix: '02', rotFolder: '02PRODUCT360', rotPrefix: '02A' },
            { menuId: 'menu-3', baseFolder: '03FRIENDS', basePrefix: '03', rotFolder: '03FRIENDS360', rotPrefix: '03A' },
            { menuId: 'menu-4', baseFolder: '04INTERESTING', basePrefix: '04', rotFolder: '04INTERESTING360', rotPrefix: '04A' },
            { menuId: 'menu-5', baseFolder: '05CONTACTS', basePrefix: '05', rotFolder: '05CONTACTS360', rotPrefix: '05A' },
        ];

        Promise.all(animationsConfig.map(config => createCombinedAnimation(config.menuId, config.baseFolder, config.basePrefix, config.rotFolder, config.rotPrefix)))
            .then(loadedAnims => {
                animations = loadedAnims.filter(anim => anim !== null);
                if (animations.length > 0) {
                    startTicker();
                    // Обработчик видимости
                    let visibilityHandler = null;
                    visibilityHandler = () => {
                        const now = performance.now();
                        if (document.hidden) {
                            animations.forEach(anim => {
                                if (anim.mode === 'base' && anim.isPlaying) {
                                    anim.basePausedTime = (now - anim.baseStartTime) % anim.fullCycleMs;
                                    anim.isPlaying = false;
                                } else if (anim.mode === 'rotating') {
                                    anim.rotationPausedTime = now - anim.rotationStartTime;
                                    anim.mode = 'paused_rotating';
                                }
                            });
                        } else {
                            animations.forEach(anim => {
                                if (anim.mode === 'base' && !anim.isPlaying) {
                                    anim.baseStartTime = now - anim.basePausedTime;
                                    anim.isPlaying = true;
                                } else if (anim.mode === 'paused_rotating') {
                                    anim.rotationStartTime = now - anim.rotationPausedTime;
                                    anim.mode = 'rotating';
                                }
                            });
                        }
                    };
                    document.addEventListener("visibilitychange", visibilityHandler);
                    // Очистка при unload
                    window.addEventListener('beforeunload', () => {
                        document.removeEventListener("visibilitychange", visibilityHandler);
                    });
                }
            });
    }

    function playRotationAnimation(anim, iconContainer, isReverse = false) {
        if (!anim || !anim.canvas || anim.mode === 'rotating') return;

        const now = performance.now();

        // === ИЗМЕНЕНИЕ №2: УДАЛЕН БЛОК, КОТОРЫЙ СТАВИЛ БАЗОВУЮ АНИМАЦИЮ НА ПАУЗУ ===
        // Мы больше не останавливаем базовую анимацию. Она просто перестает
        // отрисовываться на время, пока mode='rotating', но ее таймер продолжает идти.
        /*
        // Паузируем базовую анимацию
        if (anim.mode === 'base') {
            anim.basePausedTime = (now - anim.baseStartTime) % anim.fullCycleMs;
            anim.isPlaying = false;
        }
        */

        anim.mode = 'rotating';
        anim.isReverse = isReverse;
        anim.rotationStartTime = now;

        // GSAP анимация масштаба с overwrite для избежания конфликтов
        gsap.killTweensOf(iconContainer);
        const targetScale = isReverse ? 1 : 1.1;
        gsap.to(iconContainer, {
            scale: targetScale,
            duration: ROTATION_DURATION_MS / 1000,
            ease: 'power2.inOut',
            overwrite: true,
            onComplete: () => {
                if (isReverse) {
                    gsap.set(iconContainer, { scale: 1 });
                } else {
                    gsap.set(iconContainer, { scale: 1.1 });
                }
            }
        });
    }

    // === НАСТРОЙКА И ЗАПУСК ОБРАБОТЧИКОВ ===
    changeLanguage('ru');
    langToggle.addEventListener('click', () => { const isRu = currentLang === 'ru'; const newLang = isRu ? 'en' : 'ru'; langToggle.classList.toggle('en-active'); animateAndChangeLanguage(newLang); });
    document.querySelectorAll('.button-container').forEach(container => { 
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

    document.querySelectorAll('.icon').forEach(icon => {
        const number = icon.closest('.button-container').querySelector('.number');
        const parentContainer = icon.closest('.button-container');
        const anim = animations.find(a => a.menuId === parentContainer.id);

        parentContainer.addEventListener('mouseenter', () => {
            if (isMobile() || parentContainer.classList.contains('active') || (anim && anim.mode === 'rotating')) return;
            gsap.killTweensOf(icon);
            gsap.to(icon, { scale: 1.1, duration: 0.4, ease: 'power2.out', overwrite: true });
            gsap.to(number, { y: -5, scale: 1.1, duration: 0.4, ease: 'power2.out', overwrite: true });
        });

        parentContainer.addEventListener('mouseleave', () => {
            if (isMobile() || parentContainer.classList.contains('active') || (anim && anim.mode === 'rotating')) return;
            gsap.killTweensOf(icon);
            gsap.to(icon, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: true });
            gsap.to(number, { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: true });
        });
    });

    // === ТОЧКА ВХОДА ===
    initPreloader();
    initAllAnimations();
});
