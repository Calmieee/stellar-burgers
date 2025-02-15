import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import {
  clearErrors,
  selectRegisterError,
  registerUserThunk,
  loginUserThunk
} from '../../slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const registerErrorText = useSelector(selectRegisterError);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUserThunk(userData)).then(() => {
      dispatch(loginUserThunk(userData));
      return <Navigate to={'/'} />;
    });
  };

  return (
    <RegisterUI
      errorText={registerErrorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
