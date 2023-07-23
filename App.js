import { StyleSheet, Text, View } from 'react-native';
import {colors} from './assets/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import Single from './screens/Single';
import MultiPlayer from './screens/MultiPlayer';
import Settings from './screens/Settings';
import SingleMode from './screens/SingleMode';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="MainScreen" component={MainScreen} options={{
          title:'',
          headerTintColor:'white',
          headerStyle: {backgroundColor: colors.main},
        }} />

      <Stack.Screen name="Single" component={Single} options={{
          title:'Single Player',
          headerTintColor:'white',
          headerStyle: {backgroundColor: colors.main},
        }} />

      <Stack.Screen name="MultiPlayer" component={MultiPlayer} options={{
          title:'Flow',
          headerTintColor:'white',
          headerStyle: {backgroundColor: colors.main},
        }} />

      <Stack.Screen name="Settings" component={Settings} options={{
          title:'Flow',
          headerTintColor:'white',
          headerStyle: {backgroundColor: colors.main},
        }} />

      <Stack.Screen name="SingleMode" component={SingleMode} options={({route}) => {return {
        title:route.params.screenName,
        headerTintColor:'white',
        headerStyle: {backgroundColor: colors.third},
      }}}/>

      <Stack.Screen name="GameScreen" component={GameScreen} options={({route}) => {return {
                  title: "Level " + route.params.num,
                  headerTintColor:'white',
                  headerStyle: {backgroundColor: colors.third},

      }}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
