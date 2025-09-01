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

// Initialize feather icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
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
