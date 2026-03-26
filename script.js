document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Give it some time to look cool
    });

    // 2. Cursor Glow Follower
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 3. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .reveal-text').forEach(el => {
        observer.observe(el);
    });

    // 4. Parallax Effect for Hero
    const heroVisual = document.querySelector('.hero-visual');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        if (heroVisual) {
            // heroVisual.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });

    // 5. 3D Tilt Effect for Feature Cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // 6. Mobile Menu Link Smooth Scroll & Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const toggleIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (X)
        if (navLinks.classList.contains('active')) {
            toggleIcon.className = 'fas fa-times';
        } else {
            toggleIcon.className = 'fas fa-bars';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close menu on mobile after click
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                toggleIcon.className = 'fas fa-bars';
            }

            const targetID = this.getAttribute('href');
            if (targetID.startsWith('#')) {
                document.querySelector(targetID).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = targetID;
            }
        });
    });

    // 7. Navbar & Back-to-Top Scroll Effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }

        // Back to top
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 8. Background Parallax Logic
    const shapes = document.querySelectorAll('.shape');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 2;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // 9. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString() + (target > 500 ? '' : '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString() + (target > 500 ? '' : '+');
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 1 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 10. Multilingual Chatbot Data & Logic
    let chatbotData = {
        "en": {
            "welcome": "Hello! I am your PAK Assistant. Ask your doubts about PAK Enterprises.",
            "not_found": "I'm not sure about that. But for the best workforce management, you should install our official app!",
            "install_advice": "Would you like to download the PAK Enterprises app now for attendance and shift tracking?",
            "questions": [
                { "pattern": "who|what|about|company|pak|explain|precision|allied|krafts", "response": "PAK Enterprises (Precision Allied Krafts) provides contract-based skilled and unskilled manpower for cardboard manufacturing, packaging units, and industrial operations." },
                { "pattern": "services|manpower|supply|staffing|workers|unskilled|skilled|labor", "response": "We offer unskilled workforce for material handling, skilled line support, and shift-aligned contract staffing tailored to your industrial KPIs." },
                { "pattern": "attendance|system|tracking|mark|register|check in|check out", "response": "Our attendance system uses the official app for real-time tracking, biometric verification, and location-based geofencing to ensure discipline." },
                { "pattern": "language|regional|tamil|hindi|english|speak", "response": "PAK Assistant and our official app support regional languages including English, Tamil, and Hindi for ease of use across your workforce." },
                { "pattern": "app|do|features|benefit|why app|advantage", "response": "The PAK app manages shift-aligned staffing, real-time attendance discipline, structured deployment, and clear documentation between clients and manpower." },
                { "pattern": "contact|phone|enquiry|call|email|address|location|reach|website|site|url", "response": "You can call us at +91 86670 29459, email support@pakenterprises.in, or visit our website at https://pakenterprises.in/. Our Head Office is in Poompozhil Nagar, Chennai-62." },
                { "pattern": "geofence|gps|location|radius", "response": "Geo-fencing ensures workers only check in within your office or plant radius, preventing attendance fraud." },
                { "pattern": "hi|hello|hey|greetings", "response": "Hello! Ask your doubts regarding PAK Enterprises manpower services and industrial solutions." }
            ]
        },
        "ta": {
            "welcome": "வணக்கம்! நான் உங்கள் PAK உதவியாளர். PAK Enterprises பற்றிய உங்கள் சந்தேகங்களைக் கேளுங்கள்.",
            "not_found": "எனக்கு அது குறித்து தெரியவில்லை. ஆனால் சிறந்த பணி நிர்வாகத்திற்கு, எங்கள் செயலியை நிறுவவும்!",
            "install_advice": "வருகை மற்றும் ஷிப்ட் கண்காணிப்புக்கு PAK Enterprises செயலியை இப்போது பதிவிறக்கம் செய்ய விரும்புகிறீர்களா?",
            "questions": [
                { "pattern": "யார்|தகவல்|பற்றி|pak|pak|விளக்கம்|இணையதளம்", "response": "PAK Enterprises அட்டை பெட்டி தயாரிப்பு மற்றும் பேக்கேஜிங் தொழில்களுக்குத் தேவையான தொழிலாளர்களை ஒப்பந்த அடிப்படையில் (https://pakenterprises.in/) வழங்குகிறது." },
                { "pattern": "வருகை|அட்டெண்டன்ஸ்|பதிவு", "response": "எங்களது வருகை பதிவு முறை (Attendance System) செயலியை பயன்படுத்தி மிகத்துல்லியமாக வேலை நேரத்தை கணக்கிடுகிறது." },
                { "pattern": "மொழி|தமிழ்|இந்தி|ஆங்கிலம்", "response": "எங்களது செயலி தமிழ், இந்தி மற்றும் ஆங்கிலம் ஆகிய மொழிகளில் இயங்கக்கூடியது." }
            ]
        },
        "hi": {
            "welcome": "नमस्ते! मैं आपका PAK सहायक हूँ। PAK Enterprises के बारे में अपनी शंकाएं पूछें।",
            "not_found": "मुझे इसके बारे में यकीन नहीं है। अपनी शंकाओं के लिए हमारे ऐप का उपयोग करें।",
            "install_advice": "क्या आप हमारा ऐप डाउनलोड करना चाहेंगे?",
            "questions": [
                { "pattern": "कौन|बारे में|कंपनी|pak|विवरण|वेबसाइट", "response": "PAK Enterprises औद्योगिक इकाइयों के लिए अनुबंध-आधारित जनशक्ति, उपस्थिति प्रणाली और डिजिटल समाधान (https://pakenterprises.in/) प्रदान करता है।" },
                { "pattern": "उपस्थिति|अटेंडेंस|सिस्टम", "response": "हमारा अटेंडेंस सिस्टम बायोमेट्रिक और जियोफेंसिंग के साथ रीयल-टाइम ट्रैकिंग सुनिश्चित करता है।" }
            ]
        }
    };
    let currentLang = 'en';

    // Fetch fallback from JSON if available
    fetch('chatbot_data.json')
        .then(res => res.json())
        .then(data => {
            chatbotData = data;
        }).catch(() => console.log("Using built-in chatbot training."));

    const trigger = document.getElementById('chatbot-trigger');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.querySelector('.close-bot');
    const sendBtn = document.getElementById('send-msg');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const langSpans = document.querySelectorAll('.language-switcher span');

    trigger.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        trigger.style.display = 'none';
        userInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        trigger.style.display = 'block';
    });

    langSpans.forEach(span => {
        span.addEventListener('click', () => {
            langSpans.forEach(s => s.classList.remove('active'));
            span.classList.add('active');
            currentLang = span.dataset.lang;
            chatMessages.innerHTML = '';
            addBotMessage(chatbotData[currentLang].welcome);
        });
    });

    const addBotMessage = (text, showButton = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg bot';
        msgDiv.innerHTML = `<i class="fas fa-robot" style="margin-right: 8px; font-size: 0.8rem; color: var(--primary)"></i>${text}`;
        if (showButton) {
            const btn = document.createElement('a');
            btn.href = 'https://drive.google.com/file/d/1L6LzRobM3yVYBOOuZx6d9MdRTxUDz-d0/view?usp=sharing';
            btn.className = 'chat-download-btn';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.innerHTML = '<i class="fab fa-android"></i> Download APK';
            msgDiv.appendChild(btn);
        }
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const addUserMessage = (text) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg user';
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
        const fullInput = userInput.value.trim().toLowerCase();
        if (!fullInput) return;

        addUserMessage(userInput.value);
        userInput.value = '';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'msg bot typing';
        typingDiv.innerHTML = '...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            const langData = chatbotData[currentLang];
            const words = fullInput.split(/\s+/).filter(w => w.length > 2);
            
            // Scoring Model using a "Map" of potential answers
            let bestMatch = null;
            let highestScore = 0;

            for (const item of langData.questions) {
                let currentScore = 0;
                const patterns = item.pattern.split('|').map(p => p.toLowerCase().trim());
                
                // 1. Check for complete phrase match (Higher Weight)
                if (patterns.some(p => fullInput.includes(p))) {
                    currentScore += 10;
                }

                // 2. Check individual word matches (Accumulative Weight)
                words.forEach(word => {
                    if (patterns.some(p => p.includes(word) || word.includes(p))) {
                        currentScore += 2;
                    }
                });

                if (currentScore > highestScore) {
                    highestScore = currentScore;
                    bestMatch = item.response;
                }
            }

            if (highestScore > 0) {
                addBotMessage(bestMatch);
                setTimeout(() => {
                    addBotMessage(langData.install_advice, true);
                }, 800);
            } else {
                addBotMessage(langData.not_found);
                setTimeout(() => {
                    addBotMessage(langData.install_advice, true);
                }, 1000);
            }
        }, 800);
    };

    sendBtn.addEventListener('click', handleChat);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
});
