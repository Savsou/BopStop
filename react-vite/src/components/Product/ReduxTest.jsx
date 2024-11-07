import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetAllProducts, thunkGetLimitedProducts, thunkGetCurrentUserProducts } from "../../redux/products_pristine";
import { useDispatch, useSelector } from "react-redux";

const ReduxTest = () => {
    const dispatch = useDispatch();
    // const allProducts = useSelector(state => state.products.allProducts)
    // const ltdProducts = useSelector(state => state.products.ltdProducts)
    const currentUserProducts = useSelector(state => state.products.currentUserProducts)

    // useEffect(() => {
    //     dispatch(thunkGetAllProducts());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(thunkGetLimitedProducts());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(thunkGetCurrentUserProducts());
    }, [dispatch]);

    if (!currentUserProducts) {
        return (
            <h1>Loading...</h1>
        )
    }

    console.log(currentUserProducts)
    return (
        <div> Testing BEYONCE'S Products state
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
