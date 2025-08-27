const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
let levelText = document.querySelector(".level");

// difficulty panel handle
const levels = {
  easy: {
    timeleft: 90,
    moleSpeed: 1500,
    points: 10,
    text: "Easy",
  },
  medium: {
    timeleft: 60,
    moleSpeed: 1000,
    points: 15,
    text: "Medium",
  },
  hard: {
    timeleft: 45,
    moleSpeed: 600,
    points: 20,
    text: "Hard",
  },
};

let scoreDisplay = document.querySelector(".current-value");
let timeDisplay = document.querySelector(".time");
const columns = document.querySelectorAll(".column");
let timeduration = document.querySelector(".loader");
let highestScore = document.querySelector(".high-value");

let score = 0;
let points = 10;
let timeleft = parseInt(timeDisplay.innerText);
let moleSpeed = 1500;

let countdown;
let moleInterval;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

easyButton.addEventListener("click", () => {
  levelText.innerText = levels.easy.text;
  timeDisplay.innerText = levels.easy.timeleft;
  timeleft = levels.easy.timeleft;
  points = levels.easy.points;
  moleSpeed = levels.easy.moleSpeed;
});
mediumButton.addEventListener("click", () => {
  levelText.innerText = levels.medium.text;
  timeDisplay.innerText = levels.medium.timeleft;
  timeleft = levels.medium.timeleft;
  points = levels.medium.points;
  moleSpeed = levels.medium.moleSpeed;
});
hardButton.addEventListener("click", () => {
  levelText.innerText = levels.hard.text;
  timeDisplay.innerText = levels.hard.timeleft;
  timeleft = levels.hard.timeleft;
  points = levels.hard.points;
  moleSpeed = levels.hard.moleSpeed;
});

const buttons = [easyButton, mediumButton, hardButton];
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = 0.6;
    });
  });
  button.disabled = false;
  button.style.opacity = 1;
});

async function startGame() {
  try {
    timeduration.style.animation = `loader ${timeleft}s linear forwards`;

    countdown = setInterval(() => {
      timeleft--;
      timeDisplay.innerText = timeleft;
      if (timeleft <= 0) {
        endGame();
      }
    }, 1000);
    await delay(100);
    await spawnMoles();
  } catch (error) {
    console.error("Error starting game:", error);
  }
}

async function spawnMoles() {
  moleInterval = setInterval(() => {
    let index = Math.floor(Math.random() * columns.length);
    columns[index].innerText = "mole";

    columns[index].onclick = () => {
      score += points;
      scoreDisplay.innerText = score;
      columns[index].innerText = "";
    };

    setTimeout(() => {
      if (columns[index].innerText === "mole") {
        columns[index].innerText = "";
      }
    }, moleSpeed - 200);
  }, moleSpeed);
}

async function endGame() {
  try {
    clearInterval(countdown);
    clearInterval(moleInterval);
    columns.forEach((col) => (col.innerText = ""));

    if (score > parseInt(highestScore.innerText)) {
      highestScore.innerText = score;
    }

    alert("Game Over! Your score is " + score);

    score = 0;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = levels.easy.timeleft;

    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.style.opacity = 1;
    });
    startButton.disabled = false;
  } catch (error) {
    console.error("Error ending game:", error);
  }
}

resetButton.addEventListener("click", async () => {
  try {
    clearInterval(countdown);
    clearInterval(moleInterval);
    score = 0;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = levels.easy.timeleft;
    startButton.disabled = false;
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.style.opacity = 1;
    });
  } catch (error) {
    console.error("Error resetting game:", error);
  }
});

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  resetButton.disabled = false;
  score = 0;
  scoreDisplay.innerText = score;
  await startGame();
});
