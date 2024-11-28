'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Github, Linkedin } from 'lucide-react';
import zxcvbn from 'zxcvbn';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Validate in real-time
    validateField(id, value);

    // Check password strength
    if (id === 'password') {
      const result = zxcvbn(value);
      setPasswordStrength({
        score: result.score,
        feedback: result.feedback.warning || ''
      });
    }
  };

  const validateField = (id: string, value: string) => {
    let errorMessage = '';
    switch (id) {
      case 'name':
        errorMessage = value.length < 2 ? 'Name must be at least 2 characters' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = !emailRegex.test(value) ? 'Invalid email format' : '';
        break;
      case 'password':
        errorMessage = value.length < 8 
          ? 'Password must be at least 8 characters' 
          : '';
        break;
      case 'confirmPassword':
        errorMessage = value !== formData.password 
          ? 'Passwords do not match' 
          : '';
        break;
    }

    setErrors(prev => ({
      ...prev,
      [id]: errorMessage
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameError = formData.name.length < 2 ? 'Name must be at least 2 characters' : '';
    const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Invalid email format' : '';
    const passwordError = formData.password.length < 8 ? 'Password must be at least 8 characters' : '';
    const confirmPasswordError = formData.confirmPassword !== formData.password ? 'Passwords do not match' : '';

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    // Check if there are any errors
    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    // Proceed with form submission
    console.log('Form submitted', { 
      name: formData.name, 
      email: formData.email 
    });
  };

  const renderPasswordStrengthBar = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-600'];
    return (
      <div className="flex space-x-1 h-1 mt-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={index} 
            className={`flex-1 rounded ${
              index <= passwordStrength.score 
                ? colors[index] 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const socialSignupButtons = [
    {
      icon: Github,
      text: 'Sign up with GitHub',
      color: 'text-black hover:bg-accent'
    },
    {
      icon: Linkedin,
      text: 'Sign up with LinkedIn',
      color: 'text-black hover:bg-accent'
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/3 flex-col items-center justify-center bg-black text-white p-10">
        <Image
          src="https://imgs.search.brave.com/LIi1vUzQmDCaEhb7juR4p6vDEtk75q0bF_L0XWvvrFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/Ny8yMC8wMC8yNS93/aW5uaW5nLTE1Mjk0/MDJfNjQwLmpwZw"
          alt="Inspirational Quote"
          width={400}
          height={400}
          className="mb-6 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-center">
          &quot;Be the change you wish to see in the world.&quot;
        </h2>
        <p className="mt-4 text-center text-gray-300">
          Every signup is the first step towards greatness.
        </p>
      </div>
      
      {/* Right Section */}
      <div className="flex w-full md:w-2/3 flex-col items-center justify-center bg-white p-10">
        <div className="w-full max-w-lg border rounded-lg p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-black text-center">Sign Up</h1>
          
          {/* Social Signup Options */}
          <div className="space-y-3 mb-6">
            {socialSignupButtons.map(({ icon: Icon, text, color }) => (
              <Button 
                key={text} 
                variant="outline" 
                className={`w-full ${color} flex items-center justify-center`}
              >
                <Icon className="mr-2 h-5 w-5" />
                {text}
              </Button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full ${errors.name ? 'border-red-500' : ''}`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 w-full ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 w-full ${errors.password ? 'border-red-500' : ''}`}
                required
              />
              {renderPasswordStrengthBar()}
              {passwordStrength.feedback && (
                <p className="text-xs text-yellow-600 mt-1">
                  {passwordStrength.feedback}
                </p>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="text-black font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}