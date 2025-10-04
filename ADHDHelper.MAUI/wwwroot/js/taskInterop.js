// ADHD Helper - JavaScript Interop Functions

window.adhdHelper = {
    // Task completion animations
    showTaskCompletionAnimation: function(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            // Add completion animation class
            taskElement.classList.add('task-completing');

            // Create celebration animation
            this.createCelebrationAnimation(taskElement);

            // Show notification
            this.showNotification('🎉 Task completed! Great job!', 'success');

            // Remove animation class after animation completes
            setTimeout(() => {
                taskElement.classList.remove('task-completing');
                taskElement.classList.add('task-completed');
            }, 500);
        }
    },

    // Create celebration animation
    createCelebrationAnimation: function(element) {
        const rect = element.getBoundingClientRect();
        const celebrationCount = 8;

        for (let i = 0; i < celebrationCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.backgroundColor = this.getRandomColor();
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';

            document.body.appendChild(particle);

            // Animate particle
            const angle = (i / celebrationCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    },

    // Get random celebration colors
    getRandomColor: function() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // Show notifications
    showNotification: function(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.adhd-notification');
        existingNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `adhd-notification adhd-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;

        if (type === 'success') {
            notification.style.borderLeft = '4px solid #28A745';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid #DC3545';
        } else if (type === 'warning') {
            notification.style.borderLeft = '4px solid #FFC107';
        } else {
            notification.style.borderLeft = '4px solid #007ACC';
        }

        const style = document.createElement('style');
        style.textContent = `
            .notification-content {
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6c757d;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-close:hover {
                color: #495057;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Slide in animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        if (notification.parentElement) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, duration);
        }
    },

    // Focus session management
    startFocusSession: function() {
        this.showNotification('🎯 Focus session started! Minimizing distractions...', 'success');

        // You could integrate with browser focus modes or system DND
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Focus Session Started', {
                        body: 'ADHD Helper is helping you focus. You got this! 💪',
                        icon: '/favicon.png'
                    });
                }
            });
        }
    },

    // Modal management
    showQuickAddModal: function() {
        console.log('Quick add modal would open here');
        this.showNotification('Quick add feature coming soon!', 'info');
    },

    showCreateTaskModal: function() {
        console.log('Create task modal would open here');
        this.showNotification('Create task feature coming soon!', 'info');
    },

    showEditTaskModal: function(taskId) {
        console.log('Edit task modal would open for task:', taskId);
        this.showNotification('Edit task feature coming soon!', 'info');
    },

    showScheduleTaskModal: function(taskId) {
        console.log('Schedule task modal would open for task:', taskId);
        this.showNotification('Schedule task feature coming soon!', 'info');
    },

    // Utility functions
    vibrate: function(pattern = [100, 50, 100]) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    },

    // Play success sound
    playSuccessSound: function() {
        // Create a simple success sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported or blocked');
        }
    },

    // Theme management
    toggleTheme: function() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');

        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    },

    // Initialize theme from localStorage
    initializeTheme: function() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-theme');
        }
    },

    // Accessibility helpers
    announceToScreenReader: function(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },

    // ADHD-specific helpers
    createBreakReminder: function(intervalMinutes = 25) {
        if (this.breakReminderInterval) {
            clearInterval(this.breakReminderInterval);
        }

        this.breakReminderInterval = setInterval(() => {
            this.showNotification('🧘 Time for a break! Step away for a few minutes.', 'info', 5000);
            this.vibrate([200, 100, 200]);
        }, intervalMinutes * 60 * 1000);
    },

    // Pomodoro timer
    startPomodoroTimer: function(workMinutes = 25, breakMinutes = 5) {
        let timeLeft = workMinutes * 60;
        let isWorkTime = true;

        if (this.pomodoroInterval) {
            clearInterval(this.pomodoroInterval);
        }

        this.pomodoroInterval = setInterval(() => {
            timeLeft--;

            // Update any timer displays
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Update timer displays
            const timerElements = document.querySelectorAll('.timer-display');
            timerElements.forEach(el => el.textContent = timeDisplay);

            if (timeLeft <= 0) {
                if (isWorkTime) {
                    this.showNotification('🎉 Work session complete! Time for a break!', 'success');
                    this.playSuccessSound();
                    timeLeft = breakMinutes * 60;
                    isWorkTime = false;
                } else {
                    this.showNotification('⚡ Break over! Ready for another work session?', 'info');
                    timeLeft = workMinutes * 60;
                    isWorkTime = true;
                }
            }
        }, 1000);
    },

    stopPomodoroTimer: function() {
        if (this.pomodoroInterval) {
            clearInterval(this.pomodoroInterval);
            this.pomodoroInterval = null;
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adhdHelper.initializeTheme();

    // Create global shortcuts for ADHD-friendly features
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter for quick task add
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            window.adhdHelper.showQuickAddModal();
        }

        // Ctrl/Cmd + F for focus mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'f' && e.shiftKey) {
            e.preventDefault();
            window.adhdHelper.startFocusSession();
        }
    });

    // Add celebration particle styles
    const style = document.createElement('style');
    style.textContent = `
        .task-completing {
            animation: taskCompleteScale 0.5s ease-in-out;
        }

        @keyframes taskCompleteScale {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .celebration-particle {
            pointer-events: none;
            z-index: 9999;
        }

        .dark-theme {
            --bg-color: #1a1a1a;
            --text-color: #e0e0e0;
            --card-bg: #2d2d2d;
        }

        .dark-theme body {
            background: var(--bg-color);
            color: var(--text-color);
        }

        .dark-theme .dashboard-card,
        .dark-theme .task-item,
        .dark-theme .task-card {
            background: var(--card-bg);
            color: var(--text-color);
        }

        .dark-theme .card-header {
            background: rgba(255,255,255,0.05);
        }
    `;
    document.head.appendChild(style);
});

// Export for use in Blazor
window.showTaskCompletionAnimation = window.adhdHelper.showTaskCompletionAnimation.bind(window.adhdHelper);
window.showNotification = window.adhdHelper.showNotification.bind(window.adhdHelper);
window.showQuickAddModal = window.adhdHelper.showQuickAddModal.bind(window.adhdHelper);
window.showCreateTaskModal = window.adhdHelper.showCreateTaskModal.bind(window.adhdHelper);
window.showEditTaskModal = window.adhdHelper.showEditTaskModal.bind(window.adhdHelper);
window.showScheduleTaskModal = window.adhdHelper.showScheduleTaskModal.bind(window.adhdHelper);
window.startFocusSession = window.adhdHelper.startFocusSession.bind(window.adhdHelper);