var problems = [
    
];

var addingNumbers = "";
var random1 = Randomize.nextInt(0, 10);
addingNumbers.concat(random1);
addingNumbers.push("+");
random2 = Randomize.nextInt(0, 10);
while (random1 + random2 < 10){
    random2 = Randomize.nextInt(0, 10);
}
addingNumbers.push(random2);
addingNumbers.push("=");
addingNumbers.push(random1 + random2);

