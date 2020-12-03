import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import ModalAddFile from '../../components/ModalAddFile'
import ModalYesNo from '../../components/ModalYesNo'
import EmptyListComponent from '../../components/EmptyList'
import AuthContext from '../../providers/AuthProvider'
import { useNavigation, useRoute } from '@react-navigation/native'
import { deleteFile, getFilesExam } from '../../controller/FilesExamController'
import FileInterface from '../../interfaces/FilesInterface'
import LoadingModal from '../../components/Loading'
import { Snackbar } from 'react-native-paper'
import { deleteFileVaccine, getFilesVaccine } from '../../controller/FilesVaccineController'
import FileVaccineInterface from '../../interfaces/FilesVaccineInterface'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />

const FilesVaccine = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigation()
    const routes = useRoute()
    const [listFiles, setListFiles] = useState([])
    const [showAlertFile, setShowAlertFile] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro')
    const id_vaccine = routes.params.id_vaccine

    function showModal() {
        setShowAlertFile(!showAlertFile)
    }

    async function deleteFileOnly(file: FileVaccineInterface) {
        const data = {
            id_user: user?.id,
            id_vaccine: id_vaccine,
            id_file: file.id,
            name_file: file.name_file
        }
        
        setShowLoading(true)

        await deleteFileVaccine(data, user)
            .catch(error => {
                setTextSnackBar(error)
                setShowSnackBar(true)
                return setShowLoading(false)
            })
        getFiles()
        setTextSnackBar("Deletado com sucesso")
        return setShowSnackBar(true)
    }

    function goToFile(file: FileVaccineInterface) {
       

        file.page = 'vaccine'
        navigate.navigate('ViewFileVaccine', { data: file })
    }

    async function getFiles() {
        setShowLoading(true)
        try {
            const files = await getFilesVaccine(id_vaccine, user)
            setListFiles(files)
            return setShowLoading(false)
        } catch (error) {
            console.log(error);

        }

    }

    function formatText(text: string) {
        return text.substring(0, 20).concat('...')
    }


    useEffect(() => {
        getFiles()
    }, [])

    return (
        <View style={styles.container}>
            <ModalAddFile show={showAlertFile} setShow={setShowAlertFile} id={id_vaccine} callback={() => getFiles()} page='vaccine' />
            <ModalYesNo show={showAlertDelete} setShow={setShowAlertDelete} onOkPress={() => { }} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <Header textCenter="Files" itemRight={iconRightHeader} funcItemRight={showModal} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
                <View style={styles.main}>

                    {listFiles.length > 0 ? listFiles.map((file: FileVaccineInterface) => {
                        return (
                            <View style={styles.containerButtons} key={file.id}>

                                <RectButton
                                    activeOpacity={0.9}
                                    rippleColor={'#FFC633'}
                                    style={[styles.buttonFile, { backgroundColor: '#3D5089', }]}
                                    onPress={() => goToFile(file)}
                                >
                                    <Text style={[styles.text, styles.buttonText]}>{formatText(file.name_file)}</Text>
                                </RectButton>
                                <RectButton
                                    activeOpacity={0.9}
                                    rippleColor={'#FFC633'}
                                    style={[styles.buttonDelete, { backgroundColor: '#E9585E', }]}
                                    onPress={() => deleteFileOnly(file)}
                                >
                                    <Icon style={{ marginStart: 5 }} name={"trash"} size={22} color="#FFC633" />
                                </RectButton>
                            </View>
                        )
                    }) : <EmptyListComponent />}
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

export default FilesVaccine
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },

    containerInputSearch: {
        marginHorizontal: 20,
        marginTop: 20
    },

    main: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    containerButtons: {
        flexDirection: 'row',
        marginTop: 20
    },

    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17
    },

    buttonFile: {
        marginHorizontal: 5,
        borderRadius: 25,
        minWidth: 250,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    buttonDelete: {
        marginHorizontal: 5,
        borderRadius: 25,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
})