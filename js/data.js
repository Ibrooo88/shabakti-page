// إدارة البيانات (المقالات والفيديوهات)
const DataManager = {
  // المقالات
  getArticles() {
    const articles = localStorage.getItem('articles');
    if (articles) {
      return JSON.parse(articles);
    }
    // بيانات افتراضية
    const defaultArticles = [
      {
        id: '1',
        title: 'أهمية العلم في الإسلام',
        content: 'العلم في الإسلام له مكانة عظيمة، فقد جعل الله تعالى طلب العلم فريضة على كل مسلم ومسلمة...',
        fullContent: 'العلم في الإسلام له مكانة عظيمة، فقد جعل الله تعالى طلب العلم فريضة على كل مسلم ومسلمة. والعلم نور يهدي إلى الصراط المستقيم، وهو الوسيلة لفهم دين الله تعالى والتمسك بكتابه وسنة نبيه صلى الله عليه وسلم.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        category: 'علم',
        views: 1250,
        likes: 89,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      },
      {
        id: '2',
        title: 'البر بالوالدين',
        content: 'البر بالوالدين من أعظم العبادات وأحبها إلى الله تعالى، وقد قرن الله تعالى عبادته بطاعتهما...',
        fullContent: 'البر بالوالدين من أعظم العبادات وأحبها إلى الله تعالى، وقد قرن الله تعالى عبادته بطاعتهما في قوله تعالى: "وقضى ربك ألا تعبدوا إلا إياه وبالوالدين إحساناً". والبر بالوالدين يشمل الطاعة والاحترام والدعاء لهما وخدمتهما في كل وقت.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
        category: 'أخلاق',
        views: 980,
        likes: 76,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      },
      {
        id: '3',
        title: 'الصبر في الإسلام',
        content: 'الصبر من أعظم الفضائل في الإسلام، وهو نصف الإيمان، والصابرون لهم أجر عظيم عند الله...',
        fullContent: 'الصبر من أعظم الفضائل في الإسلام، وهو نصف الإيمان، والصابرون لهم أجر عظيم عند الله تعالى. والصبر أنواع: صبر على الطاعة، وصبر عن المعصية، وصبر على البلاء والمصائب.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        category: 'أخلاق',
        views: 1450,
        likes: 112,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      }
    ];
    localStorage.setItem('articles', JSON.stringify(defaultArticles));
    return defaultArticles;
  },
  
  getArticle(id) {
    const articles = this.getArticles();
    return articles.find(a => a.id === id);
  },
  
  addArticle(article) {
    const articles = this.getArticles();
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    articles.unshift(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));
    return newArticle;
  },
  
  updateArticle(id, updates) {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updates };
      localStorage.setItem('articles', JSON.stringify(articles));
      return articles[index];
    }
    return null;
  },
  
  deleteArticle(id) {
    const articles = this.getArticles();
    const filtered = articles.filter(a => a.id !== id);
    localStorage.setItem('articles', JSON.stringify(filtered));
    return filtered;
  },
  
  likeArticle(id) {
    const article = this.getArticle(id);
    if (article) {
      article.likes = (article.likes || 0) + 1;
      this.updateArticle(id, { likes: article.likes });
      return article.likes;
    }
    return 0;
  },
  
  viewArticle(id) {
    const article = this.getArticle(id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.updateArticle(id, { views: article.views });
    }
  },
  
  addComment(articleId, comment) {
    const article = this.getArticle(articleId);
    if (article) {
      if (!article.comments) article.comments = [];
      article.comments.push({
        id: Date.now().toString(),
        ...comment,
        createdAt: new Date().toISOString()
      });
      this.updateArticle(articleId, { comments: article.comments });
      return article.comments;
    }
    return [];
  },
  
  // الفيديوهات
  getVideos() {
    const videos = localStorage.getItem('videos');
    if (videos) {
      return JSON.parse(videos);
    }
    // بيانات افتراضية
    const defaultVideos = [
      {
        id: '1',
        title: 'محاضرة عن الصلاة',
        description: 'محاضرة قيمة عن أهمية الصلاة وأحكامها في الإسلام',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        category: 'عبادات',
        views: 5200,
        likes: 340,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      },
      {
        id: '2',
        title: 'خطبة الجمعة: بر الوالدين',
        description: 'خطبة جمعة عن بر الوالدين وفضله',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
        category: 'أخلاق',
        views: 3800,
        likes: 256,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      },
      {
        id: '3',
        title: 'دروس في العقيدة',
        description: 'سلسلة دروس في العقيدة الإسلامية',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        category: 'عقيدة',
        views: 4200,
        likes: 298,
        author: 'الشيخ',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        comments: []
      }
    ];
    localStorage.setItem('videos', JSON.stringify(defaultVideos));
    return defaultVideos;
  },
  
  getVideo(id) {
    const videos = this.getVideos();
    return videos.find(v => v.id === id);
  },
  
  addVideo(video) {
    const videos = this.getVideos();
    const newVideo = {
      ...video,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    videos.unshift(newVideo);
    localStorage.setItem('videos', JSON.stringify(videos));
    return newVideo;
  },
  
  updateVideo(id, updates) {
    const videos = this.getVideos();
    const index = videos.findIndex(v => v.id === id);
    if (index !== -1) {
      videos[index] = { ...videos[index], ...updates };
      localStorage.setItem('videos', JSON.stringify(videos));
      return videos[index];
    }
    return null;
  },
  
  deleteVideo(id) {
    const videos = this.getVideos();
    const filtered = videos.filter(v => v.id !== id);
    localStorage.setItem('videos', JSON.stringify(filtered));
    return filtered;
  },
  
  likeVideo(id) {
    const video = this.getVideo(id);
    if (video) {
      video.likes = (video.likes || 0) + 1;
      this.updateVideo(id, { likes: video.likes });
      return video.likes;
    }
    return 0;
  },
  
  viewVideo(id) {
    const video = this.getVideo(id);
    if (video) {
      video.views = (video.views || 0) + 1;
      this.updateVideo(id, { views: video.views });
    }
  },
  
  addVideoComment(videoId, comment) {
    const video = this.getVideo(videoId);
    if (video) {
      if (!video.comments) video.comments = [];
      video.comments.push({
        id: Date.now().toString(),
        ...comment,
        createdAt: new Date().toISOString()
      });
      this.updateVideo(videoId, { comments: video.comments });
      return video.comments;
    }
    return [];
  },
  
  // التصنيفات
  getCategories() {
    return ['كل التصنيفات', 'علم', 'أخلاق', 'عبادات', 'عقيدة', 'دعوة'];
  }
};

