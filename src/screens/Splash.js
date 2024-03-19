import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Image, Animated, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash(props) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startZoomAnimation();
  }, []);

  async function Navigator() {
    try {
      const value = await AsyncStorage.getItem('role');
      console.log('async value: ', value);
      if (value != null) {
        if (value == 'true') {
          props.navigation.replace('NewDashboard');
        } else {
          props.navigation.replace('LoginUser');
        }
      } else {
        props.navigation.replace('LoginUser');
      }
    } catch (error) {
      console.log('error in async storage', error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      Navigator();
    }, 2000);
  });

  const startZoomAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1, // Adjust the scaling factor as needed
      duration: 3000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  };

  const imageStyle = {transform: [{scale: scaleValue}]};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require('../assets/splashImage.png')}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
