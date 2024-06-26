import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { BookContext } from '../components/BookContext';

export default function AddBook({ navigation }) {
  const { addBook } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const fetchBookCover = async (title, author) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`);
      const data = await response.json();
      if (data.docs && data.docs.length > 0) {
        const book = data.docs[0];
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAddBook = async () => {
    const cover = await fetchBookCover(title, author);
    if (cover) {
      addBook(title, author, cover);
      setTitle('');
      setAuthor('');
      navigation.navigate('ToBeRead');
    } else {
      Alert.alert('Cover not found', 'Could not find a cover for the provided book title and author.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Author</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />
      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
});
