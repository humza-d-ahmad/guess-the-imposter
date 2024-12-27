document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the total rounds from localStorage
    let totalRounds = localStorage.getItem('totalRounds');
    
    // If no value is found, default to 10
    if (!totalRounds) {
        totalRounds = 10;
    }
    let currentRound = 1;   // Start at round 1

    // Set up the display for total rounds and current round
    document.getElementById("totalRounds").textContent = totalRounds;
    document.getElementById("currentRound").textContent = currentRound;

    // Increment and decrement round controls
    const incrementRoundButton = document.getElementById("incrementRound");
    const decrementRoundButton = document.getElementById("decrementRound");

    incrementRoundButton.addEventListener("click", function() {
        if (currentRound < totalRounds) {
            currentRound++;
            document.getElementById("currentRound").textContent = currentRound;
        }
    });

    decrementRoundButton.addEventListener("click", function() {
        if (currentRound > 1) {
            currentRound--;
            document.getElementById("currentRound").textContent = currentRound;
        }
    });

    // Handle "Restart Game" button
    document.getElementById("restartButton").addEventListener("click", function() {
        window.location.href = "game.html";  // Redirect back to the game page
    });

    // Handle "Return to Settings" button
    document.getElementById("returnToSettingsButton").addEventListener("click", function() {
        window.location.href = "setup.html";  // Redirect back to the setup page
    });
});
