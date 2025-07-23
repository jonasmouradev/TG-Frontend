import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '@/shared/contexts/Theme/ThemeContext';

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

export default useTheme;
