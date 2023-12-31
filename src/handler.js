/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const books = require('./books');

const indexHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        message: 'Welcome to bookshelf API! for details please visit https://github.com/harviando/bookshelf-api',
        author: 'muhammad harviando - 2023'
    });
    response.code(200);
    return response;
};

const addBookHandler = (request, h) => {
    const { name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
    } = request.payload;

    // payload check
    if (!name || name.trim().length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // payload processing
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        messgae: 'Gagal menambahkan buku',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    if (books.length <= 0) {
        const response = h.response({
            status: 'success',
            message: 'There is no books to show. Try adding some books first.',
        });
        response.code(200);
        return response;
    }

    // Dapatkan query parameters dari request
    const { name, reading, finished } = request.query;

    if (name !== undefined || reading !== undefined || finished !== undefined) {
        // Filter books berdasarkan query parameters
        let nameFilteredBooks = books;
        let readingFilteredBooks = books;
        let finishedFilteredBooks = books;
        let resultBooks = [];

        if (name) {
            // Filter berdasarkan nama secara case-insensitive
            nameFilteredBooks = nameFilteredBooks.filter((book) =>
                book.name.toLowerCase().includes(name.toLowerCase()));
            resultBooks.push(...nameFilteredBooks);
        }

        if (reading === '0') {
            // Filter buku yang sedang tidak dibaca
            readingFilteredBooks = readingFilteredBooks.filter((book) => !book.reading);
            resultBooks.push(...readingFilteredBooks);
        } else if (reading === '1') {
            // Filter buku yang sedang dibaca
            readingFilteredBooks = readingFilteredBooks.filter((book) => book.reading);
            resultBooks.push(...readingFilteredBooks);
        }

        if (finished === '0') {
            // Filter buku yang belum selesai dibaca
            finishedFilteredBooks = finishedFilteredBooks.filter((book) => !book.finished);
            resultBooks.push(...finishedFilteredBooks);
        } else if (finished === '1') {
            // Filter buku yang sudah selesai dibaca
            finishedFilteredBooks = finishedFilteredBooks.filter((book) => book.finished);
            resultBooks.push(...finishedFilteredBooks);
        }

        if (resultBooks.length <= 0) {
            const response = h.response({
                status: 'success',
                message: 'There is no books to show. Try adding some books first.',
            });
            response.code(200);
            return response;
        }

        // Transform filteredBooks menjadi format yang diinginkan
        const formattedBooks = resultBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));

        return h.response({
            status: 'success',
            data: {
                books: formattedBooks,
            },
        });
    }

    // Transform filteredBooks menjadi format yang diinginkan
    const formattedBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return h.response({
        status: 'success',
        data: {
            books: formattedBooks,
        },
    });
};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const { name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // Payload checking
    if (!name || name.trim().length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const updatedAt = new Date().toISOString();

    const { id } = request.params;

    // Searching the book that need updating
    const bookIndex = books.findIndex((book) => book.id === id);

    // Changing the book's values
    if (bookIndex !== -1) {
        books[bookIndex] = {
            ...books[bookIndex],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished: pageCount === readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    indexHandler,
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};