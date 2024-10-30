import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import '../../../src/index.css';
import '../../context/Modal.css';
import '../../context/FormModal.css';
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      
      <p className="modal-title">Sign Up</p>
      {errors.server && <p>{errors.server}</p>}
      <form className="modal-content" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-group">
        <label>
          Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div className="form-group">
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-group">
        <label>
          Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div className="form-group">
          <button type="submit">Sign Up</button>
          </div>
      </form>
    </>
  );
}

export default SignupFormModal;
