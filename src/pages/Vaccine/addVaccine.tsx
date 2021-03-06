import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import ModalConfirm from '../../components/Alert'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import { insertVaccine } from '../../controller/VaccinesController'
import AuthContext from '../../providers/AuthProvider'
import LoadingModal from '../../components/Loading'
import InputDateCustom from '../../components/InputDateCustom'

const AddVaccine = () => {
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [dateReturn, setDateReturn] = useState('')
    const [local, setLocal] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    async function addVaccine() {
        if (title == '' || date == '' || local == '') return console.log('err');
        setShowLogin(true)
        const data = {
            title: title,
            date: date.replace('-', '/').replace('-', '/'),
            date_return: dateReturn.replace('-', '/').replace('-', '/'),
            local: local,
        }

        await insertVaccine(data, user).then(response => {
            setShowLogin(false)
            cleanFields()
            return setShowModalConfirm(true)
        }).catch(error => {
            console.log(error);
            setShowLogin(false)
        })
    }

    function cleanFields() {
        setTitle('')
        setDate('')
        setDateReturn('')
        setTitle('')
        setLocal('')
    }

    return (
        <View style={styles.container}>
            <Header textCenter="Adicionar vacina" itemRight={""} />
            <LoadingModal setShow={() => setShowLogin(showLogin)} show={showLogin} />
            <ModalConfirm setShow={() => setShowModalConfirm(!showModalConfirm)} show={showModalConfirm} />
            <ScrollView>
                <View style={styles.formContainer}>

                    <LottieView
                        autoPlay
                        speed={1}
                        style={styles.lottieImage}
                        source={require('../../assets/animations/register_exam.json')}
                    />
                    <ModalConfirm show={showAlert} setShow={setshowAlert} />
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Digite o nome' value={title} icon='edit-3' onTextChangeFunc={setTitle} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        {/* <TextInputCustom title='Type date' value={date} icon='calendar' onTextChangeFunc={setDate} /> */}
                        <InputDateCustom title='Selecione uma data' value={date} icon='calendar' onTextChangeFunc={setDate} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        {/* <TextInputCustom title='Type date return' value={dateReturn} icon='calendar' onTextChangeFunc={setDateReturn} /> */}
                        <InputDateCustom title='Selecione a data de retorno' value={dateReturn} icon='calendar' onTextChangeFunc={setDateReturn} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='local da vacinação' value={local} icon='map-pin' onTextChangeFunc={setLocal} />
                    </Animatable.View>


                    <View style={styles.containerBottomButtons}>
                        <RectButton activeOpacity={0.9} rippleColor={'#ff'} style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]} onPress={addVaccine}>
                            <Text style={[styles.text, styles.buttonText,]}>Salvar</Text>
                            <Icon style={{ marginStart: 5 }} name={"plus"} size={22} color="#FFC633" />
                        </RectButton>
                        <RectButton activeOpacity={0.9} rippleColor={'#ff'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => { }}>
                            <Text style={[styles.text, styles.buttonText]}>Cancelar</Text>
                            <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                        </RectButton>
                    </View>
                </View>
            </ScrollView>
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
        borderWidth: 2
    },


    formInputContainer: {
        marginVertical: 15,
        marginHorizontal: 5,
    },



    buttonEdit: {
        marginTop: 10,
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
        marginBottom: 20
    },

    buttonAddDose: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 24,
        fontSize: 16,
    },
    lottieImage: {
        width: 130,
        height: 130,
    },
})

export default AddVaccine