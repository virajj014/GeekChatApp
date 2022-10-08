import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { containerFull, searchbar } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import UserCard from '../../Cards/UserCard'

const SearchUserPage = ({ navigation }) => {

    let data = [
        {
            username: "harshal1",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "viraj1",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "ravi123",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "harshal2",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "viraj2",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "ravi1234",
            profile_image: "https://picsum.photos/200/300"
        },
        {
            username: "user1",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "user2",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "auser3",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "auser5",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "buser6",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "buser9",
            profile_image: "https://picsum.photos/200/300",
        },
        {
            username: "cuser10",
            profile_image: "https://picsum.photos/200/300",
        }
    ]

    const [keyword, setKeyword] = useState("")
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} />
            <Bottomnavbar navigation={navigation} page={"SearchUserPage"} />

            <TextInput placeholder="Search By Username.." style={searchbar}
                onChangeText={(text) => {
                    setKeyword(text)
                }}
            />

            <ScrollView style={styles.userlists}>
                {
                    data.filter(
                        (user) => {
                            if (keyword == "") {
                                return null
                            }
                            else if (user.username.toLowerCase().includes(keyword.toLowerCase())) {
                                return user
                            }
                        }
                    ).map((item, index) => {
                        return <UserCard key={item.username} user={item} />
                    })
                }
            </ScrollView>
        </View>
    )
}

export default SearchUserPage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    },
    userlists: {
        width: '100%',
        marginTop: 20,
    }

})
