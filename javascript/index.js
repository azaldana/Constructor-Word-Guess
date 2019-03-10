var Word = require("./word.js");
var inquirer = require("inquirer");

var singleLetters = "abcdefghijklmnopqrstuvwxyz";

var wordList = ["horse", "dog", "monkey", "rhino", "lizard", "snake", "lion", "cheetah", "zebra", "giraffe", "elephant", "penguin", "baboon", "dolphin"];

var randomIndex = wordList[Math.floor(Math.random() * wordList.length)];

console.log("random index", randomIndex);

var computerWord = new Word(randomIndex);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 15;

function playGame(){
    if (requireNewWord === true){
        var randomIndex = Math.floor(Math.random() * wordList.length);

        computerWord = new Word(randomIndex);

        requireNewWord = false;
    } 
        
    var wordComplete = [];
    computerWord.letterArray.forEach(completeCheck);

    if (wordComplete.includes(false)){
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter from A to Z",
                name: "userinput"
            }
        ]).then(function(input){

            if(!singleLetters.includes(input.userinput) || 
            input.userinput.length > 1){
                console.log("Please try again");
                playGame();
            } else if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || 
                input.userinput === ""){
                    console.log("That letter has already been guessed. Try Again");
                    playGame();
                } else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.letterArray.forEach(wordCheck);

                    if (wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n");
                        incorrectLetters.push(input.userinput);
                        guessesLeft--;
                    } else {
                        console.log("\nCorrect!\n");
                        correctLetters.push(input.userinput);
                        guessesLeft--;
                    }
                    computerWord.createWordString();

                    console.log("Guesses Left: " + guessesLeft + "\n");
                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    if (guessesLeft > 0){
                        playGame();
                    } else {
                        console.log("Sorry you've lost");
                        restartGame();
                    }

                    function wordCheck(key){
                        wordCheckArray.push(key.guessedLetter);
                    }
                }

        })
    } else {
        console.log("You Win! \n");
        restartGame();
    }

    function completeCheck(key){
        wordComplete.push(key.guessedLetter);
    }
}

function restartGame(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to keep playing?",
            name: "restart"
        }
    ]).then(function(response){
        if (response.restart){
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 15;
            playGame();
            
        } else {
            console.log("Okay thanks for playing!");
        }
    })
}

playGame();

// console.log("\n");
// console.log("====================================");
// console.log("THINK YOU CAN GUESS THE SECRET WORD?");
// console.log("\n");

// inquirer
//     .prompt([
//         // Here we create a basic text prompt.
//         {
//             type: "confirm",
//             message: "Type yes to give it a shot!",
//             name: "play",
//             default: true
//         }
//     ])

//     .then(function (response) {
//         // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//         if (response.play) {
//             newGame();
//             guessLetter();
//             // checkLetters(letterGuessed);
//             // roundComplete();
//         }
//         else {
//             console.log("\nThat's okay, maybe next time.\n");
//         }
//     })

// function newGame() {
//     guessesLeft = 15;
//     chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
//     finalWord = new Word(chosenWord);
//     // lettersInChosenWord = chosenWord.split("");
//     numBlanks = finalWord.letterArray.length;

//     console.log(guessLetter);

// }

// function restartGame() {
//     console.log("Game Over");

//     inquirer
//         .prompt([
//             // Here we create a basic text prompt.
//             {
//                 type: "confirm",
//                 message: "Would you like to play again?",
//                 name: "confirm",
//                 default: true
//             }
//         ])

//         .then(function (response) {
//             // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//             if (response.confirm) {
//                 newGame();
//                 checkLetters(letterGuessed);
//                 roundComplete();
//             }
//             else {
//                 console.log("\nThat's okay. See you around!\n");
//             }
//         })

// }

// function displayWord() {
//     var displayWord = finalWord.createWordString();
//     console.log(displayWord);
//     finalWord.compare.displayWord;
// }

// function guessLetter() {
//     inquirer
//         .prompt([
//             // Here we create a basic text prompt.
//             {
//                 type: "input",
//                 message: "Guess a letter!",
//                 name: "guess"
//             }])

//         .then(function (response) {
//             var input = response.guess;

//             if (input.length === 1) {
//                 finalWord.correctGuess(input)
//                 displayWord = finalWord.createWordString()


//                 if (finalWord.compare === displayWord) {
//                     console.log("Try again!");
//                     guessesLeft--;
//                     console.log("You have " + guessesLeft + "guesses left.");

//                     if (guessesLeft === 0) {
//                         restartGame();
//                     } else {
//                         guessLetter();
//                     }

//                 } else {
//                     console.log("Correct!");
//                     guessesLeft--;

//                     if (guessesLeft === 0) {
//                         console.log("Great Job!");
//                         newGame();
//                         guessLetter();

//                     } else {
//                         guessLetter();
//                     }
//                 }
//             } else if (input.length === 0) {
//                 console.log("Please choose a letter");
//                 guessLetter();
//             } else {
//                 console.log("Please choose one letter at a time");
//                 guessLetter();
//             }
//         })
// }

// newGame();
// guessLetter();


// function checkLetters(letter) {
//     var letterInWord = false;

//     for (var i = 0; i < numBlanks; i++) {
//         if (chosenWord[i] === letter) {
//             letterInWord = true;
//         }
//     }

//     if (letterInWord) {
//         for (var i = 0; i < numBlanks; i++) {
//             if (chosenWord[i] === letter) {
//                 blanksAndSuccesses[i] = letter;
//             }
//         }
//         console.log(blanksAndSuccesses);
//     }
//     else {
//         wrongGuesses.push(letter);
//         guessesLeft--;
//     }
// }

// function roundComplete() {
//     console.log("Guesses Left: " + guessesLeft);

//     console.log(blanksAndSuccesses.join(" "));

//     console.log(wrongGuesses.join(" "));

//     if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
//         console.log("You Win!")
//         restartGame();
//     } else if (guessesLeft === 0) {
//         console.log("Sorry, you lost");
//         restartGame();
//     }

// }



// index.js: The file containing the playGame for the course of the game, which depends on Word.js and:


// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses