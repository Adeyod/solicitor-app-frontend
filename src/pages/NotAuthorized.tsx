import { TbError404 } from 'react-icons/tb';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col mt-[-30px] items-center min-h-screen justify-center">
      <p className="text-xl md:text-2xl lg:text-4xl italic font-semibold">
        You are not authorized to view this resource.
      </p>
      <TbError404 className="text-8xl my-4 text-red-600" />
    </div>
  );
};

export default NotAuthorized;
