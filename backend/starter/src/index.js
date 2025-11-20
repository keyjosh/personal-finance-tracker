const fs = require('fs').promises; // Use promises for async file operations
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

let transactions = require('../data/transactions.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transactionsFilePath = path.join(__dirname, '../data/transactions.json');

app.get('/', (req, res) => {
  res.json({ msg: 'hello world!' })
});

async function readTransactions() {
    try {
        const data = await fs.readFile(transactionsFilePath, 'utf8');
        transactions = JSON.parse(data);
        return transactions;
    } catch (readError) {
        // If the file doesn't exist or is empty, start with an empty array
        if (readError.code === 'ENOENT' || readError instanceof SyntaxError) {
            return [];
        } else {
            throw readError; // Re-throw other errors
        }
    }
}

app.post('/transactions/add', async (req, res) => {
    const newTransactions = req.body.transactions
    if (!newTransactions || !Array.isArray(newTransactions)) {
        return res.status(400).json({ error: 'Invalid request body. Expected an array of transactions under "transactions" key.' });
    }
    // Add ids to the transactions
    let newTxnsWithIds = [];

    try {
        // Read existing transactions from the file
        let existingTransactions = await readTransactions();

        let id = existingTransactions.length;
        newTransactions.map((txn) => {
            txn["id"] = id;
            newTxnsWithIds = [...newTxnsWithIds, txn]
            id = id + 1;
        });
        // Append new transactions
        const updatedTransactions = [...existingTransactions, ...newTxnsWithIds];

        // Write the updated transactions back to the file
        await fs.writeFile(transactionsFilePath, JSON.stringify(updatedTransactions, null, 2), 'utf8');
        transactions = updatedTransactions;

        res.status(201).json({ message: 'Transactions added successfully.', data: JSON.stringify(newTxnsWithIds) });
    } catch (error) {
        console.error('Error processing transactions:', error);
        res.status(500).json({ error: 'Failed to add transactions.' });
    }
});

app.post('/transactions/delete', async (req, res) => {
    const deleteTransactionId = req.body.transactionId
    if (deleteTransactionId < 0) {
        return res.status(400).json({ error: 'Invalid request body. Expected a single transactionId under "transactionId" key.' });
    }

    try {
        // Read existing transactions from the file
        let existingTransactions = await readTransactions();
        // Delete transaction
        const updatedTransactions = existingTransactions.filter(txn => txn.id != deleteTransactionId);

        // Write the updated transactions back to the file
        await fs.writeFile(transactionsFilePath, JSON.stringify(updatedTransactions, null, 2), 'utf8');
        transactions = updatedTransactions;

        res.status(201).json({ message: `Transaction with id ${deleteTransactionId} deleted successfully.`, data: null });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Failed to delete transaction.' });
    }
});

app.get('/transactions', (req, res) => {
  const sortBy = req.query.sortBy; // Access the 'sortBy' query parameter
  const sortDirection = req.query.sortDirection; // Access the 'sortDirection' query parameter
  let sortedTransactions = [...transactions]; // Create a copy to avoid modifying the original array

  if (sortBy) {
    if (sortBy === 'vendor') {
      sortedTransactions = sortedTransactions.sort((a, b) => {
          if (sortDirection === 'asc') {
              return a.vendor.localeCompare(b.vendor)
          } else {
              return b.vendor.localeCompare(a.vendor)
          }
      });
    }
    else if (sortBy === 'date') {
      sortedTransactions = sortedTransactions.sort((a, b) => {
          if (sortDirection === 'asc') {
              return new Date(a.date) - new Date(b.date)
          } else {
              return new Date(b.date) - new Date(a.date)
          }
      });
    }
    else if (sortBy === 'amount') {
      sortedTransactions = sortedTransactions.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.amount - b.amount;
          } else {
            return b.amount - a.amount;
          }
      });
    }
  }
  res.json(sortedTransactions);
});

app.listen(port, () => {
  console.log(`BudgIt starter app listening on port ${port}`);
});
