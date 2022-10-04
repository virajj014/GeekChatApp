import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { containerFull, goback, hr80, logo1 } from '../../../CommonCss/pagecss'
import logo from '../../../../assets/logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';


const ForgotPassword_EnterVerificationCode = ({ navigation }) => {
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
            <Text style={formHead3}>A verification code has been sent to your email</Text>

            <TextInput placeholder="Enter 6-Digit Code here" style={formInput} />

            <Text style={formbtn}
                onPress={() => navigation.navigate('ForgotPassword_ChoosePassword')}
            >
                Next
            </Text>
        </View>
    )
}



export default ForgotPassword_EnterVerificationCode

const styles = StyleSheet.create({})