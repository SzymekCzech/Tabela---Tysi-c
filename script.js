let currentRound = 1; // Zmienna śledząca aktualną rundę
const scores = [0, 0, 0]; // Tablica przechowująca sumaryczne punkty graczy
let roundHistory = []; // Tablica do przechowywania historii rund (do cofania)

function startGame() {
    // Pobieranie imion graczy
    const player1Name = document.getElementById("player1").value.trim();
    const player2Name = document.getElementById("player2").value.trim();
    const player3Name = document.getElementById("player3").value.trim();

    // Sprawdzanie, czy wszystkie pola są wypełnione
    if (!player1Name || !player2Name || !player3Name) {
        alert("Wpisz imiona wszystkich graczy, aby rozpocząć grę!");
        return;
    }

    // Ustawianie nazw graczy w tabeli
    document.getElementById("playerName1").textContent = player1Name;
    document.getElementById("playerName2").textContent = player2Name;
    document.getElementById("playerName3").textContent = player3Name;

    // Ukrywanie formularza ustawień i wyświetlanie sekcji gry
    document.getElementById("setupForm").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");

    // Resetowanie tabeli z wynikami (usuwanie poprzednich rund)
    const pointsTableBody = document.getElementById("pointsTableBody");
    pointsTableBody.innerHTML = `<tr>
        <td>+</td>
        <td><input type="number" id="pointsInput1" /></td>
        <td><input type="number" id="pointsInput2" /></td>
        <td><input type="number" id="pointsInput3" /></td>
    </tr>`;
}

// Funkcja dodająca nowy wiersz z wynikami rundy
function addNewRoundRow() {
    const pointsTableBody = document.getElementById("pointsTableBody");

    // Utworzenie nowego wiersza
    const newRow = document.createElement("tr");

    // Kolumna numeru rundy
    const roundCell = document.createElement("td");
    roundCell.textContent = currentRound;  // Numer rundy
    newRow.appendChild(roundCell);

    // Kolumny wyników graczy
    [scores[0], scores[1], scores[2]].forEach(score => {
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;

        // Zmiana koloru na czerwony, jeśli punkty są ujemne
        if (score < 0) {
            scoreCell.classList.add("negative");
        } else {
            scoreCell.classList.remove("negative");
        }

        newRow.appendChild(scoreCell);
    });

    pointsTableBody.appendChild(newRow);

    // Zapisywanie historii rund (punkty przed dodaniem nowych)
    roundHistory.push([...scores]);
}

// Funkcja dodająca punkty
function addPoints() {
    const pointsInput1 = parseInt(document.getElementById("pointsInput1").value) || 0;
    const pointsInput2 = parseInt(document.getElementById("pointsInput2").value) || 0;
    const pointsInput3 = parseInt(document.getElementById("pointsInput3").value) || 0;

    // Aktualizacja punktów w tablicy
    scores[0] += pointsInput1;
    scores[1] += pointsInput2;
    scores[2] += pointsInput3;

    // Dodanie nowego wiersza z punktami dla rundy
    addNewRoundRow();
    
    // Zwiększenie numeru rundy po dodaniu punktów
    currentRound++;

    // Resetowanie pól
    document.getElementById("pointsInput1").value = "";
    document.getElementById("pointsInput2").value = "";
    document.getElementById("pointsInput3").value = "";
}

// Funkcja cofnij rundę (usuwa ostatnią rundę)
function undoRound() {
    if (roundHistory.length === 0) {
        alert("Nie ma żadnej rundy do cofnięcia.");
        return;
    }

    // Cofanie punktów
    scores[0] = roundHistory[roundHistory.length - 1][0];
    scores[1] = roundHistory[roundHistory.length - 1][1];
    scores[2] = roundHistory[roundHistory.length - 1][2];

    // Usuwanie ostatniego wiersza
    const pointsTableBody = document.getElementById("pointsTableBody");
    pointsTableBody.deleteRow(pointsTableBody.rows.length - 1);

    // Zmniejszanie numeru rundy
    currentRound--;

    // Usuwanie ostatniego stanu z historii
    roundHistory.pop();
}

