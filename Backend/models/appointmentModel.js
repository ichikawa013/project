import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    doctor: { type: String, required: true },
    hospital: { type: String, required: true },
    doctorType: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure unique booking for the same doctor, date, and time slot
appointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
