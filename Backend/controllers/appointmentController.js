import mongoose from "mongoose";

export const bookAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, date, time, reason, doctor, hospital, doctorType } = req.body;

    if (!name || !date || !time || !reason || !doctor || !hospital || !doctorType) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    // Check for existing appointment
    const existingAppointment = await Appointment.findOne(
      { doctor, date: parsedDate, time },
      null,
      { session }
    );

    if (existingAppointment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: "This time slot is already booked. Please select another time." });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      user: req.user.id,
      name,
      date: parsedDate,
      time,
      reason,
      doctor,
      hospital,
      doctorType,
    });

    await newAppointment.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error booking appointment:", error.message);
    res.status(500).json({ error: "Server Error." });
  }
};
