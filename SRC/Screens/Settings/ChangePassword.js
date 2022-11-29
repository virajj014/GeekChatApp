import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/pagecss'
import logo from '../../../assets/logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ navigation }) => {

    const [oldpassword, setOldpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [confirmnewpassword, setConfirmNewpassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handlePasswordChange = () => {
        if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
            alert('Please fill all the fields')
        } else if (newpassword !== confirmnewpassword) {
            alert('New password and confirm new password must be same')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user')

                .then(data => {
                    fetch('http://10.0.2.2:3000/changepassword', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": 'Bearer ' + JSON.parse(data).tokens
                        },
                        body: JSON.stringify({ email: JSON.parse(data).user.email, oldpassword: oldpassword, newpassword: newpassword })
                    })
                        .then(res => res.json()).then(data => {
                            if (data.message == 'Password Changed Successfully') {
                                setLoading(false)
                                alert('Password Changed Successfully')
                                AsyncStorage.removeItem('user')
                                navigation.navigate('Login')
                            }
                            else {
                                alert('Wrong Password')
                                setLoading(false)
                            }
                        }
                        )
                })
        }
    }

    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings_1')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={logo} style={logo1} />
            <Text style={formHead2}>Choose a strong password</Text>
            <TextInput placeholder="Enter Old password" style={formInput} secureTextEntry
                onChangeText={(text) => setOldpassword(text)}
            />
            <TextInput placeholder="Enter New password" style={formInput} secureTextEntry
                onChangeText={(text) => setNewpassword(text)}
            />
            <TextInput placeholder="Confirm New password" style={formInput} secureTextEntry
                onChangeText={(text) => setConfirmNewpassword(text)}
            />
            <Text style={formTextLinkRight}
                onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}
            >Forgot Password?</Text>
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn}
                        onPress={() => handlePasswordChange()}
                    >
                        Next
                    </Text>
            }

        </View>
    )
}



export default ChangePassword

const styles = StyleSheet.create({})
