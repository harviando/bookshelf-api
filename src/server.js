const http = require('http');

const port = 9000;
const host = 'localhost';

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    response.statusCode = 200;
    response.end('<h1>Halo HTTP Server!</h1>');
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on port: ${port}`);
})