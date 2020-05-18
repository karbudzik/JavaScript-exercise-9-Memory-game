var cards = document.querySelectorAll(".card");
cards = Array.from(cards);
var cardsFromThisTurn = new Array();

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
    console.log("start");
    cardsFromThisTurn.push(this);
    console.log(cardsFromThisTurn);
    if (cardsFromThisTurn.length === 2) {
        console.log("Są dwie karty");
        if (getComputedStyle(cardsFromThisTurn[0]).backgroundImage === getComputedStyle(cardsFromThisTurn[1]).backgroundImage) {
            handleWonTurn()
        } else {
            handleLostTurn()
        }
    }
}


function startGame() {
    shuffleCards();
    handleClick();
}

window.addEventListener("load", startGame());
