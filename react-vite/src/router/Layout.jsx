import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import "../index.css"

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="layout-container"> {/* Flexbox parent */}
      <ModalProvider>
        <Navigation />
        <div className="main-content"> {/* Main content area */}
          {isLoaded && <Outlet />}
        </div>
        <Modal />
        <Footer /> {/* Footer stays at the bottom */}
      </ModalProvider>
    </div>
  );
}
