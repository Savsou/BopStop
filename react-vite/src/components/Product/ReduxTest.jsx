import { useEffect, useState } from "react";
//import { NavLink } from "react-router-dom";
//import { thunkGetAllProducts, thunkGetLimitedProducts, thunkGetCurrentUserProducts } from "../../redux/products";
import { thunkGetCart, thunkAddCartItem, thunkRemoveCartItem} from "../../redux/cart"
import { useDispatch, useSelector } from "react-redux";
//import AddProduct from "./AddProduct";

const ReduxTest = () => {
    const dispatch = useDispatch();
    // const allProducts = useSelector(state => state.products.allProducts)
    // const ltdProducts = useSelector(state => state.products.ltdProducts)
    const cart = useSelector(state => state.cart)
    const [item, setItem] = useState({})
    const [item2, setItem2] = useState({})

    // useEffect(() => {
    //     dispatch(thunkGetAllProducts());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(thunkGetLimitedProducts());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(thunkGetCurrentUserProducts());
    // }, [dispatch]);
    useEffect(() => {
        dispatch(thunkGetCart())
    }, [dispatch]);

    useEffect(() => {
        const fetchProduct = async () =>{
            const res = await fetch('/api/products/1')
            setItem(await res.json())
        }
        fetchProduct();
    },[])

    useEffect(() => {
        const fetchProduct2 = async () =>{
            const res = await fetch('/api/products/2')
            setItem2(await res.json())
        }
        fetchProduct2();
    },[])

    console.log(JSON.stringify(item))
    return (
        <div> Testing BEYONCE&apos;S Products state
            {/* <button onClick={addItem}>ADD</button> */}


            {/*button to test auth*/}
            <button onClick={async () => dispatch(thunkAddCartItem(item))}>add</button>
            <button onClick={async () => dispatch(thunkAddCartItem(item2))}>add2</button>
            <button onClick={async () => dispatch(thunkRemoveCartItem(item2.productId))}>delete</button>
            {/* {currentUserProducts.map(({ productId, name, userId, type, genre, price, description, imageUrl}) => (
        <div key={productId}>
            <img src={imageUrl} alt="product-image"/>
            <div>
              <div>{name}, {type}, {userId}, {description}, {genre} </div>
            </div>
            <div>${price}</div>
        </div>
      ))} */}
        </div>
    )
}

export default ReduxTest
