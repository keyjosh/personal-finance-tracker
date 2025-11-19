import styles from './Home.module.css';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import { TransactionsDataProvider } from '../contexts/TransactionsDataContext.jsx';

export default function Home() {
  return (
    <TransactionsDataProvider>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1>Personal Finance Tracker</h1>
            <TransactionForm />
            <TransactionsTable />
          </main>
        </div>
    </TransactionsDataProvider>
  )
}