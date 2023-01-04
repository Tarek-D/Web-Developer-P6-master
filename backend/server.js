// Sets up an HTTP server using the http module from Node.js. 
const http = require('http');

// Requires the http module and the app module which is to export an express app instance.
const app = require('./app');

// The normalizePort function takes a value as an argument and attempts to interpret it as a port number. 
// If the value is a non-negative number, the function returns it as is. 
// If the value is not a number, the function returns the value as a string. 
// If the value is a negative number, the function returns false. 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// The port variable is set to the value of the PORT environment variable 
// or the default value of 3000, normalized using the normalizePort function. 
// The app's port is then set to this value.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// The errorHandler function takes an error as an argument and handles it appropriately. 
// If the error is not related to the listen event, the error is thrown. 
// Otherwise, the function logs a message to the console 
// and exits the process with a non-zero code, depending on the error code.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

// Creates an HTTP server using the app instance and sets up event listeners 
// for the error and listening events. 
// When the server is listening, it logs a message to the console indicating which port 
// or named pipe the server is running on. 

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// The server is made to listen on the specified port.
server.listen(port);

