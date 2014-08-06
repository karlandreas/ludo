
// ! variables -------------------------------------------------------------------------------
var spritesheet = new Image();
var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

// ! GAMEBOARD cells -----------------------------------------------------------------------------

// ! green path cells
var g01 = document.getElementById('x6y7');
var g02 = document.getElementById('x5y7');
var g03 = document.getElementById('x4y7');
var g04 = document.getElementById('x3y7');
var g05 = document.getElementById('x2y7');
var g06 = document.getElementById('x1y7');
var g07 = document.getElementById('x1y8');
var g08 = document.getElementById('x1y9');
var g09 = document.getElementById('x2y9');
var g10 = document.getElementById('x3y9');
var g11 = document.getElementById('x4y9');
var g12 = document.getElementById('x5y9');
var g13 = document.getElementById('x6y9');

// green path array
var g_path_cells = new Array(g01, g02, g03, g04, g05, g06, g07, g08, g09, g10, g11, g12, g13);

// green home stretch cells
var g14 = document.getElementById('x2y8');
var g15 = document.getElementById('x3y8');
var g16 = document.getElementById('x4y8');
var g17 = document.getElementById('x5y8');
var g18 = document.getElementById('x6y8');

// green homestretch array
var g_homestretch_cells = new Array(g14, g15, g16, g17, g18);



// ! blue path cells
var b01 = document.getElementById('x7y10');
var b02 = document.getElementById('x7y11');
var b03 = document.getElementById('x7y12');
var b04 = document.getElementById('x7y13');
var b05 = document.getElementById('x7y14');
var b06 = document.getElementById('x7y15');
var b07 = document.getElementById('x8y15');
var b08 = document.getElementById('x9y15');
var b09 = document.getElementById('x9y14');
var b10 = document.getElementById('x9y13');
var b11 = document.getElementById('x9y12');
var b12 = document.getElementById('x9y11');
var b13 = document.getElementById('x9y10');

// blue path array
var b_path_cells = new Array(b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, b12, b13);

// ! blue home stretch cells
var b14 = document.getElementById('x8y14');
var b15 = document.getElementById('x8y13');
var b16 = document.getElementById('x8y12');
var b17 = document.getElementById('x8y11');
var b18 = document.getElementById('x8y10');

// blue homestretch array
var b_homestretch_cells = new Array(b14, b15, b16, b17, b18);


// ! red path cells
var r01 = document.getElementById('x10y9');
var r02 = document.getElementById('x11y9');
var r03 = document.getElementById('x12y9');
var r04 = document.getElementById('x13y9');
var r05 = document.getElementById('x14y9');
var r06 = document.getElementById('x15y9');
var r07 = document.getElementById('x15y8');
var r08 = document.getElementById('x15y7');
var r09 = document.getElementById('x14y7');
var r10 = document.getElementById('x13y7');
var r11 = document.getElementById('x12y7');
var r12 = document.getElementById('x11y7');
var r13 = document.getElementById('x10y7');

// red path array
var r_path_cells = new Array(r01, r02, r03, r04, r05, r06, r07, r08, r09, r10, r11, r12, r13);

// ! red home stretch cells
var r14 = document.getElementById('x14y8');
var r15 = document.getElementById('x13y8');
var r16 = document.getElementById('x12y8');
var r17 = document.getElementById('x11y8');
var r18 = document.getElementById('x10y8');

// red homestretch array
var r_homestretch_cells = new Array(r14, r15, r16, r17, r18);



// ! Yellow path cells
var y01 = document.getElementById('x9y6');
var y02 = document.getElementById('x9y5');
var y03 = document.getElementById('x9y4');
var y04 = document.getElementById('x9y3');
var y05 = document.getElementById('x9y2');
var y06 = document.getElementById('x9y1');
var y07 = document.getElementById('x8y1');
var y08 = document.getElementById('x7y1');
var y09 = document.getElementById('x7y2');
var y10 = document.getElementById('x7y3');
var y11 = document.getElementById('x7y4');
var y12 = document.getElementById('x7y5');
var y13 = document.getElementById('x7y6');

// yellow path array
var y_path_cells = new Array(y01, y02, y03, y04, y05, y06, y07, y08, y09, y10, y11, y12, y13);

// ! Yellow home stretch cells
var y14 = document.getElementById('x8y2');
var y15 = document.getElementById('x8y3');
var y16 = document.getElementById('x8y4');
var y17 = document.getElementById('x8y5');
var y18 = document.getElementById('x8y6');

// yellow homestretch array
var y_homestretch_cells = new Array(y14, y15, y16, y17, y18);



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

var y_path = y_path_cells.slice(8).concat(g_path_cells).concat(b_path_cells).concat(r_path_cells).concat(y_path_cells.slice(0,7)).concat(y_homestretch_cells);

var y_H1 = new Piece(109, 397, 18, 13);
	y_H1.path = y_path;
var y_H2 = new Piece(54,  397, 18, 13);
	y_H1.path = y_path;
var y_H3 = new Piece(109, 342, 18, 13);
	y_H3.path = y_path;
var y_H4 = new Piece(54,  342, 18, 13);
	y_H4.path = y_path;

var r_H1 = new Piece(395, 342, 58, 13);
var r_H2 = new Piece(395, 396, 58, 13);
var r_H3 = new Piece(339, 342, 58, 13);
var r_H4 = new Piece(339, 396, 58, 13);

var b_H1 = new Piece(340, 54,  100, 13);
var b_H2 = new Piece(396, 54,  100, 13);
var b_H3 = new Piece(340, 109, 100, 13);
var b_H4 = new Piece(396, 109, 100, 13);

var g_H1 = new Piece(53,  108, 140, 13);
var g_H2 = new Piece(53,  53,  140, 13);
var g_H3 = new Piece(108, 108, 140, 13);
var g_H4 = new Piece(108, 53,  140, 13);

var gamePiecesArray = new Array(
						new Array(
							{name: 'y_H1', piece : y_H1},
							{name: 'y_H2', piece : y_H2},
							{name: 'y_H3', piece : y_H3},
							{name: 'y_H4', piece : y_H4}
						),
						new Array(
							{name: 'r_H1', piece : r_H1},
							{name: 'r_H2', piece : r_H2},
							{name: 'r_H3', piece : r_H3},
							{name: 'r_H4', piece : r_H4}
						),
						new Array(
							{name: 'b_H1', piece : b_H1},
							{name: 'b_H2', piece : b_H2},
							{name: 'b_H3', piece : b_H3},
							{name: 'b_H4', piece : b_H4}
						),
						new Array(
							{name: 'g_H1', piece : g_H1},
							{name: 'g_H2', piece : g_H2},
							{name: 'g_H3', piece : g_H3},
							{name: 'g_H4', piece : g_H4}
						));



// ! functions -----------------------------------------------------------------------------
var stepLimit = 50;
var step = 1;


function calculatePiecePos(p, i) {
	
	var destinationX = p.path[i].offsetLeft;
	var destinationY = p.path[i].offsetTop;
	
	if (step < stepLimit) {
		p.left = (((destinationX - p.start_left) / stepLimit) * step) + p.start_left;
		p.top = (((destinationY - p.start_top) / stepLimit) * step) + p.start_top;
	}
	++step;
}

function move() {
	
	for (var i = 0; i < gamePiecesArray.length; i++) {
		
		for (var j = 0; j < gamePiecesArray[i].length; j++) {
			
			gamePiecesArray[0][0].piece.inHome = false;
			context.drawImage(spritesheet,
					  gamePiecesArray[0][0].piece.sheet_left, 
					  gamePiecesArray[0][0].piece.sheet_top,
					  32, 32,		  
					  gamePiecesArray[0][0].piece.left, 
					  gamePiecesArray[0][0].piece.top,
					  32, 32);
		} 
	}
	
	calculatePiecePos(gamePiecesArray[0][0].piece, 45);
	
}

function drawHomePieces() {
	
	context.save();
	context.clearRect(0,0, canvas.width, canvas.height);
	
	for (var i = 0; i < gamePiecesArray.length; i++) {
		
		for (var j = 0; j < gamePiecesArray[i].length; j++) {
			
			if (gamePiecesArray[i][j].piece.inHome) {
				context.drawImage(spritesheet,
						  gamePiecesArray[i][j].piece.sheet_left, 
						  gamePiecesArray[i][j].piece.sheet_top,
						  32, 32,
						  gamePiecesArray[i][j].piece.start_left, 
						  gamePiecesArray[i][j].piece.start_top,
						  32, 32);
			}
		} 
	}
	
	context.restore();

}

function draw() {
	drawHomePieces();
	move();
}

function animate() {
	draw();
	
    requestNextAnimationFrame(animate);
}

function start() {
	
/* 	console.log(y_H1.path); */

	spritesheet.src = 'images/spritesheet.png';
	
	spritesheet.onload = function (e) {
    	requestNextAnimationFrame(animate);
/* 		console.log(gamePiecesArray); */
    };
}

start();