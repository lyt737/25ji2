/* 关于页面进度环动画 */
(function() {
    const circles = document.querySelectorAll('.progress-circle');
    if (circles.length === 0) return;
    const circumference = 2 * Math.PI * 45;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const c = entry.target;
                const p = parseInt(c.getAttribute('data-progress'));
                c.style.strokeDashoffset = circumference - (p / 100) * circumference;
                observer.unobserve(c);
            }
        });
    }, { threshold: 0.5 });
    circles.forEach(c => {
        c.style.strokeDasharray = circumference;
        c.style.strokeDashoffset = circumference;
        observer.observe(c);
    });
})();