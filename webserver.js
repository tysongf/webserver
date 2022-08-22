const http = require('http');
const { reset } = require('nodemon');

const server = http.createServer((req, res) => {
   res.writeHead(200, { content: 'text/plain' });
   res.end('Hello Web!');
});

server.listen(80);