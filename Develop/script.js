var specialCharacters = ["@", "%", "+", "-", "*", "[", "]", "~", ".", "/", "?", "!", "\\"];
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var lowerCaseCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperCaseCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


function getPasswordOptions() {
    var length = parseInt(prompt("How many characters would you like?"), 10);

    if (isNaN(length) || length < 8 || length > 128) {
        alert("Password length must be a number between 8 and 128.");
        return null;
    }

    var hasSpecialCharacters = confirm("Click OK to confirm including special characters");
    var hasNumericCharacters = confirm("Click OK to confirm including numeric characters");
    var hasLowerCaseCharacters = confirm("Click OK to confirm including lowercase characters");
    var hasUpperCaseCharacters = confirm("Click OK to confirm including uppercase characters");

    if (!(hasSpecialCharacters || hasNumericCharacters || hasLowerCaseCharacters || hasUpperCaseCharacters)) {
        alert("Must select at least one character type.");
        return null;
    }

    return {
        length: length,
        hasSpecialCharacters: hasSpecialCharacters,
        hasNumericCharacters: hasNumericCharacters,
        hasLowerCaseCharacters: hasLowerCaseCharacters,
        hasUpperCaseCharacters: hasUpperCaseCharacters
    };
}


function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function generatePassword() {
    var options = getPasswordOptions();
    if (!options) return null;

    var possibleCharacters = [];
    var guaranteedCharacters = [];

    if (options.hasSpecialCharacters) possibleCharacters = possibleCharacters.concat(specialCharacters);
    if (options.hasNumericCharacters) possibleCharacters = possibleCharacters.concat(numericCharacters);
    if (options.hasLowerCaseCharacters) possibleCharacters = possibleCharacters.concat(lowerCaseCharacters);
    if (options.hasUpperCaseCharacters) possibleCharacters = possibleCharacters.concat(upperCaseCharacters);

    for (var i = 0; i < options.length; i++) {
        var randomCharacter = getRandom(possibleCharacters);
        guaranteedCharacters.push(randomCharacter);
    }

    for (var j = 0; j < options.length; j++) {
        if (guaranteedCharacters.length <= j) guaranteedCharacters.push(getRandom(possibleCharacters));
    }

    return guaranteedCharacters.join("");
}


var generateBtn = document.querySelector("#generate");


function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}


generateBtn.addEventListener("click", writePassword);

  
