import NavLinkComponent from '../NavLinkComponent';
import { NavLink } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';

const CasesDropDownMenu = () => {
  return (
    <div className="flex flex-col ml-3 mt-2 space-y-2">
      <NavLink
        to="/admin/cases/all"
        className={({ isActive }) =>
          NavLinkComponent({
            isActive,
            extraClasses: 'flex items-center gap-2',
          })
        }
      >
        <GoDotFill /> Cases
      </NavLink>

      <NavLink
        to="/admin/cases/archived"
        className={({ isActive }) =>
          NavLinkComponent({
            isActive,
            extraClasses: 'flex items-center gap-2',
          })
        }
      >
        <GoDotFill /> Archived Cases
      </NavLink>
    </div>
  );
};

export default CasesDropDownMenu;
