import Card from '../Card/Card';
import styles from './TransactionForm.module.css';

export default function TransactionForm() {
  return (
    <Card>
      <h2>New Transaction</h2>
      <form onSubmit={e => e.preventDefault()}>
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
              onClick={() => { }}
            >Add</button>
          </div>

        </div>
      </form>


    </Card>
  )
}