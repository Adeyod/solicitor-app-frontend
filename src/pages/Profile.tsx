import { useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserProfileSuccess, loginFailure } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import useHeader from '../hooks/ApiCalls';
import { UserState } from '../constants/types';

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { fetchUserProfile } = useHeader();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const getUserProfile = async () => {
    try {
      const response = await fetchUserProfile();

      console.log('PROFILE RESPONSE:', response);

      if (response) {
        dispatch(getUserProfileSuccess(response));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilePick = () => {
    setSelectedFile(null);
  };
  const handleImgChange = () => {};
  const uploadImage = () => {};

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-10 uppercase italic underline font-bold text-xl md:text-2xl lg:text-3xl">
            My Profile
          </p>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <img
                className="w-[100px] h-[100px] rounded-full lg:w-[150px] lg:h-[150px] mt-5"
                src={'/src/images/placeholderImage2.jpg'}
                alt="profile_image"
              />
              <div className="">
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full"
                    onClick={handleFilePick}
                  >
                    Change Image
                  </button>
                  <button
                    className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full"
                    onClick={uploadImage}
                    disabled={!selectedFile}
                  >
                    Upload Image
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileRef}
                  onChange={handleImgChange}
                />
              </div>
            </div>

            <div className="pl-2 md:text-xl lg:text-2xl">
              <div className="flex text-[16px] items-center gap-4">
                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    first name:{' '}
                  </span>

                  {currentUser?.first_name}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    user name:{' '}
                  </span>
                  {currentUser?.user_name}
                </p>
              </div>
              <div className="flex my-3 gap-4">
                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    last name:{' '}
                  </span>

                  {currentUser?.last_name}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">phone: </span>
                  <input
                    className="w-[50%] text-[14px]"
                    type="text"
                    value={currentUser?.phone_number}
                  />
                </p>
              </div>

              <div className="flex gap-10 my-3 text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">email: </span>
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <button className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full">
              Update profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
