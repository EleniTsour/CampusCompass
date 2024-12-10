import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../Context/UserContext';

const Chat = () => {
  const { user } = useUser();
  if (!user) return null
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Chat {user.email}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Chat;