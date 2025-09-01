// Switch view functionality
const switchBtn = document.getElementById('switchBtn');
const leaderboardView = document.getElementById('leaderboardView');
const friendsView = document.getElementById('friendsView');
let isFriendsView = false;

switchBtn.addEventListener('click', () => {
    if (isFriendsView) {
        leaderboardView.style.display = 'block';
        friendsView.style.display = 'none';
        switchBtn.textContent = 'Switch to TOP Ranking';
    } else {
        leaderboardView.style.display = 'none';
        friendsView.style.display = 'block';
        switchBtn.textContent = 'Switch to Global Ranking';
    }
    isFriendsView = !isFriendsView;
});

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Ranking Animation System
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    new RankingAnimator();
});
class RankingAnimator {
    constructor() {
        this.isAnimating = false;
        this.isPaused = false;
        this.animationSpeed = 1.5; // Default speed (1-5 scale)
        this.speedMultiplier = 1; // CSS animation multiplier
        this.autoTriggerTimeout = null;
        this.hasTriggered = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.startAutoTrigger();
    }
    
    initializeElements() {
        this.tadaItem = document.getElementById('tada-item');
        this.mariaItem = document.getElementById('maria-item');
        this.tadaScore = document.getElementById('tada-score');
        this.notification = document.getElementById('rankingNotification');
        this.speedIndicator = document.getElementById('speedIndicator');
        this.leaderboardList = document.querySelector('.leaderboard-list');
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.triggerRankingChange();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    this.resetRanking();
                    break;
                case 'KeyP':
                    e.preventDefault();
                    this.togglePause();
                    break;
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                case 'Digit5':
                    e.preventDefault();
                    this.setSpeed(parseInt(e.code.slice(-1)));
                    break;
            }
        });
    }
    
    startAutoTrigger() {
        if (this.autoTriggerTimeout) {
            clearTimeout(this.autoTriggerTimeout);
        }
        
        this.autoTriggerTimeout = setTimeout(() => {
            if (!this.hasTriggered) {
                this.triggerRankingChange();
            }
        }, 2000); // 2 seconds delay
    }
    
    showNotification() {
        this.notification.classList.add('show');
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 2000);
    }
    
    async triggerRankingChange() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.hasTriggered = true;
        
        // Show notification
        this.showNotification();
        
        // Wait a bit for notification to show
        await this.delay(300);
        
        // Highlight Tada
        this.tadaItem.classList.add('highlight');
        
        // Wait and then update score
        await this.delay(500);
        await this.animateScoreChange();
        
        // Wait and then animate position change
        await this.delay(300);
        await this.animatePositionChange();
        
        // Complete animation
        await this.delay(500);
        this.completeAnimation();
        
        this.isAnimating = false;
    }
    
    async animateScoreChange() {
        const scoreElement = this.tadaScore;
        const startScore = 84;
        const endScore = 87;
        const duration = 800 * this.speedMultiplier;
        const steps = 30;
        const increment = (endScore - startScore) / steps;
        
        scoreElement.classList.add('updating');
        
        for (let i = 0; i <= steps; i++) {
            const currentScore = Math.round(startScore + (increment * i));
            scoreElement.textContent = currentScore + '%';
            await this.delay(duration / steps);
        }
        
        setTimeout(() => {
            scoreElement.classList.remove('updating');
        }, 200);
    }
    
    async animatePositionChange() {
        // Get current positions
        const tadaRect = this.tadaItem.getBoundingClientRect();
        const mariaRect = this.mariaItem.getBoundingClientRect();
        const distance = mariaRect.top - tadaRect.top;
        
        // Add moving class for smooth transition
        this.tadaItem.classList.add('moving');
        this.mariaItem.classList.add('moving');
        
        // Apply transforms
        this.tadaItem.style.transform = `translateY(${distance}px)`;
        this.mariaItem.style.transform = `translateY(${-distance}px)`;
        
        // Wait for animation to complete
        await this.delay(1500 * this.speedMultiplier);
        
        // Actually reorder in DOM
        const parent = this.tadaItem.parentNode;
        const tadaNextSibling = this.tadaItem.nextElementSibling;
        
        // Insert Tada before Maria
        parent.insertBefore(this.tadaItem, this.mariaItem);
        // Insert Maria where Tada was
        parent.insertBefore(this.mariaItem, tadaNextSibling);
        
        // Clear transforms and classes
        this.tadaItem.style.transform = '';
        this.mariaItem.style.transform = '';
        this.tadaItem.classList.remove('moving');
        this.mariaItem.classList.remove('moving');
    }
    
    completeAnimation() {
        // Update classes and ranks
        this.tadaItem.classList.remove('third', 'highlight');
        this.tadaItem.classList.add('second');
        this.tadaItem.querySelector('.rank-icon').textContent = '🥈';
        
        this.mariaItem.classList.remove('second');
        this.mariaItem.classList.add('third');
        this.mariaItem.querySelector('.rank-icon').textContent = '🥉';
    }
    
    resetRanking() {
        if (this.isAnimating) return;
        
        // Clear any ongoing animations
        this.tadaItem.style.transform = '';
        this.mariaItem.style.transform = '';
        this.tadaItem.classList.remove('highlight', 'moving', 'second');
        this.mariaItem.classList.remove('moving', 'third');
        this.tadaItem.classList.add('third');
        this.mariaItem.classList.add('second');
        
        // Reset score
        this.tadaScore.textContent = '84%';
        this.tadaScore.classList.remove('updating');
        
        // Reset ranks
        this.tadaItem.querySelector('.rank-icon').textContent = '🥉';
        this.mariaItem.querySelector('.rank-icon').textContent = '🥈';
        
        // Reorder DOM elements to original positions
        const parent = this.tadaItem.parentNode;
        const emilyItem = parent.querySelector('.first');
        
        // Insert Maria after Emily
        parent.insertBefore(this.mariaItem, emilyItem.nextElementSibling);
        // Insert Tada after Maria
        parent.insertBefore(this.tadaItem, this.mariaItem.nextElementSibling);
        
        this.hasTriggered = false;
        this.startAutoTrigger();
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        document.body.classList.toggle('paused', this.isPaused);
    }
    
    setSpeed(speed) {
        this.animationSpeed = speed;
        this.speedMultiplier = this.getSpeedMultiplier(speed);
        this.updateSpeedIndicator(speed);
        
        // Update CSS animation speeds
        document.documentElement.style.setProperty('--animation-speed', this.speedMultiplier);
    }
    
    getSpeedMultiplier(speed) {
        const speedMap = { 1: 2, 2: 1.5, 3: 1, 4: 0.7, 5: 0.5 };
        return speedMap[speed] || 1;
    }
    
    updateSpeedIndicator(speed) {
        const speedNames = { 1: 'Slowest', 2: 'Slow', 3: 'Normal', 4: 'Fast', 5: 'Fastest' };
        this.speedIndicator.textContent = `Speed: ${speedNames[speed]} (${speed})`;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms / this.speedMultiplier));
    }
}

// Initialize the ranking animator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    new RankingAnimator();
});
