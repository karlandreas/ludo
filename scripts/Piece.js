

var Piece = function(color, X, Y, sheet_left, sheet_top) {
	
	this.color = color;
	
	this.home_left  = X;
	this.home_top   = Y;
	
	this.start_left = X;
	this.start_top  = Y;
	
	this.goal_left  = undefined;
	this.goal_top   = undefined;
	
	this.sheet_left = sheet_left, // X position in spritesheet
	this.sheet_top  = sheet_top,  // Y position in spritesheet
	
	this.left		= X;
	this.top		= Y;
	
	this.inHome		= true;
	this.inGoal		= false;
	
	this.path 		= undefined;
	this.pathIndex 	= undefined;
	this.pathID		= undefined;
	
	this.selected 	= false;
	this.step		= 0;
	this.stepLimit  = 50;
	
	this.canMoveTo	= undefined;
	this.isAnimating = false;
}

Piece.prototype = {

	init: function(path, gLeft, gTop) {
		this.path = path;
		
		this.goal_left  = gLeft;
		this.goal_top   = gTop;
	},
	
	calculatePiecePos: function(i) {
		
		var destinationX = this.path[i].offsetLeft;
		var destinationY = this.path[i].offsetTop;
		
		if (this.step < this.stepLimit) {
			this.left = (((destinationX - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((destinationY - this.start_top) / this.stepLimit) * this.step) + this.start_top;
			this.step++;
		}
		else if (this.step == this.stepLimit) {
			
			// get the destination field count
			var tmpCount = this.path[this.pathIndex].getAttribute('count');
			
			// if there is not a competitor piece on the field we increase the fields count by 1
			if (!this.checkForCompetitorPieceOnPos(this.path[this.pathIndex].id)) {
				
				tmpCount = new Number(tmpCount) + 1;
				this.path[this.pathIndex].setAttribute('count',tmpCount);
				
			}
			
			
			this.setSpritesheetCoordsTo(tmpCount);
			this.step++;
		}
		else {
			this.isAnimating 	= false;
			this.step 			= 0;
			this.start_left 	= this.left;
			this.start_top 		= this.top;
			this.selected 		= false;
			this.pathID			= this.path[this.pathIndex].id;
			
			if (ludoObject.player.turnsLeft < 1) {
				ludoObject.player.diceRoll = undefined;
				ludoObject.setActivePlayer();
				ludoObject.player.giveControl();
			}
		}
	},
	
	moveToFirstPosition: function() {
				
		this.pathIndex 		= 0;
		this.isAnimating 	= true;
		this.inHome 		= false;
	},
	
	moveToHomePosition: function() {
		
		this.pathIndex 		= undefined;
		this.pathID 		= undefined;
		this.left			= this.home_left;
		this.top			= this.home_top;
		this.start_left		= this.home_left;
		this.start_top		= this.home_top;
		this.inHome		 	= true;
	},
	
	moveToGoal: function(numInGoal) {
		
		this.pathIndex 	= 56;
		this.inGoal		= true;
		this.left 		= this.goal_left;
		this.top 		= this.goal_top;
		
		this.setSpritesheetCoordsTo(numInGoal);
		
		console.log("Player has: " + numInGoal + " Pieces in Goal");
	},
	
	updateAllPlayerMultiplePieces: function(sheet_left, sheet_top) {
		
		// we loop through all of this players pieces
		for (var i = 0; i < 4; i++) {
			
			// if we find a piece on the destination field we set it's spritsheet coords to the same as this piece
			if (ludoObject.player.pieces[i].piece.pathIndex == this.pathIndex) {
				ludoObject.player.pieces[i].piece.sheet_left = sheet_left;
				ludoObject.player.pieces[i].piece.sheet_top = sheet_top;
			}
		}
	},
	
	setSpritesheetCoordsTo: function(count) {
								
		if (new Number(count) == 1) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_SINGLE.x;
				this.sheet_top  = ludoObject.YS_SINGLE.y;
				
				this.updateAllPlayerMultiplePieces(ludoObject.YS_SINGLE.x, ludoObject.YS_SINGLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_SINGLE.x;
				this.sheet_top  = ludoObject.RS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.RS_SINGLE.x, ludoObject.RS_SINGLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_SINGLE.x;
				this.sheet_top  = ludoObject.BS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.BS_SINGLE.x, ludoObject.BS_SINGLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_SINGLE.x;
				this.sheet_top  = ludoObject.GS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.GS_SINGLE.x, ludoObject.GS_SINGLE.y);
			}
		}
		else if (new Number(count) == 2) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_DOUBLE.x;
				this.sheet_top  = ludoObject.YS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.YS_DOUBLE.x, ludoObject.YS_DOUBLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_DOUBLE.x;
				this.sheet_top  = ludoObject.RS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.RS_DOUBLE.x, ludoObject.RS_DOUBLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_DOUBLE.x;
				this.sheet_top  = ludoObject.BS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.BS_DOUBLE.x, ludoObject.BS_DOUBLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_DOUBLE.x;
				this.sheet_top  = ludoObject.GS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.GS_DOUBLE.x, ludoObject.GS_DOUBLE.y);
			}
		}
		else if (new Number(count) == 3) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_TRIPLE.x;
				this.sheet_top  = ludoObject.YS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.YS_TRIPLE.x, ludoObject.YS_TRIPLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_TRIPLE.x;
				this.sheet_top  = ludoObject.RS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.RS_TRIPLE.x, ludoObject.RS_TRIPLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_TRIPLE.x;
				this.sheet_top  = ludoObject.BS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.BS_TRIPLE.x, ludoObject.BS_TRIPLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_TRIPLE.x;
				this.sheet_top  = ludoObject.GS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.GS_TRIPLE.x, ludoObject.GS_TRIPLE.y);
			}
		}
		else if (new Number(count) == 4) {
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.YS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.YS_QUATRUPLE.x, ludoObject.YS_QUATRUPLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.RS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.RS_QUATRUPLE.x, ludoObject.RS_QUATRUPLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.BS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.BS_QUATRUPLE.x, ludoObject.BS_QUATRUPLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.GS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.GS_QUATRUPLE.x, ludoObject.GS_QUATRUPLE.y);
			}
		}
		
	},
	
	checkForCompetitorPieceOnPos: function(id) {
		
		var result = false;
		var safeFieldColor = undefined;
		var offset = undefined;
		var field = document.getElementById(id);
		
		// if the destination field's count equals 1
		if (new Number(field.getAttribute('count')) == 1) {
		
			if (id == "x7y2") {
				safeFieldColor = "yellow";
				offset = -15;
			}
			else if (id == "x14y7") {
				safeFieldColor = "red";
				offset = 15;
			}
			else if (id == "x9y14") {
				safeFieldColor = "blue";
				offset = 15;
			}
			else if (id == "x2y9") {
				safeFieldColor = "green";
				offset = -15;
			}
		
			// we loop through all players
			for (var j = 0; j < 4; j++) {
				
				// excluding ourselves
				if (ludoObject.players[j].color != this.color) {
					
					// we loop through each of our competitors pieces
					for (var k = 0; k < 4; k++) {
						
						// if we find a competitor on our destination id
						if (ludoObject.players[j].pieces[k].piece.pathID == id) {
							
							// if our destination is a safe-field
							if (safeFieldColor != undefined) {
								
								// if the color of the piece on the safe-field is the same as the safeFieldColor
								if (ludoObject.players[j].pieces[k].piece.color == safeFieldColor) {
									
									// we put our piece beside it
									result = true;
									
									if (safeFieldColor == "yellow" || safeFieldColor == "blue") {
										this.left = this.left + offset;
									}
									else {
										this.top = this.top + offset;
									}
								}
								else {
									
									// if the color of this piece is the same as the piece on the safeField
									if (this.color == safeFieldColor) {
										// we hit it home and leave the result variable to false, which will increase this field count to 2
										ludoObject.players[j].pieces[k].piece.moveToHomePosition();
									}
									else {
										// if color of the piece is not the same as the safeFieldColor we hit it home
										result = true;
										ludoObject.players[j].pieces[k].piece.moveToHomePosition();
									}
								}
							}
							else {
								// if this is not a safe-field we hit the piece to home.
								result = true;
								ludoObject.players[j].pieces[k].piece.moveToHomePosition();
							}
						}
					}
				}
			}
		}
		
		return result;
	},
	
	highlightMoveToPos: function(diceRoll) {
		
		this.setSelected();
		
		var moveToPos = this.pathIndex + diceRoll;
		this.path[moveToPos].style.backgroundColor = 'bisque';
		
		this.canMoveTo = {
						x1: this.path[moveToPos].offsetLeft, 
						y1: this.path[moveToPos].offsetTop,
						x2: this.path[moveToPos].offsetLeft + 32,
						y2: this.path[moveToPos].offsetTop + 32
						};
	},
	
	setSelected: function() {
		for (var i = 0; i < 4; i++) {
			ludoObject.player.pieces[i].piece.selected = false;
		}
		this.selected = true;
	},
	
	move: function() {
		
		this.isAnimating = true;
		
		this.calculatePiecePos(this.pathIndex);
	}
}