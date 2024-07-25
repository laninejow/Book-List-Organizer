import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const favourites = await AsyncStorage.getItem('favourites');
        if (favourites) {
          const favouritesArray = JSON.parse(favourites);
          const isFav = favouritesArray.some(favBook => favBook.id === book.id);
          setIsFavourite(isFav);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFavourite();
  }, [book.id]);

  // Ability to add book to favourites list
  const toggleFavourite = async () => {
    try {
      const favourites = await AsyncStorage.getItem('favourites');
      let favouritesArray = favourites ? JSON.parse(favourites) : [];
      if (isFavourite) {
        favouritesArray = favouritesArray.filter(favBook => favBook.id !== book.id);
      } else {
        favouritesArray.push(book);
      }
      await AsyncStorage.setItem('favourites', JSON.stringify(favouritesArray));
      setIsFavourite(!isFavourite);
      alert(isFavourite ? 'Book removed from favourites' : 'Book added to favourites');
    } catch (error) {
      console.error(error);
    }
  };

  // Grabs the book information (Title, Author, Publisher, Description) from API and displays
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
        <Image source={{ uri: book.volumeInfo.imageLinks.thumbnail }} style={styles.coverImage} />
      )}
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Author: <Text style={styles.content}>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</Text></Text>
        <Text style={styles.heading}>Publisher: <Text style={styles.content}>{book.volumeInfo.publisher}</Text></Text>
        <Text style={styles.heading}>Description: <Text style={styles.content}>{book.volumeInfo.description}</Text></Text>
      </View>
      <TouchableOpacity style={styles.favouriteButton} onPress={toggleFavourite}>
        <Icon name={isFavourite ? 'favorite' : 'favorite-border'} size={30} color="red" />
      </TouchableOpacity>
    </ScrollView>
  );
};
// styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  coverImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  textContainer: {
    alignSelf: 'stretch',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
  },
  content: {
    fontWeight: 'normal',
  },
  favouriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default BookDetailsScreen;
