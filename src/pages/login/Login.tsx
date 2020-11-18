import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import TextInput from '../../components/TextInput'
import logoApp from '../../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import AuthContext from '../../providers/AuthProvider'
import { Snackbar } from 'react-native-paper';

const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigation()
    const [email, setEmail] = useState('mateus@teste.com')
    const [password, setPassword] = useState('1234')
    const [enabledAllButtons, setEnabledAllButtons] = useState(true)
    const [disableButtonForgotPassword, setDisableButtonForgotPassword] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro ao fazer o login, verifique seu dados')

    function goToCreateAccount() {
        navigate.navigate('CreateAccount')
    }


    async function loginUser() {
        if (email === '' || password === '') {
            setTextSnackBar('Preencha todos os campos')
            return setShowSnackBar(true)
        }
        setEnabledAllButtons(false)
        setDisableButtonForgotPassword(true)
        login(email, password).catch(error => {
            setTextSnackBar(error)
            setEnabledAllButtons(true)
            setDisableButtonForgotPassword(false)
            setShowSnackBar(true)
        })

    }


    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Animatable.Image animation="pulse" style={{ width: 100, height: 100 }} source={logoApp} resizeMode='contain' />
            </View>
            <ScrollView>
                <View style={styles.loginContainer}>
                    <Text style={styles.titleLogin}>Login</Text>
                    <LottieView
                        autoPlay
                        speed={0.5}
                        style={styles.lottieImage}
                        source={require('../../assets/animations/lf30_editor_p2lvshsb.json')}
                    />
                    <View style={styles.containerInputText}>
                        <TextInput title='E-Mail' value={email} onTextChangeFunc={setEmail} icon='user' />
                    </View>

                    <View style={styles.containerInputText}>
                        <TextInput title='Password' value={password} onTextChangeFunc={setPassword} icon='key' />
                    </View>

                    <TouchableOpacity disabled={disableButtonForgotPassword} style={styles.containerForgotPassword} activeOpacity={0.6} onPress={() => navigate.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPassword}>Forgot password</Text>
                        <Animatable.View animation="rubberBand" delay={1000}>
                            <Icon style={{ marginEnd: 10 }} name={"help-circle"} size={22} color="#FFC633" />
                        </Animatable.View>
                    </TouchableOpacity>

                    <RectButton enabled={enabledAllButtons} activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonLogin} onPress={loginUser}>
                        <Text style={styles.textButtonLogin}>Login</Text>
                        {enabledAllButtons ?
                            <Icon style={{ marginStart: 10 }} name={"arrow-right"} size={22} color="#FFC633" />
                            :
                            <ActivityIndicator style={{ marginStart: 10 }} color='#FFC633' size={22} />}
                    </RectButton>
                </View>

                <RectButton enabled={enabledAllButtons} activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonCreateAccount]} onPress={goToCreateAccount}>
                    <Text style={styles.textButtonLogin}>Create account</Text>
                    <Icon style={{ marginStart: 10 }} name={"user-plus"} size={22} color="#FFC633" />
                </RectButton>
            </ScrollView>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                duration={5000}
                style={{ alignSelf: 'center', width: '90%', backgroundColor: '#E9585E' }}
                action={{
                    label: 'Ok',
                    onPress: () => {
                        setEnabledAllButtons(true)
                        setDisableButtonForgotPassword(false)
                    },
                }}>
                {textSnackBar}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 20,
    },
    containerInputText: {
        marginTop: 40,
    },

    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        padding: 30,
        marginTop: 20,
        marginHorizontal: 25,
        borderRadius: 25,
        borderColor: '#E9585E',
        borderWidth: 2
    },

    titleLogin: {
        color: '#D8DFFD',
        fontSize: 34,
        marginBottom: 20
    },
    forgotPassword: {
        color: '#D8DFFD',
        marginHorizontal: 10

    },
    buttonLogin: {
        marginTop: 40,
        backgroundColor: '#3D5089',
        borderRadius: 25,
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },

    buttonCreateAccount: {
        backgroundColor: '#3D5089',
        borderRadius: 25,
        paddingHorizontal: 50,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 20,
        paddingVertical: 15
    },

    textButtonLogin: {
        color: '#D8DFFD',
        fontSize: 18,
    },

    containerForgotPassword: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 20
    },
    lottieImage: {
        width: 100,
        height: 50,
    },


})

export default Login