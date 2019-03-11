var Letter = require("./letter.js");


function Word(word){
    this.letterArray = [];

    for (var i = 0; i < word.length; i++) {
        var letter = new Letter(word[i]);
        this.letterArray.push(letter);
    }

    this.createWordString = function(){
        chosenWord = "";

        for (var i =0; i < this.letterArray.length; i++){
            chosenWord += this.letterArray[i] + " ";
        }

        console.log(chosenWord);
        console.log("\n");
    }

    this.userGuess = function(input){
        for (var i =0; i < this.letterArray.length; i++){
            this.letterArray[i].guess(input);
        }
    }
}

module.exports = Word;

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:


// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)