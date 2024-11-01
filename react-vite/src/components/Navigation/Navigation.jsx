// Navigation.jsx
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from "../../../src/logo.png";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);

  return (
    <nav>
      <ul>
        <li className="nav-logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo" />
          </NavLink>
        </li>
        {user ? (
          <li>
            <ProfileButton
              buttonClass="profile-button"
            />
          </li>
        ) : (
          <>
            <li>
              <OpenModalMenuItem
                itemText="Log In"
                  modalComponent={<LoginFormModal />}
                  buttonClass="login-button"
              />
            </li>
            <li>
              <OpenModalMenuItem
                itemText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  buttonClass="signup-button"
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
