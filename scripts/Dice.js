
var Dice = function() {
	
	this.img 			= document.getElementById('dice_img');
	this.diceIndex 		= 0;
	this.faceNum		= 1;
	this.isAnimating 	= false;
	this.animInterval 	= 175;
	this.disabled		= true;
	
	this.numberOfRolls 	= undefined;
	this.diceAnimHandle = undefined;
	
	this.currentPlayer  = undefined;
}

Dice.prototype = {
	
	displayOne: function() {
		this.img.style.marginLeft  	= '-32px';
		this.img.style.marginTop 	= '-23px';
	},
	
	displayTwo: function() {
		this.img.style.marginLeft 	= '-126px';
		this.img.style.marginTop 	= '-23px';
	},
	
	displayThree: function() {
		this.img.style.marginLeft 	= '-216px';
		this.img.style.marginTop 	= '-23px';
	},
	
	displayFour: function() {
		this.img.style.marginLeft 	= '-32px';
		this.img.style.marginTop 	= '-109px';
	},
	
	displayFive: function() {
		this.img.style.marginLeft 	= '-125px';
		this.img.style.marginTop 	= '-109px';
	},
	
	displaySix: function() {
		this.img.style.marginLeft 	= '-216px';
		this.img.style.marginTop 	= '-109px';
	},
	
	animateDice: function() {
	
		this.faceNum = Math.floor(Math.random() * (7 - 1) + 1);
		/* 	console.log(faceNum); */
		
		switch(this.faceNum) {
			case 1:
				this.displayOne();
				break;
			case 2:
				this.displayTwo();
				break;
			case 3:
				this.displayThree();
				break;
			case 4:
				this.displayFour();
				break;
			case 5:
				this.displayFive();
				break;
			case 6:
				this.displaySix();
				break;
			default:
				console.log("Error on switch statement");
		}
		
		if (this.diceIndex > this.numberOfRolls) {
			
			clearInterval(this.diceAnimHandle);
			/* 	console.log("Handle cleared"); */
			this.diceIndex = 0;
			this.isAnimating = false;
			this.handleRolledNumber();
			
		} 
		this.diceIndex++;
	},
	
	handleRolledNumber: function() {
		
		
		this.currentPlayer.diceRoll = this.faceNum;
		
		if (this.faceNum == 6 && this.currentPlayer.allInHome) {

			this.currentPlayer.allInHome = false;
			this.currentPlayer.pieces[0].piece.moveToFirstPosition();
			this.currentPlayer.diceRoll = undefined;
			ludoObject.setActivePlayer();
			ludoObject.player.giveControl();
		}
		
		
		if (this.currentPlayer.allInHome && this.currentPlayer.turnsLeft > 0) {
			this.currentPlayer.turnsLeft--;
			
			if (this.currentPlayer.turnsLeft < 1) {
				
				this.currentPlayer.turnsLeft = 3;
				this.currentPlayer.diceRoll = undefined;
				
				setTimeout(function() {
					ludoObject.setActivePlayer();
					ludoObject.player.giveControl();
				}, 800);
			}
		}
		else {
			this.currentPlayer.turnsLeft = 1;
		}
		
	},
	
	rollDice: function() {
		
		this.numberOfRolls = Math.round(Math.random() * (16 - 4) + 4);
		/* 	console.log(numberOfRolls); */
		
		if (!this.isAnimating) {
			
			this.isAnimating = true;
			this.diceAnimHandle = setInterval(function() {
			
				ludoObject.dice.animateDice(this.numberOfRolls, this.diceAnimHandle);
				
			}, this.animInterval);
		}
	}
	
}



