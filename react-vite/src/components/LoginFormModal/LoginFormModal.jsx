import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import '../../../src/index.css';
import '../../context/Modal.css';
import '../../context/FormModal.css';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
      <p className="modal-title">Log In</p>
      <form className="modal-content" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
            Username / email
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
          <button type="submit">Log In</button>
          </div>
      </form>
    </>
  );
}

export default LoginFormModal;
