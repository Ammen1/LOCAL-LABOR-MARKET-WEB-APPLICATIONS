import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashPayment() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://local-labor-market-web-applications.onrender.com/api/v1/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50 bg-gradient-to-b from-slate-100 to-purple-400 via-slate-300 hover:from-teal-600">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Job ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Currency</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="px-4 py-3">{transaction._id}</td>
                <td className="px-4 py-3">{transaction.job.title}</td>
                <td className="px-4 py-3">{transaction.first_name}</td>
                <td className="px-4 py-3">{transaction.currency}</td>
                <td className="px-4 py-3">{transaction.amount}</td>
                <td className="px-4 py-3">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
