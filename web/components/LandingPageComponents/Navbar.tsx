"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Navbar() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <nav className="flex font-[Helvetica] items-center justify-between px-6 py-4 bg-black text-white shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href={"/"}>Kollab</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <a href="#features" className="text-white hover:text-gray-300">
          Features
        </a>
        <a href="#about" className="text-white hover:text-gray-300">
          About
        </a>
        <a href="#contact" className="text-white hover:text-gray-300">
          Contact
        </a>
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        <Link href={"/auth/login"}>
          <button className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200">
            Log In
          </button>
        </Link>
        <Link href={"/auth/signup"}>
          <button className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
