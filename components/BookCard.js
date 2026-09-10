import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookCard({ title, author, read, isRead, onDelete }) {
  const hasRead = read !== undefined ? read : isRead;

  return (
    <View style={styles.card}>
      <Ionicons 
        name={hasRead ? "checkmark-circle" : "book-outline"} 
        size={24} 
        color={hasRead ? "#2ecc71" : "#7f8c8d"} 
        style={styles.statusIcon}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  author: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  deleteButton: {
    padding: 6,
  },
});
