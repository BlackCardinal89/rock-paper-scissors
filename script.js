let computerScore = 0;
let playerScore = 0;

// Naming User and Computer Scores to update
const userScore = document.querySelector('.user-score');
const randomScore = document.querySelector('.computer-score');

// Naming User's Buttons to add event listeners
const rockButton = document.querySelector('.rock');
const paperButton = document.querySelector('.paper');
const scissorsButton = document.querySelector('.scissors');

// Naming Computer's Buttons to add event listeners
const computerRock = document.querySelector('.computer-rock');
const computerPaper = document.querySelector('.computer-paper');
const computerScissors = document.querySelector('.computer-scissors');

// Naming and Placing the "Results" of each round
const resultDiv = document.createElement('div');
// const results = document.createElement('p');
// resultDiv.appendChild(results);
const userContainer = document.querySelector('.user-container');
userContainer.insertAdjacentElement('afterend', resultDiv);
const gameWrapper = document.querySelector('.game-wrapper');

// Creating an Array for making a turn log
let resultsArray = [];
let resultsLog = document.createElement('ul');
resultsLog.classList.add('round-result');
gameWrapper.insertAdjacentElement('beforeend', resultsLog);

function gameLog() {
        var li = document.createElement('li');
        li.textContent = resultsArray[`${resultsArray.length -1}`];
        resultsLog.insertAdjacentElement('afterbegin', li);
}





// Creating a equally random outcome - rock, paper, or scissors
function computerPlay() {
        const number = Math.floor(Math.random() * 1000);
        if (number % 3 === 0) {
                return 'rock';
        }
        if (number % 3 === 1) {
                return 'paper';
        }
        return 'scissors';
}

// Adding animation to the Computer's "Button"
function computerColor(computerSelection) {
        if (computerSelection === 'rock') {
                removeColor();
                computerRock.classList.add('computerPick');
        }
        if (computerSelection === 'paper') {
                removeColor();
                computerPaper.classList.add('computerPick');
        }
        if (computerSelection === 'scissors') {
                removeColor();
                computerScissors.classList.add('computerPick');
        }
}

// Removing color from the Computer's "Button"
function removeColor() {
        computerRock.classList.remove('computerPick');
        computerPaper.classList.remove('computerPick');
        computerScissors.classList.remove('computerPick');
}

// Removing color from the User's "Button"
function removeUserColor() {
        rockButton.classList.remove('userClick');
        paperButton.classList.remove('userClick');
        scissorsButton.classList.remove('userClick');
}

// Adding :hover state to User's Button
function userHover() {
        if (playerScore <= 4 && computerScore <= 4) {
                this.classList.add('userHover');
        }
}

// Removing :hover state from the User's Button
function removeHover() {
        this.classList.remove('userHover');
}

function playGame(playerSelection, computerSelection) {
        playerSelection = this.dataset.button;
        computerSelection = computerPlay();
        removeUserColor(); // Removes any current animation
        this.classList.add('userClick'); // Adds new button animation
        if (
                (playerSelection === 'rock' && computerSelection === 'scissors') ||
                (playerSelection === 'paper' && computerSelection === 'rock') ||
                (playerSelection === 'scissors' &&
                        computerSelection === 'paper' &&
                        (computerScore <= 5 || playerScore <= 5))
        ) {
                // results.textContent = `You won, because ${playerSelection} beats ${computerSelection}.`;
                resultsArray.push(`You won! ${playerSelection} beats ${computerSelection}`);
                playerScore++; // New Score
                userScore.textContent = `${playerScore}`; // Updates Score
                if (playerScore >= 5) {
                        // results.textContent = `Congrats! You won the FINAL ROUND, because ${playerSelection} beats ${computerSelection}. Refresh to try again!`;
                        resultsArray.push(`YOU WON FINAL GAME: ${playerSelection} beats ${computerSelection}`);
                        rockButton.removeEventListener('click', playGame);
                        paperButton.removeEventListener('click', playGame);
                        scissorsButton.removeEventListener('click', playGame);
                }
        } else if (
                (playerSelection === 'rock' && computerSelection === 'paper') ||
                (playerSelection === 'paper' && computerSelection === 'scissors') ||
                (playerSelection === 'scissors' &&
                        computerSelection === 'rock' &&
                        (computerScore <= 5 || playerScore <= 5))
        ) {
                // results.textContent = `You lost, because ${computerSelection} beats ${playerSelection}.`;
                resultsArray.push(`You lost: ${computerSelection} beats ${playerSelection}`);
                computerScore++; // Computer Score
                randomScore.textContent = `${computerScore}`; // Updates Score
                if (computerScore >= 5) {
                        // results.textContent = `You lost the final round, because ${computerSelection} beats ${playerSelection}. GAME OVER, but you can refresh to try again!`;
                        resultsArray.push(`YOU LOST FINAL GAME: ${computerSelection} beats ${playerSelection}.`);
                        rockButton.removeEventListener('click', playGame);
                        paperButton.removeEventListener('click', playGame);
                        scissorsButton.removeEventListener('click', playGame);
                }
        } else {
                // results.textContent = `It's a tie. The computer picked ${computerSelection} too. Try Again!`;
                resultsArray.push(`TIE: Both choose ${computerSelection}`);

        }
        computerColor(computerSelection); // Adds animation for Computer's "Button"
        gameLog();
}

// Removing animation for User's Button
function removeClick() {
        this.classList.remove('userClick');
        this.classList.remove('userHover');
}

// User's Button Event Listener to Play the Game
rockButton.addEventListener('click', playGame);
paperButton.addEventListener('click', playGame);
scissorsButton.addEventListener('click', playGame);

// User's Button Event Listener to remove animation
rockButton.addEventListener('transitionend', removeClick);
paperButton.addEventListener('transitionend', removeClick);
scissorsButton.addEventListener('transitionend', removeClick);

// User's Button Event Listener for :hover state
rockButton.addEventListener('mouseover', userHover);
paperButton.addEventListener('mouseover', userHover);
scissorsButton.addEventListener('mouseover', userHover);

// User's Button Event Listener to remove :hover state
rockButton.addEventListener('mouseleave', removeHover);
paperButton.addEventListener('mouseleave', removeHover);
scissorsButton.addEventListener('mouseleave', removeHover);

// "Computer's Buttons" to remove animation
computerRock.addEventListener('transitionend', removeColor);
computerPaper.addEventListener('transitionend', removeColor);
computerScissors.addEventListener('transitionend', removeColor);

// Change sizes of fonts and imgs in media queries
// add results log
// Make "results" better worded and formated
// Don’t forget to go back and add your new version to the original Rock Paper Scissors Project!
