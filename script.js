let currentRound = 1; // Numer rundy
const scores = [0, 0, 0]; // Punkty dla każdego gracza
const bombUsed = [false, false, false]; // Czy gracz użył bomby
let roundHistory = []; // Historia rund (do cofania)

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

function addNewRoundRow() {
    const pointsTableBody = document.getElementById("pointsTableBody");

    const newRow = document.createElement("tr");
    const roundCell = document.createElement("td");
    roundCell.textContent = currentRound;
    newRow.appendChild(roundCell);

    [scores[0], scores[1], scores[2]].forEach((score, index) => {
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;

        if (score < 0) scoreCell.classList.add("negative");
        if (bombUsed[index]) scoreCell.style.fontWeight = "bold";

        newRow.appendChild(scoreCell);
    });

    pointsTableBody.appendChild(newRow);
    roundHistory.push([...scores]);
}

function addPoints() {
    const pointsInput1 = parseInt(document.getElementById("pointsInput1").value) || 0;
    const pointsInput2 = parseInt(document.getElementById("pointsInput2").value) || 0;
    const pointsInput3 = parseInt(document.getElementById("pointsInput3").value) || 0;

    scores[0] += pointsInput1;
    scores[1] += pointsInput2;
    scores[2] += pointsInput3;

    addNewRoundRow();
    currentRound++;

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

    scores[0] = roundHistory[roundHistory.length - 1][0];
    scores[1] = roundHistory[roundHistory.length - 1][1];
    scores[2] = roundHistory[roundHistory.length - 1][2];

    pointsTableBody.deleteRow(pointsTableBody.rows.length - 1);
    roundHistory.pop();
    currentRound--;
}

function useBomb(playerIndex) {
    if (bombUsed[playerIndex]) {
        alert("Ten gracz już użył bomby!");
        return;
    }

    bombUsed[playerIndex] = true;
    const bombScores = [60, 60, 60];
    bombScores[playerIndex] = 0;

    scores[0] += bombScores[0];
    scores[1] += bombScores[1];
    scores[2] += bombScores[2];

    addNewRoundRow();
    currentRound++;
}

    roundHistory.pop();
    currentRound--;
}
