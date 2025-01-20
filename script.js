// Funkcja rozpoczynająca grę
function startGame() {
    const player1Name = document.getElementById("player1").value.trim();
    const player2Name = document.getElementById("player2").value.trim();
    const player3Name = document.getElementById("player3").value.trim();

    if (!player1Name || !player2Name || !player3Name) {
        alert("Wpisz imiona wszystkich graczy, aby rozpocząć grę!");
        return;
    }

    document.getElementById("playerName1").textContent = player1Name;
    document.getElementById("playerName2").textContent = player2Name;
    document.getElementById("playerName3").textContent = player3Name;

    document.getElementById("setupForm").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");
}

// Funkcja dodająca punkty
function addPoints(playerIndex) {
    const pointsInputId = `pointsInput${playerIndex + 1}`;
    const pointsInput = document.getElementById(pointsInputId);
    const scoreTable = document.getElementById("scoreTable");
    const message = document.getElementById("message");

    const pointsToAdd = parseInt(pointsInput.value);
    if (isNaN(pointsToAdd)) {
        message.textContent = "Wpisz poprawną liczbę punktów!";
        return;
    }

    // Pobieranie aktualnych punktów
    const cell = scoreTable.rows[1].cells[playerIndex];
    const currentPoints = parseInt(cell.textContent);
    const newPoints = currentPoints + pointsToAdd;

    // Aktualizacja punktów
    cell.textContent = newPoints;

    // Zmiana koloru na czerwony, jeśli punkty są ujemne
    if (newPoints < 0) {
        cell.classList.add("negative");
    } else {
        cell.classList.remove("negative");
    }

    pointsInput.value = ""; // Reset pola
    message.textContent = "Punkty zostały zaktualizowane!";
}
