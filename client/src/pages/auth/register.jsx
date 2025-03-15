import React from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { saveFormData } from "../../../store/form-slice/index";
import {registerUser} from "../../../store/auth-slice/index";
import { useToast } from "@/hooks/use-toast";


const AuthRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {toast} = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  const onSubmit = async (data) => {
    
        dispatch(registerUser(data)).then((data) => {

          console.log(data)
          if(data?.payload?.success) 
            {
              toast({
                title: data?.payload?.message
              }) 
              navigate('/auth/login')
            }  else{
              toast({
                title: data?.payload?.message,
                variant: 'destructive'
              })

            }
        })
        }
    

  return (
    <div className="regForm w-1/2 mx-auto text-center">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Sign up for an account
      </h1>
      <p className="mb-2 mt-1 font-light">
        Already have an account?{" "}
        <Link className="font-medium hover:underline" to="/auth/login">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <input
            className="border-2 border-black rounded-md"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 4, message: "Minimum length must be 4" },
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}

          <input
            className="border-2 border-black rounded-md"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 7, message: "Min length is 7" },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            className="border-2 border-black rounded-md"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 4, message: "Min length is 4" },
              maxLength: { value: 10, message: "Max length is 10" },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <input
            className="w-full border-2 rounded-lg bg-black text-white mx-auto"
            type="submit"
            value="Sign Up"
          />
        </div>
      </form>
    </div>
  );
};


export default AuthRegister;