import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { BookProvider } from './components/BookContext';
import AddBook from './screens/AddBook';
import ToBeRead from './screens/ToBeRead';
import CurrentlyReading from './screens/CurrentlyReading';
import FinishedReading from './screens/FinishedReading';
import theme from './theme';

const Tab = createBottomTabNavigator();

const icons = {
  AddBook: require('./assets/AddBook.png'),
  ToBeRead: require('./assets/ToBeRead.png'),
  CurrentlyReading: require('./assets/CurrentlyReading.png'),
  FinishedReading: require('./assets/FinishedReading.png'),
};

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.primaryColor,
            tabBarInactiveTintColor: theme.textColor,
            tabBarStyle: {
              backgroundColor: theme.secondaryColor,
            },
          }}
        >
          <Tab.Screen
            name="AddBook"
            component={AddBook}
            options={{
              title: 'Add Books',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icons.AddBook}
                  style={{ width: 24, height: 24, tintColor: focused ? theme.primaryColor : theme.textColor }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ToBeRead"
            component={ToBeRead}
            options={{
              title: 'To Be Read',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icons.ToBeRead}
                  style={{ width: 24, height: 24, tintColor: focused ? theme.primaryColor : theme.textColor }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CurrentlyReading"
            component={CurrentlyReading}
            options={{
              title: 'Currently Reading',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icons.CurrentlyReading}
                  style={{ width: 24, height: 24, tintColor: focused ? theme.primaryColor : theme.textColor }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="FinishedReading"
            component={FinishedReading}
            options={{
              title: 'Finished Reading',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icons.FinishedReading}
                  style={{ width: 24, height: 24, tintColor: focused ? theme.primaryColor : theme.textColor }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}
