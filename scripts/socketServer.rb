#!/usr/bin/env ruby
require 'em-websocket'

class Game
	
	attr_reader :waiting_games_path, :waiting_game_file, :line_num
	
	def initialize
		@waiting_games_path = "./../server/waiting/"
	end
	
	def search_for_waiting_game(ip)
		
		@result = 0
		
		# we get a sorted array of the files in the server directory
		files_string = %x(ls #{@waiting_games_path})
		files = files_string.split(" ")
		
		# we log out the number of waiting games
		puts "Number of waiting games: " << files.length.to_s
		
		# if there are any waiting game files there
		if files.length.to_i > 0
			
			# we get the full path to the first file
			@waiting_game_file = @waiting_games_path << files[0].to_s
			puts "Waiting game file" << files[0].to_s
			
			# we get the line count of the file
			tmp_count = %x(wc -l #{@waiting_game_file})
			count = tmp_count[0,1]
			
			# and log it out
			puts "Waiting game has " << (count.to_i + 1).to_s << " Players in it"
			
			# we return the number of lines (players) in the waiting game file
			@result = count.to_i
		# else if there are no waiting games	
		else 
			# we create a new waiting game file
			@waiting_game_file = @waiting_games_path << "1_game.json"
			puts "New Waiting game file: " << @waiting_game_file
			File.new(@waiting_game_file, mode='w') 
		end
		
		return @result
	end
	
	def join_game(count, player)
		
		@line_num = count.to_i + 1
		
		puts "Joining Game with count: " << @line_num.to_s << " and id: " << player.id.to_s
		
		# we set the player's color
		if @line_num == 1
			player.color = "yellow"
		elsif @line_num == 2
			player.color = "red"
		elsif @line_num == 3
			player.color = "blue"
		elsif @line_num == 4
			player.color = "green"
		end
		# and update the player's file
		player.write_properties_to_file()
		
		# we want to add our player to the waiting game file
		File.open(@waiting_game_file, mode="a") {|file|
			file.write(@line_num.to_s << " " << player.id.to_s << "\n")
		}
		
		# if the waiting game is full (4 players) we want to create the game
		if (count.to_i + 1) == 4
			create_new_game()
		end
	end
	
	def leave_waiting_game
		puts "Leaving waiting game file: " << @line_num.to_s
		%x(sed -i -e '#{@line_num}d' #{waiting_game_file})
	end
	
	def create_new_game
		# we want to move our game file from the waiting folder into the games folder
		%x(mv #{@waiting_game_file} ./../server/games)
		puts "------ Game Created -----"
	end
	
end # end class

class Player
	
	attr_reader :id, :players_path, :file, :connection
	attr_accessor :name, :color, :active
		
	def initialize(ip, ws)
		@connection = ws
		@players_path = "./../server/players/"
		@name = "undefined"
		@color = nil
		@active = false
		@id = ip
		
		files_string = %x(ls #{@players_path})
		files = files_string.split(" ")
		puts "Number of players: " << (files.length.to_i + 1).to_s
		
		@id = ip
		@file = "#{@players_path}#{(files.length.to_i + 1).to_s}_#{ip}.json"
		File.new(@file, mode='w') 
	end
	
	def write_properties_to_file
		File.open(@file, 'w') {|file| 
			file.write("user = {'id'\t: #{@id},\n\t'name'\t: #{@name},\n\t'color' : #{@color},\n\t'active': #{@active},\n\t'file'  : #{@file}}\n")
		}
	end
	
	def delete_file
		puts "Deleting file: " << @file
		File.delete(@file)
	end
	
end


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
  EM::WebSocket.run(:host => "0.0.0.0", :port => 5301) do |ws|
    
    ws.onopen { |handshake|
		# path, query_string, origin, headers
		puts "------- NEW client #{handshake.headers['User-Agent']} -------"
		
		# create an instance of the Ludo object
		@gameObject = Game.new
		
		# Publish message to the client
		ws.send "Success!"
	}

    ws.onclose { 
    	puts "------- Connection closed -------"
    	@player.delete_file()
    	@gameObject.leave_waiting_game()
    }

    ws.onmessage { |msg|
                 
		if msg.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)
			# puts "Recieved message: #{msg}"
			
			@player = Player.new(msg, ws)			
			@result = @gameObject.search_for_waiting_game(msg)
			
			# if there is waiting game file (> 0) 
			if @result < 4
				@gameObject.join_game(@result, @player)
			elsif @result == 4
				@gameObject.join_game(@result, @player)
				@gameObject.create_new_game()
			end
			
			ws.send @player.color
			
		elsif msg.match(/^name:/)
			
			# we first remove the first 5 characters of the message (destructively!)
			msg.slice!(0, 5)
			# we then try to set the player name 
			@player.name = msg
			@player.write_properties_to_file()
			ws.send "Waiting"
		# if we are not passed an IP we send an error message
		else
			puts "Could not get IP of client"
			ws.send "No client ID was sendt"
		end
   }
  end
}

