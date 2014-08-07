

var Piece = function(X, Y, sheet_left, sheet_top) {
	
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
		else {
			this.isAnimating = false;
			this.step = 0;
			this.start_left = this.left;
			this.start_top = this.top;
		}
	},
	
	moveToFirstPosition: function() {
			
		this.pathIndex 		= 0;
		this.isAnimating 	= true;
		this.inHome 		= false;
	},
	
	highlightMoveToPos: function(diceRoll) {
		
		this.selected = true;
		
		var moveToPos = this.pathIndex + diceRoll;
		this.path[moveToPos].style.backgroundColor = 'bisque';
		
		this.canMoveTo = {
						x1: this.path[moveToPos].offsetLeft, 
						y1: this.path[moveToPos].offsetTop,
						x2: this.path[moveToPos].offsetLeft + 32,
						y2: this.path[moveToPos].offsetTop + 32
						};
	},
	
	move: function(i) {
		
		this.pathIndex = i;
		this.isAnimating = true;
		
		this.calculatePiecePos(i);
	}
}