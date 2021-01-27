import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import ModalConfirm from '../../components/Alert'
import ModalYesNo from '../../components/ModalYesNo'
import * as Animatable from 'react-native-animatable'
import AuthContext from '../../providers/AuthProvider'
import VaccinesInterface from '../../interfaces/VaccinesInterface'
import { Snackbar } from 'react-native-paper'
import { deleteVaccineAndFiles, updateVaccine } from '../../controller/VaccinesController'
import LoadingModal from '../../components/Loading'
import { getFilesVaccine } from '../../controller/FilesVaccineController'
const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />

const Vaccine = () => {
    const { user } = useContext(AuthContext)
    const router = useRoute()
    const vaccine: VaccinesInterface = router.params.data
    const navigate = useNavigation()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [dateReturn, setDateReturn] = useState('')
    const [local, setLocal] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [showAlertDelete, setshowAlertDelete] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro!')
    const [enabledEdit, setEnabledEdit] = useState(false)
    const [totalFiles, setTotalFiles] = useState(0)

    function showMyAlertDelete() {
        setshowAlertDelete(!showAlertDelete)
    }

    async function getFiles() {
        const response = await getFilesVaccine(vaccine.id, user).catch(error => {
            return console.log(error);

        })
        return setTotalFiles(response.length);

    }

    async function deleteVaccine() {
        setShowLoading(true)

        const response = await deleteVaccineAndFiles(vaccine.id, user).catch(error => {
            setShowLoading(false)
            return console.log(error);

        })
        setShowLoading(false)
        console.log(response)
        return navigate.goBack()
    }


    async function saveVaccine() {
        if (title == '' || date == '' || local == '') {
            setTextSnackBar('Make sure you have correctly filled in the Title, Date and Location fields')
            return setShowSnackBar(true)
        }
        setShowLoading(true)
        const data = {
            id: vaccine.id,
            title: title,
            date: date,
            date_return: dateReturn,
            local: local,
        }
        const response = await updateVaccine(data, user).catch(error => {
            setShowLoading(false)
            return setShowSnackBar(true)
        })
        setEnabledEdit(false)
        setShowLoading(false)
        setTextSnackBar('Atualizado')
        return setShowSnackBar(true)
    }

    useFocusEffect(
        React.useCallback(() => {
            getFiles()

            return () => { };
        }, [])
    )

    useEffect(() => {
        getFiles()
        setTitle(vaccine.title)
        setDate(vaccine.date)
        setDateReturn(vaccine.date_return)
        setLocal(vaccine.local)

    }, [])

    return (
        <View style={styles.container}>
            <Header textCenter="Vaccine" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddVaccine')} />
            <LoadingModal setShow={() => setShowLoading(showLoading)} show={showLoading} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <ModalConfirm show={showAlert} setShow={setshowAlert} />
                    <ModalYesNo show={showAlertDelete} setShow={setshowAlertDelete} onOkPress={deleteVaccine} />
                    <Animatable.View animation={!enabledEdit ? 'rubberBand' : 'bounceIn'}>
                        <Icon style={{ marginBottom: 20 }} name={!enabledEdit ? 'lock' : 'unlock'} size={24} color={!enabledEdit ? "#6562ff" : "#E9585E"} />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                        <TextInputCustom editable={enabledEdit} iconColor={!enabledEdit ? "#6562ff" : "#E9585E"} title='Type the title' value={title} icon='edit-3' onTextChangeFunc={setTitle} />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                        <TextInputCustom editable={enabledEdit} iconColor={!enabledEdit ? "#6562ff" : "#E9585E"} title='Type date' value={date} icon='calendar' onTextChangeFunc={setDate} />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                        <TextInputCustom editable={enabledEdit} iconColor={!enabledEdit ? "#6562ff" : "#E9585E"} title='Type date return' value={dateReturn} icon='calendar' onTextChangeFunc={setDateReturn} />
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                        <TextInputCustom editable={enabledEdit} iconColor={!enabledEdit ? "#6562ff" : "#E9585E"} title='local' value={local} icon='map-pin' onTextChangeFunc={setLocal} />
                    </Animatable.View>

                    <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={styles.buttonFiles} onPress={() => navigate.navigate('FilesVaccine', { id_vaccine: vaccine.id })}>
                        <Text style={[styles.text, styles.buttonText]}>Files</Text>
                        <Text style={[styles.text, styles.buttonText]}>{`total: ${totalFiles}`}  <Icon name={"paperclip"} size={22} color="#FFC633" /></Text>
                    </RectButton>

                    {!enabledEdit ?
                        <View style={styles.containerBottomButtons}>

                            <RectButton
                                activeOpacity={0.9}
                                rippleColor={'#fff'}
                                style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]}
                                onPress={() => setEnabledEdit(!enabledEdit)}
                            >
                                <Text style={[styles.text, styles.buttonText,]}>Edit</Text>
                                <Icon style={{ marginStart: 5 }} name={"edit-2"} size={22} color="#FFC633" />
                            </RectButton>

                            <RectButton
                                activeOpacity={0.9}
                                rippleColor={'#fff'}
                                style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]}
                                onPress={() => showMyAlertDelete()}
                            >
                                <Text style={[styles.text, styles.buttonText]}>Delete</Text>
                                <Icon style={{ marginStart: 5 }} name={"trash"} size={22} color="#FFC633" />
                            </RectButton>
                        </View>

                        :

                        <View style={styles.containerBottomButtons}>

                            <RectButton
                                activeOpacity={0.9}
                                rippleColor={'#fff'}
                                style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]}
                                onPress={saveVaccine}
                            >
                                <Text style={[styles.text, styles.buttonText,]}>Save</Text>
                                <Icon style={{ marginStart: 5 }} name={"save"} size={22} color="#FFC633" />
                            </RectButton>

                            <RectButton
                                activeOpacity={0.9}
                                rippleColor={'#fff'}
                                style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]}
                                onPress={() => setEnabledEdit(!enabledEdit)}
                            >
                                <Text style={[styles.text, styles.buttonText]}>Cancel</Text>
                                <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                            </RectButton>
                        </View>
                    }

                </View>
            </ScrollView>

            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                duration={5000}
                style={{ alignSelf: 'center', width: '90%', backgroundColor: !enabledEdit ? '#FFC633' : '#E9585E' }}
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

    formContainer: {
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2
    },
    containerMainButton: {
        marginVertical: 10
    },

    formInputContainer: {
        marginVertical: 15,
        marginHorizontal: 5,
    },

    buttonEdit: {
        marginTop: 15,
        borderRadius: 15,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },

    buttonFiles: {
        backgroundColor: '#6562ff',
        borderRadius: 15,
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 15,
        marginVertical: 10
    },

    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17
    },

    containerBottomButtons: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 30,
        marginTop: 10
    },

})

export default Vaccine