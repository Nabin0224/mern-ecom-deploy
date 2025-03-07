import React from "react";
import { useForm } from "react-hook-form";
import { Link, Links } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/auth-slice/index"

import { useToast } from "@/hooks/use-toast";

const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {toast} = useToast();
  const onSubmit = (data) => {

  dispatch(loginUser(data)).then((data) => {
    
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    }
  )}
      
  

  return (
    <div className="logForm w-1/2 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Create a New Account
        </h1>
        <p className="mb-2 mt-1 font-light">
          Don't have an account
          <Link className="font-medium hover:underline" to="/auth/register">
            {" "}
            Register
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="flex flex-col gap-5">
            <input
              className="border-2 border-black rounded-md"
              type="email"
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "This filed is required" },
                minLength: { value: 7, message: "Minimum length is 7" },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <input
              className="border-2 border-black rounded-md"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 4, message: "Minimum lenght is 4" },
                maxLength: { value: 10, message: "Maximum lenght is 10" },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <input
              className="w-full border-2 rounded-lg bg-black text-white mx-auto"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
