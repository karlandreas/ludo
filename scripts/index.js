
// ! variables -------------------------------------------------------------------------------
var spritesheet = new Image();
var canvas = document.getElementById('game_canvas');
var context = canvas.getContext('2d');

// ! constants -------------------------------------------------------------------------------
var GAMEPICES_CELL_SIZE = 32;

var YELLOW_SINGLE_PIECE_CELL    = { left: 18,  top:13 };
var RED_SINGLE_PIECE_CELL       = { left: 58,  top:13 };
var BLUE_SINGLE_PIECE_CELL      = { left: 100, top:13 };
var GREEN_SINGLE_PIECE_CELL     = { left: 140, top:13 };
							    
var YELLOW_DOUBLE_PIECE_CELL    = { left: 18,  top:56 };
var RED_DOUBLE_PIECE_CELL       = { left: 58,  top:56 };
var BLUE_DOUBLE_PIECE_CELL      = { left: 99,  top:56 };
var GREEN_DOUBLE_PIECE_CELL     = { left: 139, top:56 };
							    
var YELLOW_TRIPLE_PIECE_CELL    = { left: 18,  top:97 };
var RED_TRIPLE_PIECE_CELL       = { left: 59,  top:97 };
var BLUE_TRIPLE_PIECE_CELL      = { left: 99,  top:97 };
var GREEN_TRIPLE_PIECE_CELL     = { left: 139, top:97 };

var YELLOW_QUATRUPLE_PIECE_CELL = { left: 19,  top:138 };
var RED_QUATRUPLE_PIECE_CELL    = { left: 59,  top:138 };
var BLUE_QUATRUPLE_PIECE_CELL   = { left: 99,  top:138 };
var GREEN_QUATRUPLE_PIECE_CELL  = { left: 139, top:138 };

var CANVAS_SIZE = 480;


var YELLOW = 'rgba(255, 255, 29, 1)';
var YELLOW_STROKE_COLOR = 'rgba(168, 168, 0, 1)';


// ! GREEN cells -----------------------------------------------------------------------------

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

// ! green home stretch cells
var g14 = document.getElementById('x2y8');
var g15 = document.getElementById('x3y8');
var g16 = document.getElementById('x4y8');
var g17 = document.getElementById('x5y8');
var g18 = document.getElementById('x6y8');

// green homestretch array
var g_homestretch_cells = new Array(g14, g15, g16, g17, g18);

// ! green house cells
var g_H1 = document.getElementById('g_H1');
var g_H2 = document.getElementById('g_H2');
var g_H3 = document.getElementById('g_H3');
var g_H4 = document.getElementById('g_H4');

// green house array
var g_house_cells = new Array(
						{obj: g_H1, left: 53, top: 108}, 
						{obj: g_H2, left: 53, top: 53}, 
						{obj: g_H3, left: 108, top: 108}, 
						{obj: g_H4, left: 108, top: 53}
						);



// ! BLUE cells -----------------------------------------------------------------------------

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

// ! blue house cells
var b_H1 = document.getElementById('b_H1');
var b_H2 = document.getElementById('b_H2');
var b_H3 = document.getElementById('b_H3');
var b_H4 = document.getElementById('b_H4');

// blue house array
var b_house_cells = new Array(
						{obj: b_H1, left: 340, top: 54}, 
						{obj: b_H2, left: 396, top: 54}, 
						{obj: b_H3, left: 340, top: 109}, 
						{obj: b_H4, left: 396, top: 109}
						);



// ! RED cells -----------------------------------------------------------------------------

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

// ! red house cells
var r_H1 = document.getElementById('r_H1');
var r_H2 = document.getElementById('r_H2');
var r_H3 = document.getElementById('r_H3');
var r_H4 = document.getElementById('r_H4');

// red house array
var r_house_cells = new Array(
						{obj: r_H1, left: 395, top: 342}, 
						{obj: r_H2, left: 395, top: 396}, 
						{obj: r_H3, left: 339, top: 342}, 
						{obj: r_H4, left: 339, top: 396}
						);



// ! YELLOW cells -----------------------------------------------------------------------------

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

// ! Yellow house cells
var y_H1 = document.getElementById('y_H1');
var y_H2 = document.getElementById('y_H2');
var y_H3 = document.getElementById('y_H3');
var y_H4 = document.getElementById('y_H4');

// yellow house array
var y_house_cells = new Array(
						{obj: y_H1, left: 109, top: 397}, 
						{obj: y_H2, left: 54,  top: 397}, 
						{obj: y_H3, left: 109, top: 342}, 
						{obj: y_H4, left: 54,  top: 342}
						);



// ! functions -----------------------------------------------------------------------------

function get_all_path_cells() {
	var tmp1 = y_path_cells.concat(g_path_cells);
	var tmp2 = tmp1.concat(b_path_cells);
	var tmp3 = tmp2.concat(r_path_cells);
	
	return tmp3;
}


function drawHomePieces() {
	
	context.save();
	context.clearRect(0,0, canvas.width, canvas.height);
	
	for (var i = 0; i < y_house_cells.length; i++) {
		
		context.drawImage(spritesheet,
						  YELLOW_SINGLE_PIECE_CELL.left, YELLOW_SINGLE_PIECE_CELL.top,
						  32, 32,
						  y_house_cells[i].left, y_house_cells[i].top,
						  32, 32);
	}
	for (var i = 0; i < r_house_cells.length; i++) {
		
		context.drawImage(spritesheet,
						  RED_SINGLE_PIECE_CELL.left, RED_SINGLE_PIECE_CELL.top,
						  32, 32,
						  r_house_cells[i].left, r_house_cells[i].top,
						  32, 32);
	}
	for (var i = 0; i < b_house_cells.length; i++) {
		
		context.drawImage(spritesheet,
						  BLUE_SINGLE_PIECE_CELL.left, BLUE_SINGLE_PIECE_CELL.top,
						  32, 32,
						  b_house_cells[i].left, b_house_cells[i].top,
						  32, 32);
	}
	for (var i = 0; i < g_house_cells.length; i++) {
		
		context.drawImage(spritesheet,
						  GREEN_SINGLE_PIECE_CELL.left, GREEN_SINGLE_PIECE_CELL.top,
						  32, 32,
						  g_house_cells[i].left, g_house_cells[i].top,
						  32, 32);
	}
	
	context.restore();

}

function draw() {
	drawHomePieces();
}

function animate() {
	draw();
	
    requestNextAnimationFrame(animate);
}

function start() {
	var all_pathcells = get_all_path_cells();
	
	spritesheet.src = 'images/spritesheet.png';
	
	spritesheet.onload = function (e) {
    	requestNextAnimationFrame(animate);
    };
}

start();

/*
for(var i = 0; i < all_pathcells.length; i++) {
	all_pathcells[i].style.backgroundColor = 'grey';
}
*/
