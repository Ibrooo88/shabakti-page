(function() {
  'use strict';

  // إدارة التبويبات
  const tabs = document.querySelectorAll('.topbar__center .tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const title = tab.getAttribute('title');
      if (title === 'من نحن') {
        alert('من نحن: منصة شبكتي واجهة تجريبية للتواصل الاجتماعي.');
      } else if (title === 'تواصل معنا') {
        alert('تواصل معنا: example@mail.com');
      }
    });
  });

  // إدارة شريط التنقل العلوي
  const topbar = document.querySelector('.topbar');
  const onScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 2) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // زر العودة للأعلى
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // إدارة الوضع الفاتح/الداكن
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

  // إدارة الإعجابات
  const likeButtons = document.querySelectorAll('.post .action');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const label = btn.textContent.trim();
      if (label.includes('أعجبني')) {
        btn.classList.toggle('is-liked');
      }
    });
  });

  // الحصول على عنصر الـ feed
  const feed = document.querySelector('.feed');
  if (!feed) return;

  // وظيفة لإنشاء منشور نصي
  function createTextPost(text) {
    const article = document.createElement('article');
    article.className = 'post card';
    article.innerHTML = `
      <header class="post__header">
        <img class="avatar" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><rect width='80' height='80' rx='40' fill='%231a3a30'/><circle cx='40' cy='35' r='16' fill='%23ffe7c7'/><rect x='24' y='44' width='32' height='16' rx='8' fill='%2326150e'/><path d='M24 28 q16-18 32 0' stroke='%23ffffff' stroke-width='8' fill='none' stroke-linecap='round'/></svg>" alt="" />
        <div class="post__meta">
          <h3 class="post__author">أنت</h3>
          <div class="post__sub">الآن · عامة</div>
        </div>
        <button class="icon-btn post-dots" title="خيارات">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </button>
      </header>
      <div class="post__content">${text}</div>
      <div class="post__stats">
        <div class="reactions"><span class="dot like"></span><span>0</span></div>
        <div class="counts">0 تعليق · 0 مشاركة</div>
      </div>
      <div class="post__actions">
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21h9c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2h-6l1-4-7 7v6c0 1.1.9 2 2 2z"/></svg>
          أعجبني
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6h-2v9H6v2c0 1.1.9 2 2 2h11l4 4V8c0-1.1-.9-2-2-2zM17 12V2c0-1.1-.9-2-2-2H3C1.9 0 1 .9 1 2v14l4-4h10c1.1 0 2-.9 2-2z"/></svg>
          تعليق
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-1.76 0-3.3-.77-4.31-2H7v3l-5-4 5-4v3h6.69c1.01-1.23 2.55-2 4.31-2 3.04 0 5.5 2.46 5.5 5.5S21.04 21.58 18 21.58z"/></svg>
          مشاركة
        </button>
      </div>
    `;
    
    // إضافة وظيفة الإعجاب للمنشور الجديد
    const newLikeBtn = article.querySelector('.action');
    if (newLikeBtn) {
      newLikeBtn.addEventListener('click', () => {
        newLikeBtn.classList.toggle('is-liked');
      });
    }
    
    // إضافة قائمة الخيارات
    const dotsBtn = article.querySelector('.post-dots');
    if (dotsBtn) {
      dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPostMenu(dotsBtn, article);
      });
    }
    
    return article;
  }

  // وظيفة لإنشاء منشور بصورة
  function createImagePost(src, caption = '') {
    const article = document.createElement('article');
    article.className = 'post card';
    article.innerHTML = `
      <header class="post__header">
        <img class="avatar" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><rect width='80' height='80' rx='40' fill='%231a3a30'/><circle cx='40' cy='35' r='16' fill='%23ffe7c7'/><rect x='24' y='44' width='32' height='16' rx='8' fill='%2326150e'/><path d='M24 28 q16-18 32 0' stroke='%23ffffff' stroke-width='8' fill='none' stroke-linecap='round'/></svg>" alt="" />
        <div class="post__meta">
          <h3 class="post__author">أنت</h3>
          <div class="post__sub">الآن · صورة</div>
        </div>
        <button class="icon-btn post-dots" title="خيارات">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </button>
      </header>
      <div class="post__content">${caption}</div>
      <figure class="post__media"><img src="${src}" alt="صورة مرفوعة" /></figure>
      <div class="post__stats">
        <div class="reactions"><span class="dot like"></span><span>0</span></div>
        <div class="counts">0 تعليق · 0 مشاركة</div>
      </div>
      <div class="post__actions">
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21h9c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2h-6l1-4-7 7v6c0 1.1.9 2 2 2z"/></svg>
          أعجبني
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6h-2v9H6v2c0 1.1.9 2 2 2h11l4 4V8c0-1.1-.9-2-2-2zM17 12V2c0-1.1-.9-2-2-2H3C1.9 0 1 .9 1 2v14l4-4h10c1.1 0 2-.9 2-2z"/></svg>
          تعليق
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-1.76 0-3.3-.77-4.31-2H7v3l-5-4 5-4v3h6.69c1.01-1.23 2.55-2 4.31-2 3.04 0 5.5 2.46 5.5 5.5S21.04 21.58 18 21.58z"/></svg>
          مشاركة
        </button>
      </div>
    `;
    
    const newLikeBtn = article.querySelector('.action');
    if (newLikeBtn) {
      newLikeBtn.addEventListener('click', () => {
        newLikeBtn.classList.toggle('is-liked');
      });
    }
    
    const dotsBtn = article.querySelector('.post-dots');
    if (dotsBtn) {
      dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPostMenu(dotsBtn, article);
      });
    }
    
    return article;
  }

  // وظيفة لإنشاء منشور بفيديو
  function createVideoPost(src, caption = '') {
    const article = document.createElement('article');
    article.className = 'post card';
    article.innerHTML = `
      <header class="post__header">
        <img class="avatar" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><rect width='80' height='80' rx='40' fill='%231a3a30'/><circle cx='40' cy='35' r='16' fill='%23ffe7c7'/><rect x='24' y='44' width='32' height='16' rx='8' fill='%2326150e'/><path d='M24 28 q16-18 32 0' stroke='%23ffffff' stroke-width='8' fill='none' stroke-linecap='round'/></svg>" alt="" />
        <div class="post__meta">
          <h3 class="post__author">أنت</h3>
          <div class="post__sub">الآن · فيديو</div>
        </div>
        <button class="icon-btn post-dots" title="خيارات">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
        </button>
      </header>
      <div class="post__content">${caption}</div>
      <figure class="post__media">
        <video controls playsinline src="${src}"></video>
      </figure>
      <div class="post__stats">
        <div class="reactions"><span class="dot like"></span><span>0</span></div>
        <div class="counts">0 تعليق · 0 مشاركة</div>
      </div>
      <div class="post__actions">
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21h9c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2h-6l1-4-7 7v6c0 1.1.9 2 2 2z"/></svg>
          أعجبني
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6h-2v9H6v2c0 1.1.9 2 2 2h11l4 4V8c0-1.1-.9-2-2-2zM17 12V2c0-1.1-.9-2-2-2H3C1.9 0 1 .9 1 2v14l4-4h10c1.1 0 2-.9 2-2z"/></svg>
          تعليق
        </button>
        <button class="action">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-1.76 0-3.3-.77-4.31-2H7v3l-5-4 5-4v3h6.69c1.01-1.23 2.55-2 4.31-2 3.04 0 5.5 2.46 5.5 5.5S21.04 21.58 18 21.58z"/></svg>
          مشاركة
        </button>
      </div>
    `;
    
    const newLikeBtn = article.querySelector('.action');
    if (newLikeBtn) {
      newLikeBtn.addEventListener('click', () => {
        newLikeBtn.classList.toggle('is-liked');
      });
    }
    
    const dotsBtn = article.querySelector('.post-dots');
    if (dotsBtn) {
      dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPostMenu(dotsBtn, article);
      });
    }
    
    return article;
  }

  // وظيفة لفتح قائمة منبثقة للوصف
  function openCaptionModal(title, placeholder, onConfirm) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop show';
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal__header">${title}</div>
        <div class="modal__body">
          <textarea id="captionInput" placeholder="${placeholder}"></textarea>
        </div>
        <div class="modal__footer">
          <button class="btn" id="cancelCaption">إلغاء</button>
          <button class="btn primary" id="okCaption">نشر</button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
    
    const cleanup = () => backdrop.remove();
    
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) cleanup();
    });
    
    const cancelBtn = backdrop.querySelector('#cancelCaption');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', cleanup);
    }
    
    const okBtn = backdrop.querySelector('#okCaption');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        const input = backdrop.querySelector('#captionInput');
        const value = input ? input.value.trim() : '';
        onConfirm(value);
        cleanup();
      });
    }
  }

  // زر نشر منشور نصي
  const createPostBtn = document.getElementById('createPostBtn');
  const postText = document.getElementById('postText');
  if (createPostBtn && postText) {
    createPostBtn.addEventListener('click', () => {
      const text = postText.value.trim();
      if (!text) {
        alert('اكتب شيئاً أولاً');
        return;
      }
      const newPost = createTextPost(text);
      feed.insertBefore(newPost, feed.children[1] || null);
      postText.value = '';
    });
    
    postText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        createPostBtn.click();
      }
    });
  }

  // رفع صورة
  const uploadImageBtn = document.getElementById('uploadImageBtn');
  const imageInput = document.getElementById('imageFileInput');
  if (uploadImageBtn && imageInput) {
    uploadImageBtn.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', () => {
      const file = imageInput.files && imageInput.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      openCaptionModal('إضافة وصف للصورة', 'اكتب وصف الصورة...', (caption) => {
        const newPost = createImagePost(url, caption);
        feed.insertBefore(newPost, feed.children[1] || null);
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      });
      imageInput.value = '';
    });
  }

  // رفع فيديو
  const uploadVideoBtn = document.getElementById('uploadVideoBtn');
  const videoInput = document.getElementById('videoFileInput');
  if (uploadVideoBtn && videoInput) {
    uploadVideoBtn.addEventListener('click', () => videoInput.click());
    videoInput.addEventListener('change', () => {
      const file = videoInput.files && videoInput.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      openCaptionModal('إضافة وصف للفيديو', 'اكتب وصف الفيديو...', (caption) => {
        const newPost = createVideoPost(url, caption);
        feed.insertBefore(newPost, feed.children[1] || null);
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      });
      videoInput.value = '';
    });
  }

  // تسجيل فيديو
  const recordBtn = document.getElementById('recordVideoBtn');
  let mediaRecorder = null;
  let recordedChunks = [];
  if (recordBtn) {
    recordBtn.addEventListener('click', async () => {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          recordedChunks = [];
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
          };
          mediaRecorder.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            openCaptionModal('إضافة وصف للفيديو', 'اكتب وصف الفيديو...', (caption) => {
              const newPost = createVideoPost(url, caption);
              feed.insertBefore(newPost, feed.children[1] || null);
              setTimeout(() => URL.revokeObjectURL(url), 120000);
            });
            recordBtn.textContent = 'تسجيل فيديو';
          };
          mediaRecorder.start();
          recordBtn.textContent = 'إيقاف التسجيل';
        } catch (err) {
          alert('فشل الوصول للكاميرا/المايك: ' + err.message);
        }
      } else {
        mediaRecorder.stop();
      }
    });
  }

  // زر البث المباشر
  const liveBtn = document.getElementById('liveBtn');
  if (liveBtn) {
    liveBtn.addEventListener('click', () => {
      alert('البث المباشر يحتاج Backend + WebRTC (مرحلة متقدمة)');
    });
  }

  // وظيفة إدارة قائمة المنشور
  function closePostMenus() {
    document.querySelectorAll('.post-menu').forEach(m => m.remove());
  }

  function openPostMenu(button, post) {
    closePostMenus();
    
    const menu = document.createElement('div');
    menu.className = 'post-menu';
    menu.innerHTML = `
      <button class="edit-post">✏️ تعديل</button>
      <button class="delete-post">🗑️ حذف</button>
      <button class="report-post">🚩 إبلاغ</button>
    `;
    
    menu.querySelector('.delete-post').addEventListener('click', () => {
      if (confirm('هل تريد حذف هذا المنشور؟')) {
        post.remove();
      }
      closePostMenus();
    });
    
    menu.querySelector('.edit-post').addEventListener('click', () => {
      const content = post.querySelector('.post__content');
      if (content) {
        const text = prompt('عدل النص:', content.textContent);
        if (text !== null) {
          content.textContent = text;
        }
      }
      closePostMenus();
    });
    
    menu.querySelector('.report-post').addEventListener('click', () => {
      alert('تم الإبلاغ عن المنشور');
      closePostMenus();
    });
    
    document.body.appendChild(menu);
    
    const rect = button.getBoundingClientRect();
    menu.style.top = rect.bottom + 6 + 'px';
    menu.style.left = rect.left + 'px';
    
    setTimeout(() => {
      document.addEventListener('click', function closeMenuOnClick(e) {
        if (!menu.contains(e.target) && e.target !== button) {
          closePostMenus();
          document.removeEventListener('click', closeMenuOnClick);
        }
      });
    }, 0);
  }

  // إضافة قائمة الخيارات للمنشورات الموجودة
  document.addEventListener('click', (e) => {
    const dots = e.target.closest('.post-dots');
    if (dots) {
      e.stopPropagation();
      const post = dots.closest('.post');
      if (post) {
        openPostMenu(dots, post);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePostMenus();
    }
  });

  // Intersection Observer لتفعيل تأثير التركيز
  const cards = document.querySelectorAll('.feed .card');
  if ('IntersectionObserver' in window && cards.length) {
    const io = new IntersectionObserver((entries) => {
      let anyFocused = false;
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          el.classList.add('is-focus');
          anyFocused = true;
        } else {
          el.classList.remove('is-focus');
        }
      });
      if (feed) {
        feed.classList.toggle('has-focus', anyFocused);
      }
    }, { threshold: [0, 0.6, 1] });
    
    cards.forEach(c => io.observe(c));
  }
})();

