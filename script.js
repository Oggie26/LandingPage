// ===== TYPING EFFECT =====
const typingTextElement = document.getElementById('typing-text');
const phrases = [
    "Software Engineer",
    "Java Backend Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// ===== CANVAS SNOWFLAKE EFFECT =====
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const maxSnowflakes = 80; // Số lượng bông tuyết vừa phải

    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 12 + 8; // Kích thước 8-20px
            this.speedY = Math.random() * 0.7 + 0.3; // Tốc độ rơi chậm
            this.speedX = Math.random() * 0.5 - 0.25; // Gió thổi nhẹ qua lại
            this.opacity = Math.random() * 0.4 + 0.1; // Mờ ảo
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Reset khi rơi hết màn hình
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
            // Reset khi bay ngang hết màn hình
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }

        draw() {
            ctx.fillStyle = 'rgba(200, 220, 255, ' + this.opacity + ')'; // Màu trắng xanh nhẹ
            ctx.font = this.size + 'px serif';
            ctx.fillText('❄', this.x, this.y);
        }
    }

    function init() {
        snowflakes.length = 0;
        for (let i = 0; i < maxSnowflakes; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
            snowflakes[i].draw();
        }
        requestAnimationFrame(animate);
    }

    // Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();
}

// Start everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    type();
    initCanvas();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(30, 41, 59, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});
