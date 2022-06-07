/*----- constants -----*/
const MAX_GUESSES = 6
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const GAME_WORD_BANK = ['stars', 'earth', 'pluto', 'venus', 'astro', 'cosmo', 'comet', 'rings', 'space', 'world', 'alien', 'night', 'cloud', 'plant', 'orbit', 'giant']

/*----- app's state (variables) -----*/
let chosenLetters, currentNumOfGuesses, secretWord, currentGuess, totalLine
let secretWordArr, win, currentWord, secretWordArrExclusive

/*----- cached element references -----*/
const keyboard = document.getElementById('keyboard')
//const guessesBoard = document.getElementById('guesses-board')
const currentGuessEl = document.getElementById('guesses-board')
const resetButton = document.getElementById('button')
const guessesLeftedEl = document.getElementById("guesses-lefted")
const messageEl = document.getElementById("message")
const imageEl = document.querySelector("img")

/*----- event listeners -----*/
resetButton.addEventListener('click', init)


/*----- functions -----*/
init()

function init(){
    keyboard.addEventListener('click', handleClick)
    secretWord = getSecretWord()
    secretWordArr = secretWord.toUpperCase().split('')
    chosenLetters = []
    currentNumOfGuesses = 0
    currentGuess = ''
    currentWord = []
    generateKeyboard()
    generateLine()
    getSecretWordArrExclusive()
    win = null
    guessesLeftedEl.innerText = "Number of Guesses Left: 6" 
}

function getCurrentWord(){
    for(i=0; i<secretWord.length; i++){
        currentWord.push('')
    }
}
function getSecretWordArrExclusive(){
    secretWordArrExclusive = secretWordArr.map(function(value){
        if (value === ' '){
            return ''
        }
        return value
    })   
}

function isWinning(){
    if(currentWord.toString() === secretWordArrExclusive.toString()) {
        win = true
    } else if (currentNumOfGuesses < MAX_GUESSES){
        return
    } else if (currentNumOfGuesses >= MAX_GUESSES){
        win = false
    }
    if (win === true){
        //console.log('Congratulations!')
        messageEl.innerText = 'Congratulations!'
        keyboard.removeEventListener('click', handleClick)
    } else if (win === false){
        //console.log('loser!')
        messageEl.innerText = 'Loser!'
        keyboard.removeEventListener('click', handleClick)
    } else if (win === null) {
        return
    }
}

function generateLine(){
    while(currentGuessEl.firstElementChild) {
        currentGuessEl.removeChild(currentGuessEl.firstElementChild)
    }
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
    while(keyboard.firstElementChild) {
        keyboard.removeChild(keyboard.firstElementChild)
    }
    //keyboard.removeChild('div')
    //generate letter keys
    ALLOWED_LETTERS.forEach(function(letter) {
        const cell = document.createElement('div')
        cell.innerText = letter.toUpperCase()
        //cell.classList.add('cell')  
        cell.setAttribute("class", "cell")
        cell.setAttribute("id", cell.innerText) 
        keyboard.appendChild(cell)
    })
    //generates the space key
    const spaceCell = document.createElement('div')
    spaceCell.innerText='SPACE'
    //spaceCell.classList.add("wide-cell")
    spaceCell.setAttribute("class", "wide-cell")
    spaceCell.setAttribute("id", spaceCell.innerText)
    keyboard.appendChild(spaceCell)
}

function handleClick(evt){
    if (chosenLetters.includes(evt.target.innerText) ){
        return
    }
    //let secretWordArr = secretWord.toUpperCase().split('')
    if(evt.target.innerText === 'SPACE') {
        handleSpace()
        render()
        evt.target.classList.add("unclickable")
    } else {
        updateCurrentGuess(evt.target.innerText)
        render()
        evt.target.classList.add("unclickable")
    }
}

function updateCurrentGuess(letter) {
   // if (currentGuess.length < secretWord.length){
        //currentGuess += letter
        currentGuess = letter
        console.log(currentGuess)
        chosenLetters.push(currentGuess)
    //}
}

function handleSpace() {
    if (currentGuess.length < secretWord.length){
        //currentGuess += " "
        currentGuess = " "
        console.log(currentGuess)
        chosenLetters.push(currentGuess)
    }
}

function render() {
    
    for(i=0; i < secretWordArr.length; i++) {
        if (currentGuess === secretWordArr[i]){
            const cell = document.getElementById(i)
            cell.innerText = secretWordArr[i]
            currentWord[i] = cell.innerText
           
         } 
        }
    if (!(secretWordArr.includes(currentGuess))){
        currentNumOfGuesses++
    }

    document.getElementById(currentGuess).removeEventListener('click', handleClick)

    if(MAX_GUESSES >= currentNumOfGuesses){
        guessesLeftedEl.innerText = "Number of Guesses Left: " + (MAX_GUESSES - currentNumOfGuesses)
    }
    isWinning()
    // if (win === true){
    //     //console.log('Congratulations!')
    //     messageEl.innerText = 'Congratulations!'
    //     keyboard.removeEventListener('click', handleClick)
    // } else if (win === false){
    //     //console.log('loser!')
    //     messageEl.innerText = 'Loser!'
    //     keyboard.removeEventListener('click', handleClick)
    // } else if (win === null) {
    //     return
    // }
    getImage()

}
function getImage(){
    if (currentNumOfGuesses === 1){
        imageEl.setAttribute("src", "https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/images/1.jpg?raw=true")
    } else if (currentNumOfGuesses === 2){
        imageEl.setAttribute("src", "https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/images/2.jpg?raw=true")
    } else if (currentNumOfGuesses === 3){
        imageEl.setAttribute("src", "https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/images/3.jpg?raw=true")
    } else if (currentNumOfGuesses === 4){
        imageEl.setAttribute("src", "https://github.com/simonjsuh/Vanilla-Javascript-Hangman-Game/blob/master/images/4.jpg?raw=true")
    } else if (currentNumOfGuesses === 5){
        imageEl.setAttribute("src", "")
    } else if (currentNumOfGuesses === 6){
        imageEl.setAttribute("src", "")
    }
}