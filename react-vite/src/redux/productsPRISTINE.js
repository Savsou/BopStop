const CREATE_PRODUCT = 'products/create_product'

//action creators
export const createProduct = product => ({
    type: CREATE_PRODUCT,
    product
});


//thunk action creators
export const thunkAddProduct = (product) => async dispatch => {
    const response = await fetch("/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        const newProduct = await response.json();
        dispatch(createProduct(newProduct));
        // return newProduct
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

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
                    [productId]: action.product}
            };
        default:
            return state;
    }
}

export default productsReducer;
