import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
export const LogIn = () => {
  const { login } = Context();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navTo = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navTo("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col border border-black p-10 rounded-lg gap-2.5 w-1/3"
      >
        <h1 className="text-center text-6xl pb-10 font-bold	">Log In</h1>
        {error && (
          <h2 className="text-center bg-red-400 p-2 text-white">{error}</h2>
        )}
        <label>Email</label>
        <input type="text " className="input" ref={emailRef} />
        <label>Password</label>
        <input type="password" className="input" ref={passwordRef} />
        <button
          disabled={loading}
          className=" mt-5 rounded-lg bg-blue-500 hover:bg-blue-400 font-bold text-white p-1"
        >
          Log In
        </button>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="link ">
            Forgot password?
          </Link>
        </div>
      </form>
      <p>
        Need an account ?
        <Link className="link" to="/signup">
          singup
        </Link>
      </p>
    </>
  );
};
