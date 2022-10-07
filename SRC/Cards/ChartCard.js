import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ChartCard = ({ chat }) => {

    // console.log(chat)
    return (
        <View style={styles.ChatCard}>
            <Image source={{ uri: chat.profile_image }} style={styles.image} />

            <View style={styles.c1}>
                <Text style={styles.username}>{chat.username}</Text>
                <Text style={styles.lastmessage}>{chat.lastmessage}</Text>
            </View>
        </View>
    )
}

export default ChartCard

const styles = StyleSheet.create({
    ChatCard: {
        backgroundColor: '#111111',
        width: '100%',
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    username: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    c1: {
        marginLeft: 20,
    },
    lastmessage: {
        color: 'gray',
        fontSize: 19,
    }
})