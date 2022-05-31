import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/AuthContext";
const ForgetPassword = () => {
  const { resetPaswword } = Context();
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPaswword(emailRef.current.value);
      setMessage("check inbox for further instruction");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handelSubmit}
        className="flex flex-col border border-black p-10 rounded-lg gap-2.5 w-1/3"
      >
        <h1 className="text-center text-5xl pb-10 font-bold	">Password Reset</h1>
        {error && (
          <h2 className="text-center bg-red-400 p-2 text-white">{error}</h2>
        )}
        {message && (
          <h2 className="text-center bg-green-300 p-2 text-green-700">
            {message}
          </h2>
        )}

        <label>Email</label>
        <input type="text " className="input" ref={emailRef} />

        <button
          disabled={loading}
          className=" mt-5 rounded-lg bg-blue-500 hover:bg-blue-400 font-bold text-white p-1"
        >
          Reset Passwor
        </button>
        <div className="flex justify-end">
          <Link to="/login" className="link">
            login
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
export default ForgetPassword;
