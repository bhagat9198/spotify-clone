import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
 
  useEffect(() => {
    axios
      .post("http://localhost:4000/login", { code })
      .then((res) => {
        console.log(res.data);
        window.history.pushState({}, null, '/');
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
      })
      .catch((error) => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if(!refreshToken ) return;
    if(!expiresIn ) return;
    const interval = setInterval(() => {
      axios
      .post("http://localhost:4000/refresh", { refreshToken })
      .then((res) => {
        console.log(res.data);
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, '/');
      })
      .catch((error) => {
        console.log(error);
        window.location = "/";
      });
    }, (expiresIn - 60)*1000);

    return () => clearInterval(interval);
    
  }, [refreshToken, expiresIn])

  return accessToken;
}
