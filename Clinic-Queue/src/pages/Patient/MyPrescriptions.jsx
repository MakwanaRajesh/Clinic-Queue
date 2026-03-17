import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function MyPrescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://cmsback.sampaarsh.cloud/prescriptions/my", {
                    headers: { Authorization: "Bearer " + token },
                });
                setPrescriptions(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div style={styles.layout}>
            <Sidebar role="patient" />
            <div style={styles.content}>
                <h2>My Prescriptions</h2>
                <div style={styles.list}>
                    {prescriptions.map(p => (
                        <div key={p.id} style={styles.card}>
                            <p><strong>Medicines:</strong></p>
                            <pre style={styles.pre}>{JSON.stringify(p.medicines, null, 2)}</pre>
                            <p><strong>Notes:</strong> {p.notes}</p>
                        </div>
                    ))}
                    {prescriptions.length === 0 && <p>No prescriptions found.</p>}
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    list: { display: "flex", flexDirection: "column", gap: "10px" },
    card: { background: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    pre: { background: "#eee", padding: "10px", borderRadius: "4px" }
};

export default MyPrescriptions;
