import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: CardProps) => {
  return (
    <div className="group relative p-6 bg-gray-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-800 duration-300">
      {/* Glowing Border Effect */}
      <div className="relative z-10 cursor-pointer flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-800 text-3xl rounded-full mb-4 transition-transform transform group-hover:rotate-12">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-200">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
