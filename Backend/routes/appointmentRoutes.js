// appointmentRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Appointment from "../models/appointmentModel.js";
import { bookAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

// Route to get all appointments for a user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Route to book an appointment
router.post("/bookappointment", authMiddleware, async (req, res) => {
    try {
        const { name, date, time, reason, doctor, hospital, doctorType } = req.body;

        if (!name || !date || !time || !reason || !doctor || !hospital || !doctorType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAppointment = new Appointment({
            user: req.user.id,
            name,
            date,
            time,
            reason,
            doctor,
            hospital,
            doctorType,
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
