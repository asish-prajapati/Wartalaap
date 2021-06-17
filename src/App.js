import React from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  
} from 'react-native';
import LoginSignupStack from './navigations/LoginSignupStack'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};

const App = () => (
  <PaperProvider theme={theme}>
  <StatusBar barStyle="light-content" backgroundColor="#21cb78" />
 
    
    {/* <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>WartalAap</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.msgbox}></View>
        <View style={styles.msgbox}></View>
        <View style={styles.msgbox}></View>
        <View style={styles.msgbox}></View>
        <View style={styles.msgbox}></View>
        <Text>Hello hellohhi bye</Text>
      </View>
    </View> */}
   <LoginSignupStack/>
   
  </PaperProvider>
 
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {backgroundColor: '#21cb78', flex: 1},
  body: {
    flex: 9,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    marginTop: 10,
    color: '#fff',
  },
  msgbox: {
    padding: 40,
    margin: 10,
    backgroundColor: 'white',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 2,
  },
});

export default App;
