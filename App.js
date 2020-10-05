import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';

export default function App() {
  const[nome, setNome] =useState();
  const save = async() => {
    try {
      await AsyncStorage.setItem("MeuNome", nome);
    } catch (error) {
      alert(error)
    }

  };

  const load = async () => {
    try {
      let nome = await AsyncStorage.getItem("MeuNome");

      if(nome !== null){
        setNome(nome)
      }
    } catch (error) {
      alert (error);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("MeuNome")
    } catch (error) {
      alert(error)
    }finally{
      setNome("");

    }

  };




  useEffect(() =>{
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Image source ={require("./assets/images.png")}style={{width:"100%", height:200,marginTop:64}} resizeMode="contain"/>
      
  <Text style={{height:30}}>{nome}</Text> 
      
      <Text style ={styles.name}>Qual seu nome?</Text>
      
      <TextInput style={styles.input} onChangeText = {(text) => setNome(text)}/> 

      <TouchableOpacity style ={styles.button} onPress={() => save()}>
        <Text style ={{color:"#fff"}}>Guarde meu nome!</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style ={styles.button} onPress={() => remove()}>
        <Text style ={{color:"#fff"}}>Apagar meu nome!</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  name:{
    fontSize:24,
    fontWeight:"300",
  },
  input:{
    borderWidth:1,
    borderColor:"#575dd9",
    alignSelf:"stretch",
    margin:32,
    height:64,
    borderRadius: 6,
    paddingHorizontal:16,
    fontSize:24,


  },
  button:{
    backgroundColor:"#575dd9",
    alignItems: "center",
    justifyContent:"center",
    alignSelf: "stretch",
    paddingVertical:12,
    paddingHorizontal:32,
    marginTop:32,
    marginHorizontal:32,
    borderRadius:6,


  }
});
