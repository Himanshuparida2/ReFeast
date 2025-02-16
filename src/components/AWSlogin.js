import React,{useState,useEffect} from "react";
import { useAuth } from "react-oidc-context";

export const AWSlogin=()=>{

    const auth = useAuth();
    const [userData, setUserData] = useState(null);
    
    const signOutRedirect = () => {
      const clientId = process.env.REACT_APP_CLIENT_ID;
      const logoutUri = "http://localhost:3000/";
      const cognitoDomain = "https://us-east-1lg7xmhtnr.auth.us-east-1.amazoncognito.com";
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };
    
    
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
  

    useEffect(() => {
      if (auth.isAuthenticated) {
        const user = {
          username: auth.user.profile['cognito:username'],
          email: auth.user.profile.email,
          name: auth.user.profile.name,
          phone: auth.user.profile.phone_number,
        };
        setUserData(user); 
      }
    }, [auth.isAuthenticated, auth.user]); 
  
    useEffect(() => {
      if (userData) {
        getData(); 
      }
    }, [userData]);
  
   
    if (auth.isLoading) {
      return <div>Loading...</div>;
    }
  
    if (auth.error) {
      return <div>Encountering error... {auth.error.message}</div>;
    }
  
    if (auth.isAuthenticated) {
      console.log(auth.user)
      return (
        <div>
          <div>Hello: {auth.user.profile.name}</div>
          <div>ID Token: {auth.user.id_token}</div>
          <div>Access Token: {auth.user.access_token}</div>
          <div>Refresh Token: {auth.user.refresh_token}</div>
  
          <button onClick={() => auth.removeUser()}>Sign out</button>
        </div>
      );
    }
  
    return (
      <div>
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
        <button onClick={() => signOutRedirect()}>Sign out</button>
      </div>
    );
  };