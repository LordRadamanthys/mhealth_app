import React, { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TextAreaCustom from '../../components/TextAreaCustom'
import ModalConfirm from '../../components/Alert'
import ModalYesNo from '../../components/ModalYesNo'
import * as Animatable from 'react-native-animatable'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />


const Exam = () => {
    const navigate = useNavigation()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [doctorsName, setDoctorsName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [showAlertDelete, setshowAlertDelete] = useState(false)

    function showMyAlertDelete() {
        setshowAlertDelete(!showAlertDelete)
    }


    return (
        <View style={styles.container}>
            <Header textCenter="Exam" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddExam')} />
            <View style={styles.formContainer}>
                <ModalConfirm show={showAlert} setShow={setshowAlert} />
                <ModalYesNo show={showAlertDelete} setShow={setshowAlertDelete} />
                <Text style={[styles.text, { fontSize: 24 }]}>Title</Text>
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

                <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonFiles} onPress={() => navigate.navigate('Files')}>
                    <Text style={[styles.text, styles.buttonText]}>Files</Text>
                    <Text style={[styles.text, styles.buttonText]}>total: 0  <Icon name={"paperclip"} size={22} color="#FFC633" /></Text>
                </RectButton>
                <View style={styles.containerBottomButtons}>
                    <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]} onPress={() => { }}>
                        <Text style={[styles.text, styles.buttonText,]}>Edit</Text>
                        <Icon style={{ marginStart: 5 }} name={"edit-2"} size={22} color="#FFC633" />
                    </RectButton>
                    <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => showMyAlertDelete()}>
                        <Text style={[styles.text, styles.buttonText]}>Delete</Text>
                        <Icon style={{ marginStart: 5 }} name={"trash"} size={22} color="#FFC633" />
                    </RectButton>
                </View>
            </View>
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
        marginVertical: 20,
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
        marginVertical: 20
    }
})

export default Exam