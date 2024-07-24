import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchResultsScreen = ({ route, navigation }) => {
  const { query } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => {
        setBooks(response.data.items);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { book: item })}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text>{item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResultsScreen;
