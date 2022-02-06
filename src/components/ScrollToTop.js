import React, { useState, useEffect } from 'react';
import StyledScrollButton from './styles/StyledScrollButton.styled.js';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      <StyledScrollButton>
        {isVisible && (
          <button title='Go To Top' onClick={() => scrollToTop()}></button>
        )}
      </StyledScrollButton>
    </>
  );
};

export default ScrollToTop;
