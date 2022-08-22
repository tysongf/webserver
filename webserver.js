const http = require('http');
const { reset } = require('nodemon');

const HTTP_PORT = 3000;

const server = http.createServer((req, res) => {
   res.writeHead(200, { content: 'application/json' });
   res.end(JSON.stringify({ message: 'Hello Web!', port: HTTP_PORT}));
});

server.listen(HTTP_PORT, () => {
   console.log(`Listening on port ${HTTP_PORT}`);
});