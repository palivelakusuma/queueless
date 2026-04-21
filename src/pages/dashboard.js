import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
  const [token, setToken] = useState(null);

  const generate = async () => {
    const res = await axios.post("http://localhost:5000/api/token/generate", {
      userId: "123"
    });
    setToken(res.data.tokenNumber);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={generate}>Get Token</button>
      {token && <h3>Your Token: {token}</h3>}
    </div>
  );
}
