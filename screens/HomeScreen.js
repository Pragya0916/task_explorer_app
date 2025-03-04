// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Button 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        setFilteredTasks(JSON.parse(storedTasks));
        setLoading(false);
      } else {
        fetchTasks();
      }
    } catch (error) {
      fetchTasks();
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError(false);
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/todos');
      let data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
      await AsyncStorage.setItem('tasks', JSON.stringify(data));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const filterTasks = (type) => {
    setFilter(type);
    if (type === 'Completed') {
      setFilteredTasks(tasks.filter(task => task.completed));
    } else if (type === 'Incomplete') {
      setFilteredTasks(tasks.filter(task => !task.completed));
    } else {
      setFilteredTasks(tasks);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />;
  if (error) return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>⚠️ Error loading tasks.</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchTasks}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Task Explorer</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Completed', 'Incomplete'].map(type => (
          <TouchableOpacity 
            key={type}
            style={[styles.filterButton, filter === type && styles.activeFilter]}
            onPress={() => filterTasks(type)}
          >
            <Text style={[styles.filterText, filter === type && styles.activeFilterText]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.taskItem, item.completed && styles.completedTask]}
            onPress={() => navigation.navigate('Detail', { task: item })}
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={[styles.taskStatus, item.completed ? styles.taskCompleted : styles.taskIncomplete]}>
              {item.completed ? '✓ Completed' : '✗ Incomplete'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  filterContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 15 
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#6200ea',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
  },
  taskItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  completedTask: {
    backgroundColor: '#d1e7dd',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  taskCompleted: {
    color: 'green',
  },
  taskIncomplete: {
    color: 'red',
  },
  loader: {
    flex: 1, 
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff5722',
    borderRadius: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
