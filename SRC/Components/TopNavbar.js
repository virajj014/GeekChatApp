import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import logo from '../../assets/logo.png'
import { icons1, logo2 } from '../CommonCss/pagecss'
import { Ionicons } from '@expo/vector-icons';
const TopNavbar = ({ navigation, page }) => {

    // console.log(page)
    return (
        <View style={styles.container}>
            <Image source={logo} style={logo2} />
            {
                page === 'MainPage' &&
                <Ionicons name="chatbubbles" size={24} color="black" style={icons1} onPress
                    ={
                        () => navigation.navigate('All_Chats')
                    } />
            }
        </View>
    )
}

export default TopNavbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "#111111",

    }
})