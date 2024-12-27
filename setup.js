document.addEventListener("DOMContentLoaded", function() {
    const playersInput = document.getElementById("players");
    const playerNamesContainer = document.getElementById("playerNamesContainer");
    const startButton = document.querySelector("button");
    const form = document.getElementById("setupForm");
    const customWordsInput = document.getElementById("customWords");
    const customWordsOnlyCheckbox = document.getElementById("customWordsOnly");
    const roundsInput = document.getElementById("rounds");

    // Function to generate player name input fields
    function generatePlayerInputs() {
        playerNamesContainer.innerHTML = "";
        const numPlayers = parseInt(playersInput.value);
        
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
            startButton.disabled = false;
        } else {
            startButton.disabled = true;
        }
    }

    // Generate player input fields when the number of players changes
    playersInput.addEventListener("input", generatePlayerInputs);

    // Store game setup when the form is submitted
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get values from the form
        const numPlayers = parseInt(playersInput.value);
        const playerNames = [];
        for (let i = 1; i <= numPlayers; i++) {
            playerNames.push(document.getElementById(`player${i}`).value);
        }

        const customWords = customWordsInput.value.trim().split(',').map(word => word.trim()).filter(word => word !== "");
        const useCustomWordsOnly = customWordsOnlyCheckbox.checked;
        const numRounds = parseInt(roundsInput.value);

        // Save data to localStorage
        localStorage.setItem("gameSetup", JSON.stringify({
            players: playerNames,
            numPlayers: numPlayers,
            customWords: customWords,
            useCustomWordsOnly: useCustomWordsOnly,
            numRounds: numRounds
        }));

        // Redirect to the game page
        window.location.href = "game.html";
    });
});
