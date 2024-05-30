import { Image,StyleSheet, Text, View, Button } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {colors} from '../assets/colors';
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';



export default function MainScreen({navigation}) 
{
  return (
    <LinearGradient colors={[colors.main, 'black']} style={styles.mainView}>

        <View style={{marginTop:30}}>
            <Title text={"Flow"} size={100}/>
        </View>

        <Image style={{width:150, height:150, marginTop:50}}source={{uri: 'https://play-lh.googleusercontent.com/cKgJRbFkjVAm6XkkSILGleGkT317BLLD8erTsrI1vo240a991MGJzbMryBKFG7Zw7tU'}}/>

        <View style={{marginTop:60}}>
            <SubTitle text={"Single Player"} handlePress={()=>{navigation.navigate("Single")}}/>
        </View>

        <View style={{marginTop:30}}>
            <SubTitle text={"MultiPlayer"} isDisabled={true}/>
        </View>

        <View style={{marginTop:30}}>
            <SubTitle text={"Settings"} isDisabled={true}/>
        </View>

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