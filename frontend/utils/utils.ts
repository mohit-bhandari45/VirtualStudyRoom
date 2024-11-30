import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { googleRoute } from "@/apis/api";
import axios from "axios";

const handleGoogleLogin = async (credentialResponse: CredentialResponse): Promise<boolean> => {
    const token = credentialResponse.credential;
    const data: JwtPayload = jwtDecode(token as string);
    const response = await axios.post(googleRoute, {
        name: data.name,
        email: data.email
    },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })

    console.log(response.data.token);
    if (response.status == 200) {
        return true;
    }
    return false;
};

export default handleGoogleLogin;