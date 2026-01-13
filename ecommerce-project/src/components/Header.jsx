import { Link } from 'react-router';
import './header.css';

// Pridali sme = [] ako poistku. Ak cart nepríde, automaticky to bude prázdne pole.
export function Header({ cart = [] }) {
    let totalQuantity = 0;

    // Pridaný otáznik (optional chaining) pred .forEach
    // To zabezpečí, že ak by náhodou cart bol null, kód nepadne
    cart?.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo" src="images/logo-white.png" alt="logo" />
                    <img className="mobile-logo" src="images/mobile-logo-white.png" alt="logo" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />
                <button className="search-button">
                    <img className="search-icon" src="images/icons/search-icon.png" alt="search" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" alt="cart" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    );
}