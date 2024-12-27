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

    // Predefined list of words (we'll just use "Lebron James" for now)
    const predefinedWords = ["Lebron James"];
    let wordList = predefinedWords.slice();  // Start with predefined words

    // Check if custom words are enabled and add them to the word list
    const customWordsOnly = gameSetup.customWordsOnly || false; // Add this from the game setup
    if (!customWordsOnly) {
        // Add custom words if not only using custom words
        const customWords = gameSetup.customWords || []; // Assume custom words come from setup
        wordList = wordList.concat(customWords);
    }

    // Select one random word to be assigned to all non-imposter players
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

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
            <p class="card-word" style="display:none;">Word: ${randomWord}</p> <!-- Hidden word initially -->
        `;
        playerCardsContainer.appendChild(card);
    });

    // Handle card click event (reveal role)
    const cards = document.querySelectorAll(".player-card");
    cards.forEach(card => {
        card.addEventListener("click", function() {
            const playerIndex = parseInt(card.getAttribute("data-index"));
            const cardStatus = card.querySelector(".card-status");
            const cardWord = card.querySelector(".card-word"); // Get the hidden word element

            // If it's already revealed, prevent further changes
            if (cardStatus.textContent !== "Tap to reveal") return;

            // Reveal the player's role first
            if (playerIndex === imposterIndex) {
                cardStatus.textContent = "You are the imposter, figure out what the word is.";
                cardStatus.style.color = "#FF6F61";  // Imposter text in red
                // Imposter should not see a word
                cardWord.style.display = "none"; // Hide word for imposter
            } else {
                cardStatus.textContent = "You are not the imposter.";
                cardStatus.style.color = "#28A745";  // Regular player text in green
                // Only show the word for regular players
                cardWord.style.display = "block";  // Make the word visible
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
                card.querySelector(".card-word").style.display = "none"; // Hide word again
            });

            // Hide the "Confirm" button until the next player is tapped
            this.style.display = "none";
        } else {
            window.location.href = "round.html";
        }
    });
});
