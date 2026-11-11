import React, { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Fallback
    }
    return 'dark';
  });

  // Sync state with DOM on mount
  useEffect(() => {
    let currentTheme: 'dark' | 'light' = 'dark';
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved === 'dark' || saved === 'light') {
        currentTheme = saved;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        currentTheme = 'light';
      }
    } catch {
      currentTheme = 'dark';
    }

    setTheme(currentTheme);
    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', currentTheme === 'light' ? '#ECEEF1' : '#171C28');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);

    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Ignore localStorage permission errors
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', nextTheme === 'light' ? '#ECEEF1' : '#171C28');
    }
  };

  const nextLabel = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${theme}`}
      aria-label={`${theme} theme active. Switch to ${nextLabel} theme`}
    >
      <svg
        className="theme-toggle-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="1"
          y="1"
          width="7"
          height="14"
          fill="currentColor"
        />
      </svg>
      <span className="theme-toggle-label">{theme}</span>
    </button>
  );
};
