const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
let scoreDisplay = document.querySelector(".score-value");
let timeDisplay = document.querySelector(".time");
const columns = document.querySelectorAll(".column");
let levelText = document.querySelector(".level");
let timeduration = document.querySelector(".loader");
let highestScore = document.querySelector(".high-value");
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
//start panel
let score = 0;
startButton.addEventListener("click", () => {
  timeduration.style.animation = `reverseLoader ${timeDisplay.innerText}s linear forwards`;
});
