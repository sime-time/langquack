"use client";
import { z } from "zod";
import { useState } from "react";
import { authClient } from "@/utils/auth-client";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const [signUpForm, setSignUpForm] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("");
    setIsLoading(true);

    try {
      // validate input
      const valid = SignUpSchema.parse(signUpForm);

      // sign up with valid input
      const { data, error } = await authClient.signUp.email({
        email: valid.email,
        password: valid.password,
        name: valid.name,
        callbackURL: "/dashboard"
      });

      if (error) {
        throw new Error("Sign up failed");
      }

      console.table(data?.user);
      redirect("/dashboard");

    } catch (err) {
      console.error(err);
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center">
      <form className="my-10" onSubmit={handleSignUp} >
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="fieldset-label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="John Doe"
            onChange={(e) => setSignUpForm({
              ...signUpForm,
              name: e.currentTarget.value,
            })}
          />

          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setSignUpForm({
              ...signUpForm,
              email: e.currentTarget.value,
            })}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setSignUpForm({
              ...signUpForm,
              password: e.currentTarget.value,
            })}
          />

          <label className="fieldset-label">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            onChange={(e) => setSignUpForm({
              ...signUpForm,
              confirmPassword: e.currentTarget.value,
            })}
          />

          {error && (
            <p className="text-error font-semibold mt-2">{error}</p>
          )}

          <button type="submit" className="btn btn-neutral mt-2" disabled={isLoading}>Sign Up</button>
        </fieldset>
      </form>
    </main>
  );
}
