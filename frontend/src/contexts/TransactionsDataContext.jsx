import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const TransactionsDataContext = createContext({
  transactionsData: null,
  isLoading: false,
  error: null,
  refetchData: () => {}
});

export const useDataQuery = () => useContext(TransactionsDataContext);

export const TransactionsDataProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortDetails, setSortDetails] = useState({ column: 'date', direction: 'asc' });

  const fetchTransactions = useCallback(async (updatedSortDetails = null) => {
    setIsLoading(true);
    setError(null);
    setSortDetails(updatedSortDetails);
    try {
      let url = 'http://localhost:3000/transactions';
      if (updatedSortDetails) {
        url = `http://localhost:3000/transactions?sortBy=${updatedSortDetails.column}&sortDirection=${updatedSortDetails.direction}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setTransactionsData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array as this function only depends on component-level state

  const refetchData = useCallback((updatedSortDetails = null) => {
    fetchTransactions(updatedSortDetails);
  }, []);

  useEffect(() => {
    fetchTransactions(sortDetails);
  }, []);

  const value = { transactionsData, isLoading, error, refetchData };

  return (
    <TransactionsDataContext.Provider value={value}>
      {children}
    </TransactionsDataContext.Provider>
  );
};
