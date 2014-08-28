#!/usr/bin/env ruby
require 'em-websocket'
require 'json'

class Game
	
	attr_reader :channel, :index
	attr_accessor :players_arr
	
	def initialize(channel, index)
		@channel = channel
		@players_arr = []
		@index = index
	end
	
	def add_player(player)
		@players_arr.push(player)
	end
	
	def remove_player(sid)
		# we loop through the players in this game
		@players_arr.each do |player|
			# when we find the player to remove we push the color to the other players
			if player.sid == sid
				remove_hash = Hash.new
				remove_hash['remove'] = true
				remove_hash['color'] = player.color
				@channel.push(JSON.generate(remove_hash))
			end
		end
		@channel.unsubscribe(sid)
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
	
	def show_rolled_number(dice)
		# we create a hash to push the dice coords to all players
		dice_hash = Hash.new
		dice_hash['dice'] = true
		dice_hash['number'] = dice['number']
		
		@channel.push(JSON.generate(dice_hash))
	end
	
	def highlight(color, index, diceroll)
		# we create a hash to push piece color index and move-to position
		highlight_hash = Hash.new
		highlight_hash['highlight'] = true
		highlight_hash['color'] = color
		highlight_hash['index'] = index
		highlight_hash['diceroll'] = diceroll
		
		@channel.push(JSON.generate(highlight_hash))
	end
	
	def move_piece(color, index, move_by)
		# we create a hash to push piece color index and move-to position
		piece_hash = Hash.new
		piece_hash['move'] = true
		piece_hash['color'] = color
		piece_hash['index'] = index
		piece_hash['move_by'] = move_by
		
		@channel.push(JSON.generate(piece_hash))
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
	
	attr_accessor :name, :color, :sid
		
	def initialize(color, sid)
		@color = color
		@sid = sid
	end
	
end # end class



# Before we start WebSocket's we make sure that there are no players from a previous session
Dir.foreach("./../server/players/") { | file | 
	if !file.match(/^\.{1,2}$/)
		File.delete("./../server/players/" << file)
	end
}
# and all waiting games
Dir.foreach("./../server/waiting/") { | file | 
	if !file.match(/^\.{1,2}$/)
		File.delete("./../server/waiting/" << file)
	end
}
# and all games
Dir.foreach("./../server/games/") { | file | 
	if !file.match(/^\.{1,2}$/)
		File.delete("./../server/games/" << file)
	end
}

EM.run {
  
  @games_arr = []
  @gameObject = nil
  @count = 0

  EM::WebSocket.start(:host => "0.0.0.0", :port => 5301) do |ws|
    
    ws.onopen { |handshake|
		# path, query_string, origin, headers
		puts "------- NEW client #{handshake.headers['User-Agent']} -------"
		
		# on every 4th player we create a new game
		if @count == 0 && @gameObject == nil
			# we want to store the game-index in the game object
			new_game_index = @games_arr.length.to_i
			@gameObject = Game.new(EM::Channel.new, new_game_index)
			@games_arr.push(@gameObject)
		end
		
		# we create a hash for our JSON response
		response_hash = Hash.new 
		
		# we increment the player color count by one
		@count += 1
		# and decrement the game
		games_length = @games_arr.length.to_i - 1
		
		if @count == 1
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("yellow", sid))
			response_hash['color'] = "yellow"
		elsif @count == 2
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("red", sid))
			response_hash['color'] = "red"
		elsif @count == 3
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("blue", sid))
			response_hash['color'] = "blue"
		elsif @count == 4
			sid = @games_arr[games_length].channel.subscribe { |msg| ws.send msg }
			@games_arr[games_length].add_player(Player.new("green", sid))
			response_hash['color'] = "green"
			# when we have 4 players for our game we reset the gameObject and set count to 0
			@gameObject = nil
			@count = 0
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
		
		# handle dice roll
		if json_obj['dice']
			@games_arr[json_obj['game_index'].to_i].show_rolled_number(json_obj)
		end
		
		# handle position highlight
		if json_obj['highlight']
			@games_arr[json_obj['game_index'].to_i].highlight(json_obj['color'], json_obj['piece_index'], json_obj['diceroll'])
		end
		
		# handle piece move
		if json_obj['move_piece']
			@games_arr[json_obj['game_index'].to_i].move_piece(json_obj['color'], json_obj['piece_index'], json_obj['move_by'])
		end
		
		# handle swich player
		if json_obj['switch']
			@games_arr[json_obj['game_index'].to_i].switch_player(json_obj['color'])
		end
		
		# handle setting player names
		if json_obj['name']
			
			if json_obj['color'] == "yellow"
				@games_arr[json_obj['game_index'].to_i].players_arr[0].name = json_obj['name']
				# puts "Player name set to: " << @games_arr[json_obj['game_index'].to_i].players_arr[0].name
			elsif json_obj['color'] == "red"
				@games_arr[json_obj['game_index'].to_i].players_arr[1].name = json_obj['name']
				# puts "Player name set to: " << @games_arr[json_obj['game_index'].to_i].players_arr[1].name
			elsif json_obj['color'] == "blue"
				@games_arr[json_obj['game_index'].to_i].players_arr[2].name = json_obj['name']
				# puts "Player name set to: " << @games_arr[json_obj['game_index'].to_i].players_arr[2].name
			elsif json_obj['color'] == "green"
				@games_arr[json_obj['game_index'].to_i].players_arr[3].name = json_obj['name']
				# puts "Player name set to: " << @games_arr[json_obj['game_index'].to_i].players_arr[3].name
			end
			
			# we now push the new name to the remainding clients
			@games_arr[json_obj['game_index'].to_i].write_names_to_players()
			
			# and finally we check if this game is full
			if json_obj['color'] == "green"
				# if it is we start the game
				@games_arr[json_obj['game_index'].to_i].start_game()
			end
		end
		
		# handle player close session
		if json_obj['close']
			puts "Closing session in game #{json_obj['game_index']} for player with sid #{json_obj['sid']}"
			@games_arr[json_obj['game_index'].to_i].remove_player(json_obj['sid'].to_i)
		end
   }
  end
}

