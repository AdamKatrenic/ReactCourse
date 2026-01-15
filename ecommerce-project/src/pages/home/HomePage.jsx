import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx';
import { ProductsGrid } from '../home/ProductsGrid.jsx';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Nepodarilo sa načítať produkty');
        console.error(err);
      }
    };

    getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        {error ? <p>{error}</p> : <ProductsGrid products={products} />}
      </div>
    </>
  );
}
