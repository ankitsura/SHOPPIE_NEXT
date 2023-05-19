import { API } from "../hosted-axios";




export const addProduct = (data) => API.post(`/admin/addProduct`, data); 
export const editProduct = ({id, product}) => API.patch(`/admin/editProduct/${id}`, product); 
export const deleteProduct = (id) => API.delete(`/admin/deleteProduct/${id}`); 

export const getProduct = (id) => API.get(`/admin/getProduct/${id}`); 