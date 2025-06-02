# BudgIt! - Personal Finance Tracker 💸

## Frontend

We are creating an app to track personal finances. We've built some of it but need your help to complete it!

Try to add as many features as possible and walk us through your process. We do **not** expect you to complete all of them. For any features not implemented, briefly explain how you would approach them.

## Features
1. Load the initial transactions using the `getTransactions()` function provided in the `helpers.js` file.
    - Note: you should not need to modify this file at all, just call the `getTransactions()` function from your component.
2. Show the transactions in the transactions table.
    - Formatting:
      - Add a "$" sign in front of every amount.
      - Amounts should have 2 decimal numbers.
      - The font family for amounts should be `monospace` and have use a bold font weight.
      - Positive amount numbers should be shown in green, and negative numbers in red.
      - Format the date however you consider best - tip: a locale string is a good choice.
    - Show the total amount in the table footer.
3. Wire up the form buttons to create a new transaction.
    - From a UX perspective, what should happen with the form values after submitting? Can you implement it?
4. Add controls to delete a transaction in each row.
5. Sort the table by Date or Amount (mutually exclusive sort).


## Bonus Questions
1. Is there anything in your code you would change before pushing to production?
2. If there were hundreds of transactions (instead of just 15), what would you do differently?
3. Would you include any npm libraries in here? if so, which and why?
4. How would you test this app?


---

## About the starter project
- This app uses React 18 and plain JS.
- Styling is implemented via CSS modules. All the necessary classes are already provided for you, but some amount of new CSS code will need to be added!