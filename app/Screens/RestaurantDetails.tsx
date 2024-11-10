import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../Config/FirebaseHelper";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Dish {
  name: string;
  category: string;
  price: number;
  imageURL: string;
}

interface RestaurantDetailsProps {
  route: any;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [filteredItems, setFilteredItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Dish[]>([]);

  const cacheKey = `menuItems_${restaurantId}`;
  const restaurantCacheKey = `restaurant_${restaurantId}`;

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setLoading(true);
      try {
        const cachedRestaurant = await AsyncStorage.getItem(restaurantCacheKey);
        if (cachedRestaurant) {
          setRestaurant(JSON.parse(cachedRestaurant));
        } else {
          const docSnap = await getDoc(doc(db, "restaurants", restaurantId));
          if (docSnap.exists()) {
            const restaurantData = docSnap.data();
            setRestaurant(restaurantData);
            await AsyncStorage.setItem(
              restaurantCacheKey,
              JSON.stringify(restaurantData)
            );
          } else {
            console.warn("Restaurant non trouvé dans Firestore");
            setRestaurant(null);
          }
        }

        const cachedMenu = await AsyncStorage.getItem(cacheKey);
        if (cachedMenu) {
          const dishes = JSON.parse(cachedMenu);
          setMenuItems(dishes);
          setFilteredItems(dishes);
        } else {
          const menuRef = collection(db, "menus");
          const q = query(menuRef, where("restaurantId", "==", restaurantId));
          const menuSnapshot = await getDocs(q);
          const menuData = menuSnapshot.docs.map((doc) => doc.data());
          const dishIds = menuData.flatMap((menu) => menu.items);

          const chunkedDishIds = [];
          const chunkSize = 10;
          for (let i = 0; i < dishIds.length; i += chunkSize) {
            chunkedDishIds.push(dishIds.slice(i, i + chunkSize));
          }

          const dishesData: Dish[] = [];
          for (const ids of chunkedDishIds) {
            const dishesQuery = query(
              collection(db, "dishes"),
              where("__name__", "in", ids)
            );
            const dishesSnapshot = await getDocs(dishesQuery);
            dishesSnapshot.forEach((doc) => {
              const dish = doc.data() as Dish;
              dishesData.push(dish);
            });
          }

          setMenuItems(dishesData);
          setFilteredItems(dishesData);

          await AsyncStorage.setItem(cacheKey, JSON.stringify(dishesData));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    getRestaurantDetails();
  }, [restaurantId]);

  const categories = Array.from(
    new Set(menuItems.map((dish) => dish.category))
  );

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredItems(menuItems.filter((dish) => dish.category === category));
    } else {
      setFilteredItems(menuItems);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="#fcb823"
      />
    );
  }

  if (!restaurant) {
    return <Text>Restaurant non trouvé</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{restaurant.nom}</Text>
        <Text style={styles.address}>{restaurant.adresse}</Text>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => filterByCategory(null)}
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.selectedButton,
          ]}
        >
          <Text style={styles.categoryText}>Tous</Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => filterByCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedButton,
            ]}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.menuTitle}>Menu</Text>
      {filteredItems.length > 0 ? (
        <View style={styles.dishGrid}>
          {filteredItems.map((dish) => (
            <View key={dish.imageURL} style={styles.dishCard}>
              <TouchableOpacity>
                <Text>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#fc823"
                  />
                </Text>
              </TouchableOpacity>
              {dish.imageURL ? (
                <Image
                  source={{ uri: dish.imageURL }}
                  style={styles.dishImage}
                />
              ) : (
                <Text>Image non disponible</Text>
              )}
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishCategory}>{dish.category}</Text>
              <Text style={styles.dishPrice}>{dish.price} Dt</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Menu non disponible</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  indicator: {
    marginTop: 45,
  },
  restaurantHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 18,
    color: "#666",
  },
  heart: {
    right: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: "#fcb823",
  },
  categoryText: {
    color: "#333",
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  dishGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dishCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: "48%",
    marginBottom: 20,
    padding: 15,
  },
  dishImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  dishName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
    textAlign: "center",
  },
  dishCategory: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
    textAlign: "center",
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    marginTop: 5,
    textAlign: "center",
  },
});

export default RestaurantDetails;
