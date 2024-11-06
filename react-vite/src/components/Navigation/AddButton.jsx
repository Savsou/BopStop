import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { Link } from "react-router-dom";
import "./Navigation.css";

function AddButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  if (!user) return null;

  return (
    <>
      <button onClick={toggleMenu}>
        + add
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          <li>
          <Link to="/product/new" onClick={closeMenu}>
              Vinyl
            </Link>
          </li>
          <li>
          <Link to="/product/new" onClick={closeMenu}>
              CDs
            </Link>
          </li>
          <li>
          <Link to="/product/new" onClick={closeMenu}>
              Cassettes
            </Link>
          </li>
          <li>
          <Link to="/product/new" onClick={closeMenu}>
              T-shirts
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default AddButton;
