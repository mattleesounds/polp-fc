"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    onSignInSuccess?: (data: any) => void; // make it optional
  }
}

const SignIn = () => {
  useEffect(() => {
    // Function to handle sign-in success
    const handleSignInSuccess = (data: any) => {
      console.log("Sign-in success with data:", data);
      // do more sign in logic here
    };

    window.onSignInSuccess = handleSignInSuccess;
    const script = document.createElement("script");
    script.src = "https://neynarxyz.github.io/siwn/raw/1.2.0/index.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      window.onSignInSuccess = undefined;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="neynar_signin"
      data-client_id={process.env.NEYNAR_CLIENT_ID}
      data-success-callback="onSignInSuccess"
      data-theme="dark" // or "light"
    />
  );
};

export default SignIn;
