import { useEffect, useRef } from "react";
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
import React from "react";

export const NewTaskForm = ({
  newTaskInput,
  handleAdd,
  setNewTaskInput,
  showForm,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (showForm) {
      inputRef.current.focus();
    }
  }, [showForm]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput
        // multiline
        ref={inputRef}
        style={styles.input}
        placeholder="Write a Task"
        onChangeText={(text) => setNewTaskInput(text)}
        value={newTaskInput}
      />
      <TouchableOpacity onPress={() => handleAdd(newTaskInput)}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    padding: 15,
    //paddingTop: 18,
    marginVertical: 20,
    width: "70%",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    flex: 0.9,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  addText: {},
});
