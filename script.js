const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip"); // open card
        if (!cardOne) { // clicked on card one
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard; // clicked on card two
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) { // if cards matched
        matched++; // accumulate cards matched
        if (matched == 8) { // game complete
            setTimeout(() => {
                Swal.fire( // alert
                    'Congratulations!',
                    getRandomQuotes(), // random quote
                    'success'
                );
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard); // remove action click
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => { // shake card
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => { // then close card
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0; // back to default
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // core to shuffle
    cards.forEach((card, i) => { // reset all cards
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function getRandomQuotes() {
    const quotes = [
        "You are unstoppable!",
        "Cheers to you!",
        "I knew you could do it!",
        "You did it! So proud of you!",
        "I knew it was only a matter of time. Well done!",
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length); // get random index value
    const quote = quotes[randomIndex]; // get random quote
    return quote;
}

// onload
shuffleCard(); // game start

cards.forEach(card => {
    card.addEventListener("click", flipCard); // add action click
});