const burgerScore = document.querySelector("#burgerScore");
const burgerPower = document.querySelector("#burgerPower");
const burgerAuto = document.querySelector("#burgerAuto");
const burgerButton = document.querySelector("#burgerButton");
const shop = document.querySelector("#shop");
const shopStatus = document.querySelector("#shopStatus");

let burgers = 0;
let lifetimeBurgers = 0;
let power = 1;
let autoPower = 0;

const burgerUpgrades = [
  { id: "sauce", name: "Sauce Boost", cost: 25, clickGain: 2, autoGain: 0, unlock: 0 },
  { id: "pickle", name: "Pickle Slap", cost: 60, clickGain: 5, autoGain: 0, unlock: 25 },
  { id: "grill", name: "Mega Grill", cost: 100, clickGain: 8, autoGain: 0, unlock: 60 },
  { id: "lettuce", name: "Lettuce Tornado", cost: 250, clickGain: 20, autoGain: 0, unlock: 150 },
  { id: "chef", name: "Auto Chef", cost: 400, clickGain: 0, autoGain: 12, unlock: 250 },
  { id: "factory", name: "Burger Factory", cost: 900, clickGain: 0, autoGain: 50, unlock: 500 },
  { id: "drive", name: "Drive-Thru Portal", cost: 1600, clickGain: 75, autoGain: 0, unlock: 1000 },
  { id: "blimp", name: "Burger Blimp", cost: 2600, clickGain: 0, autoGain: 160, unlock: 1600 },
  { id: "volcano", name: "Sauce Volcano", cost: 4800, clickGain: 220, autoGain: 0, unlock: 3000 },
  { id: "moon", name: "Moon Burger Lab", cost: 8000, clickGain: 0, autoGain: 520, unlock: 5000 },
  { id: "royal", name: "Royal Triple Stack", cost: 13000, clickGain: 700, autoGain: 300, unlock: 8500 },
  { id: "galaxy", name: "Galaxy Grill", cost: 25000, clickGain: 1600, autoGain: 1200, unlock: 15000 },
];

function formatNumber(value) {
  return Math.floor(value).toLocaleString("en-US");
}

function upgradeLabel(upgrade) {
  const parts = [];
  if (upgrade.clickGain > 0) parts.push(`+${upgrade.clickGain} click`);
  if (upgrade.autoGain > 0) parts.push(`+${upgrade.autoGain}/sec`);
  return `Cost ${formatNumber(upgrade.cost)} | ${parts.join(" + ")}`;
}

function updateBurgerStats() {
  burgerScore.textContent = formatNumber(burgers);
  burgerPower.textContent = formatNumber(power);
  burgerAuto.textContent = formatNumber(autoPower);
  updateBurgerLook();
  renderShop();
}

function updateBurgerLook() {
  const unlockedIds = burgerUpgrades
    .filter((upgrade) => lifetimeBurgers >= upgrade.unlock)
    .map((upgrade) => upgrade.id);

  burgerButton.classList.toggle("has-pickle", unlockedIds.includes("pickle"));
  burgerButton.classList.toggle("has-grill", unlockedIds.includes("grill"));
  burgerButton.classList.toggle("has-chef", unlockedIds.includes("chef"));
  burgerButton.classList.toggle("has-factory", unlockedIds.includes("factory"));
  burgerButton.classList.toggle("has-galaxy", unlockedIds.includes("galaxy"));
}

function renderShop() {
  const visibleUpgrades = burgerUpgrades.filter((upgrade) => lifetimeBurgers >= upgrade.unlock);
  const nextUpgrade = burgerUpgrades.find((upgrade) => lifetimeBurgers < upgrade.unlock);

  shop.innerHTML = "";
  visibleUpgrades.forEach((upgrade) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.upgrade = upgrade.id;
    button.innerHTML = `${upgrade.name} <span>${upgradeLabel(upgrade)}</span>`;
    button.disabled = burgers < upgrade.cost;
    button.classList.toggle("locked", burgers < upgrade.cost);
    button.addEventListener("click", () => spendBurgerUpgrade(upgrade));
    shop.appendChild(button);
  });

  shopStatus.textContent = nextUpgrade
    ? `Next upgrade unlocks at ${formatNumber(nextUpgrade.unlock)} burgers.`
    : "All upgrades unlocked. This burger empire is getting ridiculous.";
}

function spendBurgerUpgrade(upgrade) {
  if (burgers < upgrade.cost) {
    burgerButton.classList.add("clicked");
    setTimeout(() => burgerButton.classList.remove("clicked"), 180);
    return;
  }

  burgers -= upgrade.cost;
  power += upgrade.clickGain;
  autoPower += upgrade.autoGain;
  updateBurgerStats();
}

burgerButton.addEventListener("click", () => {
  burgers += power;
  lifetimeBurgers += power;
  updateBurgerStats();
  burgerButton.classList.remove("clicked");
  void burgerButton.offsetWidth;
  burgerButton.classList.add("clicked");
});

setInterval(() => {
  if (autoPower === 0) return;

  burgers += autoPower;
  lifetimeBurgers += autoPower;
  updateBurgerStats();
}, 1000);

const quizQuestions = [
  {
    question: "What color is the loudest?",
    answers: ["Triangle", "Neon yellow", "A tiny spoon", "Yes"],
    correct: 1,
    success: "Correct. Neon yellow is basically yelling.",
  },
  {
    question: "Click the answer that is not wrong.",
    answers: ["Wrong", "Also wrong", "Not wrong", "Wrong but fancy"],
    correct: 2,
    success: "Sneaky, but you found it.",
  },
  {
    question: "A plane, a tank, and a burger walk into the sky. Who wins?",
    answers: ["The sky", "The burger", "The tank-plane", "Nobody, it is a quiz"],
    correct: 3,
    success: "Exactly. The quiz always wins a little.",
  },
  {
    question: "Which button should you press?",
    answers: ["This one", "Definitely this one", "Nope", "The other this one"],
    correct: 0,
    success: "Brave choice. Somehow correct.",
  },
  {
    question: "Final boss: what is 2 + 2?",
    answers: ["Fish", "4", "22", "Hamburger"],
    correct: 1,
    success: "The impossible has been lightly possible'd.",
  },
  {
    question: "If a snake eats a burger, what happens?",
    answers: ["It files taxes", "It grows", "It becomes a plane", "It opens a shop"],
    correct: 1,
    success: "Correct. Snake logic remains undefeated.",
  },
  {
    question: "Which answer is hiding in plain sight?",
    answers: ["Plain sight", "Under the button", "Behind you", "In the clouds"],
    correct: 0,
    success: "Plainly correct.",
  },
  {
    question: "What should you never trust in this quiz?",
    answers: ["The question", "The answers", "The button shadows", "All of it"],
    correct: 3,
    success: "Good instinct. Trust is expensive here.",
  },
  {
    question: "Pick the smallest number.",
    answers: ["100", "0.5", "-2", "A tank"],
    correct: 2,
    success: "Negative numbers sneak under the door.",
  },
  {
    question: "Which one is not a sky move?",
    answers: ["Barrel roll", "Rocket boost", "Cloud dive", "Burger receipt"],
    correct: 3,
    success: "Receipts are powerful, but not aerodynamic.",
  },
  {
    question: "Click the word that says blue.",
    answers: ["Red", "Green", "Blue", "Yellow"],
    correct: 2,
    success: "The classic trick forgot to trick you.",
  },
  {
    question: "What is the safest impossible quiz strategy?",
    answers: ["Guess loudly", "Read first", "Close eyes", "Ask the burger"],
    correct: 1,
    success: "Reading wins. Annoying, but true.",
  },
];

const quizProgress = document.querySelector("#quizProgress");
const quizLives = document.querySelector("#quizLives");
const quizQuestion = document.querySelector("#quizQuestion");
const quizAnswers = document.querySelector("#quizAnswers");
const quizMessage = document.querySelector("#quizMessage");
const quizReset = document.querySelector("#quizReset");

let quizIndex = 0;
let lives = 3;
let quizOver = false;
let quizDeck = [];

function shuffleQuestions() {
  quizDeck = [...quizQuestions];

  for (let index = quizDeck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [quizDeck[index], quizDeck[swapIndex]] = [quizDeck[swapIndex], quizDeck[index]];
  }
}

function renderQuiz() {
  const current = quizDeck[quizIndex];
  quizProgress.textContent = `Question ${quizIndex + 1} of ${quizDeck.length}`;
  quizLives.textContent = `Lives: ${lives}`;
  quizQuestion.textContent = current.question;
  quizAnswers.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.disabled = quizOver;
    button.addEventListener("click", () => chooseAnswer(index));
    quizAnswers.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (quizOver) return;

  const current = quizDeck[quizIndex];
  if (index === current.correct) {
    quizMessage.textContent = current.success;
    quizIndex += 1;

    if (quizIndex === quizDeck.length) {
      quizOver = true;
      quizQuestion.textContent = "You beat The Impossible Quiz!";
      quizProgress.textContent = "Victory";
      quizAnswers.innerHTML = "";
      return;
    }

    setTimeout(renderQuiz, 520);
    return;
  }

  lives -= 1;
  quizLives.textContent = `Lives: ${lives}`;
  quizMessage.textContent = lives > 0 ? "Nope. The quiz bonked you." : "Game over. The quiz got dramatic.";

  if (lives === 0) {
    quizOver = true;
    renderQuiz();
  }
}

quizReset.addEventListener("click", () => {
  quizIndex = 0;
  lives = 3;
  quizOver = false;
  shuffleQuestions();
  quizMessage.textContent = "Choose carefully. It is called impossible for a reason.";
  renderQuiz();
});

const chanceStory = document.querySelector("#chanceStory");
const chanceTarget = document.querySelector("#chanceTarget");
const chanceButtons = document.querySelectorAll(".chance-actions button");
const chanceReset = document.querySelector("#chanceReset");
const plane = document.querySelector("#plane");

const chanceResults = {
  cloud: {
    icon: "X",
    ending: "BAD ENDING: Cloud Crunch",
    text: "You dive into the cloud and bonk an invisible floating billboard. The plane spins, the crowd gasps, and your snack tray is gone forever.",
    mood: "bad",
    speed: "0.25s",
  },
  boost: {
    icon: "!",
    ending: "BAD ENDING: Too Much Zoom",
    text: "The rocket boost is too spicy. You blast past the finish, miss the runway, and become a tiny dot yelling across the sky.",
    mood: "bad",
    speed: "0.18s",
  },
  tank: {
    icon: "*",
    ending: "GOOD ENDING: Tank Parachute Save",
    text: "Tiger Tank backup arrives by parachute, bumps you back on course, and somehow parks perfectly at the finish line.",
    mood: "good",
    speed: "0.55s",
  },
  storm: {
    icon: "Z",
    ending: "BAD ENDING: Storm Blender",
    text: "The storm gate spins your plane like a smoothie machine. You survive, but your map now points sideways.",
    mood: "bad",
    speed: "0.12s",
  },
  burger: {
    icon: "B",
    ending: "GOOD ENDING: Burger Beacon",
    text: "The glowing burger beacon leads you to a secret snack runway. Perfect landing. Extra fries.",
    mood: "good",
    speed: "0.7s",
  },
  barrel: {
    icon: "?",
    ending: "WEIRD ENDING: Barrel Roll Refund",
    text: "The barrel roll opens a portal, refunds your ticket, and drops you gently back at the starting line.",
    mood: "good",
    speed: "0.35s",
  },
};

function setChanceLocked(locked) {
  chanceButtons.forEach((button) => {
    button.disabled = locked;
  });
}

chanceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const result = chanceResults[button.dataset.choice];
    chanceStory.textContent = `${result.ending} - ${result.text}`;
    chanceTarget.textContent = result.icon;
    chanceTarget.className = `chance-target ${result.mood}`;
    chanceStory.parentElement.className = `chance-panel ${result.mood}-ending`;
    plane.style.animationDuration = result.speed;
    setChanceLocked(true);
  });
});

chanceReset.addEventListener("click", () => {
  chanceStory.textContent = "Your silly sky engine is wobbling. Pick one move. No takebacks.";
  chanceTarget.textContent = "?";
  chanceTarget.className = "chance-target";
  chanceStory.parentElement.className = "chance-panel";
  plane.style.animationDuration = "2s";
  setChanceLocked(false);
});

const snakeCanvas = document.querySelector("#snakeCanvas");
const snakeScore = document.querySelector("#snakeScore");
const snakeStatus = document.querySelector("#snakeStatus");
const snakeStart = document.querySelector("#snakeStart");
const snakeButtons = document.querySelectorAll("[data-snake]");
const snakeContext = snakeCanvas.getContext("2d");
const tileCount = 18;
const tileSize = snakeCanvas.width / tileCount;

let snake = [];
let snack = { x: 12, y: 9 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let snakePoints = 0;
let snakeTimer = null;

function drawSnakeBoard() {
  snakeContext.fillStyle = "#13001f";
  snakeContext.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  snakeContext.strokeStyle = "rgba(0, 229, 255, 0.22)";
  for (let index = 0; index <= tileCount; index += 1) {
    const position = index * tileSize;
    snakeContext.beginPath();
    snakeContext.moveTo(position, 0);
    snakeContext.lineTo(position, snakeCanvas.height);
    snakeContext.moveTo(0, position);
    snakeContext.lineTo(snakeCanvas.width, position);
    snakeContext.stroke();
  }

  snakeContext.fillStyle = "#ff2f92";
  snakeContext.fillRect(snack.x * tileSize + 3, snack.y * tileSize + 3, tileSize - 6, tileSize - 6);

  snake.forEach((part, index) => {
    snakeContext.fillStyle = index === 0 ? "#fff44f" : "#b7ff1a";
    snakeContext.fillRect(part.x * tileSize + 2, part.y * tileSize + 2, tileSize - 4, tileSize - 4);
  });
}

function resetSnake() {
  snake = [
    { x: 6, y: 9 },
    { x: 5, y: 9 },
    { x: 4, y: 9 },
  ];
  snack = { x: 12, y: 9 };
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  snakePoints = 0;
  snakeScore.textContent = "0";
  snakeStatus.textContent = "Ready";
  drawSnakeBoard();
}

function placeSnack() {
  do {
    snack = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } while (snake.some((part) => part.x === snack.x && part.y === snack.y));
}

function setSnakeDirection(x, y) {
  if (direction.x + x === 0 && direction.y + y === 0) return;
  nextDirection = { x, y };
}

function endSnakeGame() {
  clearInterval(snakeTimer);
  snakeTimer = null;
  snakeStatus.textContent = "Bonked";
  snakeStart.textContent = "Restart snake";
}

function stepSnake() {
  direction = nextDirection;
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  const hitWall = head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount;
  const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);

  if (hitWall || hitSelf) {
    endSnakeGame();
    drawSnakeBoard();
    return;
  }

  snake.unshift(head);

  if (head.x === snack.x && head.y === snack.y) {
    snakePoints += 1;
    snakeScore.textContent = snakePoints;
    snakeStatus.textContent = "Munch";
    placeSnack();
  } else {
    snake.pop();
    snakeStatus.textContent = "Zoom";
  }

  drawSnakeBoard();
}

function startSnake() {
  if (snakeTimer) return;

  if (snakeStatus.textContent === "Bonked") resetSnake();
  snakeStatus.textContent = "Go";
  snakeStart.textContent = "Snake running";
  snakeTimer = setInterval(stepSnake, 145);
}

snakeStart.addEventListener("click", startSnake);

snakeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const move = button.dataset.snake;
    if (move === "up") setSnakeDirection(0, -1);
    if (move === "down") setSnakeDirection(0, 1);
    if (move === "left") setSnakeDirection(-1, 0);
    if (move === "right") setSnakeDirection(1, 0);
    startSnake();
  });
});

window.addEventListener("keydown", (event) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "ArrowUp") setSnakeDirection(0, -1);
  if (event.key === "ArrowDown") setSnakeDirection(0, 1);
  if (event.key === "ArrowLeft") setSnakeDirection(-1, 0);
  if (event.key === "ArrowRight") setSnakeDirection(1, 0);
  startSnake();
});

const bombCanvas = document.querySelector("#bombCanvas");
const bombContext = bombCanvas.getContext("2d");
const bombScore = document.querySelector("#bombScore");
const bombStatus = document.querySelector("#bombStatus");
const bombStart = document.querySelector("#bombStart");
const bombButtons = document.querySelectorAll("[data-bomb]");

let nukeLaunches = 0;
let selectedRegion = 0;
let nukeImpacts = [];
let nukeTimer = null;

const worldRegions = [
  { name: "North America", x: 132, y: 124, width: 145, height: 78, color: "#b7ff1a" },
  { name: "South America", x: 210, y: 248, width: 70, height: 112, color: "#ff9d00" },
  { name: "Europe", x: 314, y: 128, width: 74, height: 52, color: "#fff44f" },
  { name: "Africa", x: 340, y: 226, width: 98, height: 118, color: "#ff2f92" },
  { name: "Asia", x: 452, y: 144, width: 170, height: 102, color: "#00e5ff" },
  { name: "Australia", x: 510, y: 304, width: 88, height: 46, color: "#7b2cff" },
];

function drawBlob(region, isSelected) {
  bombContext.save();
  bombContext.translate(region.x, region.y);
  bombContext.fillStyle = region.color;
  bombContext.strokeStyle = isSelected ? "#fffdf3" : "#180024";
  bombContext.lineWidth = isSelected ? 7 : 4;
  bombContext.beginPath();
  bombContext.ellipse(0, 0, region.width / 2, region.height / 2, 0.15, 0, Math.PI * 2);
  bombContext.fill();
  bombContext.stroke();

  bombContext.fillStyle = "#180024";
  bombContext.font = "900 13px Arial";
  bombContext.textAlign = "center";
  bombContext.fillText(region.name, 0, 5);
  bombContext.restore();
}

function drawNukeSimulator() {
  bombContext.fillStyle = "#13001f";
  bombContext.fillRect(0, 0, bombCanvas.width, bombCanvas.height);

  bombContext.fillStyle = "#003d5a";
  bombContext.fillRect(0, 0, bombCanvas.width, bombCanvas.height);

  bombContext.fillStyle = "rgba(0, 229, 255, 0.28)";
  for (let index = 0; index < 7; index += 1) {
    bombContext.beginPath();
    bombContext.arc(70 + index * 86, 190, 170 + (index % 2) * 22, 0, Math.PI * 2);
    bombContext.fill();
  }

  worldRegions.forEach((region, index) => drawBlob(region, index === selectedRegion));

  nukeImpacts.forEach((impact) => {
    const alpha = Math.max(0, 1 - impact.radius / impact.maxRadius);
    bombContext.strokeStyle = `rgba(255, 244, 79, ${alpha})`;
    bombContext.lineWidth = 7;
    bombContext.beginPath();
    bombContext.arc(impact.x, impact.y, impact.radius, 0, Math.PI * 2);
    bombContext.stroke();

    bombContext.fillStyle = `rgba(255, 47, 146, ${alpha * 0.75})`;
    bombContext.beginPath();
    bombContext.arc(impact.x, impact.y, impact.radius * 0.45, 0, Math.PI * 2);
    bombContext.fill();

    bombContext.fillStyle = "#fffdf3";
    bombContext.font = "900 18px Arial";
    bombContext.textAlign = "center";
    bombContext.fillText("BOOM", impact.x, impact.y + 6);
  });
}

function updateNukeStatus() {
  bombScore.textContent = nukeLaunches;
  bombStatus.textContent = worldRegions[selectedRegion].name;
}

function resetBombGame() {
  nukeLaunches = 0;
  selectedRegion = 0;
  nukeImpacts = [];
  updateNukeStatus();
  drawNukeSimulator();
}

function stepNukeSimulator() {
  nukeImpacts.forEach((impact) => {
    impact.radius += impact.speed;
  });
  nukeImpacts = nukeImpacts.filter((impact) => impact.radius < impact.maxRadius);

  if (nukeImpacts.length === 0) {
    clearInterval(nukeTimer);
    nukeTimer = null;
  }

  drawNukeSimulator();
}

function startNukeAnimation() {
  if (nukeTimer) return;
  nukeTimer = setInterval(stepNukeSimulator, 45);
}

function selectNukeRegion(step) {
  selectedRegion = (selectedRegion + step + worldRegions.length) % worldRegions.length;
  updateNukeStatus();
  drawNukeSimulator();
}

function launchNuke() {
  const region = worldRegions[selectedRegion];
  nukeLaunches += 1;
  nukeImpacts.push({
    x: region.x,
    y: region.y,
    radius: 10,
    maxRadius: Math.max(region.width, region.height) * 0.85,
    speed: 5,
  });
  updateNukeStatus();
  startNukeAnimation();
  drawNukeSimulator();
}

bombStart.addEventListener("click", resetBombGame);

bombButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.bomb === "left") selectNukeRegion(-1);
    if (button.dataset.bomb === "right") selectNukeRegion(1);
    if (button.dataset.bomb === "drop") launchNuke();
  });
});

window.addEventListener("keydown", (event) => {
  if (!["a", "A", "d", "D", " "].includes(event.key)) return;

  if (event.key === "a" || event.key === "A") selectNukeRegion(-1);
  if (event.key === "d" || event.key === "D") selectNukeRegion(1);
  if (event.key === " ") {
    event.preventDefault();
    launchNuke();
  }
});

updateBurgerStats();
shuffleQuestions();
renderQuiz();
resetSnake();
resetBombGame();
