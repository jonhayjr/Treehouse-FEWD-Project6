const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let missedGuesses = 0;
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



}

//check if the game has been won or lost
const checkWin = () => {


}

//listen for the start game button to be pressed   
startButton.addEventListener('click', () => {
    const startScreen = document.querySelector('#overlay');
    startScreen.style.display = 'none';
});

//list for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e=> {
    
});
