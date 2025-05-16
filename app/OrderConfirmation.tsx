import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderConfirmation() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.message}>🎉 Your order has been placed successfully!</Text>
    </View>
  );
}


export const options = {
  headerShown: false, 
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { fontSize: 20, fontWeight: 'bold', color: 'green', textAlign: 'center' },
});
