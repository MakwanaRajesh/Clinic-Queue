import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.layout}>
      {/* ✅ Sidebar only needs role */}
      <Sidebar role={user.role} />

      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Welcome, {user.name}</h2>

          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </div>

        <div style={styles.page}>
          <h3>{user.role.toUpperCase()} DASHBOARD</h3>
          <p>This is your dashboard page</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
  },
  content: {
    flex: 1,
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    background: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  },
  page: {
    padding: "20px",
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },
};

export default Dashboard;
