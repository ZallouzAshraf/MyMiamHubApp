// styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },

  title: { fontSize: 26, fontWeight: "bold", width: 256 },
  searchContainer: { flexDirection: "row", marginTop: 16 },
  searchInput: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#fcb823",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#fcb823",
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
  },
  bannerContent: { flex: 1, justifyContent: "center" },
  bannerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    margin: 2,
    letterSpacing: 0,
  },
  bannerButton: {
    backgroundColor: "#000",
    padding: 11,
    width: 130,
    textAlign: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  bannerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerImage: { width: 120, height: 150, borderRadius: 40 },
  categoryCarousel: { flexDirection: "row", marginTop: 20 },
  categoryItem: { alignItems: "center", marginRight: 16 },
  categoryImage: { width: 65, height: 65, borderRadius: 26 },
  categoryText: { marginTop: 8, fontSize: 12, fontWeight: "500" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  seeAll: { color: "#f57c00" },
  recommendedList: { marginTop: 10 },
  recommendedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  foodImage: { width: 60, height: 60, borderRadius: 30 },
  foodDetails: { marginLeft: 16, flex: 1 },
  foodName: { fontWeight: "bold", fontSize: 16 },
  foodPrice: { marginTop: 4, color: "#555" },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 4, color: "#fcb823" },
  carticon: {
    marginTop: 5,
  },
});

export default styles;
