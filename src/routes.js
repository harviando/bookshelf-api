/* eslint-disable import/no-import-module-exports */
const { addBookHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
];

module.exports = routes;