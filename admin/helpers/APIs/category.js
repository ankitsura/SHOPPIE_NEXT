import { API } from "../hosted-axios";


export const addCategory = (data) => API.post(`/admin/addCategory`, data); 
export const getCategories = () => API.get(`/admin/getAllCategories`); 
export const deleteCategory = (id) => API.delete(`/admin/deleteCategory/${id}`); 
export const editCategory = ({id, data}) => API.put(`/admin/editCategory/${id}`, data); 

