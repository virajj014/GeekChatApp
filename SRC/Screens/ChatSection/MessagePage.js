import {
    StyleSheet, Text, View, StatusBar, ScrollView, Image,
     ActivityIndicator, TouchableOpacity, TextInput
} from 'react-native'

import React, { useEffect, useRef } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import nopic from '../../../assets/nopic.png'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io('http://192.168.0.104:3001')


const MessagePage = ({ navigation, route }) => {

    const { fuseremail, fuserid } = route.params;

    const [ouruserdata, setOuruserdata] = React.useState(null);
    const [fuserdata, setFuserdata] = React.useState(null);

    const [userid, setUserid] = React.useState(null);
    const [roomid, setRoomid] = React.useState(null);
    const [chat, setChat] = React.useState(['']);

    // OUR ID & ROOM ID FOR SOCKET.IO

    useEffect(() => {
        loaddata()
    }, [])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log('recieved message - ', data)
            loadMessages(roomid)
        })
    }, [socket])


    const sortroomid = (id1, id2) => {
        if (id1 > id2) {
            return id1 + id2
        } else {
            return id2 + id1
        }
    }


    const loaddata = async () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                fetch('http://10.0.2.2:3000/userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(value).token
                    },
                    body: JSON.stringify({ email: JSON.parse(value).user.email })
                })
                    .then(res => res.json()).then(data => {
                        if (data.message == 'User Found') {
                            // console.log('our user data ', data.user.username)
                            setOuruserdata(data.user)
                            setUserid(data.user._id)

                            fetch('http://10.0.2.2:3000/otheruserdata', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email: fuseremail })
                            })
                                .then(res => res.json())
                                .then(async data1 => {
                                    if (data1.message == 'User Found') {
                                        // console.log('fuser data ', data1.user.username)
                                        setFuserdata(data1.user)
                                        let temproomid = await sortroomid(fuserid, data.user._id)

                                        setRoomid(temproomid)
                                        // console.log('room id ', temproomid)
                                        socket.emit('join_room', { roomid: temproomid })
                                        loadMessages(temproomid)
                                    }
                                    else {
                                        alert('User Not Found')
                                        navigation.navigate('SearchUserPage')
                                        // navigation.navigate('Login')
                                    }
                                })
                                .catch(err => {
                                    // console.log(err)
                                    alert('Something Went Wrong')
                                    navigation.navigate('SearchUserPage')
                                })
                        }
                        else {
                            alert('Login Again')
                            navigation.navigate('Login')
                        }
                    })
                    .catch(err => {
                        navigation.navigate('Login')
                    })
            })
            .catch(err => {
                navigation.navigate('Login')
            })
    }

    // const joinroom = () => {
    //     socket.emit('join_room', { roomid: roomid })
    // }

    const sendMessage = async () => {
        const messagedata = {
            message: currentmessage,
            roomid: roomid,
            senderid: userid,
            recieverid: fuserdata._id
        }
        fetch('http://10.0.2.2:3000/savemessagetodb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messagedata)
        }).then(res => res.json())
            .then(data => {
                if (data.message == 'Message saved successfully') {

                    socket.emit('send_message', messagedata)
                    loadMessages(roomid)
                    console.log('message sent')

                   

                    setCurrentmessage('')

                }
                else {
                    alert('Network Error')
                    setCurrentmessage('')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadMessages(roomid)
    }, [chat])

    const [currentmessage, setCurrentmessage] = React.useState(null);


    const loadMessages = (temproomid) => {
        fetch('http://10.0.2.2:3000/getmessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomid: temproomid })
        }).then(res => res.json())
            .then(data => {
                setChat(data)
            })
    }
    const scrollViewRef = useRef();
    return (
        <View style={styles.container}>
            <View style={styles.s1}>
                <TouchableOpacity onPress={() => navigation.navigate('All_Chats')} style={styles.goback}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                </TouchableOpacity>

                {
                    fuserdata?.profilepic ?
                        <Image source={{ uri: fuserdata?.profilepic }} style={styles.profilepic} />
                        :
                        <Image source={nopic} style={styles.profilepic} />

                }
                <Text style={styles.username}>{fuserdata?.username}</Text>
            </View>



            <ScrollView style={styles.messageView}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {
                    chat.map((item, index) => {
                        return (
                            <View style={styles.message} key={index}>
                                {
                                    item.senderid == userid &&
                                    <View style={styles.messageRight}>
                                        <Text style={styles.messageTextRight}>{item.message}</Text>
                                    </View>
                                }
                                {
                                    item.senderid != userid && item != '' &&
                                    <View style={styles.messageLeft}>
                                        <Text style={styles.messageTextLeft}>{item.message}</Text>
                                    </View>
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>


            <View style={styles.sbottom}>
                <TextInput style={styles.sbottominput} placeholder='Type a message'
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setCurrentmessage(text)}
                    value={currentmessage}
                />
                <TouchableOpacity style={styles.sbottombtn}>
                    {
                        currentmessage ?
                            <MaterialIcons name="send" size={24} color="white"
                                onPress={() => sendMessage()}
                            /> :
                            <MaterialIcons name="send" size={24} color="grey" />
                    }


                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessagePage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    profilepic: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    username: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    s1: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#111111",
        padding: 10,
    },
    sbottom: {
        width: '100%',
        height: 50,
        backgroundColor: '#111111',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        borderRadius: 30,
    },
    sbottominput: {
        width: '80%',
        height: 40,
        fontSize: 17,
        color: 'white',
    },

    message: {
        width: '100%',
        // padding:10,
        borderRadius: 10,
        // marginVertical:5,
        // backgroundColor:'red',
    },
    messageView: {
        width: '100%',
        marginBottom: 50,
    },
    messageRight: {
        width: '100%',
        alignItems: 'flex-end',
        // backgroundColor:'red'
    },
    messageTextRight: {
        color: 'white',
        backgroundColor: '#1e90ff',
        // width:'min-content',
        minWidth: 100,
        padding: 10,
        fontSize: 17,
        borderRadius: 20,
        margin: 10,
    },
    messageLeft: {
        width: '100%',
        alignItems: 'flex-start',
        // backgroundColor:'red'
    },
    messageTextLeft: {
        color: 'white',
        backgroundColor: '#222222',
        color: 'white',
        fontSize: 17,
        minWidth: 100,
        padding: 10,
        borderRadius: 20,
        margin: 10,
    },
})