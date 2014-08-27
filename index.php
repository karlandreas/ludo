<!DOCTYPE html>
<html>
	<head lang="en">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title> Ludo </title>
	<link rel='stylesheet' href='css/index.css' type='text/css' />
	<script>
		// we store the ip of the visiting ludo player client
		var ip = new String("<?php echo($_SERVER['REMOTE_ADDR']); ?>");
	</script>
	</head>
	<body>
		<div id="site">
		
		<table id="playertable" cellpadding="7">
			<tr>
				<td>
				<div id="player1_div" class="player">
					<p>Player1</p>
				</div>
				</td>
				<td>
				<div id="player2_div" class="player">
					<p>Player2</p>
				</div>
				</td>
				<td>
				<div id="player3_div" class="player">
					<p>Player3</p>
				</div>
				</td>
				<td>
				<div id="player4_div" class="player">
					<p>Player4</p>
				</div>
				</td>
			</tr>
		</table>
		
		<!-- Canvas container -->
		<div id="canvascontainer" class="gamecontainer_div">
		
		<canvas id="game_canvas" width='480' height='480'>
		</canvas>
		
		</div>
		
		<!-- Table container -->
		<div id="gamecontainer" class="gamecontainer_div">
		
		<table id="gametable" 
			   cellspacing="0" 
			   cellpadding="0" 
			   style="border-collapse: collapse;">
			
			<tbody>
			
				<tr id="y15">
					<td class="green" 
						colspan="6" 
						style="height:30px;
							   border-top:2px solid black;
							   border-left:2px solid black;"></td>
					
					<!-- Game cells on row 15 -->
					<td id="x7y15" count="0" class="normalcell">x7y15</td>
					<td id="x8y15" count="0" class="normalcell">x8y15</td>
					<td id="x9y15" count="0" class="normalcell">x9y15</td>
					
					<td class="blue" 
						colspan="6" 
						style="height:30px;
							   border-top:2px solid black;
							   border-right:2px solid black;"></td>
				</tr>
				
				<tr id="y14">
					<td class="green wallcell"></td>
					
					<!-- Home Green cell -->
					<td class="gap" 
						colspan="4" 
						rowspan="4"
						style="border-bottom:2px solid black;
							   border-top:2px solid black;">
						
						<!-- Home table for yellow -->
						
						<table cellspacing="14">
						
							<tr>
								<td id="g_H2" class="homecell green">g_H2</td>
								<td id="g_H4" class="homecell green">g_H4</td>
							</tr>
							
							<tr>
								<td id="g_H1" class="homecell green">g_H1</td>
								<td id="g_H3" class="homecell green">g_H3</td>
							</tr>
							
						</table>
						
					</td>
					<td class="green wallcell"></td>
					
					<!-- Game cells on row 14 -->
					<td id="x7y14" count="0" class="normalcell">x7y14</td>
					<td id="x8y14" count="0" class="normalcell blue">x8y14</td>
					<td id="x9y14" count="0" class="normalcell blue">x9y14</td>
					
					<td class="blue wallcell"></td>
					
					<!-- Home Blue cell -->
					<td class="gap" 
						colspan="4" 
						rowspan="4"
						style="border-bottom:2px solid black;
							   border-top:2px solid black;">
						
						<!-- Home table for blue -->
						<table cellspacing="14">
						
							<tr>
								<td id="b_H1" class="homecell blue">b_H1</td>
								<td id="b_H2" class="homecell blue">b_H2</td>
							</tr>
							
							<tr>
								<td id="b_H3" class="homecell blue">b_H3</td>
								<td id="b_H4" class="homecell blue">b_H4</td>
							</tr>
							
						</table>
						
					</td>
					<td class="blue wallcell"></td>
				</tr>
				
				<tr id="y13">
					<td class="green wallcell"></td>
					<td class="green wallcell"></td>
					
					<!-- Game cells on row 13 -->
					<td id="x7y13" count="0" class="normalcell">x7y13</td>
					<td id="x8y13" count="0" class="normalcell blue">x8y13</td>
					<td id="x9y13" count="0" class="normalcell">x9y13</td>
					
					<td class="blue wallcell"></td>
					<td class="blue wallcell"></td>
				</tr>
				
				<tr id="y12">
					<td class="green wallcell"></td>
					<td class="green wallcell"></td>
					
					<!-- Game cells on row 12 -->
					<td id="x7y12" count="0" class="normalcell">x7y12</td>
					<td id="x8y12" count="0" class="normalcell blue">x8y12</td>
					<td id="x9y12" count="0" class="normalcell">x9y12</td>
					
					<td class="blue wallcell"></td>
					<td class="blue wallcell"></td>
				</tr>
				
				<tr id="y11">
					<td class="green wallcell"></td>
					<td class="green wallcell"></td>
					
					<!-- Game cells on row 11 -->
					<td id="x7y11" count="0" class="normalcell">x7y11</td>
					<td id="x8y11" count="0" class="normalcell blue">x8y11</td>
					<td id="x9y11" count="0" class="normalcell">x9y11</td>
					
					<td class="blue wallcell"></td>
					<td class="blue wallcell"></td>
				</tr>
				
				<tr id="y10">
					<td class="green" 
						colspan="6" 
						style="height:30px;
							   border-left:2px solid black;"></td>
					
					<!-- Game cells on row 10 -->
					<td id="x7y10" count="0" class="normalcell">x7y10</td>
					<td id="x8y10" count="0" class="normalcell blue">x8y10</td>
					<td id="x9y10" count="0" class="normalcell">x9y10</td>
					
					<td class="blue" 
						colspan="6" 
						style="height:30px;
							   border-right:2px solid black;"></td>
				</tr>
				
				<!-- Middle rows -->
				<tr id="y9">
					<!-- Game cells on row 9 -->
					<td id="x1y9" count="0" class="normalcell">x1y9</td>
					<td id="x2y9" count="0" class="normalcell green">x2y9</td>
					<td id="x3y9" count="0" class="normalcell">x3y9</td>
					<td id="x4y9" count="0" class="normalcell">x4y9</td>
					<td id="x5y9" count="0" class="normalcell">x5y9</td>
					<td id="x6y9" count="0" class="normalcell">x6y9</td>
					
					<!-- Game Goal / Finnish -->
					<td id="goal_cell" colspan="3" rowspan="3">
						
						<table cellspacing="0">
							<tr>
								<td class="goalcell_left"></td>
								<td class="goalcell_right"></td>
							</tr>
						</table>
						
					</td>
					
					<!-- Game cells on row 9 -->
					<td id="x10y9" count="0" class="normalcell">x10y9</td>
					<td id="x11y9" count="0" class="normalcell">x11y9</td>
					<td id="x12y9" count="0" class="normalcell">x12y9</td>
					<td id="x13y9" count="0" class="normalcell">x13y9</td>
					<td id="x14y9" count="0" class="normalcell">x14y9</td>
					<td id="x15y9" count="0" class="normalcell">x15y9</td>
				</tr>
				<tr id="y8">
					<!-- Game cells on row 8 -->
					<td id="x1y8" count="0" class="normalcell">x1y8</td>
					<td id="x2y8" count="0" class="normalcell green">x2y8</td>
					<td id="x3y8" count="0" class="normalcell green">x3y8</td>
					<td id="x4y8" count="0" class="normalcell green">x4y8</td>
					<td id="x5y8" count="0" class="normalcell green">x5y8</td>
					<td id="x6y8" count="0" class="normalcell green">x6y8</td>
										
					<td id="x10y8" count="0" class="normalcell red">x10y8</td>
					<td id="x11y8" count="0" class="normalcell red">x11y8</td>
					<td id="x12y8" count="0" class="normalcell red">x12y8</td>
					<td id="x13y8" count="0" class="normalcell red">x13y8</td>
					<td id="x14y8" count="0" class="normalcell red">x14y8</td>
					<td id="x15y8" count="0" class="normalcell">x15y8</td>
				</tr>
				<tr id="y7">
					<!-- Game cells on row 7 -->
					<td id="x1y7" count="0" class="normalcell">x1y7</td>
					<td id="x2y7" count="0" class="normalcell">x2y7</td>
					<td id="x3y7" count="0" class="normalcell">x3y7</td>
					<td id="x4y7" count="0" class="normalcell">x4y7</td>
					<td id="x5y7" count="0" class="normalcell">x5y7</td>
					<td id="x6y7" count="0" class="normalcell">x6y7</td>
										
					<td id="x10y7" count="0" class="normalcell">x10y7</td>
					<td id="x11y7" count="0" class="normalcell">x11y7</td>
					<td id="x12y7" count="0" class="normalcell">x12y7</td>
					<td id="x13y7" count="0" class="normalcell">x13y7</td>
					<td id="x14y7" count="0" class="normalcell red">x14y7</td>
					<td id="x15y7" count="0" class="normalcell">x15y7</td>
				</tr>
				
				<tr id="y6">
					<td class="yellow" 
						colspan="6" 
						style="height:30px;
							   border-left:2px solid black;"></td>
					
					<!-- Game cells on row 6 -->
					<td id="x7y6" count="0" class="normalcell">x7y6</td>
					<td id="x8y6" count="0" class="normalcell yellow">x8y6</td>
					<td id="x9y6" count="0" class="normalcell">x9y6</td>
					
					<td class="red" 
						colspan="6" 
						style="height:30px;
							   border-right:2px solid black;"></td>
				</tr>
				
				<tr id="y5">
					<td class="yellow wallcell"></td>
					
					<!-- Home Yellow cell -->
					<td class="gap" 
						colspan="4" 
						rowspan="4"
						style="border-bottom:2px solid black;
							   border-top:2px solid black;">
						
						<!-- Home table for yellow -->
						<table cellspacing="14">
						
							<tr>
								<td id="y_H4" class="homecell yellow">y_H4</td>
								<td id="y_H3" class="homecell yellow">y_H3</td>
							</tr>
							
							<tr>
								<td id="y_H2" class="homecell yellow">y_H2</td>
								<td id="y_H1" class="homecell yellow">y_H1</td>
							</tr>
							
						</table>
						
					</td>
					<td class="yellow wallcell"></td>
					
					<!-- Game cells on row 5 -->
					<td id="x7y5" count="0" class="normalcell">x7y5</td>
					<td id="x8y5" count="0" class="normalcell yellow">x8y5</td>
					<td id="x9y5" count="0" class="normalcell">x9y5</td>
					
					<td class="red wallcell"></td>
					
					<!-- Home Red cell -->
					<td class="gap" 
						colspan="4" 
						rowspan="4" 
						style="border-bottom:2px solid black;
							   border-top:2px solid black;">
						
						<!-- Home table for red -->
						<table cellspacing="14">
						
							<tr>
								<td id="r_H3" class="homecell red">r_H3</td>
								<td id="r_H1" class="homecell red">r_H1</td>
							</tr>
							
							<tr>
								<td id="r_H4" class="homecell red">r_H4</td>
								<td id="r_H2" class="homecell red">r_H2</td>
							</tr>
							
						</table>
						
					</td>
					<td class="red wallcell"></td>
				</tr>
				
				<tr id="y4">
					<td class="yellow wallcell"></td>
					<td class="yellow wallcell"></td>
					
					<!-- Game cells on row 4 -->
					<td id="x7y4" count="0" class="normalcell">x7y4</td>
					<td id="x8y4" count="0" class="normalcell yellow">x8y4</td>
					<td id="x9y4" count="0" class="normalcell">x9y4</td>
					
					<td class="red wallcell"></td>
					<td class="red wallcell"></td>
				</tr>
				
				<tr id="y3">
					<td class="yellow wallcell"></td>
					<td class="yellow wallcell"></td>
					
					<!-- Game cells on row 3 -->
					<td id="x7y3" count="0" class="normalcell">x7y3</td>
					<td id="x8y3" count="0" class="normalcell yellow">x8y3</td>
					<td id="x9y3" count="0" class="normalcell">x9y3</td>
					
					<td class="red wallcell"></td>
					<td class="red wallcell"></td>
				</tr>
				
				<tr id="y2">
					<td class="yellow wallcell"></td>
					<td class="yellow wallcell"></td>
					
					<!-- Game cells on row 2 -->
					<td id="x7y2" count="0" class="normalcell yellow">x7y2</td>
					<td id="x8y2" count="0" class="normalcell yellow">x8y2</td>
					<td id="x9y2" count="0" class="normalcell">x9y2</td>
					
					<td class="red wallcell"></td>
					<td class="red wallcell"></td>
				</tr>
				
				<tr id="y1">
					<td class="yellow" 
						colspan="6" 
						style="height:30px;
							   border-bottom:2px solid black;
							   border-left:2px solid black;
							   border-right:2px solid black;"></td>
					
					<!-- Game cells on row 1 -->
					<td id="x7y1" count="0" class="normalcell">x7y1</td>
					<td id="x8y1" count="0" class="normalcell">x8y1</td>
					<td id="x9y1" count="0" class="normalcell">x9y1</td>
					
					<td class="red" 
						colspan="6" 
						style="height:30px;
							   border-bottom:2px solid black;
							   border-left:2px solid black;
							   border-right:2px solid black;"></td>
				</tr>
				
			</tbody>
		</table>
		
		</div>
		
		<div id="controls_div">
			
			<div id="dice_div">
				<img id="dice_img" src="images/dice.svg" />
			</div>
			
			<select id="select_dice_num">
				<option value="6">Roll a Six</option>
				<option value="5">Roll a Five</option>
				<option value="4">Roll a Four</option>
				<option value="3">Roll a Three</option>
				<option value="2">Roll a Two</option>
				<option value="1">Roll a One</option>
			</select>
			<button id="roll_num_btn">Roll</button>
		</div>
		
		</div>
		
		<div id="new_player_div" class="startup_form">
			<h1>New Player</h1>
			<table>
				<tr>
					<td>
						<label for="name">Enter Your Name:</label>
					</td>
					<td>
						<input id="player_name" 
							   name="name" 
							   type="text" 
							   size="40" 
							   class="input_text_field"></input>
					</td>
				</tr>
				<tr>
					<td>
						<input id="new_computer_btn" 
							   class="input_btn"
							   style="height:50px;" 
							   type="button" 
							   value="Player is Computer"></input>
					</td>
					<td>
						<input id="new_player_btn"
							   class="input_btn" 
							   disabled="true" 
							   type="button" 
							   value="Set Name"></input>
					</td>
				</tr>
			</table>
		</div>
		
		<div id="game_type_div" class="startup_form">
			<h1>Choose a game type</h1>
			
			<div class="game_type_btn" onclick="javascript:ludoObject.playLocally();">
				<h2>Play Locally</h2>
			</div>
			
			<div class="game_type_btn" onclick="javascript:ludoObject.playOnline(ip);">
				<h2>Play Online</h2>
			</div>
			
		</div>
	</body>
	<script src='scripts/requestNextAnimationframe.js' type='text/javascript'></script>
	<script src='scripts/Piece.js' type='text/javascript'></script>
	<script src='scripts/Dice.js' type='text/javascript'></script>
	<script src='scripts/Player.js' type='text/javascript'></script>
	<script src='scripts/LudoObj.js' type='text/javascript'></script>
</html>