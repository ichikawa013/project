import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { gsap } from "gsap";

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError("Failed to fetch appointments.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      setError("Failed to fetch doctors.");
    }
  };

  const handleAddDoctor = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });
      if (response.ok) {
        setSuccess("Doctor added successfully.");
        setNewDoctor({ name: "", specialty: "" });
        fetchDoctors();
      } else {
        throw new Error("Failed to add doctor.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/doctors/${id}`, { method: "DELETE" });
      setSuccess("Doctor removed successfully.");
      fetchDoctors();
    } catch (err) {
      setError("Failed to remove doctor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card ref={cardRef} className="shadow-lg">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <h2 className="text-2xl mt-6 mb-4">Manage Doctors</h2>
          <div className="mb-6 flex gap-4">
            <Input
              placeholder="Doctor Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            />
            <Select
              onValueChange={(value) => setNewDoctor({ ...newDoctor, specialty: value })}
              value={newDoctor.specialty}
              placeholder="Specialty"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Neurologist">Neurologist</SelectItem>
                <SelectItem value="General Practitioner">General Practitioner</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddDoctor}>Add Doctor</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <Button variant="destructive" onClick={() => handleDeleteDoctor(doctor.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h2 className="text-2xl mt-6 mb-4">Appointments</h2>
          <Table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
