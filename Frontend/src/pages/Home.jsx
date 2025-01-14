import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import home from "../assets/homepage.png";
import { gsap } from "gsap";
import Layout from "../components/Format";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquare } from 'lucide-react';
import image from "../assets/image.png";
import group1 from "../assets/Group1.png";
import group2 from "../assets/Group2.png";

function Home() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const imageRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const illustrationImage = imageRef.current;
    const circle1 = circle1Ref.current;
    const circle2 = circle2Ref.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      [circle1, circle2],
      {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
      },
      {
        opacity: 0.8,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.75)",
      }
    )
      .fromTo(
        header,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo(
        [card1, card2, card3],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      )
      .fromTo(
        [card1, card2, card3].map((card) => card.querySelectorAll("h3, p, button, svg")),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      )
      .fromTo(
        illustrationImage,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.5"
      );

    gsap.to([circle1, circle2], {
      y: (i) => ["12px", "-12px"][i],
      rotation: 3,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.5,
    });
  }, []);

  const handleCardHover = (cardRef, isEnter) => {
    gsap.to(cardRef.current, {
      scale: isEnter ? 1.03 : 1,
      boxShadow: isEnter
        ? "0 8px 16px rgba(0,0,0,0.15)"
        : "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <main className="flex-grow relative overflow-hidden">
          <div
            className="relative flex items-start min-h-screen bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${home})` }}
          >
            <div className="absolute inset-0"></div>

            <div className="relative z-10 mt-24 px-6 md:px-16 py-16 flex flex-col md:flex-row justify-between items-center md:items-start w-full">
              <div className="flex-1">
                <h2
                  ref={headerRef}
                  className="text-3xl md:text-4xl text-white font-semibold mb-8 ml-32 md:mb-12 text-center lg:text-left
"
                >
                  Your Health, Our Priority
                </h2>

                <div
                  ref={contentRef}
                  className="flex flex-col gap-8 md:flex-row justify-center md:justify-start flex-wrap"
                >
                  <Card
                    ref={card1Ref}
                    className="bg-blue-600 text-white border-none w-full md:w-72 lg:w-80 shadow-lg transition-all duration-300 hover:bg-blue-700"
                    onMouseEnter={() => handleCardHover(card1Ref, true)}
                    onMouseLeave={() => handleCardHover(card1Ref, false)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Calendar className="h-8 w-8" />
                      <h3 className="text-xl md:text-2xl font-semibold">
                        Book an Appointment
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">
                        Get personalized healthcare at your convenience. Book
                        your appointment now and take the first step towards a
                        healthier life!
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => navigate("/booking")}
                        className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-100"
                      >
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card
                    ref={card2Ref}
                    className="bg-blue-600 text-white border-none w-full md:w-72 lg:w-80 shadow-lg transition-all duration-300 hover:bg-blue-700"
                    onMouseEnter={() => handleCardHover(card2Ref, true)}
                    onMouseLeave={() => handleCardHover(card2Ref, false)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      <MapPin className="h-8 w-8" />
                      <h3 className="text-xl md:text-2xl font-semibold">
                        Nearby Hospitals
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">
                        Find the best healthcare facilities near you. Explore
                        hospitals and clinics available in your area!
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => navigate("/maphospital")}
                        className="w-full mt-14 sm:w-auto bg-white text-blue-600 hover:bg-blue-100"
                      >
                        Find Hospitals
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card
                    ref={card3Ref}
                    className="bg-blue-600 text-white border-none w-full md:w-72 lg:w-80 shadow-lg transition-all duration-300 hover:bg-blue-700"
                    onMouseEnter={() => handleCardHover(card3Ref, true)}
                    onMouseLeave={() => handleCardHover(card3Ref, false)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      <MessageSquare className="h-8 w-8" />
                      <h3 className="text-xl md:text-2xl font-semibold">
                        Chat with Us
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base">
                        Have questions or need assistance? Chat with our
                        healthcare bot for quick and helpful information!
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => navigate("/chatbot")}
                        className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-100"
                      >
                        Start Chat
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              <div className="flex-shrink-0 mt-10 md:mt-0 ml-0 md:ml-8 relative circle-container">
                <div className="absolute -right-20 -top-20 w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                  <img
                    ref={circle1Ref}
                    src={group1}
                    alt=""
                    className="w-full h-full opacity-80"
                  />
                </div>
                <div className="absolute -right-10 -bottom-20 w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
                  <img
                    ref={circle2Ref}
                    src={group2}
                    alt=""
                    className="w-full h-full opacity-80"
                  />
                </div>
                <img
                  ref={imageRef}
                  src={image}
                  alt="Healthcare Illustration"
                  className="relative z-10 w-[250px] md:w-[400px] h-auto"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Home;

