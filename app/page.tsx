'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Timer logic to count down from 5 minutes
  useEffect(() => {
    let interval = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000); // Decrease every second
    } else if (countdown === 0 && timerActive) {
      setTimerActive(false); // Reset after countdown
    }

    return () => clearInterval(interval);
  }, [countdown, timerActive]);

  // Handle button click
  const handleClick = () => {
    const randomChance = Math.random();
    if (randomChance > 0.1) {
      // Success: Show "You win" message
      setMessage('You win! Click here to download YumeKey 3.');
      setToggle(true);
    } else {
      // Failure: Redirect to wikipedia
      window.location.href = 'https://www.wikipedia.com';
    }
  };

  return (
    <div className='m-auto w-max text-center'>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${timerActive ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={timerActive}
      >
        {timerActive ? `Wait ${Math.floor(countdown / 60)}:${('0' + countdown % 60).slice(-2)} minutes` : 'Click me!'}
      </button>

      {toggle && (
        <div className='mt-4'>
          <p>{message}</p>
          <a href='https://www.google.com' className='text-blue-500 underline'>
            Google
          </a>
        </div>
      )}
    </div>
  );
}

