/* 粒子背景动画 */
(function() {
    const c = document.getElementById('particles');
    if (!c) return;
    const colors = ['#667eea', '#f093fb', '#4facfe', '#fa709a', '#feca57'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 80 + 20;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 0%, transparent 70%)`;
        p.style.animationDuration = (Math.random() * 10 + 10) + 's';
        p.style.animationDelay = Math.random() * 15 + 's';
        c.appendChild(p);
    }
})();

// 鼠标轨迹（桌面端）
(function() {
    if (window.innerWidth < 768) return;
    let last = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - last < 50) return;
        last = now;
        const dot = document.createElement('div');
        dot.style.cssText = 'position:fixed;pointer-events:none;width:6px;height:6px;border-radius:50%;background:#667eea;box-shadow:0 0 10px #667eea;z-index:9999;transition:all 1s ease-out;';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        requestAnimationFrame(() => { dot.style.opacity = '0'; dot.style.transform = 'translateY(-30px) scale(0)'; });
        setTimeout(() => dot.remove(), 1000);
    });
})();