import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {colors} from '../assets/colors'
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';
import { easyLevels, mediumLevels, hardLevels } from '../dummy/mockData'


export default function Single({navigation}) {
  return (
    <LinearGradient colors={[colors.main, "black"]} style={styles.mainView}>

        <View style={{marginTop:30}}>
            <Title text={"Flow"} size={100}/>
        </View>

        <Image style={{width:150, height:150, marginTop:50}}source={{uri: 'https://play-lh.googleusercontent.com/cKgJRbFkjVAm6XkkSILGleGkT317BLLD8erTsrI1vo240a991MGJzbMryBKFG7Zw7tU'}}/>


        <View style={{marginTop:60}}>
            <SubTitle text={"Easy"} handlePress={()=>{navigation.navigate("SingleMode", {levels: easyLevels, numOfColors: 9, screenName:"Easy"})}}/>
        </View>

        <View style={{marginTop:30}}>
            <SubTitle text={"Medium"} handlePress={()=>{navigation.navigate("SingleMode", {levels: mediumLevels, numOfColors: 9, screenName:"Medium"})}}/>
        </View>

        <View style={{marginTop:30}}>
            <SubTitle text={"Hard"} handlePress={()=>{navigation.navigate("SingleMode", {levels: hardLevels, numOfColors: 10, screenName:"Hard"})}}/>
        </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    }
})