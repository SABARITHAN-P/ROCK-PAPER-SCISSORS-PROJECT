let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lose: 0,
  tie: 0,
};
//JSON.parse is used to convert string to object

updateScoreElement();

function ComputerMove() {
  let computerMove;
  const randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "ROCK";
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "PAPER";
  } else {
    computerMove = "SCISSORS";
  }
  return computerMove;
}

let intervalId;
function autoplay() {
  const playinnerElement = document.querySelector(".JS-auto-play");
  const play = playinnerElement.innerHTML;
  if (play === "AUTO PLAY") {
    document.querySelector(".JS-auto-play").innerHTML = "STOP PLAY";
    intervalId = setInterval(function () {
      const playermove = ComputerMove();
      PlayGame(playermove);
    }, 1000);
  } else {
    document.querySelector(".JS-auto-play").innerHTML = "AUTO PLAY";
    clearInterval(intervalId);
  }
}


function PlayGame(playermove) {
  const computerMove = ComputerMove();
  let result;
  if (playermove === "SCISSORS") {
    if (computerMove === "SCISSORS") {
      result = "TIE.";
    } else if (computerMove === "ROCK") {
      result = "YOU LOSE.";
    } else {
      result = "YOU WON.";
    }
  } else if (playermove === "PAPER") {
    if (computerMove === "PAPER") {
      result = "TIE.";
    } else if (computerMove === "SCISSORS") {
      result = "YOU LOSE.";
    } else {
      result = "YOU WON.";
    }
  } else {
    if (computerMove === "ROCK") {
      result = "TIE.";
    } else if (computerMove === "PAPER") {
      result = "YOU LOSE.";
    } else {
      result = "YOU WON.";
    }
  }
  if (result === "YOU WON.") {
    score.wins++;
  } else if (result === "YOU LOSE.") {
    score.lose++;
  } else {
    score.tie++;
  }

  //localstorge only support string.so we convert the score obtect into string by using  JSON.stringify
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".JS-result").innerHTML = result;
  document.querySelector(".JS-moves").innerHTML =
    'YOU <img src="images/' +
    playermove +
    '-emoji.png" class="move-icon">' +
    '<img src="images/' +
    computerMove +
    '-emoji.png" class="move-icon"> COMPUTER';
}

function updateScoreElement() {
  document.querySelector(".JS-score").innerHTML =
    "WINS:" + score.wins + ", LOSSES:" + score.lose + ", TIES:" + score.tie;
}
