const { nanoid } = require('nanoid')
const allBooks = require('./books')

function addNewBookHandler(request, h) {
  const id = nanoid(16);
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if(name === undefined){
    const response = h.response({

      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    })
    response.code(400);
    return response;
  }

  if(readPage > pageCount) {
    const response = h.response({
        "status": "fail",
        "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
    response.code(400);
    return response;
  }
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;


  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  allBooks.push(newBook);

  const success = allBooks.filter((b) => b.id === id ).length > 0

  if (success) {
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

  const response = h.response({
    "status": "error",
    "message": "Buku gagal ditambahkan"
  })
  response.code(500)
  return response;

}

function getBookByIdHandler(request, h) {
  const { id } = request.params;
  const book = allBooks.filter((b) => b.id === id)[0];

  if (book === undefined){
    const response = h.response({
      "status": "fail",
      "message": "Buku tidak ditemukan"
    })
    response.code(404)
    return response
  }
  return {
    status: "success",
    data: {
      book
    }
  }
}

function getAllBooksHandler() {
  const books = [];
  allBooks.forEach(e => {
    books.push({
      "id": e.id,
      "name": e.name,
      "publisher": e.publisher
    })
  });
  return {
    status: 'success',
    data: {
      books
    }
  }
}

function updateBookHandler(request, h) {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const book = allBooks.filter((b) => b.id === id)[0];
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const index = allBooks.findIndex((book) => book.id === id);

  if(name === undefined){
    const response = h.response({

      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    })
    response.code(400);
    return response;
  }

  if(readPage > pageCount) {
    const response = h.response({
        "status": "fail",
        "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    })
    response.code(400);
    return response;
  }

  if (index !== -1){
    book[index] = {
        ...book[index],
      id, name, year, author, summary, publisher, pageCount, readPage,
      finished, reading, updatedAt
    }
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
  })
  response.code(404)
  return response

}

function deleteBookHandler (request, h) {
  const { id } = request.params;
  const index = allBooks.findIndex((book) => book.id === id);
  if (index !== -1){
    allBooks.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
  })
  response.code(404)
  return response
}

module.exports = { addNewBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler }
