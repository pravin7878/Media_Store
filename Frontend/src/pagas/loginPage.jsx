import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import actins
import { resetState } from "../../redux/slices/authSlice";
import { loginUser } from "../../redux/actions/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isError, setisError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error: errorMessage, isLoading, isRegister, isLogged } = useSelector(state => state.auth);



  // for hendeling login form and validate login body
  const hendelLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ email, password });
    if (email === "") {
      setisError("Email is required");
      emailRef.current.focus();
      return;
    }
    if (password === "") {
      setisError("Password is required");
      passwordRef.current.focus();
      return;
    }
    if (password.length < 6) {
      setisError("Password min length must be 6");
      passwordRef.current.focus();
      return;
    }
    setisError("");
    const userData = { email, password };
    dispatch(
      loginUser({
        url: `${import.meta.env.VITE_APP_BACKEND_URL}/user/login`,
        userData,
      })
    );
  };

  const handleNavigateToRegister = () => {
    dispatch(resetState())
    navigate("/user/register")
  }

  useEffect(() => {
    if (isLogged) {
      setisError("")
      toast.success("Login Success!");
      // resetForm
      emailRef.current.value = ""
      passwordRef.current.value = ""

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000)
    }
    if (errorMessage) {
      toast.error(errorMessage.message);
      setisError(errorMessage.message)
    }
  }, [isLogged, errorMessage, navigate]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Now</h2>
        <form onSubmit={hendelLogin}>
          {isError && <p className="text-red-500 mb-3">{isError}</p>}
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your email"
            ref={emailRef}
          />
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter your password"
            ref={passwordRef}
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={handleNavigateToRegister}
          >
            Register here
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
