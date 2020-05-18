var cards = document.querySelectorAll(".card");
cards = Array.from(cards);

function addClassesToCards() {
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
    };
}

var displayCard = function (){
    this.classList.toggle("closed");
    this.classList.toggle("disabled");
    console.log("ggg");
}

addClassesToCards();
handleClick();