gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    if(loader) { gsap.to(loader, { opacity: 0, duration: 1, delay: 0.5, onComplete: () => loader.style.display = "none" }); }
    
    const cursor = document.querySelector('.cursor-glow');
    if(cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
        });
    }

    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: { trigger: elem, start: "top 85%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    });

    if(document.querySelector('.hero-title')) {
        const heroTl = gsap.timeline({delay: 1});
        heroTl.from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
              .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
              .from(".hero-btns .btn-primary", { x: -20, opacity: 0, duration: 0.5 }, "-=0.4")
              .from(".hero-btns .btn-outline", { x: 20, opacity: 0, duration: 0.5 }, "-=0.4");
    }
    const uploadForm = document.getElementById('article-upload-form');
    if (uploadForm) {
        const statusEl = document.getElementById('upload-status');
        uploadForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('article-title').value.trim();
            const email = document.getElementById('author-email').value.trim();
            const fileInput = document.getElementById('article-file');
            const fileName = fileInput.files.length ? fileInput.files[0].name : 'No file attached';

            statusEl.innerHTML = `
                <div class="alert-box">
                    <strong>Submission received.</strong>
                    <p>${title ? `"${title}"` : 'Your submission'} has been recorded. We will review it and contact ${email ? email : 'you'} soon.</p>
                    <p><em>${fileName}</em></p>
                </div>
            `;
            uploadForm.reset();
        });
    }});