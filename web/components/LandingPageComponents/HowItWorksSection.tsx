import { steps } from "@/helpers/helpers";
import { FC } from "react";
import StepCard from "./StepCard";

const HowItWorksSection: FC = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-400 text-lg">
          Follow these simple steps to make the most out of your Virtual Study
          Room experience and boost your productivity.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            step={step.step}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
