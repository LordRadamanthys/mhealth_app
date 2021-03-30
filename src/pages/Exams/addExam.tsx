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
import { insert } from '../../controller/ExamsController'
import AuthContext from '../../providers/AuthProvider'
import { Snackbar } from 'react-native-paper'
import LoadingModal from '../../components/Loading'
import { getAllSpecialties } from '../../controller/SpecialistController'
import DropDownPicker from 'react-native-dropdown-picker';
import ModalConfirm from '../../components/Alert'
import DatePicker from 'react-native-datepicker'
import InputDateCustom from '../../components/InputDateCustom'

const AddExam = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [doctorsName, setDoctorsName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [textSnackBar, setTextSnackBar] = useState('Oops, houston, we have a problem!')
    const [specialtiesList, setSpecialtiesList] = useState([])
    const [specialty, setSpecialty] = useState('')

    function cleanFields() {
        setTitle('')
        setDate('')
        setDoctorsName('')
        setDescriptions('')
    }
    async function getSpecialties() {
        setShowLoading(true)
        await getAllSpecialties(user)
            .then(resp => {
                setSpecialtiesList(resp);
                setShowLoading(false)
            }).catch(error => {
                // console.log(error);
                setShowLoading(false)
            })
    }

    async function createExam() {
        if (title == '' || date == '' || doctorsName == '' || descriptions == '' || specialty == '') {
            setTextSnackBar('Fill in all fields')
            return setShowSnackBar(true)
        }
        setShowLoading(true)

        const data = {
            title: title,
            date: date.replace('-', '/'),
            doctors_name: doctorsName,
            description: descriptions,
            id_speciality: specialty.value
        }

        try {
            const result = await insert(data, user)
            cleanFields()
            setShowLoading(false)
            return setShowModalConfirm(true)
        } catch (error) {
            console.log(error)
            setShowLoading(false)
            setTextSnackBar(error)
            return setShowSnackBar(true)
        }
    }


    useEffect(() => {
        getSpecialties()
    }, [])

    return (
        <View style={styles.container}>
            <Header textCenter="Novo exame" itemRight={""} funcItemRight={() => navigate.navigate('Files')} />
            <LoadingModal setShow={() => setShowLoading(showLoading)} show={showLoading} />
            <ModalConfirm setShow={() => setShowModalConfirm(!showModalConfirm)} show={showModalConfirm} />
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
                        searchablePlaceholder='Pesquise...'
                        searchableError={() => <Text style={{ fontFamily: 'Nunito_400Regular', color: '#fff' }}>Não encontrado  <Icon name='frown' size={23} color='#6562ff' /></Text>}
                        searchableStyle={{ fontFamily: 'Nunito_400Regular', color: '#fff' }}
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
                        arrowColor='#6562ff'
                        arrowSize={23}
                        activeLabelStyle={{ color: '#fff' }}
                        selectedLabelStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#fff', fontSize: 14 }}
                        dropDownStyle={{
                            backgroundColor: 'rgba(26, 26, 15, 0.95)',
                            marginBottom: 100,
                            borderWidth: 0
                        }}

                        items={specialtiesList}
                        onChangeItem={(item) => setSpecialty(item)}
                    />

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Digite o titulo do exame' value={title} icon='edit-3' onTextChangeFunc={setTitle} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        {/* <TextInputCustom title='Type date' value={date} icon='calendar' onTextChangeFunc={setDate} /> */}
                        <InputDateCustom title='Selecione a data' value={date} icon='calendar' onTextChangeFunc={setDate} />

                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Digite o nome do(a) doutor(a)' value={doctorsName} icon='edit-3' onTextChangeFunc={setDoctorsName} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextAreaCustom title='Digite uma descrição' value={descriptions} icon='type' onTextChangeFunc={setDescriptions} />
                    </Animatable.View>

                    <View style={styles.containerBottomButtons}>
                        <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]} onPress={createExam}>
                            <Text style={[styles.text, styles.buttonText,]}>Adicionar</Text>
                            <Icon style={{ marginStart: 5 }} name={"plus"} size={22} color="#FFC633" />
                        </RectButton>
                        <RectButton activeOpacity={0.9} rippleColor={'#fff'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => navigate.goBack()}>
                            <Text style={[styles.text, styles.buttonText]}>Cancelar</Text>
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
        color: '#D8DFFD',
        fontFamily: 'Nunito_400Regular'
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

export default AddExam