const http = require('http');
const app = require('./app');

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || '4000';
app.set('port', PORT);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT, () => console.log(`Listening on port ${app.get('port')}`));
