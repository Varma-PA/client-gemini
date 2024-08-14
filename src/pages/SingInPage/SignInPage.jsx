import React from "react";
import { SignIn } from "@clerk/clerk-react";
import "./signinpage.scss";

const SignInPage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
