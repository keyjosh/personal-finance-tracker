import styles from './Home.module.css';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import TransactionForm from '../components/TransactionForm/TransactionForm';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>BudgIt! Personal Finance Tracker</h1>
        <TransactionForm />
        <TransactionsTable />
      </main>
    </div>
  )
}