import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (email) {
      dispatch(signup({ email }));
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Signup</h3>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button className="btn btn-success" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}
