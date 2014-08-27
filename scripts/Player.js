

var Player = function(color, name) {
	
	this.name 		 = name;
	this.color 		 = color;
	this.computer	 = true;
					 
	this.pieces		 = undefined;
	this.readyToMovePiece = undefined;
	this.allInHome   = true;
					 
	this.diceRoll 	 = undefined;
	this.turnsLeft	 = 3;
					 
	this.playerDiv   = undefined;
	this.active		 = false;
	this.readyToMove = false;

	this.piecesInGoal = 0;
	
	this.newPlayerDiv = document.getElementById('new_player_div');
	this.newPlayerFormActive = false;

}

Player.prototype = {
	
	init: function() {
		
		if (this.color == "yellow") {
			this.playerDiv = document.getElementById('player1_div');
		}
		else if(this.color == "red") {
			this.playerDiv = document.getElementById('player2_div');
		}
		else if(this.color == "blue") {
			this.playerDiv = document.getElementById('player3_div');
		}
		else if(this.color == "green") {
			this.playerDiv = document.getElementById('player4_div');
		}
		
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
		
		if (allInHome) {
			/* 	console.log(this.name + ": has all pieces in home"); */
			this.allInHome = true;
			this.turnsLeft = 3;
		}
	},
	
	displayNoMovablePieces: function() {
		
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
		}
	},
	
	checkForCompetitorOnField: function(id) {
		
		var competitorOnField = false;
		var field = document.getElementById(id);
		
		// if there is one and only one piece on the field
		if (new Number(field.getAttribute('count')) == 1) {
			
			// we loop through our own pieces
			for (var i = 0; i < 4; i++) {
				
				// if none of our pieces has this field's id
				if (this.pieces[i].piece.pathID != id) {
					
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
				
				if (this.checkForCompetitorOnField(this.pieces[i].piece.path[destinationIndex].id)) {
					
					var safeFieldStrike = true;
					
					// we want to know if the competitor is on a safe-field
					if (ludoObject.checkForSafeField(this.pieces[i].piece.path[destinationIndex].id)) {
							
							var colorOnSafe = ludoObject.getSafeFieldColor();
							var pieceOnSafe = ludoObject.getPieceOnID(this.pieces[i].piece.path[destinationIndex].id);
							
							// and if it is is it it's own safe-field
							if (colorOnSafe == pieceOnSafe.color) {
								safeFieldStrike = false;
								console.log("Found " + pieceOnSafe.color + " piece on " + colorOnSafe + " safe-field, can't strike out");
							}
					}
					
					// we then check for a block on this piece's path
					var block = ludoObject.checkForBlockOnPath(this.pieces[i].piece);
					
					// if block returns 0
					if (block == 0 && !safeFieldStrike) {
						
						console.log(this.name + "'s piece: " + this.pieces[i].name + " will strike on ID: " + this.pieces[i].piece.path[destinationIndex].id);
						// we highlight it's path and set player ready to move
						canStrikeOut = true;
						ludoObject.highlightFields(this.pieces[i].piece);
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
		
		var result = false;
		
		for (var i = 0; i < 4; i++) {
			if (this.pieces[i].piece.inHome) {
				this.pieces[i].piece.moveToFirstPosition();
				result = true;
				break;
			}
		}
		
		return result;
	},
	
	tryToMoveMostAdvancedPiece: function() {
		
		var result = false;
		
		var h1_i = this.pieces[0].piece.pathIndex ? this.pieces[0].piece.pathIndex : -1;
		var h2_i = this.pieces[1].piece.pathIndex ? this.pieces[1].piece.pathIndex : -1;
		var h3_i = this.pieces[2].piece.pathIndex ? this.pieces[2].piece.pathIndex : -1;
		var h4_i = this.pieces[3].piece.pathIndex ? this.pieces[3].piece.pathIndex : -1;
		
		var mostAdvancedIndex = Math.max(h1_i, h2_i, h3_i, h4_i);
		
		if (mostAdvancedIndex != -1 && mostAdvancedIndex < ludoObject.PATH_LENGTH - 5) {
			
			// we loop through our pieces skipping the first piece
			for (var i = 1; i < 4; i++) {
				
				if (this.pieces[i].piece.pathIndex == mostAdvancedIndex) {
					
					// we then check for a block on this piece's path
					var block = ludoObject.checkForBlockOnPath(this.pieces[i].piece);
					
					// if block returns 0
					if (block == 0) {
						// we highlight it's path and set player ready to move
						console.log(this.name + "'s piece: " + this.pieces[i].name + " is the most advanced");
						result = true;
						ludoObject.highlightFields(this.pieces[i].piece);
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
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
					var block = ludoObject.checkForBlockOnPath(this.pieces[i].piece);
					
					// if block returns 0
					if (block == 0) {
						
						// we highlight it's path and set player ready to move
						console.log(this.name + "'s piece: " + this.pieces[i].name + " is Ready to move on a " + this.diceRoll);
						ludoObject.highlightFields(this.pieces[i].piece);
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
						break;
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
	
	giveControl: function() {
		
		this.checkForAllInHome();
		
		if (this.computer) {
			setTimeout(function() {
				ludoObject.dice.rollDice();
			}, 500);
		}
	},
	
	setName: function(value) {
		this.name = value;
		this.computer = false;
		this.init();
		this.toggleNewPlayerForm();
	},
	
	turn: function() {
		this.active = true;
	}
}


