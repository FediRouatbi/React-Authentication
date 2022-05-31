import React, { useRef, useState } from "react";
import { Context } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = Context();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Password do not match ");
    const promises = [];
    if (emailRef.current.value !== currentUser.email)
      promises.push(updateEmail(emailRef.current.value));
    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value));
    setLoading(true);
    setError("");
    try {
      await Promise.all(promises);
      navigateTo("/");
    } catch {
      setError(" Failed to update account");
    }
    setLoading(false);
    // Promise.all(promises)
    //   .then(() => {
    //     navigateTo("/");
    //   })
    //   .catch(() => {
    //     setError(" Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <form
        className="flex flex-col border border-black p-10 rounded-lg gap-2.5 w-1/3 "
        onSubmit={handelSubmit}
      >
        <h1 className="text-center text-5xl pb-10 font-bold">Update Profile</h1>
        {error && (
          <h2 className="text-center bg-red-400 p-2 text-white">{error}</h2>
        )}

        <label>Email</label>
        <input
          type="text"
          className="input"
          ref={emailRef}
          defaultValue={currentUser.email}
        />
        <label>Password</label>
        <input
          type="password"
          className="input "
          placeholder="leave it blank to keep it the same"
          ref={passwordRef}
        />

        <label>Password confirmation</label>
        <input
          type="password"
          className="input "
          placeholder="leave it blank to keep it the same"
          ref={passwordConfirmRef}
        />
        <button
          disabled={loading}
          className=" mt-5 rounded-lg bg-blue-500 hover:bg-blue-400 font-bold text-white p-1"
        >
          Update
        </button>
      </form>

      <Link to="/" className="link w-1/3 flex justify-end items-center p-1 ">
        <p>Cancel</p>
        <div>
          <AiOutlineArrowRight />
        </div>
      </Link>
    </>
  );
};

export default UpdateProfile;
