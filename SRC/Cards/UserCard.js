import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const UserCard = ({ user }) => {
    // console.log(user)
    return (
        <View style={styles.ChatCard}>
            <Image source={{ uri: user.profile_image }} style={styles.image} />

            <View style={styles.c1}>
                <Text style={styles.username}>{user.username}</Text>
            </View>
        </View>
    )
}

export default UserCard

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