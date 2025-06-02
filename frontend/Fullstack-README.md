# BudgIt! - Personal Finance Tracker 💸

## FullStack

We are creating an app to track personal finances. We've built some of it but need your help to complete it!

Try to add as many features as possible and walk us through your process. We do **not** expect you to complete all of them. For any features not implemented, briefly explain how you would approach them.

## Features

1. Spin up a server and create a REST endpoint that serves all transactions.
    - Transactions can be loaded by importing the `data/transactions.json` file provided in the `backend` directory.
    - Endpoint: `GET /transactions`.
    - Tip: you can use the included `backend/starter/src/index.js` starter file, or create a new server using any framework or language of your choosing.
2. Show all transactions in the transactions table
    - Fetch transactions from the server and render them.
    - Formatting:
      - Add a "$" sign in front of every amount
      - Positive amount numbers should be shown in green, and negative numbers in red
      - The font family for amounts should be `monospace` and have use a bold font weight
    - Show the total amount in the table footer
3. Sort transaction by Date or Amount (mutually exclusive) through some UI controls of your choosing.
    - The sort operation should happen server-side


## Open Questions

1. How would you implement pagination?
2. How would you implement deleting specific transaction?
3. How would you implement creating a new transaction?
4. Is there anything in your code you would change before pushing to production?
5. Would you include any npm libraries in here? if so, which and why?
6. How would you test this app?


---

## About the starter project
**Frontend:**
- This app uses React 18 and plain JS.
- Styling is implemented via CSS modules. All the necessary classes are already provided for you, but some amount of new CSS code will need to be added!

**Backend**
- The **optional** starter server template uses Express.js and is pre-configured to handle JSON data.