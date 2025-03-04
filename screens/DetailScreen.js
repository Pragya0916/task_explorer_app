// screens/DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation, setLoading }) {
  const { task } = route.params;
  const [isCompleted, setIsCompleted] = useState(task.completed);

  useEffect(() => {
    setLoading(false); // Ensure loader stops when page loads
  }, []);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.info}>User ID: {task.userId}</Text>
      <Text style={[styles.status, isCompleted ? styles.completed : styles.incomplete]}>
        {isCompleted ? '✓ Completed' : '✗ Incomplete'}
      </Text>

      <TouchableOpacity
        style={[styles.button, isCompleted ? styles.incompleteButton : styles.completeButton]}
        onPress={toggleCompletion}
      >
        <Text style={styles.buttonText}>
          {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  completed: {
    color: 'green',
  },
  incomplete: {
    color: 'red',
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  completeButton: {
    backgroundColor: 'green',
  },
  incompleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6200ea',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  goBackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
