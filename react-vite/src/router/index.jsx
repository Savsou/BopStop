import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AddProduct from "../components/Product/AddProduct";
import ArtistDetail from "../components/Artist/ArtistDetail";
import EditUser from '../components/UserProfile/EditUser';
import ProductDetail from "../components/Product/ProductDetail";
import Layout from './Layout';

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
    ],
  },
]);
