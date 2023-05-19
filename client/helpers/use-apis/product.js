import axios from "axios";9
import { API } from "../hosted-axios";



export const fetchProduct = (id) => axios.get(`http://localhost:5000/products/${id}`); 

export const fetchProducts = () => axios.get(`http://localhost:5000/products`);

export const fetchCartItems = (items) => async (dispatch) => {
    const res = await API.get(`/products/cartItems/${items}`);
    if(res.data.message === ('jwt expired' || 'jwt error')){
        dispatch({type: 'LOGOUT'});
        return res
    }
    return res;
};

export const addToCart = (id) => async (dispatch) => {
    API.post(`/products/addtocart/${id}`).then((res)=>{
        if(res.data === 'Product not found'){
            window.alert('Product removed from the site')
            window.location.reload(true);
            return;
        }
        dispatch({
            type: 'ADD_TO_CART', productId: res.data
        })
    });
};

export const removeFromCart = (id) => async (dispatch) => {
    API.post(`/products/removefromcart/${id}`).then(({data})=>{
        dispatch({
            type: 'REMOVE_FROM_CART', productId: data
        })
    })
};
// export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const addComment = (id, value) => API.post(`/posts/${id}/commentPost`, { value });

