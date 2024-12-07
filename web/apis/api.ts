import axios from "axios";

const baseURL = "http://localhost:8000";

export const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(
    (config) => {
        const token: string | null = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

const signUpRoute = `${baseURL}/auth/signup`;
const loginRoute = `${baseURL}/auth/login`;
const googleRoute = `${baseURL}/auth/google`;
const getProfileRoute = `${baseURL}/api/profile`;


/* Room routes */
const getAllRoomsRoute = `/api/room`;
const getRoomsRoute = `/api/room/get`;
const createRoomRoute = `/api/room/create`;
const joinRoomRoute = `/api/room/join`;

export { signUpRoute, loginRoute, googleRoute, getProfileRoute, getAllRoomsRoute, createRoomRoute, getRoomsRoute, joinRoomRoute };