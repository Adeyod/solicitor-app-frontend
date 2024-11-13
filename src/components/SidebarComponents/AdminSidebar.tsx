import { FcPortraitMode } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import CasesDropDownMenu from '../admin/CasesDropDownMenu';
import { SidebarComponentProps } from '../../constants/types';

const AdminSidebar = ({
  toggle,
  handleCasesDropDownToggle,
  casesDropDownOpen,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start mx-3 smm:mx-5 mt-3 gap-3 font-bold text-white">
      <NavLink
        className={(isActive) => NavLinkComponent(isActive)}
        to="/admin/dashboard"
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Dashboard
        </span>
      </NavLink>

      <NavLink
        className={(isActive) => NavLinkComponent(isActive)}
        to="/admin/clients"
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Clients
        </span>
      </NavLink>

      <button
        className="text-tertiary ml-2"
        onClick={handleCasesDropDownToggle}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Cases
        </span>
      </button>
      {casesDropDownOpen && <CasesDropDownMenu />}

      <NavLink
        to="/admin/appointments"
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Appointments
        </span>
      </NavLink>

      <NavLink
        className={(isActive) => NavLinkComponent(isActive)}
        to="/admin/documents"
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Documents
        </span>
      </NavLink>

      <NavLink
        className={(isActive) => NavLinkComponent(isActive)}
        to="/admin/settings"
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Settings
        </span>
      </NavLink>

      <NavLink
        className={(isActive) => NavLinkComponent(isActive)}
        to="/admin/reports"
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Reports
        </span>
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
