import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import TextInput from '../components/TextInput'
import logoApp from '../../assets/logo.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function teste() {
        console.log(password);

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{width:200, height:200}} source={logoApp } resizeMode='contain'/>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.titleLogin}>Login</Text>
                <TextInput title='E-Mail' value={email} onTextChangeFunc={setEmail} />
                <TextInput title='Password' value={password} onTextChangeFunc={setPassword} />

                <TouchableOpacity ><Text style={styles.forgotPassword}>Forgot password</Text></TouchableOpacity>
                <RectButton style={styles.buttonLogin} onPress={() => { }}><Text style={styles.textButtonLogin}>Login</Text></RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 20,
        //justifyContent:'center',
    },

    header: {
        justifyContent:'center',
        alignItems:'center'
    },
    loginContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        padding: 30,
        margin: 20,
        borderRadius: 25,
        borderColor: '#E9585E',
        borderWidth: 2
    },

    titleLogin: {
        color: '#D8DFFD',
        fontSize: 34,
        marginBottom: 60
    },
    forgotPassword: {
        color: '#D8DFFD',

    },
    buttonLogin: {
        marginTop: 40,
        backgroundColor: '#3D5089',
        borderRadius: 25,
        paddingHorizontal: 50,
        paddingVertical: 15
    },

    textButtonLogin: {
        color: '#D8DFFD',
        fontSize: 18
    }


})

export default Login