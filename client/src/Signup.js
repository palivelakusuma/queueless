import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await res.json();
      console.log(data); // DEBUG

      if (res.ok) {
        alert("Signup successful");
        navigate("/");
      } else {
        alert(data);
      }
    } catch (error) {
      console.error(error);
      alert("Server not working");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input
  type="email"
  placeholder="Enter Email"
  value={email}
  autoComplete="off"
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Enter Password"
  value={password}
  autoComplete="new-password"
  onChange={(e) => setPassword(e.target.value)}
/>


      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
