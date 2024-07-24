import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReadScreen = ({ navigation }) => {
  const [read, setRead] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchRead = async () => {
      try {
        const read = await AsyncStorage.getItem('read');
        if (read) {
          setRead(JSON.parse(read));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRead();
  }, []);

  const openModal = (book, event) => {
    setSelectedBook(book);
    const { pageX, pageY } = event.nativeEvent;
    setModalPosition({ x: pageX, y: pageY });
    setModalVisible(true);
  };

  const moveToCategory = async (category) => {
    try {
      let updatedRead = read.filter(item => item.id !== selectedBook.id);
      await AsyncStorage.setItem('read', JSON.stringify(updatedRead));
      setRead(updatedRead);

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
      let updatedRead = read.filter(item => item.id !== selectedBook.id);
      await AsyncStorage.setItem('read', JSON.stringify(updatedRead));
      setRead(updatedRead);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
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
      {read.length === 0 ? (
        <Text style={styles.noBooks}>No books read yet</Text>
      ) : (
        <FlatList
          data={read}
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
            <TouchableOpacity style={styles.modalItem} onPress={() => moveToCategory('favorites')}>
              <Text style={styles.modalText}>Move to Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => moveToCategory('currentlyReading')}>
              <Text style={styles.modalText}>Move to Currently Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={deleteBook}>
              <Text style={[styles.modalText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalText}>Cancel</Text>
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

export default ReadScreen;
