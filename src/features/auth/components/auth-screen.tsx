"use client";
import { useState } from "react";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import type { SignInFlow } from "../types";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    // <div className="h-screen flex items-center justify-center bg-amber-200 ">
    <div
      className="h-screen flex items-center justify-center"
      style={{
        background: "#001D35",
      }}
    >
      <div className="md-h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
