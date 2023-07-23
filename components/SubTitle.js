import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {colors} from '../assets/colors'


export default function SubTitle(props) 
{

  return (
    <Pressable onPress={props.handlePress} style={({pressed}) => [pressed ? (!props.notClick ? styles.pressed : null): null]}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    text:{
        fontSize:30,
        fontWeight:'500',
        color:'white',
    },
    pressed:{
        opacity:0.3,
    }
})