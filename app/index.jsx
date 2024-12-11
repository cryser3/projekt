import { Text, View, TextInput, Pressable, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {
  const [text, setText] = useState('')    //variabel text = initialvärde tom sträng, setText = funktion för uppdatera värdet av text
  const [todos, setTodos] = useState([])  //variabel todos, initialvärde tom lista

  //lägger till uppgift i listan om inte tom
  const addTodo = () => {
    if (text.trim()){
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;     //om listan tom => newId = 1, annars 
      setTodos([{id: newId, title: text, completed: false}, ...todos])      //lägger in ny uppgift högst upp
      setText('')                                                           // rensar textfältet
    }
  }

  //togglar en uppgift - klar eller inte
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>                                              //går igenom varje uppgift i todos
      todo.id === id ? { ...todo, completed: !todo.completed } : todo ))    //om id matchar => skapa nytt objekt med ...todo och vänd completed, annars oförändrat
  }

  //tar bort uppgift från listan
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))    //filtrerar bort uppgiften med angivna id från listan, skapar ny lista
  }

  //funktion som definerar hur varje uppgift ska visas i listan. Text => titel 
  const renderItem = ({item}) => (
    <View style={styles.todoItem}>
      <Text
      style={[styles.todoText, item.completed && styles.completedTodo]}   //om uppgiften är klar => completedTodo
      onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable 
      onPress={() => removeTodo(item.id)} 
      style={styles.removeButton}
      >
        <Ionicons name="remove-circle-outline" size={30} color="red" />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        placeholder="Vad vill du lägga till?"
        placeholderTextColor="black"
        value = {text}
        onChangeText = {setText}
        />
          <Pressable onPress={addTodo}>
            <FontAwesome6 name="add" size={36} color="green" />
          </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    width: '100%',
  },
  todoText: {
    flex: 1,
    fontSize: 20,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  removeButton: {
    position: 'absolute',
    right: 10,
  }
})