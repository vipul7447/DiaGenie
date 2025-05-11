'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const quotes = [
  "Diabetes is not a death sentence. It's a manageable condition.",
  "Eat well, stay active, and monitor your sugar daily.",
  "A small step toward health is a big step against diabetes.",
  "Healthy habits are the best medicine.",
  "Checking your sugar today keeps complications away!",
];

export default function DoctorQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const next = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(next);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image src="/doctor.webp" alt="Doctor" width={500} height={300} />
      <p className={`italic max-w-sm transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        “{quote}”
      </p>
    </div>
  );
}
