import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import defaultBackground from "../assets/homepage.png";
import Layout from "../components/Format";

const doctors = ["Dr. John Doe", "Dr. Sarah Smith", "Dr. Emily Johnson"];
const hospitals = ["City Hospital", "Green Valley Clinic", "Metro Medical Center"];
const doctorTypes = ["Cardiologist", "Dietitian", "Neurologist", "General Practitioner"];

const AppointmentBooking = () => {
    const [formData, setFormData] = useState({
        name: "",
        date: new Date(),
        time: "",
        reason: "",
        doctor: "",
        hospital: "",
        doctorType: "",
    });
    const [nearbyHospitals, setNearbyHospitals] = useState([]);
    const [status, setStatus] = useState("");

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const { name, date, time, reason, doctor, hospital, doctorType } = formData;

        if (!name || !date || !time || !reason || !doctor || !hospital || !doctorType) {
            setStatus("Please fill in all fields.");
            return;
        }

        const newAppointment = { name, date, time, reason, doctor, hospital, doctorType };

        try {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
            const res = await fetch("http://localhost:5000/api/appointments/bookappointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Pass the token here
            },
            body: JSON.stringify(newAppointment),
        });
        
            console.log('New appointment booked:', newAppointment);

            if (res.ok){
                setStatus("Appointment booked successfully!");
                setFormData({
                    name: "",
                    date: new Date(),
                    time: "",
                    reason: "",
                    doctor: "",
                    hospital: "",
                    doctorType: "",
                });
            }
            else {
                const errorData = await res.json();
                setStatus(errorData.error || "Failed to book the appointment. Please try again.");
            }
        }
        catch(error) {
            console.error("Error", error);
            setStatus("An error occured. Please try again.")
        }
    };

    const fetchNearbyPlaces = async () => {
        if (!searchQuery.trim()) {
            alert("Please enter a valid search term.");
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/places?query=${searchQuery}`, {
                method: "GET",
            });
    
            if (response.ok) {
                const data = await response.json();
                setPlaces(data.places || []);
            } else {
                console.error("Failed to fetch places.");
                setPlaces([]);
            }
        } catch (error) {
            console.error("Error:", error);
            setPlaces([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${defaultBackground})`, backgroundBlendMode: 'overlay' }}>
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-bold text-center text-blue-800 my-8 shadow-text">Healthcare Appointment System</h1>
                    <Card className="w-full bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-blue-600 text-white p-6">
                            <CardTitle className="text-3xl font-bold text-center">Book Your Appointment</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="space-y-6 lg:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="text-lg font-semibold text-blue-800">Patient's Name</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => handleChange("name", e.target.value)}
                                                    placeholder="Your full name"
                                                    className="mt-1 bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="time" className="text-lg font-semibold text-blue-800">Time</Label>
                                                <Input
                                                    id="time"
                                                    type="time"
                                                    value={formData.time}
                                                    onChange={(e) => handleChange("time", e.target.value)}
                                                    className="mt-1 bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <Label htmlFor="doctorType" className="text-lg font-semibold text-blue-800">Doctor Type</Label>
                                                <Select onValueChange={(value) => handleChange("doctorType", value)} className="mt-1">
                                                    <SelectTrigger className="bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                                                        <SelectValue placeholder="Select doctor type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {doctorTypes.map((type) => (
                                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="hospital" className="text-lg font-semibold text-blue-800">Hospital</Label>
                                                <Select onValueChange={(value) => handleChange("hospital", value)} className="mt-1">
                                                    <SelectTrigger className="bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                                                        <SelectValue placeholder="Select a hospital" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {hospitals.map((hospital) => (
                                                            <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="doctor" className="text-lg font-semibold text-blue-800">Doctor</Label>
                                                <Select onValueChange={(value) => handleChange("doctor", value)} className="mt-1">
                                                    <SelectTrigger className="bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                                                        <SelectValue placeholder="Select a doctor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {doctors.map((doctor) => (
                                                            <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="reason" className="text-lg font-semibold text-blue-800">Reason for Appointment</Label>
                                            <Textarea
                                                id="reason"
                                                value={formData.reason}
                                                onChange={(e) => handleChange("reason", e.target.value)}
                                                placeholder="Brief reason for appointment"
                                                className="mt-1 h-32 bg-white/50 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <Label className="text-lg font-semibold text-blue-800 mb-2 block">Select Date</Label>
                                            <Calendar
                                                mode="single"
                                                selected={formData.date}
                                                onSelect={(date) => handleChange("date", date)}
                                                className="rounded-md border border-blue-300 bg-white/50 ps-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 text-lg font-semibold">
                                        Book Appointment
                                    </Button>
                                </div>
                                {status && (
                                    <p className={`mt-4 text-center text-lg font-semibold ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                        {status}
                                    </p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default AppointmentBooking;

