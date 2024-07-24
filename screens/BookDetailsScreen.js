import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          const favoritesArray = JSON.parse(favorites);
          const isFav = favoritesArray.some(favBook => favBook.id === book.id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFavorite();
  }, [book.id]);

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];
      if (isFavorite) {
        favoritesArray = favoritesArray.filter(favBook => favBook.id !== book.id);
      } else {
        favoritesArray.push(book);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);
      alert(isFavorite ? 'Book removed from favorites' : 'Book added to favorites');
    } catch (error) {
      console.error(error);
    }
  };

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
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Icon name={isFavorite ? 'favorite' : 'favorite-border'} size={30} color="red" />
      </TouchableOpacity>
    </ScrollView>
  );
};

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
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default BookDetailsScreen;
