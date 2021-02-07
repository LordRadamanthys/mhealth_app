import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TextAreaCustom from '../../components/TextAreaCustom'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
import { getExams } from '../../controller/ExamsController'
import AuthContext from '../../providers/AuthProvider'
import { Snackbar } from 'react-native-paper'
import LoadingModal from '../../components/Loading'
import DropDownPicker from 'react-native-dropdown-picker';
import ModalConfirm from '../../components/Alert'
import { createMedicine, formatExams, getAllMedicine, getMedicine } from '../../controller/MedicinesController'
import MedicineInterface from '../../interfaces/MedicinesInterface'

const AddMedicine = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro!')
    const [listExams, setListExams] = useState([])
    const [exams, setExams] = useState([])

    function cleanFields() {
        setTitle('')
        setDate('')
        setDoctorsName('')
        setDescriptions('')
    }

    async function getListExams() {
        await getExams(user).then(response => {
            formatExams(response).then(list => {
                setListExams(list)
            }).catch(er => {
                return console.log("list erro ");

            })

        }).catch(error => {
            setListExams([])
        })




    }

    async function addMedicine() {
        if (name == "" || descriptions == "" || exams == null) {
            setTextSnackBar("Fill in all fields")
            return setShowSnackBar(true)
        }
        setShowLoading(true)
        const medicine: MedicineInterface = {
            id_exams: exams.value,
            name: name,
            how_to_use: descriptions
        }


        await createMedicine(medicine, user).catch(error => {
            setShowLoading(false)
            setTextSnackBar("Erro")
            return setShowSnackBar(true)
        })
        setShowLoading(false)
        setShowModalConfirm(true)
        //  console.log(response);


    }


    useEffect(() => {
        getListExams()
    }, [])

    return (
        <View style={styles.container}>
            <Header textCenter="New" itemRight={""} funcItemRight={() => navigate.navigate('Files')} />
            <LoadingModal setShow={() => setShowLoading(showLoading)} show={showLoading} />
            <ModalConfirm setShow={setShowModalConfirm} show={showModalConfirm} />
            <ScrollView>
                <View style={styles.formContainer}>
                    <LottieView
                        autoPlay
                        speed={0.5}
                        style={styles.lottieImage}
                        source={require('../../assets/animations/register_exam.json')}
                    />
                    <DropDownPicker

                        searchable={true}
                        searchablePlaceholder='Search...'
                        searchableError={() => <Text style={{ color: '#fff' }}>Not found<Icon name='frown' size={23} color='#FFC633' /></Text>}
                        searchableStyle={{ color: '#fff' }}
                        placeholder="Select an exam"
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
                        arrowColor='#6562ff'
                        arrowSize={23}
                        activeLabelStyle={{ color: '#fff' }}
                        selectedLabelStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#fff', fontSize: 14 }}
                        dropDownStyle={{
                            backgroundColor: 'rgba(29, 37, 65, 0.95)',
                            marginBottom: 100,
                            borderWidth: 0
                        }}

                        items={listExams}
                        onChangeItem={(item) => setExams(item)}
                    />

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type the title' value={name} icon='edit-3' onTextChangeFunc={setName} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextAreaCustom title='Type Description' value={descriptions} icon='type' onTextChangeFunc={setDescriptions} />
                    </Animatable.View>

                    <View style={styles.containerBottomButtons}>
                        <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]} onPress={addMedicine}>
                            <Text style={[styles.text, styles.buttonText,]}>Create</Text>
                            <Icon style={{ marginStart: 5 }} name={"plus"} size={22} color="#FFC633" />
                        </RectButton>
                        <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => navigate.goBack()}>
                            <Text style={[styles.text, styles.buttonText]}>Cancel</Text>
                            <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                        </RectButton>
                    </View>
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

    formContainer: {
        backgroundColor: '#1a1a1f',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 20,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        borderColor: '#6562ff',
        borderWidth: 2,
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


    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17,
        fontFamily: 'Nunito_700Bold'
    },

    containerBottomButtons: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 15
    },

    lottieImage: {
        width: 130,
        height: 130,
    },
})

export default AddMedicine