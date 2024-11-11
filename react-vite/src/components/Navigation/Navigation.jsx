// Navigation.jsx
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AddButton from "./AddButton"
import logo from "../../../src/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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
          <>
            <li>
              <AddButton
              />
            </li>
            <li>
            <NavLink to="/wishlist" className="nav-icon-link">
                <FontAwesomeIcon icon={faHeart} className="nav-icon" />
            </NavLink>
            </li>
          <li>
            <ProfileButton
              buttonClass="profile-button"
            />
            </li>
            </>
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
