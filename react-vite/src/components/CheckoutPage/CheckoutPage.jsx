import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcDiscover } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

function CheckoutPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [cardNum, setCardNum] = useState("")
    const [expiresMonth, setExpiresMonth] = useState("");
    const [expiresYear, setExpiresYear] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cartDetails, setCartDetails] = useState([])
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!sessionUser) {
            console.log("Not logged in")
        }
        //should go to the backend, get their cart info
        const fetchCart = async () => {
            try {
                const response = await fetch("/api/cart");
                console.log(response)
                console.log(sessionUser.cart)
                if (response.ok) {
                    const data = await response.json();
                    setCartDetails(data.cartDetails);
                }
            } catch (error) {
                console.error("Error fetching cart: ", error )
            }
        }

        fetchCart()
    }, [sessionUser])

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
                // setMessage(data.message);
                alert(data.message)
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("An error occured. Please try again.");
        }
    }

    return (
        <div className="container">
            <h2 className="header">Enter your payment details</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="card-group">
                    <div className="card-number">
                        <label>Card number</label>
                        <input
                            type="text"
                            value={cardNum}
                            onChange={(e) => setCardNum(e.target.value)}
                            className="input"
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
                            onChange={(e) => setSecurityCode(e.target.value)}
                            className="input"
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
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="last-name">
                        <label>Last name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input"
                        />
                    </div>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="same-billing" />
                    <label htmlFor="same-billing">My card billing address is the same as my shipping address</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="save-payment" />
                    <label htmlFor="save-payment">Save this payment method for future purchases? You can remove it at anytime</label>
                </div>

                <div className="cart-items">
                    {cartDetails.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-products">
                            {cartDetails.map((item) => (
                                <div key={item.productId} className="cart-product">
                                    <p>
                                        <strong>{item.productName}</strong> - ${item.price} x{" "}
                                        {item.quantity} = ${item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="checkout-button">Complete Purchase</button>
                <div className="things-below">
                    <p>A receipt will be sent to {sessionUser.email}.</p>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default CheckoutPage
