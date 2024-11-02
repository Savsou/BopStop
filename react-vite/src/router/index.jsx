import { createBrowserRouter } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AddProduct from "../components/Product/AddProduct"
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
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
    ],
  },
]);