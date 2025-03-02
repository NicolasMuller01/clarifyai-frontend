// src/App.jsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptSection from "@/components/PromptSection";
import PricingSection from "@/components/PricingSection";
import ExplanationSection from "@/components/ExplanationSection";
import ContextSection from "@/components/ContextSection";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedTitle from "@/components/Animated-title";
import TimeSavingSection from "@/components/TimeSaveSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <AnimatedSection>
          <AnimatedTitle />
          {/** <PromptSection />  />*/}
        </AnimatedSection>
        <AnimatedSection>
          <ExplanationSection />
        </AnimatedSection>
        <AnimatedSection>
          <ContextSection />
        </AnimatedSection>
        <AnimatedSection>
          {/**  <PricingSection />  />*/}
          <TimeSavingSection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
