import axios from "axios";

export default function Admin() {

  const next = async () => {
    await axios.post("http://localhost:5000/api/token/next");
    alert("Next token called");
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <button onClick={next}>Call Next Token</button>
    </div>
  );
}
