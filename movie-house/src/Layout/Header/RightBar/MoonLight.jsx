import { useState, useEffect } from 'react';
import { Sun, Moon, Layers } from 'react-feather';

const MoonLight = () => {
  const [theme, setTheme] = useState(() => {
    return JSON.parse(localStorage.getItem('theme')) || 'light-only';
  });

  useEffect(() => {
    document.body.classList.remove('light-only', 'dark-only', 'mix-theme');

    if (theme === 'light-only') {
      document.body.classList.add('light-only');
    } else if (theme === 'dark-only') {
      document.body.classList.add('dark-only');
    } else {
      document.body.classList.add('mix-theme');
    }

    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light-only') return 'dark-only';
      if (prev === 'dark-only') return 'mix-theme';
      return 'light-only';
    });
  };

  const getIcon = () => {
    switch (theme) {
      case 'light-only':
        return <Moon className="right-header-icon" />;
      case 'dark-only':
        return <Sun className="right-header-icon" />;
      default:
        return <Layers className="right-header-icon" />;
    }
  };

  return (
    <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
      {getIcon()}
    </div>
  );
};

export default MoonLight;
