import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { SidebarComponentProps } from '../../constants/types';

const GeneralSideComponents = ({ toggle }: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start mx-5 mt-10 gap-3 font-bold">
      <NavLink
        to="/profile"
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl" />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'text-[12px] smm:text-[15px] mng:text-[18px]',
          ].join(' ')}
        >
          Profile
        </span>
      </NavLink>

      <NavLink
        to="/change-password"
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
          Change Password
        </span>
      </NavLink>
    </div>
  );
};

export default GeneralSideComponents;
