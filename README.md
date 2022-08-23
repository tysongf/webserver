# webserver
A basic web server built in node.

Installation and usage:
0. Run 'npm install' in the root project folder
1. Add your JSON files in the data/ folder.
   Note: JSON file must be an array of objects and
   objects must contain an 'id' property
2. Add your data types to the valid_resources array in webserver.js
   resource name must match the name of the json file (without .json)
3. Set the HTTP_PORT in webserver.js to your desired port.
4. Run 'npm start' to initialize the server.
5. Make requests: http://localhost/planets | http://localhost/planets/3
