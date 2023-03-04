/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'
import StatusList from './feed/statuslist';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import sendSMS from '../../Sms/sms';

const height = Dimensions.get('window').height;

const Status = ({ route }) => {
  const { listContact, message} = route.params;
  console.log('message',message)
  const [listSelContact, setListSelContact] = useState([])
  const [isplay, setIsPlay] = useState(true)
  const navigation = useNavigation();
  const [sendindex, setSendIndex] = useState(0)
  const [intervalId, setIntervalId] = useState(null);
  var send_index = 0

  useEffect(() => {
    getData()
  }, [listContact]);

  const getData = () => {
    setListSelContact(listContact.filter((item) => item['sel'] == true))
  }
  const handleStatusPage = () => {
    navigation.push('Contact');
  }

  const onSendBtn = () => {
    if (!isplay) {
      startInterval()
    } else {
      setSendIndex(sendindex + 1)
      stopInterval()
    }
    setIsPlay(!isplay)
  }


  const startInterval = () => {
    send_index = sendindex
    console.log("sendindex:::", sendindex)
    const newIntervalId = setInterval(() => {
      onSendSMS(sendindex)
    }, 3000);
    setIntervalId(newIntervalId);
    return () => clearInterval(newIntervalId)
  };
  const stopInterval = () => {
    clearInterval(intervalId);
    // setSendIndex(send_index);
    setIsPlay(!isplay)
    setIntervalId(null);
  };

  useEffect(() => {
    console.log(sendindex);
    if (sendindex >= listSelContact.length - 1) {
      stopInterval()
    }
  }, [sendindex])

  const onSendSMS = () => {
    console.log("test", send_index);
    if(send_index >= listSelContact.length){
      stopInterval()
      setSendIndex(0)
      send_index = 0
      return
    }
    sendSMS(listSelContact[send_index]["contact"],message)
    let buffer_sel = listSelContact
    buffer_sel[send_index]['sel'] = false
    setListSelContact([...buffer_sel]);
    setSendIndex(send_index)
    send_index++;
  }

  const positionlistItem = ({ item, index }) => (
    <StatusList
      key={item.id}
      item={item}
      index={index}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.headerContainter}>
        <View style={styles.headerItemContainter}>
          <Icon name="wrench" size={20} color="#ffffff" />
        </View>
        <View style={styles.headerItemContainter}>
          <Icon name="wallet" size={20} color="#ffffff" />
        </View>
        <View style={styles.headerTitleContainter}>
          <Text style={styles.headerTitleText}>Sending Panel</Text>
        </View>
        <View style={styles.headerItemContainter}>
        </View>
        <View style={styles.headerItemContainter}>
          <Icon name="pen" size={20} color="#ffffff" />
        </View>
      </View>
      <View style={styles.titleContainter}>
        <View style={styles.headerItemContainter}>
        </View>
        <View style={styles.headerTitleContainter}>
          <Text style={styles.headerTitleText}>TAPOT y VIDENTES y MEDIUM ...</Text>
        </View>
        <View style={styles.headerItemContainter}>
          {isplay ?
            <Icon name="pause" size={20} color="#ffffff" onTouchEnd={onSendBtn} /> :
            <Icon name="play" size={20} color="#ffffff" onTouchEnd={onSendBtn} />
          }

        </View>
      </View>
      <View style={styles.menuContainter}>
        <View style={styles.menuIconContainter} onTouchEnd={handleStatusPage}>
          <Icon name="users" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter}>
          <Icon name="envelope" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter}>
          <Icon name="telegram-plane" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter}>
          <Icon name="comments" size={30} color="#ffffff" />
        </View>
      </View>
      <View style={styles.statusContainter}>
        <View style={styles.statusSendContainter}>
          {isplay?
          <Text>Sending...</Text>:
          <Text>Paused</Text>
          }
        </View>
        <View style={styles.statusSentContainter}>
          {sendindex == 0 ?
          <Text>{sendindex}/{listSelContact.length}</Text>:
          <Text>{sendindex}/{listSelContact.length}</Text>
          }
        </View>
      </View>
      <View style={styles.mainContainter} height={height - 160}>        
        <FlatList
          data={listSelContact}
          renderItem={positionlistItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainter: {
    height: 50,
    backgroundColor: "#0199fc",
    display: "flex",
    flexDirection: "row"
  },
  headerItemContainter: {
    width: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitleContainter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitleText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  },
  titleContainter: {
    height: 50,
    backgroundColor: "#0199fc",
    display: "flex",
    flexDirection: "row"
  },
  titleText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "500"
  },
  menuContainter: {
    height: 50,
    backgroundColor: "#0199fc",
    display: "flex",
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#11a9ff'
  },
  menuIconContainter: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  statusContainter: {
    display:'flex',
    flexDirection:'row'
  },
  statusSendContainter:{
    flex : 1
  },
  statusSentContainter:{
    flex : 1
  },
});

export default Status;
