import Link from "next/link";
import SubmitButton from "@/app/components/SubmitButton";
import SignInBtn from "@/app/components/SignInBtn";

import { createUser, signUpAction } from "@/app/lib/action";

const SignUp = () => {
  return (
    <div className="  bg-base-200 mt-32">
      <div className=" card card-compact flex flex-col justify-end items-end">
        <div className="card-body  shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center ">
            <h1 className="text-xl sm:text-2xl text-primary font-bold">
              Register here!
            </h1>
            <p className="py-6">
              Explore New chatting experience{" "}
              <span className="font-semibold text-accent text-lg">Welcome</span>
            </p>
          </div>
          <form className="card-body" action={signUpAction}>
            {/* {error && <Error error={error} />} */}
            <div className="form-control">
              <label className="label ">
                <span className="label-text text-secondary">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered"
                required
              />

              <label className="label">
                <span className="label-text text-secondary">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">
                  confirm password
                </span>
              </label>
              <input
                type="text"
                placeholder="confirm password"
                name="password_confirmation"
                className="input input-bordered"
                required
              />
            </div>
            <div>
              <label className="text-secondary m-1">Gender</label>

              <label className="mx-1 px-2">
                <input type="radio" name="gender" value="male" />
                Male
              </label>
              <label className="mx-1 px-2">
                <input type="radio" name="gender" value="female" />
                Female
              </label>
            </div>

            <div className="form-control mt-6">
              <SubmitButton pendingLabel="Loading...">Register</SubmitButton>
            </div>
          </form>
          <span className="border-t-2 "></span>
          <SignInBtn />

          <div className="text-sm text-center">
            Already Member ?{" "}
            <Link href="/login" className="link link-accent ">
              {" "}
              Please Login{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
