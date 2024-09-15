import { Image, StyleSheet, Platform, Text, View,Button, Pressable, AppState} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Collapsible } from './Collapsible';


interface  Activity{
  name: string;
  state: boolean;
}
interface taskProps {
  title: string;
  todo: Activity[];
  isFinish: boolean;
  isArchived?: boolean;
}

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
  const [todo, setTodo] = useState<Activity[]>(props.todo);
  const [aState, setAState] = useState(false);

  useEffect(() => {
    const allStates = todo.map(item => item.state);
    const allTrue = allStates.every(Boolean);
   // console.log(allTrue)
    setAState(allTrue);
  }, [todo]);

  function handleCheckboxPress(index: number) { 
    if (props.isArchived) return;
    const newTodo = [...todo];
    newTodo[index].state = !newTodo[index].state;
    setTodo(newTodo);
  }

  function handleMassCheck() {
    if (props.isArchived) return;
    const states = todo.map(item=>item.state);
    const trues = states.every(Boolean);
    const newTodo = todo.map(item => ({...item, state: !trues}));
    setTodo(newTodo);
    setAState(aState);
    // console.log(todo)
  }

    return(
        <ThemedView darkColor='#3D595F' lightColor= '#FFF' style = {[style.items]} >
         <ThemedView darkColor='#3D595F' lightColor= '#FFF' style = {{flexDirection:'row'}} >
          <MyCheckbox checked={aState} onPress={handleMassCheck}/>
            {!props.title ? <ThemedText  style ={{marginBottom:10, fontSize:20, marginLeft:10,fontWeight:"bold"}}>Tasks</ThemedText> : <ThemedText style ={{marginBottom:10, fontSize:20, marginLeft:10,fontWeight:"bold"}}>{props.title}</ThemedText> }
            </ThemedView>
              {
                todo.map((item, index) => (
                  <ThemedView darkColor='#3D595F'  lightColor= '#FFF' style ={style.todo} key={index}>
                   <MyCheckbox checked={item.state} onPress={() => {handleCheckboxPress(index)}} />
                   <ThemedText style={[{ marginLeft: 15 },todo[index].state && style.crossedOut]} >{item.name} </ThemedText>
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



  

   