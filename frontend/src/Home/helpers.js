import json from './data';

/**
 * @typedef Transaction
 * @property {number} id
 * @property {Date} date
 * @property {number} amount
 * @property {string} vendor 
 * 
 * @returns {Promise<Transaction[]>} result
 * 
 * returns an array of Transactions
 * (you can ignore the implementation and simply call the function from your component)
 */
export async function getTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(json), 2_000);
  })
}