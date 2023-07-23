import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

export default function Title(props)
 {
    const [textList, setTextList] = React.useState([]);
    let size = {fontSize: props.size};

    React.useEffect(()=>{
        let temp = [];
        for(let i = 0; i < props.text.length; i++)
        {
            temp.push(<Text style={i % 2 == 1 ? styles.first : styles.second} key={i}>{props.text[i]}</Text>)
        }
        setTextList(temp);
    }, [])

  return (
    <View>
      <Text style={[styles.all, size]}>
        {textList}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    all:{
        fontWeight:'500',
        fontStyle:'italic',
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 10},
        shadowRadius: 3,
         shadowOpacity:0.3
    },
    first:{
        color: 'white',
    },
    second:{
        color: 'black'
    }
})