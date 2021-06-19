import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [loading, setloading] = useState(false);

  const pickImageAndUpload = () => {
    // launchImageLibrary({quality: 0.3}, fileObj => {
    //   console.log(fileObj);
    // });
    setloading(true);
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        let personDetail = data.results[0];
        let imageUrl = personDetail.picture.large;
        setImage(imageUrl);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        alert(error);
      });
  };
  const handleNext = () => {
    if (!email || !password) {
      alert('please add all the field');
      return;
    }
    setShowNext(true);
  };
  const userSignup = async () => {
    if (!email || !name || !password) {
      alert('please add all the field');
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        pic: image,
        status: 'online',
      });
    } catch (error) {
      alert(error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Gallery');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.text}> Welcome to Wartalaap </Text>
        {image ? (
          <Image style={styles.img} source={{uri: image}} />
        ) : (
          <Image style={styles.img} source={require('../assets/profile.png')} />
        )}
      </View>
      <View style={styles.box2}>
        {!showNext && (
          <>
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              label="Set Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </>
        )}

        {showNext ? (
          <>
            <TextInput
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
            />

            {loading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <Button mode="contained" onPress={() => pickImageAndUpload()}>
                Set Random Profile Pic
              </Button>
            )}
            <Button mode="contained" onPress={userSignup}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button mode="contained" onPress={handleNext}>
              Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text> Already have an account ? </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 40,
  },
  text: {
    fontSize: 22,
    color: 'green',

    margin: 10,
    paddingBottom: 20,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
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
