import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import BookOrganizerScreen from '../screens/BookOrganizerScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CurrentlyReadingScreen from '../screens/CurrentlyReadingScreen';
import ReadScreen from '../screens/ReadScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Organizer') {
          iconName = 'library-books';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Organizer" component={BookOrganizerScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={MainTabScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="CurrentlyReading" component={CurrentlyReadingScreen} />
      <Stack.Screen name="Read" component={ReadScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
