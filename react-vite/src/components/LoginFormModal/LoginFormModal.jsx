import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import '../../../src/index.css';
// import '../../context/Modal.css';
import '../../context/FormModal.css';
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before each submission

    const newErrors = {};

    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = "Please enter your username/email.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    // If there are errors, update state and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkLogin({
        email_or_username: usernameOrEmail,
        password,
      })
    );

    if (serverResponse) {
      setErrors({
        general: "Login failed. Please check your credentials and try again."
      });
    } else {
      closeModal();
      navigate('/')
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();

    setErrors({}); // Reset errors before demo login

    const serverResponse = await dispatch(
      thunkLogin({
        email_or_username: "beyonce_knowles",
        password: "hashedpassword4"
      })
    );

    if (serverResponse) {
      setErrors({
        general: "Login failed. Please check your credentials and try again."
      });
    } else {
      closeModal();
      navigate('/')
    }
  };

  return (
    <>
      <p className="modal-title">Log In</p>
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username / Email</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            // required
          />
          {errors.usernameOrEmail && <p className="error-message">{errors.usernameOrEmail}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

          {errors.general && <p className="error-message">{errors.general}</p>}

        <div className="form-group">
          <button type="submit">Log In</button>
        </div>
        <div className="form-group">
          <button type="button" onClick={demoUserLogin}>Demo Login</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
