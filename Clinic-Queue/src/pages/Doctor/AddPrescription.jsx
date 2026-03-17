import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function AddPrescription() {
    const [apptId, setApptId] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [medicineInput, setMedicineInput] = useState({ name: "", dosage: "", duration: "" });
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.apptId) {
            setApptId(location.state.apptId);
        }
    }, [location]);

    const addMedicine = () => {
        if (medicineInput.name) {
            setMedicines([...medicines, medicineInput]);
            setMedicineInput({ name: "", dosage: "", duration: "" });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `https://cmsback.sampaarsh.cloud/prescriptions/${apptId}`,
                { medicines, notes },
                { headers: { Authorization: "Bearer " + token } }
            );
            setMessage("Prescription added successfully!");
            setTimeout(() => navigate("/doctor/queue"), 2000);
        } catch (err) {
            setMessage(err.response?.data?.error || "Error adding prescription");
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="doctor" />
            <div style={styles.content}>
                <h2>Add Prescription</h2>
                <div style={styles.card}>
                    {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
                    <form onSubmit={handleSave} style={styles.form}>
                        <label>Appointment ID</label>
                        <input type="text" value={apptId} onChange={e => setApptId(e.target.value)} required style={styles.input} />

                        <div style={styles.medicineSection}>
                            <h4>Medicines</h4>
                            <div style={styles.medicineRow}>
                                <input type="text" placeholder="Name" value={medicineInput.name} onChange={e => setMedicineInput({ ...medicineInput, name: e.target.value })} style={styles.input} />
                                <input type="text" placeholder="Dosage" value={medicineInput.dosage} onChange={e => setMedicineInput({ ...medicineInput, dosage: e.target.value })} style={styles.input} />
                                <input type="text" placeholder="Duration" value={medicineInput.duration} onChange={e => setMedicineInput({ ...medicineInput, duration: e.target.value })} style={styles.input} />
                                <button type="button" onClick={addMedicine} style={styles.addBtn}>Add</button>
                            </div>

                            {medicines.length > 0 && (
                                <ul style={styles.medList}>
                                    {medicines.map((m, i) => <li key={i}>{m.name} - {m.dosage} - {m.duration}</li>)}
                                </ul>
                            )}
                        </div>

                        <label>Notes</label>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="3" style={styles.input} />

                        <button type="submit" style={styles.submitBtn}>Save Prescription</button>
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
    medicineSection: { border: "1px solid #ddd", padding: "10px", borderRadius: "4px", marginBottom: "10px" },
    medicineRow: { display: "flex", gap: "5px", marginBottom: "10px" },
    addBtn: { padding: "8px", background: "#6c757d", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" },
    medList: { background: "#f8f9fa", padding: "10px", borderRadius: "4px" },
    submitBtn: { padding: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }
};

export default AddPrescription;
