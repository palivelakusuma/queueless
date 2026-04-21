import React, { useState } from "react";

function Dashboard() {
  const [token, setToken] = useState(null);
  const [peopleAhead, setPeopleAhead] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  const generateToken = async () => {
    const res = await fetch("http://localhost:5000/api/token/generate", {
      method: "POST"
    });

    const data = await res.json();

    setToken(data.token);
    setPeopleAhead(data.peopleAhead);
    setEstimatedTime(data.estimatedTime);
  };

  const serveNext = async () => {
    await fetch("http://localhost:5000/api/token/next", {
      method: "POST"
    });

    alert("Next person served");
  };

  const logout = () => {
    window.location.href = "/";
  };

  return (
    <div className="card">
      <h2>Dashboard</h2>

      <button onClick={generateToken}>Generate Token</button>

      {token && (
        <>
          <h3>Your Token: {token}</h3>
          <p>People Ahead: {peopleAhead}</p>
          <p>Estimated Time: {estimatedTime} mins</p>
        </>
      )}

      <button onClick={serveNext}>Serve Next</button>

      <button onClick={logout} style={{ background: "red", color: "white" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
