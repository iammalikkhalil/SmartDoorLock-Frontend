import { StyleSheet, Text, View, Image } from 'react-native';
import { Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import socketServcies from '../utils/SocketService';

import LinearGradient from 'react-native-linear-gradient';

import SwipeButton from 'rn-swipe-button';

export default function Dashboard() {
  const [value, setValue] = useState(false);
  const [message, setMessage] = useState(false);

  const [isSwiped, setIsSwiped] = useState(false);

  const handleSwipeSuccess = () => {
    setIsSwiped(true);
    // Perform your action on swipe success (e.g., unlock something)
  };

  useEffect(() => {
    socketServcies.on('mqttRes', msg => {
      console.log('socket io response: ', msg);
      isTrue = msg == 'true';
      setValue(isTrue);
    });
  }, []);

  function DoorHandler(value) {
    // setValue(value);
    console.log('switch changed...');
    socketServcies.emit('doorReq', value);
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#FEF5EC', '#E1FBFD', '#FEF5EC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.09, 1]}

    >
      {/* <Switch
        style={styles.switch}
        color="#2089dc"
        value={value}
        onValueChange={value => DoorHandler(value)}
      /> */}


      <View style={styles.iconContainer}>
        <View style={styles.btnContainer}>
          <Image style={styles.btnIcon} source={require('../assets/images/notification.png')} />
        </View>
      </View>

      <View style={styles.headingContainer}>
      <Text style={styles.wellcomeText}>Wellcome</Text> 
      <Text style={styles.nameText}>Malik,</Text> 
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: "5%",
    marginTop: "7%",
  },
  btnContainer: {
    width: 70,
    height: 70,
    borderRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45C6D4",
    elevation: 2,
  },
  btnIcon: {
    width: "60%",
    height: "60%",
  },
  wellcomeText: {
    // fontFamily: "",
    fontSize: 60,
  }
});
