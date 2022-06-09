# Game: Hangman

Rules of Hangman: If a player makes a correct guess of the secret word within six guesses, the player wins; otherwise, the player loses.

## Screenshot:

<img width="714" alt="Screen Shot 2022-06-08 at 7 53 13 PM" src="https://user-images.githubusercontent.com/105599499/172756524-a3880140-049d-4141-88bd-e8f896093954.png">

## Technologies Used:
JavaScript, HTML, CSS

## Getting Started:
Link: https://weklihua.github.io/Hangman/

## Next Steps: 
Add more comments to JS.

## Pseudocode: 

```
1.	Define required constants:
	1)	Define the maximum number of guesses
	2)	Define the letters in keyboard
	3)	Define the word bank
2.	 Define required variables used to track the state of the game:
	1)	Define the random secret word
	2)	Define the current guess 
	3)	Define the current number of guesses
	4)	Define the chosen letters
3.	Cached the element reference
	1)	Store the keyboard element
	2)	Store the guessing board
	3)	Store the hangman image
	4)	Store the replay button
4.	Upon loading the game should:
	1)	Initialize the state variables:
		1.1)	Generate a secret word randomly from the word bank
		1.2)	Initialize the guess board to be null
		1.3)	Initialize the current guess length to be the same as the secret word
		1.4)	Initialize the current number of guesses to be zero
		1.5)	Render the board
	2)	Render those state variables to the page:
		1.1)	Render the guess board and the keyboard:
			1.1.1)	Click the keyboard to select a letter and make a guess. If the letter is contained within the secret word, the letter will show up in the right position; if the letter is not contained within the secret word, the letter will not show up in current guess. 
			1.1.2)	In both cases, the letter cannot be clicked again in the keyboard.
		1.2)	Render the hangman:
			1.1.1)	For each wrong letter guessed, each part of the hangman will appear in order: head, body, left arm, right arm, left leg, and right leg.
		1.3)	Handle a player clicking the replay button:
			1.1.1)	Initialize the game again

```

## Wireframe:

<img width="316" alt="image" src="https://user-images.githubusercontent.com/105599499/172204230-33202a1f-7fb3-40ec-899d-026ae79215ed.png">

## Helpful links:

Examples of Hangman game: https://hangmanwordgame.com/?fca=1&success=0#/


	
