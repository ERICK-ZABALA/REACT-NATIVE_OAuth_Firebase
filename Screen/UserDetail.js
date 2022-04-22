import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView,Button} from 'react-native';
// import FireBase
import firebase from '../src/firebase/config';
// import List Item para que se refleje la lista de Usuarios y Avatar
import { ListItem, Avatar } from 'react-native-elements';



const UserDetail = (props) => {

  const [users, setUsers] = useState ([]);

useEffect (()=> {
  firebase.db.collection('Login').onSnapshot(querySnapshot => {
    
    const users = [];
    querySnapshot.docs.forEach(doc => {
      console.log (doc.data());
      const {email,password} = doc.data();
      users.push ({
        id: doc.id,
        email,
        password
      })
    });
    console.log (users);
    setUsers(users);

  });
},[]);


  return (
    <ScrollView>
      <Button title="Create user"
      onPress={()=> props.navigation.navigate("UserDetail")} />

      {users.map((user) => {
        return (

          <ListItem key={user.id} bottomDivider onPress={()=> 
            props.navigation.navigate('CreateUser',{userId:user.id})}>

            <ListItem.Chevron />
            <Avatar source={
              {uri:'https://i.pravatar.cc/300',
              }}
              rounded
            />
            <ListItem.Content>

               <ListItem.Title>{user.email}</ListItem.Title> 
               <ListItem.Title>{user.password}</ListItem.Title> 
               <ListItem.Title>{user.id}</ListItem.Title>
            </ListItem.Content>

          </ListItem>

        )
      })}

    </ScrollView>

  )
}

export default UserDetail