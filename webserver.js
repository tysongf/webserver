const http = require('http');

const HTTP_PORT = 3000;

const server = http.createServer((req, res) => {

   res.writeHead(200, { content: 'application/json' });
   let json_response = { 'message': 'Resource not found.' };

   switch(req.url) {
      case '/planets':
         json_response = {
            planets: [
               { id: 1, name: 'Mercury' },
               { id: 2, name: 'Venus' },
               { id: 3, name: 'Earth' },
               { id: 4, name: 'Mars' },
               { id: 5, name: 'Jupiter' },
               { id: 6, name: 'Saturn' },
               { id: 7, name: 'Uranus' },
               { id: 8, name: 'Neptune' }
            ]
         };
      break;
      case '/exoplanets':
         json_response = {
            planets: [
               { id: 1, name: 'Kepler-22b' },
               { id: 2, name: 'Kepler-442b' },
               { id: 3, name: 'Kepler-1652b' },
               { id: 4, name: 'Kepler-1410b' },
               { id: 5, name: 'Kepler-296f' },
               { id: 6, name: 'Kepler-296e' },
               { id: 7, name: 'Kepler-1649b' },
               { id: 8, name: 'Kepler-62f' }
            ]
         }
      break;
      default:
         res.statusCode = 404;
   }

   res.end(JSON.stringify(json_response));

   
});

server.listen(HTTP_PORT, () => {
   console.log(`Listening on port ${HTTP_PORT}`);
});