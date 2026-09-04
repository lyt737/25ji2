/* 时光轴滚动动画 */
(function() {
    const items = document.querySelectorAll('.timeline-item');
    if (items.length === 0) return;
    // 若卡片已有 reveal 遮挡，去掉 reveal 以免冲突
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(item => {
        item.classList.add('reveal');
        observer.observe(item);
    });
})();