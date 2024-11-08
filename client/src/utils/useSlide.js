import { useEffect } from "react";

const useSlide = () => {
  useEffect(() => {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    const nextSlide = () => {
      let items = document.querySelectorAll('.item');
      document.querySelector('.slide').appendChild(items[0]);
    };

    const prevSlide = () => {
      let items = document.querySelectorAll('.item');
      document.querySelector('.slide').prepend(items[items.length - 1]);
    };

    // Thêm sự kiện khi nhấn nút next và prev
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Tự động chuyển slide sau 10 giây
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      nextButton.removeEventListener('click', nextSlide);
      prevButton.removeEventListener('click', prevSlide);
      clearInterval(interval);
    };
  }, []);
};

export default useSlide;