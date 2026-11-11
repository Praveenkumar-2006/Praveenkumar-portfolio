import React, { useState, useEffect } from 'react';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label="Back to top"
      title="Return to top of page"
    >
      <span className="back-to-top-arrow" aria-hidden="true">&uarr;</span>
      <span className="back-to-top-label">TOP</span>
    </button>
  );
};

