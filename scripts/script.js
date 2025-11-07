let slideIndex = 0;
let slideInterval;
let isPlaying = true;
let slideSpeed = 3000; // 3 seconds

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startSlideshow();
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetInterval();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n - 1);
    resetInterval();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n >= slides.length) {
        slideIndex = 0;
    }
    
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide and activate dot
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, slideSpeed);
}

function resetInterval() {
    clearInterval(slideInterval);
    if (isPlaying) {
        startSlideshow();
    }
}

function pausePlay() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (isPlaying) {
        clearInterval(slideInterval);
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    } else {
        startSlideshow();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
    }
}

function changeSpeed(direction) {
    if (direction > 0) {
        slideSpeed = Math.max(1000, slideSpeed - 500); // Minimum 1 second
    } else {
        slideSpeed = Math.min(10000, slideSpeed + 500); // Maximum 10 seconds
    }
    
    if (isPlaying) {
        resetInterval();
    }
    
    // Show speed notification
    showNotification(`Slide speed: ${slideSpeed/1000}s`);
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            plusSlides(-1);
            break;
        case 'ArrowRight':
            plusSlides(1);
            break;
        case ' ':
            event.preventDefault();
            pausePlay();
            break;
    }
});