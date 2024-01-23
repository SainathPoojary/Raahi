import {useContext, useEffect} from 'react';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import {AuthContext} from '../context/AuthProvider';

export default Routes = () => {
  const {user} = useContext(AuthContext);
  return user ? <AppRoute /> : <AuthRoute />;
};
