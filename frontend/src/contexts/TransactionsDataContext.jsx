import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const TransactionsDataContext = createContext({
  transactionsData: null,
  isLoading: false,
  error: null,
  refetchData: () => {},
  addTransactions: (newTransactions) => {}
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
      setTransactionsData([...result]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

    const addTransactions = useCallback(async (addedTransactions) => {
          let apiUrl = 'http://localhost:3000/transactions/add';
          fetch(apiUrl, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
              'Content-Type': 'application/json' // Indicate that the body contains JSON data
            },
            body: JSON.stringify(addedTransactions) // Convert the JavaScript object to a JSON string
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response from the server
          })
          .then(data => {
                let newTransactions = JSON.parse(data.data);
                setTransactionsData((prevTransactions) => {
                    if (!prevTransactions) {
                      return [...newTransactions];
                    }
                    return [...prevTransactions, ...newTransactions];
              })
          })
          .catch(error => {
            console.error('Error:', error);
            alert(`Error: ${error}`);
          });
        }, []);

  const refetchData = useCallback((updatedSortDetails = null) => {
    fetchTransactions(updatedSortDetails);
  }, []);

  useEffect(() => {
    fetchTransactions(sortDetails);
  }, []);

  const value = { transactionsData, isLoading, error, refetchData, addTransactions };

  return (
    <TransactionsDataContext.Provider value={value}>
      {children}
    </TransactionsDataContext.Provider>
  );
};
