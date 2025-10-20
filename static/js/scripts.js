 // @mahiru-chanVN
 function createSparkles() {
            for (let i = 0; i < 50; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(sparkle);
            }
        }
        createSparkles();

        // Create confetti
        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#54a0ff', '#feca57'];
            const shapes = ['🌸', '🌺', '💝', '✨', '⭐', '💖', '🎀'];
            
            if (Math.random() > 0.5) {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
            } else {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.background = 'transparent';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }

        // tao
        for (let i = 0; i < 30; i++) {
            setTimeout(createConfetti, i * 100);
        }

        // lap lai
        setInterval(createConfetti, 400);

        // Fireworks effect
        function createFirework(x, y) {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#54a0ff', '#feca57'];
            
            for (let i = 0; i < 40; i++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * i) / 40;
                const velocity = 120 + Math.random() * 80;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                firework.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });
                
                document.body.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1000);
            }
        }

        // Create floating hearts
        function createHeart(x, y) {
            const hearts = ['💖', '💗', '💕', '💝', '❤️', '🌸', '🌺'];
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }

        // Han che click lien tuc
        const _celebrateState = {
            originalHTML: null,
            restoreTimer: null
        };

        function celebrate(name) {
            const messageBox = document.querySelector('.message');

            //Fix bug: tranh flicker
            if (_celebrateState.originalHTML === null) {
                _celebrateState.originalHTML = messageBox.innerHTML;
            }

           //timeout button
            if (_celebrateState.restoreTimer) {
                clearTimeout(_celebrateState.restoreTimer);
                _celebrateState.restoreTimer = null;
            }

            let personalMessage = '';
            if (name === 'Phạm Thị Thanh') {
                personalMessage = ' Chúc mừng ngày Phụ nữ Việt Nam 20/10! <br>Chúc mẹ luôn xinh đẹp, công tác tốt và dồi dào sức khoẻ hẹ hẹ hẹ 💖';
            } else if (name === 'Nguyễn Anh Thư') {
                personalMessage = ' Chúc mừng ngày 20/10! <br>Chúc sinh viên Học Viện Tài Chính luôn tràn đầy niềm vui, sức khỏe dồi dào, lâu lâu về mình kéo nhau đi ăn nữa nhé 💙';
            }

            messageBox.innerHTML = personalMessage;

            //luu lai click gan nhat
            _celebrateState.restoreTimer = setTimeout(() => {
                messageBox.innerHTML = _celebrateState.originalHTML;
                _celebrateState.restoreTimer = null;
            }, 6000);
            
            // tao phao hoa
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createFirework(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight * 0.7
                    );
                }, i * 150);
            }
            
            // Trai tim
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createHeart(
                        Math.random() * window.innerWidth,
                        window.innerHeight - 50
                    );
                }, i * 100);
            }
            
            // Burst
            for (let i = 0; i < 30; i++) {
                createConfetti();
            }
        }

        // He so ngau nhien phao hoa
        setInterval(() => {
            if (Math.random() > 0.8) {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight * 0.5
                );
            }
        }, 2000);