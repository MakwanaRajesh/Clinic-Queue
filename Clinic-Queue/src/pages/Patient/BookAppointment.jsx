import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

function BookAppointment() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [inputType, setInputType] = useState("text");

    const timeSlots = [
        "09:00-09:15", "09:15-09:30", "09:30-09:45", "09:45-10:00",
        "10:00-10:15", "10:15-10:30", "10:30-10:45", "10:45-11:00",
        "11:00-11:15", "11:15-11:30", "11:30-11:45", "11:45-12:00",
        "14:00-14:15", "14:15-14:30", "14:30-14:45", "14:45-15:00",
        "15:00-15:15", "15:15-15:30", "15:30-15:45", "15:45-16:00",
        "16:00-16:15", "16:15-16:30", "16:30-16:45", "16:45-17:00"
    ];

    const token = localStorage.getItem("token");

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://cmsback.sampaarsh.cloud/appointments",
                { appointmentDate: date, timeSlot: time },
                { headers: { Authorization: "Bearer " + token } }
            );
            setMessage("Appointment booked successfully!");
            setDate("");
            setTime("");
        } catch (err) {
            console.error("Full Error:", err.response?.data || err);
            setMessage("Error: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div style={styles.layout}>
            <Sidebar role="patient" />
            <div style={styles.content}>
                <h2>Book Appointment</h2>
                <div style={styles.card}>
                    {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
                    <form onSubmit={handleBook} style={styles.form}>
                        <label>Date</label>
                        <input 
                            type={inputType} 
                            placeholder="yyyy-mm-dd"
                            onFocus={() => setInputType("date")} 
                            onBlur={() => setInputType("text")} 
                            value={date} 
                            onChange={e => setDate(e.target.value)} 
                            required 
                            style={styles.input} 
                        />

                        <label>Time slot</label>
                        <select value={time} onChange={e => setTime(e.target.value)} required style={styles.input}>
                            <option value="" disabled>Select slot</option>
                            {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>

                        <button type="submit" style={styles.button}>Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    layout: { display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" },
    content: { flex: 1, padding: "20px" },
    card: { background: "white", padding: "20px", borderRadius: "8px", width: "400px", marginTop: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "white", fontSize: "14px", color: "#333" },
    button: { padding: "10px", width: "100px", backgroundColor: "#0fa968", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }
};

export default BookAppointment;
