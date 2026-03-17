import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ role }) {
  const navigate = useNavigate();

  const menus = {
    admin: [
      { name: "My Clinic", path: "dashboard" },
      { name: "Users", path: "users" },
    ],

    patient: [
      { name: "Dashboard", path: "dashboard" },
      { name: "Book Appointment", path: "book" },
      { name: "My Appointments", path: "appointments" },
      { name: "My Prescriptions", path: "prescriptions" },
      { name: "My Reports", path: "reports" },
    ],

    doctor: [
      { name: "Today's Queue", path: "queue" },
      { name: "Add Prescription", path: "prescription" },
      { name: "Add Report", path: "report" },
    ],

    receptionist: [
      { name: "Queue (Manage)", path: "queue" },
      { name: "TV Display", path: "tv" },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>Clinic CMS</h2>

        {menus[role].map((item, index) => (
          <div
            key={index}
            style={styles.menu}
            onClick={() => navigate(`/${role}/${item.path}`)}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#111827",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    padding: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    background: "#1f2937",
  },
  logoutBtn: {
    padding: "12px",
    marginTop: "20px",
    cursor: "pointer",
    borderRadius: "6px",
    background: "#dc3545",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Sidebar;
