import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold">Coming Soon...</h3>
          <p className="text-sm text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned!
          </p>

          {/* Enlace a Twitter */}
          <a
            href="https://x.com/NicoMuller90256"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-colors"
          >
            Follow us on Twitter
          </a>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} ClarifyAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
