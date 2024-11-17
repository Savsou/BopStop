import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";

function Cart({ cart, removeFromCart}) {
  // console.log("Cart prop from productDetail page:", cart)
  const cartItems = Object.values(cart.items);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [cartItems, setCartItems] = useState([...itemArray]);
  // const [subtotal, setSubtotal] = useState(0);
  const [error, setError] = useState(null);
  const wiggle = useSelector((state) => state.cart.wiggle);

  console.log(wiggle)
  //console.log("cartItems", JSON.stringify(cartItems))

  const handleCheckout = async () => {
    navigate("/checkout");
  };

  // if (!cartItems) return <p>Loading cart...</p>;

  return (
    <div
    className="cart-container"
    wiggle={wiggle}
    >
      <h3>Shopping Cart</h3>
      {error && <p className="error">{error}</p>}
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
