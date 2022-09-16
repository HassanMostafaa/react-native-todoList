import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { Task } from "./components/Task";
import { NewTaskForm } from "./components/NewTaskForm";

export default function App() {
  const event = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { width } = Dimensions.get("window");
  const [newTaskInput, setNewTaskInput] = useState("");
  const [taskItems, setTaskItems] = useState([
    // {
    //   text: "task1",
    //   id: 1,
    //   completed: false,
    //   createdAt: event.toLocaleDateString("en-EN", options),
    // },
    // {
    //   text: "task2",
    //   id: 2,
    //   completed: true,
    //   createdAt: event.toLocaleDateString("en-EN", options),
    // },
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAdd = (text) => {
    if (!text.trim()) {
      alert("Fill input before adding");
    } else {
      setShowForm(false);
      Keyboard.dismiss();
      setNewTaskInput("");
      setTaskItems((prev) => [
        {
          text,
          id: prev.length + 1,
          completed: false,
          createdAt: ` ${event.toLocaleDateString(
            "en-EN"
          )}, ${event.toLocaleTimeString("en-EN")}`,
        },
        ...prev,
      ]);
    }
  };

  const changeState = (id) => {
    setTaskItems(
      taskItems.map((x) =>
        x.id === id ? { ...x, completed: !x.completed } : x
      )
    );
  };
  const delItem = (id) => {
    setTaskItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={width < 700 ? styles.smScreen : styles.lgScreen}>
        {/* battery percentage visible */}
        <StatusBar style="auto" />

        {/* tasks view */}
        <View style={styles.taskWrapper}>
          <Text style={{ fontSize: 12, color: "grey" }}>
            {event.toLocaleDateString("en-EN", options)}
          </Text>
          <View style={styles.splitter}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            {!showForm && (
              <TouchableOpacity
                style={styles.openFormBtn}
                onPress={() => {
                  setShowForm((prev) => !prev);
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.items}>
            {/* this is where the tasks will go */}

            {taskItems.map((item, ix) => (
              <Task
                key={ix}
                item={item}
                changeState={changeState}
                delItem={delItem}
              ></Task>
            ))}
          </View>
        </View>

        {showForm && (
          <NewTaskForm
            showForm={showForm}
            handleAdd={handleAdd}
            newTaskInput={newTaskInput}
            setNewTaskInput={setNewTaskInput}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    position: "relative",
  },

  smScreen: {
    height: "100%",
    minWidth: 300,
    maxWidth: 750,
    margin: "auto",
  },
  lgScreen: {
    height: "100%",
    minWidth: 600,
    maxWidth: 850,
    marginHorizontal: "auto",
  },
  taskWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  openFormBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
    backgroundColor: "#55bcf655",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
