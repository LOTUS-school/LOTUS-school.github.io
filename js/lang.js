document.addEventListener('DOMContentLoaded', function () {
    const flagRussian = document.getElementById('flag-russian');
    const flagEnglish = document.getElementById('flag-english');
    
    const supportedLangs = ['en', 'ru'];
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    let currentLang = localStorage.getItem('lang') || 'en';
  
    if (urlLang && supportedLangs.includes(urlLang)) {
        currentLang = urlLang;
        localStorage.setItem('lang', currentLang);
    } else if (urlLang && !supportedLangs.includes(urlLang)) {
        currentLang = 'en';
        localStorage.setItem('lang', currentLang);
        const url = new URL(window.location);
        url.searchParams.set('lang', 'en');
        window.history.pushState({}, '', url);
    }
    
    loadTranslations(currentLang);
    toggleFlags(currentLang);
  
    flagRussian.addEventListener('click', function () {
        loadTranslations('ru');
        toggleFlags('ru');
    });
  
    flagEnglish.addEventListener('click', function () {
        loadTranslations('en');
        toggleFlags('en');
    });
  
    function loadTranslations(lang) {
        const filePath = `/locales/${lang}.json`;
  
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("Translation file not found");
                return response.json();
            })
            .then(data => {
                updateContent(data); 
                localStorage.setItem('lang', lang);
  
                const url = new URL(window.location);
                url.searchParams.set('lang', lang);
                window.history.pushState({}, '', url);
            })
            .catch(error => {
                console.error("Error loading translations:", error);
                if (lang !== 'en') {
                    loadTranslations('en');
                }
            });
    }
  
    function updateContent(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
  
    function toggleFlags(lang) {
        if (lang === 'ru') {
            flagRussian.style.display = 'none';
            flagEnglish.style.display = 'inline';
        } else {
            flagRussian.style.display = 'inline';
            flagEnglish.style.display = 'none';
        }
    }
  });
  