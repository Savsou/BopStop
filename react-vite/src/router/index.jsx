import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AddProduct from "../components/Product/AddProduct";
import ArtistDetail from "../components/Artist/ArtistDetail";
import EditUser from '../components/UserProfile/EditUser';
import UserProfile from '../components/UserProfile/UserProfile';
import ProductDetail from "../components/Product/ProductDetail";
import Wishlist from '../components/Wishlist/Wishlist';
import Cart from '../components/Cart/Cart';
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import Layout from './Layout';

import ReduxTest from '../components/Product/ReduxTest';//redux test component
import EditProduct from '../components/Product/EditProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "product/new",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:productId",
        element: <EditProduct />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "profile/edit",
        element: <EditUser />,
      },
      {
        path: "artist/:artistId",
        element: <ArtistDetail />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/profile/:userId",
        element: <UserProfile />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "redux/test",
        element: <ReduxTest />
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      }
    ],
  },
]);
