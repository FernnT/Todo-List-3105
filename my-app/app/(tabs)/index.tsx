import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  return (
   
    <ThemedView style = {styles.container}>

      <ThemedView >
      <ThemedText type="title" style = {styles.title}>Welcome!</ThemedText>
      </ThemedView>
       
       <ThemedView>
       
       </ThemedView>


    
    </ThemedView>

   
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:24,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

 
});
