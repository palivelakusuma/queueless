import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userId", data.userId);
        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      
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



      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;
