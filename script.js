
// Получаем кнопку мобильного меню и навигацию
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Открытие и закрытие мобильного меню
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const opened = nav.classList.toggle('open');

        // Обновляем состояние кнопки
        toggle.setAttribute('aria-expanded', String(opened));

        // Меняем иконку меню
        toggle.textContent = opened ? '✕' : '☰';
    });

    // Закрываем меню после нажатия на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');

            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = '☰';
        });
    });
}

// Плавная прокрутка к разделам сайта
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');

        // Не обрабатываем пустые ссылки-заглушки
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при прокрутке
const animatedElements = document.querySelectorAll(
    '.section-title, .glass, .feature, .achievement, .goal-card, .hobbies article'
);

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}
