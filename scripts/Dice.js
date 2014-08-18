
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
	
	checkForAnyMovablePieces: function() {
		
		var movable = 0;
		var pIndex = undefined;
		var blockOnPath = false;
		
		// we loop through all the players pieces
		for (var i = 0; i < 4; i++) {
			
			if (movable < 1) {
				pIndex = this.currentPlayer.pieces[i].piece.pathIndex;
			} 
			else {
				break;
			}
			
			// if the piece is not in the home position or not in goal
			if (this.currentPlayer.diceRoll == 6 && this.currentPlayer.pieces[i].piece.inHome) {
				movable = 1;
			}
			if (!this.currentPlayer.pieces[i].piece.inHome && !this.currentPlayer.pieces[i].piece.inGoal) {
				
				for (var j = pIndex + 1; j <= this.currentPlayer.diceRoll + pIndex; j++) {
					
					// we don't want to check for a block on the Goal field
					if (j < 57) {
						if (ludoObject.checkForBlockOnField(this.currentPlayer.pieces[i].piece.path[j].id)) {
						
							blockOnPath = true;
							break;
						}
						
						if (j == this.currentPlayer.diceRoll + pIndex) {
							movable = 1;
						}
					}
				}
				
			}
		}
		
		return movable;
	},
	
	endTurn: function() {
		
		this.currentPlayer.diceRoll = undefined;
		
		setTimeout(function() {
			ludoObject.setActivePlayer();
			ludoObject.player.giveControl();
		}, 800);
	},
	
	handleRolledNumber: function() {
		
		
		this.currentPlayer.diceRoll = this.faceNum;
		
		if (this.faceNum == 6 && this.currentPlayer.allInHome) {
			
			this.currentPlayer.allInHome = false;
			this.currentPlayer.pieces[0].piece.moveToFirstPosition();
			this.currentPlayer.diceRoll = undefined;
			this.currentPlayer.turnsLeft = 0;
		}
		else if (this.currentPlayer.allInHome && this.currentPlayer.turnsLeft > 0) {
			
			this.currentPlayer.turnsLeft--;
			
			if (this.currentPlayer.turnsLeft < 1) {
				
				this.currentPlayer.turnsLeft = 3;
				
				this.endTurn();
			}
		}
		else if (this.checkForAnyMovablePieces() < 1) {
			
			this.currentPlayer.displayNoMovablePieces();
			this.currentPlayer.turnsLeft = 0;
			this.endTurn(0);
		}
		else if (this.faceNum == 6) {

			this.currentPlayer.turnsLeft = 1;
		}
		else {
			this.currentPlayer.turnsLeft = 0;
			this.disabled = true;
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



