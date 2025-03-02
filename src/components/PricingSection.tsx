import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "For small teams",
    features: [
      "20 tickets per month",
      "Basic ticket generation",
      "Email support",
      "1 user",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing teams",
    features: [
      "100 tickets per month",
      "Advanced ticket generation",
      "Priority support",
      "5 users",
      "Template customization",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited tickets",
      "Premium ticket generation",
      "24/7 support",
      "Unlimited users",
      "Custom templates",
      "API access",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-accent/30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl font-bold">Simple and Transparent Plans</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-card rounded-xl shadow-lg p-8 border transition-transform hover:scale-105 animate-in"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.name === "Pro" ? "default" : "outline"}
                disabled // Deshabilitar el botón
              >
                Coming Soon
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
