// Dil değişkenlerini global scope'da tanımla
const DEFAULT_LANGUAGE = 'en';
let currentLang = localStorage.getItem('language') || DEFAULT_LANGUAGE;

// Sayfa yüklendiğinde çalışacak fonksiyon
function initializeLanguage() {
    console.log('Language initialization started...'); // Debug için
    console.log('Current language:', currentLang); // Debug için
    
    // Dil dosyalarının yüklenip yüklenmediğini kontrol et
    if (typeof en === 'undefined' || typeof tr === 'undefined') {
        console.error('Language files not loaded!');
        return;
    }

    // Başlangıç dilini ayarla
    applyLanguage(currentLang);
    
    // Aktif dil butonunu işaretle
    updateActiveButton(currentLang);
}

// Dili uygulama fonksiyonu
function applyLanguage(lang) {
    console.log('Applying language:', lang); // Debug için
    
    let langData;
    
    switch(lang) {
        case 'en':
            langData = en;
            break;
        case 'tr':
            langData = tr;
            break;
        case 'es':
            langData = es;
            break;
        case 'fr':
            langData = fr;
            break;
        case 'ja':
            langData = ja;
            break;
        case 'ru':
            langData = ru;
            break;
        default:
            langData = en; // Varsayılan İngilizce
    }

    
    
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        console.log('Processing element:', key); // Debug için
        
        if (!key) return;
        
        const value = getNestedValue(langData, key);
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// Nested object'ten değer alma yardımcı fonksiyonu
function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}

// Aktif buton güncelleme
function updateActiveButton(lang) {
    const select = document.querySelector('.language-select');
    if (select) {
        select.value = lang;
    }
}

// Event listener'ları ekle
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
    initializeLanguage();
});

// Global scope'a fonksiyonları ekle
window.switchLanguage = function(lang) {
    if (lang && lang !== currentLang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        applyLanguage(lang);
        updateActiveButton(lang);
    }
};