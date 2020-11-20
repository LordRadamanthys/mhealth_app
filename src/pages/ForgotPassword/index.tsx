import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import { Feather as Icon } from '@expo/vector-icons'
import logoApp from '../../../assets/logo.png'
import Header from '../../components/Header'
import ImageChangePassword from '../../svg/image_change_password'
import ImagePin from '../../svg/image_pin'
import ImagePinConfirm from '../../svg/image_confirm_pin'
import LoadingModal from '../../components/Loading'
import { changeForgotPassword, sendEmailForgotPassword, sendPinForgotPassword } from '../../controller/ForgotPasswordController'
import AuthContext from '../../providers/AuthProvider'
import { Snackbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'



const ForgotPassword = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigation()
    const [showEmailComponent, setEmailComponent] = useState(true)
    const [showPinComponent, setPinComponent] = useState(false)
    const [showPasswordComponent, setPasswordComponent] = useState(false)
    const [showLoading, setLoading] = useState(false)

    const [dataPin, setDataPin] = useState()


    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro ao fazer o login, verifique seu dados')

    const EmailConfirmComponent = () => {
        const [email, setEmail] = useState('')

        async function sendEmail() {
            if (email == '') {
                setTextSnackBar('Preencha o campo email')
                return setShowSnackBar(true)
            }

            setLoading(true)
            await sendEmailForgotPassword(email)
                .then(() => {
                    setEmailComponent(false)
                    setPinComponent(true)
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    setTextSnackBar(err)
                    return setShowSnackBar(true)
                })

        }
        return (
            <View style={styles.ForgotContainer}>
                <ImagePin width={250} height={150} />
                <Text style={styles.description}>Enviaremos um código de confirmação para seu e-mail</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='E-Mail' value={email} onTextChangeFunc={setEmail} icon='user' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => sendEmail()}>
                    <Text style={styles.textButtonCreate}>Send</Text>
                    <Icon style={{ marginStart: 10 }} name={"send"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
    }

    const PinConfirmComponent = () => {
        const [pin, setPin] = useState('')

        async function confirmPinRequest() {
            setLoading(true)

            await sendPinForgotPassword(pin)
                .then(resp => {
                    // console.log(resp);

                    setDataPin(resp)
                    setPinComponent(false)
                    setPasswordComponent(true)
                    return setLoading(false)

                }).catch(err => {
                    //console.log(err);
                    setTextSnackBar(err)
                    setLoading(false)
                    return setShowSnackBar(true)
                })

        }
        return (
            <View style={styles.ForgotContainer}>
                <ImagePinConfirm width={250} height={150} />
                <Text style={styles.description}>Enviamos um codigo para seu email, digite-o abaixo para confirmarmos que é voce mesmo.</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type de code' value={pin}
                        onTextChangeFunc={(text: string) => setPin(text.replace('.', '').replace(',', ''))}
                        keyboardType='number'
                        length={6}
                        icon='key'
                    />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => confirmPinRequest()}>
                    <Text style={styles.textButtonCreate}>Confirm</Text>
                    <Icon style={{ marginStart: 10 }} name={"target"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
    }


    const PasswordConfirmChangeComponent = () => {
        const [newPassword, setNewPassword] = useState('')
        const [ConfirmNewPassword, setConfirmNewPassword] = useState('')


        async function changePassword() {
            if (newPassword == '' || ConfirmNewPassword == '') {
                setTextSnackBar('Preencha os campos')
                return setShowSnackBar(true)
            }
            if (newPassword != ConfirmNewPassword) {
                setTextSnackBar('Senhas não são iguais')
                return setShowSnackBar(true)
            }
            setLoading(true)
            await changeForgotPassword(newPassword, dataPin.pin, dataPin.id)
                .then(resp => {
                    setDataPin(resp)
                    setPinComponent(false)
                    setPasswordComponent(true)
                    setLoading(false)
                    return navigate.goBack()
                }).catch(err => {
                    setTextSnackBar(err)
                    setLoading(false)
                    return setShowSnackBar(true)
                })
        }

        return (
            <View style={styles.ForgotContainer}>
                <ImageChangePassword width={250} height={150} />
                <Text style={styles.description}>Digite uma nova senha, ideal é que ela tenha numeros, letras maiusculas e minusculas e caracteres especiais.</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type your new password' value={newPassword} onTextChangeFunc={setNewPassword} icon='lock' />
                </View>

                <View style={styles.containerInputText}>
                    <TextInput title='Confirm password' value={ConfirmNewPassword} onTextChangeFunc={setConfirmNewPassword} icon='lock' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={() => changePassword()}>
                    <Text style={styles.textButtonCreate}>Change</Text>
                    <Icon style={{ marginStart: 10 }} name={"save"} size={22} color="#FFC633" />
                </RectButton>
            </View>
        )
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
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                duration={5000}
                style={{ alignSelf: 'center', width: '90%', backgroundColor: '#E9585E' }}
                action={{
                    label: 'Ok',
                    onPress: () => {

                    },
                }}>
                {textSnackBar}
            </Snackbar>
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