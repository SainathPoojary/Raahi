import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Nav from '../screens/Nav';
import Profile from '../screens/Profile';
import AddStep from '../screens/AddStep';
import Steps from '../screens/Steps';
import Posts from '../screens/Posts';
import Post from '../screens/Post';
import Preview from '../screens/Preview';

const Stack = createNativeStackNavigator();
export default AuthRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="nav" component={Nav} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="addSteps" component={AddStep} />
      <Stack.Screen name="steps" component={Steps} />
      <Stack.Screen name="posts" component={Posts} />
      <Stack.Screen name="post" component={Post} />
      <Stack.Screen name="preview" component={Preview} />
    </Stack.Navigator>
  );
};
