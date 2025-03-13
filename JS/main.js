// Navbar e Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu mobile ao clicar no link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Funcionalidades do carrossel
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

// Avanço automático do carrossel
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}, 5000);

// Adicionando funcionalidade de swipe (arraste)
// Seleciona o container do carrossel para detectar os eventos de arraste
const carouselElement = document.querySelector('.carousel');
let startX = 0;
let isDragging = false;
const threshold = 50; // Mínimo de pixels para considerar como swipe

// Eventos para mouse
carouselElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
});

carouselElement.addEventListener('mousemove', (e) => {
    // Opcional: implementar efeito de arraste, se desejado
});

carouselElement.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    if (diff > threshold) {
        // Swipe para a direita (voltar)
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    } else if (diff < -threshold) {
        // Swipe para a esquerda (avançar)
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    isDragging = false;
});

carouselElement.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Eventos para dispositivos touch
carouselElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselElement.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > threshold) {
        // Swipe para a direita (voltar)
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    } else if (diff < -threshold) {
        // Swipe para a esquerda (avançar)
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
});

// Abas da equipe
// Seleciona os botões e os conteúdos das abas
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Inicializa os conteúdos: mostra apenas o que já está ativo
tabContents.forEach(content => {
    if(content.classList.contains('active')){
        content.style.display = 'block';
        content.style.opacity = 1;
    } else {
        content.style.display = 'none';
        content.style.opacity = 0;
    }
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Se o botão já está ativo, não faz nada
        if(button.classList.contains('active')) return;

        // Atualiza a classe ativa dos botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Identifica o conteúdo atualmente ativo e o novo conteúdo alvo
        const currentContent = document.querySelector('.tab-content.active');
        const targetId = button.getAttribute('data-tab');
        const targetContent = document.getElementById(targetId);

        // Inicia o fade out do conteúdo atual
        currentContent.style.opacity = 0;

        // Após 500ms (tempo da transição), troca o conteúdo
        setTimeout(() => {
            currentContent.classList.remove('active');
            currentContent.style.display = 'none';

            // Prepara o novo conteúdo: exibe-o e inicia com opacidade 0
            targetContent.style.display = 'block';
            // Força reflow para garantir que a transição seja aplicada
            targetContent.offsetWidth;
            targetContent.classList.add('active');
            targetContent.style.opacity = 1;
        }, 300);
    });
});

// Back to Top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Rolagem suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});