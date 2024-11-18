import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Cart.css";

function Cart({ cart, removeFromCart}) {
  const cartItems = Object.values(cart.items);
  const navigate = useNavigate();
  const wiggle = useSelector((state) => state.cart.wiggle);

  const handleCheckout = async () => {
    navigate("/checkout");
  };

  return (
    <div
    className="cart-container"
    wiggle={wiggle}
    >
      <h3>Shopping Cart</h3>
      <ul className="cart-items-cart">
        {cartItems.map((item) => (
          <li key={item.productId} className="cart-item-cart">
            <p>
              {item.productName} <br></br>{" "}
              <span>
                ${item.price} x {item.quantity} USD
              </span>
            </p>
            <button
              onClick={() => removeFromCart(item.productId)}
              className="cart-item-remove"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <ul className="cart-items-cart">
        <li className="cart-subtotal">
          <p>subtotal:</p>
          <p>
            {cart.subtotal}
            <span> USD</span>
          </p>
        </li>
        <p className="cart-notes">taxes calculated at checkout</p>
        <p className="ship-to">
          ship to <span>United States</span>
        </p>
      </ul>
      <button onClick={handleCheckout} className="cart-checkout">
        Check out
      </button>
    </div>
  );
}

export default Cart;
