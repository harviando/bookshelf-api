const addBookHandler = (request, h) => {
    const { title, author, body } = request.payload;
};

module.exports = { addBookHandler };