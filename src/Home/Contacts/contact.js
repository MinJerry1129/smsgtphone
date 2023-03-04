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
import ContactList from './feed/contactlist';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const height = Dimensions.get('window').height;

const Contact = ({ route }) => {
  const { champignId } = route.params;
  const [message, setMessage] = useState('')
  const [listContact, setListContact] = useState([])
  const [listSelContact, setListSelContact] = useState([])

  const navigation = useNavigation();

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios.get('https://webservice.gtphone.es/api/promocion/' + champignId + '/contactos', {
      headers: {
        'token': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSUQiOiI2Mjc1Njk2MGRjN2E4YTZhMTRmYmM1ZDYiLCJyb2wiOiJBRE1JTiIsImlhdCI6MTY3Nzc2NTc4MiwiZXhwIjoxNzA5MzAxNzgyfQ.F5B61yiRv8-ueJaG_Aj86R56h7v_aItWKkbYEkRY1c0",
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const buffer_contact = []
        const response_data = response.data;
        const list_contact = response_data["contenido"];
        console.log("adfadf:::", response_data)
        setListContact([...list_contact["contactos"]]);
        list_contact["contactos"].map((number, index) => {
          buffer_contact.push({ sel: true, contact: number, id: index })
        })
        setListSelContact([...buffer_contact]);
        setMessage(list_contact["mensaje"])
      })
      .catch(error => {
        console.log("error::",error);
      });
  }

  const handleStatusPage = () => {
    navigation.push('Status', { listContact: listSelContact, message: message});
  }

  const positionlistItem = ({ item, index }) => (
    <ContactList
      key={index}
      item={item}
      index={index}
      onClickList={onClickList}
    />
  );

  const onClickList = (index) => {
    const buffer_sel = listSelContact
    buffer_sel[index]['sel'] = !buffer_sel[index]['sel']
    setListSelContact(buffer_sel);
  }

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
          <Text style={styles.headerTitleText}>Contact Panel</Text>
        </View>
        <View style={styles.headerItemContainter}>
        </View>
        <View style={styles.headerItemContainter}>
          <Icon name="pen" size={20} color="#ffffff" />
        </View>
      </View>
      <View style={styles.menuContainter}>
        <View style={styles.menuIconContainter}>
          <Icon name="users" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter}>
          <Icon name="envelope" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter} onTouchEnd={handleStatusPage}>
          <Icon name="telegram-plane" size={30} color="#ffffff" />
        </View>
        <View style={styles.menuIconContainter}>
          <Icon name="comments" size={30} color="#ffffff" />
        </View>
      </View>
      <View style={styles.mainContainter} height={height - 160}>
        <FlatList
          data={listContact}
          renderItem={positionlistItem}
          keyExtractor={(index) => index}
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
    justifyContent: 'center',
    alignItems: 'center'
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
  mainContainter: {

  },
});

export default Contact;
