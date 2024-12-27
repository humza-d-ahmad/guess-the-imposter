document.addEventListener("DOMContentLoaded", function() {
    const playersInput = document.getElementById("players");
    const playerNamesContainer = document.getElementById("playerNamesContainer");
    const startButton = document.querySelector("button.start");
    const form = document.getElementById("setupForm");
    const customWordsInput = document.getElementById("customWords");
    const customWordsOnlyCheckbox = document.getElementById("customWordsOnly");

    // Function to generate player name input fields
    function generatePlayerInputs() {
        // Clear any previously generated player inputs
        playerNamesContainer.innerHTML = "";

        const numPlayers = parseInt(playersInput.value);

        // Only create input fields if the number is valid (3-12)
        if (numPlayers >= 3 && numPlayers <= 12) {
            for (let i = 1; i <= numPlayers; i++) {
                const div = document.createElement("div");
                div.classList.add("input-group");
                const label = document.createElement("label");
                label.setAttribute("for", `player${i}`);
                label.textContent = `Player ${i}:`;
                const input = document.createElement("input");
                input.type = "text";
                input.id = `player${i}`;
                input.name = `player${i}`;
                input.classList.add("player-name-input");
                input.placeholder = `Enter name for Player ${i}`;
                input.required = true;
                div.appendChild(label);
                div.appendChild(input);
                playerNamesContainer.appendChild(div);
            }

            // Enable the start button only if all player names are entered
            startButton.disabled = false;
        } else {
            // Disable the start button if the number of players is invalid
            startButton.disabled = true;
        }
    }

    // Function to validate and extract custom words
    function getCustomWords() {
        const customWords = customWordsInput.value.trim();
        if (customWords) {
            return customWords.split(',').map(word => word.trim()).filter(word => word !== "");
        }
        return [];
    }

    // Event listener to generate player inputs on number change
    playersInput.addEventListener("input", function() {
        generatePlayerInputs();
    });

    // Event listener for form submission (optional, prevent default for now)
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the number of players
        const numPlayers = parseInt(playersInput.value);

        // Get player names
        let playerNames = [];
        for (let i = 1; i <= numPlayers; i++) {
            playerNames.push(document.getElementById(`player${i}`).value);
        }

        // Get custom words
        const customWords = getCustomWords();

        // Determine if custom words should be used
        const useCustomWordsOnly = customWordsOnlyCheckbox.checked;

        // Handle the game setup (this is just a placeholder logic for now)
        alert(`Game Setup:\nPlayers: ${playerNames.join(', ')}\nCustom Words: ${customWords.join(', ')}\nUse Custom Words Only: ${useCustomWordsOnly}`);
    });

    // Optional: Prevent form submission for now (no functionality yet)
    startButton.disabled = true;
});
