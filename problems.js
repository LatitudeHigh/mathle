
function getRandomMathProblem() {
    var equations = [
        getAdditionProblem, getMultiplicationProblem, getDivisionProblem, getSubtractionProblem
    ];
    
    return equations[(Math.floor(Math.random() * equations.length))]();
}

function getAdditionProblem() {
    var equation = "";
    var random1 = Randomizer.nextInt(1, 9);
    equation += random1;
    equation += "+";
    var random2 = Randomizer.nextInt(1, 9);
    while (random1 + random2 < 10) {
        random2 = Randomizer.nextInt(1, 9);
    }
    equation += random2;
    equation += "=";
    equation += (random1 + random2);
    return equation;
}

function getMultiplicationProblem() {
    var equation = "";
    var random1 = Randomizer.nextInt(1, 9);
    equation += random1;
    equation += "x";
    var random2 = Randomizer.nextInt(1, 9);
    while (random1 * random2 < 10) {
        random2 = Randomizer.nextInt(1, 9);
    }
    equation += random2;
    equation += "=";
    equation += (random1 * random2);
    return equation;
}

function getDivisionProblem() {
    var equation = "";
    var random1 = Randomizer.nextInt(1, 9);
    var random2 = Randomizer.nextInt(1, 9);
    while (random1 * random2 < 10) {
        random2 = Randomizer.nextInt(1, 9);
    }
    equation += (random1 * random2);
    equation += "/";
    equation += random1;
    equation += "=";
    equation += random2;
    return equation;
}

function getSubtractionProblem() {
    var equation = "";
    var random1 = Randomizer.nextInt(1, 9);
    var random2 = Randomizer.nextInt(1, 9);
    while (random1 + random2 < 10) {
        random2 = Randomizer.nextInt(1, 9);
    }
    equation += (random1 + random2);
    equation += "-";
    equation += random1;
    equation += "=";
    equation += random2;
    return equation;
}

/*
function getHardMathProblem() {
  
}
*/