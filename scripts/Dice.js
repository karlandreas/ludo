var Dice = function() {
	
	this.img 			= document.getElementById('dice_img');
	this.diceIndex 		= 0;
	this.faceNum		= 1;
	this.isAnimating 	= false;
	this.animInterval 	= 175;
	this.disabled		= true;
	
	this.numberOfRolls 	= undefined;
	this.diceAnimHandle = undefined;
	
	this.shakeSound		= document.getElementById('shakeDice_sound');
}

Dice.prototype = {
	
	displayOne: function() {
		this.img.style.marginLeft  	= '-32px';
		this.img.style.marginTop 	= '-23px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" 		 : true, 
						"game_index" : ludoObject.onlineGameIndex, 
						"number" 	 : 1};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	displayTwo: function() {
		this.img.style.marginLeft 	= '-126px';
		this.img.style.marginTop 	= '-23px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" : true, 
						"game_index": ludoObject.onlineGameIndex, 
						"number" : 2};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	displayThree: function() {
		this.img.style.marginLeft 	= '-216px';
		this.img.style.marginTop 	= '-23px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" : true, 
						"game_index": ludoObject.onlineGameIndex, 
						"number" : 3};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	displayFour: function() {
		this.img.style.marginLeft 	= '-32px';
		this.img.style.marginTop 	= '-109px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" : true, 
						"game_index": ludoObject.onlineGameIndex, 
						"number" : 4};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	displayFive: function() {
		
		this.img.style.marginLeft 	= '-125px';
		this.img.style.marginTop 	= '-109px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" : true, 
						"game_index": ludoObject.onlineGameIndex, 
						"number" : 5};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	displaySix: function() {
		this.img.style.marginLeft 	= '-216px';
		this.img.style.marginTop 	= '-109px';
		
		if (this.diceIndex == this.numberOfRolls && ludoObject.isOnlineGame) {
			var data = {"dice" : true, 
						"game_index": ludoObject.onlineGameIndex, 
						"number" : 6};
			ludoObject.connection.send( JSON.stringify(data) );
		}
	},
	
	handleSix: function() {
		
		// we set turns left to 1
		ludoObject.player.turnsLeft = 1;
		// and disable the dice
		this.disabled = true;
		
		// if this is a computer player
		if (ludoObject.player.computer) {
			
			// first we try to move out of home
			if (ludoObject.player.tryToMoveOutOfHome()) {
				
				// if we have moved a piece out of home we roll the dice again
				setTimeout(function() {
					ludoObject.dice.rollDice();
				}, 1000);
			}
			// if we have all our pieces in play, we try to highlight the first pieces path
			else if (ludoObject.player.tryToMakeReadyToMove()) {
				
				// if the piece is made ready to move 
				setTimeout(function() {
					
					// we move it
					ludoObject.moveSelected(ludoObject.player.readyToMovePiece, ludoObject.player);
					// and roll the dice again since we rolled a 6 last time
					setTimeout(function() {
						ludoObject.dice.rollDice();
					}, 1000);
				}, 1000);
			}
		}
	},
	
	handleOtherThanSix: function() {
		// we set turns left to 0 and disable the dice
		ludoObject.player.turnsLeft = 0;
		this.disabled = true;
		
		// if this is the computer 
		if (ludoObject.player.computer) {
			
			// we try to highlight the first pieces path
			if (ludoObject.player.tryToMakeReadyToMove()) {
				
				// if the piece is made ready to move 
				setTimeout(function() {
					// we move it
					ludoObject.moveSelected(ludoObject.player.readyToMovePiece, ludoObject.player);
					ludoObject.dice.endTurn();
				}, 500);
			}
		}
	},
	
	handleAllInHome: function() {
		
		// if all in home and we roll a six
		if (this.faceNum == 6) {
			
			// we set allInHome to false and move the first piece to the safe-field
			ludoObject.player.pieces[0].piece.moveToFirstPosition();
						
			ludoObject.player.allInHome = false;
			ludoObject.player.diceRoll = undefined;
			ludoObject.player.turnsLeft = 1;
			
			if (ludoObject.isOnlineGame) {
				var data = {"move_piece" : true, 
							"game_index" : ludoObject.onlineGameIndex, 
							"color"		 : ludoObject.player.color, 
							"piece_index": 0, 
							"diceroll"	 : -1};
				ludoObject.connection.send( JSON.stringify(data) );
			}
			
			// if this is the computer 
			if (ludoObject.player.computer) {
				// we wait 1 second and then roll the dice again
				setTimeout(function() {
					ludoObject.dice.rollDice();
				}, 1000);
			}
		}
		// if all in home and turns left is higher than 0
		else if (ludoObject.player.turnsLeft > 0) {
			
			// we reduce turns left by one
			ludoObject.player.turnsLeft--;
			
			// now if turns left is less than one we reset turns left to 3, and end the turn
			if (ludoObject.player.turnsLeft < 1) {
				
				ludoObject.player.turnsLeft = 3;
				this.endTurn();
			}
			// else if there are turns left and this is the computer player 
			else if (ludoObject.player.computer) {
				
				// we roll the dice again
				setTimeout(function() {
					ludoObject.dice.rollDice();
				}, 1000);
			}
		}
	},
	
	handleNoMovablePieces: function(player) {
		
		// set turns left to 0
		player.turnsLeft = 0;
		
		// if it's an online game we display NoMovablePieces on all screens
		if (ludoObject.isOnlineGame) {
	
			player.onlineSendNoMovablePieces();
		}
		else {
			// if not we display NoMovablePieces on this screens
			ludoObject.player.displayNoMovablePieces();
		}
		
		// finally we end the turn
		this.endTurn();
	},
	
	animateDice: function() {
	
		this.faceNum = Math.floor(Math.random() * (7 - 1) + 1);
		
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
		
		if (this.diceIndex == this.numberOfRolls) {
			
			clearInterval(this.diceAnimHandle);
			this.diceIndex = 0;
			this.isAnimating = false;
			this.handleRolledNumber();
			
		} else {
			this.diceIndex++;
		}
	},
	
	checkForAnyMovablePieces: function() {
		
		var movable = 0;
		var pIndex = undefined;
		var blockOnPath = false;
		
		// we loop through all the players pieces
		for (var i = 0; i < 4; i++) {
			
			if (movable < 1) {
				// if we have not found a movable piece we get the next piece's path index
				pIndex = ludoObject.player.pieces[i].piece.pathIndex;
			} 
			else {
				// else if we have a movable piece we break out of the loop and return movable 1
				break;
			}
			
			// if we have rolled a 6 and have a piece in home, then we have found a movable piece.
			if (ludoObject.player.diceRoll == 6 && ludoObject.player.pieces[i].piece.inHome) {
				movable = 1;
			}
			
			// if the piece is not in the home position or not in goal
			if (!ludoObject.player.pieces[i].piece.inHome && !ludoObject.player.pieces[i].piece.inGoal) {
				
				// we loop through the fields of the players path
				for (var j = pIndex + 1; j <= ludoObject.player.diceRoll + pIndex; j++) {
					
					// we don't want to check for a block on the Goal field
					if (j < 57) {
						// if we find a block in this pieces path, it's not movable and we break the loop and continue with the next piece
						if (ludoObject.checkForBlockOnField(ludoObject.player, ludoObject.player.pieces[i].piece.path[j])) {
						
							blockOnPath = true;
							break;
						}
						
						// if this is the last field in the path and no block has been detected
						if (j == ludoObject.player.diceRoll + pIndex) {
							// we have a movable piece
							movable = 1;
						}
					}
				}
				
			}
		}
		
		return movable;
	},
	
	endTurn: function() {
		
		ludoObject.player.diceRoll = undefined;
		ludoObject.player.readyToMove = false;
		
		if (ludoObject.isOnlineGame) {
			
			// we need to find out if the next player has left the game
			var player = ludoObject.getNextPlayer(ludoObject.player.color);
			
			ludoObject.player.active = false;
			
			ludoObject.player.onlineSwitchPlayer();
			
			if (player.computer) {
				// we set a short timeout before sending create computer roll to the server
				setTimeout(function() {
					if (player.allInHome) {
						player.onlineTryToGetOutOfHome();
					}
					else {
						player.onlineSendCreateComputerRoll();
					}
					
				}, 500);
			}
			
		// if this is not an online game 
		} else {
			setTimeout(function() {
				// we switch player 
				ludoObject.switchPlayer();
				// and give control to the next player
				ludoObject.player.giveControl();
			}, 1000);
		}
		// either way we disable the dice temporarily
		this.disabled = true;
	},
	
	handleRolledNumber: function() {
		
		ludoObject.player.diceRoll = this.faceNum;
		
		// if we have all our pieces in the home area
		if (ludoObject.player.allInHome) {
			
			this.handleAllInHome();
		}
		// else if we have pieces in play we check if any one can be moved
		else if (this.checkForAnyMovablePieces() < 1) {
			
			this.handleNoMovablePieces(ludoObject.player);
		}
		// else if we have movable pieces and roll a 6
		else if (this.faceNum == 6) {
			
			this.handleSix();
		}
		// if we roll a number other than 6 when we have pieces in play
		else {
			this.handleOtherThanSix();
		}
	},
	
	rollDice: function() {
		
		if (ludoObject.player.computer && ludoObject.paused) {
			return;
		}
		
		ludoObject.playSound(this.shakeSound);
		
		// we get a random number to display as the dice is rolling
		this.numberOfRolls = Math.round(Math.random() * (16 - 4) + 4);
		
		if (!this.isAnimating) {
			
			this.isAnimating = true;
			this.diceAnimHandle = setInterval(function() {
			
				ludoObject.dice.animateDice(this.numberOfRolls, this.diceAnimHandle);
				
			}, this.animInterval);
		}
	}
	
}