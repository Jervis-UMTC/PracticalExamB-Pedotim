import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'; 
import BookCard from '../components/BookCard'; 

export default function BookListScreen({ navigation, books, setBooks }) {
  const [motivation, setMotivation] = useState('Loading inspiration...');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => {
        if (!response.ok) throw new Error('Network response failed');
        return response.json();
      })
      .then((data) => {
        if (data && data.content && data.author) {
          setMotivation(`"${data.content}" — ${data.author}`);
        }
      })
      .catch(() => {
        setMotivation('"Think before you speak. Read before you think." — Fran Lebowitz');
      });
  }, []);

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const bookCountText = books.length === 1 ? '1 book saved' : `${books.length} books saved`; 

  return ( 
    <View style={styles.container}> 
      <View style={styles.apiContainer}>
        <Text style={styles.apiText}>{motivation}</Text>
      </View>

      <Text style={styles.headerText}>{bookCountText}</Text> 
      <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} /> 
      
      <FlatList 
        data={books} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => ( 
          <BookCard 
            title={item.title} 
            author={item.author} 
            read={item.read} 
            onDelete={() => handleDeleteBook(item.id)} 
          /> 
        )} 
        style={styles.list} 
        ListEmptyComponent={<Text style={styles.emptyText}>No books yet.</Text>} 
      /> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8f9fa',
  }, 
  apiContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  apiText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
  headerText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
  }, 
  list: { 
    marginTop: 10, 
  }, 
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: 'gray', 
  }, 
});
