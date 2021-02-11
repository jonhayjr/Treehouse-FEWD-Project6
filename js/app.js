const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let missed = 0;
const phrases = [
'New York',
'Santa Claus',
'Professor',
'Javascript',
'Rocky Balboa'
];

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    return randomPhrase;
}

const randomPhrase = getRandomPhraseAsArray(phrases);


//adds the letters of a string to the display   
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const ul = phrase.firstElementChild;
        li.textContent = arr[i];
        if (li !== '') {
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

    if (letterTotal === showTotal) {
        startOverlay.className = 'win';
        title.textContent = 'You won!!!!!';
        startOverlay.style.display = 'flex';
    } else if (missed > 4) {
        startOverlay.className = 'lose';
        title.textContent = 'You lost!!!';
        startOverlay.style.display = 'flex';
    }
}


//listen for the start game button to be pressed   
startButton.addEventListener('click', () => {
    const startScreen = document.querySelector('#overlay');
    startScreen.style.display = 'none';
});

//list for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e=> {
    const button = e.target;
    if (button.nodeName === 'BUTTON' && button.className !== 'chosen') {
        const letter = button.textContent;
        button.className = 'chosen';
        const isMatch = checkLetter(letter);
        if (!isMatch) {
            const ol = document.querySelector('ol');
            const lastHeart = ol.lastElementChild;
            missed ++;
            if (lastHeart) {
                ol.removeChild(lastHeart); 
            }
        }
        checkWin();
    }
});

