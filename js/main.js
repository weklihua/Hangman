/*----- constants -----*/
const MAX_GUESSES = 5
const ALLOWED_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const GAME_WORD_BANK = ['stars', 'earth', 'pluto', 'venus', 'astro', 'cosmo', 'comet', 'rings', 'space', 'world', 'alien', 'night', 'cloud', 'plant', 'orbit', 'giant']

/*----- app's state (variables) -----*/
let chosenLetters, currentNumOfGuesses, secretWord, currentGuess, totalLine
let secretWordArr, win, currentWord, secretWordArrExclusive

/*----- cached element references -----*/
const keyboard = document.getElementById('keyboard')
const numberOfguessesLeft = document.getElementById('guesses-lefted')
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
    currentWord = []
    for(i=0; i<secretWord.length; i++){
        currentWord.push('')
    }
    generateKeyboard()
    generateLine()
    secretWordArr = secretWord.toUpperCase().split('')
    
    secretWordArrExclusive = secretWordArr.map(function(value){
        if (value === ' '){
            return ''
        }
        return value
    })
    win = null
}

function isWinning(){
    // const secretWordArrExclusive = secretWordArr.filter(function(value){
    //     return value != ' '
    // })
    if(currentWord.toString() === secretWordArrExclusive.toString()) {
        win = true
    } else if (currentNumOfGuesses < MAX_GUESSES){
        return
    } else if (currentNumOfGuesses >= MAX_GUESSES){
        win = false
    }
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
    //let secretWordArr = secretWord.toUpperCase().split('')
    if(evt.target.innerText === 'SPACE') {
        handleSpace()
        render()
    } else {
        updateCurrentGuess(evt.target.innerText)
        render()
    }
    if (!(secretWordArr.includes(currentGuess))){
        currentNumOfGuesses++
    } else return
}

function updateCurrentGuess(letter) {
    if (currentGuess.length < secretWord.length){
        //currentGuess += letter
        currentGuess = letter.toUpperCase()
        console.log(currentGuess)
        if (!(secretWordArr.includes(currentGuess))){
            currentNumOfGuesses++
        } else return
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
    //let secretWordArr = secretWord.toUpperCase().split('')
    //const beyboardInnerText = keyboard.innerText
 
    // while (currentNumOfGuesses < MAX_GUESSES){
    //     if (!secretWordArr.includes(currentGuess)){
    //         currentNumOfGuesses = currentNumOfGuesses + 1
    //     } 
    //     if (secretWordArr.includes(currentGuess)) {
    //         for(i=0; i < secretWordArr.length; i++) {
    //             if (currentGuess === secretWordArr[i]){
    //                 const cell = document.getElementById(i)
    //                 cell.innerText = secretWordArr[i]
    //              } 
    //             }
    //     }
    // }
    for(i=0; i < secretWordArr.length; i++) {
        if (currentGuess === secretWordArr[i]){
            const cell = document.getElementById(i)
            cell.innerText = secretWordArr[i]
            currentWord[i] = cell.innerText
           
         } 
        }
    
    isWinning()
    if (win === true){
        console.log('Congratulations!')
    }
    if (win === false){
        console.log('loser!')
    } 
    numberOfguessesLeft.innerText = "Number of Guesses Left: " + (MAX_GUESSES - currentNumOfGuesses)


}





         //else if (currentGuess !== (secretWordArr[i].toUpperCase())) {
        //     let keyboardList = document.querySelectorAll('.cell')
        //     keyboardList.forEach(function(element){
        //         if(element.innerText === currentGuess.toUpperCase()){
        //             element.setAttribute("class", "unclickable")
        //         } 
            
        //      })
        

// let secretWordEl = document.createElement('div')
// for(i=0; i < secretWord.length; i++) {
//     const cell = document.getElementById(i)
//     cell.innerText = currentGuessArr[i]
// }