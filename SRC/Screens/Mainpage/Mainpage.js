import { StyleSheet, Text, View, StatusBar} from 'react-native'
import React, { useEffect } from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Mainpage = ({ navigation }) => {
    const [userdata, setUserdata] = React.useState(null)
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(data => {
                // console.log('async userdata ', data)
                setUserdata(JSON.parse(data))
            })
            .catch(err => alert(err))
    }, [])

    // console.log('userdata ', userdata)

    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"MainPage"} />
            <Bottomnavbar navigation={navigation} page={"MainPage"} />
            <FollowersRandomPost />
        </View>
    )
}

export default Mainpage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    }
})