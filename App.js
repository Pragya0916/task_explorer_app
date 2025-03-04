// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#6200ea" />
          </View>
        )}
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#6200ea' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setLoading={setLoading} />}
          </Stack.Screen>
          <Stack.Screen name="Detail">
            {(props) => <DetailScreen {...props} setLoading={setLoading} />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
