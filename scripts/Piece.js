

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
	this.step		= 0;
	this.stepLimit  = 50;
}

Piece.prototype = {
	
	calculatePiecePos: function(i) {
		var destinationX = this.path[i].offsetLeft;
		var destinationY = this.path[i].offsetTop;
		
		if (this.step < this.stepLimit) {
			this.left = (((destinationX - this.start_left) / this.stepLimit) * this.step) + this.start_left;
			this.top = (((destinationY - this.start_top) / this.stepLimit) * this.step) + this.start_top;
		}
		this.step++;
	},
	
	move: function(i) {
		this.isAnimating = true;
		this.calculatePiecePos(i);
	}
}