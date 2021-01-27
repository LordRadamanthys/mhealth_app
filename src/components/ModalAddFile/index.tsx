import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../TextInput'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as DocumentPicker from 'expo-document-picker';
import api from '../../services/api'
import AuthContext from '../../providers/AuthProvider'


interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
    id?: number
    page: string
    callback(): void
}


const ModalAddFile: React.FC<AlertInterface> = ({ show, setShow, id, callback, page }) => {
    const [nameFile, setNameFile] = useState('')
    const [file, setFile] = useState(null)
    const { user } = useContext(AuthContext)


    const getPermissionAsync = async () => {
        if (Constants.platform?.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('I need permission to access your files, so you can choose your photo');
            }
        }
    }

    const pickFile = async () => {
        const pickerOptions = {
            copyToCacheDirectory: false,
            type: "*/*",
            multiple: false,
        };
        try {
            let result = await DocumentPicker.getDocumentAsync(pickerOptions)
            // if (!result.cancelled) {
            //     setImage(result.uri);
            // }
            setNameFile(result.name.replace('.pdf', '').replace('.jpg', ''))
            setFile(result)
            console.log(result)
        } catch (E) {
            console.log("teste" + E);
        }
    }

    async function upload() {
        if (page == 'vaccine') {
            return await uploadFileVaccine()
        } else {
            return await uploadFile()

        }
    }

    async function uploadFile() {
        const data = new FormData()
        data.append('id_exam', id)
        data.append('name_file', nameFile)
        data.append('file', {
            uri: file.uri,
            name: file.name,
            type: '*/*'
        })

        await api.post(`exams/file`, data, {

            headers: {
                'Authorization': 'Bearer' + user?.token,
                'Content-Type': 'multipart/form-data',
            }
        }).then(resp => {
            setShow(false)
            return callback()
        }).catch(error => {
            console.log(error.message)
        })
    }

    async function uploadFileVaccine() {
        const data = new FormData()
        data.append('id_vaccine', id)
        data.append('name_file', nameFile)
        data.append('file', {
            uri: file.uri,
            name: file.name,
            type: '*/*'
        })

        await api.post(`vaccines/file`, data, {

            headers: {
                'Authorization': 'Bearer' + user?.token,
                'Content-Type': 'multipart/form-data',
            }
        }).then(resp => {
            setShow(false)
            return callback()
        }).catch(error => {
            console.log(error.message)
        })
    }


    useEffect(() => {
        getPermissionAsync()
    }, [])


    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>New File</Text>
                    <View style={styles.containerText}>
                        <TextInputCustom title="Title" value={nameFile} onTextChangeFunc={setNameFile} icon="edit-2" />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.button, { backgroundColor: '#6562ff', alignSelf: 'flex-start', paddingHorizontal: 50 }]}
                        onPress={() => pickFile()}>
                        <Text style={[styles.text, styles.buttonText]}>Search file</Text>
                        <Icon style={{ marginStart: 5 }} name={"file"} size={22} color="#FFC633" />
                    </TouchableOpacity>

                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#6562ff', }]}
                            onPress={upload}>
                            <Icon style={{ marginStart: 5 }} name={"check"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#E9585E', }]}
                            onPress={() => setShow(false)}>
                            <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default ModalAddFile



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(26, 26, 15, 0.65)'
    },

    mainView: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#1a1a1f',
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2,
        alignItems: 'center',

    },
    text: {
        color: '#D8DFFD'
    },
    title: {
        fontSize: 24,
        marginBottom: 40
    },

    description: {
        fontSize: 20,
        marginBottom: 30
    },

    buttonText: {
        fontSize: 17
    },

    button: {
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 15,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,

    },

    containerBottomButtons: {
        flexDirection: 'row',
    },

    containerText: {
        marginVertical: 10
    }


})