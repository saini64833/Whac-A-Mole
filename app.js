const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
//difficulty panel handle
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
easyButton.addEventListener("click", () => {
  levelText.innerText = levels.easy.text;
  timeDisplay.innerText = levels.easy.timeleft;
});
mediumButton.addEventListener("click", () => {
  levelText.innerText = levels.medium.text;
  timeDisplay.innerText = levels.medium.timeleft;
});
hardButton.addEventListener("click", () => {
  levelText.innerText = levels.hard.text;
  timeDisplay.innerText = levels.hard.timeleft;
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
let scoreDisplay = document.querySelector(".score-value");
let timeDisplay = document.querySelector(".time");
const columns = document.querySelectorAll(".column");
let levelText = document.querySelector(".level");
let timeduration = document.querySelector(".loader");
let highestScore = document.querySelector(".high-value");
function startAnimation() {
  let duration = parseInt(timeDisplay.innerText); // convert text to number
  timeduration.style.animation = `reverseLoader ${duration}s linear forwards`;
  return duration;
}
// Game board
function startGame() {
  let score = 0;
  let points
  let timeleft = parseInt(timeDisplay.innerText);
  let moleSpeed;
  if (levelText.innerText === "Easy") {
    moleSpeed = levels.easy.moleSpeed;
    points = levels.easy.points;
  } else if (levelText.innerText === "Medium") {
    moleSpeed = levels.medium.moleSpeed;
    points = levels.medium.points;
  } else if (levelText.innerText === "Hard") {
    moleSpeed = levels.hard.moleSpeed;
    points = levels.hard.points;
  }
  setTimeout(() => {
    // mole spawning logic
    let gameTimer = setInterval(() => {
      timeleft--;
      timeDisplay.innerText = timeleft;
      if (timeleft <= 0) {
        clearInterval(gameTimer);
        clearInterval(moleTimer);
        timeduration.style.animation = "none";
        alert("Game Over! Your score is " + score);
        if (score > parseInt(highestScore.innerText)) {
          highestScore.innerText = score;
        }
        scoreDisplay.innerText = 0;
        timeDisplay.innerText = levels.easy.timeleft;
        levelText.innerText = "Easy";
        buttons.forEach((btn) => {
          btn.disabled = false;
          btn.style.opacity = 1;
        });
      }
    }, 1000);
  }, moleSpeed);
}
startButton.addEventListener("click", () => {
  startGame();
  startAnimation();
});
