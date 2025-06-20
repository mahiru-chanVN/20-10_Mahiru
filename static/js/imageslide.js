(function() {
    // Danh sách ảnh từ các nguồn khác nhau
    const miniImages = [
        {
            src: './images/1.jpg',
        },
        {
            src: './images/2.png',
        },
        {
            src: './images/3.png',
        },
        {
            src: './images/4.jpg',
        },
        {
            src: './images/5.jpg',
        },
        {
            src: './images/6.png',
        }
    ];

    let miniCurrentSlide = 0;
    let miniAutoSlideInterval;
    let miniImagesLoaded = 0;

    // Tạo slides và dots
    function initializeMiniSlider() {
        const slider = document.getElementById('miniImageSlider');
        const dotsContainer = document.getElementById('miniDotsContainer');
        const loader = document.getElementById('miniLoader');

        if (!slider) return; // Thoát nếu không tìm thấy slider

        // Tạo slides
        miniImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `mini-slide ${index === 0 ? 'mini-active' : ''}`;
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            img.onload = () => {
                miniImagesLoaded++;
                if (miniImagesLoaded >= miniImages.length && loader) {
                    loader.style.display = 'none';
                }
            };
            img.onerror = () => {
                // Fallback nếu ảnh không load được
                img.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23${Math.floor(Math.random()*16777215).toString(16)}"/><text x="150" y="100" text-anchor="middle" fill="white" font-size="16">Ảnh ${index + 1}</text></svg>`;
                miniImagesLoaded++;
                if (miniImagesLoaded >= miniImages.length && loader) {
                    loader.style.display = 'none';
                }
            };
            
            const title = document.createElement('div');
            title.className = 'mini-slide-title';
            title.textContent = image.title;
            
            slide.appendChild(img);
            slide.appendChild(title);
            slider.appendChild(slide);

            // Tạo dots
            if (dotsContainer) {
                const dot = document.createElement('div');
                dot.className = `mini-dot ${index === 0 ? 'mini-active' : ''}`;
                dot.onclick = () => goToMiniSlide(index);
                dotsContainer.appendChild(dot);
            }
        });

        updateMiniSlideCounter();
        startMiniAutoSlide();

        // Gán sự kiện hover sau khi slider đã được tạo
        const sliderContainer = document.querySelector('.mini-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(miniAutoSlideInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                startMiniAutoSlide();
            });
        }
    }

    // Chuyển slide
    window.changeMiniSlide = function(direction) {
        const slides = document.querySelectorAll('.mini-slide');
        const dots = document.querySelectorAll('.mini-dot');
        
        if (slides[miniCurrentSlide]) {
            slides[miniCurrentSlide].classList.remove('mini-active');
        }
        if (dots[miniCurrentSlide]) {
            dots[miniCurrentSlide].classList.remove('mini-active');
        }
        
        miniCurrentSlide += direction;
        
        if (miniCurrentSlide >= miniImages.length) {
            miniCurrentSlide = 0;
        } else if (miniCurrentSlide < 0) {
            miniCurrentSlide = miniImages.length - 1;
        }
        
        if (slides[miniCurrentSlide]) {
            slides[miniCurrentSlide].classList.add('mini-active');
        }
        if (dots[miniCurrentSlide]) {
            dots[miniCurrentSlide].classList.add('mini-active');
        }
        
        updateMiniSlideCounter();
        resetMiniAutoSlide();
    }

    // Đi đến slide cụ thể
    window.goToMiniSlide = function(index) {
        const slides = document.querySelectorAll('.mini-slide');
        const dots = document.querySelectorAll('.mini-dot');
        
        if (slides[miniCurrentSlide]) {
            slides[miniCurrentSlide].classList.remove('mini-active');
        }
        if (dots[miniCurrentSlide]) {
            dots[miniCurrentSlide].classList.remove('mini-active');
        }
        
        miniCurrentSlide = index;
        
        if (slides[miniCurrentSlide]) {
            slides[miniCurrentSlide].classList.add('mini-active');
        }
        if (dots[miniCurrentSlide]) {
            dots[miniCurrentSlide].classList.add('mini-active');
        }
        
        updateMiniSlideCounter();
        resetMiniAutoSlide();
    }

    // Cập nhật bộ đếm slide
    function updateMiniSlideCounter() {
        const counter = document.getElementById('miniSlideCounter');
        if (counter) {
            counter.textContent = `${miniCurrentSlide + 1} / ${miniImages.length}`;
        }
    }

    // Tự động chuyển slide
    function startMiniAutoSlide() {
        miniAutoSlideInterval = setInterval(() => {
            changeMiniSlide(1);
        }, 4000);
    }

    // Reset auto slide
    function resetMiniAutoSlide() {
        clearInterval(miniAutoSlideInterval);
        startMiniAutoSlide();
    }

    // Khởi tạo khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMiniSlider);
    } else {
        initializeMiniSlider();
    }
})();