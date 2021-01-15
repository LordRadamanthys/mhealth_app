import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import TextInput from '../../components/TextInput'
import logoApp from '../../../assets/logo.png'
import Header from '../../components/Header'
import { Snackbar } from 'react-native-paper'
import { createUser } from '../../controller/UserController'
import ModalConfirm from '../../components/Alert'

const CreateAccount = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro')
    const [showModalConfirm, setSHowModalConfirm] = useState(false)

    async function createAccount() {
        if (!verifyPassword()) {
            setTextSnackBar('Verifique as senhas')
            return setShowSnackBar(true)
        }

        await createUser(name, email, password)
            .then(resp => {
                setSHowModalConfirm(true)
                cleanFields()
            })
            .catch(err => {
                console.log(err);
                setTextSnackBar(err)
                return setShowSnackBar(true)
            })
    }

    function verifyPassword() {
        if (password !== passwordConfirm || password == '' || passwordConfirm == '') return false
        return true
    }

    function cleanFields() {
        setName('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
    }

    return (
        <View style={styles.container}>
            <Header itemRightDisabled={true} itemRight={<Image style={{ width: 80, height: 170 }} source={logoApp} resizeMode='contain' />} />
            <ModalConfirm setShow={setSHowModalConfirm} show={showModalConfirm} />
            <ScrollView>
                <View style={styles.createContainer}>
                    <Text style={styles.titleCreate}>Create Account</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.profileImgContainer}>
                        
                        <Image source={undefined} style={styles.profileImg} />
                    </TouchableOpacity>

                    <View style={styles.containerInputText}>
                        <TextInput title='Name' value={name} onTextChangeFunc={setName} icon='user' />
                    </View>

                    <View style={styles.containerInputText}>
                        <TextInput title='E-Mail' value={email} onTextChangeFunc={setEmail} icon='mail' />
                    </View>
                    <View style={styles.containerInputText}>
                        <TextInput title='Password' value={password} onTextChangeFunc={setPassword} icon='lock' />
                    </View>
                    <View style={styles.containerInputText}>
                        <TextInput title='Confirm Password' value={passwordConfirm} onTextChangeFunc={setPasswordConfirm} icon='lock' />
                    </View>

                    <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={styles.buttonCreate} onPress={() => createAccount()}>
                        <Text style={styles.textButtonCreate}>Create</Text>
                        <Icon style={{ marginStart: 10 }} name={"save"} size={22} color="#FFC633" />
                    </RectButton>
                </View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1f',
        paddingTop: 40,
    },
    containerInputText: {
        marginTop: 30,
    },


    createContainer: {
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        padding: 30,
        marginTop: 40,
        marginHorizontal: 25,
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2
    },

    titleCreate: {
        color: '#D8DFFD',
        fontSize: 34,
        marginBottom: 20
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


    profileImgContainer: {
        alignSelf: 'center',
        marginHorizontal: 40,
        marginBottom: 15,
        height: 80,
        width: 80,
        borderRadius: 40,

        shadowColor: "#6562ff",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#eeefffff'
    },


})

export default CreateAccount