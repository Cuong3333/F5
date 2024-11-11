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
    <div>
      <div>

        <button className="bg-transparent text-primaryColor py-2 px-6 rounded-full font-normal transition-all duration-300 transform hover:scale-105 hover:bg-[#b2f7ef] hover:border-[#b2f7ef] hover:text-black border-2 border-[#4CAF50]">
          {isConfetti ? 'Stop' : 'Yay'}
        </button>

      </div>
    </div>
  );
};

export default ButtonClickSnow;
