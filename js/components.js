// مكونات HTML مشتركة
const Components = {
  // Navbar HTML
  getNavbar() {
    return `
      <header class="topbar">
        <div class="topbar__left">
          <a href="index.html" class="brand">
            <span class="brand__logo" aria-hidden="true">ش</span>
            <span class="brand__text">موقع الشيخ</span>
          </a>
          <label class="search">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/></svg>
            <input type="search" placeholder="ابحث في الموقع" aria-label="بحث" id="globalSearch" />
          </label>
        </div>
        <nav class="topbar__center" aria-label="التنقل الرئيسي">
          <a href="index.html" class="tab" title="الرئيسية">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </a>
          <a href="videos.html" class="tab" title="الفيديوهات">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 10.5V7c0-1.1-.9-2-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"/></svg>
          </a>
          <a href="articles.html" class="tab" title="المقالات">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </a>
          <a href="about.html" class="tab" title="من نحن">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 7a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm1 4c-3.31 0-6 2.69-6 6h2a4 4 0 0 1 8 0h2c0-3.31-2.69-6-6-6z"/></svg>
          </a>
          <a href="contact.html" class="tab" title="تواصل معنا">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
          </a>
        </nav>
        <div class="topbar__right" aria-label="إجراءات">
          <button class="circle" id="themeToggle" title="تبديل الوضع">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0 0 18c5 0 9-4 9-9 0-.7-.08-1.38-.24-2.03A7 7 0 0 1 12 3z"/></svg>
          </button>
          <a href="login.html" class="btn primary" id="loginBtn" style="display: none;">تسجيل الدخول</a>
          <div class="user-menu" id="userMenu" style="display: none;">
            <button class="circle profile user-menu-btn" title="حسابي" aria-label="حسابي">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><rect width='80' height='80' rx='40' fill='%231a3a30'/><circle cx='40' cy='35' r='16' fill='%23ffe7c7'/><rect x='24' y='44' width='32' height='16' rx='8' fill='%2326150e'/><path d='M24 28 q16-18 32 0' stroke='%23ffffff' stroke-width='8' fill='none' stroke-linecap='round'/></svg>" alt="صورة الحساب" />
            </button>
            <div class="user-menu-dropdown">
              <span class="user-name"></span>
              <a href="admin.html" id="adminLink" style="display: none;">لوحة التحكم</a>
              <button id="logoutBtn">تسجيل الخروج</button>
            </div>
          </div>
        </div>
      </header>
    `;
  },
  
  // Footer HTML
  getFooter() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>عن الموقع</h3>
            <p>موقع دعوي يهدف إلى نشر العلم النافع والمحتوى الإسلامي الهادف</p>
          </div>
          <div class="footer-section">
            <h3>روابط سريعة</h3>
            <a href="index.html">الرئيسية</a>
            <a href="articles.html">المقالات</a>
            <a href="videos.html">الفيديوهات</a>
            <a href="about.html">من نحن</a>
            <a href="contact.html">تواصل معنا</a>
          </div>
          <div class="footer-section">
            <h3>تواصل معنا</h3>
            <p>البريد الإلكتروني: info@example.com</p>
            <p>الهاتف: +1234567890</p>
            <div class="footer-social">
              <a href="#" title="فيسبوك">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-3h3z"/></svg>
              </a>
              <a href="#" title="تويتر">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" title="واتساب">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} موقع الشيخ. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    `;
  }
};

