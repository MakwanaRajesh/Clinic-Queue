import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get("https://cmsback.sampaarsh.cloud/appointments/my", {
                headers: { Authorization: "Bearer " + token },
            });
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const viewDetails = async (id) => {
        try {
            const res = await axios.get(`https://cmsback.sampaarsh.cloud/appointments/${id}`, {
                headers: { Authorization: "Bearer " + token },
            });
            setSelectedAppt(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="patient" />
            <div style={styles.content}>
                <h2>My Appointments</h2>
                <div style={styles.list}>
                    {appointments.map(appt => (
                        <div key={appt.id} style={styles.card}>
                            <p><strong>Date:</strong> {appt.appointmentDate} | <strong>Time:</strong> {appt.timeSlot}</p>
                            <p><strong>Status:</strong> {appt.status}</p>
                            <button onClick={() => viewDetails(appt.id)} style={styles.button}>View Details</button>
                        </div>
                    ))}
                    {appointments.length === 0 && <p>No appointments found.</p>}
                </div>

                {selectedAppt && (
                    <div style={styles.modal}>
                        <h3>Appointment Details</h3>
                        <p><strong>Status:</strong> {selectedAppt.status}</p>
                        {selectedAppt.prescription && (
                            <div>
                                <h4>Prescription</h4>
                                <p>{selectedAppt.prescription.medicines}</p>
                                <p>Notes: {selectedAppt.prescription.notes}</p>
                            </div>
                        )}
                        {selectedAppt.report && (
                            <div>
                                <h4>Report</h4>
                                <p>Diagnosis: {selectedAppt.report.diagnosis}</p>
                                <p>Remarks: {selectedAppt.report.remarks}</p>
                            </div>
                        )}
                        <button onClick={() => setSelectedAppt(null)} style={styles.closeBtn}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    list: { display: "flex", flexDirection: "column", gap: "10px" },
    card: { background: "white", padding: "15px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
    button: { padding: "8px 12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" },
    modal: { background: "white", padding: "20px", borderRadius: "8px", position: "fixed", top: "20%", left: "40%", width: "400px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" },
    closeBtn: { padding: "8px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }
};

export default MyAppointments;
