const { nanoid } = require('nanoid')
const books = require('./books')

function addNewBookHandler(request, h) {
  const id = nanoid(16);
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if(name === null){
    response.code(400);
    return {
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    }
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  books.push(newBook);

  if (books.filter((b) => { b.id === id }).length > 0) {
      const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
              bookId: id
          }
      });
      response.code(201);
      return response;
  }
  return {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
        bookId: id
    }
  }

}

function getBookByIdHandler(request, h) {
  const formattedBooks = [];
  books.forEach(e => {
    formattedBooks.push({
      "id": e.id,
      "name": e.name,
      "publisher": e.publisher
    })
  });
  return {
    status: 'success',
    data: {
      formattedBooks
    }
  }
}

function getAllBooksHandler() {
  return {
    status: 'success',
    data: {
      books
    }
  }
}

module.exports = { addNewBookHandler, getAllBooksHandler, getBookByIdHandler }
