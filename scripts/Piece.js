

var Piece = function(color, X, Y, sheet_left, sheet_top) {
	
	this.color = color;
	
	this.start_left = X;
	this.start_top  = Y;
	
	this.sheet_left = sheet_left, // X position in spritesheet
	this.sheet_top  = sheet_top,  // Y position in spritesheet
	
	this.left		= X;
	this.top		= Y;
	
	this.inHome		= true;
	
	this.path 		= undefined;
	this.pathIndex 	= undefined;
	
	this.isAnimating = false;
	this.selected 	= false;
	this.step		= 0;
	this.stepLimit  = 50;
	
	this.canMoveTo		= undefined;
}

Piece.prototype = {
	
	calculatePiecePos: function(i) {
		
		var destinationX = this.path[i].offsetLeft;
		var destinationY = this.path[i].offsetTop;
		
		if (this.step < this.stepLimit) {
			this.left = (((destinationX - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((destinationY - this.start_top) / this.stepLimit) * this.step) + this.start_top;
			this.step++;
		}
		else if (this.step == this.stepLimit) {

			// check if there is a piece on this field
			var count = this.path[this.pathIndex].getAttribute('count');
			this.path[this.pathIndex].setAttribute('count', new Number(count) + 1);
			this.checkForMultiplePiecesOnPos();
			this.step++;
		}
		else {
			this.isAnimating = false;
			this.step = 0;
			this.start_left = this.left;
			this.start_top = this.top;
			this.selected = false;
			
			if (ludoObject.player.turnsLeft < 1) {
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
	
	updateAllPlayerMultiplePieces: function(sheet_left, sheet_top) {
		for (var i = 0; i < 4; i++) {
			if (ludoObject.player.pieces[i].piece.pathIndex == this.pathIndex) {
				ludoObject.player.pieces[i].piece.sheet_left = sheet_left;
				ludoObject.player.pieces[i].piece.sheet_top = sheet_top;
			}
		}
	},
	
	checkForMultiplePiecesOnPos: function() {
		
		var count = this.path[this.pathIndex].getAttribute('count');
		
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