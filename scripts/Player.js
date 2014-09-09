var Player = function(color, name) {
	
	this.name 		 	= name;
	this.color 		 	= color;
	this.computer	 	= true;
					 
	this.pieces		 	= undefined;
	this.readyToMovePiece = undefined;
	this.allInHome  	 = true;
					 
	this.diceRoll 	 	= undefined;
	this.turnsLeft	 	= 3;
					 
	this.playerDiv  	 = undefined;
	this.active			 = false;
	this.readyToMove	 = false;

	this.piecesInGoal 	= 0;
	
	this.newPlayerDiv 	= document.getElementById('new_player_div');
	this.newPlayerFormActive = false;
	
	this.moveSound	  	= undefined;
	this.noMovableSound	= document.getElementById('cuckoo_sound');
	
	// online
	this.sid			= undefined;
	this.firstThrow 	= true;
}

Player.prototype = {
	
	init: function() {
		
		if (this.color == "yellow") {
			this.playerDiv = document.getElementById('player1_div');
			this.moveSound = document.getElementById('duck_sound');
		}
		else if(this.color == "red") {
			this.playerDiv = document.getElementById('player2_div');
			this.moveSound = document.getElementById('rooster_sound');
		}
		else if(this.color == "blue") {
			this.playerDiv = document.getElementById('player3_div');
			this.moveSound = document.getElementById('cow_sound');
		}
		else if(this.color == "green") {
			this.playerDiv = document.getElementById('player4_div');
			this.moveSound = document.getElementById('sheep_sound');
		}
		
		this.moveSound.volume = 0.7;
		
		this.playerDiv.innerHTML = "<p>" + this.name + "</p>";
	},
	
	checkForAllInHome: function() {
		var allInHome = true;
		
		// check if all pieces is inHome
		for (var i = 0; i < 4; i++) {
			
			if (!this.pieces[i].piece.inHome) {
				allInHome = false;
			}
		}
		
		return allInHome;
	},
	
	displayNoMovablePieces: function() {
		
		ludoObject.playSound(this.noMovableSound);
		
		setTimeout(function() {
			ludoObject.msgDiv.style.opacity = "1";
		}, 100);
		
		document.getElementsByTagName('body')[0].appendChild(ludoObject.msgDiv);
		
		setTimeout(function() {

			ludoObject.msgDiv.style.opacity = "0.1";
			setTimeout(function() {
				
				document.getElementsByTagName('body')[0].removeChild(ludoObject.msgDiv);
			}, 900);
		}, 1200);
		
	},
	
	displayWinnerGraphic: function() {
		
		
		document.getElementsByTagName('body')[0].appendChild(ludoObject.winnerDiv);
		
		setTimeout(function() {

			document.getElementsByTagName('body')[0].removeChild(ludoObject.winnerDiv);
		}, 15000);
	},
	
	displayStartGraphic: function() {
		
		if (this.firstThrow) {
			
			setTimeout(function() {
				document.getElementsByTagName('body')[0].appendChild(ludoObject.startDiv);
			}, 1000);
			
			setTimeout(function() {
				document.getElementsByTagName('body')[0].removeChild(ludoObject.startDiv);
			}, 3000);
			
			this.firstThrow = false;
		}
	},
	
	toggleNewPlayerForm: function() {
		
		this.newPlayerDiv.style.backgroundColor = this.color;
		
		if (this.newPlayerFormActive) {
			
			this.newPlayerDiv.style.marginTop = "-600px";
			setTimeout(function() {
				ludoObject.player.newPlayerDiv.style.display = "none";
			}, 1000);
			this.newPlayerFormActive = false;
			document.getElementById('player_name').value = "";
			document.getElementById('new_player_btn').setAttribute('disabled', true);
		}
		else {
			this.newPlayerDiv.style.display = "block";
			this.newPlayerDiv.style.marginTop = "0px";
			this.newPlayerFormActive = true;
			document.getElementById('player_name').focus();
			
			if (ludoObject.isOnlineGame) {
				document.getElementById('new_computer_btn').setAttribute('disabled', true);
			}
		}
	},
	
	checkForCompetitorOnField: function(field) {
		
		var competitorOnField = false;
		
		// if there is one and only one piece on the field
		if (field.count == 1) {
			
			// we loop through our own pieces
			for (var i = 0; i < 4; i++) {
				
				// if none of our pieces has this field's id
				if (this.pieces[i].piece.pathID != field.id) {
					
					// then there is a competitor on this field
					competitorOnField = true;
				}
				else {
					// if we find one of our own pieces, we set competitorOnField to false, and break
					competitorOnField = false;
					break; // no need to check more pieces
				}
			}
		}
		
		return competitorOnField;
	},
	
	checkForStrikeOutPossibility: function() {
		
		var canStrikeOut = false;
		var pathIndex = undefined;
		var destinationIndex = undefined;
		
		// we loop through our pieces		
		for (var i = 0; i < 4; i++) {
			
			pathIndex = this.pieces[i].piece.pathIndex;
			destinationIndex = pathIndex + this.diceRoll;
			
			// we only check pieces in play, that is not trying to enter the Goal area
			if (!this.pieces[i].piece.inHome && !this.pieces[i].piece.inGoal && destinationIndex < ludoObject.PATH_LENGTH - 5) {
				
				// we look for a competitor on the destination field of our piece's path
				if (this.checkForCompetitorOnField(this.pieces[i].piece.path[destinationIndex])) {
					
					// if we find one we initiate safeFieldStrike to true
					var safeFieldStrike = true;
					
					// we want to know if the competitor is on a safe-field
					if (ludoObject.checkForSafeField(this.pieces[i].piece.path[destinationIndex].id)) {
							
							var colorOnSafe = ludoObject.getSafeFieldColor();
							var pieceOnSafe = ludoObject.getCompetitorPieceOnID(this.pieces[i].piece.path[destinationIndex].id, this.color);
							
							// and if it is is it it's own safe-field
							if (colorOnSafe == pieceOnSafe.color) {
								safeFieldStrike = false;
								console.log("Found " + pieceOnSafe.color + " piece on " + colorOnSafe + " safe-field, can't strike out");
							}
					}
					
					// we then check for a block on this piece's path
					var block = ludoObject.checkForBlockOnPath(this, this.pieces[i].piece, this.diceRoll);
					
					// if block returns 0
					if (block == 0 && !safeFieldStrike) {
						
						console.log(this.name + "'s piece: " + this.pieces[i].name + " will strike on ID: " + this.pieces[i].piece.path[destinationIndex].id);
						// we highlight it's path and set player ready to move
						canStrikeOut = true;
						ludoObject.highlightFields(this.pieces[i].piece, this.diceRoll);
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
						break;
					}
				}
			}
		}
		return canStrikeOut;
	},
	
	tryToMoveOutOfHome: function() {
		// result of trying to move piece out of home
		var result = false;
		// we loop through the players pieces
		for (var i = 0; i < 4; i++) {
			// if we find a piece in the home-position
			if (this.pieces[i].piece.inHome) {
				// we move it to the first position
				this.pieces[i].piece.moveToFirstPosition();
				// we set result to true
				result = true;
				break;
			}
		}
		
		return result;
	},
	
	tryToMoveMostAdvancedPiece: function() {
		// we register the result of this operation
		var result = false;
		
		var h1_i = this.pieces[0].piece.pathIndex ? this.pieces[0].piece.pathIndex : -1;
		var h2_i = this.pieces[1].piece.pathIndex ? this.pieces[1].piece.pathIndex : -1;
		var h3_i = this.pieces[2].piece.pathIndex ? this.pieces[2].piece.pathIndex : -1;
		var h4_i = this.pieces[3].piece.pathIndex ? this.pieces[3].piece.pathIndex : -1;
		
		// we get the index of the piece that has moved furthest on the board
		var mostAdvancedIndex = Math.max(h1_i, h2_i, h3_i, h4_i);
		
		// if the most advanced piece is not on the home-stretch
		if (mostAdvancedIndex != -1 && mostAdvancedIndex < ludoObject.PATH_LENGTH - 5) {
			
			// we loop through our pieces skipping the first piece
			for (var i = 1; i < 4; i++) {
				
				// we find the most advanced piece
				if (this.pieces[i].piece.pathIndex == mostAdvancedIndex) {
					
					// we then check for a block on this piece's path
					var block = ludoObject.checkForBlockOnPath(this, this.pieces[i].piece, this.diceRoll);
					
					// if block returns 0
					if (block == 0) {
						// we highlight it's path and set player ready to move
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
						
						ludoObject.highlightFields(this.pieces[i].piece, this.diceRoll);
						
						result = true;
						break;
					}
				}
			}
		}
		return result;
	},
	
	tryToMakeReadyToMove: function() {
		
		// if we find a strike out opportunity we return
		if (this.checkForStrikeOutPossibility()) {
			return this.readyToMove;
		}
		
		if (this.tryToMoveMostAdvancedPiece()) {
			return this.readyToMove;
		}
		
		// we loop through our pieces		
		for (var i = 0; i < 4; i++) {
					
			// we try to move the first piece we find, that is not in home or in goal
			if (!this.pieces[i].piece.inHome && !this.pieces[i].piece.inGoal) {
			
				if (!ludoObject.checkIfCanMoveToGoal(this.pieces[i].piece)) {
					
					// we check for a block on this piece's path
					var block = ludoObject.checkForBlockOnPath(this, this.pieces[i].piece, this.diceRoll);
					
					// if block returns 0
					if (block == 0) {
						
						// we highlight it's path and set player ready to move
						ludoObject.highlightFields(this.pieces[i].piece, this.diceRoll);
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
						break;
					}
					// else if we have a block before the goal-area
					else if (block < ludoObject.PATH_LENGTH - 1){
						// we grey out the fields
						ludoObject.greyOutFields(this.pieces[i].piece, block);
					}
				}
				// else if the piece was moved in to the Goal area, we break.
				else {
					break;
				}
			}
		}
		return this.readyToMove;
	},
	
	onlineSendCreateComputerRoll: function() {
		// this data will be the same every time we want the server to roll for
		// for an online player that has left the game and is now a computer player
		var data = {'computer_roll' : true,
					'game_index'	: ludoObject.onlineGameIndex, 
					'computer_color': this.color}
		ludoObject.connection.send( JSON.stringify(data) );
	},
	
	onlineTryToGetOutOfHome: function() {
		var data = {'all_in_home'	: true,
					'game_index'	: ludoObject.onlineGameIndex, 
					'computer_color': this.color}
		ludoObject.connection.send( JSON.stringify(data) );
	},
	
	onlineSwitchPlayer: function() {
		var data = {'switch_player'	: true, 
					'game_index'	: ludoObject.onlineGameIndex, 
					'color'			: this.color}
		ludoObject.connection.send( JSON.stringify(data) );
	},
	
	onlineSendNoMovablePieces: function() {
		var data = {"no_movable": true, 
					"game_index": ludoObject.onlineGameIndex, 
					"color": this.color};
		ludoObject.connection.send( JSON.stringify(data) );
	},
	
	onlineSetName: function(value, first) {
		this.name = value;
		this.computer = false;
		this.playerDiv.innerHTML = "<p>" + this.name + "</p>";
		
		if (first) {
			this.toggleNewPlayerForm();
		}
	},
	
	giveControl: function() {
		
		// if this player has all pieces in home
		if (this.checkForAllInHome()) {
			// we set all in home to true and turns left to 3
			this.allInHome = true;
			this.turnsLeft = 3;
		} else {
			// else we set all in home to false and turns left to 1
			this.allInHome = false;
			this.turnsLeft = 1;
		}
		
		this.active = true;
		
		// if this is a computer player
		if (this.computer && !ludoObject.isOnlineGame) {
		
			setTimeout(function() {
				// we roll the dice automatically
				ludoObject.dice.rollDice();
			}, 500);
		}
	}
	
}

