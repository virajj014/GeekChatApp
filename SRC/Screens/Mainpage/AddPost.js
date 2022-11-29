import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/pagecss'
import logo from '../../../assets/logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase/Config'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({ navigation }) => {

    const [postdescription, setpostdescription] = useState('')

    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState('')

    const pickImage = async () => {
        setLoading1(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        // console.log(result)


        if (!result.cancelled) {
            const source = { uri: result.uri };


            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            setLoading1(false)
            setPost(url)
            // console.log(url)
        }
        else {
            setLoading1(false)
            setPost(null)
        }
    }

    const handleUpload = () => {

        if (post != null) {
            AsyncStorage.getItem('user')
                .then(data => {
                    setLoading2(true)

                    fetch('http://10.0.2.2:3000/addpost', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            post: post,
                            postdescription: postdescription
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message == 'Post added successfully') {
                                alert('Post added successfully')
                                setLoading2(false)
                                navigation.navigate('My_UserProfile')
                            }
                            else {
                                alert('Something went wrong, please try again')
                                setLoading2(false)
                            }
                        })
                })
        }
        else {
            alert('Please select an image')
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
            {
                loading1 ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <>
                        <Text
                            style={formHead2}
                        >Add New Post</Text>

                        {
                            post ?
                                <TouchableOpacity
                                    onPress={() => pickImage()}
                                >
                                    <Image source={{ uri: post }} style={{
                                        width: 200, height: 200,
                                        marginVertical: 10,
                                    }} />
                                </TouchableOpacity>
                                :

                                <Text style={styles.addpost}
                                    onPress={() => {
                                        pickImage()
                                    }}
                                >
                                    Click here to select a new post
                                </Text>
                        }
                    </>
            }



            {/*  */}
            <Text style={formHead2}>Change Description</Text>
            <TextInput placeholder="Enter new description" style={formInput}
                onChangeText={(text) => setpostdescription(text)}
                multiline={true}
                numberOfLines={5}
            />

            {
                loading2 ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <Text style={formbtn}
                        onPress={() => handleUpload()}
                    >
                        Upload
                    </Text>
            }
        </View>
    )
}






export default AddPost

const styles = StyleSheet.create({
    addpost: {
        fontSize: 20,
        fontWeight: '100',
        color: 'white',

        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 50,
        width: '80%',
        textAlign: 'center',
        marginVertical: 20,
    }
})