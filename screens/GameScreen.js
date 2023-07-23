import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import React from 'react';
import SquareGrid from '../components/SquareGrid';
import { colors } from '../assets/colors';
import { LinearGradient } from 'expo-linear-gradient';
import ColorGrid from '../components/ColorGrid';
import SubTitle from '../components/SubTitle';
import {Ionicons} from '@expo/vector-icons'


export default function GameScreen({navigation, route}) 
{

    const [gameBoard, setGameBoard] = React.useState(route.params.lvl);
    const [color, setColor] = React.useState(0);
    const [prevGameBoard, setPrevGameBoard] = React.useState([]);
    const [levelNumber, setLevelNumber] = React.useState(route.params.num);
    const [finishedFlows, setFinishedFlows] = React.useState(0);
    const [finishedFlowsDict, setFinishedFlowsDict] = React.useState(route.params.colorsDict)
    const levels = route.params.levels;
    const rows = Math.sqrt(route.params.lvl.length);
    const numOfColors = route.params.numOfColors;
    const colorsIndexes = route.params.colorsList;


    React.useLayoutEffect(()=>{
        navigation.setOptions({ title: "Level " + levelNumber.toString(),
        headerRight:()=>{
            return(
                <View style={{marginTop:3}}><Text style={styles.flows}>flows: {finishedFlows}/{numOfColors}</Text></View>
            )
        }
        });
    })

    function updateBoard(index, color)
    {
        let temp = gameBoard.slice();
        if(!colorsIndexes.includes(temp[index]))
        {
            let colors = [];
            if(color == 0)
            { 
                if(temp[index] != 0)
                {
                    setPrevGameBoard((currState) => ([...currState, gameBoard]))
                    colors.push(temp[index] - 100);
                    temp = RemoveColorPath(temp, temp[index]);
                    temp[index] = color;
                }
            }
            else
            {
                if(color != temp[index] - 100)
                {
                    if(isValidMove(index, color))
                    {
                        setPrevGameBoard((currState) => ([...currState, gameBoard]))
                        if(temp[index] == 0)
                        {
                            if(isNewOldPath(color, index))
                            {
                                temp = RemoveColorPath(temp, color + 100)
                            }
                            colors.push(color);
                            temp[index] = color + 100;
                        }
                        else
                        {
                            if(isNewOldPath(color, index))
                            {
                                temp = RemoveColorPath(temp, color + 100)
                            }
                            colors.push(color);
                            colors.push(temp[index] - 100);
                            temp = RemoveColorPath(temp, temp[index]);
                            temp[index] = color + 100;
                        }
                    }
                }
            }
            updateFlows(temp, colors);
            setGameBoard(temp);
            isFinished(temp);
        }
        else
        {
            setColor(temp[index]);
        }
    }

    function isValidMove(index, color)
    {
        if(index > rows - 1) // up
        {
            if(gameBoard[index - rows] == color || gameBoard[index - rows] == color + 100)
            {
                return true;
            }
        }
        if(index < gameBoard.length - rows) // down
        {
            if(gameBoard[index + rows] == color || gameBoard[index + rows] == color + 100)
            {
                return true;
            }
        }
        if(index % rows != 0) // left
        {
            if(gameBoard[index - 1] == color || gameBoard[index - 1] == color + 100)
            {
                return true;
            }
        }
        if(index != rows - 1 && (index - (rows - 1)) % rows != 0 || (index % (rows - 1) == 0 && index % rows == 0)) // right
        {

            if(gameBoard[index + 1] == color || gameBoard[index + 1] == color + 100)
            {
                return true;
            }
        }
        return false;
    }

    function isNewOldPath(color, index)
    {
        if(index > rows - 1) // up
        {
            if(gameBoard[index - rows] == color)
            {
                if(isValidMove(index - rows, color + 100))
                {
                    return true;
                }
            }
        }
        if(index < gameBoard.length - rows) // down
        {
            if(gameBoard[index + rows] == color)
            {
                if(isValidMove(index + rows, color + 100))
                {
                    return true;
                }
            }
        }
        if(index % rows != 0) // left
        {
            if(gameBoard[index - 1] == color)
            {
                if(isValidMove(index - 1, color + 100))
                {
                    return true;
                }
            }
        }
        if(index != rows - 1 && (index - (rows - 1)) % rows != 0 || (index % (rows - 1) == 0 && index % rows == 0)) // right
        {

            if(gameBoard[index + 1] == color)
            {
                if(isValidMove(index + 1, color + 100))
                {
                    return true;
                }
            }
        }
        return false;
    }

    function updateFlows(temp, colors)
    {
        for(let j = 0; j < colors.length; j++)
        {
            for(let i = 0; i < temp.length; i++)
            {
                if(temp[i] == colors[j])
                {
                    if(recursiveExistFullPath(temp, i, colors[j], {}))
                    {
                         finishedFlowsDict[colors[j]] = 1;
                    }
                    else
                    {
                        finishedFlowsDict[colors[j]] = 0;
                    }
                    break;
                }
            }
        }
        let counter = 0;
        for(var key in finishedFlowsDict)
        {
            counter += finishedFlowsDict[key];
        }
        setFinishedFlows(counter);
        setFinishedFlowsDict(finishedFlowsDict)
    }


    function recursiveExistFullPath(temp, index, color, dict)
    {
        if(index in dict || index < 0 || index >= temp.length || (temp[index] != color && temp[index] != color + 100))
        {
            return false;
        }
        else
        {
            if(Object.keys(dict).length != 0)
            {
                if(temp[index] == color)
                {
                    return true;
                }
            }
            dict[index] = 1;

            let possibleLeft = index % rows != 0 ? true : false;
            let possibleRight = (index != rows - 1 && (index - (rows - 1)) % rows != 0 || (index % (rows - 1) == 0 && index % rows == 0)) ? true : false;

            if(possibleRight && possibleLeft) // up + down + left + right
            {
                return recursiveExistFullPath(temp, index + rows, color, dict) || recursiveExistFullPath(temp, index - rows, color, dict) ||
                recursiveExistFullPath(temp, index + 1, color, dict) || recursiveExistFullPath(temp, index - 1, color, dict)
            }
            else if(possibleRight) // up + down + right
            {
                return recursiveExistFullPath(temp, index + rows, color, dict) || recursiveExistFullPath(temp, index - rows, color, dict) ||
                recursiveExistFullPath(temp, index + 1, color, dict)
            }
            else // up + down + left
            {
                return recursiveExistFullPath(temp, index + rows, color, dict) || recursiveExistFullPath(temp, index - rows, color, dict) ||
                recursiveExistFullPath(temp, index - 1, color, dict)
            }
        }
    }

    function clearFlows()
    {
        setFinishedFlows(0);
        setFinishedFlowsDict(route.params.colorsDict);
    }

    function RemoveColorPath(temp, color)
    {        
        for(let i = 0; i < temp.length; i++)
        {
            if(temp[i] == color)
            {
                temp[i] = 0;
            }
        }
        return temp;
    }

    function updatePrev()
    {
        if(prevGameBoard.length > 0)
        {
            let temp = prevGameBoard.slice();
            setGameBoard(temp.pop());
            setPrevGameBoard(temp);
        }
    }

    function isFinished(temp)
    {
        for(let i = 0; i < temp.length; i++)
        {
            if(temp[i] == 0)
            {
                return;
            }
        }
        Alert.alert("Level " + levelNumber.toString() + " Finished!")
        if(levelNumber < levels.length)
        {
            setGameBoard(levels[levelNumber]);
            setPrevGameBoard([]);
            clearFlows();
            setLevelNumber(levelNumber + 1);
        }      
    }


    function changeLevel(direction)
    {
        if(direction == "next")
        {
            if(levelNumber < levels.length)
            {
                setGameBoard(levels[levelNumber]);
                setPrevGameBoard([]);
                clearFlows();
                setLevelNumber(levelNumber + 1);
            }      
        }
        else
        {
            if(levelNumber - 2 >= 0)
            {
                setGameBoard(levels[levelNumber - 2]);
                setPrevGameBoard([]);
                clearFlows()
                setLevelNumber(levelNumber - 1);
            }
        }
    }


  return (
        <LinearGradient colors={[colors.third, 'black']} style={styles.mainView}>
            
            <View style={{marginTop:30, marginBottom:20}}>
                <SubTitle text={"Game Board"} notClick={true}/>
            </View>
            
            <FlatList
            data={gameBoard}
            renderItem={({item, index}) => {return <SquareGrid boardSize={rows} index={index} data={item} handlePress={(index)=>{updateBoard(index, color)}}/>}}
            keyExtractor={(index) => index}
            scrollEnabled={false}
            numColumns={rows}
            />

            <View style={{marginBottom:20, justifyContent:'center', alignItems:'center'}}>
                <SubTitle text={"Colors"} notClick={true}/>
            </View>

            <FlatList
            data={colorsIndexes}
            renderItem={({item}) => {return <ColorGrid data={item} boardSize={rows} pick={color == item ? true : false} handlePress={()=>{setColor(item);}}/>}}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            numColumns={numOfColors}
            style={{marginBottom:20}}
            />

            <View style={{flexDirection:'row' ,marginBottom:100}}>

                <Ionicons onPress={()=>{changeLevel("prev")}} style={{marginRight:55}} name="arrow-back-outline" color={levelNumber - 2 >= 0 ? "white" : "grey"} size={30}/>
                <Ionicons onPress={updatePrev} style={{marginRight:30}} name="return-up-back-outline" color={prevGameBoard.length != 0 ? "white" : "grey"} size={30}/>
                <ColorGrid pick={color == 0 ? true : false} handlePress={()=>{setColor(0);}}/>
                <Ionicons onPress={()=>{setGameBoard(levels[levelNumber - 1]); setPrevGameBoard([]); clearFlows();}} style={{marginLeft:30}} name="refresh-outline" color={prevGameBoard.length != 0 ? "white" : "grey"} size={30}/>
                <Ionicons onPress={()=>{changeLevel("next")}} style={{marginLeft:55}} name="arrow-forward-outline" color={levelNumber < levels.length ? "white" : "grey"} size={30}/>

            </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    flows:{
        fontSize:19,
        fontWeight:'400',
        color:'white',
        fontStyle:'italic',
    },
})