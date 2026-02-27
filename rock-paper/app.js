
let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3); //for gernete random inpute ,aur math random sirf 0 se 1 ke beech value leta hai
  return options[randomIdx]; //randomly return rock, paper or scissors
};

const showWinner = (userWin,userchoice,computerChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    // console.log("You win!");
    msg.innerText = `You win! Your ${userchoice} beats ${computerChoice}`; ;
    msg.style.backgroundColor = "green";
  } else {
    computerScore++;
    computerScorePara.innerText = computerScore;
    // console.log("Computer wins! you lose");
    msg.innerText = `You Lose` + `! Your ${userchoice} loses to ${computerChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const drawGame = () => {
//   console.log("It's a draw!");
    msg.innerText = "It's a draw!, Play Again";
    msg.style.backgroundColor = "#081b31";
};

const playgame = (userchoice) => {
  console.log("user choice = ", userchoice);
  // Generate computer choice
  const computerChoice = genCompChoice();
  console.log("computer choice = ", computerChoice);

  if (userchoice === computerChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userchoice === "rock") {
      // scissor paper
      userWin = computerChoice === "paper" ? false : true;
    } else if (userchoice === "paper") {
      // rock, scissor
      userWin = computerChoice === "scissor" ? false : true;
    } else {
      // rock, paper
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userWin , userchoice, computerChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", function () {
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
  });
});
