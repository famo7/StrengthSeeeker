import { PaperProvider, Text, adaptNavigationTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { CombinedDarkTheme, CombinedDefaultTheme } from './themes/theme';
//import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export default function App () {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  function toggleTheme () {
    setIsDarkTheme(isDark => !isDark);
  }

  const WorkoutScreen = () => {
    return <Text>Workout</Text>
  }

  const PlanScreen = () => {
    return <Text>Plan</Text>
  }

  const renderScene = SceneMap({
    workout: WorkoutScreen,
    plan: PlanScreen,
  });

  const HomeScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'workout', title: 'Workouts' },
      { key: 'plan', title: 'Plans', },
    ]);
    return (
      <TabView
        renderTabBar={props => <TabBar
          {...props}
          labelStyle={{ color: 'black' }}
          indicatorStyle={{ backgroundColor: 'black' }}
          style={{ backgroundColor: '#fff' }} />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    )
  }


  return (
    <PaperProvider theme={theme}>

      <NavigationContainer theme={theme}>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dumbbell" color={color} size={26} />
            ),
          }} name="Home" component={HomeScreen} />

          <Tab.Screen options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }} name="Settings" children={() => <SettingsScreen toggleTheme={toggleTheme} />} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

