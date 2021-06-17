import React, {useState} from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity,PermissionsAndroid} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [showNext, setShowNext] = useState(false);

  const pickImageAndUpload =() => {
    launchImageLibrary({quality:0.3},(fileObj)=>{console.log(fileObj)})
  }
  const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the Gallery");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


  return (
  <View style={styles.container}>
     <View style={styles.box1}>
        <Text style={styles.text}> Welcome to Wartalaap </Text>
        <Image style={styles.img} source={require('../assets/wa.png')} />
     </View>
     <View style={styles.box2}>
        {!showNext && 
        <> 
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
         
          </>
          }
   
           {showNext ?  <> 
        <TextInput
              label="Name"
              value={name}
              onChangeText={text => setEmail(text)}
          />
      
          <Button mode="contained" onPress={()=>pickImageAndUpload()}>Upload Profile Pic</Button>
           <Button mode="contained">Sign Up</Button>
           </> : 
           <> 
           <Button mode="contained" onPress={()=>setShowNext(true)} >Next</Button>
            <TouchableOpacity onPress={()=>navigation.goBack()}> 
                <Text> Already have an account ?  </Text>
          </TouchableOpacity> 
          </>
           }
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
