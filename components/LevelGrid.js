import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react';



export default function LevelGrid(props) 
{

  return (
    <Pressable onPress={()=>{props.nav.navigate("GameScreen", {numOfColors: props.numOfColors, colorsList: props.colorsList, colorsDict: props.colorsDict, num: props.num, lvl: props.lvl, levels: props.levels})}} style={({pressed}) => [styles.mainView, pressed ? styles.pressed : null]}>
      <Text style={styles.text}>{props.num}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    mainView:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        margin:10,
        borderWidth:2,
        borderColor:'black',
        borderRadius:20,
        width:100,
        height:100,
        backgroundColor: '#008b8b'
    },
    text:{
        fontSize:20,
        fontWeight:'500',
        fontStyle:'italic'
    },
    pressed:{
        opacity:0.5
    }
})