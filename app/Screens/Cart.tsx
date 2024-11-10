import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Dish {
  name: string;
  category: string;
  price: number;
  imageURL: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Dish[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        const items = storedCart ? JSON.parse(storedCart) : [];
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items: Dish[]) => {
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const updateQuantity = async (dish: Dish, change: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === dish.name) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = async (dish: Dish) => {
    const updatedCart = cartItems.filter((item) => item.name !== dish.name);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const confirmRemove = (dish: Dish) =>
    Alert.alert(
      "Supprimer l'article",
      "Voulez-vous vraiment supprimer cet article du panier ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Oui", onPress: () => removeFromCart(dish) },
      ]
    );

  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {item.price} Dt x {item.quantity}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => updateQuantity(item, -1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityDisplay}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item, 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => confirmRemove(item)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre panier est prêt !</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>Votre panier est vide.</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {total} Dt</Text>
        <Button title="Passer la commande" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  price: {
    fontSize: 18,
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityDisplay: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 5,
  },
  removeButton: {
    marginLeft: 10,
  },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
});

export default Cart;
