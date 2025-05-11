'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PredictForm() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      setResult(data.prediction.toString()); // Ensure it's a string
      setConfidence(data.confidence || 'N/A');
    } catch (error) {
      console.error('Error:', error);
      setResult('Error');
      setConfidence('');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = () => {
    if (result === '1') {
      return (
        <>
          <p className="text-red-500 font-bold mt-2">
            ⚠️ You may be diabetic. Please consult a doctor as soon as possible.
          </p>
          <ul className="mt-2 text-sm list-disc list-inside text-red-300">
            <li>Limit sugar and refined carbs</li>
            <li>Exercise regularly</li>
            <li>Drink water, avoid sugary drinks</li>
            <li>Monitor blood sugar levels</li>
            <li>Prioritize sleep and stress management</li>
          </ul>
        </>
      );
    } else if (result === '0') {
      return (
        <>
          <p className="text-green-500 font-bold mt-2">
            ✅ Great! You&#39;re not diabetic.
          </p>
          <ul className="mt-2 text-sm list-disc list-inside text-green-300">
            <li>Maintain a balanced diet</li>
            <li>Stay active and exercise regularly</li>
            <li>Limit intake of processed food and sugar</li>
            <li>Stay hydrated and sleep well</li>
            <li>Go for regular health check-ups</li>
          </ul>
        </>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white/10 dark:bg-black/50">
      <h1 className="text-xl font-semibold mb-4 text-center text-black dark:text-white">
        🩺 Are You Diabetic?
      </h1>

      <textarea
        className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
        placeholder="Paste the patient's report..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <button
        onClick={handlePredict}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Diabetes Status'}
      </button>

      <AnimatePresence>
        {result !== '' && result !== 'Error' && (
          <motion.div
            key="result-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-inner"
          >
            <div className="text-lg font-semibold text-center dark:text-white text-gray-800">
              <strong>Prediction:</strong>{' '}
              {result === '1' ? 'Positive for Diabetes' : 'Negative for Diabetes'}
              <br />
              <strong>Confidence:</strong> {confidence}
            </div>
            {renderMessage()}
          </motion.div>
        )}

        {result === 'Error' && (
          <motion.p
            key="error-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-red-500 font-semibold"
          >
            ❌ Something went wrong. Please try again later.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
