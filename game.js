//for js button
/*
const easyButton = document.getElementById("Easybutton");

easyButton.addEventListener("click", function() {
  
});
*/

var music;
var NUM_SQUARES;
var NUM_ROWS;
var PADDING = 10;
var FONT = "28pt Monospace";
var width = 400;
var height = 500;

var arrGreen = [96, 181, 100];
var arrGreenShadow = [30, 138, 32];
var arrYellow = [224, 198, 25];
var arrRed = [242, 10, 10];

var length;
var squareX = PADDING;
var squareY = PADDING;

var label;
var curLabels = [];

var shift = false;

var guess = "";

var getAnswer = true;
var answer;

//win screen
var blackscreen;
var winText;
var statsButton;
var winScreenON = false;

//stats screen
var statsScreenON = false;
var statsBack;
var summary = [];

var valid;

var guessCount;

//menu
var menuBool = true;
var menuText;
var easyPlay;
var normalButton;
var normalShadow;
var hardButton;
var hardShadow;

//incorrect screen
var incoBack;

var cheat = false;

function menu() {

    normalShadow = new Rectangle(getWidth() / 2 + 25, getHeight() / 8 + 25);
    normalShadow.setPosition(
        getWidth() / 2 - normalShadow.getWidth() / 2,
        getHeight() / 2 - normalShadow.getHeight() / 2
    );
    normalShadow.setColor(Color.WHITE);

    add(normalShadow);

    normalButton = new Rectangle(getWidth() / 2, getHeight() / 8);
    normalButton.setPosition(
        getWidth() / 2 - normalButton.getWidth() / 2,
        getHeight() / 2 - normalButton.getHeight() / 2
    );
    normalButton.setColor(Color.grey);

    add(normalButton);

    easyText = drawText(normalButton.getX() + normalButton.getWidth() / 2,
        normalButton.getY() + normalButton.getHeight() / 2, "PLAY", Color.WHITE, FONT);
    /*
        hardButton = new Rectangle(getWidth()/2, getHeight()/8);
        hardButton.setPosition(
          getWidth()/2 - hardButton.getWidth()/2,
          getHeight()/2 - hardButton.getHeight()/2 + 100);
        add(hardButton);
    */
}

function move(i) {
    if (menuBool) {
        if (easyText.containsPoint(i.getX(), i.getY()) == false) {
            if (normalButton.containsPoint(i.getX(), i.getY())) {
                normalShadow.setColor(setColor(arrGreenShadow));
                normalButton.setColor(setSquareColor(i.getX(), i.getY(), setColor(arrGreen)));
            } else {
                normalShadow.setColor(Color.WHITE);
                normalButton.setColor(Color.grey);
            }
        }
    }
}

function winScreen() {
    blackscreen = new Rectangle(getWidth(), getHeight());
    blackscreen.setPosition(0, 0);
    blackscreen.setColor(Color.BLACK);
    statsButton = new Rectangle(getWidth() / 2, getHeight() / 8);
    statsButton.setPosition(
        getWidth() / 2 - statsButton.getWidth() / 2,
        getHeight() / 2 - statsButton.getHeight() / 2 + 100);
    statsButton.setColor(Color.WHITE);
}

function statsScreen() {
    statsBack = new Rectangle(getWidth(), getHeight());
    statsBack.setPosition(0, 0);
    statsBack.setColor(Color.WHITE);
}

function start() {
    menu();
    if (menuBool) {
        mouseMoveMethod(move);
    }
    winScreen();
    statsScreen();
    mouseClickMethod(click);
}

function drawTiles() {
    for (var row = 0; row < NUM_ROWS; row++) {
        for (var col = 0; col < NUM_SQUARES; col++) {
            drawSquare(squareX, squareY, length, length, getColor());
            squareX += length + PADDING;
        }
        squareX = PADDING;
        squareY += length + PADDING;
    }
    squareX = PADDING;
    squareY = PADDING;
}

var sumArri = 0;
function getColor(){
    if(statsScreenON){
        if (summary[sumArri] == "GREEN"){
            sumArri+=1;
            return setColor(arrGreen);
        }
        if (summary[sumArri] == "YELLOW"){
            sumArri+=1;
            return setColor(arrYellow);
        }
        if (summary[sumArri] == "GREY"){
            sumArri+=1;
            return Color.GREY;
        }
        /*
        if (sumArri > summary.length-1){
            return Color.WHITE;
        }
*/
    } else {
        return Color.GREY;
    }
}

function removeMenu() {
    menuBool = false;
    remove(menuText);
    remove(normalButton);
    remove(easyText);
    remove(normalShadow);
    //remove(hardButton);
}

function addStatsScreen() {
    winScreenON = false;
    statsScreenON = true;
    add(statsBack);
    drawTiles();
}

function click(e) {
    if (menu) {
        if (normalButton.containsPoint(e.getX(), e.getY())) {
            removeMenu();
            NUM_SQUARES = 6;
            NUM_ROWS = 6;
            game();
        }
        /*
        if (hardButton.containsPoint(e.getX(), e.getY())){
            removeMenu();
            NUM_SQUARES = 8;
            NUM_ROWS = 6;
        }
*/
        music = new Audio("music.mp3");
        music.play();
        music.loop = true;
    }
    if (winScreenON) {
        if (statsButton.containsPoint(e.getX(), e.getY())) {
            addStatsScreen();
        }
    }
}

function drawLabel(text, color) {
    label.setText(text);
    label.setPosition(
        getWidth() / 2 - label.getWidth() / 2,
        getHeight() / 2 + label.getHeight() / 2
    );
    label.setColor(color);
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

function drawSquare(x, y, length, width, color) {
    var square = new Rectangle(length, width);
    square.setPosition(x, y);
    square.setColor(color);
    add(square);
}

function drawText(x, y, num, color, font) {
    if (num == null) return;
    var text = new Text(num, font);
    text.setPosition(x - text.getWidth() / 2, y + text.getHeight() / 2 - 1);
    text.setColor(color);
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
    valid = eval(equation);
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
            guessCount += 1;
            if (guess == answer/* || cheat == true*/) {
                squareX = PADDING;
                guess = "";
                for (var i=0; i<NUM_SQUARES; i++){
                    summary.push("GREEN");
                }
                animateSquares();
                winScreenON = true;
            } else {
                drawFinalGuess();
                guess = "";
                row++;
                return;
            }
        } else {
            incoBack = new Rectangle(getWidth(), getHeight());
            incoBack.setPosition(0, 0);
            incoBack.setColor(Color.WHITE);

            invalidGuess();
            setTimeout(drawCurrentGuess, 1000);
            add(incoBack);
            var wrongLabel = drawText(getWidth() / 2, getHeight() / 2 - 50, "Math is wrong!", Color.BLACK, FONT);
            var wrongLabel2 = drawText(getWidth() / 2, getHeight() / 2 - 10, "Please enter a correct " + NUM_SQUARES + " digit answer", Color.BLACK, "12pt Monospace");
            setTimeout(function() { remove(incoBack); }, 2500);
            setTimeout(function() { remove(wrongLabel); }, 2500);
            setTimeout(function() { remove(wrongLabel2); }, 2500);
            return;
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

function setSquareColor(x, y, color) {
    var square = getElementAt(x, y);
    if (square != null) {
        square.setColor(color);
    }
}

function drawCurrentGuess() {
    removeLabels();
    squareX = PADDING;
    for (var i = 0; i < NUM_SQUARES; i++) {
        setSquareColor(squareX, squareY, Color.grey);
        if (i < guess.length) {
            var character = guess[i];
            curLabels.push(drawText(squareX + length / 2, squareY + length / 2, character, Color.BLACK, FONT));
        }
        squareX += length + PADDING;
    }
}

function drawFinalGuess() {

    /* FIX FOR YELLOW SQUARES */
    let correctGuessMap = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "+": 0,
        "-": 0,
        "x": 0,
        "/": 0,
        "=": 0,
    }

    var green = setColor(arrGreen);
    var yellow = setColor(arrYellow);
    squareX = PADDING;

    for (var i = 0; i < guess.length; i++) {
        var character = guess[i];
        if (character == answer[i]) {
            correctGuessMap[character]++;
            drawSquare(squareX, squareY, length, length, green);
            drawText(squareX + length / 2, squareY + length / 2, character, Color.BLACK, FONT);
            summary.push("GREEN");
        } else if (answer.includes(character)) {
            drawSquare(squareX, squareY, length, length, yellow);
            drawText(squareX + length / 2, squareY + length / 2, character, Color.BLACK, FONT);
            summary.push("YELLOW");
        } else {
            drawText(squareX + length / 2, squareY + length / 2, character, Color.BLACK, FONT);
            summary.push("GREY");
        }
        squareX += length + PADDING;
    }
    squareY += length + PADDING;
}

function invalidGuess() {
    squareX = PADDING;
    var red = setColor(arrRed);
    for (var i = 0; i < NUM_SQUARES; i++) {
        setSquareColor(squareX, squareY, red);
        squareX += length + PADDING;
    }
}

function animateSquares() {
    setTimer(newSquare, 500);
}

var x = 0;
var growSquareX = PADDING + length / 2;

function newSquare() {
    if (x < NUM_SQUARES) {
        setTimer(growSquare, 1);
    } else {
        stopTimer(newSquare);
        addWinScreen();
    }
}

function addWinScreen() {
    add(blackscreen);
    winText = drawLabel('You Win!', Color.red);
    add(statsButton);
    mouseClickMethod(click);
}

var side = 0;
function growSquare() {
    if (side <= length) {
        drawSquare(growSquareX, squareY, side, side, setColor(arrGreen));
        side++;
    } else {
        side = 0;
        growSquareX += length + PADDING;
        x += 1;
        addAnswerText();
    }
}

var i = 0;
function addAnswerText() {
    var winCharacter = answer[i];
    drawText(growSquareX - PADDING - length / 2, squareY + length / 2, winCharacter, Color.BLACK, FONT);
    i += 1;
}


function winCheat() {
    cheat = true;
    console.log("Cheater!");
    console.log("> > > PRESS ENTER < < <");
}

function game() {
    length = (width - PADDING) / NUM_SQUARES - PADDING;
    drawTiles();
    if (getAnswer) {
        getAnswer = false;
        answer = getRandomMathProblem(/*easy, hard*/);
    }
    label = new Text("");
    keyDownMethod(keyDown);
    keyUpMethod(keyUp);
}