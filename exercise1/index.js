
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];

//Get all books
app.get('/books', (req, res) => {
  res.json(books);
});
// Get a single book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('User not found');
  res.json(book);
});
// Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
// Update a book’s title
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('book not found');
  book.title = req.body.title;
  res.json(book);
});
// Delete a book
app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send('book deleted');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
