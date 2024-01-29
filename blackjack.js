var dealerSum = 0;
var playerSum = 0;
var money = 100;

var dealerAce = 0;
var playerAce = 0;

var faceDownCard;
var deckStack;
var double;

let deck = ["A", "A", "A", "A", "2", "2", "2", "2", "3", "3", "3", "3",
    "4", "4", "4", "4", "5", "5", "5", "5", "6", "6", "6", "6", "7", "7", "7", "7",
    "8", "8", "8", "8", "9", "9", "9", "9", "10", "10", "10", "10", "J", "J", "J", "J",
    "Q", "Q", "Q", "Q", "K", "K", "K", "K"];

window.onload = function() {
    shuffleDeck();
    startGame();
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    faceDownCard = deck.pop();
    dealerSum += getValue(faceDownCard);
    dealerAce += checkAce(faceDownCard);

    while (dealerSum < 17) {
        let cardPicture = document.createElement("img");
        let card = deck.pop();
        cardPicture.src = "/card-images/" + card[0] + ".png";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardPicture);
        if (dealerSum + getValue(card) >= 17) {
            break;
        }
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardPicture = document.createElement("img");
        let card = deck.pop();
        cardPicture.src = "/card-images/" + card[0] + ".png";
        playerSum += getValue(card);
        playerAce += checkAce(card);
        document.getElementById("player-cards").append(cardPicture);
    }
    console.log(playerSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("reset").addEventListener("click", reset);
}

function hit() {
    let cardPicture = document.createElement("img");
    let card = deck.pop();
    cardPicture.src = "/card-images/" + card[0] + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardPicture);

    if (reduceAce(playerSum, playerAce) >= 21) {
        stand();
    }
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAce);
    playerSum = reduceAce(playerSum, playerAce);

    document.getElementById("faceDownCard").src = "/card-images/" + faceDownCard[0] + ".png";

    let text = "";
    if (playerSum > 21) {
        text = "Player Bust."
        if (double) {
            money -= 10;
        }
    }
    else if (dealerSum > 21) {
        text = "Dealer Bust."
        if (double) {
            money += 10;
        }
    }
    else if (playerSum == dealerSum) {
        text = "Push."
    }
    else if (dealerSum > playerSum) {
        text = "Dealer Win."
        if (double) {
            money -= 10;
        }
    }
    else {
        text = "Player Win."
        if (double) {
            money += 10;
        }
    }

    document.getElementById("dealer-sum").innerText = dealerSum + " points";
    document.getElementById("player-sum").innerText = playerSum + " points";
    document.getElementById("round-message").innerText = text;
}

function getValue(card) {
    let number = card[0];
    if (isNaN(number)) {
        if (number == 'A') {
            return 11;
        }
        else {
            return 10;
        }
    }
    return parseInt(number);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    else {
        return 0;
    }
}

function reduceAce(playerSum, playerAce) {
    while (playerSum > 21 && playerAce > 0) {
        playerSum -= 10;
        playerAce -= 1;
    }
    return playerSum;
}

function reset() {
    location.reload();
}
