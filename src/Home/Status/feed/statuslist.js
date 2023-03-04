import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

function StatusList({ item, index }) {
    return (
        <TouchableOpacity style={styles.contain}>
            <View style={styles.listContainter}>
                <View style={styles.iconContainter}>
                    {item.sel ?
                        <Icon name="times" size={20} color="#ff0000" />:
                        <Icon name="check" size={20} color="#00ff00" />
                    }
                </View>
                <View style={styles.textContainter}>
                    <Text style={styles.title}>{item.contact}</Text>
                    <Text style={styles.favorite}>{item.contact}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#F0F0F3',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 5,
        padding: 10,
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#2459A8',
        marginBottom: 5
    },
    favorite: {
        fontSize: 12,
        color: '#000'
    },
    listContainter: {
        display: 'flex',
        flexDirection: 'row'
    },
    iconContainter: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60
    },
    textContainter: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});

export default StatusList;