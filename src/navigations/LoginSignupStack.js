import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

function LoginSignupStack() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
        firestore().collection('users').doc(userExist.uid).update({
          status: 'online',
        });
      } else setUser('');
    });
    return () => {
      unregister();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTintColor: 'green'}}>
        {user ? (
          <>
            <Stack.Screen
              name="home"
              options={{
                headerRight: () => (
                  <MaterialIcons
                    name="account-circle"
                    size={34}
                    color="green"
                    style={{marginRight: 10}}
                    onPress={() => {
                      firestore()
                        .collection('users')
                        .doc(user.uid)
                        .update({
                          status: firestore.FieldValue.serverTimestamp(),
                        })
                        .then(() => {
                          auth().signOut();
                        });
                    }}
                  />
                ),
                title: 'WartalAap',
              }}>
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="chat"
              options={({route}) => ({
                title: (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}>
                      {route.params.name}
                    </Text>
                    <Text>{route.params.status}</Text>
                  </View>
                ),
              })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="account">
              {props => <AccountScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="signup"
              component={SignupScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LoginSignupStack;
