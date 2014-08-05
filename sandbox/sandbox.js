
// ! variables -------------------------------------------------------------------------------
var spritesheet = new Image();
var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

var Piece = function(X, Y, sheet_left, sheet_top) {
	
	this.start_left = X;
	this.start_top  = Y;
	
	this.sheet_left = sheet_left, // X position in spritesheet
	this.sheet_top  = sheet_top,  // Y position in spritesheet
	
	this.left		= X;
	this.top		= Y;
	
	this.inHome		= true;
	
	this.path 		= undefined;
	this.path_index = undefined;
}

var y_H1 = new Piece(109, 397, 18, 13);

var stepLimit = 100;
var step = 1;

function makeEaseInOutTransducer(percentComplete) {
   
      return percentComplete - Math.sin(percentComplete*2*Math.PI) / (2*Math.PI);
};

function setX(piece) {
	
	if (step < stepLimit) {
		
		piece.left = (((192 - piece.start_left) / stepLimit) * step) + piece.start_left;
		
	}
	
}

function setY(piece) {

	if (step < stepLimit) {
		
		piece.top = (((416 - piece.start_top) / stepLimit) * step) + piece.start_top;
	}
		
}

function calculatePiecePos(p) {
	
	var destinationX = 400;
	var destinationY = 400;
	
	

	
	if (step < stepLimit) {
		var l = (((192 - p.start_left) / stepLimit) * step) + p.start_left;
		var t = makeEaseInOutTransducer((l / 100) - 1);
		var newStep = step * t;
		
		p.left = (((destinationX - p.start_left) / stepLimit) * newStep) + p.start_left;
		p.top = (((destinationY - p.start_top) / stepLimit) * newStep) + p.start_top;
		
		console.log(t);
		++step;
	}
	
}

function move() {
	
	context.save();
	context.clearRect(0,0, canvas.width, canvas.height);
	
	
	
	context.drawImage(spritesheet,
					  y_H1.sheet_left, 
					  y_H1.sheet_top,
					  32, 32,
					  y_H1.left, 
					  y_H1.top,
					  32, 32);
					  
/*
	setX(y_H1);
	setY(y_H1);
*/
	calculatePiecePos(y_H1);
					  
	context.restore();
}

function draw() {
	move();
}

function animate() {
	draw();
	
    requestNextAnimationFrame(animate);
}

function start() {
	
	console.log(y_H1);

	spritesheet.src = '../images/spritesheet.png';
	
	spritesheet.onload = function (e) {
    	requestNextAnimationFrame(animate);
/* 		console.log(gamePiecesArray); */
    };
}

start();