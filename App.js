import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';

const Stack = createNativeStackNavigator();
const STORAGE_KEY = '@book_logs';

export default function App() {
  const [books, setBooks] = useState([
    { id: '1', title: 'Noli Me Tangere', author: 'Jose Rizal', read: true },
    { id: '2', title: 'The Hobbit', author: 'J.R.R. Tolkien', read: false },
  ]);
  const isLoaded = useRef(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const savedBooks = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedBooks !== null) {
          setBooks(JSON.parse(savedBooks));
        }
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        isLoaded.current = true;
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    const saveBooks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (error) {
        console.error('Failed to save books:', error);
      }
    };
    saveBooks();
  }, [books]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookList">
        <Stack.Screen name="BookList" options={{ title: 'My Reading Log' }}>
          {(props) => (
            <BookListScreen {...props} books={books} setBooks={setBooks} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddBook" options={{ title: 'Add Book' }}>
          {(props) => (
            <AddBookScreen {...props} books={books} setBooks={setBooks} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
