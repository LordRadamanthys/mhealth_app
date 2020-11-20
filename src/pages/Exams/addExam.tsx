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
    const [textSnackBar, setTextSnackBar] = useState('Ops, Ocorreu um erro!')
    const [specialtiesList, setSpecialtiesList] = useState([])
    const [specialty, setSpecialty] = useState('')

    function cleanFields(){
        setTitle('')
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
            setTextSnackBar('Preencha todos os campos')
            return setShowSnackBar(true)
        }
        setShowLoading(true)

        const data = {
            title: title,
            date: date,
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
            <Header textCenter="New Exam" itemRight={""} funcItemRight={() => navigate.navigate('Files')} />
            <LoadingModal setShow={() => setShowLoading(showLoading)} show={showLoading} />
            <ModalConfirm  setShow={()=>setShowModalConfirm(showModalConfirm)} show={showModalConfirm} />
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

                        items={specialtiesList}
                        onChangeItem={(item) => setSpecialty(item)}
                    />

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type the title' value={title} icon='edit-3' onTextChangeFunc={setTitle} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type date' value={date} icon='calendar' onTextChangeFunc={setDate} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type the Doctors name' value={doctorsName} icon='edit-3' onTextChangeFunc={setDoctorsName} />
                    </Animatable.View>

                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextAreaCustom title='Type Description' value={descriptions} icon='type' onTextChangeFunc={setDescriptions} />
                    </Animatable.View>

                    <View style={styles.containerBottomButtons}>
                        <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]} onPress={createExam}>
                            <Text style={[styles.text, styles.buttonText,]}>Create</Text>
                            <Icon style={{ marginStart: 5 }} name={"plus"} size={22} color="#FFC633" />
                        </RectButton>
                        <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => navigate.goBack()}>
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
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },

    formContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 20,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 25,
        borderColor: '#E9585E',
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
        borderRadius: 25,
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
        fontSize: 17
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