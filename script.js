 // 1. Initialize icons as soon as the HTML text is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// 2. Keep your existing window load logic for the rest
window.addEventListener('load', () => {
    // Re-run once more just to be safe
    lucide.createIcons();
            // Theme Management
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            const toggleIcon = document.getElementById('toggle-icon');
            const toggleText = document.getElementById('toggle-text');

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') { enableDarkMode(); } else { disableDarkMode(); }

            themeToggle.addEventListener('click', () => {
                if (body.classList.contains('dark-mode')) { disableDarkMode(); } else { enableDarkMode(); }
            });

            function enableDarkMode() {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                toggleText.innerText = 'Light Mode';
                updateIcon('sun');
            }

            function disableDarkMode() {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                toggleText.innerText = 'Dark Mode';
                updateIcon('moon');
            }

            function updateIcon(iconName) {
                toggleIcon.setAttribute('data-lucide', iconName);
                lucide.createIcons();
            }

            // Mouse Parallax
            const doodles = document.querySelectorAll('.doodle');
            window.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                doodles.forEach(doodle => {
                    const factor = parseFloat(doodle.getAttribute('data-factor')) || 1;
                    const moveX = (clientX - centerX) * (0.015 * factor);
                    const moveY = (clientY - centerY) * (0.015 * factor);
                    doodle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });

            // Intersection Observer for Reveal
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
            }, { threshold: 0.15 });

            document.querySelectorAll('.section, .hero').forEach(section => revealObserver.observe(section));

      const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Select values using the exact placeholder or position if IDs aren't set
    const nameInput = contactForm.querySelector('input[placeholder="Name"]');
    const emailInput = contactForm.querySelector('input[placeholder="Email"]');
    const messageInput = contactForm.querySelector('textarea');

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };

    console.log("Sending to Backend:", formData); // CHECK YOUR BROWSER CONSOLE (F12)

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },      
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (data.success) {
            alert("Message received! Check your MongoDB Atlas.");
            contactForm.reset();
        } else {
            console.error("Server Error:", data.error);
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
});

 

            // Clipboard Logic
            const emailLink = document.querySelector('.email-link');
            const toast = document.getElementById('toast');
            if (emailLink) {
                emailLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const emailAddress = "1287priyanshipatel@gmail.com";
                    const textArea = document.createElement("textarea");
                    textArea.value = emailAddress;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                });
            }
            // At the bottom of script.js
            lucide.createIcons();
        });
   