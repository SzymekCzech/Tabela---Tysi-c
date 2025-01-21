let currentRound = 1;
const scores = [0, 0, 0];
const totalPositiveScores = [0, 0, 0];
const bombUsed = [false, false, false];
let roundHistory = [];
let gameEnded = false;

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

    document.getElementById("totalPlayerName1").textContent = player1Name;
    document.getElementById("totalPlayerName2").textContent = player2Name;
    document.getElementById("totalPlayerName3").textContent = player3Name;

    document.getElementById("bombButton1").textContent = `Bomba ${player1Name}`;
    document.getElementById("bombButton2").textContent = `Bomba ${player2Name}`;
    document.getElementById("bombButton3").textContent = `Bomba ${player3Name}`;

    document.getElementById("setupForm").style.display = "none";
    document.getElementById("gameSection").style.display = "block";

    resetGame();
}

function resetGame() {
    const pointsTableBody = document.getElementById("pointsTableBody");
    pointsTableBody.innerHTML = `
        <tr>
            <td>+</td>
            <td><input type="number" id="pointsInput1" /></td>
            <td><input type="number" id="pointsInput2" /></td>
            <td><input type="number" id="pointsInput3" /></td>
        </tr>
    `;

    scores.fill(0);
    totalPositiveScores.fill(0);
    currentRound = 1;
    roundHistory = [];
    bombUsed.fill(false);
    gameEnded = false;

    updateTotalScores();
}

function addPoints() {
    if (gameEnded) return;

    const pointsInput1 = parseInt(document.getElementById("pointsInput1").value) || 0;
    const pointsInput2 = parseInt(document.getElementById("pointsInput2").value) || 0;
    const pointsInput3 = parseInt(document.getElementById("pointsInput3").value) || 0;

    const roundScores = [pointsInput1, pointsInput2, pointsInput3];
    roundScores.forEach((points, index) => {
        scores[index] += points;
        if (points > 0) totalPositiveScores[index] += points;
    });

    roundHistory.push({ round: currentRound, scores: [...roundScores], bombInfo: "" });

    addNewRoundRow();
    currentRound++;

    document.getElementById("pointsInput1").value = "";
    document.getElementById("pointsInput2").value = "";
    document.getElementById("pointsInput3").value = "";

    updateTotalScores();
    checkForWinner();
}

function addNewRoundRow(bombInfo = "") {
    const pointsTableBody = document.getElementById("pointsTableBody");

    const newRow = document.createElement("tr");
    const roundCell = document.createElement("td");
    roundCell.textContent = `${currentRound} ${bombInfo}`;
    newRow.appendChild(roundCell);

    scores.forEach((score, index) => {
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;
        if (score < 0) scoreCell.classList.add("negative");
        if (bombUsed[index]) scoreCell.style.fontWeight = "bold";
        newRow.appendChild(scoreCell);
    });

    pointsTableBody.insertBefore(newRow, pointsTableBody.lastElementChild);
}

function updateTotalScores() {
    totalPositiveScores.forEach((score, index) => {
        document.getElementById(`totalPoints${index + 1}`).textContent = score;
    });
}

function useBomb(playerIndex) {
    if (bombUsed[playerIndex]) {
        alert("Gracz już użył bomby!");
        return;
    }

    bombUsed[playerIndex] = true;
    const bombInfo = `BOMBA (${document.getElementById(`playerName${playerIndex + 1}`).textContent})`;

    scores.forEach((_, index) => {
        if (index !== playerIndex) {
            scores[index] += 60;
            totalPositiveScores[index] += 60;
        }
    });

    roundHistory.push({ round: currentRound, scores: [...scores], bombInfo });
    addNewRoundRow(bombInfo);
    currentRound++;

    updateTotalScores();
}

function undoRound() {
    if (roundHistory.length === 0 || gameEnded) return;

    const lastRound = roundHistory.pop();
    lastRound.scores.forEach((points, index) => {
        scores[index] -= points;
        if (points > 0) totalPositiveScores[index] -= points;
    });

    const pointsTableBody = document.getElementById("pointsTableBody");
    pointsTableBody.deleteRow(pointsTableBody.rows.length - 2); // Usuń ostatni dodany wiersz
    currentRound--;

    updateTotalScores();
}

function checkForWinner() {
    const winnerIndex = scores.findIndex(score => score >= 1000);
    if (winnerIndex !== -1) {
        const playerName = document.getElementById(`playerName${winnerIndex + 1}`).textContent;
        alert(`Gratulacje! ${playerName} wygrał grę z wynikiem ${scores[winnerIndex]} punktów!`);
        gameEnded = true;
    }
}



