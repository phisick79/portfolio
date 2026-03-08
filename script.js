document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const langTextLabel = document.getElementById('lang-text');
    const translatableElements = document.querySelectorAll('[data-en][data-es]');
    
    // Set default language to Spanish (keeps the original context intact)
    let currentLang = 'es';

    function setLanguage(lang) {
        currentLang = lang;
        // The button label shows the *target* language to switch to
        langTextLabel.textContent = currentLang === 'en' ? 'ES' : 'EN';
        
        // Update all translatable elements
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
    }

    // Initialize immediately to ensure the whole page is consistently in the default language
    setLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        // Toggle language
        setLanguage(currentLang === 'en' ? 'es' : 'en');
    });

    // --- INTERACTIVE SERVICE IMAGERY ---
    const brandIcons = document.querySelectorAll('.brand-icon');
    const dynamicImage = document.getElementById('dynamicImage');
    const viewerPlaceholder = document.getElementById('viewerPlaceholder');

    brandIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const imageUrl = icon.getAttribute('data-image');
            const imagePos = icon.getAttribute('data-position') || 'top left'; // Default to top left
            
            if (imageUrl) {
                // Image exists for this specific icon
                dynamicImage.src = imageUrl;
                dynamicImage.style.objectPosition = imagePos;
                dynamicImage.classList.add('active');
                if (viewerPlaceholder) {
                    viewerPlaceholder.style.opacity = '0'; // Hide placeholder
                }
            } else {
                // If the user hovers over an icon without an image mapped yet
                dynamicImage.classList.remove('active');
                if (viewerPlaceholder) {
                    viewerPlaceholder.style.opacity = '1';
                }
            }
        });
    });

    // --- TERMINAL TYPING ANIMATION ---
    const terminalBody = document.getElementById('typed-terminal');
    if (terminalBody) {
        const lines = [
            { text: "$ ./deploy_cluster.sh --env=production", class: "term-cmd", delay: 800 },
            { text: "[INFO] Initializing quantum core...", class: "term-out", delay: 500 },
            { text: "[INFO] Establishing secure uplink...", class: "term-out", delay: 400 },
            { text: "[SUCCESS] Uplink established. Latency: 2ms", class: "term-suc", delay: 600 },
            { text: "[INFO] Connecting to AI node (Ollama)...", class: "term-out", delay: 700 },
            { text: "[WARN] Traffic spike detected on port 443.", class: "term-err", delay: 500 },
            { text: "[INFO] Auto-scaling redundant load balancers...", class: "term-out", delay: 900 },
            { text: "[SUCCESS] Ecosystem is STABLE. All systems go.", class: "term-suc", delay: 1000 },
            { text: "$ ", class: "term-cmd", delay: 0 }
        ];

        let currentLine = 0;
        
        function typeLine() {
            if (currentLine >= lines.length) return; // Sequence done
            
            const lineData = lines[currentLine];
            
            setTimeout(() => {
                // Create new line element
                const span = document.createElement('span');
                if (lineData.class) span.className = lineData.class;
                span.textContent = lineData.text + '\n';
                
                // Append before the cursor (if we add one later, or just append)
                terminalBody.appendChild(span);
                
                // Add cursor to the end
                const cursor = document.querySelector('.typed-cursor');
                if (!cursor) {
                    const newCursor = document.createElement('span');
                    newCursor.className = 'typed-cursor';
                    terminalBody.appendChild(newCursor);
                } else {
                    terminalBody.appendChild(cursor); // Move cursor to end
                }
                
                currentLine++;
                typeLine(); // Next line
                
            }, lineData.delay);
        }

        // Start animation after a short delay
        setTimeout(typeLine, 1000);
    }
});
