type NavLinkType = {
  isActive: boolean;
  extraClasses?: string;
};
const NavLinkComponent = ({ isActive, extraClasses }: NavLinkType) => {
  const activeClasses = 'bg-tertiary text-gray-200 rounded-lg';
  const inActiveClasses =
    'text-sm flex items-center gap-1 px-2 py-1 bg-gray-200 w-full text-tertiary';
  const baseClasses = 'px-2 py-1 w-full ';

  return `${baseClasses} ${
    isActive ? activeClasses : inActiveClasses
  } ${extraClasses}`;
};

export default NavLinkComponent;
