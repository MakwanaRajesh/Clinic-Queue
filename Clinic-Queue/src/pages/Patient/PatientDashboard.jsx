import React from "react";
import Sidebar from "../../components/Sidebar";

function PatientDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div style={styles.layout}>
            <Sidebar role="patient" />
            <div style={styles.content}>
                <h2>Welcome, Patient {user.name}</h2>
                <div style={styles.card}>
                    <p>This is your patient dashboard. Please use the sidebar to book appointments and view your medical records.</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    card: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginTop: "20px" }
};

export default PatientDashboard;
