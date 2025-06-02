import Card from '../Card/Card';
import styles from './TransactionsTable.module.css';
import classNames from 'classnames';

export default function TransactionTable() {
  return (
    <Card>
      <h2>Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Vendor</th>
            <th scope='col'>Date</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              1
            </td>
            <td>
              Pizzeria
            </td>
            <td>{(new Date()).toLocaleString()}</td>
            <td className={classNames(styles.amountBase, {
              [styles.positiveNumber]: false,
              [styles.negativeNumber]: false
            })}>
              20
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope='row' colSpan={3}>Total:</th>
            <td>0</td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}