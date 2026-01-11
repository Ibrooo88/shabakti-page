// نظام المصادقة والإدارة
const Auth = {
  currentUser: null,
  
  init() {
    this.loadUser();
    this.checkAuthState();
  },
  
  // تحميل المستخدم الحالي
  loadUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  },
  
  // حفظ المستخدم الحالي
  saveUser(user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  // تسجيل الدخول
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.saveUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
  },
  
  // تسجيل الخروج
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  },
  
  // إنشاء حساب جديد
  register(name, email, password) {
    const users = this.getUsers();
    // التحقق من عدم وجود مستخدم بنفس البريد
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'هذا البريد الإلكتروني مستخدم بالفعل' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.saveUser(newUser);
    return { success: true, user: newUser };
  },
  
  // الحصول على جميع المستخدمين
  getUsers() {
    const usersStr = localStorage.getItem('users');
    if (usersStr) {
      return JSON.parse(usersStr);
    }
    // إنشاء مستخدم أدمن افتراضي
    const defaultUsers = [{
      id: '1',
      name: 'المدير',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    }];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  },
  
  // التحقق من تسجيل الدخول
  isAuthenticated() {
    return this.currentUser !== null;
  },
  
  // التحقق من كون المستخدم أدمن
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  },
  
  // تحديث حالة المصادقة في الواجهة
  checkAuthState() {
    const loginBtn = document.querySelector('#loginBtn');
    const userMenu = document.querySelector('#userMenu');
    
    if (this.isAuthenticated()) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (userMenu) {
        userMenu.style.display = 'flex';
        const userName = userMenu.querySelector('.user-name');
        if (userName) userName.textContent = this.currentUser.name;
      }
    } else {
      if (loginBtn) loginBtn.style.display = 'block';
      if (userMenu) userMenu.style.display = 'none';
    }
  },
  
  // عرض نافذة منبثقة لطلب تسجيل الدخول
  showLoginRequiredPopup() {
    const popup = document.createElement('div');
    popup.className = 'login-required-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h3>يجب تسجيل الدخول</h3>
        <p>يجب تسجيل الدخول للتفاعل مع المحتوى</p>
        <div class="popup-actions">
          <a href="login.html" class="btn primary">تسجيل الدخول</a>
          <a href="register.html" class="btn">إنشاء حساب</a>
        </div>
      </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 10);
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
      }
    });
  }
};

// تهيئة نظام المصادقة عند تحميل الصفحة
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
  });
}

