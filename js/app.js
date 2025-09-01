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
class RankingAnimator {
    constructor() {
        this.isAnimating = false;
        this.isPaused = false;
        this.animationSpeed = 3;
        this.speedMultiplier = 1;
        this.autoTriggerTimeout = null;
        this.hasTriggered = false;
        this.currentStage = 0;
        
        // 明確な状態遷移定義
        this.rankingStates = [
            {
                // 初期状態
                time: 0,
                message: "Initial State",
                rankings: [
                    { name: "Emily", score: 99, rank: 1 },
                    { name: "Maria", score: 81, rank: 2 },
                    { name: "John", score: 77, rank: 3 },
                    { name: "Alex", score: 70, rank: 4 },
                    { name: "Tada", score: 64, rank: 5 }
                ]
            },
            {
                // 4秒経過
                time: 4000,
                message: "Stage 1: Tada overtakes Alex (4th place)",
                rankings: [
                    { name: "Emily", score: 99, rank: 1 },
                    { name: "Maria", score: 81, rank: 2 },
                    { name: "John", score: 77, rank: 3 },
                    { name: "Tada", score: 76, rank: 4 },
                    { name: "Alex", score: 70, rank: 5 }
                ]
            },
            {
                // 10秒経過
                time: 10000,
                message: "Stage 2: Tada overtakes John (3rd place)",
                rankings: [
                    { name: "Emily", score: 99, rank: 1 },
                    { name: "Maria", score: 81, rank: 2 },
                    { name: "Tada", score: 80, rank: 3 },
                    { name: "John", score: 77, rank: 4 },
                    { name: "Alex", score: 70, rank: 5 }
                ]
            },
            {
                // 15秒経過
                time: 15000,
                message: "Stage 3: Tada overtakes Maria (2nd place)",
                rankings: [
                    { name: "Emily", score: 99, rank: 1 },
                    { name: "Tada", score: 91, rank: 2 },
                    { name: "Maria", score: 81, rank: 3 },
                    { name: "John", score: 75, rank: 4 },
                    { name: "Alex", score: 70, rank: 5 }
                ]
            }
        ];
        
        this.initializeElements();
        this.setupEventListeners();
        this.startAutoTrigger();
    }

    initializeElements() {
        // User items
        this.userItems = {
            Emily: document.querySelector('.first'),
            Maria: document.getElementById('maria-item'),
            John: document.getElementById('john-item'),
            Alex: document.getElementById('alex-item'),
            Tada: document.getElementById('tada-item')
        };
        
        // Score elements
        this.scoreElements = {
            Emily: this.userItems.Emily.querySelector('.leaderboard-score'),
            Maria: this.userItems.Maria.querySelector('.leaderboard-score'),
            John: this.userItems.John.querySelector('.leaderboard-score'),
            Alex: this.userItems.Alex.querySelector('.leaderboard-score'),
            Tada: this.userItems.Tada.querySelector('.leaderboard-score')
        };
        
        // UI elements
        this.notification = document.getElementById('rankingNotification');
        this.speedIndicator = document.getElementById('speedIndicator');
        this.leaderboardList = document.querySelector('.leaderboard-list');
        this.progressTimer = document.getElementById('progressTimer');
        this.progressFill = document.getElementById('progressFill');
        this.timerText = document.querySelector('.timer-text');
        this.timerCountdown = document.getElementById('timerCountdown');
    }

    setupEventListeners() {
        // Keyboard controls
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
        
        // Button controls
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.triggerRankingChange();
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetRanking();
            });
        }
    }

    startAutoTrigger() {
        if (this.autoTriggerTimeout) {
            clearTimeout(this.autoTriggerTimeout);
        }
        
        this.autoTriggerTimeout = setTimeout(() => {
            if (!this.hasTriggered) {
                this.triggerRankingChange();
            }
        }, 2000);
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
        this.currentStage = 0;
        
        // Show progress timer and notification
        this.showProgressTimer();
        this.showNotification();
        
        // Execute all stages sequentially
        for (let stage = 1; stage < this.rankingStates.length; stage++) {
            const currentState = this.rankingStates[stage];
            const previousState = this.rankingStates[stage - 1];
            
            // Wait for the time interval
            const waitTime = currentState.time - previousState.time;
            await this.delay(waitTime);
            
            // Update progress
            const progress = (stage / (this.rankingStates.length - 1)) * 100;
            this.updateProgressTimer(currentState.message, progress);
            
            // Execute the transition to this state
            await this.transitionToState(currentState, stage);
        }
        
        // Complete animation
        this.updateProgressTimer('Animation Complete!', 100);
        await this.delay(1000);
        this.hideProgressTimer();
        
        this.isAnimating = false;
    }
    
    async transitionToState(targetState, stageIndex) {
        // Animate score changes
        const animationPromises = [];
        
        targetState.rankings.forEach(user => {
            const scoreElement = this.scoreElements[user.name];
            if (scoreElement) {
                const currentScore = parseInt(scoreElement.textContent);
                if (currentScore !== user.score) {
                    animationPromises.push(
                        this.animateScoreChange(scoreElement, currentScore, user.score, user.name === 'Tada')
                    );
                }
            }
        });
        
        // Wait for score animations to complete
        await Promise.all(animationPromises);
        
        // Reorder DOM elements based on new rankings
        await this.reorderElements(targetState.rankings);
        
        // Update visual styling
        this.updateRankStyling(targetState.rankings);
        
        // Highlight Tada's movement
        if (stageIndex > 0) {
            this.userItems.Tada.classList.add('highlight');
            await this.delay(800);
            this.userItems.Tada.classList.remove('highlight');
        }
    }

    async animateScoreChange(scoreElement, fromScore, toScore, isTada = false) {
        const duration = 1500 / this.speedMultiplier;
        const steps = 30;
        const increment = (toScore - fromScore) / steps;
        
        if (isTada) {
            scoreElement.classList.add('updating');
        }
        
        for (let i = 0; i <= steps; i++) {
            const currentScore = Math.round(fromScore + (increment * i));
            scoreElement.textContent = currentScore + '%';
            await this.delay(duration / steps);
        }
        
        if (isTada) {
            setTimeout(() => {
                scoreElement.classList.remove('updating');
            }, 200);
        }
    }

    async reorderElements(rankings) {
        // Clear the leaderboard list
        const parent = this.leaderboardList;
        
        // Sort rankings by rank
        const sortedRankings = [...rankings].sort((a, b) => a.rank - b.rank);
        
        // Reorder DOM elements
        sortedRankings.forEach(user => {
            const userItem = this.userItems[user.name];
            if (userItem) {
                parent.appendChild(userItem);
            }
        });
        
        await this.delay(300);
    }

    updateRankStyling(rankings) {
        rankings.forEach(user => {
            const userItem = this.userItems[user.name];
            if (!userItem) return;
            
            const rankIcon = userItem.querySelector('.rank-icon');
            const userName = userItem.querySelector('.leaderboard-name');
            const userScore = userItem.querySelector('.leaderboard-score');
            
            // Clear existing classes
            userItem.className = 'leaderboard-item';
            if (user.name === 'Tada') {
                userItem.classList.add('you');
            }
            
            // Set rank-specific styling
            switch(user.rank) {
                case 1:
                    userItem.classList.add('first');
                    rankIcon.textContent = '🥇';
                    userName.style.color = '#fbbf24';
                    userScore.style.color = '#fbbf24';
                    break;
                case 2:
                    userItem.classList.add('second');
                    rankIcon.textContent = '🥈';
                    userName.style.color = '#38bdf8';
                    userScore.style.color = '#38bdf8';
                    break;
                case 3:
                    userItem.classList.add('third');
                    rankIcon.textContent = '🥉';
                    userName.style.color = '#22d3ee';
                    userScore.style.color = '#22d3ee';
                    break;
                default:
                    rankIcon.textContent = user.rank.toString();
                    if (user.name === 'Tada') {
                        userName.style.color = '#60a5fa';
                        userScore.style.color = '#60a5fa';
                    } else {
                        userName.style.color = '#22d3ee';
                        userScore.style.color = '#4ade80';
                    }
                    break;
            }
        });
    }

    showProgressTimer() {
        if (!this.progressTimer) return;
        
        this.progressTimer.style.display = 'block';
        this.updateProgressTimer('Starting progressive ranking climb...', 0);
    }
    
    updateProgressTimer(text, progress) {
        if (this.timerText) this.timerText.textContent = text;
        if (this.progressFill) this.progressFill.style.width = `${progress}%`;
        if (this.timerCountdown) {
            const totalTime = this.rankingStates[this.rankingStates.length - 1].time;
            const elapsed = (progress / 100) * totalTime;
            const remaining = Math.max(0, Math.ceil((totalTime - elapsed) / 1000));
            this.timerCountdown.textContent = `${remaining}s`;
        }
    }
    
    hideProgressTimer() {
        setTimeout(() => {
            if (this.progressTimer) {
                this.progressTimer.style.display = 'none';
            }
        }, 1000);
    }

    resetRanking() {
        if (this.isAnimating) return;
        
        // Reset to initial state
        const initialState = this.rankingStates[0];
        
        // Reset scores
        initialState.rankings.forEach(user => {
            const scoreElement = this.scoreElements[user.name];
            if (scoreElement) {
                scoreElement.textContent = user.score + '%';
                scoreElement.classList.remove('updating');
            }
        });
        
        // Clear animation classes
        Object.values(this.userItems).forEach(item => {
            if (item) {
                item.classList.remove('highlight', 'moving');
                item.style.transform = '';
            }
        });
        
        // Reorder elements to initial state
        this.reorderElements(initialState.rankings);
        
        // Update styling to initial state
        this.updateRankStyling(initialState.rankings);
        
        // Reset animation state
        this.currentStage = 0;
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
