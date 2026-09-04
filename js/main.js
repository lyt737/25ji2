/* 主脚本 - 全局交互 */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });

    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
    }

    // 数字滚动统计
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumber = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; const start = performance.now();
        const update = (t) => {
            const progress = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update); else el.textContent = target;
        };
        requestAnimationFrame(update);
    };
    const numObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateNumber(entry.target); entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(num => numObserver.observe(num));

    // 滚动显示动画（timeline-item 有专门动画，排除）
    const revealEls = document.querySelectorAll('.featured-card, .photo-story, .stat-card, .about-card, .message-card, .motto-card, .data-card');
    revealEls.forEach(el => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // 3D倾斜
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rx = (y - rect.height / 2) / 20, ry = (rect.width / 2 - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });

    console.log('%c25计算机2班回忆录', 'background: linear-gradient(135deg,#667eea,#f093fb);color:#fff;padding:10px 20px;font-size:20px;border-radius:10px;font-weight:bold;');
});