import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration } from '../hooks/authChecker';
import { UserState } from '../constants/types';
import GeneralSideComponents from './SidebarComponents/GeneralSideComponents';
import ClientSidebar from './SidebarComponents/ClientSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import LogoutComponent from './LogoutComponent';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [casesDropDownOpen, setCasesDropDownOpen] = useState(false);

  const dispatch = useDispatch();

  const { currentUser, access } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const handleFixed = () => {
    if (window.scrollY > 10) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const handleCasesDropDownToggle = () => {
    setCasesDropDownOpen(!casesDropDownOpen);
  };

  const handleLogout = LogoutComponent();

  useEffect(() => {
    window.addEventListener('scroll', handleFixed);
    return () => {
      window.removeEventListener('scroll', handleFixed);
    };
  }, []);

  useEffect(() => {
    if (currentUser && access) {
      checkTokenExpiration(access, dispatch);
    }
  }, [currentUser, access, dispatch]);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="">
      <div
        className={[
          fixed
            ? 'fixed left-0 right-0 top-0 z-10 transition-all duration-[2000ms] ease-in-out'
            : '',
          'p-4 h-[70px] bg-gray-200 flex justify-between text-tertiary font-bold border-b-2 border-black',
        ].join(' ')}
      >
        <div className="cursor-pointer flex items-center">
          <img
            src="/src/images/coyLogo-bg.png"
            alt=""
            className="w-12 border-2 border-black rounded-full"
          />
          <Link to="/" className="italic text-xl">
            XYX Solicitor
          </Link>
        </div>

        <div className="">
          <div className="hidden md:flex gap-3 text-xl">
            {currentUser && currentUser !== null ? (
              <div className="gap-3 items-center flex">
                <div className="relative">
                  <p className="absolute rounded-full px-2 bg-red-600 font-bold text-xl top-[-15px]">
                    6
                  </p>
                  <Link to="/notifications">
                    <IoNotifications className="text-3xl" />
                  </Link>
                </div>
                <Link to="/profile">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      currentUser?.profile_image?.url
                        ? currentUser?.profile_image?.url
                        : '/src/images/placeholderImage2.jpg'
                    }
                    alt=""
                  />
                </Link>

                <button className="text-red-600" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">Log In</Link>
                <Link to="register">Register</Link>
              </div>
            )}
          </div>

          <div className="">
            <button className="md:hidden" onClick={handleToggle}>
              {toggle ? (
                <IoMdClose className="text-4xl" />
              ) : (
                <IoMdMenu className="text-4xl" />
              )}
            </button>
            <div
              className={[
                toggle
                  ? 'fade-enter fade-enter-active'
                  : 'hidden fade-exit fade-exit-active',
                'bg-gray-200  border border-l-black z-[9999] absolute md:hidden h-screen top-[70px] w-[30vw] pl-10  pb-10 items-start right-0 text-xl',
              ].join(' ')}
            >
              {currentUser && currentUser !== null ? (
                <div className="ml-[-50px] text-[12px] flex flex-col items-start gap-1 mt-6">
                  <GeneralSideComponents />

                  {currentUser.role === 'client' && <ClientSidebar />}

                  {currentUser.role === 'admin' && (
                    <AdminSidebar
                      handleCasesDropDownToggle={handleCasesDropDownToggle}
                      casesDropDownOpen={casesDropDownOpen}
                    />
                  )}

                  <button
                    className="text-red-600 ml-7 text-[12px] smm:text-[15px] mng:text-[18px]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Link to="/login" className="">
                    Login
                  </Link>
                  <Link to="/register" className="">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
