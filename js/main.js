
var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];

var cardsInPlay = [];
var messageDisplay = document.querySelector('#message');
var score = 0;
var tallyUp = document.querySelector('#tally');

var createBoard = function(){
  for (var i = 0; i < cards.length; i++){
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener('click', flipCard);

    document.getElementById('game-board').appendChild(cardElement);
  }
};

//return cards to default state
var resetBoard = function() {
  for (var i = 0; i < cards.length; i++){
    var cardElement = document.getElementsByTagName('img');
    cardElement[i].setAttribute('src', 'images/back.png');
    cardsInPlay = [];
    messageDisplay.textContent = "Pick a Card";
    shuffleArray(cards);
  }
};


//shuffles the order of cards displayed
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//flips cards, checks card count
var flipCard = function(){
  var cardId = this.getAttribute('data-id');
  console.log("User flipped " + cards[cardId].rank);
  messageDisplay.textContent = 'Now Match It!';
  cardsInPlay.push(cards[cardId].rank);
  console.log(cards[cardId].cardImage);
  this.setAttribute('src', cards[cardId].cardImage);
  if (cardsInPlay.length === 2) {
    checkForMatch();
  }

};

//checks for card match
var checkForMatch = function(){
  if (cardsInPlay[0] === cardsInPlay[1]) {
    // alert("You found a match!");
    messageDisplay.textContent = 'Correct!';
    score += 10;
    tallyUp.textContent = score;
    setTimeout(resetBoard, 800);
  }
  else {
    // alert("Sorry, try again.");
    messageDisplay.textContent = 'Try Again...';
    cardsInPlay.pop();
  }
};

var resetCount = function() {
  score = 0;
  tallyUp.textContent = score;
};

createBoard();

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetBoard);
resetButton.addEventListener('click', resetCount);
