import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { formHead2 } from '../../CommonCss/formcss';
import ChatCard from '../../Cards/ChatCard';
import { searchbar } from '../../CommonCss/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';
const All_Chats = ({ navigation }) => {
    // let chats = [
    //     {
    //         roomid: "6353f0c6a52cde6dafae64d2634c1d60f09a4f3ff40be517",
    //         fuserid: "634c224bc4fbf37da83c5efa",
    //         lastmessage: "This is the third message",
    //         ouruserid: "634c1d60f09a4f3ff40be517"
    //     }
    // ]

    const [chats, setChats] = useState(null)

    const [keyword, setKeyword] = useState('')

    // console.log(keyword)

    const [userdata, setUserdata] = useState(null)
    useEffect(() => {
        loadchats()
    }, [])
    const loadchats = () => {
        AsyncStorage.getItem('user')
            .then(data => {
                // console.log('async userdata ', data)
                setUserdata(JSON.parse(data))
                let userid = JSON.parse(data).user._id;
                // console.log(userid)

                fetch('http://10.0.2.2:3000/getusermessages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userid: userid
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        data.sort((a, b) => {
                            if(a.date > b.date){
                                return -1
                            }
                        })
                        setChats(data)
                    })
                    .catch(err => {
                        alert('Something went wrong')
                        setChats([])
                    })
            })
            .catch(err => alert(err))
    }
    return (
        <ScrollView style={styles.container}>
            <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}

                onPress={() => navigation.navigate('MainPage')}
            />

            <View style={styles.c1}>
                <Text style={formHead2}>Your Chats</Text>
                <TextInput style={searchbar} placeholder="Search"

                    onChangeText={(text) => setKeyword(text)}
                />
            </View>

            <View style={styles.c2}>
                {
                    chats!==null && chats.filter(
                        (chat) => {
                            if (keyword == '') {
                                return chat
                            }
                            else if (
                                chat.username.toLowerCase().includes(keyword.toLowerCase())
                                ||
                                chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
                            ) {
                                return chat
                            }
                        }
                    ).map((chat) => {
                        return <ChatCard key={chat.fuserid} chat={chat} navigation={navigation}/>
                    })
                }
            </View>
        </ScrollView>
    )
}

export default All_Chats

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    gohomeicon: {
        position: 'absolute',
        top: 15,
        left: 20,
        zIndex: 10,
        color: 'white',
        fontSize: 30,
    },
    c1: {
        width: '95%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        backgroundColor: '#111111',
        alignSelf: 'center',
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
    },
    searchbar: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 18,
    },
    c2: {
        width: '100%',
        padding: 10,
    }

})



// fetch('http://10.0.2.2:3000/setusermessages', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         ouruserid: userid,
//         fuserid: fuserid,
//         roomid: roomid,
//         lastmessage: currentmessage
//     })
// })
//     .then(res => res.json())
//     .then(data => {
//         if (data.message == 'Message saved successfully') {
//             console.log('user messages updated')
//         }
//         else {
//             console.log('user messages not updated')
//         }
//     })
//     .catch(err => {
//         console.log('error in setusermessages route = ',err)
//     })