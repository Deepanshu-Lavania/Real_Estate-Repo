import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signinStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initialFormData);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      console.log("signInSuccess data is : ",data.rest);
      
      dispatch(signInSuccess(data.rest));
      alert("User signed in successfully");
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto">
      {error && (
        <p className="text-red-500 mt-5 text-sm text-center">{error}</p>
      )}
      <h1 className="text-2xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-2 rounded-lg"
          value={formdata.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-2 rounded-lg"
          value={formdata.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

/* export default function SignIn() {
  const initialFormData = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
      const res = await fetch("/api/auth/signin", {
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
      alert("User created Successfully")
      // setFormdata(initialFormData); 
      navigate('/')
    } catch (err) {
      setError("Error in signup.jsx : ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 max-w-md mx-auto">
      {error && <p className="text-red-500 mt-5 text-sm text-center">{error}</p>}
      <h1 className="text-2xl text-center font-semibold my-7">SignIp</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
} */
