var connection = new WebSocket('ws://mserve.kajohansen.com:5301');

connection.onopen = function () {
  
  // Determining accepted extensions
  console.log(connection.extensions);
  
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};


