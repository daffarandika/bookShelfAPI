const { addNewBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler')
const routes = [
  {
    method:  'POST',
    path: '/books',
    handler: addNewBookHandler
  },
  {
    method:  'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method:  'GET',
    path: '/books/1',
    handler: getBookByIdHandler
  },
]

module.exports = routes;
