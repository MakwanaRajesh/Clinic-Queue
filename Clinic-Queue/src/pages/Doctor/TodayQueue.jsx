import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function TodayQueue() {
    const [queue, setQueue] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            const res = await axios.get("https://cmsback.sampaarsh.cloud/doctor/queue", {
                headers: { Authorization: "Bearer " + token },
            });
            console.log("Doctor Queue API response:", res.data);
            setQueue(res.data);
        } catch (err) {
            console.error("Error fetching queue", err);
            const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
            alert("Failed to fetch doctor queue: " + errMsg);
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="doctor" />
            <div style={styles.content}>
                <h2>Today's Queue</h2>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Token</th>
                            <th style={styles.th}>Patient</th>
                            <th style={styles.th}>Time slot</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue.map(item => (
                            <tr key={item.id} style={styles.tr}>
                                <td style={styles.td}>{item.tokenNumber}</td>
                                <td style={styles.td}>{item.appointment?.patient?.name || item.patient?.name || "Unknown"}</td>
                                <td style={styles.td}>{item.appointment?.timeSlot || item.timeSlot || "—"}</td>
                                <td style={styles.td}>
                                    <span style={{...styles.badge, ...getBadgeStyle(item.status)}}>
                                        {item.status || "waiting"}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button style={styles.btnPrimary} onClick={() => navigate("/doctor/prescription", { state: { apptId: item.appointmentId } })}>
                                        Prescription
                                    </button>
                                    <button style={styles.btnSecondary} onClick={() => navigate("/doctor/report", { state: { apptId: item.appointmentId } })}>
                                        Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {queue.length === 0 && <p>No patients in queue today.</p>}
            </div>
        </div>
    );
}

const getBadgeStyle = (status) => {
    switch(status) {
        case 'waiting': return { backgroundColor: '#fff3cd', color: '#856404' };
        case 'in_progress': 
        case 'in-progress': return { backgroundColor: '#cce5ff', color: '#004085' };
        case 'done': return { backgroundColor: '#d4edda', color: '#155724' };
        case 'skipped': return { backgroundColor: '#e2e3e5', color: '#383d41' };
        default: return { backgroundColor: '#f8f9fa', color: '#333' };
    }
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    table: { width: "100%", background: "white", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    thead: { borderBottom: "1px solid #eee" },
    th: { padding: "15px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#444" },
    tr: { borderBottom: "1px solid #eee" },
    td: { padding: "15px", fontSize: "14px", color: "#333" },
    badge: { padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "500", display: "inline-block" },
    btnPrimary: { padding: "6px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "15px", cursor: "pointer", fontSize: "13px", marginRight: "8px" },
    btnSecondary: { padding: "6px 12px", background: "#17a2b8", color: "white", border: "none", borderRadius: "15px", cursor: "pointer", fontSize: "13px" }
};

export default TodayQueue;
