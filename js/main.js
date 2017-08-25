
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
var suitInPlay = [];
var score = 0;

var messageDisplay = document.querySelector('#message');
var tallyUp = document.querySelector('#tally');
var resetButton = document.getElementById('reset');

//lays out cards
var createBoard = function(){
  for (var i = 0; i < cards.length; i++){
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  }
};

//flips cards back over
var flipBack = function(){
  var cardElement = document.querySelectorAll('img');
  for (var i = 1; i < cards.length-1; i++){
    cardElement[i].setAttribute('src', 'images/back.png');
  }
};

//return cards to default state
var resetBoard = function() {
  for (var i = 0; i < cards.length; i++){
    var cardElement = document.getElementsByTagName('img');
    cardElement[i].setAttribute('src', 'images/back.png');
    cardsInPlay = [];
    suitInPlay = [];
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
  messageDisplay.textContent = 'Now Match It!';
  cardsInPlay.push(cards[cardId].rank);
  suitInPlay.push(cards[cardId].suit);
  this.setAttribute('src', cards[cardId].cardImage);
  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
  setTimeout(flipBack, 300);
};

//checks for card match
var checkForMatch = function(){
  if (cardsInPlay[0] === cardsInPlay[1] && (suitInPlay[0] !== suitInPlay[1])) {
    messageDisplay.textContent = 'Correct!';
    score += 10;
    tallyUp.textContent = score;
    setTimeout(resetBoard, 320);
    // return;
  }
  else {
    // alert("Sorry, try again.");
    messageDisplay.textContent = 'Try Again...';
    cardsInPlay.pop();
    suitInPlay.pop();
    setTimeout(flipBack, 300);
  }
};

//resets score counter to zero
var resetCount = function() {
  score = 0;
  tallyUp.textContent = score;
};

//creates the board on page load
createBoard();

resetButton.addEventListener('click', resetBoard);
resetButton.addEventListener('click', resetCount);
