import { useEffect, useState } from 'react';


const useHighContrast = (): [boolean, () => void] => {
  const [highContrast, setHighContrastMode] = useState(localStorage.getItem('theme') === 'highContrast' ? true : false);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
      localStorage.setItem('theme', 'highContrast');
    } else {
      document.body.classList.remove('high-contrast-mode');
      localStorage.setItem('theme', 'normalContrast');
    }
  }, [highContrast]);

  const togglehighContrastMode = () => {
    setHighContrastMode(!highContrast);
  };

  return [highContrast, togglehighContrastMode];
}

export default useHighContrast;