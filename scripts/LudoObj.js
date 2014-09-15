/*
 * License (MIT)
 * 
 * Copyright (c) 2014 KAjohansen http://www.kajohansen.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

// !  ---------------------- LudoObj object-------------------------------
var LudoObj = function() {
	
	// !  ---------------------- GAMEBOARD cells-------------------------------
	
	// goal cell
	this.goal = new Field('goal_cell');
	
	// GREEN path cells ------------------------------
	this.g01 = new Field('x6y7');
	this.g02 = new Field('x5y7');
	this.g03 = new Field('x4y7');
	this.g04 = new Field('x3y7');
	this.g05 = new Field('x2y7');
	this.g06 = new Field('x1y7');
	this.g07 = new Field('x1y8');
	this.g08 = new Field('x1y9');
	this.g09 = new Field('x2y9');
	this.g10 = new Field('x3y9');
	this.g11 = new Field('x4y9');
	this.g12 = new Field('x5y9');
	this.g13 = new Field('x6y9');
	
	// green path array
	this.g_path_cells = new Array(this.g01, 
								  this.g02, 
								  this.g03, 
								  this.g04, 
								  this.g05, 
								  this.g06, 
								  this.g07, 
								  this.g08, 
								  this.g09, 
								  this.g10, 
								  this.g11, 
								  this.g12, 
								  this.g13);
								  
	// green home stretch cells
	this.g14 = new Field('x2y8');
	this.g15 = new Field('x3y8');
	this.g16 = new Field('x4y8');
	this.g17 = new Field('x5y8');
	this.g18 = new Field('x6y8');
	
	// green homestretch array
	this.g_homestretch_cells = new Array(this.g14, 
										 this.g15, 
										 this.g16, 
										 this.g17, 
										 this.g18,
										 this.goal);
	
	// BLUE path cells ------------------------------
	this.b01 = new Field('x7y10');
	this.b02 = new Field('x7y11');
	this.b03 = new Field('x7y12');
	this.b04 = new Field('x7y13');
	this.b05 = new Field('x7y14');
	this.b06 = new Field('x7y15');
	this.b07 = new Field('x8y15');
	this.b08 = new Field('x9y15');
	this.b09 = new Field('x9y14');
	this.b10 = new Field('x9y13');
	this.b11 = new Field('x9y12');
	this.b12 = new Field('x9y11');
	this.b13 = new Field('x9y10');
	
	// blue path array
	this.b_path_cells = new Array(this.b01, 
								  this.b02, 
								  this.b03, 
								  this.b04, 
								  this.b05, 
								  this.b06, 
								  this.b07, 
								  this.b08, 
								  this.b09, 
								  this.b10, 
								  this.b11, 
								  this.b12, 
								  this.b13);
	
	// blue home stretch cells
	this.b14 = new Field('x8y14');
	this.b15 = new Field('x8y13');
	this.b16 = new Field('x8y12');
	this.b17 = new Field('x8y11');
	this.b18 = new Field('x8y10');
	
	// blue homestretch array
	this.b_homestretch_cells = new Array(this.b14, 
										this.b15, 
										this.b16, 
										this.b17, 
										this.b18,
										this.goal);
	
	// RED path cells -------------------------------
	this.r01 = new Field('x10y9');
	this.r02 = new Field('x11y9');
	this.r03 = new Field('x12y9');
	this.r04 = new Field('x13y9');
	this.r05 = new Field('x14y9');
	this.r06 = new Field('x15y9');
	this.r07 = new Field('x15y8');
	this.r08 = new Field('x15y7');
	this.r09 = new Field('x14y7');
	this.r10 = new Field('x13y7');
	this.r11 = new Field('x12y7');
	this.r12 = new Field('x11y7');
	this.r13 = new Field('x10y7');
	
	// red path array
	this.r_path_cells = new Array(this.r01, 
								  this.r02, 
								  this.r03, 
								  this.r04, 
								  this.r05, 
								  this.r06, 
								  this.r07, 
								  this.r08, 
								  this.r09, 
								  this.r10, 
								  this.r11, 
								  this.r12, 
								  this.r13);
	
	// red home stretch cells
	this.r14 = new Field('x14y8');
	this.r15 = new Field('x13y8');
	this.r16 = new Field('x12y8');
	this.r17 = new Field('x11y8');
	this.r18 = new Field('x10y8');
	
	// red homestretch array
	this.r_homestretch_cells = new Array(this.r14, 
										 this.r15, 
										 this.r16, 
										 this.r17, 
										 this.r18,
										 this.goal);
					
	// YELLOW path cells ----------------------------
	this.y01 = new Field('x9y6');
	this.y02 = new Field('x9y5');
	this.y03 = new Field('x9y4');
	this.y04 = new Field('x9y3');
	this.y05 = new Field('x9y2');
	this.y06 = new Field('x9y1');
	this.y07 = new Field('x8y1');
	this.y08 = new Field('x7y1');
	this.y09 = new Field('x7y2');
	this.y10 = new Field('x7y3');
	this.y11 = new Field('x7y4');
	this.y12 = new Field('x7y5');
	this.y13 = new Field('x7y6');
	
	// yellow path array
	this.y_path_cells = new Array(this.y01, 
								  this.y02, 
								  this.y03, 
								  this.y04, 
								  this.y05, 
								  this.y06, 
								  this.y07, 
								  this.y08, 
								  this.y09, 
								  this.y10, 
								  this.y11, 
								  this.y12, 
								  this.y13);
	
	// yellow home stretch cells
	this.y14 = new Field('x8y2');
	this.y15 = new Field('x8y3');
	this.y16 = new Field('x8y4');
	this.y17 = new Field('x8y5');
	this.y18 = new Field('x8y6');
	
	// yellow homestretch array
	this.y_homestretch_cells = new Array(this.y14, 
										 this.y15, 
										 this.y16, 
										 this.y17, 
										 this.y18,
										 this.goal);
	
	// full path array
	this.complete_path = this.y_path_cells.concat(this.r_path_cells).concat(this.b_path_cells).concat(this.g_path_cells);
	
	// ! ---------------------------- VARIABLES ----------------------------------
	
	// html
	this.canvas 		= document.getElementById('game_canvas');
	this.context 		= this.canvas.getContext('2d');
	
	// online vars
	this.connection 	 = undefined;
	this.clientIP		 = undefined;
	this.isOnlineGame	 = false;
	this.onlineGameIndex = undefined;
	this.onlineFirstCall = true;
	
	// messages
	this.messagesDiv 	= document.createElement('div');

	// images
	this.spritesheet 	= new Image();

	// game type chooser
	this.gameTypeDiv	= document.getElementById('game_type_div');
	this.isSimulation 	= false;
	
	// game pause variable
	this.paused			= false;
	this.gameIsRunning	= false;
	
	// site divs
	this.controlsDiv		= document.getElementById('controls_div');
	this.gameTypeFormActive	= false;
	this.soundControl		= document.getElementById('sounds_box');
	this.fxControl			= document.getElementById('fx_box');
	
	// players (this.player1 = undefined)
	this.player1 = undefined;
	this.player2 = undefined;
	this.player3 = undefined;
	this.player4 = undefined;
	// current active player
	this.player 	  = undefined;
	// player array
	this.players 	  = new Array();
	// start active player as 0 (no player)
	this.activePlayer = 0;
	
	// the dice
	this.dice	 = new Dice();
	
	// all game pieces
	// green pieces
	this.g_H1 = undefined;
	this.g_H2 = undefined;
	this.g_H3 = undefined;
	this.g_H4 = undefined;
	// blue pieces
	this.b_H1 = undefined;
	this.b_H2 = undefined;
	this.b_H3 = undefined;
	this.b_H4 = undefined;
	// red pieces
	this.r_H1 = undefined;
	this.r_H2 = undefined;
	this.r_H3 = undefined;
	this.r_H4 = undefined;
	// yellow pieces
	this.y_H1 = undefined;
	this.y_H2 = undefined;
	this.y_H3 = undefined;
	this.y_H4 = undefined;
	
	// array of all pieces
	this.gamePiecesArray = undefined;
	
	// sound vars
	this.soundOn	= true;
	this.fxOn		= true;
	this.backgroundSound = document.getElementById('background_sound');
	
	// ! ---------------------------- CONSTANTS ----------------------------------
	// spritesheet coordinates
	this.GS_SINGLE    = {x: 156, y:   5};
	this.BS_SINGLE    = {x: 108, y:   5};
	this.RS_SINGLE    = {x:  61, y:   5};
	this.YS_SINGLE    = {x:  13, y:   5};
				      				 
	this.GS_DOUBLE    = {x: 156, y:  48};
	this.BS_DOUBLE    = {x: 108, y:  48};
	this.RS_DOUBLE    = {x:  61, y:  48};
	this.YS_DOUBLE    = {x:  12, y:  48};
				      				 
	this.GS_TRIPLE    = {x: 156, y:  91};
	this.BS_TRIPLE    = {x: 108, y:  91};
	this.RS_TRIPLE    = {x:  61, y:  91};
	this.YS_TRIPLE    = {x:  12, y:  91};
	
	this.GS_QUATRUPLE = {x: 156, y: 132};
	this.BS_QUATRUPLE = {x: 108, y: 132};
	this.RS_QUATRUPLE = {x:  61, y: 132};
	this.YS_QUATRUPLE = {x:  12, y: 132};
	
	this.GS_MOVE 	  = {x: 155, y: 177};
	this.BS_MOVE 	  = {x: 100, y: 177};
	this.RS_MOVE 	  = {x:  50, y: 177};
	this.YS_MOVE 	  = {x:   1, y: 177};
	
	this.GS_MOVE_HALF = {x: 158, y: 226};
	this.BS_MOVE_HALF = {x: 101, y: 226};
	this.RS_MOVE_HALF = {x:  57, y: 226};
	this.YS_MOVE_HALF = {x:  10, y: 226};
	
	// pieces goal coordinates
	this.G_GOAL = {gLeft: 194, gTop: 224};
	this.B_GOAL = {gLeft: 224, gTop: 195};
	this.R_GOAL = {gLeft: 252, gTop: 224};
	this.Y_GOAL = {gLeft: 224, gTop: 255};
	
	// pieces paths
	this.G_PATH = this.g_path_cells.slice(8).concat(this.b_path_cells).concat(this.r_path_cells).concat(this.y_path_cells).concat(this.g_path_cells.slice(0,7)).concat(this.g_homestretch_cells);
	this.B_PATH = this.b_path_cells.slice(8).concat(this.r_path_cells).concat(this.y_path_cells).concat(this.g_path_cells).concat(this.b_path_cells.slice(0,7)).concat(this.b_homestretch_cells);
	this.R_PATH = this.r_path_cells.slice(8).concat(this.y_path_cells).concat(this.g_path_cells).concat(this.b_path_cells).concat(this.r_path_cells.slice(0,7)).concat(this.r_homestretch_cells);
	this.Y_PATH = this.y_path_cells.slice(8).concat(this.g_path_cells).concat(this.b_path_cells).concat(this.r_path_cells).concat(this.y_path_cells.slice(0,7)).concat(this.y_homestretch_cells);
	
	// ! Home Cells
	// Green Home Cells
	this.GH1 = {name: 'g_H1', x:  48, y: 103};
	this.GH2 = {name: 'g_H2', x:  48, y:  48};
	this.GH3 = {name: 'g_H3', x: 103, y: 103};
	this.GH4 = {name: 'g_H4', x: 103, y:  48};
	// Blue Home Cells
	this.BH1 = {name: 'b_H1', x: 335, y:  47};
	this.BH2 = {name: 'b_H1', x: 391, y:  47};
	this.BH3 = {name: 'b_H1', x: 335, y: 102};
	this.BH4 = {name: 'b_H1', x: 391, y: 102};
	// Red Home Cells
	this.RH1 = {name: 'r_H1', x: 388, y: 337};
	this.RH2 = {name: 'r_H2', x: 388, y: 391};
	this.RH3 = {name: 'r_H3', x: 332, y: 337};
	this.RH4 = {name: 'r_H4', x: 332, y: 391};
	// Yellow Home Cells
	this.YH1 = {name: 'y_H1', x:  99, y: 390};
	this.YH2 = {name: 'y_H2', x:  44, y: 390};
	this.YH3 = {name: 'y_H3', x:  99, y: 335};
	this.YH4 = {name: 'y_H4', x:  44, y: 335};
	// All Home Cell Array
	this.HOME_CELLS_ARRAY = new Array(
									new Array(
										this.YH1, this.YH2, this.YH3, this.YH4
									),
									new Array(
										this.RH1, this.RH2, this.RH3, this.RH4
									),
									new Array(
										this.BH1, this.BH2, this.BH3, this.BH4
									),
									new Array(
										this.GH1, this.GH2, this.GH3, this.GH4
									)
								);
	
	this.PATH_LENGTH = 56;
}

LudoObj.prototype = {
	
	// ! ---------------------------- FUNCTIONS ----------------------------------
	
	setupGame: function() {
		
		// set sound and fx control to on
		this.soundControl.checked = true;
		this.fxControl.checked = true;
		// set backgorund sound to loop
		this.backgroundSound.loop = true;
		// start background sound
		this.playSound(this.backgroundSound);
		
		// setup game pieces
		// green
		this.g_H1 = new Piece("green", this.GH1.x,  this.GH1.y, this.GS_MOVE.x, this.GS_MOVE.y);
		this.g_H2 = new Piece("green", this.GH2.x,  this.GH2.y, this.GS_MOVE.x, this.GS_MOVE.y);
		this.g_H3 = new Piece("green", this.GH3.x,  this.GH3.y, this.GS_MOVE.x, this.GS_MOVE.y);
		this.g_H4 = new Piece("green", this.GH4.x,  this.GH4.y, this.GS_MOVE.x, this.GS_MOVE.y);

		this.g_H1.init(this.G_PATH, this.G_GOAL.gLeft, this.G_GOAL.gTop);
		this.g_H2.init(this.G_PATH, this.G_GOAL.gLeft, this.G_GOAL.gTop);
		this.g_H3.init(this.G_PATH, this.G_GOAL.gLeft, this.G_GOAL.gTop);
		this.g_H4.init(this.G_PATH, this.G_GOAL.gLeft, this.G_GOAL.gTop);

		// blue
		this.b_H1 = new Piece("blue", this.BH1.x,  this.BH1.y, this.BS_MOVE.x, this.BS_MOVE.y);
		this.b_H2 = new Piece("blue", this.BH2.x,  this.BH2.y, this.BS_MOVE.x, this.BS_MOVE.y);
		this.b_H3 = new Piece("blue", this.BH3.x,  this.BH3.y, this.BS_MOVE.x, this.BS_MOVE.y);
		this.b_H4 = new Piece("blue", this.BH4.x,  this.BH4.y, this.BS_MOVE.x, this.BS_MOVE.y);

		this.b_H1.init(this.B_PATH, this.B_GOAL.gLeft, this.B_GOAL.gTop);
		this.b_H2.init(this.B_PATH, this.B_GOAL.gLeft, this.B_GOAL.gTop);
		this.b_H3.init(this.B_PATH, this.B_GOAL.gLeft, this.B_GOAL.gTop);
		this.b_H4.init(this.B_PATH, this.B_GOAL.gLeft, this.B_GOAL.gTop);

		// red
		this.r_H1 = new Piece("red", this.RH1.x,  this.RH1.y,  this.RS_MOVE.x, this.RS_MOVE.y);
		this.r_H2 = new Piece("red", this.RH2.x,  this.RH2.y,  this.RS_MOVE.x, this.RS_MOVE.y);
		this.r_H3 = new Piece("red", this.RH3.x,  this.RH3.y,  this.RS_MOVE.x, this.RS_MOVE.y);
		this.r_H4 = new Piece("red", this.RH4.x,  this.RH4.y,  this.RS_MOVE.x, this.RS_MOVE.y);

		this.r_H1.init(this.R_PATH, this.R_GOAL.gLeft, this.R_GOAL.gTop);
		this.r_H2.init(this.R_PATH, this.R_GOAL.gLeft, this.R_GOAL.gTop);
		this.r_H3.init(this.R_PATH, this.R_GOAL.gLeft, this.R_GOAL.gTop);
		this.r_H4.init(this.R_PATH, this.R_GOAL.gLeft, this.R_GOAL.gTop);

		// yellow
		this.y_H1 = new Piece("yellow", this.YH1.x,  this.YH1.y, this.YS_MOVE.x, this.YS_MOVE.y);
		this.y_H2 = new Piece("yellow", this.YH2.x,  this.YH2.y, this.YS_MOVE.x, this.YS_MOVE.y);
		this.y_H3 = new Piece("yellow", this.YH3.x,  this.YH3.y, this.YS_MOVE.x, this.YS_MOVE.y);
		this.y_H4 = new Piece("yellow", this.YH4.x,  this.YH4.y, this.YS_MOVE.x, this.YS_MOVE.y);

		this.y_H1.init(this.Y_PATH, this.Y_GOAL.gLeft, this.Y_GOAL.gTop);
		this.y_H2.init(this.Y_PATH, this.Y_GOAL.gLeft, this.Y_GOAL.gTop);
		this.y_H3.init(this.Y_PATH, this.Y_GOAL.gLeft, this.Y_GOAL.gTop);
		this.y_H4.init(this.Y_PATH, this.Y_GOAL.gLeft, this.Y_GOAL.gTop);

		// all pieces in one array
		this.gamePiecesArray = new Array(
						new Array(
							{name: 'y_H1', piece : this.y_H1},
							{name: 'y_H2', piece : this.y_H2},
							{name: 'y_H3', piece : this.y_H3},
							{name: 'y_H4', piece : this.y_H4}
						),
						new Array(
							{name: 'r_H1', piece : this.r_H1},
							{name: 'r_H2', piece : this.r_H2},
							{name: 'r_H3', piece : this.r_H3},
							{name: 'r_H4', piece : this.r_H4}
						),
						new Array(
							{name: 'b_H1', piece : this.b_H1},
							{name: 'b_H2', piece : this.b_H2},
							{name: 'b_H3', piece : this.b_H3},
							{name: 'b_H4', piece : this.b_H4}
						),
						new Array(
							{name: 'g_H1', piece : this.g_H1},
							{name: 'g_H2', piece : this.g_H2},
							{name: 'g_H3', piece : this.g_H3},
							{name: 'g_H4', piece : this.g_H4}
						)
						);
		
	},
	
	setupImages: function() {
				
		// set the spritesheet and images source
		this.spritesheet.src = 'images/spritesheet2.png';
		
		// set the styles of the message divs
		// the no moves possible div
		this.messagesDiv.style.position = "absolute";
		this.messagesDiv.style.width  	= "100%";
		this.messagesDiv.style.height 	= "100%";
		this.messagesDiv.style.top 		= "0px";
		this.messagesDiv.style.left 	= "0px";
		this.messagesDiv.style.zIndex 	= "10";
		this.messagesDiv.style.minWidth	= "1024px";
		this.messagesDiv.style.opacity 	= "0";
		this.messagesDiv.style.webkitTransition = "opacity 1s ease 0s";
		this.messagesDiv.style.mozTransition = "opacity 1s ease 0s";
		this.messagesDiv.style.msTransition = "opacity 1s ease 0s";
		this.messagesDiv.style.transition = "opacity 1s ease 0s";
	},
	
	initializePlayers: function() {
		
		this.player1 = new Player("yellow", "Compu Y");
		this.player1.init();
		this.player1.pieces = this.gamePiecesArray[0];
		this.players.push(this.player1); // push player into the players array
		
		this.player2 = new Player("red", "Compu R");
		this.player2.init();
		this.player2.pieces = this.gamePiecesArray[1];
		this.players.push(this.player2); // push player into the players array
		
		this.player3 = new Player("blue", "Compu B");
		this.player3.init();
		this.player3.pieces = this.gamePiecesArray[2];
		this.players.push(this.player3); // push player into the players array
		
		this.player4 = new Player("green", "Compu G");
		this.player4.init();
		this.player4.pieces = this.gamePiecesArray[3];
		this.players.push(this.player4); // push player into the players array
		
		
		this.toggleGameTypeForm();
		this.switchPlayer();
	},
	
	toggleGameTypeForm: function() {
		
		if (this.gameTypeFormActive) {
			this.gameTypeDiv.style.marginTop = "-600px";
			this.gameTypeFormActive = false;
			setTimeout(function() {
				ludoObject.gameTypeDiv.style.display	 = "none";
			}, 1000);
		}
		else {
			this.gameTypeDiv.style.display	 = "block";
			this.gameTypeDiv.style.marginTop = "0px";
			this.gameTypeFormActive = true;	
		}
	},
	
	playLocally: function() {
		this.toggleGameTypeForm();
		
		setTimeout(function() {
			
			ludoObject.player.toggleNewPlayerForm();
		}, 1000);
	},
	
	playOnline: function(ip) {
		
		if (this.isOnlineGame) {
			return;
		}
		
		this.isOnlineGame = true;
		
		if (ip != "::1" && ip != "127.0.0.1") {
			this.clientIP = ip;
			
			try {
				this.connection = new WebSocket('ws://mserve.kajohansen.com:5301');
				this.connection.onopen		= this.onlineOpen;
				this.connection.onmessage	= this.onlineMessage;
				this.connection.onerror 	= this.onlineError;
				this.connection.onclose 	= this.onlineClose;
				
			}
			catch(err) {
				console.log("WebSocket creation error: " + err);
			}
		}
		
	},
	
	simulateGame: function() {
		
		// we remove the game-type form
		this.toggleGameTypeForm();
		
		// and set all players to be computer players
		for (var i = 0; i < 4; i++) {
			this.players[i].computer = true;
		}
		
		// we set the is-simulation variable to true
		this.isSimulation = true;
		
		// and start the game
		this.startGame();
	},
	
	onlineOpen: function(event) {
		
		// we show a waiting screen
		ludoObject.gameTypeDiv.innerHTML = "<h1>Connection: " + event.type + "</h1>";
	},
	
	onlineMessage: function(msg) {
		
		// all messages are JSON objects
		msgObject = JSON.parse(msg.data);
		
		// if another player has rolled the dice
		if (msgObject.dice) {
			if (msgObject.number == 1) {
				ludoObject.dice.img.style.marginLeft  	= '-32px';
				ludoObject.dice.img.style.marginTop 	= '-23px';
			}
			else if (msgObject.number == 2) {
				ludoObject.dice.img.style.marginLeft 	= '-126px';
				ludoObject.dice.img.style.marginTop 	= '-23px';
			}
			else if (msgObject.number == 3) {
				ludoObject.dice.img.style.marginLeft 	= '-216px';
				ludoObject.dice.img.style.marginTop 	= '-23px';
			}
			else if (msgObject.number == 4) {
				ludoObject.dice.img.style.marginLeft 	= '-32px';
				ludoObject.dice.img.style.marginTop 	= '-109px';
			}
			else if (msgObject.number == 5) {
				ludoObject.dice.img.style.marginLeft 	= '-125px';
				ludoObject.dice.img.style.marginTop 	= '-109px';
			}
			else if (msgObject.number == 6) {
				ludoObject.dice.img.style.marginLeft 	= '-216px';
				ludoObject.dice.img.style.marginTop 	= '-109px';
			}
			return;
		}
		
		// if we have a position to highlight
		if (msgObject.highlight) {
			
			var player = ludoObject.getPlayerForColor(msgObject.color);
			
			if (ludoObject.player.color != msgObject.color) {
				ludoObject.highlightFields(player.pieces[msgObject.index].piece, msgObject.diceroll);
			}
			
			// we only want to reset the diceroll for online players not this player
			if (ludoObject.player.color != msgObject.color) {
				setTimeout(function() {
					ludoObject.player.diceRoll = undefined;
				}, 1000);
			}
			
			return;
		}
		
		// if we have a piece to move
		if (msgObject.move_piece) {
			
			var player = ludoObject.getPlayerForColor(msgObject.color);
			var nextNonComputerPlayer = ludoObject.getNextNonComputerPlayer(player.color);
			
			if (ludoObject.player.color != msgObject.color) {
				
				// if the diceRoll = -1 we a piece move out of home
				if (msgObject.diceroll == -1) {
					player.diceRoll = msgObject.diceroll;
					player.allInHome = false;
					player.pieces[msgObject.index].piece.moveToFirstPosition();
					
					// if the player is an online computer player
					if (player.computer) {
						
						if (nextNonComputerPlayer.color == ludoObject.player.color) {
							setTimeout(function() {
								player.onlineSendCreateComputerRoll();
							}, 1000);
						}
					}
				}
				else {
					player.diceRoll = msgObject.diceroll;
					ludoObject.moveSelected(player.pieces[msgObject.index].piece, player);
				}
			}
			
			// we only want to reset the diceroll for online players not this player
			if (ludoObject.player.color != msgObject.color) {
				setTimeout(function() {
					ludoObject.player.diceRoll = undefined;
				}, 1000);
			}
			
			return;
		}
		
		// if we have an online computer player roll
		if (msgObject.computer_roll) {
			
			var player = ludoObject.getPlayerForColor(msgObject.color);
			var nextPlayer = ludoObject.getNextPlayer(msgObject.color);
			var nextNonComputerPlayer = ludoObject.getNextNonComputerPlayer(player.color);
			player.diceRoll = msgObject.dice_roll;
			
			// if the computer rolled a 6
			if (msgObject.dice_roll == 6) {
				
				// we try to move a piece out of home
				if (player.tryToMoveOutOfHome()) {
					
					// we need to roll again..
					if (nextNonComputerPlayer.color == ludoObject.player.color) {
						console.log("Computer throwing again for " + player.color);
						
						setTimeout(function() {
							player.onlineSendCreateComputerRoll();
						}, 1000);
					}
				}
				// else if all pieces are in play, we try to make a move
				else if (player.tryToMakeReadyToMove()) {
					
					setTimeout(function() {
						// we move it
						ludoObject.moveSelected(player.readyToMovePiece, player);
						
						// we need to roll again..
						if (nextNonComputerPlayer.color == ludoObject.player.color) {
							console.log("Computer throwing again for " + player.color);
							
							setTimeout(function() {
								player.onlineSendCreateComputerRoll();
							}, 1000);
						}
					}, 1000);
				}
			}
			// if the computer rolled something other than 6
			else {
				
				if (player.tryToMakeReadyToMove()) {
					// if the piece is made ready to move 
					setTimeout(function() {
						// we move it
						ludoObject.moveSelected(player.readyToMovePiece, player);
						
						// we now switch to the next player
						if (nextNonComputerPlayer.color == ludoObject.player.color) {
							setTimeout(function() {
								player.onlineSwitchPlayer();
								
								if (msgObject.compu_next) {
									setTimeout(function() {
										if (nextPlayer.allInHome) {
											nextPlayer.onlineTryToGetOutOfHome();
										}
										else {
											nextPlayer.onlineSendCreateComputerRoll();
										}
									}, 1000);
								}
							}, 1000);
						}
					}, 1000);
				}
				else {
					console.log("Computer Try to make ready to move failed");
					ludoObject.dice.handleNoMovablePieces(player);
				}
			}
			
			return;
		}
		
		// if we have a fields to grey out
		if (msgObject.greyout) {
		
			var player = ludoObject.getPlayerForColor(msgObject.color);
			
			if (ludoObject.player.color != msgObject.color) {
				ludoObject.greyOutFields(player.pieces[msgObject.index].piece, msgObject.block);
			}
			
			return;
		}
		
		// if we must clear all highlighted fields
		if (msgObject.clear_fields) {
			
			// we clear all fields
			ludoObject.clearHighlightedFields();
			
			return;
		}
		
		// if a player have no movable pieces
		if (msgObject.no_movable) {
			
			var player = ludoObject.getPlayerForColor(msgObject.color);
			
			if (player.color != msgObject.color) {
				player.displayNoMovablePieces();
			}
			
			return;
		}
		
		// if we have a piece to move to goal
		if (msgObject.to_goal) {
			
			var player = ludoObject.getPlayerForColor(msgObject.color);
			
			if (player.color != msgObject.color) {
				player.pieces[msgObject.index].piece.moveToGoal(msgObject.num_in_goal);
			}
			
			return;
		}
		
		// if we must switch player
		if (msgObject.switch_player) {
			
			ludoObject.dice.disabled = true;
			var player = ludoObject.getPlayerForColor(msgObject['color']);
			var nextPlayer = ludoObject.getNextPlayer(msgObject['color']);
			
			player.playerDiv.style.backgroundPositionY = "0px";
			player.active = false;
			
			nextPlayer.giveControl();
			nextPlayer.playerDiv.style.backgroundPositionY = "-75px";
			nextPlayer.playerDiv.style.backgroundPosition  = "0px -75px"; //firefox
			
			if (nextPlayer.color == "yellow") {
				ludoObject.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(255,133,0), rgb(255,255,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(255,133,0), rgb(255,255,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(255,133,0) 0%, rgb(255,255,0) 100%)";
				player.playerDiv.style.backgroundPosition 	 = "0px 0px"; //firefox
			}
			else if (nextPlayer.color == "red") {
				ludoObject.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(190,0,0), rgb(255,0,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(190,0,0), rgb(255,0,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(190,0,0) 0%, rgb(255,0,0) 100%)";
				player.playerDiv.style.backgroundPosition 	 = "-75px 0px"; //firefox
			}
			else if (nextPlayer.color == "blue") {
				ludoObject.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(0,0,255), rgb(0,225,255))";
				ludoObject.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(0,0,255), rgb(0,225,255))";
				ludoObject.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(0,0,255) 0%, rgb(0,225,255) 100%)";
				player.playerDiv.style.backgroundPosition 	 = "-151px 0px"; //firefox
			}
			else if (nextPlayer.color == "green") {
				ludoObject.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(0,225,0), rgb(175,255,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(0,225,0), rgb(175,255,0))";
				ludoObject.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(0,225,0) 0%, rgb(175,255,0) 100%)";
				player.playerDiv.style.backgroundPosition 	 = "-226px 0px"; //firefox
			}
			
			
			if (ludoObject.player.color == nextPlayer.color) {
				ludoObject.dice.disabled = false;
				ludoObject.player.displayStartGraphic();
			}
			
			return;
		}
		
		// if this is the opening message setting the player's color
		if (!isNaN(msgObject.game_index)) {
			
			// we set the received online game-index
			ludoObject.onlineGameIndex = msgObject.game_index;
			// and remove the game-type-form
			ludoObject.toggleGameTypeForm();
			// we get the player for the color that was passed to us from the server
			ludoObject.player = ludoObject.getPlayerForColor(msgObject.color);
			// and set its connection sid
			ludoObject.player.sid = msgObject.sid;
			//after 1 second
			setTimeout(function() {
				// we display the player name form for the received color (player)
				ludoObject.player.toggleNewPlayerForm();
			}, 1000);
				
			return;
		}
		
		// if this a message with a new player joining the game
		if (msgObject.update) {
			
			if (ludoObject.onlineFirstCall) {
				ludoObject.gameTypeDiv.innerHTML += "<h2>Waiting for other players ... </h2>";
			}
			
			var keys = Object.keys(msgObject);
			
			if (keys[1] == "yellow") {
				ludoObject.player1.onlineSetName(msgObject.yellow, ludoObject.onlineFirstCall);
			}
			if (keys[2] == "red") {
				ludoObject.player2.onlineSetName(msgObject.red, ludoObject.onlineFirstCall);
			}
			if (keys[3] == "blue") {
				ludoObject.player3.onlineSetName(msgObject.blue, ludoObject.onlineFirstCall);
			}
			if (keys[4] == "green") {
				ludoObject.player4.onlineSetName(msgObject.green, ludoObject.onlineFirstCall);
			}
			
			ludoObject.onlineFirstCall = false;
			
			return;
		}
		
		// if this is the start game message
		if (msgObject.start) {
			
			ludoObject.toggleGameTypeForm();
			console.log("Online Start: " + ludoObject.player.color);
			
			if (ludoObject.player.color == "yellow") {

				ludoObject.dice.disabled = false;
				ludoObject.player.displayStartGraphic();
				ludoObject.player.giveControl();
			}
			
			ludoObject.gameIsRunning = true;
			ludoObject.animate();
			return;
		}
		
		// if we are the only online player left
		if (msgObject.make_local) {
			ludoObject.isOnlineGame = false;
			var data={"close" : true, "game_index": ludoObject.onlineGameIndex, "sid": ludoObject.player.sid};
			ludoObject.connection.send( JSON.stringify(data) );
			confirm("You are the only online player left\nMaking this a Local game");
		}
		
		// a player has left the game
		if (msgObject.remove) {
			
			if (msgObject.color == "yellow") {
				ludoObject.player1.name = "Compu Y";
				ludoObject.player1.playerDiv.innerHTML = "<p>Compu Y</p>";
				ludoObject.player1.computer = true;
			}
			else if (msgObject.color == "red") {
				ludoObject.player2.name = "Compu R";
				ludoObject.player2.playerDiv.innerHTML = "<p>Compu R</p>";
				ludoObject.player2.computer = true;
			}
			else if (msgObject.color == "blue") {
				ludoObject.player3.name = "Compu B";
				ludoObject.player3.playerDiv.innerHTML = "<p>Compu B</p>";
				ludoObject.player3.computer = true;
			}
			else if (msgObject.color == "green") {
				ludoObject.player4.name = "Compu G";
				ludoObject.player4.playerDiv.innerHTML = "<p>Compu G</p>";
				ludoObject.player4.computer = true;
			}
			console.log("Removing " + msgObject.color + " player");
			return;
		}
	},
	
	onlineError: function(err) {
		
		// if no connection could be established we show this in the screen
		ludoObject.gameTypeDiv.innerHTML = "<h1>Socket: " + err.type + "</h1>";
	},
	
	onlineClose: function(event) {
		
		// online socket closed message
		ludoObject.gameTypeDiv.innerHTML = "<h1>Socket Closed: " + event.code + "</h1>";
	},
	
	playSound: function (sound) {
		
		if (this.fxOn) {
			if (!this.soundIsPlaying(sound)) {
				sound.play();
			} else {
				sound.load();
				sound.play();
			}
		}
	},
	
	soundIsPlaying: function (sound) {
		return !sound.ended && sound.currentTime > 0;
	},
	
	setPlayerName: function(value) {
		
		// initialize players
		switch(this.activePlayer) {
			case 1: // player1 
				this.player1.name = value;
				this.player1.computer = false;
				this.player1.reload();
				this.player1.toggleNewPlayerForm();
				this.activePlayer = 2;
				setTimeout(function() {
					ludoObject.player2.toggleNewPlayerForm();
				}, 1300);
				break;
			case 2: // player2
				this.player2.name = value;
				this.player2.computer = false;
				this.player2.reload();
				this.player2.toggleNewPlayerForm();
				this.activePlayer = 3;
				setTimeout(function() {
					ludoObject.player3.toggleNewPlayerForm();
				}, 1300);
				break;
			case 3: // player3
				this.player3.name = value;
				this.player3.computer = false;
				this.player3.reload();
				this.player3.toggleNewPlayerForm();
				this.activePlayer = 4;
				setTimeout(function() {
					ludoObject.player4.toggleNewPlayerForm();
				}, 1300);
				break;
			case 4: // player4
				this.player4.name = value;
				this.player4.computer = false;
				this.player4.reload();
				this.player4.toggleNewPlayerForm();
				this.activePlayer = 1;
				this.startGame();
				break;
			default:
				console.log("Error Initializing players");
		}
		
	},
	
	setPlayerToCompu: function(value) {
				
		// initialize players
		switch(this.activePlayer) {
			case 1: // player1 
				this.player1.toggleNewPlayerForm();
				this.activePlayer = 2;
				setTimeout(function() {
					ludoObject.player2.toggleNewPlayerForm();
				}, 1300);
				break;
			case 2: // player2
				this.player2.toggleNewPlayerForm();
				this.activePlayer = 3;
				setTimeout(function() {
					ludoObject.player3.toggleNewPlayerForm();
				}, 1300);
				break;
			case 3: // player3
				this.player3.toggleNewPlayerForm();
				this.activePlayer = 4;
				setTimeout(function() {
					ludoObject.player4.toggleNewPlayerForm();
				}, 1300);
				break;
			case 4: // player4
				this.player4.toggleNewPlayerForm();
				this.activePlayer = 1;
				this.startGame();
				break;
			default:
				console.log("Error Initializing players");
		}
		
	},
	
	drawAllPieces: function() {
		
		this.context.save();
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
		
		for (var i = 0; i < this.gamePiecesArray.length; i++) {
			
			for (var j = 0; j < this.gamePiecesArray[i].length; j++) {
				
				// if the piece is in it's home position
				if (this.gamePiecesArray[i][j].piece.inHome) {
					this.context.drawImage(this.spritesheet,
							  this.gamePiecesArray[i][j].piece.sheet_left, 
							  this.gamePiecesArray[i][j].piece.sheet_top,
							  42, 50,
							  this.gamePiecesArray[i][j].piece.home_left, 
							  this.gamePiecesArray[i][j].piece.home_top,
							  42, 50);
				}
				// if the piece is animating (moving) and the showAnimal flag is true
				else if (this.gamePiecesArray[i][j].piece.isAnimating && this.gamePiecesArray[i][j].piece.showAnimal) {
					// animate currently moving pieces
					this.gamePiecesArray[i][j].piece.move();
					this.context.drawImage(this.spritesheet,
							  this.gamePiecesArray[i][j].piece.sheet_left, 
							  this.gamePiecesArray[i][j].piece.sheet_top,
							  42, 50,
							  this.gamePiecesArray[i][j].piece.left, 
							  this.gamePiecesArray[i][j].piece.top,
							  42, 50);
				}
				// else 
				else {
					// if the piece is animating (moving) and the showAnimal flag is false
					if (this.gamePiecesArray[i][j].piece.isAnimating && !this.gamePiecesArray[i][j].piece.showAnimal) {
						this.gamePiecesArray[i][j].piece.move();
					}
					this.context.drawImage(this.spritesheet,
							  this.gamePiecesArray[i][j].piece.sheet_left, 
							  this.gamePiecesArray[i][j].piece.sheet_top,
							  37, 37,
							  this.gamePiecesArray[i][j].piece.left, 
							  this.gamePiecesArray[i][j].piece.top,
							  37, 37);
				}
			} 
		}
		
		this.context.restore();
	},
	
	animate: function() {
	
		ludoObject.drawAllPieces();
		
		requestNextAnimationFrame(ludoObject.animate);
	},
	
	switchPlayer: function() {
		
		if (this.activePlayer < 4) {
			this.activePlayer += 1;
		} else {
			this.activePlayer = 1;
		}
		this.setActivePlayer();
	},
	
	setActivePlayer: function() {
		
		if (this.player != undefined) {
			this.player.playerDiv.style.backgroundPositionY = "0px";
			this.player.active = false;
		}
		
		switch(this.activePlayer) {
			case 1:
				this.player4.playerDiv.style.backgroundPosition  = "-226px 0px"; // firefox
				this.player = this.player1;
				this.player.active = true;
				this.player.playerDiv.style.backgroundPosition  = "0px -75px"; // firefox
				this.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(255,133,0), rgb(255,255,0))";
				this.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(255,133,0), rgb(255,255,0))";
				this.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(255,133,0) 0%, rgb(255,255,0) 100%)";
				break;
			case 2:
				this.player1.playerDiv.style.backgroundPosition  = "0px 0px"; // firefox
				this.player = this.player2;
				this.player.active = true;
				this.player.playerDiv.style.backgroundPosition  = "-75px -75px"; // firefox
				this.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(190,0,0), rgb(255,0,0))";
				this.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(190,0,0), rgb(255,0,0))";
				this.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(190,0,0) 0%, rgb(255,0,0) 100%)";
				break;
			case 3:
				this.player2.playerDiv.style.backgroundPosition  = "-75px 0px"; // firefox
				this.player = this.player3;
				this.player.active = true;
				this.player.playerDiv.style.backgroundPosition  = "-151px -75px"; // firefox
				this.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(0,0,255), rgb(0,225,255))";
				this.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(0,0,255), rgb(0,225,255))";
				this.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(0,0,255) 0%, rgb(0,225,255) 100%)";
				break;
			case 4:
				this.player3.playerDiv.style.backgroundPosition  = "-151px 0px"; // firefox
				this.player = this.player4;
				this.player.active = true;
				this.player.playerDiv.style.backgroundPosition  = "-226px -75px"; // firefox
				this.controlsDiv.style.backgroundImage = "-webkit-linear-gradient(bottom, rgb(0,225,0), rgb(175,255,0))";
				this.controlsDiv.style.backgroundImage = "-moz-linear-gradient(bottom, rgb(0,225,0), rgb(175,255,0))";
				this.controlsDiv.style.backgroundImage = "-ms-linear-gradient(bottom, rgb(0,225,0) 0%, rgb(175,255,0) 100%)";
				break;
			default:
				console.log("Error setting active player");
		}
		
		if (!this.player.computer) {
			this.dice.disabled = false;
			if (!this.isSimulation) {
				this.player.displayStartGraphic();
			}
		}
		else {
			this.dice.disabled = true;
		}
		this.player.playerDiv.style.backgroundPositionY = "-75px";
	},
	
	checkForPieceOnCoord: function(offX, offY, pLeft, pTop) {
		
		var result = undefined;
		
		if (offX > pLeft && offX < pLeft + 32) {
			if (offY > pTop && offY < pTop + 32) {
				result = true;
			}
			else {
				result = false;
			}
		}
		else {
			result = false;
		}
		
		return result;
	},
	
	checkForClickOnBlank: function(offX, offY) {
		
		var breakOuter = false;
		var result = true;
		
		for (var i = 0; i < 4; i++) {
			
			if (breakOuter) {
				break;
			}
			
			for (var j = 0; j < 4; j++) {
				
				if (offX > this.players[i].pieces[j].piece.left && offY > this.players[i].pieces[j].piece.top) {
					if (offX < this.players[i].pieces[j].piece.left +  32 && offY < this.players[i].pieces[j].piece.top + 32) {
						result = false;
						breakOuter = true;
						break;
					}
				}
			}
		}
		
		return result;
	},
	
	checkForClickOnHighlight: function(offX, offY) {
		
		var result = false;
		
		for (var i = 0; i < 4; i++) {
		
			if (ludoObject.player.pieces[i].piece.selected) {
				if (offX > this.player.pieces[i].piece.canMoveTo.x1 && offX < ludoObject.player.pieces[i].piece.canMoveTo.x2) {
					if (offY > ludoObject.player.pieces[i].piece.canMoveTo.y1 && offY < ludoObject.player.pieces[i].piece.canMoveTo.y2) {
						result = true;
						break;
					}
				}
			}
		}
		return result;
	},
	
	checkForBlockOnField: function(player, field) {
		
		var blockOnField = false;
		
		// if there is more than one piece on this field
		if (field.count > 1) {
		
			// we log out the block
			console.log("BLOCK! " + field.id + " has " + field.count + " pieces on it");
			
			// we loop through our own pieces
			for (var i = 0; i < 4; i++) {
				
				// if our piece's id does not match the id on the field, there is a block
				if (player.pieces[i].piece.pathID != field.id) {
					
					// then there is a block on the pieces path
					blockOnField = true;
				}
				else {
					// as soon as we find our own piece on the blocked field, we set block to false
					blockOnField = false;
					break; // and break, no need to check more pieces
				}
			}
		}
		
		return blockOnField;
	},
	
	checkForBlockOnPath: function(player, piece, diceRoll) {
		
		var id = undefined;
		var blockOnIndex = 0;
		var breakFieldChecks = false;
		
		for (var i = piece.pathIndex + 1; i <= piece.pathIndex + diceRoll; i++) {
			
			// we break if we have foun a block
			if (breakFieldChecks) {
				break;
			} 
			// we also break if, the player has rolled higher than required to enter the Goal area
			else if (i > this.PATH_LENGTH) {
				blockOnIndex = i;
				break;
			}
			
			if (this.checkForBlockOnField(player, piece.path[i])) {
				blockOnIndex = i;
				breakFieldChecks = true;
			}
		}
		
		// we return the index number where the block is, or 0 if no block
		return blockOnIndex;
	},
	
	checkForDoublePosOnSafeField: function(player, id) {
		
		var result = false;
		
		// we loop through all players
		for (var i = 0; i < 4; i++) {
			
			// excluding ourselves
			if (ludoObject.players[i].color != player.color) {
				
				// we loop through each of our competitors pieces
				for (var j = 0; j < 4; j++) {
					
					// if we find a competitor on our safe-field id
					if (this.players[i].pieces[j].piece.pathID == id) {
						result = true;
					}
				}
			}
		}
		return result;
	},
	
	checkForSafeField: function(id) {
		
		var result = false;
		
		if (id == "x7y2" || id == "x14y7" || id == "x9y14" || id == "x2y9") {
			result = true;
		}
		
		return result;
	},
	
	getSafeFieldColor: function(id) {
		
		var color = undefined;
		
		if (id == "x7y2") {
			color = "yellow";
		}
		else if (id == "x14y7") {
			color = "red";
		}
		else if (id == "x9y14") {
			color = "blue";
		}
		else if (id == "x2y9") {
			color = "green";
		}
		
		return color;
	},
	
	getCompetitorPieceOnID: function(id, color) {
		
		var piece = undefined;
		var breakOuter  = false;
		
		// we loop through the players
		for (var i = 0; i < 4; i++) {
			
			if (breakOuter) {
				break;
			}
			
			// excluding ourself
			if (this.players[i].color != color) {
				
				// we loop through the competitors pieces
				for (var j = 0; j < 4; j++) {
					
					// if we find one on the specified id
					if (ludoObject.players[i].pieces[j].piece.pathID == id) {
						
						// we set it to be returned
						piece = ludoObject.players[i].pieces[j].piece;
						breakOuter = true;
						break;
					}
				}
			
			}
		}
		
		return piece;
	},
	
	getNextPlayer: function(color) {
		if (color == "yellow") {
			return this.player2;
		}
		else if (color == "red") {
			return this.player3;
		}
		else if (color == "blue") {
			return this.player4;
		}
		else if (color == "green") {
			return this.player1;
		}
	},
	
	getNextNonComputerPlayer: function(color) {
		
		if (color == "yellow" && !this.player2.computer) {
			return this.player2;
		}
		else if (color == "red" && !this.player3.computer) {
			return this.player3;
		}
		else if (color == "blue" && !this.player4.computer) {
			return this.player4;
		}
		else if (color == "green" && !this.player1.computer) {
			return this.player1;
		} 
		else if (color == "yellow" && !this.player3.computer) {
			return this.player3;
		}
		else if (color == "red" && !this.player4.computer) {
			return this.player4;
		}
		else if (color == "blue" && !this.player1.computer) {
			return this.player1;
		}
		else if (color == "green" && !this.player2.computer) {
			return this.player2;
		}
		else if (color == "yellow" && !this.player4.computer) {
			return this.player4;
		}
		else if (color == "red" && !this.player1.computer) {
			return this.player1;
		}
		else if (color == "blue" && !this.player2.computer) {
			return this.player2;
		}
		else if (color == "green" && !this.player3.computer) {
			return this.player3;
		} else {
			return this.player;
		}
	},
	
	getPlayerForColor: function(color) {
		if (color == "yellow") {
			return this.player1;
		}
		else if (color == "red") {
			return this.player2;
		}
		else if (color == "blue") {
			return this.player3;
		}
		else if (color == "green") {
			return this.player4;
		}
	},
	
	checkIfCanMoveToGoal: function(piece) {
		
		var result = false;
		var piece_index = undefined;
		
		// if this is an online game 
		if (this.isOnlineGame) {
			
			for (var i = 0; i < 4; i++) {
				
				// we need the index of the piece to move
				if (this.player.pieces[i].piece.pathID == piece.pathID) {
					piece_index = i;
				}
			}
		}
		
		// check if the player overshoots the goal
		if (piece.pathIndex + this.player.diceRoll + 1 > piece.path.length) {
			
			// and if it's an online game we greyout the path on the other player's boards as well
			if (this.isOnlineGame) {
			
				var data = {"greyout"	 : true, 
							"game_index" : this.onlineGameIndex, 
							"color"		 : this.player.color, 
							"piece_index": piece_index, 
							"block_index": this.PATH_LENGTH - 1};
				
				this.connection.send( JSON.stringify(data) );
			}
			
			this.greyOutFields(piece, this.PATH_LENGTH - 1);
		}
		// or if he hits the goal cell
		else if (piece.pathIndex + this.player.diceRoll + 1 == piece.path.length) {
						
			this.player.readyToMove = false;
			this.player.piecesInGoal++;
			piece.path[piece.pathIndex].count = new Number( piece.path[ piece.pathIndex ].count ) - 1;
			
			piece.moveToGoal(this.player.piecesInGoal);
			
			// and if it's an online game we send move to goal
			if (this.isOnlineGame) {
				
				var data = {"to_goal"	 : true, 
							"game_index" : this.onlineGameIndex, 
							"color"		 : this.player.color, 
							"piece_index": piece_index,
							"num_in_goal": this.player.piecesInGoal};
				
				this.connection.send( JSON.stringify(data) );
			}
			
			result = true;
			
		}
		
		return result;
	},
	
	greyOutFields: function(piece, blockIndex) {
					
		for (var i = piece.pathIndex; i <= blockIndex; i++) {
			piece.path[i].cell.style.backgroundColor = "grey";
		}
		
		setTimeout(function() {
			ludoObject.clearHighlightedFields();
		}, 1500);
		
	},
	
	highlightFields: function(piece, diceRoll) {
		
		// we highlight our current field
		piece.path[piece.pathIndex].cell.style.backgroundColor = 'aquamarine';
		// and the position to move to
		piece.highlightMoveToPos(diceRoll);
			
	},
	
	clearHighlightedFields: function() {
		
		for (var i = 0; i < this.g_path_cells.length; i++) {
			if(i == 8) {
				this.g_path_cells[i].cell.style.backgroundColor = 'lime';
			}
			else {
				this.g_path_cells[i].cell.style.backgroundColor = 'white';
			}
		}
		
		for (var i = 0; i < this.g_homestretch_cells.length; i++) {
			this.g_homestretch_cells[i].cell.style.backgroundColor = 'lime';
		}
		
		for (var i = 0; i < this.b_path_cells.length; i++) {
			if(i == 8) {
				this.b_path_cells[i].cell.style.backgroundColor = 'aqua';
			}
			else {
				this.b_path_cells[i].cell.style.backgroundColor = 'white';
			}
		}
		
		for (var i = 0; i < this.b_homestretch_cells.length; i++) {
			this.b_homestretch_cells[i].cell.style.backgroundColor = 'aqua';
		}
		
		for (var i = 0; i < this.r_path_cells.length; i++) {
			if(i == 8) {
				this.r_path_cells[i].cell.style.backgroundColor = 'red';
			}
			else {
				this.r_path_cells[i].cell.style.backgroundColor = 'white';
			}
		}
		
		for (var i = 0; i < this.r_homestretch_cells.length; i++) {
			this.r_homestretch_cells[i].cell.style.backgroundColor = 'red';
		}
		
		for (var i = 0; i < this.y_path_cells.length; i++) {
			if (i == 8) {
				this.y_path_cells[i].cell.style.backgroundColor = 'yellow';
			}
			else {
				this.y_path_cells[i].cell.style.backgroundColor = 'white';
			}
		}
		
		for (var i = 0; i < this.y_homestretch_cells.length; i++) {
			this.y_homestretch_cells[i].cell.style.backgroundColor = 'yellow';
		}
	},
	
	moveSelected: function(piece, player) {
		
		// first we get the indexPath, count of the field we are on, id and we set a movingPieceFromSafe to false
		var indexPath = piece.pathIndex;
		var tmpCount  = piece.path[indexPath].count;
		var id 		  = piece.path[indexPath].id;
		var movingPieceFromSafe = false;
		
		// when a piece moves away from a multiple piece position
		// we want to show the moving piece as one piece from the spritesheet
		if (tmpCount > 1) {
			piece.setSpritesheetCoordsTo(new Number(tmpCount) - 1);
		}
		
		// if we are moving away from our safe-field
		// we don't want to reduce the count if we have a mixed-color double position on the field
		if (id == "x7y2"  && player.color == "yellow" ||
			id == "x14y7" && player.color == "red"	 ||
			id == "x9y14" && player.color == "blue"	 ||
			id == "x2y9"  && player.color == "green") {
				
				// when we move a piece of it's safe-field we have to check for a competitor double-position on the field
				if (!this.checkForDoublePosOnSafeField(player, id)) {
					
					// if there is no competitor double-position we can reduse the field count by 1
					piece.path[indexPath].count = tmpCount - 1;
				} 
		}
		// if we are not moving away from a safe field we reduce the count by 1 no mather what.
		else if (id != "x7y2" && id != "x14y7" && id != "x9y14" && id != "x2y9") {
			
			piece.path[indexPath].count = new Number(tmpCount) - 1;
		}
		// if the color moving away from a safe-field is not the same as the safe-field color 
		else if (tmpCount >= 1) { // and tmpCount is higher than or equal to 1
			
			
			// and if there is no double-position we reduce the count by 1
			if (!this.checkForDoublePosOnSafeField(player, id)) {
				piece.path[indexPath].count = new Number(tmpCount) - 1;
			}
			else if (tmpCount > 3) {
				piece.path[indexPath].count = new Number(tmpCount) - 1;
			}
			else if (tmpCount > 1) {
				piece.path[indexPath].count = 1;
			}
		}
		
		// we set the destination pathIndex on the piece
		piece.pathIndex = player.diceRoll + indexPath;
		// console.log(player.color + " is moving from " + indexPath + " to " + (player.diceRoll + indexPath));
		
		this.playSound(player.moveSound);
		
		piece.isAnimating = true;
		
		this.clearHighlightedFields();
		player.readyToMove = false;

	},
	
	startGame: function() {
		
		this.backgroundSound.volume = 0.4;
		this.dice.disabled = false;
		
		this.gameIsRunning = true;
		
		if (!this.isSimulation) {
			this.player.displayStartGraphic();
		}
		
		this.player.giveControl();
		
		this.animate();
	}
}

// !  ---------------------- Field object-------------------------------
var Field = function(id) {
	
	this.id		= id;
	this.cell 	= document.getElementById(id);
	this.count 	= 0;
}


// ! init's
var ludoObject = new LudoObj();
ludoObject.setupGame();
ludoObject.setupImages();
ludoObject.initializePlayers();

// ! ---------------------------- EVENT HANDLERS ----------------------------

ludoObject.dice.img.onmouseup = function() {
	
	if (!ludoObject.dice.disabled) {
		ludoObject.dice.rollDice();
	}
}

ludoObject.canvas.onmouseup = function(e) {
	
	if (ludoObject.dice.isAnimating) {
		return;
	}
	
	// check for click on blank
	if (ludoObject.checkForClickOnBlank(e.layerX, e.layerY) && !ludoObject.checkForClickOnHighlight(e.layerX, e.layerY)) {
		
		// if the click was on a blank we clear all previously highlighted fields
		ludoObject.clearHighlightedFields();
		
		// we set all the players pieces to unselected
		for (var k = 0; k < 4; k++) {
			ludoObject.player.pieces[k].piece.selected = false;
		}
		
		// and if this is an online game we clear highlighted fields on the other game boards too
		if (ludoObject.isOnlineGame) {
			
			var data = {"clear_fields" 	 : true, 
						"game_index" : ludoObject.onlineGameIndex};
			ludoObject.connection.send( JSON.stringify(data) );
		}
		
		// and the player to not be ready to move
		ludoObject.player.readyToMove = false;
	}
	// if click was not on a blank
	else {
		
		// and if player is ready to move
		if (ludoObject.player.readyToMove) {
			
			// we check if the click occurred in this piece's moveTo position
			if (ludoObject.checkForClickOnHighlight(e.layerX, e.layerY)) {
				
				// then loop through current players pieces
				for (var i = 0; i < 4; i++) {
					
					// when we find the piece that is selected.
					if (ludoObject.player.pieces[i].piece.selected) {
						
						// we move it.
						ludoObject.moveSelected(ludoObject.player.pieces[i].piece, ludoObject.player);
						
						// and if this is an online game we move the piece on the other players screens too
						if (ludoObject.isOnlineGame) {
							
							var data = {"move_piece" : true, 
										"game_index" : ludoObject.onlineGameIndex, 
										"color"		 : ludoObject.player.color, 
										"piece_index": i,
										"diceroll"	 : ludoObject.player.diceRoll};
							ludoObject.connection.send( JSON.stringify(data) );
						}
						
						if (ludoObject.player.turnsLeft < 1) {
							setTimeout(function() {
								ludoObject.dice.endTurn();
							}, 900);
						}
						
					}
					
				}
				
			}
			
		}
		// if the player has not yet selected a piece and rolled a 6
		else if (ludoObject.player.diceRoll == 6) {
			
			// we loop through all the players pieces
			for (var i = 0; i < 4; i++) {
				
				// we check if the click happened on a piece in the home position
				if (ludoObject.player.pieces[i].piece.inHome) {
					
					// we get the piece where the click 
					if (ludoObject.checkForPieceOnCoord(e.layerX, e.layerY, ludoObject.player.pieces[i].piece.left, ludoObject.player.pieces[i].piece.top)) {
						
						// if it did we move the piece to the first position
						ludoObject.player.pieces[i].piece.moveToFirstPosition();
						
						// if this is an online game we send the move to the other players
						if (ludoObject.isOnlineGame) {
							var data = {"move_piece" : true, 
										"game_index" : ludoObject.onlineGameIndex, 
										"color"		 : ludoObject.player.color, 
										"piece_index": i, 
										"diceroll"	 : -1};
							ludoObject.connection.send( JSON.stringify(data) );
						}
						
						setTimeout(function() {
							// we make sure that the dice is not disabled
							ludoObject.dice.disabled = false;
						}, 900);
					}
				}
				// if click was not on a piece in the home position
				else {
					
					// we check if click happened on a piece in play
					if (ludoObject.checkForPieceOnCoord(e.layerX, e.layerY, ludoObject.player.pieces[i].piece.left, ludoObject.player.pieces[i].piece.top)) {
						
						ludoObject.player.pieces[i].piece.selected = true;
						
						// if the player cannot move this piece into the Goal area
						if (!ludoObject.checkIfCanMoveToGoal(ludoObject.player.pieces[i].piece)) {
							
							var block = ludoObject.checkForBlockOnPath(ludoObject.player, ludoObject.player.pieces[i].piece, ludoObject.player.diceRoll);
							
							if (block == 0) {
								// we highlight it's path and set player ready to move
								ludoObject.highlightFields(ludoObject.player.pieces[i].piece, ludoObject.player.diceRoll);
								ludoObject.player.readyToMove = true;
								
								// and if it's an online game we highlight the path on the other player's boards as well
								if (ludoObject.isOnlineGame) {
							
									var data = {"highlight": true, 
												"game_index": ludoObject.onlineGameIndex, 
												"color": ludoObject.player.color, 
												"piece_index": i, 
												"diceroll": ludoObject.player.diceRoll};
									ludoObject.connection.send( JSON.stringify(data) );
								}
								
								setTimeout(function() {
									// we make sure that the dice is not disabled
									ludoObject.dice.disabled = false;
								}, 900);
							}
							else {
								if (ludoObject.isOnlineGame) {
									var data = {"greyout"	 : true, 
												"game_index" : ludoObject.onlineGameIndex, 
												"color"		 : ludoObject.player.color, 
												"piece_index": i, 
												"block_index": block};
									ludoObject.connection.send( JSON.stringify(data) );
								}
								
								ludoObject.greyOutFields(ludoObject.player.pieces[i].piece, block);
							}
						}
					}
				}
			}
		}
		// else if the player has not yet selected a piece and rolled a number other than 6
		else if (ludoObject.player.diceRoll != undefined) {
			
			// we check how many of the players pieces is in the Goal area
			var piecesInGoal = ludoObject.player.piecesInGoal;
			
			// we loop through the players pieces
			for (var i = 0; i < 4; i++) {
				
				// if this clicke moved a players piece into the Goal area, we break.
				if (piecesInGoal < ludoObject.player.piecesInGoal) {
					break;
				}
				
				// else if when we find a piece that is not in the home position 
				if (!ludoObject.player.pieces[i].piece.inHome) {
					
					// we check if the click happened on this piece
					if (ludoObject.checkForPieceOnCoord(e.layerX, e.layerY, ludoObject.player.pieces[i].piece.left, ludoObject.player.pieces[i].piece.top)) {
						
						// we set the piece to be selected
						ludoObject.player.pieces[i].piece.selected = true;
						
						// if this piece can not move to the goal-area
						if (!ludoObject.checkIfCanMoveToGoal(ludoObject.player.pieces[i].piece)) {
							
							// we check if the piece has a block in it's path
							var block = ludoObject.checkForBlockOnPath(ludoObject.player, ludoObject.player.pieces[i].piece, ludoObject.player.diceRoll);
							
							// if there is no block on the path
							if (block == 0) {
								// we highlight it's path and set player ready to move
								ludoObject.highlightFields(ludoObject.player.pieces[i].piece, ludoObject.player.diceRoll);
								ludoObject.player.readyToMove = true;
								
								// and if it's an online game we highlight the path on the other player's boards as well
								if (ludoObject.isOnlineGame) {
							
									var data = {"highlight": true, 
												"game_index": ludoObject.onlineGameIndex, 
												"color": ludoObject.player.color, 
												"piece_index": i, 
												"diceroll": ludoObject.player.diceRoll};
									ludoObject.connection.send( JSON.stringify(data) );
								}
								
							}
							// else if there is a block on the path
							else {
								// if this player can't move any other piece
								if (ludoObject.dice.checkForAnyMovablePieces() < 1) {
									
									// else we grey out the path cells up to the block
									ludoObject.greyOutFields(ludoObject.player.pieces[i].piece, block);
									
									// we end this players turn, giving control to the next player
									ludoObject.dice.endTurn();
								}
								// else if player has movable pieces
								else {
									
									// else we grey out the path cells up to the block
									ludoObject.greyOutFields(ludoObject.player.pieces[i].piece, block);
									
									if (ludoObject.isOnlineGame) {
										var data = {"greyout"	 : true, 
													"game_index" : ludoObject.onlineGameIndex, 
													"color"		 : ludoObject.player.color, 
													"piece_index": i, 
													"block_index": block};
										ludoObject.connection.send( JSON.stringify(data) );
										
									} // end if online
									
								} 
							} // end if no block on path
						} // end check for any movable pieces
					} // end check for piece on coord
				} // end if piece is not in home
			} // end pieces loop
		} // end if diceRoll != 6
	} // end click not on blanc
} // end function onmousedown

document.getElementById('roll_num_btn').onclick = function() {
	
	var select_div = document.getElementById('select_dice_num');
	var index = select_div.selectedIndex;
	var value = select_div.options[index].value;
	ludoObject.dice.faceNum = new Number(value);
	if (value == "6") {
		ludoObject.dice.displaySix();
	}
	else if (value == "5") {
		ludoObject.dice.displayFive();
	}
	else if (value == "4") {
		ludoObject.dice.displayFour();
	}
	else if (value == "3") {
		ludoObject.dice.displayThree();
	}
	else if (value == "2") {
		ludoObject.dice.displayTwo();
	}
	else if (value == "1") {
		ludoObject.dice.displayOne();
	}
	ludoObject.dice.handleRolledNumber();
	
}

document.getElementById('player_name').onkeydown = function(e) {
		
	if (e.target.value.length > 1) {
		document.getElementById('new_player_btn').removeAttribute('disabled');
		document.getElementById('new_computer_btn').setAttribute('disabled', true);
	}
}

document.getElementById('new_player_btn').onclick = function() {
	
	var enteredName = document.getElementById('player_name').value;
	var nameChop = enteredName.substr(0, 7);
	
	document.getElementById('new_computer_btn').removeAttribute('disabled');
	
	// if this is a local game
	if (!ludoObject.isOnlineGame) {
		ludoObject.setPlayerName(nameChop);
	}
	// if this is an online game
	else {
		// we send a JASON object with the color, name and gameIndex
		var data={"color" : ludoObject.player.color, 
				  "name" : nameChop, 
				  "game_index": ludoObject.onlineGameIndex};
		
		ludoObject.connection.send( JSON.stringify(data) );
		
		if (ludoObject.player.color != "green") {
			setTimeout(function() {
				ludoObject.toggleGameTypeForm();
			}, 1100);
		}
		else {
			ludoObject.toggleGameTypeForm();
		}
		
	}
}

document.getElementById('new_computer_btn').onclick = function() {
	ludoObject.setPlayerToCompu();
}

document.getElementById('sounds_box').onclick =function () {
	
	ludoObject.soundOn = this.checked;
	
	if (this.checked) {
		ludoObject.backgroundSound.play();
	} else {
		ludoObject.backgroundSound.pause();
	}
}

document.getElementById('fx_box').onclick =function () {
	
	ludoObject.fxOn = this.checked;
}

/*
window.onblur = function() {
	
	if (!ludoObject.isOnlineGame && ludoObject.gameIsRunning && !ludoObject.paused) {
		ludoObject.player.displayPausedGraphic();
	}
}	

window.onfocus = function() {
	
	if (!ludoObject.isOnlineGame && ludoObject.gameIsRunning && ludoObject.paused) {
		ludoObject.player.displayPausedGraphic();
		
		// if the current player is a computer player
		if (ludoObject.player.computer) {

			// we roll the dice for the computer player after 1 second
			setTimeout(function() {
				ludoObject.dice.rollDice();
			}, 1000);
		}
	}
	
}
*/

document.onkeydown = function(e) {
	
	var keycode = e.keyCode
	
	if (e.ctrlKey && keycode == 82) {
        if (!confirm("Do You Really Want to leave this session?")) {
            e.preventDefault();
            console.log("Browser Reload prevented");
        }
        else {
	        location.reload();
        }
	}
};

window.onbeforeunload = function(e) {
	
	if (ludoObject.connection) {
		var data={"close" : true, "game_index": ludoObject.onlineGameIndex, "sid": ludoObject.player.sid};
		ludoObject.connection.send( JSON.stringify(data) );
	}
};

