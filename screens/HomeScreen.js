import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [recommended, setRecommended] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [newInThriller, setNewInThriller] = useState([]);
  const [newInRomance, setNewInRomance] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [fantasy, setFantasy] = useState([]);

  // Fetch books for each category from Google Book API 
  useEffect(() => {
    fetchBooks('fiction', setRecommended);
    fetchBooks('best sellers', setTopRated);
    fetchBooks('thriller', setNewInThriller);
    fetchBooks('romance', setNewInRomance);
    fetchBooks('most popular', setMostPopular);
    fetchBooks('mystery', setMystery);
    fetchBooks('fantasy', setFantasy);
  }, []);

  const fetchBooks = (query, setState) => {
  // Fetch book information: author, publisher and description to display
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`)
      .then(response => response.json())
      .then(data => setState(data.items.filter(item => item.volumeInfo.imageLinks?.thumbnail) || []))
      .catch(error => console.error(error));
  };
  // Display book covers for each book
  const renderBookItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { book: item })}>
      <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail }} style={styles.bookCover} />
    </TouchableOpacity>
  );
  // Display data in rows by category
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/reading-challenge.png')}
        style={styles.challengeImage}
        imageStyle={{ borderRadius: 10 }}
      >
      </ImageBackground>
      <Text style={styles.sectionTitle}>Recommended</Text>
      <FlatList
        horizontal
        data={recommended}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Top Rated</Text>
      <FlatList
        horizontal
        data={topRated}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>New in Thriller</Text>
      <FlatList
        horizontal
        data={newInThriller}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>New in Romance</Text>
      <FlatList
        horizontal
        data={newInRomance}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Most Popular</Text>
      <FlatList
        horizontal
        data={mostPopular}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Mystery</Text>
      <FlatList
        horizontal
        data={mystery}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Fantasy</Text>
      <FlatList
        horizontal
        data={fantasy}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  challengeImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
  },
  challengeTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bookList: {
    paddingBottom: 20,
  },
  bookCover: {
    width: width / 3.5,
    height: width / 2.5,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
});

export default HomeScreen;
