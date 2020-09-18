/**
 * DOM Element
 */
const startGameBtn = document.getElementById("start-game-btn");

/**
 * Constants
 */
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

/**
 * Get the user's choice from a prompt.
 *
 * Choice must be either ROCK, PAPER, or SCISSORS (not case-sensitive).
 */
const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER}, or ${SCISSORS}?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you :)`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

/**
 * Calculate the computer's choice randomly.
 */
const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

/**
 * Calculate the winner of the game between the user and computer.
 * @param {String} cChoice: the computer's choice (ROCK, PAPER, SCISSORS)
 * @param {String} pChoice: the player's choice (ROCK, PAPER, SCISSORS)
 */
const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

/**
 * Create the message to show the user about who won the game.
 * @param {String} winner: who was the winner (RESULT_DRAW, RESULT_PLAYER_WINS, RESULT_COMPUTER_WINS)
 * @param {String} pChoice: the player's choice (ROCK, PAPER, SCISSORS)
 * @param {String} cChoice: the computer's choice (ROCK, PAPER, SCISSORS)
 */
const getGameResultMessage = (winner, pChoice, cChoice) => {
  let message = `You picked ${pChoice}, computer picked ${cChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message += "had a draw.";
  } else if (winner === RESULT_PLAYER_WINS) {
    message += "won! :)";
  } else {
    message += "lost. :(";
  }

  return message;
};

/**
 * Play the game.
 */
const playGame = () => {
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);
  alert(getGameResultMessage(winner, playerChoice, computerChoice));
};

/**
 * Event listener for the Start Game button.
 */
startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) return;
  gameIsRunning = true;
  playGame();
  gameIsRunning = false;
});
