// Drag and Drop functionality for ADHD Helper

window.dragDropManager = {
    draggedElement: null,
    dropZone: null,
    placeholder: null,

    // Initialize drag and drop for task lists
    initializeTaskDragDrop: function() {
        const taskItems = document.querySelectorAll('.task-item[draggable="true"]');
        const taskContainer = document.querySelector('.task-list-container');

        if (!taskContainer) return;

        // Add drop zone listeners to container
        taskContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        taskContainer.addEventListener('drop', this.handleDrop.bind(this));
        taskContainer.addEventListener('dragenter', this.handleDragEnter.bind(this));
        taskContainer.addEventListener('dragleave', this.handleDragLeave.bind(this));

        // Add drag listeners to each task item
        taskItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
    },

    // Create visual placeholder for drop position
    createPlaceholder: function() {
        const placeholder = document.createElement('div');
        placeholder.className = 'drag-placeholder';
        placeholder.style.cssText = `
            height: 4px;
            background: #007ACC;
            border-radius: 2px;
            margin: 8px 0;
            opacity: 0.8;
            transition: all 0.2s ease;
            position: relative;
        `;

        // Add animated dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                background: #007ACC;
                border-radius: 50%;
                position: absolute;
                top: -2px;
                left: ${i * 20 + 10}px;
                animation: placeholderPulse 1.5s ease-in-out infinite;
                animation-delay: ${i * 0.3}s;
            `;
            placeholder.appendChild(dot);
        }

        return placeholder;
    },

    handleDragStart: function(e) {
        this.draggedElement = e.target;

        // Add dragging class for visual feedback
        e.target.classList.add('dragging');

        // Set drag data
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        e.dataTransfer.effectAllowed = 'move';

        // Create drag image with opacity
        const dragImage = e.target.cloneNode(true);
        dragImage.style.opacity = '0.8';
        dragImage.style.transform = 'rotate(5deg)';
        dragImage.style.pointerEvents = 'none';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 0, 0);

        // Remove the drag image after a short delay
        setTimeout(() => {
            if (document.body.contains(dragImage)) {
                document.body.removeChild(dragImage);
            }
        }, 0);

        // Add placeholder styles
        const style = document.createElement('style');
        style.id = 'drag-placeholder-styles';
        style.textContent = `
            @keyframes placeholderPulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }

            .dragging {
                opacity: 0.5;
                transform: rotate(2deg);
                z-index: 1000;
                box-shadow: 0 8px 30px rgba(0,0,0,0.3) !important;
            }

            .drag-over {
                background: rgba(0, 122, 204, 0.1);
                border: 2px dashed #007ACC;
            }
        `;
        document.head.appendChild(style);

        // Haptic feedback on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    },

    handleDragEnd: function(e) {
        // Clean up
        e.target.classList.remove('dragging');

        // Remove placeholder
        if (this.placeholder && this.placeholder.parentNode) {
            this.placeholder.parentNode.removeChild(this.placeholder);
            this.placeholder = null;
        }

        // Remove drag styles
        const dragStyles = document.getElementById('drag-placeholder-styles');
        if (dragStyles) {
            dragStyles.remove();
        }

        // Remove drag-over class from all elements
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });

        this.draggedElement = null;
        this.dropZone = null;
    },

    handleDragEnter: function(e) {
        e.preventDefault();
        if (e.target.classList.contains('task-list-container')) {
            e.target.classList.add('drag-over');
        }
    },

    handleDragLeave: function(e) {
        // Only remove drag-over if we're actually leaving the container
        if (e.target.classList.contains('task-list-container') &&
            !e.target.contains(e.relatedTarget)) {
            e.target.classList.remove('drag-over');
        }
    },

    handleDragOver: function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const container = e.currentTarget;
        const afterElement = this.getDragAfterElement(container, e.clientY);

        // Create placeholder if it doesn't exist
        if (!this.placeholder) {
            this.placeholder = this.createPlaceholder();
        }

        // Position placeholder
        if (afterElement == null) {
            container.appendChild(this.placeholder);
        } else {
            container.insertBefore(this.placeholder, afterElement);
        }
    },

    handleDrop: function(e) {
        e.preventDefault();

        if (!this.draggedElement) return;

        const container = e.currentTarget;
        const afterElement = this.getDragAfterElement(container, e.clientY);

        // Move the dragged element
        if (afterElement == null) {
            container.appendChild(this.draggedElement);
        } else {
            container.insertBefore(this.draggedElement, afterElement);
        }

        // Remove placeholder
        if (this.placeholder && this.placeholder.parentNode) {
            this.placeholder.parentNode.removeChild(this.placeholder);
            this.placeholder = null;
        }

        container.classList.remove('drag-over');

        // Get new order of tasks
        const taskElements = container.querySelectorAll('.task-item[data-task-id]');
        const newOrder = Array.from(taskElements).map(el => el.dataset.taskId);

        // Notify Blazor component of the new order
        if (window.blazorTaskReorder) {
            window.blazorTaskReorder(newOrder);
        }

        // Show success feedback
        window.adhdHelper.showNotification('✅ Task order updated!', 'success', 2000);

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        // Play subtle audio feedback
        this.playDropSound();
    },

    getDragAfterElement: function(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    // Calendar drag and drop
    initializeCalendarDragDrop: function() {
        const calendarCells = document.querySelectorAll('.calendar-cell');
        const taskItems = document.querySelectorAll('.task-item[draggable="true"]');

        calendarCells.forEach(cell => {
            cell.addEventListener('dragover', this.handleCalendarDragOver.bind(this));
            cell.addEventListener('drop', this.handleCalendarDrop.bind(this));
            cell.addEventListener('dragenter', this.handleCalendarDragEnter.bind(this));
            cell.addEventListener('dragleave', this.handleCalendarDragLeave.bind(this));
        });

        taskItems.forEach(item => {
            item.addEventListener('dragstart', this.handleTaskDragStart.bind(this));
            item.addEventListener('dragend', this.handleTaskDragEnd.bind(this));
        });
    },

    handleCalendarDragOver: function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    },

    handleCalendarDragEnter: function(e) {
        e.preventDefault();
        if (e.target.classList.contains('calendar-cell')) {
            e.target.classList.add('calendar-drop-target');
        }
    },

    handleCalendarDragLeave: function(e) {
        if (e.target.classList.contains('calendar-cell')) {
            e.target.classList.remove('calendar-drop-target');
        }
    },

    handleCalendarDrop: function(e) {
        e.preventDefault();

        const taskId = e.dataTransfer.getData('text/plain');
        const targetDate = e.target.dataset.date;

        if (taskId && targetDate) {
            // Notify Blazor component
            if (window.blazorScheduleTask) {
                window.blazorScheduleTask(taskId, targetDate);
            }

            // Visual feedback
            window.adhdHelper.showNotification('📅 Task scheduled successfully!', 'success');

            // Add visual effect to calendar cell
            e.target.classList.add('task-scheduled');
            setTimeout(() => {
                e.target.classList.remove('task-scheduled');
            }, 1000);
        }

        e.target.classList.remove('calendar-drop-target');
    },

    handleTaskDragStart: function(e) {
        const taskId = e.target.dataset.taskId;
        e.dataTransfer.setData('text/plain', taskId);
        e.dataTransfer.effectAllowed = 'move';

        e.target.classList.add('dragging');
    },

    handleTaskDragEnd: function(e) {
        e.target.classList.remove('dragging');

        // Remove all drop targets
        document.querySelectorAll('.calendar-drop-target').forEach(el => {
            el.classList.remove('calendar-drop-target');
        });
    },

    // Audio feedback
    playDropSound: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Create a pleasant "drop" sound
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Audio not supported or blocked
        }
    },

    // Touch support for mobile devices
    addTouchSupport: function() {
        let touchItem = null;
        let touchStartY = 0;
        let touchCurrentY = 0;

        document.addEventListener('touchstart', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (taskItem && taskItem.draggable) {
                touchItem = taskItem;
                touchStartY = e.touches[0].clientY;
                touchItem.classList.add('touch-dragging');

                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (touchItem) {
                e.preventDefault();
                touchCurrentY = e.touches[0].clientY;
                const deltaY = touchCurrentY - touchStartY;

                touchItem.style.transform = `translateY(${deltaY}px) rotate(2deg)`;
                touchItem.style.zIndex = '1000';
                touchItem.style.opacity = '0.8';
            }
        });

        document.addEventListener('touchend', (e) => {
            if (touchItem) {
                touchItem.classList.remove('touch-dragging');
                touchItem.style.transform = '';
                touchItem.style.zIndex = '';
                touchItem.style.opacity = '';

                // Check if dropped on a valid target
                const dropTarget = document.elementFromPoint(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                );

                if (dropTarget && dropTarget.classList.contains('calendar-cell')) {
                    // Handle calendar drop
                    const taskId = touchItem.dataset.taskId;
                    const targetDate = dropTarget.dataset.date;

                    if (window.blazorScheduleTask) {
                        window.blazorScheduleTask(taskId, targetDate);
                    }

                    window.adhdHelper.showNotification('📅 Task scheduled!', 'success');
                }

                touchItem = null;
            }
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize drag and drop functionality
    window.dragDropManager.initializeTaskDragDrop();
    window.dragDropManager.addTouchSupport();

    // Re-initialize when page content changes (for SPA navigation)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                // Re-initialize drag and drop for new elements
                setTimeout(() => {
                    window.dragDropManager.initializeTaskDragDrop();
                    window.dragDropManager.initializeCalendarDragDrop();
                }, 100);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Add CSS for drag and drop effects
    const style = document.createElement('style');
    style.textContent = `
        .calendar-drop-target {
            background: rgba(0, 122, 204, 0.2) !important;
            border: 2px dashed #007ACC !important;
            transform: scale(1.02);
            transition: all 0.2s ease;
        }

        .task-scheduled {
            background: rgba(40, 167, 69, 0.2) !important;
            animation: taskScheduledPulse 1s ease-in-out;
        }

        @keyframes taskScheduledPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .touch-dragging {
            box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
            transition: none !important;
        }

        .task-item[draggable="true"] {
            cursor: grab;
        }

        .task-item[draggable="true"]:active {
            cursor: grabbing;
        }

        /* Mobile-specific improvements */
        @media (max-width: 768px) {
            .task-item {
                padding: 1.5rem 1rem;
                margin-bottom: 0.5rem;
            }

            .drag-handle {
                font-size: 1.2rem;
                padding: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export functions for Blazor interop
window.initializeTaskDragDrop = window.dragDropManager.initializeTaskDragDrop.bind(window.dragDropManager);
window.initializeCalendarDragDrop = window.dragDropManager.initializeCalendarDragDrop.bind(window.dragDropManager);