import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Layout from '../components/Format';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import defaultBackground from "../assets/homepage.png";
import { ArrowLeft, MessageCircle } from 'lucide-react';

function Chatbot() {
  const navigate = useNavigate();
  const chatbotRef = useRef(null);
  const headerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const chatbot = chatbotRef.current;
    const header = headerRef.current;
    const iframe = iframeRef.current;

    gsap.fromTo(
      chatbot,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      header,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    );

    gsap.fromTo(
      iframe,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <Layout>
      <div 
        className="flex flex-col min-h-screen mt-10 bg-gradient-to-b from-blue-100 to-white" 
        style={{
          backgroundImage: `url(${defaultBackground})`,
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <main className="flex-grow flex items-center justify-center p-4">
          <Card
            ref={chatbotRef}
            className="w-full max-w-4xl h-[90vh] shadow-2xl border-none bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/50 overflow-hidden"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <div 
                ref={headerRef}
                className="flex items-center justify-between p-4 bg-blue-600 text-white"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/')}
                  className="text-white hover:bg-blue-700"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <h2 className="text-2xl font-semibold flex items-center">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Healthcare Assistant
                </h2>
                <div className="w-10" /> {/* Spacer for alignment */}
              </div>
              <div className="flex-grow w-full p-4">
                <div className="w-full h-full rounded-lg overflow-hidden shadow-inner">
                  <iframe
                    ref={iframeRef}
                    src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/13/06/20250113063608-2L8CA5UY.json"
                    width="100%"
                    height="100%"
                    style={{
                      border: 'none',
                      borderRadius: '8px',
                      height: '100%',
                    }}
                    title="Healthcare Chatbot"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </Layout>
  );
}

export default Chatbot;

