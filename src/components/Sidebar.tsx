import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { UserState } from '../constants/types';
import { useState } from 'react';
import GeneralSideComponents from './SidebarComponents/GeneralSideComponents';
import ClientSidebar from './SidebarComponents/ClientSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import LogoutComponent from './LogoutComponent';

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [casesDropDownOpen, setCasesDropDownOpen] = useState(false);

  const handleLogout = LogoutComponent();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleCasesDropDownToggle = () => {
    setCasesDropDownOpen(!casesDropDownOpen);
  };

  return (
    <div className="">
      <div
        className={[
          toggle ? 'w-10' : 'min-w-[180px]',
          ' bg-gray-200 h-full relative bottom-0 transition-all duration-300 hidden md:flex flex-col border-r-2 border-black',
        ].join(' ')}
      >
        <div className="absolute right-3 top-3" onClick={handleToggle}>
          {toggle ? (
            <IoMdClose className="text-2xl " />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </div>

        {currentUser && <GeneralSideComponents toggle={toggle} />}

        {currentUser.role === 'client' && <ClientSidebar toggle={toggle} />}

        {currentUser.role === 'admin' && (
          <AdminSidebar
            toggle={toggle}
            handleCasesDropDownToggle={handleCasesDropDownToggle}
            casesDropDownOpen={casesDropDownOpen}
          />
        )}
        <button
          className="text-red-600 font-bold ml-[-90px] text-[12px] smm:text-[15px] mng:text-[18px]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
