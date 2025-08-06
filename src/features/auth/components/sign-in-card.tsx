
"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export function SignInCard({ setState }: SignInCardProps) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset all errors
    setErrors({ email: "", password: "" });
    setError("");

    // Client-side validation
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "Please enter a valid email";
    }
    if (password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setPending(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      // Success logic here, if any (e.g., redirect)
    } catch (err: any) {
      // Parse the error message to assign errors to email or password inputs
      const message = err?.message?.toLowerCase() || "";

      if (message.includes("email")) {
        setErrors({ email: "Email not found", password: "" });
      } else if (message.includes("password")) {
        setErrors({ email: "", password: "Incorrect password" });
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setPending(false);
    }
  };

  const onProviderSignIn = (provider: "github" | "google") => {
    setPending(true);
    signIn(provider).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Login to Continue</h2>
        <CardDescription>Use your email and password to continue</CardDescription>
      </CardHeader>

      {/* Generic top-level error (fallback) */}
      {!!error && (
        <div className="bg-destructive/15 p-1 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-4">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-4">
        <form onSubmit={onPasswordSignIn} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={pending}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={pending}
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col space-y-2">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="mr-2" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

