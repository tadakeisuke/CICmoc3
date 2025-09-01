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
        this.currentStage = 0;
        this.stageStartTime = Date.now();
        
        // Show progress timer
        this.showProgressTimer();
        
        // Show notification
        this.showNotification();
        
        // Start the progressive animation
        await this.runProgressiveAnimation();
        
        // Hide progress timer
        this.hideProgressTimer();
        
        this.isAnimating = false;
    }
    
    async runProgressiveAnimation() {
        for (let stage = 0; stage < this.animationStages.length; stage++) {
            this.currentStage = stage;
            const stageData = this.animationStages[stage];
            
            // Update progress timer message
            this.updateProgressTimer(stageData.message, (stage / this.animationStages.length) * 100);
            
            // Wait for the stage timing
            if (stage > 0) {
                const waitTime = this.animationStages[stage].time - this.animationStages[stage - 1].time;
                await this.delay(waitTime);
            } else {
                await this.delay(stageData.time);
            }
            
            // Execute stage animation
            await this.executeStage(stageData);
        }
        
        // Complete final stage
        this.updateProgressTimer('Animation Complete!', 100);
        await this.delay(500);
    }
    
    async executeStage(stageData) {
        // Animate score change for Tada
        await this.animateScoreChange(this.currentScores.tada, stageData.tadaScore);
        this.currentScores.tada = stageData.tadaScore;
        
        // Adjust other users' scores to maintain ranking consistency
        this.adjustOtherScores(stageData.tadaScore, stageData.targetRank);
        
        // Animate position changes if needed
        await this.animatePositionChanges(stageData.targetRank);
        
        // Add highlight effect
        this.tadaItem.classList.add('highlight');
        await this.delay(800);
        this.tadaItem.classList.remove('highlight');
    }
    
    adjustOtherScores(tadaScore, tadaRank) {
        // Ensure ranking consistency by adjusting other users' scores
        const allUsers = [
            { name: 'emily', score: this.currentScores.emily, element: this.emilyScore, rank: 1 },
            { name: 'maria', score: this.currentScores.maria, element: this.mariaScore, rank: 2 },
            { name: 'john', score: this.currentScores.john, element: this.johnScore, rank: 3 },
            { name: 'alex', score: this.currentScores.alex, element: this.alexScore, rank: 4 },
            { name: 'tada', score: tadaScore, element: this.tadaScore, rank: tadaRank }
        ];
        
        // Sort by target rank
        allUsers.sort((a, b) => a.rank - b.rank);
        
        // Adjust scores to ensure consistency
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i];
            const nextUser = allUsers[i + 1];
            
            if (nextUser && user.score <= nextUser.score) {
                // Current user's score should be higher than next user
                if (user.name === 'tada') {
                    // If Tada is the one climbing, keep his score and adjust others down
                    if (nextUser.name !== 'tada') {
                        const newScore = Math.max(user.score - (2 + Math.floor(Math.random() * 3)), 50);
                        this.currentScores[nextUser.name] = newScore;
                        this.animateScoreUpdate(nextUser.element, nextUser.score, newScore);
                    }
                } else if (nextUser.name === 'tada') {
                    // If Tada is overtaking this user, adjust this user's score down slightly
                    const newScore = Math.max(tadaScore - (1 + Math.floor(Math.random() * 2)), 50);
                    this.currentScores[user.name] = newScore;
                    this.animateScoreUpdate(user.element, user.score, newScore);
                }
            }
        }
    }
    
    async animateScoreUpdate(scoreElement, fromScore, toScore) {
        if (fromScore === toScore) return;
        
        const duration = 1000;
        const steps = 20;
        const increment = (toScore - fromScore) / steps;
        
        for (let i = 0; i <= steps; i++) {
            const currentScore = Math.round(fromScore + (increment * i));
            scoreElement.textContent = currentScore + '%';
            await this.delay(duration / steps);
        }
    }    showProgressTimer() {
        if (!this.progressTimer) return;
        
        this.progressTimer.style.display = 'block';
        this.updateProgressTimer('Starting progressive ranking climb...', 0);
    }
    
    updateProgressTimer(text, progress) {
        if (this.timerText) this.timerText.textContent = text;
        if (this.progressFill) this.progressFill.style.width = `${progress}%`;
        if (this.timerCountdown) {
            const totalTime = this.animationStages[this.animationStages.length - 1].time;
            const elapsed = (progress / 100) * totalTime;
            const remaining = Math.max(0, Math.ceil((totalTime - elapsed) / 1000));
            this.timerCountdown.textContent = `${remaining}s`;
        }
    }
    
    getStageText(progress) {
        if (progress < 33) return 'Climbing to 4th place...';
        if (progress < 66) return 'Rising to 3rd place...';
        return 'Breaking into 2nd place...';
    }
    
    hideProgressTimer() {
        setTimeout(() => {
            if (this.progressTimer) {
                this.progressTimer.style.display = 'none';
            }
        }, 1000);
    }
    
    async animateScoreChange(fromScore, toScore) {
        const scoreElement = this.tadaScore;
        const duration = 1500 / this.speedMultiplier;
        const steps = 30;
        const increment = (toScore - fromScore) / steps;
        
        scoreElement.classList.add('updating');
        
        for (let i = 0; i <= steps; i++) {
            const currentScore = Math.round(fromScore + (increment * i));
            scoreElement.textContent = currentScore + '%';
            await this.delay(duration / steps);
        }
        
        setTimeout(() => {
            scoreElement.classList.remove('updating');
        }, 200);
    }
    
    async animatePositionChanges(targetRank) {
        const items = [
            { element: this.emilyItem, currentRank: 1 },
            { element: this.mariaItem, currentRank: 2 },
            { element: this.johnItem, currentRank: 3 },
            { element: this.alexItem, currentRank: 4 },
            { element: this.tadaItem, currentRank: 5 }
        ];
        
        // Find Tada's current position
        let tadaCurrentPos = 4; // 5th position (0-indexed)
        
        if (targetRank === 4) tadaCurrentPos = 3; // Move to 4th
        else if (targetRank === 3) tadaCurrentPos = 2; // Move to 3rd
        else if (targetRank === 2) tadaCurrentPos = 1; // Move to 2nd
        
        // Perform DOM reordering
        const parent = this.tadaItem.parentNode;
        const children = Array.from(parent.children);
        
        // Remove Tada from current position
        parent.removeChild(this.tadaItem);
        
        // Insert Tada at new position
        if (targetRank === 2) {
            parent.insertBefore(this.tadaItem, this.mariaItem);
        } else if (targetRank === 3) {
            parent.insertBefore(this.tadaItem, this.johnItem);
        } else if (targetRank === 4) {
            parent.insertBefore(this.tadaItem, this.alexItem);
        }
        
        // Update rank icons and styling
        this.updateRankDisplay(targetRank);
        
        await this.delay(500);
    }
    
    updateRankDisplay(tadaRank) {
        // Update Tada's rank
        const tadaRankIcon = this.tadaItem.querySelector('.rank-icon');
        const tadaName = this.tadaItem.querySelector('.leaderboard-name');
        const tadaScoreEl = this.tadaItem.querySelector('.leaderboard-score');
        
        this.tadaItem.className = 'leaderboard-item you';
        
        if (tadaRank === 2) {
            this.tadaItem.classList.add('second');
            tadaRankIcon.textContent = '🥈';
            tadaName.style.color = '#38bdf8';
            tadaScoreEl.style.color = '#38bdf8';
        } else if (tadaRank === 3) {
            this.tadaItem.classList.add('third');
            tadaRankIcon.textContent = '🥉';
            tadaName.style.color = '#22d3ee';
            tadaScoreEl.style.color = '#22d3ee';
        } else if (tadaRank === 4) {
            tadaRankIcon.textContent = '4';
            tadaName.style.color = '#22d3ee';
            tadaScoreEl.style.color = '#22d3ee';
        }
        
        // Update other users' ranks accordingly
        this.updateOtherRanks(tadaRank);
    }
    
    updateOtherRanks(tadaRank) {
        // Reset all rank classes and update accordingly
        const items = [this.emilyItem, this.mariaItem, this.johnItem, this.alexItem];
        const ranks = [1, 2, 3, 4, 5];
        
        // Remove Tada's rank from available ranks
        ranks.splice(tadaRank - 1, 1);
        
        items.forEach((item, index) => {
            const rankIcon = item.querySelector('.rank-icon');
            const name = item.querySelector('.leaderboard-name');
            const score = item.querySelector('.leaderboard-score');
            const newRank = ranks[index];
            
            // Clear existing rank classes
            item.classList.remove('second', 'third');
            
            if (newRank === 1) {
                item.classList.add('first');
                rankIcon.textContent = '🥇';
                name.style.color = '#fbbf24';
                score.style.color = '#fbbf24';
            } else if (newRank === 2) {
                item.classList.add('second');
                rankIcon.textContent = '🥈';
                name.style.color = '#38bdf8';
                score.style.color = '#38bdf8';
            } else if (newRank === 3) {
                item.classList.add('third');
                rankIcon.textContent = '🥉';
                name.style.color = '#22d3ee';
                score.style.color = '#22d3ee';
            } else {
                rankIcon.textContent = newRank.toString();
                name.style.color = '#22d3ee';
                score.style.color = '#22d3ee';
            }
        });
    }
    
    resetRanking() {
        if (this.isAnimating) return;
        
        // Reset all scores to initial values
        this.currentScores = { ...this.initialScores };
        
        // Clear any ongoing animations
        this.tadaItem.style.transform = '';
        this.mariaItem.style.transform = '';
        this.johnItem.style.transform = '';
        this.alexItem.style.transform = '';
        
        // Clear animation classes
        [this.tadaItem, this.mariaItem, this.johnItem, this.alexItem].forEach(item => {
            item.classList.remove('highlight', 'moving', 'second', 'third');
        });
        
        // Reset scores in DOM
        this.tadaScore.textContent = '64%';
        this.mariaScore.textContent = '92%';
        this.johnScore.textContent = '83%';
        this.alexScore.textContent = '81%';
        this.emilyScore.textContent = '99%';
        
        // Reset score classes
        [this.tadaScore, this.mariaScore, this.johnScore, this.alexScore, this.emilyScore].forEach(score => {
            score.classList.remove('updating');
        });
        
        // Restore original DOM order: Emily, Maria, John, Alex, Tada
        const parent = this.tadaItem.parentNode;
        parent.innerHTML = ''; // Clear all items
        
        // Re-append in correct order
        parent.appendChild(this.emilyItem);
        parent.appendChild(this.mariaItem);
        parent.appendChild(this.johnItem);
        parent.appendChild(this.alexItem);
        parent.appendChild(this.tadaItem);
        
        // Reset rank icons and colors
        this.resetRankStyles();
        
        // Reset animation state
        this.currentStage = 0;
        this.hasTriggered = false;
        this.startAutoTrigger();
    }
    
    resetRankStyles() {
        // Emily (1st)
        this.emilyItem.className = 'leaderboard-item first';
        this.emilyItem.querySelector('.rank-icon').textContent = '🥇';
        this.emilyItem.querySelector('.leaderboard-name').style.color = '#fbbf24';
        this.emilyItem.querySelector('.leaderboard-score').style.color = '#fbbf24';
        
        // Maria (2nd)
        this.mariaItem.className = 'leaderboard-item second';
        this.mariaItem.querySelector('.rank-icon').textContent = '🥈';
        this.mariaItem.querySelector('.leaderboard-name').style.color = '#38bdf8';
        this.mariaItem.querySelector('.leaderboard-score').style.color = '#38bdf8';
        
        // John (3rd)
        this.johnItem.className = 'leaderboard-item';
        this.johnItem.querySelector('.rank-icon').textContent = '3';
        this.johnItem.querySelector('.leaderboard-name').style.color = '#22d3ee';
        this.johnItem.querySelector('.leaderboard-score').style.color = '#4ade80';
        
        // Alex (4th)
        this.alexItem.className = 'leaderboard-item';
        this.alexItem.querySelector('.rank-icon').textContent = '4';
        this.alexItem.querySelector('.leaderboard-name').style.color = '#22d3ee';
        this.alexItem.querySelector('.leaderboard-score').style.color = '#4ade80';
        
        // Tada (5th - YOU)
        this.tadaItem.className = 'leaderboard-item you';
        this.tadaItem.querySelector('.rank-icon').textContent = '5';
        this.tadaItem.querySelector('.leaderboard-name').style.color = '#60a5fa';
        this.tadaItem.querySelector('.leaderboard-score').style.color = '#60a5fa';
    }    togglePause() {
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