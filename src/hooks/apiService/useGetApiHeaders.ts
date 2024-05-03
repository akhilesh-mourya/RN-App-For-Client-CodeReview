import useAuth from '../context/useAuth';

const useGetApiHeaders = () => {
  const {authContextData} = useAuth();
  const getApiconfig = {
    headers: {
      Authorization: `Bearer ${authContextData?.authToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return {getApiconfig, authToken: authContextData?.authToken};
};

export default useGetApiHeaders;
