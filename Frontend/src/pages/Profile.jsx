import React, { useState, useEffect } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User } from 'lucide-react';
import defaultBackground from "../assets/homepage.png";
import Format from "@/components/Format";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const token = localStorage.getItem("token");
  
        // Check if token exists
        if (!token) throw new Error('You must log in to view this page.');
  
        // Fetch user details
        const userResponse = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
            "Content-Type": "application/json",
          },
        });
  
        console.log("Token used:", token);
        console.log("User Response:", userResponse);
  
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }
  
        const userData = await userResponse.json();
        setUser(userData);
  
        // Fetch appointments
        const appointmentsResponse = await fetch("http://localhost:5000/api/appointments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
  
        console.log("Appointments Response:", appointmentsResponse);
  
        if (!appointmentsResponse.ok) {
          throw new Error(`Failed to fetch appointments: ${appointmentsResponse.status}`);
        }
  
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message); // Set error message to state
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message to the user
  }

  if (!user) {
    return <div>No user data available.</div>; // Handle case where user data is not available
  }

  const handleCancelAppointment = async (id) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const UserDetails = ({ user }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="flex items-center gap-2 text-blue-900">
        <Phone className="text-blue-500" />
        <span>{user.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-900">
        <MapPin className="text-blue-500" />
        <span>{user.address}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-900">
        <Calendar className="text-blue-500" />
        <span>{user.dob}</span>
      </div>
      <div className="flex items-center gap-2 text-blue-900">
        <User className="text-blue-500" />
        <span>{user.gender}</span>
      </div>
    </div>
  );

  const AppointmentList = ({ appointments, onCancelAppointment }) => (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div>
            <p className="font-semibold text-blue-900">{appointment.date} at {appointment.time}</p>
            <p className="text-sm text-blue-700">Doctor: {appointment.doctor}</p>
            <p className="text-sm text-blue-600">Specialty: {appointment.specialty}</p>
            <p className="text-sm text-blue-500 font-medium">{appointment.status}</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => onCancelAppointment(appointment.id)}
            className="bg-red-500 hover:bg-red-600 mt-2 md:mt-0"
          >
            Cancel
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Format>
      <div
        className="min-h-screen p-4 md:p-8 pt-32"
        style={{
          backgroundImage: `url(${defaultBackground})`,
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto space-y-8 pt-10">
          <Card className="bg-white shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <img src="/placeholder.svg" alt={user.name} className="w-full h-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl bg-blue-300 text-blue-800">
                {user.name ? user.name.split(" ").map((n) => n[0]).join("") : "N/A"}
                </span>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{user.name || "User Name"}</h2>
                <p className="text-blue-100">{user.email || "user@example.com"}</p>
              </div>
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
                Logout
              </Button>
            </div>
            <div className="mt-6 p-6">
              <UserDetails user={user} />
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Edit Profile</Button>
            </div>
          </Card>
          <Tabs defaultValue="appointments" className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex bg-blue-100">
              <button className="flex-1 py-2 px-4 text-blue-600 font-medium focus:outline-none focus:bg-white" data-state="active">Appointments</button>
            </div>
            <div className="p-6">
              <AppointmentList
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
              />
            </div>
          </Tabs>
        </div>
      </div>
    </Format>
  );
};

export default Profile;
