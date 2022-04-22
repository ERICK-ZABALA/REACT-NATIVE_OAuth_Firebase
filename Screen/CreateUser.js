import React, {useEffect,useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput,Image,Button,Alert,TouchableOpacity,ScrollView } from 'react-native';
// import FireBase
import firebase from '../src/firebase/config';
//import logo imagen de pantalla
import logo from '../assets/logo.jpg';
import Login from './Login';

const CreateUser = (props) => {

  const [info, setInfo] = useState({

    id:"",
    email:"",
    password:"",
  });

  const [loading, setLoading] = useState(true);

  const getUserId = async (id) => {
  console.log(props.route.params.userId);
  const dbRef = firebase.db.collection('Login').doc(id);
  const doc = await dbRef.get();
  console.log(doc);
  const user = doc.data();
  console.log(user);
  
    setInfo ({
      ...user,
      id: doc.id,

    });

    setLoading(false)  
  };

  useEffect(()=>{

    getUserId(props.route.params.userId);

  },[]);

const handleChangeText = (email,value) => {

        setInfo({ ...info, [email]: value});
        console.log (value)
    };

const deleteUser = async () => {

  const dbRef = firebase.db.collection('Login').doc(props.route.params.userId);
  await dbRef.delete();
  props.navigation.navigate ('UserDetail');
}

const openConfirmationAlert = () => {
  Alert.alert('Remove The User', 'Are you sure?', [
    {text: 'Yes', onPress: ()=> deleteUser()},
    {text: 'No', onPress: ()=> console.log(false)},
  ])

}

const updateUser = async () => {

  const dbRef = firebase.db.collection('Login').doc (info.id);
  await dbRef.set ({

    email: info.email,
    password:info.password,
  });
  props.navigation.navigate('UserDetail');
}

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    );
  }


  return (
   
    <ScrollView>
          
        <View style={styles.container}>
        <Image
        source={logo}
        style={styles.image}
        />
        <Text style={styles.titulo}>User Data</Text>
        
        <TextInput style={styles.textInput} 
        placeholder="username@mail.com" 
        placeholderTextColor='green' 
        onChangeText={(value) => handleChangeText('email',value)} 
        value={info.email}
        />
        <TextInput style={styles.textInput}
        placeholder="password" 
        placeholderTextColor='green' 
        onChangeText={(value) => handleChangeText('password',value)}
        value={info.password}
        />
                    
        {/* -----------> Boton UPDATE ------ */}
       
        <TouchableOpacity style={styles.buttonUpdate}        
            onPress = {()=> 
            // ----> Funcion que envia la data a FireBase (DataBase) LoginUser()    
            updateUser()
            //console.log(state)
            //Alert.alert('Hello')
            //console.log ('Hello World')
            }
        ><Text style={styles.textbutton}> Update </Text>
        </TouchableOpacity>

        
        {/* -----------> Boton Delete ------ */}
       
        <TouchableOpacity style={styles.buttonClear}        
            onPress = {()=> 
            // ----> Funcion que envia la data a FireBase (DataBase) LoginUser()    
            openConfirmationAlert()
            //console.log(state)
            //Alert.alert('Hello')
            //console.log ('Hello World')
            }
        ><Text style={styles.textbutton}> Delete </Text>
        </TouchableOpacity>
    
        
        </View>

      </ScrollView>
      


  )
}

const styles = StyleSheet.create({
  container: {
    
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:0,
  },

  titulo:{
    fontSize: 60,
    color:'black',
    fontWeight: 'bold',
  },

  textInput:{
    padding:10,
    paddingStart: 30,
    width: '80%',
    height:50,
    marginTop:20,
    borderRadius:30,
    backgroundColor: 'white',
    color: 'green',
    borderColor:'green',
    borderWidth:2,
    fontSize: 20,   
  },

  image:{
    marginTop:80,
    paddingTop:0,
    height: 130,
    width: 130,
    borderRadius: 65,
  },

  buttonUpdate: {
    backgroundColor:'green',
    width: '80%',
    height:50,
    marginTop:10,
    borderRadius:30,
    color:'white',
    padding:10,
  },

  
  buttonClear: {
    backgroundColor:'red',
    width: '80%',
    height:50,
    marginTop:10,
    borderRadius:30,
    color:'white',
    padding:10,
  },

  textbutton:{
    color:'white',
    fontSize: 20, 
    textAlign:'center',     
    fontWeight: 'bold', 
  },


});

export default CreateUser