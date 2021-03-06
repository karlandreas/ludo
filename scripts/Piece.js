
var Piece = function(color, home, spritesheet) {
	
	// color = "yellow"
	// home = {name: 'g_H1', x:  48, y: 103};
	// spritesheet = {x: 156, y: 5};
	
	this.id	  		= home.name;
	this.color 		= color;
	
	this.home_left  = home.x; // position of home cell
	this.home_top   = home.y; 
	
	this.start_left = home.x;
	this.start_top  = home.y;
	
	this.left		= home.x;
	this.top		= home.y;
	
	this.goal_left  = undefined; // pieces position in the goal cell
	this.goal_top   = undefined;
	
	this.sheet_left = spritesheet.x,  // position in spritesheet
	this.sheet_top  = spritesheet.y,  
	
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
	this.showAnimal = true;
	
	this.woffSound		= document.getElementById('woff_sound');
	this.cheeringSound 	= document.getElementById('cheering_sound');
}

Piece.prototype = {

	init: function(path, goalCoords) {
		
		// goalCoords = {gLeft: 194, gTop: 224};
		
		this.path = path; // this piece's path to the goal in a gameboard cells array
		
		this.goal_left  = goalCoords.gLeft;
		this.goal_top   = goalCoords.gTop;
		
		this.cheeringSound.volume = 0.25;
		this.woffSound.volume = 0.5;
	},
	
	calculatePiecePos: function(i) {
		
		// for every step we update the pieces position
		if (this.step < this.stepLimit) {
			// we compensate offsetLeft and Top for pieces being a bit larger than the cells
			var offL = this.path[i].cell.offsetLeft - 4;
			var offT = this.path[i].cell.offsetTop - 3;
			// and set the left and top margins accordingly
			this.left = (((offL - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((offT - this.start_top) / this.stepLimit) * this.step) + this.start_top;
			this.step++;
		} 
		// we don't want to set left and top on the last step in case
		else {
			// we have landed on a safe-field and have set a offset for left and top
			this.step++;
		}
		
		// on step 10 we set spritsheet coords to 6 and showAnimal to false
		if (this.step == this.stepLimit - 40 && this.pathIndex != 0) {
			this.setSpritesheetCoordsTo(6);
			this.showAnimal = false;
		}
		// on step 20 we set spritsheet coords to 5 and showAnimal to true
		if (this.step == this.stepLimit - 30 && this.pathIndex != 0) {
			this.setSpritesheetCoordsTo(5);
			this.showAnimal = true;
		}
		// on step 30 we set spritsheet coords to 6 and showAnimal to false
		if (this.step == this.stepLimit - 20) {
			this.setSpritesheetCoordsTo(6);
			this.showAnimal = false;
		}
		// on step 39 we set show Animal to false
		else if (this.step == this.stepLimit - 11) {
			this.showAnimal = false;
		}
		// on step 40 we set spritsheet coords to 1
		else if (this.step == this.stepLimit - 10) {
			this.setSpritesheetCoordsTo(1);
		}
		// on the last step we do aditional checks
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
						
						console.log(player.color + " is moving on to safe-field " + id + " Setting top to: " + this.top);
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
		}
		// when we have reached our destination we stop and give up control
		else if (this.step > this.stepLimit){
			this.isAnimating 	= false;
			this.showAnimal		= false;
			this.step 			= 0;
			this.start_left 	= this.left;
			this.start_top 		= this.top;
			this.selected 		= false;
			this.pathID			= this.path[this.pathIndex].id;
		}
	},
	
	moveToFirstPosition: function() {
		
		var player = ludoObject.getPlayerForColor(this.color);
		
		this.pathIndex 		= 0;
		this.isAnimating 	= true;
		this.inHome 		= false;
		
		// we play a cheering sound
		ludoObject.playSound(this.cheeringSound);
		// we update the players progress bar 
		player.tracker.update(player.pieces);
	},
	
	moveToHomePosition: function() {
	
		var player = ludoObject.getPlayerForColor(this.color);
		
		this.pathIndex 		= undefined;
		this.pathID 		= undefined;
		this.left			= this.home_left;
		this.top			= this.home_top;
		this.start_left		= this.home_left;
		this.start_top		= this.home_top;
		this.inHome		 	= true;
		this.setSpritesheetCoordsTo(5);
		
		// we play a woff sound
		ludoObject.playSound(this.woffSound);
		// we update the players progress bar 
		player.tracker.animateToZero(this.id, player);
	},
	
	moveToGoal: function(numInGoal) {
		
		var player = ludoObject.getPlayerForColor(this.color);
		
		this.pathIndex 	= undefined;
		this.inGoal		= true;
		this.left 		= this.goal_left;
		this.top 		= this.goal_top;
		
		this.setSpritesheetCoordsTo(numInGoal);
		
		// we update the players progress bar 
		player.tracker.update(player.pieces);
				
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
			if (player.pieces[i].piece.pathIndex == this.pathIndex && !player.pieces[i].piece.inHome) {
				player.pieces[i].piece.sheet_left = sheet_left;
				player.pieces[i].piece.sheet_top = sheet_top;
			}
		}
	},
	
	setSpritesheetCoordsTo: function(count) {
		
		switch(count) {
			case 1:
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
				break;
			case 2:
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
				break;
			case 3:
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
				break;
			case 4:
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
				break;
			case 5:
				if (this.color == "yellow") {
					this.sheet_left = ludoObject.YS_MOVE.x;
					this.sheet_top  = ludoObject.YS_MOVE.y;
				}
				else if (this.color == "red") {
					this.sheet_left = ludoObject.RS_MOVE.x;
					this.sheet_top  = ludoObject.RS_MOVE.y;
				}
				else if (this.color == "blue") {
					this.sheet_left = ludoObject.BS_MOVE.x;
					this.sheet_top  = ludoObject.BS_MOVE.y;
				}
				else if (this.color == "green") {
					this.sheet_left = ludoObject.GS_MOVE.x;
					this.sheet_top  = ludoObject.GS_MOVE.y;
				}
				break;
			case 6:
				if (this.color == "yellow") {
					this.sheet_left = ludoObject.YS_MOVE_HALF.x;
					this.sheet_top  = ludoObject.YS_MOVE_HALF.y;
				}
				else if (this.color == "red") {
					this.sheet_left = ludoObject.RS_MOVE_HALF.x;
					this.sheet_top  = ludoObject.RS_MOVE_HALF.y;
				}
				else if (this.color == "blue") {
					this.sheet_left = ludoObject.BS_MOVE_HALF.x;
					this.sheet_top  = ludoObject.BS_MOVE_HALF.y;
				}
				else if (this.color == "green") {
					this.sheet_left = ludoObject.GS_MOVE_HALF.x;
					this.sheet_top  = ludoObject.GS_MOVE_HALF.y;
				}
				break;
			default:
				console.log("Set spritesheet switch statement did not execute");
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