import { csrfFetch } from "./csrf.js";
const CREATE_PRODUCT = 'products/create_product'

//action creators
export const createProduct = product => ({
    type: CREATE_PRODUCT,
    product
});


//thunk action creators
export const thunkAddProduct = (product) => async dispatch => {
    const response = await csrfFetch("/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        const newProduct = await response.json();
        dispatch(createProduct(newProduct));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkEditProduct = (product) => async dispatch => {
    const editRes = await csrfFetch(`/api/products/${product.id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }
    )
    if (editRes.ok) {
        const editProduct = await editRes.json()
        const getRes = await csrfFetch(`/api/products/${product.id}`);//is this just a GET?
        const updatedProduct = await getRes.json();
        dispatch(loadProductById(updatedProduct))
        return editProduct; //might not need this
    } else if (res.status < 500) {
        const errorMessages = await res.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
}

//reducer
const initialState = {
    newProduct: null
};

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            const productId = action.product.id;
            return {
                ...state,
                newProduct: {
                    [productId]: action.product
                }
            };
        default:
            return state;
    }
}

export default productsReducer;
