

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
	
	this.canMoveTo	= undefined; // this is coordinate based, not field id
	this.isAnimating = false;
}

Piece.prototype = {

	init: function(path, gLeft, gTop) {
		this.path = path;
		
		this.goal_left  = gLeft;
		this.goal_top   = gTop;
	},
	
	calculatePiecePos: function(i) {
		
		// debug
		if (this.path[i] == undefined) {
			console.log("Error: i = " + i);
			console.log("Path Index: " + this.pathIndex);
			console.log("In Home: " + this.inHome);
			console.log(arguments.callee.caller.toString());
		}
		
		var destinationX = this.path[i].offsetLeft;
		var destinationY = this.path[i].offsetTop;
		
		// for every step we update the pieces position
		if (this.step < this.stepLimit) {
			this.left = (((destinationX - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((destinationY - this.start_top) / this.stepLimit) * this.step) + this.start_top;
			this.step++;
		}
		// on the second to last step we do aditional checks
		else if (this.step == this.stepLimit) {
			
			// get the destination field count and id
			var tmpCount 	= this.path[this.pathIndex].getAttribute('count');
			var id 		 	= this.path[this.pathIndex].id;
			var pieceOnPath = undefined;
			
			// if there is not a competitor piece on the field we increase the fields count by 1
			if (!this.checkForCompetitorPieceOnPos(id)) {
				
				// we need to check if there
				tmpCount = new Number(tmpCount) + 1;
				this.path[this.pathIndex].setAttribute('count',tmpCount);
				
			}
			// if there is a competitor on the field 
			else {
				// we get the piece
				pieceOnPath = ludoObject.getPieceOnID(id);
				
				// we check if it's on it's safe field
				if (ludoObject.checkForSafeField(id)) {
					
					// and if it is. Is the piece safe ( -the same color as the field)
					if (pieceOnPath.color == ludoObject.getSafeFieldColor(id)) {
						
						// if we are moving on to a safe-field with a piece, we set an offset for our piece
						this.setSafeFieldOffset(id);
						
						// we also have to check if we have a piece there already
						for (var i = 0; i < 4; i++) {
							
							if (ludoObject.player.pieces[i].piece.pathID == id) {
								
								// if we do we increase the count of the safe-field by 1
								tmpCount = new Number(tmpCount) + 1;
								this.path[this.pathIndex].setAttribute('count',tmpCount);
								break;
							}
						}
					}
					// else if we are moving on to a field with a color that is not safe
					else {
						
						// we check to see if it's a block
						if (ludoObject.checkForBlockOnField(id)) {
							
							// if it's a block we offset our piece on the safe field
							tmpCount = 1; // and set it's spritesheet coords to the single piece, !THIS COULD BE 2 IN RARE EVENTS..
							this.setSafeFieldOffset(id);
						}
						else {
							// if it's not a block, we hit it home
							pieceOnPath.moveToHomePosition();
						}
					}
				}
				// if this is not a safe-field 
				else {
					// we hit the piece home
					pieceOnPath.moveToHomePosition();
				}
			}
			
			
			this.setSpritesheetCoordsTo(tmpCount);
			this.step++;
		}
		// when we have reached our destination we stop and give up control
		else {
			this.isAnimating 	= false;
			this.step 			= 0;
			this.start_left 	= this.left;
			this.start_top 		= this.top;
			this.selected 		= false;
			this.pathID			= this.path[this.pathIndex].id;
			
			if (ludoObject.player.turnsLeft < 1) {
				ludoObject.dice.endTurn();
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
		
		this.pathIndex 	= undefined;
		this.inGoal		= true;
		this.left 		= this.goal_left;
		this.top 		= this.goal_top;
		
		this.setSpritesheetCoordsTo(numInGoal);
		
		console.log(ludoObject.player.name + " has: " + numInGoal + " Pieces in Goal");
		
		if (numInGoal == 4) {
			console.log("Play winner animation");
			ludoObject.player.displayWinnerGraphic();
		}
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
	
	setSafeFieldOffset: function(id) {
		
		var color = ludoObject.getSafeFieldColor(id);
		var offset = 0;
		var result = 0;
		
		if (color == "yellow" || color == "green") {
			offset = -15;
		}
		else if (color == "red" || color == "blue") {
			offset = 15;
		}
		else {
			result = 1;
		}
		
		if (color == "yellow" || color == "blue") {
			
			this.left = this.left + offset;
		}
		else if (color == "red" || color == "green") {
			this.top = this.top + offset;
		}
		
		return result;
	},
	
	checkForCompetitorPieceOnPos: function(id) {
		
		var result = false;
		var field = document.getElementById(id);
		var breakOuter = false;
		
		// we loop through all players
		for (var j = 0; j < 4; j++) {
		
			if (breakOuter) {
				break;
			}
			
			// excluding ourselves
			if (ludoObject.players[j].color != this.color) {
				
				// we loop through each of our competitors pieces
				for (var k = 0; k < 4; k++) {
					
					// if we find a competitor on our destination id
					if (ludoObject.players[j].pieces[k].piece.pathID == id) {
						
						// we set the result to true
						result = true;
						breakOuter = true;
						break;
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
				
		this.calculatePiecePos(this.pathIndex);
	}
	
}