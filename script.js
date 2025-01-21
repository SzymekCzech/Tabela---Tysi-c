let currentRound = 1; // Numer rundy
const scores = [0, 0, 0]; // Punkty dla każdego gracza
let roundHistory = []; // Historia rund (do cofania)

function startGame() {
    const player1Name = document.getElementById("player1").value.trim();
    const player2Name = document.getElementById("player2").value.trim();
    const player3Name = document.getElementById("player3").value.trim();

    // Sprawdzanie, czy pola są wypełnione
    if (!player1Name || !player2Name || !player3Name) {
        alert("Wpisz imiona wszystkich graczy, aby rozpocząć grę!");
        return;
    }

    // Ustawianie nazw graczy w tabeli
    document.getElementById("playerName1").textContent = player1Name;
    document.getElementById("playerName2").textContent = player2Name;
    document.getElementById("playerName3").textContent = player3Name;

    // Ukrywanie formularza i pokazywanie sekcji gry
    document.getElementById("setupForm").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");
}

function addNewRoundRow() {
    const pointsTableBody = document.getElementById("pointsTableBody");

    // Tworzenie nowego wiersza dla rundy
    const newRow = document.createElement("tr");

    // Dodawanie numeru rundy
    const roundCell = document.createElement("td");
    roundCell.textContent = currentRound;
    newRow.appendChild(roundCell);

    // Dodawanie punktów każdego gracza
    [scores[0], scores[1], scores[2]].forEach(score => {
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;

        // Jeśli punkty są ujemne, dodaj klasę "negative"
        if (score < 0) {
            scoreCell.classList.add("negative");
        }

        newRow.appendChild(scoreCell);
    });

    pointsTableBody.appendChild(newRow);
    roundHistory.push([...scores]); // Zapisz bieżący stan punktów
}

function addPoints() {
    const pointsInput1 = parseInt(document.getElementById("pointsInput1").value) || 0;
    const pointsInput2 = parseInt(document.getElementById("pointsInput2").value) || 0;
    const pointsInput3 = parseInt(document.getElementById("pointsInput3").value) || 0;

    // Aktualizowanie wyników graczy
    scores[0] += pointsInput1;
    scores[1] += pointsInput2;
    scores[2] += pointsInput3;

    addNewRoundRow(); // Dodanie nowego wiersza do tabeli
    currentRound++; // Zwiększenie numeru rundy

    // Czyszczenie pól do wpisywania punktów
    document.getElementById("pointsInput1").value = "";
    document.getElementById("pointsInput2").value = "";
    document.getElementById("pointsInput3").value = "";
}

function undoRound() {
    const pointsTableBody = document.getElementById("pointsTableBody");

    if (roundHistory.length === 0) {
        alert("Nie ma żadnych rund do cofnięcia!");
        return;
    }

    // Przywracanie punktów do poprzedniego stanu
    scores[0] = roundHistory[roundHistory.length - 1][0];
    scores[1] = roundHistory[roundHistory.length - 1][1];
    scores[2] = roundHistory[roundHistory.length - 1][2];

    // Usunięcie ostatniego wiersza tabeli i historii
    pointsTableBody.deleteRow(pointsTableBody.rows.length - 1);
    roundHistory.pop();
    currentRound--;
}
