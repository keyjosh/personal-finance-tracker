import Card from '../Card/Card';
import styles from './TransactionForm.module.css';
import { useDataQuery } from '../../contexts/TransactionsDataContext.jsx';

export default function TransactionForm() {
    const { transactionsData, isLoading, error, refetchData, addTransactions } = useDataQuery();

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Access input values from the form's elements
        const formData = {
          'date': e.target.elements.date.value,
          'vendor': e.target.elements.vendor.value,
          'amount': parseFloat(e.target.elements.amount.value), // Parse amount as a number
        };

        addTransactions({'transactions':[formData]});
      };

  return (
    <Card>
      <h2>New Transaction</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formRow}>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="date">Date</label>
            <input
              className={styles.input}
              type="datetime-local"
              name='date'
              id='date'
              max={new Date().toISOString().split('.')[0]}
              required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="vendor">Vendor</label>
            <input className={styles.input} type="text" name='vendor' id='vendor' required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="amount">Amount</label>
            <input className={styles.input} type="number" name='amount' id='amount' required />
          </div>

          <div className={styles.formGroup}>
            <button
              className={styles.button}
              type="submit"
            >Add</button>
          </div>

        </div>
      </form>


    </Card>
  )
}