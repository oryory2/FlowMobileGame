import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../assets/colors'
import {circleColors} from '../dummy/mockData'

export default function SquareGrid(props)
 {

  let itemToShow = null;
  let basicStyle = props.data < 100 ?  {backgroundColor: circleColors[props.data], borderWidth:1} : {backgroundColor: circleColors[props.data - 100], borderWidth:8}
  let circleSize = props.boardSize == 8 ? { height:30,width: 30} : props.boardSize == 9 ? { height:28,width: 28} : { height:27,width: 27}
  let squareSize = props.boardSize == 8 ? { height:44,width: 44} : props.boardSize == 9 ? { height:40,width: 40} : { height:37,width: 37}

  if(props.data != 0)
  {
    itemToShow = (<View style={[styles.circle, basicStyle, circleSize]}></View>)
  }
  return (
    <Pressable onPress={()=>{props.handlePress(props.index)}} style={[squareSize, styles.mainView]}>
      {itemToShow}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    mainView:{
        borderWidth:2,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    circle:{
      borderRadius:30,
      borderColor: 'black'
    }
})