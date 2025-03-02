import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRef } from "react";

const ExplanationSection = () => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
  };

  return (
    <section className=" bg-gray-50">
      <div className="container pt-40 pb-40">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Convert Text Into Professional Tickets
            </h2>
            <p className="text-lg text-muted-foreground">
              Simply input your requirements in plain English, and our AI will
              automatically transform them into well-structured tickets with
              titles, descriptions, acceptance criteria, and technical details.
            </p>
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Save Time</h3>
                  <p className="text-muted-foreground">
                    Create <b>tickets</b> in seconds instead of minutes or
                    hours.
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Consistent Format</h3>
                  <p className="text-muted-foreground">
                    Ensure all tickets follow the same professional structure.
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Clear Requirements</h3>
                  <p className="text-muted-foreground">
                    AI ensures all critical information is included in each
                    ticket.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg overflow-hidden border border-border">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <video
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                muted
                playsInline
                poster="/demoimg.png"
                onEnded={handleVideoEnd}
                ref={videoRef}
              >
                <source src="/firstvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;
