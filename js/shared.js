// العناصر المشتركة بين الصفحات
(function() {
  'use strict';
  
  // تهيئة الوضع الفاتح/الداكن
  function initTheme() {
    const themeKey = 'shabakti-theme';
    const applyTheme = (mode) => {
      const root = document.documentElement;
      if (mode === 'dark') {
        root.classList.add('theme-dark');
      } else {
        root.classList.remove('theme-dark');
      }
    };
    
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme) {
      applyTheme(savedTheme);
    }
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('theme-dark');
        localStorage.setItem(themeKey, isDark ? 'dark' : 'light');
      });
    }
  }
  
  // إدارة شريط التنقل العلوي
  function initNavbar() {
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      const onScroll = () => {
        if (window.scrollY > 2) {
          topbar.classList.add('scrolled');
        } else {
          topbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    
    // تحديث الروابط النشطة
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.topbar__center .tab, .sidebar-left .side-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-href');
      if (href && currentPath.includes(href.replace('.html', ''))) {
        link.classList.add('active');
      }
    });
  }
  
  // إدارة قائمة المستخدم
  function initUserMenu() {
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const userMenuDropdown = document.querySelector('.user-menu-dropdown');
    
    if (userMenuBtn && userMenuDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('show');
      });
      
      document.addEventListener('click', (e) => {
        if (!userMenuBtn.contains(e.target) && !userMenuDropdown.contains(e.target)) {
          userMenuDropdown.classList.remove('show');
        }
      });
    }
  }
  
  // زر العودة للأعلى
  function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      const onScroll = () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
  
  // تهيئة جميع الوظائف المشتركة
  function init() {
    initTheme();
    initNavbar();
    initUserMenu();
    initBackToTop();
    
    // تحديث حالة المصادقة
    if (typeof Auth !== 'undefined') {
      Auth.checkAuthState();
    }
  }
  
  // تشغيل عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

