import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/Routes';
import {AuthProvider} from './src/context/AuthProvider';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
