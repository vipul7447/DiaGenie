'use client';
import { useEffect, useState } from 'react';
import PredictForm from '@/components/PredictForm';
import DoctorQuote from '@/components/DoctorQuote';

export default function Home() {
  const [dark, setDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme and update DOM + localStorage
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-sky-500 dark:bg-black transition-colors duration-300">
        <div className="absolute top-5 right-5">
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-center max-w-6xl w-full p-10 rounded-2xl shadow-2xl transition-all duration-300 ${dark ? 'bg-black/70 text-white' : 'bg-white text-black'}`}>
          <PredictForm />
          <DoctorQuote />
        </div>
      </div>
    </main>
  );
}
