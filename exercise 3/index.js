
import express from 'express';


import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
//from routes
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
// from middlewares
import { logger } from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cors({
  origin: 'http://localhost:5000',
}));
// parse json body
app.use(express.json());

app.use(morgan('dev'));



// routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
// middleware to log requests
app.use(logger);
// last route to handle 404 errors for undefined routes

app.use(notFound);
// global error handler
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});










// // Sample in-memory data
// let users = [
//   { id: 1, name: 'Ayaan' },
//   { id: 2, name: 'Fatima' },
//   { id: 3, name: 'Zubeyr' }
// ];
// //Create/post
// app.post('/users', (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });
// //GEt all users
// app.get('/users', (req, res) => {
//   res.json(users);
// });
// // get one user
// app.get('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (!user) return res.status(404).send('User not found');
//   res.json(user);
// });
// // update users
// app.put('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (!user) return res.status(404).send('User not found');
//   user.name = req.body.name;
//   res.json(user);
// });
// // delete one user
// app.delete('/users/:id', (req, res) => {
//   users = users.filter(u => u.id != req.params.id);
//   res.send('User deleted');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
