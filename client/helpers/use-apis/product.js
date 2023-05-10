
import { API } from "../hosted-axios";


// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
//   });


export const fetchProduct = (id) => API.get(`/products/${id}`);
export const fetchProducts = () => API.get(`/products`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const addComment = (id, value) => API.post(`/posts/${id}/commentPost`, { value });

