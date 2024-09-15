import { Image, StyleSheet, Platform, Text, View,Button, Pressable} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Collapsible } from './Collapsible';

type taskProps = {
    title: string;
    todo: string[];
};

function MyCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <Pressable
        style={[style.checkboxBase, checked && style.checkboxChecked]}
        onPress={() => setChecked(!checked)}>
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </Pressable>
    );
  }

export default function Task(props: taskProps){
    return(
        <ThemedView darkColor='#3D595F' lightColor= '#FFF' style = {style.items} >
            {props.title &&<ThemedText style ={{marginBottom:10, fontSize:15}}>{props.title}</ThemedText> }
              {
                props.todo.map((item, index) => (
                  <ThemedView darkColor='#3D595F'  lightColor= '#FFF' style ={style.todo} key={index}>
                    <MyCheckbox />
                    <ThemedText style={{marginLeft:15}}>{item}</ThemedText>

                  </ThemedView>
                ))
              }
            </ThemedView >
 

    );

};

    const style = StyleSheet.create({
        items: {
            padding: 20,
            borderRadius: 4,
            justifyContent: 'space-between',
            marginBottom: 20,
           
        },todo:{
            padding: 5,
            //backgroundColor:'green',
            flexDirection:'row',
            marginLeft: 20,
        },
        checkboxBase: {
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'transparent',
          },
          checkboxChecked: {
            backgroundColor: '#00C2FF',
          },
    })
