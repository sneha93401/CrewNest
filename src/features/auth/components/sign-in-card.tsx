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

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  // const handleProviderSignIn = (value: "github" | "google") => {
  //   signIn(value);
  // };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
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

    setErrors({ email: "", password: "" });
    console.log({ email, password });
    // Continue with your login logic
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold text-center">Login to Continue</h2>
        <CardDescription>
          Use your email and password to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-1 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-4">
        <form onSubmit={onPasswordSignIn} className="space-y-4">
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
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
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
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col space-y-2 ">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGoogle />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-center">
          Don&apos;t have an account ?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-blue-400 cursor-pointer  hover:underline"
          >
            Sing up{" "}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}



// import { useAuthActions } from '@convex-dev/auth/react';
// import { TriangleAlert } from 'lucide-react';
// import { useState } from 'react';
// import { FaGithub } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';

// import type { SignInFlow } from '../types';

// interface SignInCardProps {
//   setState: (state: SignInFlow) => void;
// }

// export const SignInCard = ({ setState }: SignInCardProps) => {
//   const { signIn } = useAuthActions();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [pending, setPending] = useState(false);

//   const handleOAuthSignIn = (value: 'github' | 'google') => {
//     setPending(true);
//     signIn(value).finally(() => setPending(false));
//   };

//   const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setPending(true);
//     setError('');

//     signIn('password', { email, password, flow: 'signIn' })
//       .catch(() => {
//         setError('Invalid email or password!');
//       })
//       .finally(() => setPending(false));
//   };

//   return (
//     <Card className="size-full p-8">
//       <CardHeader className="px-0 pt-0">
//         <CardTitle>Login to continue</CardTitle>
//         <CardDescription>Use your email or another service to continue.</CardDescription>
//       </CardHeader>

//       {!!error && (
//         <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
//           <TriangleAlert className="size-4" />
//           <p>{error}</p>
//         </div>
//       )}

//       <CardContent className="space-y-5 px-0 pb-0">
//         <form onSubmit={handleSignIn} className="space-y-2.5">
//           <Input disabled={pending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />

//           <Input
//             disabled={pending}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             type="password"
//             required
//           />

//           <Button type="submit" className="w-full" size="lg" disabled={pending}>
//             Continue
//           </Button>
//         </form>

//         <Separator />

//         <div className="flex flex-col gap-y-2.5">
//           <Button disabled={pending} onClick={() => handleOAuthSignIn('google')} variant="outline" size="lg" className="relative w-full">
//             <FcGoogle className="absolute left-2.5 top-3 size-5" />
//             Continue with Google
//           </Button>

//           <Button disabled={pending} onClick={() => handleOAuthSignIn('github')} variant="outline" size="lg" className="relative w-full">
//             <FaGithub className="absolute left-2.5 top-3 size-5" />
//             Continue with GitHub
//           </Button>
//         </div>

//         <p className="text-center text-xs text-muted-foreground">
//           Don&apos;t have an account?{' '}
//           <button
//             disabled={pending}
//             onClick={() => setState('signUp')}
//             className="cursor-pointer font-medium text-sky-700 hover:underline disabled:pointer-events-none disabled:opacity-50"
//           >
//             Sign up
//           </button>
//         </p>
//       </CardContent>
//     </Card>
//   );
// };

