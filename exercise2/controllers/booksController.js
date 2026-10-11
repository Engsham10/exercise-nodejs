const Book = require('../models/Books');

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  const saved = await book.save();
  res.status(201).json(saved);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated document
    );
    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// DELETE a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    res.send(`Book with id ${id} deleted`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};