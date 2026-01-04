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

// ===== CANVAS CYBER RAIN EFFECT =====
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = "0101 </> {} [] JAVA SPRING ;";
    const fontSize = 12; // Kích thước chữ vừa phải
    let columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Start lines above screen
    }

    function draw() {
        // Trail effect (Mờ dần) - Màu nền trùng với background body
        ctx.fillStyle = 'rgba(30, 41, 59, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0ea5e9'; // Màu xanh công nghệ (Sky 500)
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = symbols.charAt(Math.floor(Math.random() * symbols.length));

            // Draw character
            // Randomize opacity slightly for blinking effect
            ctx.globalAlpha = Math.random() * 0.5 + 0.5;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.globalAlpha = 1.0;

            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }

            // Fall speed
            drops[i] += 0.8;
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        draw();
    }

    // Resize event
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        // Re-init drops but keep some randomness
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    });

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
