import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { SidebarComponentProps } from '../../constants/types';

const ClientSidebar = ({ toggle }: SidebarComponentProps) => {
  return (
    <div className="flex flex-col  items-start mx-5 mt-2 gap-1 font-bold text-white">
      <NavLink
        to="/client/my-appointments"
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
          My Appointments
        </span>
      </NavLink>

      <NavLink
        to="/client/my-cases"
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
          My Cases
        </span>
      </NavLink>
    </div>
  );
};

export default ClientSidebar;
