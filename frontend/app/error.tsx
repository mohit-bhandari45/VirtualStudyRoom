"use client"

// app/error.tsx
import React from 'react';

interface ErrorProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  console.error(error); // Log the error for debugging
  return <div>Something went wrong!</div>;
};

export default ErrorPage;
