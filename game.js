document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the game setup data from localStorage
    const gameSetup = JSON.parse(localStorage.getItem("gameSetup"));
    
    if (!gameSetup) {
        // If no setup data, redirect back to setup page
        window.location.href = "setup.html";
        return;
    }

    // Destructure the game setup data
    const { players, numPlayers } = gameSetup;

    // Initialize variables for game progress
    let currentPlayerIndex = 0;
    let imposterIndex = Math.floor(Math.random() * numPlayers);  // Randomly select the imposter
    let isRevealed = false;

    // Create player cards and append them to the container
    const playerCardsContainer = document.getElementById("playerCardsContainer");
    playerCardsContainer.innerHTML = "";  // Clear any existing content

    players.forEach((player, index) => {
        const card = document.createElement("div");
        card.classList.add("player-card");
        card.setAttribute("data-index", index);
        card.innerHTML = `
            <p class="player-name">${player}</p>
            <p class="card-status">Tap to reveal</p>
        `;
        playerCardsContainer.appendChild(card);
    });

    // Handle card click event (reveal role)
    const cards = document.querySelectorAll(".player-card");
    cards.forEach(card => {
        card.addEventListener("click", function() {
            const playerIndex = parseInt(card.getAttribute("data-index"));
            const cardStatus = card.querySelector(".card-status");

            // If it's already revealed, prevent further changes
            if (cardStatus.textContent !== "Tap to reveal") return;

            // Reveal the player's role
            if (playerIndex === imposterIndex) {
                cardStatus.textContent = "You are the imposter, figure out what the word is.";
                cardStatus.style.color = "#FF6F61";  // Imposter text in red
            } else {
                cardStatus.textContent = "You are not the imposter.";
                cardStatus.style.color = "#28A745";  // Regular player text in green
            }

            isRevealed = true;  // Ensure card is revealed only once

            // Show the "Confirm" button to move to the next player
            const nextButton = document.getElementById("nextButton");
            nextButton.style.display = "inline-block"; // Show the next button
        });
    });

    // Handle the "Confirm" button to move to the next player
    document.getElementById("nextButton").addEventListener("click", function() {
        if (currentPlayerIndex < numPlayers - 1) {
            // Move to the next player
            currentPlayerIndex++;
            isRevealed = false;  // Reset reveal state for the next player

            // Reset the game view for the next player
            cards.forEach(card => {
                card.querySelector(".card-status").textContent = "Tap to reveal";
                card.querySelector(".card-status").style.color = "#666";  // Reset text color
            });

            // Hide the "Confirm" button until the next player is tapped
            this.style.display = "none";
        } else {
            // End of game, can transition to the next phase
            alert("All roles have been assigned!");
            // Optionally, redirect or start the game phase
        }
    });
});

function assignRoles(players) {
    const randomImposterIndex = Math.floor(Math.random() * players.length); // Randomly select an imposter
    const playerCardsContainer = document.getElementById('playerCardsContainer');
    
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('player-card');
        
        // Add 'imposter' class if the player is the imposter
        if (index === randomImposterIndex) {
            card.classList.add('imposter');
            card.innerHTML = `<div class="player-name">${player.name}</div>
                              <div class="card-status">Tap to reveal your role.</div>`;
        } else {
            card.innerHTML = `<div class="player-name">${player.name}</div>
                              <div class="card-status">Tap to reveal your role.</div>`;
        }

        // Restrict players from seeing their own role and hide the role until card is clicked
        card.addEventListener('click', () => {
            const status = card.querySelector('.card-status');
            
            // Prevent players from seeing their own role before they click the card
            if (index === randomImposterIndex) {
                status.textContent = "You are the imposter, figure out what the word is.";
            } else {
                status.textContent = "You are not the imposter.";
            }
            card.classList.add('revealed'); // Add a class indicating that the card has been revealed

            // Disable further clicks after revealing
            card.style.pointerEvents = "none";
        });
        
        playerCardsContainer.appendChild(card);
    });
}
