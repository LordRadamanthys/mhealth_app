import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import TextAreaCustom from '../../components/TextAreaCustom'
import ModalConfirm from '../../components/Alert'
import ModalYesNo from '../../components/ModalYesNo'
import * as Animatable from 'react-native-animatable'
import { ExamsInterface } from '../../interfaces/ExamsInterface'
import { getFilesExam } from '../../controller/FilesExamController'
import AuthContext from '../../providers/AuthProvider'
import LoadingModal from '../../components/Loading'
import { deleteExamAndFiles, update } from '../../controller/ExamsController'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAllSpecialties } from '../../controller/SpecialistController'
import { Snackbar } from 'react-native-paper'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />


const Exam = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigation()
    const routes = useRoute()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [doctorsName, setDoctorsName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [showAlertDelete, setshowAlertDelete] = useState(false)
    const [showLoading, setShowLoading] = useState(true)
    const [enabledEdit, setEnabledEdit] = useState(false)
    const [specialtiesList, setSpecialtiesList] = useState([])
    const [files, setFiles] = useState(0)
    const exam = routes.params.data as ExamsInterface
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro!')

    function showMyAlertDelete() {
        setshowAlertDelete(!showAlertDelete)
    }

    function goToFiles(id: number) {
        navigate.navigate('Files', { id_exam: id })
    }

    async function deleteExam() {
        setShowLoading(true)
        try {
            const result = await deleteExamAndFiles(exam.id, user)
            console.log(result);
            setshowAlertDelete(false)
            setShowLoading(false)
            navigate.goBack()
        } catch (error) {
            console.log(error);
            setshowAlertDelete(false)
            setShowLoading(false)
        }
    }


    async function updateExam() {
        if (title == '' || date == '' || doctorsName == '' || descriptions == '' || specialty == '') {
            setTextSnackBar('Preencha todos os campos')
            return setShowSnackBar(true)
        }

        setShowLoading(true)
        const data = {
            id: exam.id,
            title: title,
            date: date,
            doctors_name: doctorsName,
            description: descriptions,
            id_speciality: specialty.value

        }
        try {
            const result = await update(data, user)

            blockTextInputs()
            setShowLoading(false)
            setTextSnackBar(result)
            return setShowSnackBar(true)
        } catch (error) {
            setShowLoading(false)
            setTextSnackBar(error)
            return setShowSnackBar(true)
        }
    }

    async function getSpecialty() {
        try {
            const result = await getAllSpecialties(user)
            setSpecialtiesList(result)
            const name_specialty = result.find((r) => {
                if (r.value == exam.id_speciality) return r.value
            })
            setSpecialty(name_specialty)
        } catch (error) {
            console.log(error);
        }
    }

    async function getFile() {
        setShowLoading(true)
        try {
            const result = await getFilesExam(exam.id, user)
            setFiles(result.length);
            setShowLoading(false)

        } catch (err) {
            console.log(err);
            setShowLoading(false)

        }
    }

    function blockTextInputs() {
        setEnabledEdit(false)
    }

    useEffect(() => {
        setTitle(exam.title)
        setDate(exam.date)
        setDescriptions(exam.description)
        setDoctorsName(exam.doctors_name)
        specialty == '' ? getSpecialty() : null
        getFile()
    }, [enabledEdit])
    return (
        <View style={styles.container}>
            <Header textCenter="Exams" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddExam')} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />

            {!showLoading ?
                <ScrollView>
                    <View style={styles.formContainer}>
                        <ModalConfirm show={showAlert} setShow={setshowAlert} />
                        <Animatable.View animation={!enabledEdit ? 'rubberBand' : 'bounceIn'}>
                            <Icon style={{ marginBottom: 15 }} name={!enabledEdit ? 'lock' : 'unlock'} size={24} color={!enabledEdit ? "#FFC633" : "#E9585E"} />
                        </Animatable.View>
                        <ModalYesNo show={showAlertDelete} setShow={setshowAlertDelete} onOkPress={deleteExam} />
                        {!enabledEdit ?
                            <DropDownPicker
                                placeholder={specialty.label}
                                placeholderStyle={{ color: '#fff' }}
                                containerStyle={{ height: 50, width: 290, maxWidth: 290, marginBottom: 15 }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.09)',
                                    borderWidth: 0,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                arrowColor='#FFC633'
                                arrowSize={23}
                                activeLabelStyle={{ color: '#fff' }}
                                selectedLabelStyle={{ color: '#fff' }}
                                labelStyle={{ color: '#fff', fontSize: 14 }}
                                dropDownStyle={{
                                    backgroundColor: 'rgba(29, 37, 65, 0.95)',
                                    marginBottom: 100,
                                    borderWidth: 0
                                }}
                                disabled={true}
                                items={[]}
                            />
                            :
                            <DropDownPicker

                                searchable={true}
                                searchablePlaceholder='Pesquisar...'
                                searchableError={() => <Text style={{ color: '#fff' }}>Não encontrado  <Icon name='frown' size={23} color='#FFC633' /></Text>}
                                searchableStyle={{ color: '#fff' }}
                                placeholder="Selecione um especialista"
                                placeholderStyle={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                containerStyle={{ height: 50, width: 290, maxWidth: 290, marginBottom: 15 }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.09)',
                                    borderWidth: 0,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                arrowColor={!enabledEdit ? "#FFC633" : "#E9585E"}
                                arrowSize={23}
                                activeLabelStyle={{ color: '#fff' }}
                                selectedLabelStyle={{ color: '#fff' }}
                                labelStyle={{ color: '#fff', fontSize: 14 }}
                                dropDownStyle={{
                                    backgroundColor: 'rgba(29, 37, 65, 0.95)',
                                    marginBottom: 100,
                                    borderWidth: 0
                                }}

                                items={specialtiesList}
                                onChangeItem={(item) => setSpecialty(item)}
                            />}
                        <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                            <TextInputCustom title='Type the title' value={title}
                                icon='edit-3'
                                iconColor={!enabledEdit ? "#FFC633" : "#E9585E"}
                                onTextChangeFunc={setTitle} editable={enabledEdit}
                            />
                        </Animatable.View>

                        <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                            <TextInputCustom title='Type date' value={date}
                                icon='calendar'
                                onTextChangeFunc={setDate}
                                iconColor={!enabledEdit ? "#FFC633" : "#E9585E"}
                                editable={enabledEdit}
                            />
                        </Animatable.View>

                        <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                            <TextInputCustom title='Type the Doctors name' value={doctorsName}
                                icon='edit-3'
                                onTextChangeFunc={setDoctorsName}
                                iconColor={!enabledEdit ? "#FFC633" : "#E9585E"}
                                editable={enabledEdit}
                            />
                        </Animatable.View>

                        <Animatable.View animation="fadeInUp" style={styles.formInputContainer}>
                            <TextAreaCustom title='Type Description' value={descriptions}
                                icon='type'
                                onTextChangeFunc={setDescriptions}
                                iconColor={!enabledEdit ? "#FFC633" : "#E9585E"}
                                editable={enabledEdit}
                            />
                        </Animatable.View>

                        <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonFiles} onPress={() => goToFiles(exam.id)}>
                            <Text style={[styles.text, styles.buttonText]}>Files</Text>
                            <Text style={[styles.text, styles.buttonText]}>total: {files}  <Icon name={"paperclip"} size={22} color="#FFC633" /></Text>
                        </RectButton>

                        <View style={styles.containerBottomButtons}>
                            {!enabledEdit ?
                                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'}
                                    style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]}
                                    onPress={() => setEnabledEdit(!enabledEdit)}
                                >
                                    <Text style={[styles.text, styles.buttonText,]}>Edit</Text>
                                    <Icon style={{ marginStart: 5 }} name={"edit-2"} size={22} color="#FFC633" />
                                </RectButton>
                                :
                                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'}
                                    style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]}
                                    onPress={() => updateExam()}
                                >
                                    <Text style={[styles.text, styles.buttonText,]}>Save</Text>
                                    <Icon style={{ marginStart: 5 }} name={"save"} size={22} color="#FFC633" />
                                </RectButton>
                            }



                            {!enabledEdit ?
                                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'}
                                    style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]}
                                    onPress={() => showMyAlertDelete()}
                                >
                                    <Text style={[styles.text, styles.buttonText]}>Delete</Text>
                                    <Icon style={{ marginStart: 5 }} name={"trash"} size={22} color="#FFC633" />
                                </RectButton>
                                :
                                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'}
                                    style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]}
                                    onPress={() => blockTextInputs()}
                                >
                                    <Text style={[styles.text, styles.buttonText]}>Cancel</Text>
                                    <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                                </RectButton>
                            }

                        </View>
                    </View>
                </ScrollView> : <></>}
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
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },

    formContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 25,
        borderColor: '#E9585E',
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
        borderRadius: 25,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },

    buttonFiles: {
        marginTop: 10,
        backgroundColor: '#3D5089',
        borderRadius: 25,
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 15
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
        marginVertical: 15
    }
})

export default Exam