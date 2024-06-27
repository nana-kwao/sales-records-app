import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesReport from './SalesReport'; // Import the SalesReport component

function Sales() {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ item: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/sales', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSales(response.data);
    } catch (error) {
      setError('Failed to fetch sales: ' + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSale = async (e) => {
    e.preventDefault();
    if (!newSale.item || !newSale.amount) {
      setError('Item and Amount are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(
        '/api/sales',
        newSale,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSales([...sales, response.data]);
      setNewSale({ item: '', amount: '' });
    } catch (error) {
      setError('Failed to add sale: ' + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Sales Records</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleAddSale}>
        <div>
          <label>Item:</label>
          <input
            type="text"
            value={newSale.item}
            onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={newSale.amount}
            onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Sale...' : 'Add Sale'}
        </button>
      </form>
      {loading ? (
        <p>Loading sales...</p>
      ) : (
        <ul>
          {sales.map((sale) => (
            <li key={sale._id}>
              {sale.item}: ${sale.amount}
            </li>
          ))}
        </ul>
      )}
      <SalesReport sales={sales} /> {}
    </div>
  );
}

export default Sales;
