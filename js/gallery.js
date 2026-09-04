/* 照片墙灯箱 */
(function() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    const photos = Array.from(document.querySelectorAll('.photo-img'));
    let cur = 0;

    function show(i) {
        cur = i;
        img.src = photos[i].src;
        cap.textContent = photos[i].alt;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function hide() { lb.classList.remove('active'); document.body.style.overflow = ''; }
    function nav(d) { show((cur + d + photos.length) % photos.length); }

    photos.forEach((p, i) => p.parentElement.addEventListener('click', () => show(i)));
    document.querySelector('.lightbox-close').addEventListener('click', hide);
    document.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); nav(-1); });
    document.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); nav(1); });
    lb.addEventListener('click', (e) => { if (e.target === lb) hide(); });
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') hide();
        if (e.key === 'ArrowLeft') nav(-1);
        if (e.key === 'ArrowRight') nav(1);
    });
})();