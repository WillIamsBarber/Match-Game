var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/


$(document).ready(function(){
var $game = $('#game');
var values = MatchGame.generateCardValues();
MatchGame.renderCards(values, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  /* Created and Array with Duplicate numbers */
 var orderedValues =[];
 for (var value= 1; value <= 8; value++) {
   orderedValues.push(value);
   orderedValues.push(value);
 }
/* var cardValuesLength = cardValues.length;*/
  var cardValues = []; /* variable to store the randomly ordered card Values array */
  while (orderedValues.length > 0) {
    /* create a random whole number using the math.random() method, this is multiplied by the length of the orderedValues which is the length of the array.
    Because math.random generates floating points, Math.floor() selects the larger whole number; 13.9 will become 13 and so on*/
  var randomIndex = Math.floor(Math.random() * orderedValues.length);
  /* Create a variable to store the randomly generated index value of the ordered value array, remove that one element from the array hence preventing the loop from being infinit
  and access the first element*/
  var randomValue = orderedValues.splice(randomIndex, 1)[0];
  /*Generate the cardValues array using the random value*/
  cardValues.push(randomValue);
  }
  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
/* First create a variable to store the game object then, Remove all contents of the $game object in html*/
var cardColors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
$game.empty();
/*This keeps tracked of the flipped cards and initially set to an empty array*/
$game.data('flippedCards', []);
/* A for loop to loop through each cardValue and store it in a value called cardValueIndex*/
for (var cardValueIndex = 0; cardValueIndex < cardValues.length; cardValueIndex++) {
/* Create a jquery object using the same html code used to make each card */
var $cardElement = $('<div class="col-xs-3 card"></div>');
/* Create a variable to store the value of the current card index of the card value array*/
var value = cardValues[cardValueIndex];
/*We set the color my matching the cards value to the storedcard color position in the cardColor array to the corresponding cardValue.
Since the cardColor array is 0 indexed (0-7) and the cardValue goes from 1-8, we need to subtract 1 from the value. */
var color = cardColors[value-1];
/*we create the data object by specifying what value we want to assign or store*/
var data = {
  value: value,
  cardFlipped: false, /*attribute to determine if card is flipped*/
  color: color /* data attribute to store the cards color*/
};
/* Store a data oject using the .data() method on cardELement, objects are avriables that can contain many values, so above we specify what value we want
in this case the current card index in the cardValue array */
$cardElement.data(data);
console.log($cardElement.data('value'), $cardElement.data('color') );
/* The line of code below adds all the additional data attributes and values to the $cardElement jquery element;
this object initially only contained the code for creating each card.*/
$game.append($cardElement)
}
$('.card').click(function(){
  MatchGame.flipCard($(this), $('#game'));
})
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  /* Conditional if clause to return nothing if the card is already flipped*/
  if ($card.data('cardFlipped')) {
    return;
  }
  /* Modify card characteristics when card is not flipped, i.e the stored background color, the text value on the card and
   the card flipped state from false to true */
  $card.css('background-color', $card.data('color'))
  .text($card.data('value'))
  .data('cardFlipped', true);

/*We then want to pass the value of the flipped cards into the empty array we created in the .renderCards() function
for easy reading we just store than in a variable */
  var flippedCards = $game.data('flippedCards');
  /* use the push() method to update the flipped cards array */
  flippedCards.push($card);
  /* check to see if two cards have been flipped */
  if (flippedCards.length === 2) {
    /* If two cards are flipped, do the cards have the same value? */
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      /*create an object to store the css properties for matched cards*/
        var matchCardCSS = {
            background: 'rgb(153, 153, 153)',
            color: 'rgb(204, 204, 204)'
        }
      /* Assign the matched Cards properties to each element in the flipped card array with a length of 2 elements*/
          flippedCards[0].css(matchCardCSS);
          flippedCards[1].css(matchCardCSS);
    }
    /* Return the cards to the default values or state if the above condition isnt statisfied after a delay of 350ms */
    else {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];

        window.setTimeout(function(){
          card1.css('background-color', 'rgb(32, 64, 86)').text('').data('cardFlipped', false);
          card2.css('background-color', 'rgb(32, 64, 86)').text('').data('cardFlipped', false);
        }, 350)

    }
  $game.data('flippedCards', []); /*reset flipped cards back to an empty array reagradless of either above conditions being met*/
  }
};
