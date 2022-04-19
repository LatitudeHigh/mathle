var NUM_SQUARES = 6;
var NUM_ROWS = 4;
var PADDING = 10;
var FONT = "24pt Comic Sans MS"
var width = 400;
var height = 500;
var length = (width - PADDING) / NUM_SQUARES - PADDING;
var arrGreen = [96, 181, 100];
var arrYellow = [224, 198, 25];
var arrRed = [242, 10, 10];

var col = 0;
var curLabels = [];
var shift = false;

var guess = "";
var answer = "2x5=10";

var label;

function drawLabel(text) {
    label.setText(text);
    label.setPosition(
        getWidth() / 2 - label.getWidth() / 2,
        getHeight() / 2 + label.getHeight() / 2
    );
    add(label);
    return label;
}

function removeLabel() {
    removeLabel();
}

function setColor(arr) {
    var color = new Color(arr[0], arr[1], arr[2]);
    return color;
}

function drawSquare(x, y, length, color) {
    var square = new Rectangle(length, length);
    square.setPosition(x, y);
    square.setColor(color);
    add(square);
}

function drawText(x, y, num) {
    var text = new Text(num, FONT);
    text.setPosition(x - text.getWidth() / 2, y + text.getHeight() / 2 - 3);
    add(text);
    return text;
}

function backspace() {
    if (e.keyCode == 8) {
        remove(text);
    }
}

/* Validates the guess has NUM_SQUARES characters and good math */
function isValidGuess() {
    var equation = opReplace(guess);
    var valid = eval(equation);
    return guess.length == NUM_SQUARES && valid == true;
}

function opReplace(x) {
    var equation = guess.replace('=', '==');
    if (equation.includes('x')) {
        equation = equation.replace('x', '*');
    }
    return equation;
}

function keyDown(e) {
    // Shift for + vs =
    if (e.keyCode == Keyboard.SHIFT) {
        shift = true;
    }
    // Enter: if we press enter && valid (length is 7 and math is good)
    // Compare the guess to the answer
    if (e.keyCode == Keyboard.ENTER) {
        if (isValidGuess()) {
            console.log("Final");
            drawFinalGuess();
            guess = "";
            col++;

            return;
        } else {
            if (guess.length == NUM_SQUARES){
                var wrongLabel = drawLabel("Math is wrong!");
                invalidGuess();
                setTimeout(drawCurrentGuess, 1000);
                setTimeout(function() { remove(wrongLabel); }, 1000);
                return;
            }
        }
    }
    // Backspace
    if (e.keyCode == Keyboard.BACKSPACE) {
        guess = guess.slice(0, -1);
    }

    if (guess.length == NUM_SQUARES) {
        return;
    }

    // Update our guess to include the guessed character
    // valid characters: 0-9, +, - , /, x, =
    var value = keyToCharacter(e.keyCode);
    guess += value;
    console.log(guess);
    drawCurrentGuess();
}

//copy pasted
/* Translates x from its keycode to its numerical value
 * if x is in the range 0-9, subtract the value of 0 from x.
 */
function keyToCharacter(x) {
    // Numbers
    if (x <= Keyboard.letter("9") && x >= Keyboard.letter("0")) {
        return (x - Keyboard.letter("0")) + "";
    }

    // return =, +, -, x, or /
    if (x == Keyboard.letter("=") || (x == 187 && !shift)) {
        return "=";
    }
    if (x == Keyboard.letter("x")) {
        return "x";
    }
    if (x == Keyboard.letter("/") || x == 191) {
        return "/";
    }
    if (x == Keyboard.letter("+") || (x == 187 && shift)) {
        return "+";
    }
    if (x == Keyboard.letter("-") || x == 189) {
        return "-";
    }
    return "";
}

function keyUp(e) {
    if (e.keyCode == Keyboard.SHIFT) {
        shift = false;
    }
}

function removeLabels() {
    for (var i = 0; i < curLabels.length; i++) {
        remove(curLabels[i]);
    }
    curLabels = [];
}

function drawCurrentGuess() {
    removeLabels();
    var squareY = PADDING + col * (PADDING + length);
    var squareX = PADDING;
    for (var i = 0; i < NUM_SQUARES; i++) {
        drawSquare(squareX, squareY, length, Color.grey);
        if(i < guess.length) {
            var character = guess[i];
            curLabels.push(drawText(squareX + length / 2, squareY + length / 2, character));
        }
        squareX += length + PADDING;
    }
}

function drawFinalGuess() {
    var squareX = PADDING;
    var squareY = PADDING + col * (PADDING + length);
    var green = setColor(arrGreen);
    var yellow = setColor(arrYellow);
    for (var i = 0; i < guess.length; i++) {
        var character = guess[i];
        if (character == answer[i]) {
            drawSquare(squareX, squareY, length, green);
            drawText(squareX + length / 2, squareY + length / 2, character);
        } else if (answer.includes(character)) {
            drawSquare(squareX, squareY, length, yellow);
            drawText(squareX + length / 2, squareY + length / 2, character);
        } else {
            drawSquare(squareX, squareY, length, Color.grey);
            drawText(squareX + length / 2, squareY + length / 2, character);
        }
        squareX += length + PADDING;
    }
}

function invalidGuess() {
    var squareX = PADDING;
    var squareY = PADDING + col * (PADDING + length);
    var red = setColor(arrRed);
    for (var i = 0; i < guess.length; i++) {
        drawSquare(squareX, squareY, length, red);
        drawText(squareX + length / 2, squareY + length / 2, guess[i]);
        squareX += length + PADDING;
    }
}

function start() {
    var squareY = PADDING;
    for (var row = 0; row < NUM_ROWS; row++) {
        var squareX = PADDING;
        for (var col = 0; col < NUM_SQUARES; col++) {
            drawSquare(squareX, squareY, length, Color.grey);
            squareX += length + PADDING;
        }
        squareY += length + PADDING;
    }
    label = new Text("");
    keyDownMethod(keyDown);
    keyUpMethod(keyUp);
}