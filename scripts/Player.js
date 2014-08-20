

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
			this.newPlayerFormActive = false;
			document.getElementById('player_name').value = "";
			document.getElementById('new_player_btn').setAttribute('disabled', true);
		}
		else {
			this.newPlayerDiv.style.marginTop = "0px";
			this.newPlayerFormActive = true;	
		}
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
	
	tryToMakeReadyToMove: function() {
				
		for (var i = 0; i < 4; i++) {
			
			// we try to move the first piece we find
			if (!this.pieces[i].piece.inHome) {
				
					
				if (!ludoObject.checkIfCanMoveToGoal(this.pieces[i].piece)) {
						
					// we highlight it's path and set player ready to move
					if (ludoObject.highlightFields(this.pieces[i].piece)) {
						this.readyToMove = true;
						this.readyToMovePiece = this.pieces[i].piece;
						this.pieces[i].piece.selected = true;
						break;
					}
				}
				else {
					// if the piece was moved in to the Goal area, we break
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
	
	turn: function() {
		this.active = true;
	}
}


