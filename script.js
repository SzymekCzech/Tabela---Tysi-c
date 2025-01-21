let currentRound = 1; 
const scores = [0, 0, 0]; 
const bombUsed = [false, false, false];
let roundHistory = [];
let gameEnded = false;
let bonusEnabled = [false, false, false];

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

    document.getElementById("bombButton1").textContent = `Bomba ${player1Name}`;
    document.getElementById("bombButton2").textContent = `Bomba ${player2Name}`;
    document.getElementById("bombButton3").textContent = `Bomba ${player3Name}`;

    document.getElementById("setupForm").style.display = "none";
    document.getElementById("gameSection").style.display = "block";

    resetTable();
    updateTotalScores();
}

function resetTable() {
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
    currentRound = 1;
    roundHistory = [];
    bombUsed.fill(false);
    gameEnded = false;
    bonusEnabled.fill(false);
}

function addPoints() {
    if (gameEnded) return;

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

    updateTotalScores();
    checkForBonusGame();
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
        if (bonusEnabled[index]) scoreCell.style.textDecoration = "line-through";

        newRow.appendChild(scoreCell);
    });

    pointsTableBody.insertBefore(newRow, pointsTableBody.lastElementChild);
    roundHistory.push([...scores]);
}

function updateTotalScores() {
    const totalScoresTable = document.getElementById("totalScores");
    totalScoresTable.innerHTML = `
        <tr>
            <td>${scores[0]}</td>
            <td>${scores[1]}</td>
            <td>${scores[2]}</td>
        </tr>
    `;
}

function checkForBonusGame() {
    scores.forEach((score, index) => {
        if (score >= 800 && score < 1000) {
            bonusEnabled[index] = true;
            document.getElementById(`playerName${index + 1}`).style.textDecoration = "line-through";
        } else {
            bonusEnabled[index] = false;
            document.getElementById(`playerName${index + 1}`).style.textDecoration = "none";
        }
    });
}

function useBonus(playerIndex) {
    if (!bonusEnabled[playerIndex]) {
        alert("Ten gracz nie kwalifikuje się do gry pod kreską!");
        return;
    }

    const bonusPoints = 1000 - scores[playerIndex];
    scores[playerIndex] += bonusPoints;

    addNewRoundRow(`BONUS (${document.getElementById(`playerName${playerIndex + 1}`).textContent})`);
    updateTotalScores();
    checkForWinner();
}

function checkForWinner() {
    const winnerIndex = scores.findIndex(score => score >= 1000);
    if (winnerIndex !== -1) {
        const playerName = document.getElementById(`playerName${winnerIndex + 1}`).textContent;
        alert(`Gratulacje! ${playerName} wygrał grę z wynikiem ${scores[winnerIndex]} punktów!`);
        gameEnded = true;
    }
}


