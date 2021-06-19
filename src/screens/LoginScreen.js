import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const userLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      alert('please add all the field');
      return;
    }
    try {
      setloading(true);
      const result = await auth().signInWithEmailAndPassword(email, password);

      alert('loggedin');
      setloading(false);
    } catch (error) {
      alert(error);
      setloading(false);
    }
  };

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
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <Button mode="contained" onPress={userLogin}>
            Login
          </Button>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text> Dont have an account ? </Text>
        </TouchableOpacity>
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
