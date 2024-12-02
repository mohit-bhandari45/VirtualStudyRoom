import Link from "next/link";
import { FC } from "react";

const HeroSection: FC = () => {
  return (
    <section className="relative bg-black text-white min-h-[85vh] flex items-center justify-center px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>

      {/* Content */}
      <div className="relative text-center max-w-4xl z-10">
        <h1 className="text-5xl sm:text-7xl font-bold mb-6">
          Welcome to Your Virtual Study Room
        </h1>
        <p className="text-lg sm:text-2xl text-gray-300 mb-8">
          Collaborate in real-time, stay focused, and achieve your goals
          together. Create a study room, invite friends, and boost productivity.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href={"/auth/signup"}>
            <button className="px-8 py-3 text-lg rounded-md bg-white text-black hover:bg-gray-200">
              Get Started
            </button>
          </Link>
          {/* <button className="px-8 py-3 text-lg rounded-md bg-gray-800 hover:bg-gray-700">
            Join a Room
          </button> */}
        </div>
      </div>

      {/* Illustration (Optional) */}
      <div className="absolute bottom-0 w-full">
        <svg
          className="w-full h-32 sm:h-48 text-gray-900"
          fill="currentColor"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="1"
            d="M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,160C672,128,768,96,864,106.7C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
