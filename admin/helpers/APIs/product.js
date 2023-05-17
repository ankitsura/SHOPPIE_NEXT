import { API } from "../hosted-axios";


export const getOrders = () => API.get(`/admin/getOrders`); 

