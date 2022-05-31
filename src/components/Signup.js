import React, { useRef, useState } from "react";
import { Context } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = Context();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  console.log(currentUser?.email);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Password do not match ");
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigateTo("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col border border-black p-10 rounded-lg gap-2.5 w-1/3 "
        onSubmit={handelSubmit}
      >
        <h1 className="text-center text-6xl pb-10 font-bold">Sign Up</h1>
        {error && (
          <h2 className="text-center bg-red-400 p-2 text-white">{error}</h2>
        )}

        <label>Email</label>
        <input type="text" className="input" ref={emailRef} />
        <label>Password</label>
        <input type="password" className="input " ref={passwordRef} />

        <label>Password confirmation</label>
        <input type="password" className="input " ref={passwordConfirmRef} />
        <button
          disabled={loading}
          className=" mt-5 rounded-lg bg-blue-500 hover:bg-blue-400 font-bold text-white p-1"
        >
          Sign Up
        </button>
      </form>
      <h1>
        Already have an account?
        <Link
          to="/login"
          className="link"
        >
          login
        </Link>
      </h1>
    </>
  );
};

export default Signup;
