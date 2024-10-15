import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/todos';


axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllTodos = () => axios.get(BASE_REST_API_URL)

export const saveTodo = (todo) => axios.post(BASE_REST_API_URL, todo)

export const getTodo = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const completeTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/complete')

export const inCompleteTodo = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-complete')

export const checkUsernameExists = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/${username}`); // sai url này
        return response.data;  // Trả về dữ liệu người dùng nếu tồn tại
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false; // Username không tồn tại
        } 
    }
};

export const getTodosByUsername = (username) =>  axios.get(`http://localhost:8080/api/todos/getAllByUsername/${username}`);  
  


