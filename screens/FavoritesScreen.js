import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          setFavorites(JSON.parse(favorites));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  const openModal = (book, event) => {
    setSelectedBook(book);
    const { pageX, pageY } = event.nativeEvent;
    setModalPosition({ x: pageX, y: pageY });
    setModalVisible(true);
  };

  const moveToCategory = async (category) => {
    try {
      let updatedFavorites = favorites.filter(item => item.id !== selectedBook.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);

      const categoryItems = await AsyncStorage.getItem(category);
      let categoryArray = categoryItems ? JSON.parse(categoryItems) : [];
      categoryArray.push(selectedBook);
      await AsyncStorage.setItem(category, JSON.stringify(categoryArray));
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async () => {
    try {
      let updatedFavorites = favorites.filter(item => item.id !== selectedBook.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", onPress: () => setModalVisible(false), style: "cancel" },
        { text: "OK", onPress: deleteBook }
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { book: item })} style={styles.item}>
      <View style={styles.bookDetails}>
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text>{item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author'}</Text>
      </View>
      <TouchableOpacity onPress={(event) => openModal(item, event)}>
        <Icon name="more-vert" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noBooks}>No favorite books</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContent, { top: modalPosition.y, left: modalPosition.x - 150 }]}>
            <TouchableOpacity style={styles.modalItem} onPress={() => moveToCategory('currentlyReading')}>
              <Text style={styles.modalText}>Move to Currently Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => moveToCategory('read')}>
              <Text style={styles.modalText}>Move to Read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={confirmDelete}>
              <Text style={[styles.modalText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noBooks: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default FavoritesScreen;
