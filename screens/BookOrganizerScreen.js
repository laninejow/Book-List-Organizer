import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import favouritesImage from '../assets/favorite.png';
import currentlyReadingImage from '../assets/currently-reading.png';
import readImage from '../assets/read.png';

const { width, height } = Dimensions.get('window');

// Book List Navigation
const BookOrganizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Favourites')}>
        <ImageBackground
          source={favouritesImage}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Favourites</Text>
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
    fontSize: 0.05 * height, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%', 
    height: height * 0.2, 
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  textContainer: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 0.03 * height,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default BookOrganizerScreen;
