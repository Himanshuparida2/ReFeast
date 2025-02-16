import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Google_Client_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLog() {
  return (
    <GoogleOAuthProvider clientId={Google_Client_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const user=jwtDecode(credentialResponse.credential)
          console.log(user)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLog;
