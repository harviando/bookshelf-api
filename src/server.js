const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();

    console.log(`Server is running on port ${server.info.uri}`);
};

init();