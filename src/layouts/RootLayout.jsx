import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./rootlayout.scss";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkProvider,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  alert("Missing Publishable Key");
  // throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <header>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="" />
              <span>Gemini Clone</span>
            </Link>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in">Log In</Link>
              </SignedOut>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
