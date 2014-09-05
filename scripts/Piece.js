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
	
	this.woffSound		= document.getElementById('woff_sound');
	this.cheeringSound 	= document.getElementById('cheering_sound');
}

Piece.prototype = {

	init: function(path, gLeft, gTop) {
		this.path = path;
		
		this.goal_left  = gLeft;
		this.goal_top   = gTop;
		
		this.cheeringSound.volume = 0.8;
	},
	
	calculatePiecePos: function(i) {
		
		// for every step we update the pieces position
		if (this.step < this.stepLimit) {
			this.left = (((this.path[i].cell.offsetLeft - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((this.path[i].cell.offsetTop - this.start_top) / this.stepLimit) * this.step) + this.start_top;
			this.step++;
		}
		// on the second to last step we do aditional checks
		else if (this.step == this.stepLimit) {
			
			// get the destination field count and id
			var sprite_num	= undefined;
			var id 		 	= this.path[this.pathIndex].id;
			var pieceOnPath = undefined;
			
			// if there is not a competitor piece on the field 
			if (!this.checkForCompetitorPieceOnPos(id)) {
				
				// we set our spritesheet to the field count + 1
				sprite_num = this.path[this.pathIndex].count + 1;
				
				// and set the field count to the same number
				this.path[this.pathIndex].count = sprite_num;
				
			}
			// if there is a competitor on the field 
			else {
				// we get the piece
				pieceOnPath = ludoObject.getCompetitorPieceOnID(id, this.color);
				
				// for online purposes we need to get this player number
				var player = ludoObject.getPlayerForColor(this.color);
				
				// we check if it's on a safe-field
				if (ludoObject.checkForSafeField(id)) {
					
					// and if it is. Is the piece safe ( -the same color as the field)
					if (pieceOnPath.color == ludoObject.getSafeFieldColor(id)) {
					
						// if we are moving on to a safe-field with one piece, (can not be a block because we have already checked this)
						// we set an offset for our piece
						this.setSafeFieldOffset(id);
						
						// we also have to check if we have a piece there already
						for (var i = 0; i < 4; i++) {
							
							if (player.pieces[i].piece.pathID == id) {
								
								// if we do we set our spritesheet to the field count + 1
								sprite_num = this.path[this.pathIndex].count + 1;
								
								// and set the field count to the same number
								this.path[this.pathIndex].count = sprite_num;
								break;
							}
						}
						
						console.log(player.color + " is moving on to safe-field " + id + " Setting count to: " + this.path[this.pathIndex].count);
					}
					// else if we are moving on to a safe-field with a color that is not safe
					else {
						
						// we check to see if it's a block, 
						// we only do this if the piece comming in is moving on to it's own safe-field
						if (this.path[this.pathIndex].count > 1) {
							
							// if it's a block we set our spritesheet to the count of own pieces on own safe-field
							var tmpCount = 1;
							for (var i = 0; i < 4; i++) {
								if (player.pieces[i].piece.pathID == id) {
									tmpCount++;
								}
							}
							sprite_num = tmpCount;
							
							// and leave the field-count to the count of the existing block
							
							// finally we offset our single piece beside the block
							this.setSafeFieldOffset(id);
						}
						else {
							// if it's not a block, we set the sprite sheet to display a single piece
							sprite_num = 1;
							// and hit the competitor piece home
							pieceOnPath.moveToHomePosition();
						}

					}
				}
				// if the competitor piece is not on a safe-field 
				else {
					// we set the sprite sheet to display a single piece
					sprite_num = 1;
					// and hit the competitor piece home
					pieceOnPath.moveToHomePosition();
				}
			}
			
			
			this.setSpritesheetCoordsTo(sprite_num);
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
			console.log(this.color + " reached destination: " + this.pathID);
		}
	},
	
	moveToFirstPosition: function() {
				
		this.pathIndex 		= 0;
		this.isAnimating 	= true;
		this.inHome 		= false;
		
		ludoObject.playSound(this.cheeringSound);
	},
	
	moveToHomePosition: function() {
		
		this.pathIndex 		= undefined;
		this.pathID 		= undefined;
		this.left			= this.home_left;
		this.top			= this.home_top;
		this.start_left		= this.home_left;
		this.start_top		= this.home_top;
		this.inHome		 	= true;
		
		ludoObject.playSound(this.woffSound);
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
		else if (ludoObject.dice.faceNum != 6) {
			ludoObject.dice.endTurn();
		}
	},
	
	updateAllPlayerMultiplePieces: function(player, sheet_left, sheet_top) {
		
		// we loop through all of this players pieces
		for (var i = 0; i < 4; i++) {
			
			// if we find a piece on the destination field we set it's spritsheet coords to the same as this piece
			if (player.pieces[i].piece.pathIndex == this.pathIndex) {
				player.pieces[i].piece.sheet_left = sheet_left;
				player.pieces[i].piece.sheet_top = sheet_top;
			}
		}
	},
	
	setSpritesheetCoordsTo: function(count) {
								
		if (new Number(count) == 1) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_SINGLE.x;
				this.sheet_top  = ludoObject.YS_SINGLE.y;
				
				this.updateAllPlayerMultiplePieces(ludoObject.player1, ludoObject.YS_SINGLE.x, ludoObject.YS_SINGLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_SINGLE.x;
				this.sheet_top  = ludoObject.RS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player2, ludoObject.RS_SINGLE.x, ludoObject.RS_SINGLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_SINGLE.x;
				this.sheet_top  = ludoObject.BS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player3, ludoObject.BS_SINGLE.x, ludoObject.BS_SINGLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_SINGLE.x;
				this.sheet_top  = ludoObject.GS_SINGLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player4, ludoObject.GS_SINGLE.x, ludoObject.GS_SINGLE.y);
			}
		}
		else if (new Number(count) == 2) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_DOUBLE.x;
				this.sheet_top  = ludoObject.YS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player1, ludoObject.YS_DOUBLE.x, ludoObject.YS_DOUBLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_DOUBLE.x;
				this.sheet_top  = ludoObject.RS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player2, ludoObject.RS_DOUBLE.x, ludoObject.RS_DOUBLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_DOUBLE.x;
				this.sheet_top  = ludoObject.BS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player3, ludoObject.BS_DOUBLE.x, ludoObject.BS_DOUBLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_DOUBLE.x;
				this.sheet_top  = ludoObject.GS_DOUBLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player4, ludoObject.GS_DOUBLE.x, ludoObject.GS_DOUBLE.y);
			}
		}
		else if (new Number(count) == 3) {
			
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_TRIPLE.x;
				this.sheet_top  = ludoObject.YS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player1, ludoObject.YS_TRIPLE.x, ludoObject.YS_TRIPLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_TRIPLE.x;
				this.sheet_top  = ludoObject.RS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player2, ludoObject.RS_TRIPLE.x, ludoObject.RS_TRIPLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_TRIPLE.x;
				this.sheet_top  = ludoObject.BS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player3, ludoObject.BS_TRIPLE.x, ludoObject.BS_TRIPLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_TRIPLE.x;
				this.sheet_top  = ludoObject.GS_TRIPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player4, ludoObject.GS_TRIPLE.x, ludoObject.GS_TRIPLE.y);
			}
		}
		else if (new Number(count) == 4) {
			if (this.color == "yellow") {
				this.sheet_left = ludoObject.YS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.YS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player1, ludoObject.YS_QUATRUPLE.x, ludoObject.YS_QUATRUPLE.y);
			}
			else if (this.color == "red") {
				this.sheet_left = ludoObject.RS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.RS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player2, ludoObject.RS_QUATRUPLE.x, ludoObject.RS_QUATRUPLE.y);
			}
			else if (this.color == "blue") {
				this.sheet_left = ludoObject.BS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.BS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player3, ludoObject.BS_QUATRUPLE.x, ludoObject.BS_QUATRUPLE.y);
			}
			else if (this.color == "green") {
				this.sheet_left = ludoObject.GS_QUATRUPLE.x;
				this.sheet_top  = ludoObject.GS_QUATRUPLE.y;
				this.updateAllPlayerMultiplePieces(ludoObject.player4, ludoObject.GS_QUATRUPLE.x, ludoObject.GS_QUATRUPLE.y);
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
		this.path[moveToPos].cell.style.backgroundColor = 'bisque';
		
		this.canMoveTo = {
						x1: this.path[moveToPos].cell.offsetLeft, 
						y1: this.path[moveToPos].cell.offsetTop,
						x2: this.path[moveToPos].cell.offsetLeft + 32,
						y2: this.path[moveToPos].cell.offsetTop + 32
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