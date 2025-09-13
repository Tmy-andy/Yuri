// Troy Profile Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links (if any are added later)
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Add click effect to profile avatar
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Add hover effects to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#777';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#555';
        });
    });

    // Add click-to-copy functionality for contact info (if needed later)
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Đã sao chép vào clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Đã sao chép vào clipboard!');
        });
    };

    // Show notification function
    const showNotification = (message) => {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    };

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or return to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Add scroll-to-top functionality
    let scrollToTopButton;
    
    const createScrollToTopButton = () => {
        scrollToTopButton = document.createElement('button');
        scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopButton.className = 'scroll-to-top';
        scrollToTopButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(scrollToTopButton);
    };

    // Show/hide scroll to top button based on scroll position
    const toggleScrollToTopButton = () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    };

    // Initialize scroll to top button
    createScrollToTopButton();
    window.addEventListener('scroll', toggleScrollToTopButton);

    // Add intersection observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add search functionality (for future use)
    const addSearchFunctionality = () => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Tìm kiếm thông tin...';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 10px 15px;
            margin: 20px auto;
            display: block;
            background: #2a2a2a;
            border: 1px solid #444;
            border-radius: 25px;
            color: white;
            font-size: 14px;
        `;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allText = document.querySelectorAll('.section p, .section li, .section h4');
            
            allText.forEach(element => {
                const text = element.textContent.toLowerCase();
                const section = element.closest('.section');
                
                if (searchTerm === '') {
                    section.style.display = 'block';
                    element.style.backgroundColor = '';
                } else if (text.includes(searchTerm)) {
                    section.style.display = 'block';
                    element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
                } else {
                    element.style.backgroundColor = '';
                }
            });

            // Hide sections that don't contain search term
            if (searchTerm !== '') {
                sections.forEach(section => {
                    const sectionText = section.textContent.toLowerCase();
                    if (!sectionText.includes(searchTerm)) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                });
            } else {
                sections.forEach(section => {
                    section.style.display = 'block';
                });
            }
        });

        // Insert search input after header
        const header = document.querySelector('.header');
        header.insertAdjacentElement('afterend', searchInput);
    };

    // Initialize search (uncomment if needed)
    // addSearchFunctionality();

    // Add theme toggle functionality (for future enhancement)
    const addThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Chuyển đổi chế độ sáng/tối';
        themeToggle.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        let isDarkMode = true; // Default is dark mode

        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                // Dark mode
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#ffffff';
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                
                // Update sections
                sections.forEach(section => {
                    section.style.backgroundColor = '#2a2a2a';
                    section.style.borderColor = '#444';
                });
                
                // Update subsections
                document.querySelectorAll('.subsection').forEach(sub => {
                    sub.style.backgroundColor = '#1a1a1a';
                    sub.style.borderColor = '#333';
                });
                
            } else {
                // Light mode
                document.body.style.backgroundColor = '#ffffff';
                document.body.style.color = '#333333';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                
                // Update sections
                sections.forEach(section => {
                    section.style.backgroundColor = '#f8f9fa';
                    section.style.borderColor = '#dee2e6';
                });
                
                // Update subsections
                document.querySelectorAll('.subsection').forEach(sub => {
                    sub.style.backgroundColor = '#ffffff';
                    sub.style.borderColor = '#e9ecef';
                });
            }
        });

        document.body.appendChild(themeToggle);
    };

    // Initialize theme toggle (uncomment if needed)
    // addThemeToggle();

    // Add loading animation
    const showLoadingComplete = () => {
        const loaderContainer = document.createElement('div');
        loaderContainer.id = 'loading-container';
        loaderContainer.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: #111;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;

        // Tạo wrapper loader
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.cssText = `
            position: relative;
            width: 150px;
            height: 150px;
        `;

        // Thêm ảnh favicon
        const img = document.createElement('img');
        img.src = 'img/favicon.png';
        img.className = 'loading-img';
        img.style.cssText = `
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            transform: translate(-50%, -50%);
        `;

        // Tạo vòng tròn quay
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: absolute;
            top: 50%; left: 50%;
            width: 300px; height: 300px;
            margin: -150px 0 0 -150px;
            border: 4px solid transparent;
            border-top: 4px solid #9F672D;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
            z-index: 1;
        `;

        // Thêm img + circle vào loader
        loader.appendChild(img);
        loader.appendChild(circle);

        // Thêm loader vào container
        loaderContainer.appendChild(loader);

        // Thêm container vào body
        document.body.appendChild(loaderContainer);

        // Add pulse animation
        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }`;
        document.head.appendChild(style);

        // Lưu thời gian bắt đầu
        const startTime = Date.now();

        // Xóa loader khi trang load xong (ít nhất 2 giây) với fade out
        window.addEventListener('load', () => {
            const elapsed = Date.now() - startTime;
            const minDuration = 2000; // 2 giây
            const delay = Math.max(0, minDuration - elapsed);
            setTimeout(() => {
                loaderContainer.style.opacity = '0'; // bắt đầu fade out
                setTimeout(() => {
                    loaderContainer.style.display = 'none'; // ẩn hoàn toàn sau khi fade xong
                }, 500); // 500ms phải trùng với transition CSS
            }, delay);
        });
    };

    // Show loading animation
    showLoadingComplete();

    // Enhanced Easter Egg với countdown và hiệu ứng đẹp
    let clickCount = 0;
    let countdownActive = false;

    const facts = [
        'Từng có một người tự xưng là phù thủy nói Troy là hiện thân của The Chariot khi Troy mới được 7 tuổi',
        'Troy từng săn bắn cùng cha ở Nga, bắn súng săn khá thành thạo nhưng không thích đi săn',
        'Có thể bạn chưa biết: Troy bị cận hơn 2 độ nhưng không bao giờ đeo kính trừ khi cần đọc sách hoặc tài liệu mà chữ khá nhỏ',
        'Troy vừa thích vừa không thích public',
        'Ở Nhật, "Troy" thường được phát âm là "Toroi" (トロイ) nên một số đồng nghiệp khá thân sẽ gọi Troy là "Toro" (トロ)',
        'Có một người rất hay gọi Troy thành "Tororo" (とろろ) - một món ăn Nhật làm từ củ mài',
        'Một thân chủ giấu tên hay gọi Troy (Toroi) là "Tora" (虎) - con hổ trong tiếng Nhật',
        'Troy không thấy lạ khi bị gọi là "Torai" vì quen với việc bị gọi nhầm',
        'Troy rất ghét đồ ngọt, nhưng nếu Yuri đút thì sẽ ăn mà không cau mày lấy một cái',
        'Troy khi đến kỳ kinh nguyệt sẽ cực kỳ dễ cáu gắt. Riêng với Yuri thì sẽ ôm suốt, vùi mặt vào người em',
        'Troy có rất nhiều nyc nhưng chưa từng lên giường với họ',
        'Nhu cầu tình dục của Troy rất cao',
        'Thành phố nơi Troy sinh ra là Frankfurt am Main - Đức (Frankfurt trên sông Main)',
        'Khi còn ở Nga Troy có để tóc dài ngang - hơn vai và thường bị nhầm là con gái',
        'Troy biết chơi violin vì bị mẹ ép đi học chứ không thích chơi nhạc cụ',
    ];

    // Tạo countdown overlay
    function createCountdownOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'countdown-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown-number';
        countdownElement.style.cssText = `
            font-size: 120px;
            color: #fff;
            font-weight: bold;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            transform: scale(0);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        overlay.appendChild(countdownElement);
        document.body.appendChild(overlay);
        
        return { overlay, countdownElement };
    }

    // Animation countdown
    function startCountdown() {
        if (countdownActive) return;
        
        countdownActive = true;
        const { overlay, countdownElement } = createCountdownOverlay();
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        let count = 5;
        
        function updateCountdown() {
            countdownElement.textContent = count;
            countdownElement.style.transform = 'scale(1.2)';
            countdownElement.style.color = count <= 2 ? '#ff4757' : '#fff';
            
            // Bounce effect
            setTimeout(() => {
                countdownElement.style.transform = 'scale(1)';
            }, 150);
            
            if (count > 1) {
                count--;
                setTimeout(updateCountdown, 1000);
            } else {
                // Countdown finished
                setTimeout(() => {
                    showFactWithEffect();
                    
                    // Fade out overlay
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                        countdownActive = false;
                    }, 300);
                }, 1000);
            }
        }
        
        updateCountdown();
    }
    // Thêm variables này ở đầu file (sau dòng let clickCount = 0;)
    let recentlyShownFacts = [];
    const MAX_RECENT_FACTS = 15; // Số fact gần nhất để tránh lặp lại

    // Thêm function này trước function showFactWithEffect()
    function getUniqueFact() {
        if (recentlyShownFacts.length >= facts.length) {
            recentlyShownFacts = [];
        }
        
        const availableFacts = facts.filter(fact => !recentlyShownFacts.includes(fact));
        
        if (availableFacts.length === 0) {
            recentlyShownFacts = [];
            return facts[Math.floor(Math.random() * facts.length)];
        }
        
        const selectedFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
        
        recentlyShownFacts.push(selectedFact);
        
        if (recentlyShownFacts.length > MAX_RECENT_FACTS) {
            recentlyShownFacts.shift();
        }
        
        return selectedFact;
    }

    // Hiển thị fact với hiệu ứng đẹp
    function showFactWithEffect() {
        const randomFact = getUniqueFact(); // Sử dụng hàm mới để tránh lặp lại
        
        // Tạo notification đặc biệt
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            font-size: 18px;
            text-align: center;
            max-width: 400px;
            z-index: 10000;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border: 2px solid rgba(255, 255, 255, 0.2);
        `;
        
        notification.innerHTML = `
            <div style="margin-bottom: 10px; font-size: 24px;">Fact</div>
            <div>${randomFact}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Animation show
        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
        
        // Animation hide after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translate(-50%, -50%) scale(0)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
        
        // Avatar effect
        profileAvatar.style.transition = 'all 0.3s ease';
        profileAvatar.style.background = 'linear-gradient(45deg, #333, #555, #777)';
        profileAvatar.style.transform = 'scale(1.1)';
        profileAvatar.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        
        setTimeout(() => {
            profileAvatar.style.transform = 'scale(1)';
            profileAvatar.style.boxShadow = 'none';
        }, 300);
    }

    // Hiệu ứng click counter visual
    function showClickProgress() {
        // Tạo progress indicator
        let progressBar = document.getElementById('click-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'click-progress';
            progressBar.style.cssText = `
                position: absolute;
                bottom: -5px;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                border-radius: 2px;
                transition: width 0.3s ease;
                width: 0%;
            `;
            profileAvatar.style.position = 'relative';
            profileAvatar.appendChild(progressBar);
        }
        
        const progress = (clickCount / 7) * 100;
        progressBar.style.width = progress + '%';
        
        // Pulse effect on avatar
        profileAvatar.style.transform = 'scale(1.05)';
        setTimeout(() => {
            profileAvatar.style.transform = 'scale(1)';
        }, 150);
        
        if (clickCount === 7) {
            progressBar.style.width = '0%';
        }
    }

    // Main event listener
    profileAvatar.addEventListener('click', function() {
        clickCount++;
        showClickProgress();
        
        if (clickCount === 7) {
            showFactWithEffect();
            clickCount = 0;
        }
    });

    // CSS animations (thêm vào head nếu chưa có)
    if (!document.getElementById('easter-egg-styles')) {
        const style = document.createElement('style');
        style.id = 'easter-egg-styles';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
                50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    // Console message for developers
    console.log(`
    ╔══════════════════════════════════════╗
    ║        Troy Profile Website          ║
    ║         Phát triển bởi TKM           ║
    ║          Chào mừng đến với           ║
    ║           hồ sơ của Troy!            ║
    ╚══════════════════════════════════════╝
    `);

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Trang web đã tải xong trong ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('Trang web tải chậm. Có thể cần tối ưu hóa.');
        }
    });

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Đã xảy ra lỗi:', e.error);
        showNotification('Đã xảy ra lỗi nhỏ, nhưng trang web vẫn hoạt động bình thường.');
    });

});