import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/monoma-logo-white.png';
import defaultAvatar from '../../assets/default-avatar.png';

interface User {
  id: number;
  email: string;
  password: string;
}

interface HeaderProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Header: React.FC<HeaderProps> = ({ setUser }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.backgroundColor = 'white';
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-green" ref={headerRef}>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center lg:flex-1">
          <p className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={logo} alt="" />
          </p>
          <p className="font-semibold">MONOMA</p>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
            <p data-testid='header-title'>DASHBOARD</p>
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`${open ? 'text-green-600' : 'text-gray-900'} flex items-center focus:outline-none`}
                  onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                >
                  <img data-testid="avatar-button" className="h-8 w-8 rounded-full" src={defaultAvatar} alt="Avatar" />
                </Popover.Button>
                {avatarMenuOpen && (
                  <Popover.Panel
                    static
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={() => setAvatarMenuOpen(false)}
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
												<p data-testid="view-profile-text">VIEW PROFILE</p>
                      </Link>
                      <button
												data-testid="logout-button"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        LOG OUT
                      </button>
                    </div>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <p className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </p>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  DASHBOARD
                </Link>
              </div>
              <div className="space-y-2 py-6">
                <Link
                  to="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  VIEW PROFILE
                </Link>
              </div>
              <div className="py-6">
                <button
                  onClick={handleLogout}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
