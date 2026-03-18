// Enhanced Portfolio — GSAP Logic

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Typewriter ─────────────────────────────────────────────
    const typeStrings = [
        "Senior Data Engineer",
        "ETL Developer",
        "Azure Databricks Specialist",
        "Pipeline Architect",
        "Performance Optimizer"
    ];
    let strIdx = 0, charIdx = 0, deleting = false;
    const el = document.querySelector('.typing-text');

    function type() {
        if (!el) return;
        const cur = typeStrings[strIdx];
        el.textContent = deleting
            ? cur.substring(0, charIdx - 1)
            : cur.substring(0, charIdx + 1);
        charIdx += deleting ? -1 : 1;

        if (!deleting && charIdx === cur.length) {
            deleting = true;
            return setTimeout(type, 2200);
        }
        if (deleting && charIdx === 0) {
            deleting = false;
            strIdx = (strIdx + 1) % typeStrings.length;
            return setTimeout(type, 500);
        }
        setTimeout(type, deleting ? 38 : 75);
    }
    type();

    // ── Scroll Reveal ──────────────────────────────────────────
    document.querySelectorAll('.reveal-up').forEach((el, i) => {
        const parent = el.closest('section, .contact-section, .projects-section, .skills-section, .about-section');
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9,
                ease: 'power3.out',
                delay: (i % 4) * 0.08,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ── 3D Card Tilt ───────────────────────────────────────────
    document.querySelectorAll('.gs-hover-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            const cx = r.width / 2, cy = r.height / 2;
            gsap.to(card, {
                rotationY: ((x - cx) / cx) * 12,
                rotationX: ((y - cy) / cy) * -12,
                transformPerspective: 1000,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0, rotationY: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.3)'
            });
        });
        card.addEventListener('mousedown', () => gsap.to(card, { scale: 0.97, duration: 0.15 }));
        card.addEventListener('mouseup', () => gsap.to(card, { scale: 1, duration: 0.15 }));
    });

    // ── Parallax Blobs ─────────────────────────────────────────
    window.addEventListener('mousemove', e => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        gsap.to('.blob-1', { x: x * 30, y: y * 20, duration: 2 });
        gsap.to('.blob-2', { x: -x * 25, y: -y * 20, duration: 2.5 });
    });

    // ── GitHub Auto-Download Logic ──────────────────────────────
    async function updateDownloadLink() {
        const linkEl = document.getElementById('latest-release-link');
        if (!linkEl) return;

        try {
            // Fetch latest release info from GitHub API
            const response = await fetch('https://api.github.com/repos/mjulez70/realtimecontextengine/releases/latest');
            if (!response.ok) throw new Error('GitHub API error');

            const data = await response.json();

            // Find the .exe asset
            const exeAsset = data.assets.find(asset => asset.name.endsWith('.exe'));

            if (exeAsset) {
                // Update the link to the direct download URL
                linkEl.href = exeAsset.browser_download_url;

                // Optional: Show version number in text
                const textNode = Array.from(linkEl.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().includes('Download'));
                if (textNode) {
                    textNode.textContent = ` Download Release (${data.tag_name})`;
                }
            }
        } catch (err) {
            console.error('Failed to fetch latest release:', err);
            // Fallback is already the standard release page link in HTML
        }
    }
    updateDownloadLink();
});
