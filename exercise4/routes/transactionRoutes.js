import express from 'express';

import {
  createTransaction,
  getMyTransactions,
  getMonthlySummary,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';

import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateZod.js';
import { transactionValidationSchema } from '../schemas/TransactionSchema.js';
const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new income or expense transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: -50
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2025-05-27'
 *     responses:
 *       201:
 *         description: Transaction created
 */

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly income and expense summary by category
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly financial summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSpent:
 *                   type: number
 *                   example: 150
 *                 totalEarned:
 *                   type: number
 *                   example: 1200
 *                 balance:
 *                   type: number
 *                   example: 1050
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [income, expense]
 *                       category:
 *                         type: string
 *                       total:
 *                         type: number
 */

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Weekly Groceries
 *               amount:
 *                 type: number
 *                 example: -65
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: '2025-05-28'
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */

router.post('/', validate(transactionValidationSchema), createTransaction);

// Put this route before /:id routes
router.get('/monthly-summary', getMonthlySummary);

router.get('/', getMyTransactions);

router.put('/:id', validate(transactionValidationSchema), updateTransaction);

router.delete('/:id', deleteTransaction);

export default router;