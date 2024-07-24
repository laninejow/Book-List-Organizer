import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import favoritesImage from '../assets/favorite.png';
import currentlyReadingImage from '../assets/currently-reading.png';
import readImage from '../assets/read.png';

const { width, height } = Dimensions.get('window');

const BookOrganizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Favorites')}>
        <ImageBackground
          source={favoritesImage}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Favorites</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CurrentlyReading')}>
        <ImageBackground
          source={currentlyReadingImage}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Currently Reading</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Read')}>
        <ImageBackground
          source={readImage}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Read</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 0.05 * height, // Adjust font size based on screen height
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%', // 90% of the screen width
    height: height * 0.2, // 20% of the screen height
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
  },
  textContainer: {
   
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 0.03 * height, // Adjust font size based on screen height
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default BookOrganizerScreen;
