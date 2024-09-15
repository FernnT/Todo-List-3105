import { Image, StyleSheet, Platform, ScrollView, View, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Task from '@/components/Task';
import { useContext, useState } from 'react';
import { TaskContext } from '@/components/TaskContext';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreen() {

  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null; // or handle the error appropriately
  }
  const { tasks, archiveTask } = taskContext;

  
  return (
   
    <ThemedView style = {styles.container} darkColor='#162427' lightColor='#E8EAED'>
    <ThemedView darkColor='#162427' lightColor='#E8EAED'>
      <ThemedText type='title' style = {styles.title}>TODO LIST!!</ThemedText>


    </ThemedView>

    <ThemedView style={styles.content} darkColor='#162427' lightColor='#E8EAED' >
  
    <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
          {
            tasks.map((item, index) => (
              <ThemedView darkColor='#162427' lightColor='#E8EAED' key={index} style={{flexDirection:'column-reverse'}}>
              <Task title={item.title} todo={item.todo} isFinish={item.isFinish}/>

              <Pressable style={{justifyContent:"flex-end",flexDirection:"row"}} onPress={()=>archiveTask(index)}>
                  <Ionicons name="archive" size={20} color="white" />
              </Pressable>
              </ThemedView>
            ))
          }
        </ScrollView>
    </ThemedView>

  


    
  </ThemedView>

   
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding:20,
    paddingBottom: 0,
  },
  content:{
    flex: 2,
    //backgroundColor:'#FFF',
   
  },
  title: {
    marginTop: 10,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scrollView: {

  },

 
});
