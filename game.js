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
    const predefinedWords = ["Lebron James","Batman","Paris","Einstein","Mount Everest","Mona Lisa","Sherlock Holmes","New York","Tesla","The Beatles","Great Wall of China",
"Superman","London","Mozart","Eiffel Tower","Harry Potter","Amazon Rainforest","Shakespeare","Colosseum","Elon Musk","Statue of Liberty",
"Da Vinci","Taj Mahal","Godzilla","Big Ben","Michael Jordan","Grand Canyon","Cleopatra","Sydney Opera House","Gandhi","Great Pyramid of Giza",
"Frida Kahlo","Cristiano Ronaldo","Himalayas","King Arthur","Steve Jobs","Hollywood","Marilyn Monroe","Burj Khalifa","Napoleon","Disneyland",
"Versailles","Alexander the Great","Tower of London","Coca-Cola","Julius Caesar","Machu Picchu","Van Gogh","Stonehenge","Madonna","Tolkien",
"Serena Williams","Mount Kilimanjaro","Usain Bolt","Bigfoot","Golden Gate Bridge","Walt Disney","Vatican City","Iron Man","Daenerys Targaryen","Sistine Chapel",
"Plato","Notre Dame","Thor","Hannibal","Pablo Picasso","Christ the Redeemer","Mozart","Liberty Bell","Hercules","Times Square",
"Star Wars","Picasso","The Colosseum","Dracula","The White House","Loch Ness Monster","Oprah Winfrey","Easter Island","Stephen Hawking","Pyramids of Egypt",
"Nikola Tesla","Mickey Mouse","The Leaning Tower of Pisa","Winston Churchill","Big Bang Theory","The Louvre","Robin Hood","Chichen Itza","Titanic","Edison",
"Mark Twain","The Amazon River","Cleopatra","Statue of Zeus","Socrates","Berlin Wall","The Sphinx","James Bond","Mount Rushmore","Nelson Mandela"];
    let wordList = [];

    // Check if custom words are enabled and add them to the word list
    const customWordsOnly = gameSetup.useCustomWordsOnly || false; // Add this from the game setup

    if (customWordsOnly) {
        // If only custom words are allowed, use the custom words only
        wordList = gameSetup.customWords || [];
    } else {
        // Add both predefined and custom words if not only using custom words
        const customWords = gameSetup.customWords || []; // Assume custom words come from setup
        wordList = predefinedWords.concat(customWords); // Merge the predefined and custom words
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
