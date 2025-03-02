import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const ContextSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // Estado para controlar el mute

  const handleVideoEnd = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted); // Actualizamos el estado según el estado del mute
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 pt-40 pb-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-muted rounded-lg overflow-hidden border border-border order-2 md:order-1">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex items-center justify-center h-full relative">
                {/* Video player without native controls */}
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <video
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    muted={isMuted} // El video estará muteado según el estado
                    playsInline
                    poster="/demoimg.png"
                    onEnded={handleVideoEnd}
                    ref={videoRef}
                  >
                    <source src="/secondvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </AspectRatio>

                {/* Custom mute button */}
                <button
                  className="absolute bottom-4 right-4 p-2 text-indigo-600 bg-white rounded-full shadow-md"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <line
                        x1="2"
                        y1="2"
                        x2="22"
                        y2="22"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>
            </AspectRatio>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Upload Project Context for Better Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your ticket generation by uploading project context files.
              Support for PDF, TXT, JSON, and other formats helps our AI
              understand your project's specific needs.
            </p>

            {/* Bloque añadido */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Support Multiple Formats</h3>
                  <p className="text-muted-foreground">
                    Upload files in PDF, TXT, JSON, or other formats to provide
                    detailed context for your project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Enhanced AI Understanding</h3>
                  <p className="text-muted-foreground">
                    Our AI leverages uploaded context files to better understand
                    your project's unique requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Streamlined Workflow</h3>
                  <p className="text-muted-foreground">
                    Save time and effort by integrating project context directly
                    into ticket generation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
