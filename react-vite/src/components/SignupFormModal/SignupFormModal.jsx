import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import '../../../src/index.css';
import '../../context/FormModal.css';
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [artistName, setArtistName] = useState("");
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
        artistName,
        email,
        username,
        password,
        confirm_password: confirmPassword
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
        Artist Name
          </label>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          {errors.artistName && <p className="error-message">{errors.artistName}</p>}
        </div>
      <div className="form-group">
        <label>
          Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
        <label>
          Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>
      <div className="form-group">
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
        <label>
          Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>
      <div className="form-group">
          <button type="submit">Sign Up</button>
          </div>
      </form>
    </>
  );
}

export default SignupFormModal;
