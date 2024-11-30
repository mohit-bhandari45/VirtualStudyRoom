import Image from "next/image";
import React from "react";

interface LeftPanelProps {
    src:string
  quote: string;
  shortLine: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ src,quote, shortLine }) => {
  return (
    <div className="hidden md:flex w-1/3 flex-col items-center justify-center bg-black text-white p-10">
      <Image
        src={src}
        alt="Inspirational Quote"
        width={400}
        height={400}
        className="mb-6 rounded-lg"
      />
      <h2 className="text-2xl font-bold text-center">``{quote}</h2>
      <p className="mt-4 text-center text-gray-300">{shortLine}</p>
    </div>
  );
};

export default LeftPanel;
