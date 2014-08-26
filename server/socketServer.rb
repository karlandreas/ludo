#!/usr/bin/env ruby
require 'em-websocket'

class Ludo
	
	def create_new_game
	
	end
	
	def join_game
		# search through game files
		
		# if the game is not full
		
		# join game
		
		# else create new game file
	end
end

EM.run {
  EM::WebSocket.run(:host => "0.0.0.0", :port => 5301) do |ws|
    
    ws.onopen { |handshake|
              puts "WebSocket connection open"

              # create an instance of the Ludo object
              
              # path, query_string, origin, headers

              # Publish message to the client
              ws.send "Hello Client, you connected to #{handshake.path}"
            }

    ws.onclose { puts "Connection closed" }

    ws.onmessage { |msg|
              puts "Recieved message: #{msg}"
              ws.send "Pong: #{msg}"
            }
  end
}

