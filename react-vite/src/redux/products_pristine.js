import { csrfFetch } from "./csrf.js";
// import { createSelector } from 'reselect';

const LOAD_ALL_PRODUCTS = 'products/load_all_products';
const LOAD_LIMITED_PRODUCTS = 'products/load_limited_products';
const LOAD_CURRENT_USER_PRODUCTS = 'products/load_current_user_products';
const LOAD_PRODUCT_BY_ID = 'products/load_product_by_id';
const CREATE_PRODUCT = 'products/create_product';
const DELETE_PRODUCT = 'products/delete_product';
// const LOAD_ALL_PRODUCTS_REQUEST = 'products/load_all_products_request';
// const LOAD_LIMITED_PRODUCTS_REQUEST = 'products/load_limited_products_request';

//action creators
export const loadAllProducts = products => (
    {
        type: LOAD_ALL_PRODUCTS,
        products
    }
)

export const loadLimitedProducts = products => (
    {
        type: LOAD_LIMITED_PRODUCTS,
        products
    }
)

// export const loadAllProductsReq = () => (
//   {
//     type: LOAD_ALL_PRODUCTS_REQUEST
//   }
// )

// export const loadLimitedProductsReq = () => (
//   {
//     type: LOAD_LIMITED_PRODUCTS_REQUEST
//   }
// )

export const loadCurrentUserProducts = products => (
    {
        type: LOAD_CURRENT_USER_PRODUCTS,
        products
    }
)

export const loadProductById = product => (
    {
        type: LOAD_PRODUCT_BY_ID,
        product
    }
)

export const createProduct = product => ({
    type: CREATE_PRODUCT,
    product
});

export const deleteProduct = productId => (
    {
        type: DELETE_PRODUCT,
        productId
    }
)


//thunk action creators

export const thunkGetAllProducts = () => async dispatch => {
    // dispatch(loadAllProductsReq())

    const res = await csrfFetch('/api/products');
    if (res.ok) {
        const products = await res.json()
        console.log(`Testing thunkGetAllProducts: ${products}`)
        if (products.errors) return products.errors
        dispatch(loadAllProducts(products["products"]))
    }
}

export const thunkGetLimitedProducts = () => async dispatch => {
    // dispatch(loadLimitedProductsReq())

    const res = await csrfFetch('/api/products/limited');
    console.log(res)
    if (res.ok) {
        const products = await res.json()
        console.log(`Testing thunkGetLimitedProducts: ${products}`)
        if (products.errors) return products.errors
        dispatch(loadLimitedProducts(products["products"]))
    }
}

export const thunkGetCurrentUserProducts = () => async dispatch => {
    const res = await csrfFetch('/api/products/current');
    if (res.ok) {
        const products = await res.json()
        if (products.errors) return products.errors
        dispatch(loadCurrentUserProducts(products["products"]))
    }
}

export const thunkGetProductById = productId => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}`);
    if (res.ok) {
        const product = await res.json()
        // console.log(`Testing thunkGetProductById: ${JSON.stringify(product)}`)
        if (product.errors) return product.errors
        dispatch(loadProductById(product))
        return product
    }
}


export const thunkAddProduct = (product) => async dispatch => {
    const response = await fetch("/api/products/", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(product)
        body: product
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
    try {
        console.log(`Testing product payload before fetch: ${JSON.stringify(product)}`)

        const editRes = await csrfFetch(`/api/products/edit/${product.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            }
        )
        if (editRes.ok) {
            const editProduct = await editRes.json()
            console.log(`Testing thunkEditProduct data from dispatch: ${JSON.stringify(editProduct)}`)

            // const getRes = await csrfFetch(`/api/products/${product.id}`);//is this just a GET?
            // const updatedProduct = await getRes.json();
            dispatch(loadProductById(editProduct))
            // return editProduct; //might not need this
        } else if (editRes.status < 500) {
            const errorMessages = await editRes.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        } else {
            console.error("Server Error");
            return { server: "Something went wrong. Please try again" }
        }
    } catch (error) {
        console.error("Error in thunkEditProduct:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export const thunkRemoveProduct = productId => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
    )

    if (res.ok) {
        const deleted = await res.json();
        if (deleted.errors) return deleted.errors
        dispatch(deleteProduct(productId))
    }
}

//reducer
const initialState = {
    ltdProducts: {},
    allProducts: {},
    currentUserProducts: {},
    currentProduct: null,//might get rid of this later
    loading: false,
};

function productsReducer(state = initialState, action) {
    switch (action.type) {
        // case LOAD_ALL_PRODUCTS_REQUEST:
        // case LOAD_LIMITED_PRODUCTS_REQUEST:
        //   return {
        //     ...state,
        //     loading: true
        //   }
        case LOAD_ALL_PRODUCTS: {
            const allProducts = {};
            action.products.forEach(product => allProducts[product.productId] = product)//we are referencing the product.to_dict() function
            return {
                ...state,
                loading: false,
                allProducts,
            };
        }
        case LOAD_LIMITED_PRODUCTS: {
            const ltdProducts = {};
            action.products.forEach(product => ltdProducts[product.productId] = product)
            return {
                ...state,
                loading: false,
                ltdProducts,
            };
        }
        case LOAD_CURRENT_USER_PRODUCTS: {
            const currentUserProducts = {};
            action.products.forEach(product => currentUserProducts[product.productId] = product)
            return {
                ...state,
                loading: false,
                currentUserProducts,
            };
        }
        case LOAD_PRODUCT_BY_ID: {
            const product = action.product
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [product.productId]: product
                },
                currentProduct: product//might get rid of this later
            };
        }
        case CREATE_PRODUCT: {
            const productId = action.product.id;
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [productId]: action.product
                }
            };
        }
        default:
            return state;
    }
}

export default productsReducer;
