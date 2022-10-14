import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import logo from '../../../../assets/logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';
const Signup_EnterVerificationCode = ({ navigation, route }) => {
    const { useremail, userVerificationCode } = route.params
    console.log(useremail, userVerificationCode)


    const [verificationCode, setVerificationCode] = useState('')

    const handleVerificationCode = () => {
        if (verificationCode != userVerificationCode) {
            alert('Invalid Verification Code')
        }
        else if (verificationCode == userVerificationCode) {
            alert('Verification Code Matched')
            navigation.navigate('Signup_ChooseUsername', { email: useremail })
        }
        else {
            alert('Please Try Again')
        }

        // navigation.navigate('Signup_ChooseUsername')
    }

    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={logo} style={logo1} />
            <Text style={formHead3}>
                A verification code has been sent to your email
            </Text>
            <TextInput placeholder="Enter 6-Digit Code here" style={formInput}

                onChangeText={(text) => setVerificationCode(text)}
            />

            <Text style={formbtn}
                onPress={() => handleVerificationCode()}
            >
                Next
            </Text>
        </View>
    )
}



export default Signup_EnterVerificationCode

const styles = StyleSheet.create({})