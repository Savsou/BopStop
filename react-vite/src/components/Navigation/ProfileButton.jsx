// ProfileButton.jsx
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  if (!user) return null; // If not logged in, don't render the button

  return (
    <button className="logout-button" onClick={logout}>
      Log Out
    </button>
  );
}

export default ProfileButton;
