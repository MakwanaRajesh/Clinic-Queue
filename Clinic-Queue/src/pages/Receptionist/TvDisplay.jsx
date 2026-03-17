import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function TvDisplay() {
    const [queue, setQueue] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchQueue();
        const interval = setInterval(fetchQueue, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchQueue = async () => {
        try {
            const date = new Date().toISOString().split('T')[0];
            const res = await axios.get(`https://cmsback.sampaarsh.cloud/queue?date=${date}`, {
                headers: { Authorization: "Bearer " + token },
            });
            setQueue(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const currentPatient = queue.find(q => q.status === "in_progress");
    const waitingPatients = queue.filter(q => q.status === "waiting");

    return (
        <div style={styles.layout}>
            <Sidebar role="receptionist" />
            <div style={styles.content}>
                <div style={styles.tvScreen}>
                    <div style={styles.current}>
                        <h2>NOW SERVING</h2>
                        <h1 style={styles.tokenNumber}>
                            {currentPatient ? `Token No. ${currentPatient.tokenNumber}` : '---'}
                        </h1>
                        <h3>{currentPatient ? currentPatient.appointment.patient.name : 'Waiting for next patient...'}</h3>
                    </div>

                    <div style={styles.upNext}>
                        <h2>UP NEXT</h2>
                        <ul style={styles.list}>
                            {waitingPatients.slice(0, 5).map(p => (
                                <li key={p.id} style={styles.listItem}>Token No. {p.tokenNumber}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    tvScreen: { display: "flex", gap: "20px", height: "80vh" },
    current: { flex: 2, background: "#007bff", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "10px" },
    tokenNumber: { fontSize: "80px", margin: "20px 0" },
    upNext: { flex: 1, background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    list: { listStyleType: "none", padding: 0 },
    listItem: { fontSize: "24px", padding: "15px", borderBottom: "1px solid #ddd" }
};

export default TvDisplay;
