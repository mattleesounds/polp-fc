"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    onSignInSuccess?: (data: any) => void; // make it optional
  }
}

const SignIn = () => {
  const [userFID, setUserFID] = useState<string | null>(null);

  useEffect(() => {
    const handleSignInSuccess = (data: {
      signer_uuid: string;
      fid: string;
    }) => {
      console.log("Sign-in success with data:", data);
      setUserFID(data.fid);
      // more sign in logic
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
    <div>
      <div
        className="neynar_signin"
        data-client_id={process.env.NEYNAR_CLIENT_ID}
        data-success-callback="onSignInSuccess"
        data-theme="dark"
      />
      <div>{userFID && <p>User FID: {userFID}</p>}</div>
    </div>
  );
};

export default SignIn;
