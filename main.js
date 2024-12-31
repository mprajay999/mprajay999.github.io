
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();
       document.querySelector(this.getAttribute('href')).scrollIntoView({
           behavior: 'smooth'
       });
   });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
   const navbar = document.querySelector('.navbar');
   if (window.scrollY > 50) {
       navbar.classList.add('bg-dark');
       navbar.classList.add('shadow');
   } else {
       navbar.classList.remove('bg-dark');
       navbar.classList.remove('shadow');
   }
});

// Animation on scroll
const observerOptions = {
   root: null,
   threshold: 0.1,
   rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           entry.target.classList.add('fade-in');
           observer.unobserve(entry.target);
       }
   });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
   observer.observe(element);
});

// Gallery image modal
document.querySelectorAll('.gallery-img').forEach(image => {
   image.addEventListener('click', function() {
       const modal = new bootstrap.Modal(document.getElementById('imageModal'));
       const modalImg = document.getElementById('modalImage');
       modalImg.src = this.src;
       modal.show();
   });
});

// Menu Carousel Enhancement
document.addEventListener('DOMContentLoaded', function() {
   const menuCarousel = document.getElementById('menuCarousel');
   if (menuCarousel) {
       const carousel = new bootstrap.Carousel(menuCarousel, {
           interval: false,
           touch: true
       });

       // Add touch swipe support
       let touchStartX = 0;
       let touchEndX = 0;

       menuCarousel.addEventListener('touchstart', e => {
           touchStartX = e.changedTouches[0].screenX;
       });

       menuCarousel.addEventListener('touchend', e => {
           touchEndX = e.changedTouches[0].screenX;
           handleSwipe();
       });

       function handleSwipe() {
           const swipeThreshold = 50;
           if (touchEndX < touchStartX - swipeThreshold) {
               carousel.next();
           }
           if (touchEndX > touchStartX + swipeThreshold) {
               carousel.prev();
           }
       }

       // Smooth scroll animation for menu items
       const menuItems = document.querySelectorAll('.menu-item');
       menuItems.forEach(item => {
           item.addEventListener('mouseenter', function() {
               this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
           });
       });
   }
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.style.display = chatWidget.style.display === 'none' ? 'flex' : 'none';
        if (chatWidget.style.display === 'flex') {
            messageInput.focus();
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            messageInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes('reservation') || message.includes('book') || message.includes('table')) {
            return "To make a reservation, please call us at (555) 123-4567 or email us at reservations@lamaisondor.com";
        } else if (message.includes('menu') || message.includes('food') || message.includes('dish')) {
            return "Our menu features a variety of French cuisine classics. You can view our full menu above. Would you like any specific recommendations?";
        } else if (message.includes('hour') || message.includes('open')) {
            return "We're open Monday-Thursday 5:00 PM-10:00 PM, Friday-Saturday 5:00 PM-11:00 PM, and Sunday 4:00 PM-9:00 PM";
        } else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            return "We're located at 123 Gourmet Street in the Culinary District";
        } else {
            return "Thank you for your message. How can I assist you with your dining experience at La Maison d'Or?";
        }
    }

    // Event listeners for sending messages
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial bot message
    setTimeout(() => {
        addMessage("Welcome to La Maison d'Or! How can I assist you today?", 'bot');
    }, 1000);
});
