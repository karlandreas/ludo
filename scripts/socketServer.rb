#!/usr/bin/env ruby
require 'em-websocket'
require 'json'
# require 'actiontimer'

class Game
	
	attr_reader :channel, :index
	attr_accessor :players_arr, :started, :count
	
	def initialize(channel, index)
		@channel 	 = channel
		@players_arr = []
		@index 		 = index
		@started 	 = false
		@count		 = 1
	end
	
	def add_player(player)
		@players_arr.push(player)
		@count += 1
	end
	
	def remove_player(sid)
		
		# we loop through the players in this game
		@players_arr.each do |player|
			# when we find the player to remove we push the color to the other players
			if player.sid == sid
				
				if @started == false
					@count -= 1
				else
					player.computer = true
				end
				
				remove_hash = Hash.new
				remove_hash['remove'] = true
				remove_hash['color'] = player.color
				@channel.push(JSON.generate(remove_hash))
			end
		end
		
		@channel.unsubscribe(sid)
	end
	
	def get_next_player(color)
		
		if (color == "yellow")
			return @players_arr[1]
		elsif (color == "red")
			return @players_arr[2]
		elsif (color == "blue")
			return @players_arr[3]
		elsif (color == "green")
			return @players_arr[0]
		end
	end
	
	def get_player_for_color(color)
		if (color == "yellow")
			return @players_arr[0]
		elsif (color == "red")
			return @players_arr[1]
		elsif (color == "blue")
			return @players_arr[2]
		elsif (color == "green")
			return @players_arr[3]
		end
	end
	
	def get_next_non_computer_player
		
		@players_arr.each do |player|
			if !player.computer
				return player
			end
			next if player.computer
		end
	end
	
	def write_names_to_players
		# we create a hash to update Game Clients with player names
		update_hash = Hash.new 
		update_hash['update'] = true
		
		@players_arr.each do |player|
			update_hash[player.color] = player.name
		end
		
		@channel.push(JSON.generate(update_hash))
	end
	
	def show_rolled_number(number)
		# we create a hash to push the dice coords to all players
		dice_hash = Hash.new
		dice_hash['dice'] = true
		dice_hash['number'] = number
		
		@channel.push(JSON.generate(dice_hash))
	end
	
	def highlight(color, index, diceroll)
		# we create a hash to push piece color index and move-to position
		highlight_hash = Hash.new
		highlight_hash['highlight'] = true
		highlight_hash['color'] 	= color
		highlight_hash['index'] 	= index
		highlight_hash['diceroll'] 	= diceroll
		
		@channel.push(JSON.generate(highlight_hash))
	end
	
	def move_piece(color, index, diceroll)
		# we create a hash to push piece color index and move-to position
		piece_hash = Hash.new
		piece_hash['move_piece'] = true
		piece_hash['color'] 	 = color
		piece_hash['index'] 	 = index
		piece_hash['diceroll'] 	 = diceroll
		
		@channel.push(JSON.generate(piece_hash))
	end
	
	def handle_computer_roll(color, dice_roll, compu)
		# we create a hash to push piece color index and move-to position
		computer_roll_hash = Hash.new
		computer_roll_hash['computer_roll'] = true
		computer_roll_hash['color'] 		= color
		computer_roll_hash['dice_roll'] 	= dice_roll
		computer_roll_hash['compu_next'] 	= compu
		
		@channel.push(JSON.generate(computer_roll_hash))
	end
	
	def greyout(color, index, block)
		# we create a hash to push piece and block 
		grey_hash = Hash.new
		grey_hash['greyout'] = true
		grey_hash['color'] = color
		grey_hash['index'] = index
		grey_hash['block'] = block
		
		@channel.push(JSON.generate(grey_hash))
	end
	
	def clear_fields()
		# we create a hash to push piece and block 
		clear_hash = Hash.new
		clear_hash['clear_fields'] = true
		
		@channel.push(JSON.generate(clear_hash))
	end
	
	def no_movable(color)
		# we create a hash to push piece and block 
		no_movable_hash = Hash.new
		no_movable_hash['no_movable'] = true
		no_movable_hash['color'] = color
		
		@channel.push(JSON.generate(no_movable_hash))
	end
	
	def move_to_goal(color, index, num_in_goal)
		# we create a hash to push piece
		to_goal_hash = Hash.new
		to_goal_hash['to_goal'] = true
		to_goal_hash['color'] = color
		to_goal_hash['index'] = index
		to_goal_hash['num_in_goal'] = index
		
		@channel.push(JSON.generate(to_goal_hash))
	end
	
	def switch_player(color)
		# we create a hash to push the dice coords to all players
		switch_hash = Hash.new
		switch_hash['switch_player'] = true
		switch_hash['color'] = color
		
		@channel.push(JSON.generate(switch_hash))
	end
	
	def start_game
		start_hash = Hash.new
		start_hash['start'] = true
		@channel.push(JSON.generate(start_hash))
	end
	
end # end class

class Player
	
	attr_accessor :name, :color, :computer, :allInHome, :diceRoll, :sid
		
	def initialize(color, sid)
		@color		= color
		@sid 		= sid
		@allInHome 	= true
	end
	
	def roll_dice
		random = Random.new
		
		@diceRoll = random.rand(6) + 1
		
		return @diceRoll
	end
	
	def try_to_get_out_of_home
		
		@allInHome = true
		@diceRoll  = 0
		
		3.times do |count|

			break if @diceRoll == 6
			
			roll_dice()
			
			puts "---Computer #{@color}\nrolled: #{@diceRoll} to get out of home ---End"
			
			# if the player got a six we move the first piece
			if @diceRoll == 6
				return true
			end
			
			if count == 2 && @diceRoll != 6
				puts "No Dice\! switching player"
				return false
			end
		end
		
	end
	
end # end class



# Before we start WebSocket's we make sure that there are no players from a previous session
# Dir.foreach("./../server/players/") { | file | 
# 	if !file.match(/^\.{1,2}$/)
# 		File.delete("./../server/players/" << file)
# 	end
# }
# and all waiting games
# Dir.foreach("./../server/waiting/") { | file | 
# 	if !file.match(/^\.{1,2}$/)
# 		File.delete("./../server/waiting/" << file)
# 	end
# }
# and all games
# Dir.foreach("./../server/games/") { | file | 
# 	if !file.match(/^\.{1,2}$/)
# 		File.delete("./../server/games/" << file)
# 	end
# }

EM.run {
  
  @games_arr = []
  @gameObject = nil
  @new 		= true

  EM::WebSocket.start(:host => "0.0.0.0", :port => 5301) do |ws|
    
    ws.onopen { |handshake|
		# path, query_string, origin, headers
		puts "------- NEW client #{handshake.headers['User-Agent']} -------"
		
		# on every 4th player we create a new game
		if @new && @gameObject == nil
			# we want to store the game-index in the game object
			new_game_index = @games_arr.length.to_i
			@gameObject = Game.new(EM::Channel.new, new_game_index)
			@games_arr.push(@gameObject)
		end
		
		# we create a hash for our JSON response
		response_hash = Hash.new 
		
		# we set new to false until game is full
		@new = false
		
		# and decrement the game
		games_length = @games_arr.length.to_i - 1
		
		if @gameObject.count == 1
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("yellow", sid))
			response_hash['color'] = "yellow"
		elsif @gameObject.count == 2
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("red", sid))
			response_hash['color'] = "red"
		elsif @gameObject.count == 3
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("blue", sid))
			response_hash['color'] = "blue"
		elsif @gameObject.count == 4
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("green", sid))
			response_hash['color'] = "green"
			# when we have 4 players for our game we reset the gameObject and set count to 0
			@gameObject.started = true;
			@gameObject = nil
			@new = true
		end
		
		# we add the game index and rhe channe sid to the response hash
		response_hash['game_index'] = games_length
		response_hash['sid'] = sid
		# finally we respond with our response hash
		ws.send JSON.generate(response_hash)
		# and set our temporary variables to nil
		response_hash = nil
		sid = nil
		games_length = nil
		new_game_index = nil
	}

    ws.onclose { |close|
    	
    	# puts close
		puts "------- Connection closed -------"
    }

    ws.onmessage { |msg|
       
		json_obj = JSON.parse(msg)
		
		# dice roll event
		if json_obj['dice']
			num = json_obj['number']
			@games_arr[json_obj['game_index'].to_i].show_rolled_number(num)
		end
		
		# highlight position event 
		if json_obj['highlight']
			@games_arr[json_obj['game_index'].to_i].highlight(json_obj['color'], json_obj['piece_index'], json_obj['diceroll'])
			
		end
		
		# piece move event
		if json_obj['move_piece']
			@games_arr[json_obj['game_index'].to_i].move_piece(json_obj['color'], json_obj['piece_index'], json_obj['diceroll'])
			
		end
		
		# swich player event
		if json_obj['switch_player']
			@games_arr[json_obj['game_index'].to_i].switch_player(json_obj['color'])
		end
		
		# computer roll event
		if json_obj['computer_roll']
			
			# we get a reference to the game being played
			game = @games_arr[json_obj['game_index'].to_i]
			
			# we get the computer player
			player = game.get_player_for_color(json_obj['computer_color'])
			
			# we also get the next player
			nextPlayer = game.get_next_player(player.color)
								
			player.allInHome = false
			player.roll_dice()
			puts "---Computer #{player.color}\nrolled: #{player.diceRoll} \n---End"
			
			game.show_rolled_number(player.diceRoll)
			game.handle_computer_roll(player.color, player.diceRoll, nextPlayer.computer)
			
			player.diceRoll = nil
			
		end
		
		# computer has all in home event
		if json_obj['all_in_home']
			
			# we get a reference to the game being played
			game = @games_arr[json_obj['game_index'].to_i]
			
			# we get the computer player
			player = game.get_player_for_color(json_obj['computer_color'])
						
			# we try to get out of home
			result = player.try_to_get_out_of_home()
			game.show_rolled_number(player.diceRoll)
			
			if result
				game.move_piece(player.color, 0, -1)
			else
				game.switch_player(player.color)
			end
					
		end
		
		# no movable pieces event
		if json_obj['no_movable']
			@games_arr[json_obj['game_index'].to_i].no_movable(json_obj['color'])
			
		end
		
		# greyout fields event
		if json_obj['greyout']
			@games_arr[json_obj['game_index'].to_i].greyout(json_obj['color'], json_obj['piece_index'], json_obj['block_index'])
			
		end
		
		# clear fields event
		if json_obj['clear_fields']
			@games_arr[json_obj['game_index'].to_i].clear_fields()
			
		end
		
		# move to goal event
		if json_obj['to_goal']
			@games_arr[json_obj['game_index'].to_i].move_to_goal(json_obj['color'], json_obj['piece_index'], json_obj['num_in_goal'])
			
		end
				
		# setting player names event
		if json_obj['name']
			
			game = @games_arr[json_obj['game_index'].to_i]
			
			if json_obj['color'] == "yellow"
				game.players_arr[0].name = json_obj['name']
			elsif json_obj['color'] == "red"
				game.players_arr[1].name = json_obj['name']
			elsif json_obj['color'] == "blue"
				game.players_arr[2].name = json_obj['name']
			elsif json_obj['color'] == "green"
				game.players_arr[3].name = json_obj['name']
			end
			
			# we now push the new name to the remainding clients
			game.write_names_to_players()
			
			# and finally we check if this game is full
			if json_obj['color'] == "green"
				# if it is we start the game
				game.start_game()
			end
			
		end
		
		# player leave game event
		if json_obj['close']
			puts "--- Closing session \nin game #{json_obj['game_index']} \nfor player with sid #{json_obj['sid']} ---End"
			@games_arr[json_obj['game_index'].to_i].remove_player(json_obj['sid'].to_i)
		end
   }
  end
}

