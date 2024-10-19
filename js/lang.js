document.addEventListener('DOMContentLoaded', function () {
  const flagRussian = document.getElementById('flag-russian');
  const flagEnglish = document.getElementById('flag-english');

  let currentLang = localStorage.getItem('lang') || 'en';
  loadTranslations(currentLang);

  if (currentLang === 'ru') {
      flagRussian.style.display = 'none';
      flagEnglish.style.display = 'inline';
  } else {
      flagRussian.style.display = 'inline';
      flagEnglish.style.display = 'none';
  }

  flagRussian.addEventListener('click', function () {
      loadTranslations('ru');
      flagRussian.style.display = 'none';
      flagEnglish.style.display = 'inline';
  });

  flagEnglish.addEventListener('click', function () {
      loadTranslations('en');
      flagRussian.style.display = 'inline';
      flagEnglish.style.display = 'none';
  });

  function loadTranslations(lang) {
      const filePath = `/locales/${lang}.json`;

      fetch(filePath)
          .then(response => response.json())
          .then(data => {
              updateContent(data); 
              localStorage.setItem('lang', lang); 

              const url = new URL(window.location);
              url.searchParams.set('lang', lang);
              window.history.pushState({}, '', url);
          })
          .catch(error => console.error("Error loading translations:", error));
  }

  function updateContent(translations) {
      document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
              element.textContent = translations[key];
          }
      });
  }
});


