import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/rootStackParamList';
import SplashScreen from './src/pages/public/splashScreen/splashScreen';
import Login from './src/pages/public/login/login';
import { Home } from './src/pages/private/home/home';

type RouteType = {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const AppRoutes: RouteType[] = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Home',
    component: Home,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AddWorkoutPlan',
    component: require('./src/pages/private/workout/AddWorkoutPlan').AddWorkoutPlan,
    options: {
      headerShown: false,
    },
  },
];

