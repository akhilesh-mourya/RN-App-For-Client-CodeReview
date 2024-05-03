import {useContext} from 'react';
import {AuthContext, AuthContextProps} from '../../context/authContext';

const useAuth = () => {
  const authContextData = useContext<AuthContextProps>(AuthContext);

  return {authContextData};
};

export default useAuth;
