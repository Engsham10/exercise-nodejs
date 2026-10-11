const express = require('express');
const router = express.Router();
const { getBooks, createBook,deleteBook,updateBook  } = require('../controllers/booksController');

router.get('/', getBooks);
router.post('/create', createBook);
router.put('/:id', updateBook);     // 🔄 Update
router.delete('/:id', deleteBook);  // 🗑️ Delete

module.exports = router;
