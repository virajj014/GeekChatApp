import { StyleSheet, Text, View, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'

const My_UserProfile = ({ navigation }) => {
    const data = {
        username: 'harshal123',
        followers: 1100,
        following: 1500,
        description: "I am a software developer and I love to code",
        profile_image: 'https://picsum.photos/500/500',
        posts: [
            {
                id: 1,
                post_image: 'https://picsum.photos/400/400',
            },
            {
                id: 2,
                post_image: 'https://picsum.photos/300/300',
            },
            {
                id: 3,
                post_image: 'https://picsum.photos/200/200',
            },
            {
                id: 4,
                post_image: 'https://picsum.photos/250/150',
            },
            {
                id: 5,
                post_image: 'https://picsum.photos/550/550',
            }
        ]
    }
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"My_UserProfile"} />
            <Bottomnavbar navigation={navigation} page={"My_UserProfile"} />

            <ScrollView>
                <View style={styles.c1}>
                    <Image style={styles.profilepic} source={{ uri: data.profile_image }} />
                    <Text style={styles.txt}>@{data.username}</Text>

                    <View style={styles.c11}>
                        <View style={styles.c111}>
                            <Text style={styles.txt1}>Followers</Text>
                            <Text style={styles.txt2}>{data.followers}</Text>
                        </View>
                        <View style={styles.vr1}></View>
                        <View style={styles.c111}>
                            <Text style={styles.txt1}>Following</Text>
                            <Text style={styles.txt2}>{data.following}</Text>
                        </View>
                        <View style={styles.vr1}></View>
                        <View style={styles.c111}>
                            <Text style={styles.txt1}>Posts</Text>
                            <Text style={styles.txt2}>{data.posts.length}</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>{data.description}</Text>
                </View>
                <View style={styles.c1}>
                    <Text style={styles.txt}>Your Posts</Text>
                    <View style={styles.c13}>
                        {
                            data.posts.map(
                                (item) => {
                                    return (
                                        <Image key={item.id} style={styles.postpic}
                                            source={{ uri: item.post_image }}
                                        />
                                    )
                                }
                            )
                        }
                    </View>
                </View>

            </ScrollView>


        </View>
    )
}

export default My_UserProfile

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
    }
})
