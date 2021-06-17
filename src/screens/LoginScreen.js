import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  return (
  <View style={styles.container}>
     <View style={styles.box1}>
        <Text style={styles.text}> Welcome to Wartalaap </Text>
        <Image style={styles.img} source={require('../assets/wa.png')} />
     </View>
     <View style={styles.box2}>
      
        <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
          />
          <TextInput
              label="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
          />
          <Button mode='contained'>Login</Button>
          <TouchableOpacity onPress={()=>navigation.navigate('signup')}> 
          <Text> Dont have an account ?  </Text>
          </TouchableOpacity>

    </View>
  </View>
  )
  
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 22,
    color: 'green',
    margin: 10,
  },
  img: {
    height: 200,
    width: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
