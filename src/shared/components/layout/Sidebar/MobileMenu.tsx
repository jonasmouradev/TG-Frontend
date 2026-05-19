import { AnimatePresence, motion } from 'framer-motion';
import { t } from 'i18next';
import { X, Plus, Moon, Sun, Menu } from 'lucide-react';
import { ElementType } from 'react';
import { Button } from '../../ui';
import { useSidebar } from '@shared/contexts/SidebarContext';

interface MobileMenuProps {
  handleNavigation: (path: string) => void;
  navigateList: { label: string; path: string; icon: ElementType; isActive: boolean }[];
  toggleTheme: () => void;
  theme: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ handleNavigation, navigateList, toggleTheme, theme, isOpen, setIsOpen }: MobileMenuProps) => {
  const { toggleMenu } = useSidebar();

  return (
    <>
      <button onClick={toggleMenu} className="m-2 lg:hidden text-primary hover:text-zinc-200 p-2 rounded-lg">
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-2 lg:hidden"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />

            <div className="relative w-72 h-screen dark:bg-zinc-950 border-r dark:border-gray-800 flex flex-col">
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                <h1 className="text-2xl text-primary">Seleto Inc</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary hover:text-zinc-200 transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="flex-1 flex flex-col text-primary p-4">
                {navigateList.map((item, index) => (
                  <motion.li
                    onClick={() => handleNavigation(item.path)}
                    key={index}
                    className={`flex w-full items-center px-4 py-3 my-1 dark:hover:bg-gray-700 transition-colors gap-3 rounded-sm dark:text-zinc-200 relative ${
                      item.isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`}
                  >
                    {item.isActive && <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-l-sm" />}
                    {item.icon && <item.icon size={18} />}
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="p-4">
                <Button className="bg-blue-500 w-full text-white hover:bg-zinc-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('create_vacancy')}
                </Button>
              </div>

              <footer className="flex justify-between px-4 py-4 border-t dark:border-gray-800">
                <span className="text-secondary">{t('theme')}</span>
                <button
                  onClick={toggleTheme}
                  className="text-secondary hover:text-zinc-200 transition-colors p-1 rounded-md hover:bg-zinc-700"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
