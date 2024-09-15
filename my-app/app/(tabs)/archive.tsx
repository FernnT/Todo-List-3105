
import React, { useContext } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText'; // Assuming ThemedText is exported from ThemedText module
import { TaskContext } from '@/components/TaskContext';
import Task from '@/components/Task';
import { Ionicons } from '@expo/vector-icons';

export default function Archive(){
    const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null; // or handle the error appropriately
  }
  const { archivedTasks, deleteTask } = taskContext;

  return (
    <ThemedView style={styles.container} darkColor='#162427' lightColor='#E8EAED'>
      <ThemedView darkColor='#162427' lightColor='#E8EAED'>
        <ThemedText type='title' style={styles.title}>ARCHIVED TASKS</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content} darkColor='#162427' lightColor='#E8EAED'>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          {archivedTasks.map((item, index) => (
            <ThemedView darkColor='#162427' lightColor='#E8EAED' key={index} style={{ flexDirection: 'column-reverse' }}>
              <Task title={item.title} todo={item.todo} isFinish={item.isFinish} isArchived={true}/>

              <Pressable style={{justifyContent:"flex-end",flexDirection:"row"}} onPress={()=>deleteTask(index,item.isArchived)}>
                  <Ionicons name="trash" size={20} color="red" />
              </Pressable>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
});