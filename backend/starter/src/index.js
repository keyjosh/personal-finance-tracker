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

app.listen(port, () => {
  console.log(`BudgIt starter app listening on port ${port}`);
});