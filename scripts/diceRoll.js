

var dice = document.getElementById('dice_img');
var diceIndex = 0;
var diceIsAnimating = false;

function displayOne() {
	dice.style.marginLeft = '-32px';
	dice.style.marginTop = '-23px';
}

function displayTwo() {
	dice.style.marginLeft = '-126px';
	dice.style.marginTop = '-23px';
}

function displayThree() {
	dice.style.marginLeft = '-216px';
	dice.style.marginTop = '-23px';
}

function displayFour() {
	dice.style.marginLeft = '-32px';
	dice.style.marginTop = '-109px';
}

function displayFive() {
	dice.style.marginLeft = '-125px';
	dice.style.marginTop = '-109px';
}

function displaySix() {
	dice.style.marginLeft = '-216px';
	dice.style.marginTop = '-109px';
}

function animateDice(numberOfRolls, diceAnimHandle) {
	var faceNum = Math.floor(Math.random() * (7 - 1) + 1);
/* 	console.log(faceNum); */
	
	switch(faceNum) {
		case 1:
			displayOne();
			break;
		case 2:
			displayTwo();
			break;
		case 3:
			displayThree();
			break;
		case 4:
			displayFour();
			break;
		case 5:
			displayFive();
			break;
		case 6:
			displaySix();
			break;
		default:
			console.log("Error on switch statement");
	}
	
	if (diceIndex > numberOfRolls) {
		clearInterval(diceAnimHandle);
/* 		console.log("Handle cleared"); */
		diceIndex = 0;
		diceIsAnimating = false;
	}
	diceIndex++;
}

function rollDice() {
	
	var numberOfRolls = Math.round(Math.random() * (16 - 4) + 4);
/* 	console.log(numberOfRolls); */
	
	if (!diceIsAnimating) {
		diceIsAnimating = true;
		var diceAnimHandle = setInterval(function() {
		
			animateDice(numberOfRolls, diceAnimHandle);
			
		}, 175);
	}
	
	
	
}

dice.onmouseup = function() {
	rollDice();
}
