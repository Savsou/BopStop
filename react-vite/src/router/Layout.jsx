import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import "../index.css"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="layout-container">
      <ModalProvider>
        <Navigation />
        <div className="main-content">
          {isLoaded ? <Outlet /> : <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
        </div>
        <Modal />
        <Footer /> 
      </ModalProvider>
    </div>
  );
}
