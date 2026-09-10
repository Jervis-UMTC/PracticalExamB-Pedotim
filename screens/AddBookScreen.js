import { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; 

export default function AddBookScreen({ navigation, books, setBooks }) { 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleAddBook = () => {
    if (!title.trim() || !author.trim()) {
      setError('Both title and author are required.');
      return;
    }

    setError('');

    const newBook = {
      id: Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      read: false,
    };

    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    navigation.goBack();
  };

  return ( 
    <View style={styles.container}> 
      <Text style={styles.label}>Book Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter book title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter author name"
        value={author}
        onChangeText={setAuthor}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Add Book" onPress={handleAddBook} />
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#fff',
  }, 
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontWeight: '500',
  },
});
