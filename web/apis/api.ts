const baseURL = "http://localhost:8000";

const signUpRoute = `${baseURL}/auth/signup`;
const loginRoute = `${baseURL}/auth/login`;
const googleRoute = `${baseURL}/auth/google`;
const getProfileRoute = `${baseURL}/api/profile`;


/* Room routes */
const getRoomsRoute=`${baseURL}/api/room`;

export { signUpRoute, loginRoute, googleRoute, getProfileRoute,getRoomsRoute };