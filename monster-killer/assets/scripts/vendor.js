/**
 * Create variables of HTML page elements
 */
const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const bonusLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

/**
 * Initialize the monster and player health bars on the page
 * @param {String} maxLife: the value to initialize the monster and player health bars to
 */
function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

/**
 * Calculates a random value to damage the monster, based on parameter.
 * Applies the damage to the monster, and updates the monster health bar on the page.
 * @param {Number} damage: the max amount of damage that can be done to this monster
 */
function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

/**
 * Calculates a random value to damage the player, based on parameter.
 * Applies the damage to the player, and updates the player's health bar on the page.
 * @param {Number} damage
 */
function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

/**
 * Update the player health bar by adding the healValue to it.
 * @param {Number} healValue: the amount to heal the player
 */
function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

/**
 * Reset the game by setting the player and monster health bars to parameter value.
 * @param {Number} value: value used to reset the health bars.
 */
function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

/**
 * Removes the bonus life from the player.
 */
function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

/**
 * Sets the player's health bar to parameter value.
 * @param {Number} health: the value to set the player's health bar.
 */
function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
