import React, { useContext, useState } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { BookContext } from '../components/BookContext';
import { Entypo } from '@expo/vector-icons';

export default function CurrentlyReading({ navigation }) {
  const { books, moveBook, deleteBook } = useContext(BookContext);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleMoveTo = (id, status) => {
    moveBook(id, status);
    setSelectedBook(null); // Close dropdown
  };

  const handleDelete = (id) => {
    deleteBook(id);
    setSelectedBook(null); // Close dropdown
  };

  const toggleDropdown = (id) => {
    setSelectedBook(selectedBook === id ? null : id);
  };

  const closeDropdown = () => {
    setSelectedBook(null);
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={closeDropdown}>
      <FlatList
        data={books.filter(book => book.status === 'Currently Reading')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <ImageBackground source={{ uri: item.cover }} style={styles.coverImage}>
              <View style={styles.imageOverlay} />
            </ImageBackground>
            <View style={styles.bookInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton} onPress={() => toggleDropdown(item.id)}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
            {selectedBook === item.id && (
              <View style={styles.dropdown}>
                <Text onPress={() => handleMoveTo(item.id, 'To Be Read')}>To Be Read</Text>
                <View style={styles.separator} />
                <Text onPress={() => handleMoveTo(item.id, 'Finished Reading')}>Finished Reading</Text>
                <View style={styles.separator} />
                <Text onPress={() => handleDelete(item.id)} style={styles.delete}>Delete</Text>
              </View>
            )}
          </View>
        )}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  coverImage: {
    width: 60,
    height: 90,
    marginRight: 16,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  moreButton: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    zIndex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  delete: {
    color: 'red',
  },
});

