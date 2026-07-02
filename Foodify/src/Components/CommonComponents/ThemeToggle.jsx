import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-brand-orange" />
      ) : (
        <Moon size={20} className="text-brand-dark" />
      )}
    </button>
  );
};

export default ThemeToggle;