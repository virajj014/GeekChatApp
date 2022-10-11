import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { formHead, formHead2, formHead3 } from '../../CommonCss/formcss';

const Settings1 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}

                onPress={() => navigation.navigate('My_UserProfile')}
            />
            <Text style={formHead}>Settings</Text>


            <Text style={styles.txt1}>Edit Profile</Text>
            <Text style={styles.txt1}>Change Password</Text>
            <Text style={styles.txt1}>Customer Support</Text>
        </View>
    )
}

export default Settings1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    txt1: {
        marginTop: 20,
        color: 'white',
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
})