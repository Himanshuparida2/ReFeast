import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Google_Client_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLog() {
  const [userData,setUserData]=useState(null)
  const getData = async () => {
    if (!userData) return; 
    const url = "http://localhost:5050/auth/login";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json); 
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <GoogleOAuthProvider clientId={Google_Client_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const user=jwtDecode(credentialResponse.credential)
          const GoogleUser={
            username:user.email+user.name,
            name:user.name,
            email:user.email,
            phone:null,
            display_picture:user.picture
          }
          console.log(user)
          setUserData(GoogleUser)
          getData()
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLog;
