class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    showNotification(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = `notification-icon fas ${
            type === 'success' ? 'fa-check-circle' :
            type === 'error' ? 'fa-exclamation-circle' :
            type === 'warning' ? 'fa-exclamation-triangle' :
            'fa-info-circle'
        }`;
        
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'notification-title';
        titleElement.textContent = title;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'notification-message';
        messageElement.textContent = message;
        
        const closeButton = document.createElement('span');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '&times;';
        closeButton.onclick = () => this.removeNotification(notification);
        
        content.appendChild(titleElement);
        content.appendChild(messageElement);
        notification.appendChild(icon);
        notification.appendChild(content);
        notification.appendChild(closeButton);
        
        this.container.appendChild(notification);
        
        if (duration > 0) {
            setTimeout(() => this.removeNotification(notification), duration);
        }
    }

    removeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    success(title, message, duration) {
        this.showNotification('success', title, message, duration);
    }

    error(title, message, duration) {
        this.showNotification('error', title, message, duration);
    }

    warning(title, message, duration) {
        this.showNotification('warning', title, message, duration);
    }

    info(title, message, duration) {
        this.showNotification('info', title, message, duration);
    }
}

// Create a global notification system instance
const notifications = new NotificationSystem(); 