// وظائف مساعدة
const Utils = {
  // تنسيق التاريخ
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'منذ لحظات';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    if (days < 30) return `منذ ${Math.floor(days / 7)} أسبوع`;
    if (days < 365) return `منذ ${Math.floor(days / 30)} شهر`;
    return `منذ ${Math.floor(days / 365)} سنة`;
  },
  
  // تنسيق الأرقام
  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'م';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'ك';
    return num.toString();
  },
  
  // نسخ النص
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  },
  
  // إظهار رسالة
  showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    
    setTimeout(() => messageEl.classList.add('show'), 10);
    setTimeout(() => {
      messageEl.classList.remove('show');
      setTimeout(() => messageEl.remove(), 300);
    }, 3000);
  },
  
  // قص النص
  truncate(text, length = 150) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },
  
  // التحقق من صحة البريد الإلكتروني
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  // تنفيذ البحث
  search(items, query, fields = ['title', 'content']) {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => {
      return fields.some(field => {
        const value = item[field];
        return value && value.toLowerCase().includes(lowerQuery);
      });
    });
  },
  
  // تقسيم الصفحات
  paginate(items, page = 1, perPage = 9) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return {
      data: items.slice(start, end),
      currentPage: page,
      totalPages: Math.ceil(items.length / perPage),
      totalItems: items.length
    };
  },
  
  // الحصول على معاملات URL
  getUrlParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  },
  
  // تحديث معاملات URL
  updateUrlParam(key, value) {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url);
  }
};

