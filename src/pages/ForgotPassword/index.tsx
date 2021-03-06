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
    const [textSnackBar, setTextSnackBar] = useState('Ops, error signing in')

    const EmailConfirmComponent = () => {
        const [email, setEmail] = useState('')

        async function sendEmail() {
            if (email == '') {
                setTextSnackBar('Fill in the email')
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
                <Text style={styles.description}>
                    We will send a confirmation code to your email.
                    </Text>
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
                <Text style={styles.description}>We sent a code to your email, type it below to confirm that it is you.</Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type de code' value={pin}
                        onTextChangeFunc={(text: string) => setPin(text.replace('.', '').replace(',', ''))}
                        keyboardType='number'
                        length={6}
                        icon='key'
                    />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={styles.buttonCreate} onPress={() => confirmPinRequest()}>
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
                setTextSnackBar('Fill in all fields')
                return setShowSnackBar(true)
            }
            if (newPassword != ConfirmNewPassword) {
                setTextSnackBar('Passwords are not the same')
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
                <Text style={styles.description}>
                    Enter a new password, ideally it has numbers, uppercase, lowercase and special characters.
                    </Text>
                <View style={styles.containerInputText}>
                    <TextInput title='Type your new password' value={newPassword} onTextChangeFunc={setNewPassword} icon='lock' />
                </View>

                <View style={styles.containerInputText}>
                    <TextInput title='Confirm password' value={ConfirmNewPassword} onTextChangeFunc={setConfirmNewPassword} icon='lock' />
                </View>

                <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={styles.buttonCreate} onPress={() => changePassword()}>
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
        backgroundColor: '#1a1a1f',
        paddingTop: 40,
    },
    containerInputText: {
        marginTop: 30,
    },


    ForgotContainer: {
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        padding: 30,
        marginTop: 40,
        marginHorizontal: 25,
        borderRadius: 15,
        borderColor: '#6562ff',
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
        backgroundColor: '#6562ff',
        borderRadius: 15,
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