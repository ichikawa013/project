import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { User } from "lucide-react";

const Navbar = () => {
  const navRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const navItems = navRef.current.querySelectorAll(".nav-item");

    gsap.set(navItems, { y: -50, opacity: 0 });

    gsap.to(navItems, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      onComplete: () => {
        navItems.forEach(item => {
          item.style.transform = "none";
        });
      }
    });

    const hoverAnimation = e => {
      gsap.to(e.target, {
        scale: 1.1,
        duration: 0.2,
        ease: "power1.out"
      });
    };

    const leaveAnimation = e => {
      gsap.to(e.target, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out"
      });
    };

    navItems.forEach(item => {
      item.addEventListener("mouseenter", hoverAnimation);
      item.addEventListener("mouseleave", leaveAnimation);
    });

    return () => {
      navItems.forEach(item => {
        item.removeEventListener("mouseenter", hoverAnimation);
        item.removeEventListener("mouseleave", leaveAnimation);
      });
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {

    localStorage.removeItem("authToken");
    console.log("User logged out");

    // Redirect to the login page
    navigate("/login");

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="w-full overflow-visible z-40 top-0 left-0 fixed bg-blue-400/10 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div>
            <NavLink to="/" className="text-blue-900 font-bold text-xl">
              MedTech
            </NavLink>
          </div>
          <div className="flex-grow flex justify-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-item text-blue-900 font-semibold ${isActive ? "text-blue-700" : ""
                } hover:text-blue-700 transition-colors duration-200`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-item text-blue-900 font-semibold ${isActive ? "text-blue-700" : ""
                } hover:text-blue-700 transition-colors duration-200`
              }
            >
              PROFILE
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-item text-blue-900 font-semibold ${isActive ? "text-blue-700" : ""
                } hover:text-blue-700 transition-colors duration-200`
              }
            >
              ABOUT US
            </NavLink>
          </div>
          <div className="flex items-center relative">
            <button
              onClick={toggleDropdown}
              className="nav-item text-blue-900 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <User size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 top-full">
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </NavLink>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
