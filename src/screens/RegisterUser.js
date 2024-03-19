import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';

export default function RegisterUser({navigation}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userType, setUserType] = useState('ADMIN');

  async function PostData() {
    const apiEndpoint = Ip + 'user/getotp';
    try {
      const data = {
        name: userName,
        email: userEmail,
        password: userPassword,
        userType: userType,
      };
      let response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber: userCellNo}),
      });
      response = await response.json();
      if (response.responseCode == 200) {
        console.log(response);
        navigation.navigate('OtpVerify', (props = {response, data}));
      } else {
        console.error(
          'POST request failed:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <View>
      <Header headerText="Register User" />
      <Text> </Text>
      <Text> </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Name </Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="John Doe"
          onChangeText={e => {
            setUserName(e);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Email</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="example@xyz.com"
          onChangeText={e => {
            setUserEmail(e);
          }}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>Enter Password</Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="Zx23he.@7"
          onChangeText={e => {
            setUserPassword(e);
          }}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={PostData}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    fontSize: 16,
    width: '40%',
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: '60%',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 100,
  },
});
