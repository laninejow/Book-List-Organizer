import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import favoritesImage from '../assets/favorite.png';
import currentlyReadingImage from '../assets/currently-reading.png';
import readImage from '../assets/read.png';

const { width } = Dimensions.get('window');

const BookOrganizerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Book Shelf</Text> */}
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
    backgroundColor: 'black',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: width * 0.9, 
    height: 175,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title:{
    color:'white',
    fontSize: 45,
  }
});

export default BookOrganizerScreen;
