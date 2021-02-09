import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import { Feather as Icon } from '@expo/vector-icons'
import logoApp from '../../../assets/logo.png'
import Header from '../../components/Header'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'
import AuthContext from '../../providers/AuthProvider'
import { Snackbar } from 'react-native-paper'
import { updateUser } from '../../controller/UserController'
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'

const Profile = () => {
    const { user, clearUser } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSwitch, setIsSwitch] = useState(false)
    const [image, setImage] = useState('')
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro')
    async function logout_user() {
        clearUser()
    }
    const getPermissionAsync = async () => {
        if (Constants.platform?.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Preciso de permissão para acessar seus arquivos, para você escolher sua foto');
            }
        }
    }


    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }

            console.log(image)
        } catch (error) {
            console.log(error.message);
        }
    }


    async function editUser() {
        if (name == '') {
            setTextSnackBar('Fill in all fields')
            return setShowSnackBar(true)
        }

        if (password != '') {
            if (password != confirmPassword) {
                setTextSnackBar('Fill in the password fields')
                return setShowSnackBar(true)
            }
        }

        await updateUser(user, name, password, image).then(response => {

        }).catch(error => {

            setTextSnackBar(error)
            return setShowSnackBar(true)
        })
    }


    async function getIsTouchId() {
        try {
            const touchId = await AsyncStorage.getItem('@touchId') as String
            console.log(touchId);

            if (touchId == "false") {
                setIsSwitch(false)
            } else {
                setIsSwitch(true)
            }

        } catch (e) {
            // error reading value
        }
    }

    async function turnOnFingerPrint(value: any) {
        console.log(value)
        setIsSwitch(value)
        await AsyncStorage.setItem('@touchId', String(value))
    }


    useEffect(() => {
        getIsTouchId()
        setName(user?.name)
        //setName(user?.password)
        getPermissionAsync()
    }, [])

    return (
        <View style={styles.container}>
            <Header itemRightDisabled={true} itemRight={<Image style={{ width: 80, height: 170 }} source={logoApp} resizeMode='contain' />} />

            <ScrollView>
                <View style={styles.createContainer}>
                    <Text style={styles.titleCreate}>{user?.name}</Text>
                    <TouchableOpacity onPress={_pickImage} style={styles.profileImgContainer}>
                        <Image source={image != '' ? { uri: image } : { uri: `${user?.link_files}${user?.id}/profile.jpg` }} style={styles.profileImg} />
                    </TouchableOpacity>
                    <View style={styles.containerInputText}>
                        <TextInput title='E-Mail' value={name} onTextChangeFunc={setName} icon='user' />
                    </View>
                    <View style={styles.containerInputText}>
                        <TextInput title='Password' value={password} security={true} onTextChangeFunc={setPassword} icon='key' />
                    </View>
                    <View style={styles.containerInputText}>
                        <TextInput title='Confirm password' value={confirmPassword} security={true} onTextChangeFunc={setConfirmPassword} icon='key' />
                    </View>
                    <View style={[styles.containerInputText, { flexDirection: "row" }, styles.containerTextInput]}>
                        <Icon style={{ marginEnd: 10 }} name={"lock"} size={20} color={"#6562ff"} />
                        <Text style={styles.textLock}>Login with touch ID    </Text>
                        <Switch value={isSwitch} onValueChange={(value) => turnOnFingerPrint(value)} color="#6562ff" />
                    </View>
                    <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={editUser}>
                        <Text style={styles.textButtonCreate}>Edit</Text>
                        <Icon style={{ marginStart: 10 }} name={"save"} size={22} color="#FFC633" />
                    </RectButton>
                    <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonCreate, { backgroundColor: '#E9585E' }]} onPress={logout_user}>
                        <Text style={styles.textButtonCreate}>Logout</Text>
                        <Icon style={{ marginStart: 10 }} name={"x"} size={22} color="#FFC633" />
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
    containerTextInput: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderRadius: 10,
        width: '105%',
        alignSelf: 'center',
        paddingHorizontal: 15,
        fontSize: 16,
    },
    textLock: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Nunito_400Regular'
    },
    createContainer: {
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        padding: 30,
        marginTop: 20,
        marginHorizontal: 25,
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2
    },

    titleCreate: {
        color: '#D8DFFD',
        fontSize: 26,
        marginBottom: 20,
        fontFamily: 'Nunito_600SemiBold'
    },

    buttonCreate: {
        marginTop: 20,
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
        fontFamily: 'Nunito_700Bold'
    },


    profileImgContainer: {
        alignSelf: 'center',
        marginHorizontal: 40,
        marginBottom: 15,
        height: 80,
        width: 80,
        borderRadius: 40,

        shadowColor: "#000",
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
export default Profile
