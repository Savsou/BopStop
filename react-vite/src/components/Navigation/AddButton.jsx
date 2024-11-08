import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navigation.css";

function AddButton() {
  const user = useSelector((store) => store.session.user);

  if (!user) return null;

  return (
    <Link to="/product/new" className="add-button-link">
      + add
    </Link>
  );
}

export default AddButton;
