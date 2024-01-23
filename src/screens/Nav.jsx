import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/login';
import Home from '../screens/home';
import Saved from './Saved';
import Settings from './Settings';
import Home_icon from '../../assets/images/home.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddTripS1 from './AddTrip';
const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'bookmark' : 'bookmark-border';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={AddTripS1} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
