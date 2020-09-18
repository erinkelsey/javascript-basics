/**
 * Constants
 */
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

/**
 * Get the initial value for chosenMaxLife from user.
 *
 * Parse value and make sure it is a number > 0.
 */
const enterValue = prompt("Maximum life for you and the monster.", "100");
let chosenMaxLife = parseInt(enterValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

/**
 * Initialization of monster and player health, bonus life and
 * battle log.
 */
let currentMonsterHealth = chosenMaxLife;
let currentPlayersHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

/**
 * Write to the log the event that has taken place.
 *
 * @param {String} event: type of event to log
 * @param {String} value: value of the event that took place
 * @param {Number} monsterHealth: current value of monster's health at time of this event
 * @param {Number} playerHealth: current value of player's health at time of this event
 */
function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;
  }

  battleLog.push(logEntry);
}

/**
 * Reset the monster and player's health values and update
 * the UI, with the reset values.
 */
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayersHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

/**
 * Checks if game needs to be reset.
 *
 * Game needs to be reset if there is a winner, or if it is a draw.
 * Writes this event to game log, if reset.
 *
 * @param {String} logValue : Value to write to log, if game is reset.
 */
function checkNeedReset(logValue) {
  if (currentMonsterHealth <= 0 || currentPlayersHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAME_OVER,
      logValue,
      currentMonsterHealth,
      currentPlayersHealth
    );
    reset();
  }
}

/**
 * Check if player needs a bonus life.
 *
 * If player has a bonus life and their current health < 0, apply
 * the bonus life, and add HEAL_VALUE to their current health.
 * Bonus life can only be used once per game.
 */
function checkBonusLife() {
  if (currentPlayersHealth > 0 || !hasBonusLife) {
    return;
  }

  hasBonusLife = false;
  removeBonusLife();
  currentPlayersHealth = HEAL_VALUE;
  setPlayerHealth(HEAL_VALUE);
  alert("You would be dead, but the bonus life saved you!");
}

/**
 * Checks the health of the monster and the player.
 *
 * If monster's health < 0, player won.
 * If player's health < 0, monster won.
 * If monster's health and player's health < 0,  game is a draw.
 *
 * Also, checks if user needs bonus life to be applied.
 * Also, checks if game needs to be reset (game is over).
 */
function checkHealth() {
  checkBonusLife();

  let eventValue = "NO EVENT";
  if (currentMonsterHealth <= 0 && currentPlayersHealth > 0) {
    alert("You won!");
    eventValue = "PLAYER WON!";
  } else if (currentPlayersHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    eventValue = "MONSTER WON!";
  } else if (currentMonsterHealth <= 0 && currentPlayersHealth <= 0) {
    alert("You have a draw!");
    eventValue = "NOBODY WON!";
  }

  checkNeedReset(eventValue);
}

/**
 * Perform player attack on monster.
 * Writes this event to game log.
 *
 * @param {String} mode: mode of attack, either ATTACK or STRONG_ATTACK
 */
function playerAttackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayersHealth);
}

/**
 * Perform monster attack in player.
 * Writes this event to game log.
 */
function monsterAttackPlayer() {
  const damage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayersHealth -= damage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    damage,
    currentMonsterHealth,
    currentPlayersHealth
  );
}

/**
 * Perform attack on monster.
 *
 * Player attacks monster, then monster hits back immediately.
 * Check health of monster and player after attack and retaliation.
 */
function attackMonster(mode) {
  playerAttackMonster(mode);
  monsterAttackPlayer();
  checkHealth();
}

/**
 * Calculates the value that can be used to heal the player.
 *
 * Player's current health value cannot exceed the chosenMaxLife value.
 * If this is going to happen, heal value is difference between currentPlayersHealth
 * and chosenMaxLife values; else the heal value is HEAL_VALUE.
 */
function calculateHealValue() {
  if (currentPlayersHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    return chosenMaxLife - currentPlayersHealth;
  } else {
    return HEAL_VALUE;
  }
}

/**
 * Perform healing operation on player.
 * Writes this event to game log.
 */
function healPlayer() {
  const healValue = calculateHealValue();

  increasePlayerHealth(healValue);
  currentPlayersHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayersHealth
  );
}

/**
 * Button click event handler, called when user presses 'HEAL' button.
 *
 * After healing is applied to player, monster attacks player.
 * Check health of monster and player after attack.
 */
function healPlayerHandler() {
  healPlayer();
  monsterAttackPlayer();
  checkHealth();
}

/**
 * Button click event handler, called when user presses 'ATTACK' button.
 */
function attackHandler() {
  attackMonster(MODE_ATTACK);
}

/**
 * Button click event handler, called when user presses 'STRONG ATTACK' button.
 */
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

/**
 * Button click event handler, called when user presses 'SHOW LOG'
 */
let i = 0;
function printLogHandler() {
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key}: ${logEntry[key]}`);
    }
    i++;
  }
}

/**
 * Attach event handlers to buttons
 */
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
