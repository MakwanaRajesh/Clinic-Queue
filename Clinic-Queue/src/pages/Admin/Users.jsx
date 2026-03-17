import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const token = localStorage.getItem("token");

  // fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://cmsback.sampaarsh.cloud/admin/users",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // create user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://cmsback.sampaarsh.cloud/admin/users",
        form,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("User Created ✅");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "doctor",
      });

      fetchUsers(); // refresh list
    } catch (err) {
      alert("Error creating user ❌: " + (err.response?.data?.error || err.message));
      console.error("Full error:", err.response?.data);
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar role="admin" />
      <div style={styles.content}>
        <h2>Clinic Users</h2>
        <p>Add receptionist, doctor, or patient</p>

        {/* FORM */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="patient">Patient</option>
            </select>

            <button type="submit" style={styles.button}>
              Add User
            </button>
          </form>
        </div>

        {/* USERS LIST */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}><strong>{u.role.toUpperCase()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p>No users found in this clinic.</p>}
        </div>
      </div>
    </div>
  );
}

// styles
const styles = {
  layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
  content: { flex: 1, padding: "20px" },
  card: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "20px" },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  input: {
    padding: "8px", borderRadius: "4px", border: "1px solid #ccc"
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "4px",
    fontWeight: "bold"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: { padding: "10px", borderBottom: "2px solid #ddd", textAlign: "left" },
  td: { padding: "10px", borderBottom: "1px solid #ddd" }
};

export default Users;
