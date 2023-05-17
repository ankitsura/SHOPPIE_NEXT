import { API } from "../hosted-axios";



// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const addComment = (id, value) => API.post(`/posts/${id}/commentPost`, { value });

export const register = (form) => async (dispatch) => {
    const {data} = await API.post(`/user/signup`, form);
    console.log(data);
    dispatch({ type: 'SIGN_UP', info:data });
}

export const login = (form) => async (dispatch) => {
    const {data} = await API.post(`/user/signin`, form);
    dispatch({ type: 'LOGIN', data });
}


// authApi.doVerifyUser = async (data) =>
//   hostedAuthAxios.post('/verify-user', data);


// authApi.doLogout = async () => hostedAuthAxios.delete('/logout');

