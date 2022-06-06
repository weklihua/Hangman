/*----- constants -----*/
const MAX_GUESSES = 6
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const GAME_WORD_BANK = ['Xenoblade Chronicles', 'Animal Crossing', 'Super Mario Odyssey', 'Splatoon', 'Monster Hunter Rise', 'Zelda', 'Fire Emblem', 'Super Mario Party', 'Octopath Traveler', 'Bravely Default']

/*----- app's state (variables) -----*/
let chosenLetters, currentNumOfGuesses, secretWord, currentGuess, totalLine


/*----- cached element references -----*/
const keyboard = document.getElementById('keyboard')
//const guessesBoard = document.getElementById('guesses-board')
const currentGuessEl = document.getElementById('guesses-board')


/*----- event listeners -----*/
keyboard.addEventListener('click', handleClick)

/*----- functions -----*/
init()

function init(){
    secretWord = getSecretWord()
    chosenLetters = []
    currentNumOfGuesses = 0
    currentGuess = ''
    generateKeyboard()
    generateLine()
}
function generateLine(){

    for (i=0 ; i < secretWord.length ; i++){
        const underline = document.createElement('div')
        underline.innerText = " "
        underline.classList.add('underline')
        currentGuessEl.appendChild(underline)
        underline.setAttribute("id", i)
    }
}

function getSecretWord() {
    const randomInt = Math.floor(Math.random() * GAME_WORD_BANK.length)
    return GAME_WORD_BANK[randomInt]
}


function generateKeyboard() {
    //generate letter keys
    ALLOWED_LETTERS.forEach(function(letter) {
        const cell = document.createElement('div')
        cell.innerText = letter.toUpperCase()
        cell.classList.add('cell')
        keyboard.appendChild(cell)
    })
    //generates the space key
    const spaceCell = document.createElement('div')
    spaceCell.innerText='SPACE'
    spaceCell.classList.add("wide-cell")
    keyboard.appendChild(spaceCell)
}

function handleClick(evt){

    if(evt.target.innerText === 'SPACE') {
        handleSpace()
        render()
    } else {
        updateCurrentGuess(evt.target.innerText)
        render()
    }
}

function updateCurrentGuess(letter) {
    if (currentGuess.length < secretWord.length){
        //currentGuess += letter
        currentGuess = letter
        console.log(currentGuess)
    }
}

function handleSpace() {
    if (currentGuess.length < secretWord.length){
        //currentGuess += " "
        currentGuess = " "
        console.log(currentGuess)
    }
}


// function render() {
//     //const currentGuessArr = currentGuess.split('')
//     const secretWordArr = secretWord.split('')
//     for(i=0; i < secretWordArr.length; i++) {
//         if (currentGuess === (secretWordArr[i].toUpperCase())){
//             const cell = document.getElementById(i)
//             cell.innerText = secretWordArr[i]
//         } 
//     } 
// }
// let keyboardList = document.querySelectorAll('.cell')
// keyboardList.forEach(function(element){
//     console.log(element.innerText)
// })

function render() {
    //const currentGuessArr = currentGuess.split('')
    const secretWordArr = secretWord.split('')
    const beyboardInnerText = keyboard.innerText
    for(i=0; i < secretWordArr.length; i++) {
        if (currentGuess === (secretWordArr[i].toUpperCase())){
            const cell = document.getElementById(i)
            cell.innerText = secretWordArr[i]
        } else {
            
        }
    } 
}
// let secretWordEl = document.createElement('div')
// for(i=0; i < secretWord.length; i++) {
//     const cell = document.getElementById(i)
//     cell.innerText = currentGuessArr[i]
// }