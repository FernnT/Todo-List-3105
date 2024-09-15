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

function MyCheckbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <Pressable
      style={[style.checkboxBase, checked && style.checkboxChecked]}
      onPress={onPress}>
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
  }

export default function Task(props: taskProps){

  const [checkedItems, setCheckedItems] = useState<boolean[]>(props.todo.map(() => false));

  function handleCheckboxPress(index: number) {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  }
    return(
        <ThemedView darkColor='#3D595F' lightColor= '#FFF' style = {[style.items]} >
         <ThemedView darkColor='#3D595F' lightColor= '#FFF' style = {{flexDirection:'row'}} >
          <MyCheckbox checked={checkedItems.every(Boolean)} onPress={() => setCheckedItems(checkedItems.map(() => !checkedItems.every(Boolean)))} />
            {!props.title ? <ThemedText  style ={{marginBottom:10, fontSize:20, marginLeft:10,fontWeight:"bold"}}>Tasks</ThemedText> : <ThemedText style ={{marginBottom:10, fontSize:20, marginLeft:10,fontWeight:"bold"}}>{props.title}</ThemedText> }
            </ThemedView>
              {
                props.todo.map((item, index) => (
                  <ThemedView darkColor='#3D595F'  lightColor= '#FFF' style ={style.todo} key={index}>
                   <MyCheckbox checked={checkedItems[index]} onPress={() => handleCheckboxPress(index)} key={index}/>
                   <ThemedText style={[{ marginLeft: 15 }, checkedItems[index] && style.crossedOut]}> {item} </ThemedText>
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
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: 'transparent',
          },
          checkboxChecked: {
            backgroundColor: '#00C2FF',
          }, crossedOut: {
            textDecorationLine: 'line-through',
            color: 'gray',
          },
    })
