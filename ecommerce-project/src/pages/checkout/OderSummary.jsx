import dayjs from 'dayjs';
import axios from 'axios';
import { formantMoney } from '../../utils/money.js';
import { DeliveryOptions } from './DeliveryOptions.jsx';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                });

                const deleteCartItem = async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`);
                    await loadCart();
                }

                const updateCartItem = async () => {
                    const newQuantity = prompt('Zadajte nové množstvo:', cartItem.quantity);

                    if (newQuantity !== null && !isNaN(newQuantity)) {
                        try {
                            const quantityNumber = Number(newQuantity);
                           
                            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                quantity: quantityNumber
                            });
                            
                            console.log('Úspešne aktualizované, načítavam košík...');
                            await loadCart(); // Toto prekreslí UI

                        } catch (error) {
                            console.error('Chyba pri komunikácii so serverom:', error.response?.data || error.message);
                            alert('Chyba: ' + (error.response?.data?.message || 'Server neodpovedá'));
                        }
                    }
                };

                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption?.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formantMoney(cartItem.product.priceCents)}
                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}