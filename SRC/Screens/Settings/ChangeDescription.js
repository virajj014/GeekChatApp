import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/pagecss'
import logo from '../../../assets/logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';
const ChangeDescription = ({ navigation }) => {

    const [description, setdescription] = useState('')

    const [loading, setLoading] = useState(false)


    const handleDescription = () => {

        if (description == '') {
            alert('Please enter username')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user').then(
                data => {
                    fetch('http://10.0.2.2:3000/setdescription', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            description: description
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Description Updated Successfully") {
                                setLoading(false)
                                alert('Description has been set successfully')
                                navigation.navigate('Settings_1')
                            }
                            else if (data.error === "Invalid Credentials") {
                                alert('Invalid Credentials')
                                setLoading(false)
                                navigation.navigate('Login')
                            }
                            else {
                                setLoading(false)
                                alert("Please Try Again");
                            }
                        })
                        .catch(err => {
                            alert('Something went wrong')
                            setLoading(false)
                        })
                }
            )
                .catch(err => {
                    alert('Something went wrong')
                    setLoading(false)
                })
        }

        // navigation.navigate('Signup_ChoosePassword')
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
            <Text style={formHead2}>Change Description</Text>
            <TextInput placeholder="Enter new description" style={formInput}
                onChangeText={(text) => setdescription(text)}
                multiline={true}
                numberOfLines={5}
            />

            {
                loading ? <ActivityIndicator /> :
                    <Text style={formbtn}
                        onPress={() => handleDescription()}
                    >
                        Save
                    </Text>
            }
        </View>
    )
}






export default ChangeDescription

const styles = StyleSheet.create({})