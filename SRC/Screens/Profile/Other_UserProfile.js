import { StyleSheet, Text, View, StatusBar, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import nopic from '../../../assets/nopic.png'
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Other_UserProfile = ({ navigation, route }) => {
    const [userdata, setUserdata] = React.useState(null)
    const [issameuser, setIssameuser] = React.useState(false)

    const ismyprofile = (
        otheruser
    ) => {

        AsyncStorage.getItem('user').then((loggeduser) => {
            const loggeduserobj = JSON.parse(loggeduser);
            if (loggeduserobj.user._id == otheruser._id) {
                setIssameuser(true)

            }
            else {
                setIssameuser(false)
            }
        })
    }
    const { user } = route.params
    // console.log(user)
    const loaddata = async () => {
        fetch('http://10.0.2.2:3000/otheruserdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'User Found') {
                    setUserdata(data.user)
                    ismyprofile(data.user)
                    CheckFollow(data.user)
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
    useEffect(() => {
        loaddata()
    }, [])

    // console.log('userdata ', userdata)


    const FollowThisUser = async () => {
        console.log('FollowThisUser')
        const loggeduser = await AsyncStorage.getItem('user');
        const loggeduserobj = JSON.parse(loggeduser);
        fetch('http://10.0.2.2:3000/followuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followfrom: loggeduserobj.user.email,
                followto: userdata.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.message == 'User Followed') {
                    // alert('Followed')
                    loaddata()
                    setIsfollowing(true)
                }
                else {
                    alert('Something Went Wrong')
                }
            })
    }

    const [isfollowing, setIsfollowing] = React.useState(false)
    const CheckFollow = async (otheruser) => {
        AsyncStorage.getItem('user')
            .then(loggeduser => {
                const loggeduserobj = JSON.parse(loggeduser);
                fetch('http://10.0.2.2:3000/checkfollow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        followfrom: loggeduserobj.user.email,
                        followto: otheruser.email
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message == 'User in following list') {
                            setIsfollowing(true)
                        }
                        else if (
                            data.message == 'User not in following list'
                        ) {

                            setIsfollowing(false)
                        }
                        else {
                            // loaddata()
                            alert('Something Went Wrong')
                        }
                    })
            })

    }



    const UnfollowThisUser = async () => {
        console.log('UnfollowThisUser')
        const loggeduser = await AsyncStorage.getItem('user');
        const loggeduserobj = JSON.parse(loggeduser);
        fetch('http://10.0.2.2:3000/unfollowuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followfrom: loggeduserobj.user.email,
                followto: userdata.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.message == 'User Unfollowed') {
                    // alert('Followed')
                    loaddata()
                    setIsfollowing(false)
                }
                else {
                    alert('Something Went Wrong')
                }
            })
    }
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"Other_UserProfile"} />
            <Bottomnavbar navigation={navigation} page={"SearchUserPage"} />
            <Foundation name="refresh" size={30} color="white" style={styles.refresh}
                onPress={() => loaddata()}
            />
            {
                userdata ?
                    <ScrollView>
                        <View style={styles.c1}>
                            {
                                userdata.profilepic.length > 0 ?
                                    <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                                    :
                                    <Image style={styles.profilepic} source={nopic} />
                            }
                            <Text style={styles.txt}>@{userdata.username}</Text>

                            {
                                issameuser ?
                                    <></>
                                    :
                                    <View style={styles.row}>
                                        {
                                            isfollowing ?
                                                <Text style={
                                                    styles.follow
                                                }
                                                    onPress={() => UnfollowThisUser()}
                                                >Following</Text>
                                                :
                                                <Text style={
                                                    styles.follow
                                                }
                                                    onPress={() => FollowThisUser()}
                                                >Follow</Text>
                                        }
                                        <Text
                                            style={styles.message}
                                            onPress={
                                                ()=>{
                                                    navigation.navigate('MessagePage',{
                                                        fuseremail : userdata.email,
                                                        fuserid : userdata._id,
                                                    })
                                                
                                                }
                                            }
                                        >Message</Text>
                                    </View>
                            }

                            <View style={styles.c11}>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Followers</Text>
                                    <Text style={styles.txt2}>{userdata.followers.length}</Text>
                                </View>
                                <View style={styles.vr1}></View>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Following</Text>
                                    <Text style={styles.txt2}>{userdata.following.length}</Text>
                                </View>
                                <View style={styles.vr1}></View>
                                <View style={styles.c111}>
                                    <Text style={styles.txt1}>Posts</Text>
                                    <Text style={styles.txt2}>{userdata.posts.length}</Text>
                                </View>
                            </View>

                            {
                                userdata.description.length > 0 &&
                                <Text style={styles.description}>{userdata.description}</Text>
                            }


                        </View>
                        {
                            isfollowing || issameuser ?
                                <View>
                                    {
                                        userdata.posts.length > 0 ?
                                            <View style={styles.c1}>
                                                <Text style={styles.txt}>Posts</Text>
                                                <View style={styles.c13}>
                                                    {
                                                        userdata.posts?.map(
                                                            (item) => {
                                                                return (
                                                                    <Image key={item.post} style={styles.postpic}
                                                                        source={{ uri: item.post }}
                                                                    />
                                                                )
                                                            }
                                                        )
                                                    }
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.c2}>
                                                <Text style={styles.txt1}>This user has not posted anything yet</Text>
                                            </View>
                                    }
                                </View>

                                :
                                <View style={styles.c2}>
                                    <Text style={styles.txt1}>Follow to see posts</Text>
                                </View>
                        }
                    </ScrollView>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </View>
    )
}

export default Other_UserProfile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    },
    c1: {
        width: '100%',
        alignItems: 'center',
    },
    profilepic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: 10
    },
    txt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#111111',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    txt1: {
        color: 'white',
        fontSize: 15,
    },
    txt2: {
        color: 'white',
        fontSize: 20,
    },
    c11: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    c111: {
        alignItems: 'center',
    },
    vr1: {
        width: 1,
        height: 50,
        backgroundColor: 'white'
    },
    description: {
        color: 'white',
        fontSize: 15,
        marginVertical: 10,
        backgroundColor: '#111111',
        width: '100%',
        padding: 10,
        paddingVertical: 20,
    },
    postpic: {
        width: '30%',
        height: 120,
        margin: 5
    },
    c13: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center'
    },
    c2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    refresh: {
        position: 'absolute',
        top: 50,
        right: 5,
        zIndex: 1,
    },
    follow: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#0AD6A0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    message: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    row: {
        flexDirection: 'row',
    }
})


