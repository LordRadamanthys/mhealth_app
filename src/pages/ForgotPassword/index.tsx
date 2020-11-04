import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator, Modal } from 'react-native'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import { Feather as Icon } from '@expo/vector-icons'
import logoApp from '../../../assets/logo.png'
import Header from '../../components/Header'
import ImageChangePassword from '../../svg/image_change_password'
import ImagePin from '../../svg/image_pin'
import ImagePinConfirm from '../../svg/image_confirm_pin'
import LoadingModal from '../../components/Loading'






const ForgotPassword = () => {
    const [email, setEmail] = useState()
    const [showEmailComponent, setEmailComponent] = useState(true)
    const [showPinComponent, setPinComponent] = useState(false)
    const [showPasswordComponent, setPasswordComponent] = useState(false)
    const [showLoading, setLoading] = useState(false)
    const [pin, setPin] = useState()
    const [confirmPin, setConfirmPin] = useState()
    const [newPassword, setNewPassword] = useState()
    const [ConfirmNewPassword, setConfirmNewPassword] = useState()

    const EmailConfirmComponent = () => {
        return (
            <View style={styles.ForgotContainer}>
                <ImagePin width={250} heght={150} />
                <Text style={styles.description}>Enviaremos um código de confirmação para seu e-mail</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type your e-mail' value={""} onTextChangeFunc={() => { }} icon='mail' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => sendEmail()}>
                    <Text style={styles.textButtonCreate}>Send</Text>
                    <Icon style={{ marginStart: 10 }} name={"send"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
    }

    const PinConfirmComponent = () => {
        return (
            <View style={styles.ForgotContainer}>
                <ImagePinConfirm width={250} heght={150} />
                <Text style={styles.description}>Enviamos um codigo para seu email, digite-o abaixo para confirmarmos que é voce mesmo.</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type de code' value={""} onTextChangeFunc={() => { }} icon='key' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => confirmPinRequest()}>
                    <Text style={styles.textButtonCreate}>Confirm</Text>
                    <Icon style={{ marginStart: 10 }} name={"target"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
    }


    const PasswordConfirmChangeComponent = () => {
        return (
            <View style={styles.ForgotContainer}>
                <ImageChangePassword width={250} heght={150} />
                <Text style={styles.description}>Digite uma nova senha, ideal é que ela tenha numeros, letras maiusculas e minusculas e caracteres especiais.</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type your new password' value={""} onTextChangeFunc={() => { }} icon='lock' />
                </View>

                <View style={styles.containerInputText}>
                    <TextInput title='Confirm password' value={""} onTextChangeFunc={() => { }} icon='lock' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => { }}>
                    <Text style={styles.textButtonCreate}>Change</Text>
                    <Icon style={{ marginStart: 10 }} name={"save"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
    }

    function sendEmail() {
        setLoading(true)

        setEmailComponent(false)
        setPinComponent(true)
        setLoading(false)
    }

    function confirmPinRequest() {
        setLoading(true)

        setPinComponent(false)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Header itemRightDisabled={true} itemRight={<Image style={{ width: 80, height: 170 }} source={logoApp} resizeMode='contain' />} />
            <ScrollView>
                <Text style={styles.titleForgot}>Forgot password</Text>
                <LoadingModal setShow={() => setLoading(!showLoading)} show={showLoading} />

                {showEmailComponent ? <EmailConfirmComponent /> : <></>}
                {showPinComponent ? <PinConfirmComponent /> : <></>}
                {showPasswordComponent ? <PasswordConfirmChangeComponent /> : <></>}
            </ScrollView>

        </View>
    )
}

export default ForgotPassword
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },
    containerInputText: {
        marginTop: 30,
    },


    ForgotContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        padding: 30,
        marginTop: 40,
        marginHorizontal: 25,
        borderRadius: 25,
        borderColor: '#E9585E',
        borderWidth: 2
    },

    titleForgot: {
        color: '#D8DFFD',
        fontSize: 26,
        alignSelf: 'center'
    },

    description: {
        color: '#D8DFFD',
        fontSize: 18,
        marginTop: 20,
        fontStyle: 'italic'
    },

    buttonCreate: {
        marginTop: 40,
        backgroundColor: '#3D5089',
        borderRadius: 25,
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },


    textButtonCreate: {
        color: '#D8DFFD',
        fontSize: 18,

    },


})