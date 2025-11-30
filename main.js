// ====================================== Smooth scrolling ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================ Menu =================================================
// Menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Chiudi menu quando clicchi su un link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Chiudi menu quando clicchi fuori
document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ================================================== Lightbox ===================================================
// Database immagini progetti (solo per progetti con galleria)
const projectGalleries = {
    'caseificio': [
        'assets/caseificio/foto1.jpeg',
        'assets/caseificio/foto2.jpeg',
        'assets/caseificio/foto3.jpeg',
        'assets/caseificio/foto4.jpeg',
        'assets/caseificio/foto5.jpeg',
        'assets/caseificio/foto6.jpeg',
        'assets/caseificio/foto7.jpeg',
        'assets/caseificio/foto8.jpeg',
        'assets/caseificio/foto9.jpeg',
        'assets/caseificio/foto10.jpeg'
    ],
    'casa_corr': [
        'assets/casa_corr/foto1.jpeg',
        'assets/casa_corr/foto2.jpeg',
        'assets/casa_corr/foto3.jpeg',
        'assets/casa_corr/foto4.jpeg',
        'assets/casa_corr/foto5.jpeg',
        'assets/casa_corr/foto6.jpeg',
        'assets/casa_corr/foto7.jpeg',
        'assets/casa_corr/foto8.jpeg',
        'assets/casa_corr/foto9.jpeg',
        'assets/casa_corr/foto10.jpeg'
    ],
    'galleria': [
        'assets/galleria/foto1.jpeg',
        'assets/galleria/foto2.jpeg',
        'assets/galleria/foto3.jpeg',
        'assets/galleria/foto4.jpeg',
        'assets/galleria/foto5.jpeg',
        'assets/galleria/foto6.jpeg',
        'assets/galleria/foto7.jpeg',
        'assets/galleria/foto8.jpeg',
    ]
};

let currentGallery = [];
let currentIndex = 0;

// Apri lightbox
function openGallery(projectId) {
    if (!projectGalleries[projectId]) {
        console.warn('Nessuna galleria per questo progetto');
        return;
    }
    
    currentGallery = projectGalleries[projectId];
    currentIndex = 0;
    showImage();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Mostra immagine corrente
function showImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter-text');
    
    img.src = currentGallery[currentIndex];
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
}

// Chiudi lightbox
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage();
});

document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage();
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Chiudi cliccando sullo sfondo nero
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Tasti freccia e ESC
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        showImage();
    }
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showImage();
    }
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
