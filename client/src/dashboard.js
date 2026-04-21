import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [token, setToken] = useState(null);
  const [peopleAhead, setPeopleAhead] = useState(null);
  const [time, setTime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);

  const generateToken = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await fetch("http://localhost:5000/api/token/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.tokenNumber);
        setPeopleAhead(data.peopleAhead);
        setTime(data.estimatedTime);
      } else {
        alert("Error generating token");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={generateToken}>
        Generate Token
      </button>

      {token && (
        <div style={{ marginTop: "20px" }}>
          <h3>Your Token: {token}</h3>
          <p>People Ahead: {peopleAhead}</p>
          <p>Estimated Time: {time} mins</p>
        </div>
      )}

      <br /><br />

      <button onClick={handleLogout} style={{ background: "red" }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
