import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { circleColors } from '../dummy/mockData';

export default function ColorGrid(props)
 {

  let squareSize = props.boardSize == 8 ? { height:40,width: 40} : props.boardSize == 9 ? { height:40,width: 40} : { height:36,width: 36}
  let circleSize = props.boardSize == 8 ? { height:30,width: 30} : props.boardSize == 9 ? { height:30,width: 30} : { height:26,width: 26}

  return (
    <Pressable onPress={props.handlePress} style={[styles.mainView, squareSize, props.pick ? {backgroundColor: 'white'} : null]}>
        <Pressable onPress={props.handlePress} style={[styles.circle, circleSize, {backgroundColor: circleColors[props.data]}]}>
        </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    mainView:{
        borderWidth:2,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    circle:{
        borderWidth:1,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
      }
})