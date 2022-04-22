import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Dependencias ---> React Navigation PANTALLAS
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Se importa los archivos Login.js, CreateUser.js UserDetail.js, y UserList.js
import UserList from './Screen/UserList';
import UserDetail from './Screen/UserDetail';
import CreateUser from './Screen/CreateUser';
import Login from './Screen/Login';


const Stack = createNativeStackNavigator();

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{title:'Login'}} />
      <Stack.Screen name="UserList" component={UserList} options={{title:'User List'}} />
      <Stack.Screen name="CreateUser" component={CreateUser} options={{title:'Create Users'}} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{title:'User Detail'}}/>
    </Stack.Navigator>

  )

}

export default function App() {
  return (
   
    <NavigationContainer>
      <MyStack/>
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
