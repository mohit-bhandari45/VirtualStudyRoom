"use client"

import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { googleRoute } from "@/apis/api";
import axios from "axios";

interface GoogleDetails {
    name: string,
    email: string
}

interface CustomPayload extends GoogleDetails, JwtPayload {
}

const handleGoogleLogin = async (credentialResponse: CredentialResponse): Promise<boolean> => {
    const token = credentialResponse.credential;
    const data: CustomPayload = jwtDecode<CustomPayload>(token as string);
    const response = await axios.post(googleRoute, {
        name: data.name,
        email: data.email
    },
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        
    const responseToken: string = response.data.token;
    sessionStorage.setItem("token", responseToken);
    if (response.status == 200) {
        return true;
    }
    return false;
};

export default handleGoogleLogin;