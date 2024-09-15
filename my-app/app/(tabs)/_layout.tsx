import { Tabs } from "expo-router";
import React, { useContext, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {Button,Text,TextInput,View,StyleSheet,TouchableOpacity,} from "react-native";
import { Modal } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TaskContext } from "@/components/TaskContext";

export default function TabLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [title, setTitle] = useState("");
  
  const { addTask } = useContext(TaskContext) ?? { addTask: () => {} };

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeTextColor = colorScheme === "light" ? "#242c40" : "#d0d0c0";

  function handleSubmit() {
    const filteredInputs = inputs.filter(input => input.slice() !== "");
    if (filteredInputs.length === 0) return; // Prevent submission if all inputs are empty
    const newTask = { title, todo: filteredInputs };
    console.log(newTask);
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
            title: "Add Task",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color={color}
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
                name={focused ? "code-slash" : "code-slash-outline"}
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
                  <TouchableOpacity onPress={() => removeListItem(index)}>
                    <ThemedText style={{ color: "#FF0000" }}>X</ThemedText>
                  </TouchableOpacity>
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
              <TouchableOpacity onPress={addListItem}>
                <ThemedText
                  style={{
                    color: "#00C2FF",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  Add another
                </ThemedText>
              </TouchableOpacity>

              <ThemedView
                style={{
                  padding: 20,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
                darkColor="#1C2D31"
                lightColor="#E8EAED"
              >
                <Button
                  color="transparent"
                  title="Close"
                  onPress={() => setIsModalVisible(false)}
                />
                <Button
                  color="#00C2FF"
                  title="Add Task"
                  onPress={handleSubmit}
                />
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
