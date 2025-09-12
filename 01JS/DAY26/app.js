let turn = "O";
let total_turn = 0;

let winner = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let board_array = new Array(9).fill("E");

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('winningMessage');
const resetRoundBtn = document.getElementById("resetRound");
const resetAllBtn = document.getElementById("resetAll");

// Scoreboard
const scoreXSpan = document.getElementById("scoreX");
const scoreOSpan = document.getElementById("scoreO");
const scoreTSpan = document.getElementById("scoreT");
let scores = { X: 0, O: 0, T: 0 };

function checkWinner() {
  for (let [a,b,c] of winner) {
    if (board_array[a] !== "E" && board_array[a] === board_array[b] && board_array[a] === board_array[c]) {
      return board_array[a]; // returns "X" or "O"
    }
  }
  return null;
}

function updateScoreboard() {
  scoreXSpan.textContent = scores.X;
  scoreOSpan.textContent = scores.O;
  scoreTSpan.textContent = scores.T;
}

function handleClick(event) {
  const element = event.target;
  const index = element.dataset.index;

  if (board_array[index] !== "E") return;

  element.textContent = turn;
  element.classList.add(turn.toLowerCase());
  board_array[index] = turn;
  total_turn++;

  const winnerPlayer = checkWinner();

  if (winnerPlayer) {
    statusDiv.textContent = `Winner is ${winnerPlayer}`;
    highlightWinner(winnerPlayer);
    scores[winnerPlayer]++;
    updateScoreboard();
    board.removeEventListener('click', handleClick);
    return;
  }

  if (total_turn === 9) {
    statusDiv.textContent = "Match is Draw";
    scores.T++;
    updateScoreboard();
    board.removeEventListener('click', handleClick);
    return;
  }

  turn = turn === "O" ? "X" : "O";
}

function highlightWinner(player) {
  for (let [a,b,c] of winner) {
    if (board_array[a] === player && board_array[b] === player && board_array[c] === player) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      break;
    }
  }
}

function resetRound() {
  board_array = new Array(9).fill("E");
  total_turn = 0;
  turn = "O";
  statusDiv.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "win");
  });
  board.addEventListener('click', handleClick);
}

function resetAll() {
  resetRound();
  scores = { X: 0, O: 0, T: 0 };
  updateScoreboard();
}

board.addEventListener('click', handleClick);
resetRoundBtn.addEventListener('click', resetRound);
resetAllBtn.addEventListener('click', resetAll);
