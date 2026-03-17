import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function MyClinic() {
    const [clinic, setClinic] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const res = await axios.get("https://cmsback.sampaarsh.cloud/admin/clinic", {
                    headers: { Authorization: "Bearer " + token },
                });
                setClinic(res.data);
            } catch (err) {
                console.error("Error fetching clinic", err);
            }
        };
        fetchClinic();
    }, [token]);

    return (
        <div style={styles.layout}>
            <Sidebar role="admin" />
            <div style={styles.content}>
                <h2>My Clinic Info</h2>
                {clinic ? (
                    <div style={styles.card}>
                        <p><strong>Name:</strong> {clinic.name}</p>
                        <p><strong>Code:</strong> {clinic.code}</p>
                        <p><strong>Total Users:</strong> {clinic.userCount}</p>
                        <p><strong>Total Appointments:</strong> {clinic.appointmentCount}</p>
                        <p><strong>Queue Count:</strong> {clinic.queueCount}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    card: { background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginTop: "20px" }
};

export default MyClinic;
