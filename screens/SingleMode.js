import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react';
import LevelGrid from '../components/LevelGrid';
import { LinearGradient } from 'expo-linear-gradient';
import {colors} from '../assets/colors'

export default function SingleMode({navigation, route})
 {
  const [colorsList, setColorList] = React.useState([]);
  const [colorsDict, setColorsDict] = React.useState({});

  React.useEffect(()=>{
    let tempList = [];
    let tempDict = {};

    for(let i = 1; i <= route.params.numOfColors; i++)
    {
      tempList.push(i);
      tempDict[i] = 0;
    }
    setColorList(tempList)
    setColorsDict(tempDict)
  }, [])

  return (
    <LinearGradient colors={[colors.third, "black"]} style={styles.mainView}>
        <FlatList
        data={route.params.levels}
        renderItem={({index}) => {return <LevelGrid colorsList={colorsList} colorsDict={colorsDict} num={index + 1} lvl={route.params.levels[index]} nav={navigation} levels={route.params.levels} numOfColors={route.params.numOfColors}/>}}
        keyExtractor={(item) => item}
        numColumns={3}
        />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center'
    }
})