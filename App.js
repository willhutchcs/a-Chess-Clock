import React, { Component, useState, useCallback } from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Dimensions,
  ScrollView,
  State,
} from 'react-native';
import Constants from 'expo-constants';
import { useTimer } from 'react-timer-hook';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

let tan = '#fbf2c4';
let darktan = '#e5c185';
let orange = '#c7522a';
let bluegreen = '#74a892';
let cyan = '#008585';

let pauseURL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fgray%2Fmedia-pause-512.png&f=1&nofb=1&ipt=cba3ca86ccd03de63c036ef9ce8ef45798f6bc5219c5065065e7376094636523&ipo=images';

const time = new Date();
time.setSeconds(time.getSeconds() + 600);

function MyTimer({ expiryTimestamp }) {
  const {
    seconds: seconds1,
    minutes: minutes1,
    hours: hours1,
    days: days1,
    isRunning: isRunning1,
    start: start1,
    pause: pause1,
    resume: resume1,
    restart: restart1,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: time,
    onExpire: () => console.warn('Timer 1 expired'),
  });

  const {
    seconds: seconds2,
    minutes: minutes2,
    hours: hours2,
    days: days2,
    isRunning: isRunning2,
    start: start2,
    pause: pause2,
    resume: resume2,
    restart: restart2,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: time,
    onExpire: () => console.warn('Timer 2 expired'),
  });

  const handlePress1 = useCallback(() => {
    start2();
    pause1();
  }, [start2, pause1]);

  const handlePress2 = useCallback(() => {
    start1();
    pause2();
  }, [start1, pause2]);

  const pauseGame = useCallback(() => {
    pause1();
    pause2();
  }, [pause1, pause2]);

  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <TouchableHighlight onPress={handlePress1}>
          <View style={[styles.topClock, styles.shadow]}>
            <Text style={styles.topTimerText}>
              <span>{minutes1}</span>:<span>{seconds1}</span>
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.controlContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>a Chess Clock</Text>
          <Text style={styles.titleSubtext}>by Will Hutchison</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={pauseGame}>
            <Image source={{ uri: pauseURL }} style={styles.image} />
          </TouchableHighlight>
        </View>
      </View>

      <button
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart1(time);
          restart2(time);
        }}>
        Restart
      </button>

      <View style={styles.clockContainer}>
        <TouchableHighlight onPress={handlePress2}>
          <View style={[styles.bottomClock, styles.shadow]}>
            <Text style={styles.timerText}>
              <span>{minutes2}</span>:<span>{seconds2}</span>
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: tan,
  },

  clockContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomClock: {
    width: deviceWidth - deviceWidth / 6,
    height: (deviceWidth - deviceWidth / 6) / 2,
    borderColor: orange,
    borderWidth: 10,
    marginBottom: deviceHeight / 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tan,
  },
  topClock: {
    width: deviceWidth - deviceWidth / 6,
    height: (deviceWidth - deviceWidth / 6) / 2,
    borderColor: orange,
    borderWidth: 10,
    marginTop: deviceHeight / 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tan,
  },
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: darktan,
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  controlContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  titleContainer: {
    justifyContent: 'center',
    marginLeft: deviceWidth / 10,
  },

  imageContainer: {
    justifyContent: 'center',
    margin: deviceWidth / 10,
  },

  image: {
    height: deviceWidth / 11,
    width: deviceWidth / 11,
  },

  titleText: {
    color: orange,
    fontFamily: 'Helvetica',
    fontSize: 35,
    fontWeight: 'bold',
  },
  titleSubtext: {
    color: cyan,
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  timerText: {
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: orange,
    fontWeight: 'bold',
  },
  topTimerText: {
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: orange,
    fontWeight: 'bold',
    transform: [{ scaleY: -1 }, { scaleX: -1 }],
  },
});
