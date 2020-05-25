// porządki w kodzie!

class Player  {
    constructor(name, points) {
      this.name = name;
      this.points = points;
    }
}

const cards = Array.from(document.querySelectorAll(".card"));
let cardsFromThisTurn = new Array();
let playerText1 = document.querySelector(".player1");
let playerText2 = document.querySelector(".player2");

function shuffleCards() {
    var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    for (var card of cards) {
        numbers = Array.from(numbers);
        var number = numbers[Math.floor(Math.random() * numbers.length)];
        var numberIndex = numbers.indexOf(number);
        card.classList.add("pair" + number);
        if (numberIndex > -1) {
            numbers.splice(numberIndex, 1);
        }  
    }
}

function displayCard() {
    this.classList.toggle("closed");
    this.classList.toggle("disabled");
}

function makeMove() {
    cardsFromThisTurn.push(this);
    if (cardsFromThisTurn.length === 2) {
        if (getComputedStyle(cardsFromThisTurn[0]).backgroundImage === getComputedStyle(cardsFromThisTurn[1]).backgroundImage) {
            
            console.log("It was won turn of " + window.currentPlayer.name + "with points " + window.currentPlayer.points + " +2");
            handleWonTurn()
            console.log(window.cardsToGuess + " cards to guess left");
        } else {
            
            console.log("It was lost turn of " + window.currentPlayer.name + "with points " + window.currentPlayer.points);
            handleLostTurn()
            console.log(window.cardsToGuess + " cards to guess left");
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
    cardsFromThisTurn[0].classList.remove("disabled");
    cardsFromThisTurn[1].classList.remove("disabled");
    cardsFromThisTurn[0].classList.add("closed");
    cardsFromThisTurn[1].classList.add("closed");

    cardsFromThisTurn.length = 0;
    changePlayer();
}

function changePlayer() {
    window.currentPlayer = (window.currentPlayer === player1) ? window.player2 : window.player1;
    changePlayerDisplay();
}

function changePlayerDisplay() {
    playerText1.classList.toggle("current-player");
    playerText2.classList.toggle("current-player");
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

function checkIfGameEnded() {
    if (window.cardsToGuess <= 0) {
        announceWinner();
    }
}

function announceWinner() {
    if (window.player1.points > window.player2.points) {
        console.log("Winner is " + window.player1.name)
    } else if (window.player2.points > window.player1.points) {
        console.log("Winner is " + window.player2.name)
    } else {
        console.log("It's a tie!");
    }
}

function handleClick() {
    for (var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", displayCard);
        cards[i].addEventListener("click", makeMove);
    };
}

function startGame() {
    window.player1 = new Player("player1", 0);
    window.player2 = new Player("player2", 0);
    window.currentPlayer = player1;
    window.cardsToGuess = cards.length;
    shuffleCards();
    updatePointsOnBoard();
    handleClick();
}

window.addEventListener("load", startGame());

// podpiąć button play agsin