
const http = require('http');
const path = require('path');
const fs = require('fs');

const HTTP_PORT = 80;
const valid_resources = [
   'planets',
   'exoplanets'
];

async function fetchIndex(resource_name) {
   return new Promise((resolve, reject) => {
      var file_path = path.resolve(__dirname, './data');
      file_path += `/${resource_name}.json`;
      if(!valid_resources.includes(resource_name)) {
         reject({ statusCode: 404, message: 'Invalid resource.'});
      } else {
         fs.readFile(file_path, 'utf8', (err, data) => {
            resolve(data);
         });
      }
   });
}

async function fetchItem(resource_name, item_id) {
   return new Promise((resolve, reject) => {
      if(!valid_resources.includes(resource_name)) {
         reject({ statusCode: 404, message: 'Invalid resource type'});
      } else {
         fetchIndex(resource_name)
         .then((data) => {
            const item_found = JSON.parse(data).find(item => item.id == item_id);
            if(item_found) resolve(item_found)
            else reject({
               statusCode: 404,
               message: `${resource_name} ${item_id} not found.`
            });
         })
         .catch(() => {
            reject({
               statusCode: 500,
               message: 'Error fetching data.'
            });
         })
      };
   })
}

const server = http.createServer((req, res) => {

   const url_part = req.url.split('/');
   
   if(url_part.length === 2) {
      //requesting resource index
      fetchIndex(url_part[1])
         .then((data) => {
            res.end(data);
         })
         .catch((error) => {
            res.writeHead(error.statusCode, { content: 'text/html' });
            res.end(error.message);
         });
   }
   else if(url_part.length === 3) {
      //requesting a specific resource
      fetchItem(url_part[1], url_part[2])
         .then((data) => {
            if(data) {
               res.writeHead(200, { content: 'application/json' });
               res.end(JSON.stringify(data));
            } else {
               res.statusCode = 404;
               res.end();
            }
         })
         .catch((error) => {
            res.writeHead(error.statusCode, { content: 'text/html' });
            res.end(error.message);
         });
   }
   else {
      res.statusCode = 400;
      res.end({ 'message': 'Bad request. Use {resource_name}/{id} format.' });
   }
});

server.listen(HTTP_PORT, () => {
   console.log(`Listening for http requests on port ${HTTP_PORT}`);
});