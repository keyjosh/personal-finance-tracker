import React, { useCallback, useEffect, useState } from 'react';
import Card from '../Card/Card';
import styles from './TransactionsTable.module.css';
import classNames from 'classnames';
import { useDataQuery } from '../../contexts/TransactionsDataContext.jsx';

export default function TransactionTable() {
  const [sortDetails, setSortDetails] = useState({ column: 'date', direction: 'asc' });
  const [transactions, setTransactions] = useState(null);
  const { transactionsData, isLoading, error, refetchData, addTransactions, deleteTransaction } = useDataQuery();
  const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const handleSort = (columnName) => {
        setSortDetails((prevDetails) => {
          if (prevDetails.column === columnName) {
            // Toggle direction if same column clicked again
            return {
              column: columnName,
              direction: prevDetails.direction === 'asc' ? 'desc' : 'asc',
            };
          } else {
            // New column clicked, set to ascending
            return { column: columnName, direction: 'asc' };
          }
        });
      };

    function sort(transactionsList, sortDetails) {
      if (transactionsList == null) return null;
      let sortedTransactions = [...transactionsList];
      if (sortDetails != null && sortDetails.sortBy != null) {
        if (sortDetails.sortBy === 'vendor') {
          sortedTransactions = sortedTransactions.sort((a, b) => {
              if (sortDetails.sortDirection === 'asc') {
                  return a.vendor.localeCompare(b.vendor)
              } else {
                  return b.vendor.localeCompare(a.vendor)
              }
          });
        }
        else if (sortDetails.sortBy === 'date') {
          sortedTransactions = sortedTransactions.sort((a, b) => {
              if (sortDetails.sortDirection === 'asc') {
                  return new Date(a.date) - new Date(b.date)
              } else {
                  return new Date(b.date) - new Date(a.date)
              }
          });
        }
        else if (sortDetails.sortBy === 'amount') {
          sortedTransactions = sortedTransactions.sort((a, b) => {
              if (sortDetails.sortDirection === 'asc') {
                return a.amount - b.amount;
              } else {
                return b.amount - a.amount;
              }
          });
        }
      }
      return sortedTransactions;
    }

    useEffect(() => {
        if (sortDetails == null) {
            setTransactions(transactionsData);
        } else {
            setTransactions(sort(transactionsData, sortDetails));
        }
    }, [transactionsData]);

      useEffect(() => {
        refetchData(sortDetails);
      }, [sortDetails]);

      useEffect(() => {
        refetchData();
      }, []); // The empty dependency array ensures this effect runs only once after the initial render

      if (isLoading) {
        return <div style={{ color: 'green' }}>Loading data...</div>;
      }

      if (error) {
        return <div style={{ color: 'red' }}>Error: {error.message}</div>;
      }

    let total = 0;
    if (transactions) {
        total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    }
    const totalClassName = `${styles['amountBase']} ${
      total >= 0 ? styles['positiveNumber'] : styles['negativeNumber']
    }`

    const handleDeleteRow = (e) => {
        let id = e.target.closest('tr').cells[0].textContent
        deleteTransaction(id);
        refetchData(sortDetails);
    }

    // Determine the class name based on the transaction amount
    const tableBody = transactions && transactions.length > 0 ? (
        transactions.map((transaction) => {
            const amountClassName = `${styles['amountBase']} ${
              transaction.amount >= 0 ? styles['positiveNumber'] : styles['negativeNumber']
            }`
            return (
                <tr key={transaction.id} className={styles.tableRow}>
                    <td>{transaction.id}</td>
                    <td>{transaction.vendor}</td>
                    <td>{transaction.date}</td>
                    <td className={amountClassName}>${formatter.format(transaction.amount)}</td>
                    <td>
                        <button className={styles.transparentButton} onClick={handleDeleteRow}>🗑</button>
                    </td>
                </tr>
            );
        })
    ) : (
        <tr className={styles.noDataRow}>
            <td colSpan="6" className={styles.noDataCell}>
                No transactions to display.
            </td>
        </tr>
    );

  return (
    <Card>
      <h2>Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope='col' icon='arrow'>Id</th>
            <th scope='col' onClick={() => handleSort('vendor')}>
                Vendor
                {sortDetails.column === 'vendor' && (
                  <span>
                    {sortDetails.direction === 'asc' ? ' 👆' : ' 👇'}
                  </span>
                )}
            </th>
            <th scope='col' onClick={() => handleSort('date')}>
                Date
                {sortDetails.column === 'date' && (
                  <span>
                    {sortDetails.direction === 'asc' ? ' 👆' : ' 👇'}
                  </span>
                )}
            </th>
            <th scope='col' onClick={() => handleSort('amount')}>
                Amount
                {sortDetails.column === 'amount' && (
                  <span>
                    {sortDetails.direction === 'asc' ? ' 👆' : ' 👇'}
                  </span>
                )}
            </th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
        <tfoot>
          <tr>
            <th scope='row' colSpan={3}>Total:</th>
            <td className={totalClassName}>${formatter.format(total)}</td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}
