import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://maintech-backend-r6yk.onrender.com',
})

const token = localStorage.getItem("@user_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}