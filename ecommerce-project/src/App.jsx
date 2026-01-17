import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/Checkout-Page'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'
import { use } from 'react'
import { OrdersPage } from './pages/orders/OrdersPage'

function App() {
   const [cart, setCart] = useState([]);

   const loadCart = async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    } catch (error) {
      console.error('Chyba pri načítaní košíka:', error);
    }
  };

   useEffect(() => {
  loadCart();
}, []);

   

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
    
  )
}

export default App
