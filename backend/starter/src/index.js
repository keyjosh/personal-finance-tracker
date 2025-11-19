const transactions = require('../data/transactions.json');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ msg: 'hello world!' })
});

app.get('/transactions', (req, res) => {
  const sortBy = req.query.sortBy; // Access the 'sortBy' query parameter
  const sortDirection = req.query.sortDirection; // Access the 'sortDirection' query parameter
  let sortedTransactions = [...transactions]; // Create a copy to avoid modifying the original array

  if (sortBy) {
    // Implement your sorting logic here based on the 'sortBy' value
    // For example, if transactions are objects with a 'date' property:
    if (sortBy === 'date') {
      sortedTransactions = sortedTransactions.sort((a, b) => {
          if (sortDirection === 'asc') {
              return new Date(a.date) - new Date(b.date)
          } else {
              return new Date(b.date) - new Date(a.date)
          }
      });
    }
    // Add more sorting conditions for other columns if needed
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
