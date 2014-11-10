
var LudoTracker = function(color) {
	
	this.color 			= color;
	
	this.tracker_div 	= document.getElementById(color + "_tracker");
	this.tracker_table  = document.getElementById(color + "_tracker_tbl");
	this.percent_cell   = document.getElementById(color + "_percent_cell");
	
	this.piecesProgress = [0,0,0,0];
	this.progressPercent= undefined;
	
	this.interval		= 125;
	this.intervalHandle	= undefined;
	this.intervalNum	= undefined;
	
	this.yellow_colors 	= ["hsl( 60, 100%, 13%)","hsl( 60, 75%, 25%)","hsl( 60, 100%, 25%)","hsl( 60, 75%, 38%)","hsl( 60, 100%, 35%)","hsl( 60, 75%, 50%)","hsl( 60, 100%, 50%)","hsl( 60, 100%, 63%)","hsl( 60, 100%, 75%)","hsl( 60, 100%, 88%)"];
	this.red_colors 	= ["hsl(  0, 100%, 13%)","hsl(  0, 75%, 25%)","hsl(  0, 100%, 25%)","hsl(  0, 75%, 38%)","hsl(  0, 100%, 35%)","hsl(  0, 75%, 50%)","hsl(  0, 100%, 50%)","hsl(  0, 100%, 63%)","hsl(  0, 100%, 75%)","hsl(  0, 100%, 88%)"];
	this.blue_colors 	= ["hsl(210, 100%, 13%)","hsl(210, 75%, 25%)","hsl(210, 100%, 25%)","hsl(210, 75%, 38%)","hsl(210, 100%, 35%)","hsl(210, 75%, 50%)","hsl(210, 100%, 50%)","hsl(210, 100%, 63%)","hsl(210, 100%, 75%)","hsl(210, 100%, 88%)"];
	this.green_colors 	= ["hsl(120, 100%, 13%)","hsl(120, 75%, 25%)","hsl(120, 100%, 25%)","hsl(120, 75%, 38%)","hsl(120, 100%, 35%)","hsl(120, 75%, 50%)","hsl(120, 100%, 50%)","hsl(120, 100%, 63%)","hsl(120, 100%, 75%)","hsl(120, 100%, 88%)"];
}

LudoTracker.prototype = {

	update: function(pieces) {
		
		this.updatePiecesProgress(pieces);
		this.calculateProgressPercent();
		this.updateTable();
	},
	
	updatePiecesProgress: function(pieces) {
		
		for (var i = 0; i < 4; i++) {
			
			if (pieces[i].piece.pathIndex != undefined) {
				
				var percent = (pieces[i].piece.pathIndex + 1) / ludoObject.PATH_LENGTH;
				var dividedbyten = (percent * 100) / 10;
				var num = Math.ceil(dividedbyten);
				
				this.piecesProgress[i] = num;
				
			}
			else if (pieces[i].piece.inHome) {
				this.piecesProgress[i] = 0;
			}
			else if (pieces[i].piece.inGoal) {
				this.piecesProgress[i] = 10;
			}
		}
	},
	
	updateTable: function() {
		
		for (var i = 0; i < 4; i++) {
			
			for (var j = 0; j < 10; j++) {
				
				if (this.piecesProgress[i] > 0 &&  j < this.piecesProgress[i]) {
					this.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = this.getColor(j);
				}
				else {
					this.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = "";
				}
				
			}
		}
		
		this.percent_cell.innerHTML = "<p>" + this.progressPercent.toPrecision(2) + "%</p>";
		
	},
	
	getColor: function(index) {
				
		if (this.color == "yellow") {
			return this.yellow_colors[index];
		}
		else if (this.color == "red") {
			return this.red_colors[index];
		}
		else if (this.color == "blue") {
			return this.blue_colors[index];
		}
		else if (this.color == "green") {
			return this.green_colors[index];
		}
	},
	
	animateToZero: function(id, player) {
		
		var break_outer = false;
		
		for (var i = 0; i < 3; i++) {
			
			if (player.pieces[i].name == id) {
				
				break_outer = true;
				
				// we get the tracker row-count to blank out
					 if (id.indexOf("1" > -1)) { this.intervalNum = this.piecesProgress[0]; }
				else if (id.indexOf("2" > -1)) { this.intervalNum = this.piecesProgress[1]; }
				else if (id.indexOf("3" > -1)) { this.intervalNum = this.piecesProgress[2]; }
				else if (id.indexOf("4" > -1)) { this.intervalNum = this.piecesProgress[3]; }
				
				// we start the animation interval
				this.intervalHandle = setInterval(function() {
					// blanking out 1 field every 125 milliseconds
					player.tracker.blankOutField(i, player.tracker.intervalNum);
					// and reducing the row number to blank out by one as we go
					player.tracker.intervalNum--;
				}, this.interval);
			}
			
			// when we have found the piece to remove it's progress row from
			if (break_outer) {
				// we break the loop
				break;
			}
		}
	},
	
	blankOutField: function(i, j) {
		
		if (this.color == "yellow") {
			ludoObject.player1.tracker.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = "";
		}
		else if (this.color == "red") {
			ludoObject.player2.tracker.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = "";
		}
		else if (this.color == "blue") {
			ludoObject.player3.tracker.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = "";
		}
		else if (this.color == "green") {
			ludoObject.player4.tracker.tracker_table.children[1].children[Math.abs(j - 9)].children[i].style.backgroundColor = "";
		}
		
		if (this.intervalNum < 1) {
			clearInterval(this.intervalHandle);
		}
		
	},
	
	calculateProgressPercent: function() {
		
		var tmpComplete = this.piecesProgress[0] + this.piecesProgress[1] + this.piecesProgress[2] + this.piecesProgress[3];
		this.progressPercent = (tmpComplete / 40) * 100;
	}
	
}