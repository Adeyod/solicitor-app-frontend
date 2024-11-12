import { jwtDecode, JwtPayload } from 'jwt-decode';
import { removeUser } from '../redux/userSlice';
import { Dispatch } from 'redux';

export const checkTokenExpiration = (access: string, dispatch: Dispatch) => {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(access);

  if (decoded.exp) {
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime) {
      dispatch(removeUser());
    }
  }
};
