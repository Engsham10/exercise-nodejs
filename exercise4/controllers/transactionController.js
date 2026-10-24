import Transaction from '../models/Transactions.js';

export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

export const getMyTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      createdBy: req.user._id
    });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

export const getMonthlySummary = async (req, res, next) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    const summary = await Transaction.aggregate([
      {
        $match: {
          createdBy: req.user._id,
          date: {
            $gte: startOfMonth,
            $lt: startOfNextMonth
          }
        }
      },
      {
        $group: {
          _id: {
            type: '$type',
            category: '$category'
          },
          total: {
            $sum: { $abs: '$amount' }
          }
        }
      },
      {
        $project: {
          _id: 0,
          type: '$_id.type',
          category: '$_id.category',
          total: 1
        }
      }
    ]);

    const totalSpent = summary
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.total, 0);

    const totalEarned = summary
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.total, 0);

    res.json({
      totalSpent,
      totalEarned,
      balance: totalEarned - totalSpent,
      categories: summary
    });
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.json(transaction);
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    next(err);
  }
};