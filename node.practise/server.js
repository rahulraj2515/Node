

const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const port = 5000;

server.listen(port,() =>console.log(`server listening on port ${port}`));

