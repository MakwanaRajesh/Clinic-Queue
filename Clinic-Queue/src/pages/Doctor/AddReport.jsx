import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function AddReport() {
    const [apptId, setApptId] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [tests, setTests] = useState("");
    const [remarks, setRemarks] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.apptId) {
            setApptId(location.state.apptId);
        }
    }, [location]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const testsArr = tests.split(",").map(t => t.trim()).filter(t => t);
            await axios.post(
                `https://cmsback.sampaarsh.cloud/reports/${apptId}`,
                { diagnosis, tests: testsArr, remarks },
                { headers: { Authorization: "Bearer " + token } }
            );
            setMessage("Report added successfully!");
            setTimeout(() => navigate("/doctor/queue"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.error || "Error adding report");
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="doctor" />
            <div style={styles.content}>
                <h2>Add Report</h2>
                <div style={styles.card}>
                    {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
                    <form onSubmit={handleSave} style={styles.form}>
                        <label>Appointment ID</label>
                        <input type="text" value={apptId} onChange={e => setApptId(e.target.value)} required style={styles.input} />

                        <label>Diagnosis</label>
                        <input type="text" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required style={styles.input} />

                        <label>Tests (comma separated)</label>
                        <input type="text" value={tests} onChange={e => setTests(e.target.value)} placeholder="e.g. Blood Test, X-Ray" style={styles.input} />

                        <label>Remarks</label>
                        <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" style={styles.input} />

                        <button type="submit" style={styles.submitBtn}>Save Report</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    card: { background: "white", padding: "20px", borderRadius: "8px", width: "500px", marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
    submitBtn: { padding: "10px", background: "#17a2b8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }
};

export default AddReport;
