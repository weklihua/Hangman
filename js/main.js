/*----- constants -----*/
const MAX_GUESSES = 6
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const GAME_WORD_BANK = ['alligator', 'bear', 'cheetah', 'deer', 'elephant', 'fox', 'giraffe',
'hippo', 'jaguar', 'kangaroo', 'lion', 'monkey', 'otter', 'penguin', 'rabbit', 'shark', 'tiger', 'wolf', 'yak', 'zebra', 'bee', 'octopus']

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
    generateLine()
    generateKeyboard()
    getSecretWordArrExclusive()
    win = null
    //guessesLeftedEl.innerText = "Number of Guesses Left: 6" 
    imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/0.jpeg?raw=true")
    messageEl.innerText = "Guess what animal I am!"
    document.getElementById('alert').setAttribute('class', "alert alert-info")
    messageEl.style.color = 'rgb(98, 93, 93)'

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
        messageEl.innerText = 'Congratulations, you won!'
        //messageEl.style.color = 'black'
        document.getElementById('alert').setAttribute('class', "alert alert-success")
        keyboard.removeEventListener('click', handleClick)
    } else if (win === false){
        //console.log('loser!')
        messageEl.innerText = 'You lost, try again!'
        //messageEl.style.color = 'black'
        document.getElementById('alert').setAttribute('class', "alert alert-danger")
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
        underline.classList.add('underline')
        currentGuessEl.appendChild(underline)
        underline.setAttribute("id", i)
        underline.innerText = " "
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
        evt.target.classList.add("unclickableSpace")
    } else {
        //evt.target.innerText
        updateCurrentGuess(evt.target.innerText)
        render()
        evt.target.classList.add("unclickable")
    }
}

function updateCurrentGuess(letter) {
   // if (currentGuess.length < secretWord.length){
        //currentGuess += letter
        currentGuess = letter
        //console.log(currentGuess)
        chosenLetters.push(currentGuess)
    //}
}

function handleSpace() {
    if (currentGuess.length < secretWord.length){
        //currentGuess += " "
        currentGuess = " "
        //console.log(currentGuess)
        chosenLetters.push(currentGuess)
    }
}

function render() {
    //update guess board:
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
    getImage()

    //document.getElementById(currentGuess).removeEventListener('click', handleClick)

    // if(MAX_GUESSES >= currentNumOfGuesses){
    //     guessesLeftedEl.innerText = "Number of Guesses Left: " + (MAX_GUESSES - currentNumOfGuesses)
    // }
    isWinning()
}
function getImage(){
    if (currentNumOfGuesses === 0){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/0.jpeg?raw=true")
    } else if (currentNumOfGuesses === 1){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/1.jpeg?raw=true")
    } else if (currentNumOfGuesses === 2){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/2.jpeg?raw=true")
    } else if (currentNumOfGuesses === 3){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/3.jpeg?raw=true")
    } else if (currentNumOfGuesses === 4){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/4.jpeg?raw=true")
    } else if (currentNumOfGuesses === 5){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/5.jpeg?raw=true")
    } else if (currentNumOfGuesses === 6){
        imageEl.setAttribute("src", "https://github.com/weklihua/Hangman/blob/main/image/6.jpeg?raw=true")
    }
}

// document.createElement('div').classList.add('alert alert-success').setAttribute('role', 'alert')
// <div class="alert alert-success" role="alert">
// A simple success alert—check it out!
// </div>

// document.querySelector('.row').appendChild(document.createElement('div').setAttribute("class", "alert alert-success").setAttribute('role', 'alert')) 