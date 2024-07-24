import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    navigation.navigate('SearchResults', { query });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Books</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter book title or author"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  buttonText:{
    color:'black',
  }
});

export default SearchScreen;
