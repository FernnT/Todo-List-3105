import { Tabs } from "expo-router";
import React, { useContext, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Modal } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TaskContext } from "@/components/TaskContext";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme } from "@react-navigation/native";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [title, setTitle] = useState("");

  const { addTask } = useContext(TaskContext) ?? { addTask: () => {} };

  const colorScheme = useColorScheme();
  const themeTextStyle =
      colorScheme === "dark" ? styles.darkThemeText : styles.lightThemeText;
  const themeTextColor = colorScheme === "light" ? "#242c40" : "#d0d0c0";

  interface Activity {
    name: string;
    state: boolean;
  }
  interface Task {
    title: string;
    todo: Activity[];
    isFinish: boolean;
    isArtchived: boolean;
  }

  function handleSubmit() {
    const filteredInputs = inputs.filter((input) => input.slice() !== "");
    if (filteredInputs.length === 0) return; // Prevent submission if all inputs are empty
    const newTask = {
      title,
      todo: filteredInputs.map((input) => ({ name: input, state: false })),
      isFinish: false,
      isArtchived: false,
    };
    // console.log(newTask);
    addTask(newTask);
    setIsModalVisible(false);
    setTitle("");
    setInputs([""]);
  }

  function addListItem() {
    setInputs([...inputs, ""]);
  }

  function removeListItem(index: number) {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors[colorScheme ?? "light"].background , borderTopColor: Colors[colorScheme ?? "light"].tint, borderTopWidth: 1,height: 70},
          tabBarLabelStyle: {height: 20},
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
    
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              setIsModalVisible(true);
            },
          })}
          name="placeHolder"
          options={{
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                size={60}
                name={focused ? "add" : "add-outline"}
                color={color}
                style={{
                  flexDirection: "column",
                  marginBottom: 30,
                  backgroundColor: "#00C2FF",
                  borderRadius: 30,
                  color: "white",
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="archive"
          options={{
            title: "Archive",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "archive" : "archive-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <ThemedView
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
              padding: 20,
            }}
          >
            <ThemedView
              style={{ padding: 20, borderRadius: 10 }}
              darkColor="#1C2D31"
              lightColor="#E8EAED"
            >
              <TextInput
                style={[themeTextStyle]}
                placeholderTextColor={themeTextColor}
                placeholder="ADD TITLE"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />

              {inputs.map((input, index) => (
                <ThemedView
                  style={{
                    padding: 0,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                  darkColor="#1C2D31"
                  lightColor="#E8EAED"
                  key={index}
                >
                  <Pressable onPress={() => removeListItem(index)}>
                    <Ionicons name="close" size={20} color="red" />
                  </Pressable>
                  <TextInput
                    autoFocus={index === inputs.length - 1}
                    style={[styles.input, themeTextStyle]}
                    placeholderTextColor={themeTextColor}
                    placeholder="List Item"
                    value={input}
                    onChangeText={(text) => {
                      const newInputs = [...inputs];
                      newInputs[index] = text;
                      setInputs(newInputs);
                    }}
                  />
                </ThemedView>
              ))}
              <Pressable onPress={addListItem}>
                <ThemedText
                  style={{
                    color: "#00C2FF",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Add another
                </ThemedText>
              </Pressable>

              <ThemedView
                style={{
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                darkColor="#1C2D31"
                lightColor="#E8EAED"
              >
                <Pressable onPress={() => setIsModalVisible(false)}>
                  <ThemedText
                    style={{
                      color: "#00C2FF",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Cancel
                  </ThemedText>
                </Pressable>

                <Pressable onPress={handleSubmit}>
                  <ThemedText
                    style={{
                      backgroundColor: "#00C2FF",
                      textAlign: "center",
                      padding: 5,
                      borderRadius: 4,
                    }}
                  >
                    ADD TASK
                  </ThemedText>
                </Pressable>

                {/* <Button
                  color="#00C2FF"
                  title="Add Task"
                  onPress={handleSubmit}
                /> */}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    width: "80%",
  },
  lightThemeText: {
    color: "#242c40",
    borderColor: "#979797",
  },
  darkThemeText: {
    color: "#d0d0c0",
    borderColor: "#979797",
  },
});
