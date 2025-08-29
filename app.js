const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
let levelText = document.querySelector(".level");
let startinstruction = document.querySelector(".clew");
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
let highestScoreHeader = document.querySelector(".value");

let score = 0;
let points = levels.easy.points;
let moleSpeed = levels.easy.moleSpeed;
let timeleft = levels.easy.timeleft;
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
  timeduration.style.animation = `loader ${timeleft}s linear reverse forwards`;
  countdown = setInterval(() => {
    timeleft--;
    timeDisplay.innerText = timeleft;
    if (timeleft <= 0) {
      endGame();
    }
  }, 1000);
  for (let column of columns) {
    column.onclick = () => {
      if (column.innerText == "mole") {
        score += points;
      }
      scoreDisplay.innerText = score;
      column.innerText = "";
    };
  }
  moleInterval = setInterval(spawnMoles, moleSpeed);
}

async function spawnMoles() {
  let index = Math.floor(Math.random() * columns.length);
  columns[index].innerText = "mole";
  console.log(moleSpeed);
  await delay(moleSpeed - 300);

  columns[index].innerText = "";
}

async function endGame() {
  clearInterval(countdown);
  clearInterval(moleInterval);
  columns.forEach((col) => (col.innerText = ""));
  if (score > parseInt(highestScore.innerText)) {
    highestScore.innerText = score;
    highestScoreHeader.innerText=score;
  }

  alert("Game Over! Your score is " + score);

  score = 0;
  scoreDisplay.innerText = score;
  timeDisplay.innerText = levels.easy.timeleft;
  startinstruction.style.display = "flex";
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.style.opacity = 1;
  });
  startButton.disabled = false;
  timeduration.style.animation = "none";
}

resetButton.addEventListener("click", async () => {
  clearInterval(countdown);
  clearInterval(moleInterval);
  startinstruction.style.display = "flex";
  startinstruction.style.alignItems="center";
  startinstruction.style.justifyContent="center";
  score = 0;
  scoreDisplay.innerText = score;
  startButton.disabled = false;
  timeDisplay.innerText = levels.easy.timeleft;
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.style.opacity = 1;
  });
  timeduration.style.animation = "none";
});

startButton.addEventListener("click", async () => {
  startinstruction.style.display = "none";
  startButton.disabled = true;
  resetButton.disabled = false;
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = 0.6;
  });
  await startGame();
});
