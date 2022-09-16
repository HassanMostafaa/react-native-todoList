import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Task = ({ item, changeState, delItem }) => {
  const [completed, setCompleted] = useState(item.completed);
  return (
    <TouchableOpacity
      onPress={() => {
        setCompleted((prev) => !prev);
        changeState(item.id);
      }}
      style={styles.item}
    >
      <View style={styles.itemLeft}>
        <TouchableOpacity
          onPress={() => {
            setCompleted((prev) => !prev);
            changeState(item.id);
          }}
          style={completed ? styles.squareCompleted : styles.square}
        ></TouchableOpacity>

        <View style={styles.textsView}>
          <Text style={completed ? styles.completed : styles.itemText}>
            {item.text}
          </Text>
          <Text style={{ color: "grey", fontSize: 10 }}>{item.createdAt}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.circleView}
        onPress={() => delItem(item.id)}
      >
        <TouchableOpacity style={styles.circle}></TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    marginBottom: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "100%",
  },
  textsView: {
    width: 250,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  completed: {
    textDecorationLine: "line-through",
    textTransform: "capitalize",
  },
  itemText: {
    textTransform: "capitalize",
  },
  square: {
    width: 27,
    height: 27,
    backgroundColor: "#55bcf6",
    opacity: 0.4,
    borderRadius: 5,
    marginEnd: 10,
  },
  squareCompleted: {
    width: 27,
    height: 27,
    backgroundColor: "#f4f4f4",
    borderColor: "#55bcf6",
    borderWidth: 5,
    opacity: 0.4,
    borderRadius: 5,
    marginEnd: 10,
  },
  circleView: { padding: 10, backgroundColor: "#00000000" },
  circle: {
    width: 10,
    height: 10,
    borderColor: "#F63D5288",
    borderWidth: 2,
    borderRadius: 5,
  },
});
