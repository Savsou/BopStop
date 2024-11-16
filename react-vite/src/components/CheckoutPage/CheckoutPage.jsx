import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcDiscover } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../context/ConfirmationModal";
import { thunkGetCart } from '../../redux/cart'

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const cart = useSelector((state) => Object.values(state.cart.items))
    const [cardNum, setCardNum] = useState("")
    const [expiresMonth, setExpiresMonth] = useState("");
    const [expiresYear, setExpiresYear] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cartDetails, setCartDetails] = useState([]);
    const [subtotal, setSubtotal] = useState("");
    const [isSameBillingChecked, setIsSameBillingChecked] = useState(false);
    const [isSavePaymentChecked, setIsSavePaymentChecked] = useState(false);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const fetchCart = useCallback(async () => {
        try {
            const response = await fetch("/api/cart/session");
            console.log(response)
            console.log(sessionUser.cart)
            if (response.ok) {
                const data = await response.json();
                setCartDetails(data.cartDetails);
                setSubtotal(data.subtotal)
            }
        } catch (error) {
            console.error("Error fetching cart: ", error )
        }
    }, [sessionUser.cart]);

    useEffect(() => {
        if (!sessionUser) {
            console.log("Not logged in")
        }
        //should go to the backend, get their cart info

        fetchCart();
    }, [sessionUser, fetchCart]);

    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i.toString());
    }

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
        years.push((currentYear + i).toString());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/cart/checkout", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                const data = await response.json();
                setModalMessage(data.message);
                setShowModal(true);

                setCardNum("")
                setExpiresMonth("")
                setExpiresYear("")
                setSecurityCode("")
                setFirstName("")
                setLastName("")
                setIsSameBillingChecked(false)
                setIsSavePaymentChecked(false)
                // alert(data.message)
                dispatch(thunkGetCart())
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("An error occured. Please try again.");
        }
    }

    const isCartEmpty = cartDetails.length === 0;

    return (
        <div className="checkout-container">
            <h2 className="header">Enter your payment details</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="card-group">
                    <div className="card-number">
                        <label>Card number</label>
                        <input
                            type="text"
                            value={cardNum}
                            onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ''))}
                            className="input"
                            pattern="[0-9]*"
                            maxLength="16"
                            required
                        />
                        <div className="icons">
                            <FontAwesomeIcon size="2x" icon={faCcVisa} style={{color: "#74C0FC",}} />
                            <FontAwesomeIcon size="2x" icon={faCcMastercard} style={{color: "#0761a6",}} />
                            <FontAwesomeIcon size="2x" icon={faCcDiscover} style={{color: "#fdc90d",}} />
                        </div>
                    </div>
                    <div className="expires">
                        <label>Expires on</label>
                        <div className="expires-fields">
                            <select
                                value={expiresMonth}
                                onChange={(e) => setExpiresMonth(e.target.value)}
                                className="select"
                                required
                            >
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={expiresYear}
                                onChange={(e) => setExpiresYear(e.target.value)}
                                className="select"
                                required
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="security">
                        <label>Security Code</label>
                        <input
                            type="text"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value.replace(/\D/g, ''))}
                            className="input"
                            maxLength="3"
                            required
                        />
                        <div className="icons">
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                    </div>
                </div>
                <div className="name-group">
                    <div className="first-name">
                        <label>First name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                            className="input"
                            required
                        />
                    </div>
                    <div className="last-name">
                        <label>Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="same-billing"
                        checked={isSameBillingChecked}
                        onChange={() => setIsSameBillingChecked(!isSameBillingChecked)}
                        />
                    <label htmlFor="same-billing">My card billing address is the same as my shipping address</label>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="save-payment"
                        checked={isSavePaymentChecked}
                        onChange={() => setIsSavePaymentChecked(!isSavePaymentChecked)}
                        />
                    <label htmlFor="save-payment">Save this payment method for future purchases? You can remove it at anytime</label>
                </div>

                <div className="cart-items">
                    {cartDetails.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-products">
                            {cartDetails.map((item) => (
                                <div key={item.productId} className="cart-product">
                                    <img src={item.imageUrl} alt={item.name} className="product-image" />
                                    <div>
                                        <div className="product-info">
                                            <strong>{item.productName}</strong>
                                            <p>
                                                by {item.artistName}
                                            </p>
                                        </div>
                                        <p className="product-total">
                                            ${item.price} x{" "} {item.quantity} = ${item.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="total-calculation">
                                <p>
                                    Subtotal: $ {subtotal}
                                </p>
                                <p>
                                    Tax: $ {(subtotal * 0.0725).toFixed(2)}
                                </p>
                                <p>
                                    Total: $ {(subtotal * 1.0725).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="checkout-button"
                    disabled={isCartEmpty}>
                        Complete Purchase
                </button>
                <div className="things-below">
                    <p>A receipt will be sent to {sessionUser.email}.</p>
                </div>
            </form>
            {message && <p>{message}</p>}
            {showModal && (
                <ConfirmationModal
                    onClose={() => {
                            setShowModal(false)
                            navigate('/')
                        }
                    }
                    message={modalMessage}
                />
            )}
        </div>
    )
}

export default CheckoutPage
