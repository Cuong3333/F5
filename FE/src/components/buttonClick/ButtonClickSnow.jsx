import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

const ButtonClickSnow = () => {
  const [isConfetti, setIsConfetti] = useState(false); // Cờ theo dõi trạng thái confetti
  const animationFrameId = useRef(null); // Ref lưu trữ ID của requestAnimationFrame

  const startConfetti = () => {
    var duration = 5 * 60 * 1000; // 5 phút (300.000 mili giây)
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: (Math.random() * skew) - 0.2,
        },
        colors: ['#ffffff'],
        shapes: ['circle'],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        animationFrameId.current = requestAnimationFrame(frame);
      }
    }

    animationFrameId.current = requestAnimationFrame(frame);
  };

  const stopConfetti = () => {
    cancelAnimationFrame(animationFrameId.current); // Dừng requestAnimationFrame
    setIsConfetti(false);
  };

  const handleButtonClick = () => {
    if (isConfetti) {
      stopConfetti(); // Dừng confetti nếu đang chạy
    } else {
      setIsConfetti(true);
      startConfetti(); // Bắt đầu lại confetti
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="button-wrapper relative">
        <button
          className="confetti-button px-6 py-3 text-white text-lg font-semibold bg-green-500 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-green-600"
          onClick={handleButtonClick}
        >
          {isConfetti ? 'Stop' : 'Yay'} {/* Hiển thị Stop khi confetti đang chạy */}
        </button>
      </div>
    </div>
  );
};

export default ButtonClickSnow;
