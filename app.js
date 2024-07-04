let userScore = 0;
let compScore = 0;
let seriesMatches = Infinity; // Default number of matches in the "Normal Game" (effectively infinite)
let currentMatch = 0; // Counter for the current match

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const gameTypeSelect = document.querySelector("#game-type");
gameTypeSelect.addEventListener("change", function () {
  if (this.value === "series") {
    // If series game selected, ask for series length
    seriesMatches = parseInt(prompt("Enter number of matches in the series (3, 5, 7, 9, etc.):"));
    if (isNaN(seriesMatches) || seriesMatches < 1 || seriesMatches % 2 === 0) {
      // Default to 3 matches if invalid input or even number
      seriesMatches = 3;
    }
  } else {
    // If normal game selected, reset series length and hide message
    seriesMatches = Infinity;
    msg.innerText = "Play your Move";
    msg.style.backgroundColor = "#081b31";
  }
  resetGame();
});

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    if (seriesMatches !== Infinity) {
      msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    } else {
      msg.innerText = `You won this match! Your ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    }
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    if (seriesMatches !== Infinity) {
      msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    } else {
      msg.innerText = `You lost this match. ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    }
  }
  if (seriesMatches !== Infinity) {
    currentMatch++;

    // Check if the series is over
    if (currentMatch === seriesMatches) {
      checkSeriesWinner();
    }
  }
};

const checkSeriesWinner = () => {
  if (userScore > compScore) {
    msg.innerText = `You won the series ${userScore}-${compScore}!`;
    msg.style.backgroundColor = "green";
  } else if (compScore > userScore) {
    msg.innerText = `Computer won the series ${compScore}-${userScore}. Try again!`;
    msg.style.backgroundColor = "red";
  } else {
    msg.innerText = `Series ended in a tie ${userScore}-${compScore}.`;
    msg.style.backgroundColor = "#081b31";
  }
  resetGame();
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  currentMatch = 0;
};

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
