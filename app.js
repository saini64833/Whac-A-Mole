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
let scoreDisplay = document.querySelector(".current-value");
let timeDisplay = document.querySelector(".time");
const columns = document.querySelectorAll(".column");
let levelText = document.querySelector(".level");
let timeduration = document.querySelector(".loader");
let highestScore = document.querySelector(".high-value");
  let score = 0;
  let points;
  let timeleft = parseInt(timeDisplay.innerText); // keep in seconds
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
// Game board
function startGame() {
  timeduration.style.animation = `reverseLoader ${timeleft}s linear forwards`;
  let countdown = setInterval(() => {
    timeleft--;
    timeDisplay.innerText = timeleft;
    if (timeleft <= 0) {
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
      // Re-enable difficulty buttons
      buttons.forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = 1;
      });
    }
  }, 1000);

  // Mole spawner (based on moleSpeed)
  let moleInterval = setInterval(() => {
    let index = Math.floor(Math.random() * columns.length);
    columns[index].innerText = "mole";
      columns[index].addEventListener("click", () => {
        score += points;
        scoreDisplay.innerText = score;
      columns.forEach((col) => col.innerText = "");
      });
    setTimeout(() => {
      if (columns[index].innerText === "mole") {
        columns[index].innerText = "";
      }
    }, moleSpeed - 200);
  }, moleSpeed);
}

startButton.addEventListener("click", async () => {
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = 0.6;
  });
    startGame();
});
