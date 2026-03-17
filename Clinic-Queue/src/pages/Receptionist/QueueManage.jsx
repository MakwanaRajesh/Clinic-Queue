import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function QueueManage() {
    const [queue, setQueue] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchQueue();
    }, [date]);

    const fetchQueue = async () => {
        try {
            const res = await axios.get(`https://cmsback.sampaarsh.cloud/queue?date=${date}`, {
                headers: { Authorization: "Bearer " + token },
            });
            setQueue(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(
                `https://cmsback.sampaarsh.cloud/queue/${id}`,
                { status: newStatus },
                { headers: { Authorization: "Bearer " + token } }
            );
            fetchQueue();
        } catch (err) {
            console.error("Error updating status", err);
            const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
            alert("Failed to update status: " + errMsg);
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="receptionist" />
            <div style={styles.content}>
                <h2>Manage Queue</h2>
                <div style={styles.controls}>
                    <label>Select Date: </label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={styles.input} />
                    <button onClick={fetchQueue} style={styles.button}>Refresh</button>
                </div>

                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={styles.th}>Token</th>
                            <th style={styles.th}>Patient</th>
                            <th style={styles.th}>Phone</th>
                            <th style={styles.th}>Time slot</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue.map(item => (
                            <tr key={item.id} style={styles.tr}>
                                <td style={styles.td}>{item.tokenNumber}</td>
                                <td style={styles.td}>{item.appointment.patient.name}</td>
                                <td style={styles.td}>{item.appointment.patient.phone || "—"}</td>
                                <td style={styles.td}>{item.appointment.timeSlot}</td>
                                <td style={styles.td}>
                                    <span style={{...styles.badge, ...getBadgeStyle(item.status)}}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    {item.status === 'waiting' && (
                                        <>
                                            <button onClick={() => updateStatus(item.id, 'in-progress')} style={styles.actionBtn}>In progress</button>
                                            <button onClick={() => updateStatus(item.id, 'skipped')} style={styles.skipBtn}>Skip</button>
                                        </>
                                    )}
                                    {item.status === 'in_progress' && (
                                        <button onClick={() => updateStatus(item.id, 'done')} style={styles.actionBtn}>Done</button>
                                    )}
                                    {item.status === 'done' && <span style={{color: '#888'}}>-</span>}
                                    {item.status === 'skipped' && <span style={{color: '#888'}}>-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {queue.length === 0 && <p>No queue items found for this date.</p>}
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
    controls: { marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" },
    input: { padding: "8px", borderRadius: "5px", border: "1px solid #ddd" },
    button: { padding: "8px 15px", backgroundColor: "#fff", border: "1px solid #ddd", cursor: "pointer", borderRadius: "4px" },
    table: { width: "100%", background: "white", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    thead: { borderBottom: "1px solid #eee" },
    th: { padding: "15px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#444" },
    tr: { borderBottom: "1px solid #eee" },
    td: { padding: "15px", fontSize: "14px", color: "#333" },
    badge: { padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "500", display: "inline-block" },
    actionBtn: { padding: "6px 12px", backgroundColor: "#0fa968", color: "white", border: "none", borderRadius: "15px", cursor: "pointer", fontSize: "13px", marginRight: "8px" },
    skipBtn: { padding: "6px 12px", backgroundColor: "#f1f3f5", color: "#444", border: "none", borderRadius: "15px", cursor: "pointer", fontSize: "13px" }
};

export default QueueManage;
