// Lista med ord
let wordList = ["apple", "banana", "car", "dog", "elephant",
    "flower", "guitar", "house", "ice", "jacket",
    "kite", "lion", "mountain", "notebook", "ocean",
    "pencil", "quilt", "rabbit", "sun", "tree"];


/* ***************************variabler ****************************************************/
const wordDisplay = document.querySelector('.word-display');
let clickedWord;
let wrongGuessCount = 0;
let rightLetter = [];
const maxGuesses = 5;
const guessesText = document.querySelector(".guesses-text b");
const newGamebox = document.querySelector(".newGameBox");
const newgameButton = document.querySelector(".newGame");
const gameReset = () => {
    location.reload(true);

}


/*********************Slumpar Random Ord ******************************************************/
const RandomWord = () => {
    answer = wordList[Math.floor(Math.random() * wordList.length)];
    clickedWord = answer;
    console.log(answer);
    wordDisplay.innerHTML = answer.split('').map(() => `<li class='letter'></li>`).join('');

}



/* ********************Skapar knappar för den virtuella tangentbordet*****************************/

const KeyboardDiv = document.querySelector('.keyboard');

for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.innerText = letter;
    button.classList.add('virtual-key');
    KeyboardDiv.appendChild(button);

    button.addEventListener('click', function () {
        initGame(button, button.innerText);
        button.classList.add('active');
    });
}

// Väljer de virtuella knapparna
const virtualKeys = document.querySelectorAll('.virtual-key');

// Hanterar keydown-händelsen
document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase();

    virtualKeys.forEach(function (virtualKey) {
        if (virtualKey.innerText === key) {
            initGame(virtualKey, key);
            virtualKey.classList.add('active');
        }
    });
});

RandomWord();

newgameButton.addEventListener("click", RandomWord);


/* ****************Initierar spelet när en knapp trycks****************************************** */

document.querySelector(".gameText");

const endGame = (victoriousGame) => {
    newGamebox.classList.add("show");
}

const initGame = (button, clicked) => {
    const clickedLetter = clicked.toLowerCase();

    if (clickedWord.includes(clickedLetter)) {
        [...clickedWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                rightLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
            }
        });
    } else {
        guessesText.innerText = `${wrongGuessCount + 1} / ${maxGuesses}`;
        wrongGuessCount++;
        updateHangman();


    } if (wrongGuessCount > 4) {
        document.getElementById("gameText").innerText = (`du förlorade\, rätta ordet var\: ${clickedWord}`);
        document.getElementById("container").classList = "hide";
        let hangmanGif = document.createElement('img');
        hangmanGif.src = 'https://media.tenor.com/PtfqnCZuIXYAAAAC/kick-chair-hang-self.gif';
        
        
        let newGameBox = document.querySelector('.newGameBox');
        
        newGameBox.appendChild(hangmanGif);
        
        return newGamebox.classList.add("show");
       

    } else if (rightLetter.length === clickedWord.length) {
        document.getElementById("gameText").innerText = (`du vann\, rätta ordet var\: ${clickedWord}`);
    }

    button.disabled = true;

    if (rightLetter.length === clickedWord.length) endGame(true)
}



/* ******************************** Renderar Hangmang.svg***************************************** */
function updateHangman() {
    let arm1Element = document.querySelector(".a1");
    let arm2Element = document.querySelector(".a2");
    let arm3Element = document.querySelector(".a3");
    let arm4Element = document.querySelector(".a4");
    let arm5Element = document.querySelector(".a5");

    if (wrongGuessCount === 0) {
        arm1Element.style.display = "block";
    } else if (wrongGuessCount === 1) {
        arm2Element.style.display = "block";
    } else if (wrongGuessCount === 2) {
        arm3Element.style.display = "block";
    } else if (wrongGuessCount === 3) {
        arm4Element.style.display = "block";
    } else if (wrongGuessCount === 4) {
        arm5Element.style.display = "block";
    }
}
