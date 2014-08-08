

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
	
	giveControl: function() {
		
		console.log(this.name + ": Got Control");
		
	},
	
	turn: function() {
		this.active = true;
	}
}


