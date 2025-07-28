"use client";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (password !== confirmPassword) {
  //         setErrors({ email: "", password: "Passwords do not match" });
  //         return;
  //     }

  //     setPending(true);
  //     signIn("password", { name, email, password, flow: "signUp" })
  //         .catch(() => {
  //             setError("Something went wrong");
  //         })
  //         .finally(() => {
  //             setPending(false);
  //         })
  // }

  const nameRegex =
    // /^(?!.*\b(admin|test|xyz|qwerty|abc|demo)\b)[a-zA-Z ]{3,30}$/;
    /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/;
  const passwordRegex =
    /^(?!.*\b(password|123456|admin|qwerty|abc123)\b)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });
    setError("");

    if (!nameRegex.test(name)) {
      setError(
        "Please enter a valid name."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter a valid Gmail, Yahoo, Hotmail, or Outlook email",
      }));
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be include uppercase, lowercase, number, special character, and no weak words.",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        password: "Passwords do not match",
      }));
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((err: any) => {
        console.error("Signup error:", err);
        if (err?.message?.includes("already exists")) {
          setError("This email is already registered.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto px-6">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Sign in to Continue</h2>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-2 mx-6 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-2">
        <form onSubmit={onPasswordSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled={pending}
              id="name"
              placeholder="Enter your name (e.g., Jhon Doe)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={pending}
              id="email"
              type="email"
              placeholder="Enter your email (e.g. jhondoe@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password (minimum 8 character)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              disabled={pending}
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="flex flex-col space-y-2 ">
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGoogle />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
}