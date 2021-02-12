const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const h3 = document.createElement('h3');
const totalHearts = 5;
let missed = 0;
const phrases = [
'New York',
'Santa Claus',
'Zac Efron',
'Web Developer',
'Newport Beach',
'Tom Brady',
'Github', 
'Javascript',
'Santa Barbara',
'John Cena',
'Fast and Furious',
'Mister Rogers',
'Big Bear',
'Orange County',
'Physics',
'Dwayne Johnson',
'Resistance Bands',
'Standing Desk',
'Banana Split',
'Netflix',
'Happy Birthday'
];

let usedPhrases = [];
let currentPhrase = '';

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    let randomNumber = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNumber];

    /*If word has been used already and all words haven't been used, a new word is selected*/
    while (usedPhrases.includes(randomPhrase) && usedPhrases.length !== phrases.length) {
        randomNumber = Math.floor(Math.random() * arr.length);
        randomPhrase = arr[randomNumber]; 
    }

    /*If all words have been used, usedPhrases array is reset*/
    if (usedPhrases.length === phrases.length) {
        usedPhrases = [];
    }

    /*Random Phrase is pushed to Used Phrase Array*/
    usedPhrases.push(randomPhrase);
    currentPhrase = randomPhrase;
    return randomPhrase;
}

const randomPhrase = getRandomPhraseAsArray(phrases);

//adds the letters of a string to the display   
const addPhraseToDisplay = arr => {
        const ul = phrase.firstElementChild;
        //Clear existing display
        ul.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if (li.textContent !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        ul.appendChild(li);
    }
}

addPhraseToDisplay(randomPhrase);

//check if a letter is in the phrase
const checkLetter = button => {
    const ul = phrase.firstElementChild;
    const lis = document.querySelectorAll('ul li');
    let isMatch = null;
    for (let i = 0; i < lis.length; i++) {
        if (button === lis[i].textContent.toLowerCase()) {
            lis[i].classList.add ('show');
            isMatch = true;
        } 
    }
    return isMatch;
}


//check if the game has been won or lost
const checkWin = () => {
    const letter = document.querySelectorAll('.letter');
    const letterTotal = letter.length;
    const show = document.querySelectorAll('.show');
    const showTotal = show.length;

    const startOverlay = document.querySelector('div.start');
    const title = document.querySelector('.title');
    const resetText = 'Reset Game';
   
    if (letterTotal === showTotal) {
        startOverlay.classList.add('win');
        title.textContent = 'You won!!!!!';
        startOverlay.style.display = 'flex';
        startButton.textContent = resetText;
    } else if (missed > 4) {
        startOverlay.classList.add ('lose');
        title.textContent = 'You lost!!!';
        startOverlay.style.display = 'flex';
        startButton.textContent = resetText;
        h3.textContent = `The random phrase was ${currentPhrase}.`;
        title.after(h3);
    }
}

//Create Heart Images   
const createHearts = items => {
    for (let i = 0; i < items; i++) {
        const ol = document.querySelector('ol');
        const li = document.createElement('li');
        const image = document.createElement('img');
        li.classList.add('tries');
        image.src = 'images/liveHeart.png';
        image.height = '35';
        image.width = '30';
        li.appendChild(image);
        ol.appendChild(li);
    }
}

//Reset Game  
const resetGame = () => {
        //Remove show class from display   
        const letterDisplay = document.querySelectorAll('#phrase li');
        for (let i = 0; i < letterDisplay.length; i++) {
            letterDisplay[i].className = '';
        }
        //Remove chosen class from buttons   
        const letterButton = document.querySelectorAll('.keyrow button');
        for (let i = 0; i < letterButton.length; i++) {
            letterButton[i].className = '';
        }
        //Generate random word and add to display
        const randomPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(randomPhrase);

    
         //Reset scoreboard hearts
         const scoreboardOL = document.querySelector('#scoreboard ol'); 
         const tries = document.querySelectorAll('#scoreboard ol li');
         const triesLength = tries.length;
         const heartsToCreate = totalHearts - tries.length;
    
         if (triesLength < heartsToCreate ) {
            createHearts(heartsToCreate );
         }
         //Reset score   
         missed = 0;
         };
      

//listen for the start game button to be pressed   
startButton.addEventListener('click', () => {
    const buttonText = startButton.textContent;
    if (buttonText === 'Start Game') {
        createHearts(5);
    } else if (buttonText === 'Reset Game') {
        resetGame();
    }
    const startScreen = document.querySelector('#overlay');
    startScreen.style.display = 'none';
});

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e=> {
    const button = e.target;
    if (button.nodeName === 'BUTTON' && button.className !== 'chosen') {
        const letter = button.textContent;
        button.className = 'chosen';
        const letterFound = checkLetter(letter);
        const scoreboardOL = document.querySelector('#scoreboard ol');
        const heartToRemove = scoreboardOL.lastElementChild;
        if (!letterFound && heartToRemove) {
            missed ++;
            scoreboardOL.removeChild(heartToRemove); 
        }
        checkWin();
    }
});