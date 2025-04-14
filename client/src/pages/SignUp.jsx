import js from "@eslint/js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // clear previous errors
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }
      console.log(data);
      setFormdata(initialFormData); // optional reset
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto">
      {error ? (
        <div className="h-screen flex justify-center items-center">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl text-center font-semibold my-7">SignUp</h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="username"
              id="username"
              className="border p-2 rounded-lg"
              value={formdata.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name=""
              placeholder="email"
              id="email"
              className="border p-2 rounded-lg"
              value={formdata.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name=""
              placeholder="password"
              id="password"
              className="border p-2 rounded-lg"
              value={formdata.password}
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to="/signin">
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
