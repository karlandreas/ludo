<!DOCTYPE html>
<html>
<head lang="en">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta charset="UTF-8">
<title> Ludo </title>
<link rel='stylesheet' href='css/index.css' type='text/css' />
<script>
// we store the ip of the visiting ludo player client
var ip = new String("<?php echo($_SERVER['REMOTE_ADDR']); ?>");
</script>
</head>
<body id="body">

	<div id="sounds_container">
		<audio id="background_sound">
			<source src="sounds/nature.mp3" type="audio/mp3">
		</audio>

		<audio id="shakeDice_sound">
			<source src="sounds/shakeDice.mp3" type="audio/mp3">
		</audio>

		<audio id="rooster_sound">
			<source src="sounds/rooster.mp3" type="audio/mp3">
		</audio>

		<audio id="cow_sound">
			<source src="sounds/cow.mp3" type="audio/mp3">
		</audio>

		<audio id="sheep_sound">
			<source src="sounds/sheep.mp3" type="audio/mp3">
		</audio>

		<audio id="duck_sound">
			<source src="sounds/duck.mp3" type="audio/mp3">
		</audio>

		<audio id="cuckoo_sound">
			<source src="sounds/cuckooClock.mp3" type="audio/mp3">
		</audio>

		<audio id="cheering_sound">
			<source src="sounds/cheering.mp3" type="audio/mp3">
		</audio>

		<audio id="woff_sound">
			<source src="sounds/woff.mp3" type="audio/mp3">
		</audio>
	</div>

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
	
		<!-- Game Canvas container -->
		<div id="canvas_container" class="gamecontainer_div">

		<canvas id="game_canvas" width='480' height='480'>
		</canvas>

		</div>

		<!-- Game Table container -->
		<div id="game_container" class="gamecontainer_div">
			
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
			<td id="x7y15"  class="normalcell"></td>
			<td id="x8y15"  class="normalcell"></td>
			<td id="x9y15"  class="normalcell"></td>

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
			<td id="g_H2" class="homecell green"></td>
			<td id="g_H4" class="homecell green"></td>
			</tr>

			<tr>
			<td id="g_H1" class="homecell green"></td>
			<td id="g_H3" class="homecell green"></td>
			</tr>

			</table>

			</td>
			<td class="green wallcell"></td>

			<!-- Game cells on row 14 -->
			<td id="x7y14"  class="normalcell"></td>
			<td id="x8y14"  class="normalcell blue"></td>
			<td id="x9y14"  class="normalcell blue"></td>

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
			<td id="b_H1" class="homecell blue"></td>
			<td id="b_H2" class="homecell blue"></td>
			</tr>

			<tr>
			<td id="b_H3" class="homecell blue"></td>
			<td id="b_H4" class="homecell blue"></td>
			</tr>

			</table>

			</td>
			<td class="blue wallcell"></td>
			</tr>

			<tr id="y13">
			<td class="green wallcell"></td>
			<td class="green wallcell"></td>

			<!-- Game cells on row 13 -->
			<td id="x7y13"  class="normalcell"></td>
			<td id="x8y13"  class="normalcell blue"></td>
			<td id="x9y13"  class="normalcell"></td>

			<td class="blue wallcell"></td>
			<td class="blue wallcell"></td>
			</tr>

			<tr id="y12">
			<td class="green wallcell"></td>
			<td class="green wallcell"></td>

			<!-- Game cells on row 12 -->
			<td id="x7y12"  class="normalcell"></td>
			<td id="x8y12"  class="normalcell blue"></td>
			<td id="x9y12"  class="normalcell"></td>

			<td class="blue wallcell"></td>
			<td class="blue wallcell"></td>
			</tr>

			<tr id="y11">
			<td class="green wallcell"></td>
			<td class="green wallcell"></td>

			<!-- Game cells on row 11 -->
			<td id="x7y11"  class="normalcell"></td>
			<td id="x8y11"  class="normalcell blue"></td>
			<td id="x9y11"  class="normalcell"></td>

			<td class="blue wallcell"></td>
			<td class="blue wallcell"></td>
			</tr>

			<tr id="y10">
			<td class="green" 
			colspan="6" 
			style="height:30px;
			border-left:2px solid black;"></td>

			<!-- Game cells on row 10 -->
			<td id="x7y10"  class="normalcell"></td>
			<td id="x8y10"  class="normalcell blue"></td>
			<td id="x9y10"  class="normalcell"></td>

			<td class="blue" 
			colspan="6" 
			style="height:30px;
			border-right:2px solid black;"></td>
			</tr>

			<!-- Middle rows -->
			<tr id="y9">
			<!-- Game cells on row 9 -->
			<td id="x1y9"  class="normalcell"></td>
			<td id="x2y9"  class="normalcell green"></td>
			<td id="x3y9"  class="normalcell"></td>
			<td id="x4y9"  class="normalcell"></td>
			<td id="x5y9"  class="normalcell"></td>
			<td id="x6y9"  class="normalcell"></td>

			<!-- Game Goal / Finnish -->
			<td id="goal_cell" colspan="3" rowspan="3">
			</td>

			<!-- Game cells on row 9 -->
			<td id="x10y9"  class="normalcell"></td>
			<td id="x11y9"  class="normalcell"></td>
			<td id="x12y9"  class="normalcell"></td>
			<td id="x13y9"  class="normalcell"></td>
			<td id="x14y9"  class="normalcell"></td>
			<td id="x15y9"  class="normalcell"></td>
			</tr>
			<tr id="y8">
			<!-- Game cells on row 8 -->
			<td id="x1y8"  class="normalcell"></td>
			<td id="x2y8"  class="normalcell green"></td>
			<td id="x3y8"  class="normalcell green"></td>
			<td id="x4y8"  class="normalcell green"></td>
			<td id="x5y8"  class="normalcell green"></td>
			<td id="x6y8"  class="normalcell green"></td>

			<td id="x10y8"  class="normalcell red"></td>
			<td id="x11y8"  class="normalcell red"></td>
			<td id="x12y8"  class="normalcell red"></td>
			<td id="x13y8"  class="normalcell red"></td>
			<td id="x14y8"  class="normalcell red"></td>
			<td id="x15y8"  class="normalcell"></td>
			</tr>
			<tr id="y7">
			<!-- Game cells on row 7 -->
			<td id="x1y7"  class="normalcell"></td>
			<td id="x2y7"  class="normalcell"></td>
			<td id="x3y7"  class="normalcell"></td>
			<td id="x4y7"  class="normalcell"></td>
			<td id="x5y7"  class="normalcell"></td>
			<td id="x6y7"  class="normalcell"></td>

			<td id="x10y7"  class="normalcell"></td>
			<td id="x11y7"  class="normalcell"></td>
			<td id="x12y7"  class="normalcell"></td>
			<td id="x13y7"  class="normalcell"></td>
			<td id="x14y7"  class="normalcell red"></td>
			<td id="x15y7"  class="normalcell"></td>
			</tr>

			<tr id="y6">
			<td class="yellow" 
			colspan="6" 
			style="height:30px;
			border-left:2px solid black;"></td>

			<!-- Game cells on row 6 -->
			<td id="x7y6"  class="normalcell"></td>
			<td id="x8y6"  class="normalcell yellow"></td>
			<td id="x9y6"  class="normalcell"></td>

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
			<td id="y_H4" class="homecell yellow"></td>
			<td id="y_H3" class="homecell yellow"></td>
			</tr>

			<tr>
			<td id="y_H2" class="homecell yellow"></td>
			<td id="y_H1" class="homecell yellow"></td>
			</tr>

			</table>

			</td>
			<td class="yellow wallcell"></td>

			<!-- Game cells on row 5 -->
			<td id="x7y5"  class="normalcell"></td>
			<td id="x8y5"  class="normalcell yellow"></td>
			<td id="x9y5"  class="normalcell"></td>

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
			<td id="r_H3" class="homecell red"></td>
			<td id="r_H1" class="homecell red"></td>
			</tr>

			<tr>
			<td id="r_H4" class="homecell red"></td>
			<td id="r_H2" class="homecell red"></td>
			</tr>

			</table>

			</td>
			<td class="red wallcell"></td>
			</tr>

			<tr id="y4">
			<td class="yellow wallcell"></td>
			<td class="yellow wallcell"></td>

			<!-- Game cells on row 4 -->
			<td id="x7y4"  class="normalcell"></td>
			<td id="x8y4"  class="normalcell yellow"></td>
			<td id="x9y4"  class="normalcell"></td>

			<td class="red wallcell"></td>
			<td class="red wallcell"></td>
			</tr>

			<tr id="y3">
			<td class="yellow wallcell"></td>
			<td class="yellow wallcell"></td>

			<!-- Game cells on row 3 -->
			<td id="x7y3"  class="normalcell"></td>
			<td id="x8y3"  class="normalcell yellow"></td>
			<td id="x9y3"  class="normalcell"></td>

			<td class="red wallcell"></td>
			<td class="red wallcell"></td>
			</tr>

			<tr id="y2">
			<td class="yellow wallcell"></td>
			<td class="yellow wallcell"></td>

			<!-- Game cells on row 2 -->
			<td id="x7y2"  class="normalcell yellow"></td>
			<td id="x8y2"  class="normalcell yellow"></td>
			<td id="x9y2"  class="normalcell"></td>

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
			<td id="x7y1"  class="normalcell"></td>
			<td id="x8y1"  class="normalcell"></td>
			<td id="x9y1"  class="normalcell"></td>

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

		<!-- Game Trackers container -->
		<div id="trackers_container">

			<div id="green_tracker" class="tracker">
			<table id="green_tracker_tbl" 
			border="1" 
			cellspacing="0" 
			cellpadding="0"
			width="100%" 
			style="height:100%;border-collapse:collapse;border:1px solid lime;">

			<thead><tr><td colspan="4"><p>Green progress</p></td></tr></thead>
			<tbody>
			<tr id="green_tracker_row10">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row09">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row08">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row07">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row06">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row05">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row04">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row03">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row02">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="green_tracker_row01">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			</tbody>
			<tfoot class="trackers_foot"><tr><td id="green_percent_cell" colspan="4"><p>0%</p></td></tr></tfoot>
			</table>
		</div>

		<div id="blue_tracker" class="tracker">
			<table id="blue_tracker_tbl" 
			border="1" 
			cellspacing="0" 
			cellpadding="0"
			width="100%" 
			style="height:100%;border-collapse:collapse;border:1px solid aqua;">
			<thead><tr><td colspan="4"><p>Blue progress</p></td></tr></thead>
			<tbody>

			<tr id="blue_tracker_row10">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row09">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row08">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row07">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row06">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row05">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row04">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row03">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row02">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="blue_tracker_row01">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			</tbody>
			<tfoot class="trackers_foot"><tr><td id="blue_percent_cell" colspan="4"><p>0%</p></td></tr></tfoot>
			</table>
		</div>

		<div id="yellow_tracker" class="tracker">
			<table id="yellow_tracker_tbl" 
			border="1" 
			cellspacing="0" 
			cellpadding="0"
			width="100%" 
			style="height:100%;border-collapse:collapse;border:1px solid white;">
			<thead><tr><td colspan="4"><p>Yellow progress</p></td></tr></thead>
			<tbody>

			<tr id="yellow_tracker_row10">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row09">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row08">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row07">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row06">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row05">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row04">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row03">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row02">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="yellow_tracker_row01">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>

			</tbody>
			<tfoot class="trackers_foot"><tr><td id="yellow_percent_cell" colspan="4"><p>0%</p></td></tr></tfoot>
			</table>
		</div>

		<div id="red_tracker" class="tracker">
			<table id="red_tracker_tbl" 
			border="1" 
			cellspacing="0" 
			cellpadding="0"
			width="100%" 
			style="height:100%;border-collapse:collapse;border:1px solid pink;">
			<thead><tr><td colspan="4"><p>Red progress</p></td></tr></thead>
			<tbody>

			<tr id="red_tracker_row10">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row09">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row08">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row07">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row06">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row05">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row04">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row03">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row02">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>
			<tr id="red_tracker_row01">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			</tr>

			</tbody>
			<tfoot class="trackers_foot"><tr><td id="red_percent_cell" colspan="4"><p>0%</p></td></tr></tfoot>
			</table>
			</div>

		</div>

		<div id="controls_div">

			<div id="dice_div">
			<img id="dice_img" src="images/dice.svg" />
			</div>

			<div id="sounds_div" class="sounds"></div>

			<div id="fx_div" class="sounds"></div>

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
			class="input_text_field"
			tabindex="1"></input>
			</td>
			</tr>
			<tr>
			<td>
			<input id="new_computer_btn" 
			class="input_btn"
			style="height:50px;" 
			type="button" 
			value="Player is Computer"
			tabindex="2"></input>
			</td>
			<td>
			<input id="new_player_btn"
			class="input_btn" 
			disabled="true" 
			type="button" 
			value="Set Name"
			tabindex="3"></input>
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
			<div id="simulate_btn" onclick="javascript:ludoObject.simulateGame();">
			<h2>Simulate a Game</h2>
			</div>

		</div>
	</body>
	<script src='scripts/requestNextAnimationframe.js' type='text/javascript'></script>
	<script src='scripts/LudoSVG.js' type='text/javascript'></script>
	<script src='scripts/LudoSVGimages.js' type='text/javascript'></script>
	<script src='scripts/Piece.js' type='text/javascript'></script>
	<script src='scripts/Dice.js' type='text/javascript'></script>
	<script src='scripts/Player.js' type='text/javascript'></script>
	<script src='scripts/LudoTracker.js' type='text/javascript'></script>
	<script src='scripts/LudoObj.js' type='text/javascript'></script>
	<!--	<script src='scripts/Ludo.js' type='text/javascript'></script> -->
</html>
