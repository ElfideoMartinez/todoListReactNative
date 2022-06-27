import React, { useEffect, useState } from 'react';
import { Alert, Button,StyleSheet, Text, TextInput , View } from 'react-native';
import Constants from 'expo-constants'

const Main=()=>{
    const [input,setInput]=useState('');
    const [lista, setLista]=useState([]);
    const [editando,setEditando]=useState(false);
    const [idEditando, setIdEditando]=useState('');
    const [done,setDone]=useState(false);

    const handlePress=()=>{
        if(!editando){
            if(input!==''){
                const tarea={
                    texto:input,
                    id:(input+lista.length).toString(),
                    done:false
                }
                setLista([tarea,...lista]);
                setInput('');
            }else{
                Alert.alert('El Input esta Vacio')
            }
        }else{
            setEditando(false);
            console.log(idEditando)
             const listaEditada=lista.map(element=>{
                if(element.id==idEditando){
                    return(
                        {
                            texto:input,
                            id:idEditando,
                            done:false
                        }
                    )
                }else{
                    return(element);
                }
             })
            setLista(listaEditada);
            setInput('');
        }
    }
    const handleDelete=(id) =>{
        const listaFiltrada=lista.filter(element=>{return (element.id!==id)});
        setLista(listaFiltrada);
    }
    const handleEdit=({texto, id}) =>{
        setInput(texto);
        setEditando(true);
        setIdEditando(id)
    }
    const handleDone=(id)=>{
        const listaEditada=lista.map(element=>{
            if(element.id==id){
                return(
                    {
                        texto:element.texto,
                        id:id,
                        done:!element.done,
                    }
                )
            }else{
                return(element);
            }
        })
        setLista(listaEditada)
        setDone(!done);
    }
    

    return(
        <View style={{marginTop:Constants.statusBarHeight}}>
            <TextInput placeholder="Ingrese una tarea" style={{fontSize:20, fontWeight:'bold', marginBottom:10}}
                onChangeText={text=>setInput(text)}
                value={input}
            />
            <Button title={editando?'Editar':'Añadir'}
                onPress={handlePress}
            />
            {lista.map((element, index)=>{

                return(
                    <View key={element+index} style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={element.done?styles.done:styles.normal}>{element.texto}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Button title="Delete" color='#dc143c'
                                onPress={()=>handleDelete(element.id)}
                            />
                            <Button title="Edit" color='#ffa500'
                                onPress={()=>{handleEdit(element)}}
                            />
                            <Button title="Done" color='#90ee90'
                                onPress={()=>{handleDone(element.id)}}
                            />
                        </View>
                    </View>
                )
            })}
            
        </View>
    )
    
    
} 
const styles = StyleSheet.create({
    done: {
      fontSize:20,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      flex: 1,
      flexWrap: 'wrap'
    },
    normal:{
        fontSize:20,
        flex: 1,
        flexWrap: 'wrap'
    }
  });


export default Main;