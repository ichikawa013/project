import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footerSections = footerRef.current.querySelectorAll('div > div');
    
    // Set the initial state before animation
    gsap.set(footerSections, {
      opacity: 1, 
      y: 0
    });
  
    // Animation
    gsap.fromTo(
      footerSections,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  
    const links = footerRef.current.querySelectorAll('a');
  
    const hoverAnimation = (e) => {
      gsap.to(e.target, {
        color: "#10B981", // Tailwind's green-500
        duration: 0.2,
        ease: "power1.out"
      });
    };
  
    const leaveAnimation = (e) => {
      gsap.to(e.target, {
        color: "#1F2937", // Tailwind's gray-800
        duration: 0.2,
        ease: "power1.out"
      });
    };
  
    links.forEach(link => {
      link.addEventListener('mouseenter', hoverAnimation);
      link.addEventListener('mouseleave', leaveAnimation);
    });
  
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', hoverAnimation);
        link.removeEventListener('mouseleave', leaveAnimation);
      });
    };
  }, []);
  

  return (
    <footer ref={footerRef} className="w-full bg-blue-300 shadow-md bottom-0 left-0 z-10 p-4">
      <div className="flex justify-between items-center flex-wrap">
        {/* Left section */}
        <div className="text-gray-800 font-medium">
          &copy; {new Date().getFullYear()} Medtech. All Rights Reserved.
        </div>

        {/* Center section - Quick Links */}
        <div className="flex space-x-4">
          <Link
            to="/privacy"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Right section - Social Media */}
        <div className="flex space-x-4">
          <Link
            to="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Facebook
          </Link>
          <Link
            to="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Twitter
          </Link>
          <Link
            to="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-green-500 transition-colors"
          >
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

