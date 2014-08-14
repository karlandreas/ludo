

var Player = function(color, name) {
	
	this.name 		 = name;
	this.color 		 = color;
					 
	this.pieces		 = undefined;
	this.allInHome   = true;
					 
	this.diceRoll 	 = undefined;
	this.turnsLeft	 = 3;
					 
	this.playerDiv   = undefined;
	this.active		 = false;
	this.readyToMove = false;

	this.piecesInGoal = 0;
		
	this.displaysMoveToIndicator = false;
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
			console.log(this.name + ": has all pieces in home");
			this.allInHome = true;
			this.turnsLeft = 3;
		}
	},
	
	giveControl: function() {
		
		this.checkForAllInHome();
	},
	
	turn: function() {
		this.active = true;
	}
}


