import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'expo-router';  

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();  
  const calculateTotal = () => {
    return cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      <View style={styles.actions}>
        <Button color="green" title="Remove" onPress={() => removeFromCart(item.id)} />
        <Button color="green" title="Increase" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
        <Button color="green" title="Decrease" onPress={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.total}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => router.push('/OrderConfirmation')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
    marginTop: 5,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 170,
    color: 'red',
  },
  total: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
