import { createSelector } from 'reselect';

const LOAD_ALL_PRODUCTS = 'products/load_all_products';
const LOAD_LIMITED_PRODUCTS = 'products/load_limited_products';
const LOAD_PRODUCT_BY_ID = 'products/load_product_by_id';
const LOAD_PRODUCT_REVIEWS = 'products/load_product_reviews';
const CREATE_PRODUCT_REVIEW = 'products/create_product_review';
const CREATE_PRODUCT = 'products/create_product';
const DELETE_PRODUCT = 'products/delete_product';
const DELETE_PRODUCT_REVIEW = 'products/delete_product_review';

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

export const loadProductById = product => (
    {
        type: LOAD_PRODUCT_BY_ID,
        product
    }
)

export const loadProductReviews = reviews => (
    {
        type: LOAD_PRODUCT_REVIEWS,
        reviews
    }
)

export const createProductReview = review => (
    {
        type: CREATE_PRODUCT_REVIEW,
        review
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

export const deleteProductReview = review => (
    {
        type: DELETE_PRODUCT_REVIEW,
        review
    }
)

//thunk action creators
export const thunkGetAllProducts = () => async dispatch => {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const products = await res.json()
            if (products.errors) return products.errors
            dispatch(loadAllProducts(products["products"]))
        }
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkGetAllProducts:", e);
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkGetLimitedProducts = (limit = 20) => async dispatch => {
    try {
        const res = await fetch(`/api/products?limit=${limit}`);
        if (res.ok) {
            const products = await res.json()
            if (products.errors) return products.errors
            dispatch(loadLimitedProducts(products["products"]))
        }
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkGetLimitedProducts:", e);
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkGetProductById = productId => async dispatch => {
    try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
            const product = await res.json()
            if (product.errors) return product.errors
            dispatch(loadProductById(product))
            return product
        }
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkGetProductById:", e);
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkAddProduct = (product) => async dispatch => {
    try {
        const res = await fetch("/api/products/", {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(product)
            // this is different because of AWS
            body: product
        });
        if (res.ok) {
            const newProduct = await res.json();
            dispatch(createProduct(newProduct));
        }
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkAddProduct:", e);
        return { server: "Something went wrong. Please try again" }
    }

};

export const thunkEditProduct = (product) => async dispatch => {
    try {
        const productId = product.get("id");

        const editRes = await fetch(`/api/products/edit/${productId}`,
            {
                method: 'PUT',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(product)
                // this is different because of AWS
                body: product
            }
        )
        if (editRes.ok) {
            const editProduct = await editRes.json()
            dispatch(loadProductById(editProduct))
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
    try {
        const res = await fetch(`/api/products/${productId}`,
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
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkRemoveProduct:", e);
        return { server: "Something went wrong. Please try again" }
    }
}

export const thunkGetProductReviews = productId => async dispatch => {
    try {
        const res = await fetch(`/api/products/${productId}/reviews`);
        if (!res.ok) throw new Error("Something is wrong in thunk")
        const reviews = await res.json()
        if (reviews.errors) return reviews.errors
        dispatch(loadProductReviews(reviews['reviews']))
        return reviews
    } catch (err) {
        console.error(err)
    }
}

export const thunkAddAProductReview = (productId, review) => async dispatch => {
    try {
        const res = await fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        if (res.ok) {
            const newReview = await res.json()
            if (newReview.errors) return newReview.errors
            dispatch(createProductReview(newReview.review))
            return res
        }
        else if (res.status < 500) {
            const errorMessages = await res.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages
        }
    } catch (e) {
        console.error("Error in thunkAddAProductReview:", e);
        return { server: "Something went wrong. Please try again" }
    }
}

//selectors
export const selectProduct = state => state.products;
export const selectAllProductsArry = createSelector(selectProduct, products => Object.values(products.allProducts));
export const selectLtdProductsArry = createSelector(selectProduct, products => Object.values(products.ltdProducts));

//reducer
const initialState = {
    ltdProducts: {},
    allProducts: {},
    loading: false,
};

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_PRODUCTS: {
            const allProducts = {};
            action.products.forEach(product => allProducts[product.productId] = product)
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
        case LOAD_PRODUCT_BY_ID: {
            const product = action.product
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    [product.productId]: product
                },
            };
        }
        case LOAD_PRODUCT_REVIEWS: {
            const reviews = action.reviews;
            const allReviews = {}
            let productId;
            if (reviews.length > 0) {
                productId = reviews[0].productId
                reviews.forEach(review => {
                    allReviews[review.id] = review
                })
                return {
                    ...state,
                    allProducts: {
                        ...state.allProducts,
                        [productId]: {
                            ...state.allProducts[productId],
                            reviews: allReviews
                        }
                    }
                }
            }
            return { ...state }
        }
        case CREATE_PRODUCT_REVIEW: {
            const { productId } = action.review
            const review = action.review
            const currentReviews = state.allProducts[productId]?.reviews || {};
            console.log("testing:", state.allProducts[productId].reviews)
            return {
                ...state,
                allProducts: {
                    [productId]: {
                        ...state.allProducts[productId],
                        reviews: { ...currentReviews, [review.reviewId]: review }
                    }
                }
            }
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
        case DELETE_PRODUCT: {
            const { productId } = action
            const copyState = { ...state }
            delete copyState.allProducts[productId]
            if (copyState.ltdProducts[productId]) {
                delete copyState.ltdProducts[productId]
            }
            return copyState
        }

        case DELETE_PRODUCT_REVIEW: {
            const { productId, reviewId } = action.review
            const copyState = { ...state }
            delete copyState.allProducts[productId].reviews[reviewId]
            return copyState
        }
        default:
            return state;
    }
}

export default productsReducer;
