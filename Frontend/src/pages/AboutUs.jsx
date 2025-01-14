import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from "../assets/About.jpg";

function About() {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: `url(${about})`,
          paddingTop: "64px", // Adjust for navbar height
          paddingBottom: "64px", // Adjust for footer height
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Welcome to our healthcare platform! Our mission is to provide
            comprehensive and accessible healthcare services for individuals and
            families in need. We strive to make health management simple,
            efficient, and patient-focused.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Whether you need to book an appointment, locate a nearby hospital,
            or access valuable health resources, we are here to support your
            well-being. Our team of dedicated professionals is committed to
            enhancing healthcare experiences with innovative technology and a
            personal touch.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Join us on our journey to create a healthier, happier community!
          </p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
