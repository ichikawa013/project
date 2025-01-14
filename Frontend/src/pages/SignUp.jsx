import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import defaultBackground from "../assets/homepage.png";
import { Layout } from "lucide-react";
import Format from "@/components/Format";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    gender: "male",
    dob: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const errorRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (error) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const { username, gender, dob, address, email, phone, password, confirmPassword } = formData;

    if (!username || !dob || !address || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        gender,
        dob,
        address,
        email,
        phone,
        password,
      });
      console.log("Response:", response.data);

      setSuccessMessage("Registration successful! Redirecting to login...");
      gsap.to(formRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        },
      });
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.inOut",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Format>
      <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${defaultBackground})` }}>
      <div className="flex-grow flex items-center justify-center p-4">
        <Card ref={formRef} className="w-full mt-14 max-w-4xl bg-white/90 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" ref={errorRef} className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert ref={successRef} className="mb-4">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Username", name: "username", type: "text", placeholder: "Enter username" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Address", name: "address", type: "text", placeholder: "Enter address" },
                  { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
                  { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter phone number" },
                  { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
                  { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm password" },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name} className="space-y-2">
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                      id={name}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={handleGenderChange} defaultValue={formData.gender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </Format>
  );
}

export default SignUp;

