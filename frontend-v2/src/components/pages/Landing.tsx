// src/pages/Landing.tsx
"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Landing: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleGo = () => {
    if (query.trim()) {
      navigate(`/dashboard?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* 🎬 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
      >
        <source src='/assets/stock-background-1.mp4' type='video/mp4' />
      </video>

      {/* 🖤 Overlay Tint */}
      <div className='absolute inset-0 bg-black/60' />

      {/* ✨ Centered Hero Section */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          Start by finding your favorite stock
        </h1>
        <p className='text-lg text-gray-300 mb-8 max-w-md'>
          Search any stock symbol or company name to explore insights and
          predictions.
        </p>

        <div className='flex w-full max-w-md gap-2'>
          <Input
            placeholder='e.g. AAPL, TSLA, TCS...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='bg-white/90 text-gray-800 placeholder-gray-500'
          />
          <Button
            onClick={handleGo}
            className='px-6 text-lg font-medium bg-blue-600 hover:bg-blue-700'
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
