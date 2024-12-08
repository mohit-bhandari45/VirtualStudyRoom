import axios from "axios";

export const baseURL = "http://localhost:8000";

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


/*Auth Routes */
const signUpRoute = `${baseURL}/auth/signup`;
const loginRoute = `${baseURL}/auth/login`;
const googleRoute = `${baseURL}/auth/google`;
const getProfileRoute = `${baseURL}/api/profile`;

export { signUpRoute, loginRoute, googleRoute, getProfileRoute };


/* Api routes */
/* Room routes */
const getAllRoomsRoute = `/api/room`;
const getRoomsRoute = `/api/room/get`;
const getJoinedRoomsRoute = `/api/room/joined`;
const createRoomRoute = `/api/room/create`;
const joinRoomRoute = `/api/room/join`;

export { getAllRoomsRoute, getJoinedRoomsRoute, getRoomsRoute, createRoomRoute, joinRoomRoute };