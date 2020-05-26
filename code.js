// custom-made objects:

class Player  {
    constructor(name, points) {
      this.name = name;
      this.points = points;
    }
}

// global variables:

const cards = Array.from(document.querySelectorAll(".card"));
let cardsFromThisTurn = new Array();
let playerText1 = document.querySelector(".player1");
let playerText2 = document.querySelector(".player2");

// functions:

window.addEventListener("load", playGame);

function playGame() {
    resetScoreAndPlayers();
    clearScreen();
    shuffleCards();
    updatePointsOnBoard();
    handleClick();
}

function resetScoreAndPlayers() {
    window.player1 = new Player("player1", 0);
    window.player2 = new Player("player2", 0);
    window.currentPlayer = player1;
    window.cardsToGuess = cards.length;
}

function clearScreen() {
    hideResultMessage();
    makeCardsPlayable();
}

function hideResultMessage() {
    document.querySelector(".message").classList.add("hidden-message");
}

function makeCardsPlayable() {
    for (var i = 0; i < cards.length; i++){
        cards[i].classList.add("closed");
        cards[i].classList.remove("used");
        cards[i].classList.remove("disabled");
    };
}

function shuffleCards() {
    var numbers = Array.from([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]);
    for (var card of cards) {
        var number = numbers[Math.floor(Math.random() * numbers.length)];
        var numberIndex = numbers.indexOf(number);
        card.classList.add("pair" + number);
        if (numberIndex > -1) {
            numbers.splice(numberIndex, 1);
        }  
    }
}

function updatePointsOnBoard() {
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let score1 = document.createTextNode(window.player1.points);
    let score2 = document.createTextNode(window.player2.points);
    span1.appendChild(score1);
    span2.appendChild(score2);    
    playerText1.replaceChild(span1, playerText1.querySelector("span"));
    playerText2.replaceChild(span2, playerText2.querySelector("span"));
}

function handleClick() {
    for (var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", displayCard);
        cards[i].addEventListener("click", makeMove);
    };
}

function displayCard() {
    this.classList.toggle("closed");
    this.classList.toggle("disabled");
}

function makeMove() {
    cardsFromThisTurn.push(this);
    if (cardsFromThisTurn.length === 2) {
        if (getComputedStyle(cardsFromThisTurn[0]).backgroundImage === getComputedStyle(cardsFromThisTurn[1]).backgroundImage) {
            handleWonTurn()
        } else {
            handleLostTurn()
        }
    }
}

function handleWonTurn() {
    cardsFromThisTurn[0].classList.add("used");
    cardsFromThisTurn[1].classList.add("used");
    window.currentPlayer.points += cardsFromThisTurn.length;
    window.cardsToGuess -= cardsFromThisTurn.length;
    cardsFromThisTurn.length = 0;
    checkIfGameEnded();
    updatePointsOnBoard();
}

function handleLostTurn() {
    for (var i = 0; i < cardsFromThisTurn.length; i++) {
        cardsFromThisTurn[i].classList.remove("disabled");
        cardsFromThisTurn[i].classList.add("closed");
    }
    cardsFromThisTurn.length = 0;
    changePlayer();
}

function checkIfGameEnded() {
    if (window.cardsToGuess <= 0) {
        handleGameEnd();
    }
}

function changePlayer() {
    window.currentPlayer = (window.currentPlayer === player1) ? window.player2 : window.player1;
    changePlayerDisplay();
}

function changePlayerDisplay() {
    playerText1.classList.toggle("current-player");
    playerText2.classList.toggle("current-player");
}

function handleGameEnd() {
    showMessage(getMessage());
    offerToTryAgain();
}

function getMessage() {
    let message;
    if (window.player1.points > window.player2.points) {
        message = `Winner is ${window.player1.name} !`;
    } else if (window.player2.points > window.player1.points) {
        message = `Winner is ${window.player2.name} !`;
    } else {
        message = "It's a tie!"
    }
    return message;
}

function showMessage(message) {
    document.querySelector(".message-content").innerText = message;
    document.querySelector(".message").classList.remove("hidden-message");
}

function offerToTryAgain() {
    let tryAgainButton = document.querySelector("#try-again-button");
    tryAgainButton.addEventListener("click", playGame);
}




// wyświetlanie komunikatu
// podpiąć button play agsin
// formatowanie stringów
// consol logi usunąć