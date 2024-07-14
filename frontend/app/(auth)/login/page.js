"use client";

import React from "react";
import SubmitButton from "@/app/components/SubmitButton";
import Link from "next/link";
import { signInActionCredentials } from "@/app/lib/action";
import SignInBtn from "@/app/components/SignInBtn";
import { useProfile } from "@/app/context/UserContext";
import { useRouter } from 'next/navigation';

const Login = () => {
  const { setUser, setLoginError } = useProfile();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const result = await signInActionCredentials(formData);
    if (result.error) {
      setLoginError(result.error);
    } else {
      setUser(result.user);
      router.push('/account');
    }
  };
  return (
    <div className="bg-base-200 my-32 ">
      <div className="card  shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="text-center card-body lg:text-left">
          <h1 className="text-2xl sm:text-4xl text-primary font-bold">
            Login now!
          </h1>
          <p className="py-1">
            <span className="font-semibold text-primary-focus  text-lg">
              Welcome to Recipe-store
            </span>
          </p>
        </div>

        <form className="card-body" action={handleSubmit}>
          <div className="form-control">
            <label className="label text-secondary">
              <span className="label-text text-secondary">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-secondary">
              <span className="label-text text-secondary">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label  "></label>
          </div>
          <SubmitButton pendingLabel="Signing....">Login</SubmitButton>
        </form>
        <span className="border-t-2 "></span>
        <SignInBtn />

        <Link href="/register" className="text-sm text-center my-2">
          Want to register ?{" "}
          <button className="link link-accent "> Click Here</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
