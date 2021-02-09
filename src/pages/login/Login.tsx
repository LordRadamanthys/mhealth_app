import React, { useState, useContext, useEffect } from 'react'
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
import AsyncStorage from '@react-native-community/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

const Login = () => {
    const { login, getData } = useContext(AuthContext)
    const navigate = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [enabledAllButtons, setEnabledAllButtons] = useState(true)
    const [disableButtonForgotPassword, setDisableButtonForgotPassword] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Oops, error signing in')
    const [failedCount, setFailedCount] = useState(0)
    const [touchId, setTouchId] = useState("")

    function goToCreateAccount() {
        navigate.navigate('CreateAccount')
    }


    async function loginUser() {
        if (email === '' || password === '') {
            setTextSnackBar('Fill in all fields')
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

    let scanFingerPrint = async () => {
        try {
            let results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                try {
                    await getData()

                } catch (err) {
                    setTextSnackBar(err)
                    setShowSnackBar(true)
                }
            } else {
                setFailedCount(failedCount + 1)
            }
        } catch (e) {
            console.log("catch");
            setTextSnackBar(e)
            setShowSnackBar(true)
        }
    };

    async function isTouchIdOn() {
        const value = await AsyncStorage.getItem('@touchId') as String
        const email = await AsyncStorage.getItem('@email')
        const password = await AsyncStorage.getItem('@password')
        if (value == "true") {
            setEmail(email)
            setPassword(password)
            scanFingerPrint()
        }
    }
    useEffect(() => {
        isTouchIdOn()

        //getData()
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Animatable.Image animation="pulse" style={{ width: 100, height: 100 }} source={logoApp} resizeMode='contain' />
            </View>
            <ScrollView>
                <Animatable.View animation="fadeInUp" style={styles.loginContainer}>
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
                        <TextInput title='Password' security={true} value={password} onTextChangeFunc={setPassword} icon='key' />
                    </View>

                    <TouchableOpacity
                        disabled={disableButtonForgotPassword}
                        style={styles.containerForgotPassword}
                        activeOpacity={0.6}
                        onPress={() => navigate.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPassword}>Forgot password</Text>
                        <Animatable.View animation="rubberBand" delay={1000}>
                            <Icon style={{ marginEnd: 10 }} name={"help-circle"} size={22} color="#6562ff" />
                        </Animatable.View>
                    </TouchableOpacity>

                    <RectButton enabled={enabledAllButtons} activeOpacity={0.9} rippleColor={'#fff'} style={styles.buttonLogin} onPress={loginUser}>
                        <Text style={styles.textButtonLogin}>Login</Text>
                        {enabledAllButtons ?
                            <Icon style={{ marginStart: 10 }} name={"arrow-right"} size={22} color="#FFC633" />
                            :
                            <ActivityIndicator style={{ marginStart: 10 }} color='#FFC633' size={22} />}
                    </RectButton>
                </Animatable.View>

                <RectButton enabled={enabledAllButtons} activeOpacity={0.9} rippleColor={'#fff'} style={[styles.buttonCreateAccount]} onPress={goToCreateAccount}>
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
        backgroundColor: '#1a1a1f',
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
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        padding: 30,
        marginTop: 20,
        marginHorizontal: 25,
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2
    },

    titleLogin: {
        color: '#D8DFFD',
        fontSize: 34,
        marginBottom: 20,
        fontFamily: 'Nunito_700Bold'
    },
    forgotPassword: {
        color: '#D8DFFD',
        marginHorizontal: 10,
        fontFamily: 'Nunito_600SemiBold'

    },
    buttonLogin: {
        marginTop: 40,
        backgroundColor: '#6562ff',
        borderRadius: 15,
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        fontFamily: 'Nunito_700Bold'
    },

    buttonCreateAccount: {
        backgroundColor: '#6562ff',
        borderRadius: 15,
        paddingHorizontal: 50,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 30,
        paddingVertical: 15
    },

    textButtonLogin: {
        color: '#D8DFFD',
        fontSize: 18,
        fontFamily: 'Nunito_400Regular'
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