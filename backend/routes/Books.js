const express = require('express');
const { getBooks, addBook, getBookById, updateBookById, deleteBook } = require('../controllers/Books');
const auth = require('../Middleware/Auth');

const router = express.Router();

router.get('/',/* auth(),*/ getBooks);      // accessible by both user and admin
router.post('/', /*auth(['admin']),*/ addBook);  // only admin can add books
router.get('/:id',/* auth(),*/ getBookById);  // accessible by both user and admin
router.put('/:id', /*auth(['admin']),*/updateBookById);  // only admin can update books
router.delete('/:id',/* auth(['admin']),*/deleteBook);  // only admin can delete books

module.exports = router;
