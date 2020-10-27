import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TextAreaCustom from '../../components/TextAreaCustom'
import ModalConfirm from '../../components/Alert'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />

const AddVaccine = () => {
    const navigate = useNavigation()
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [doctorsName, setDoctorsName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [showAlert, setshowAlert] = useState(false)

    function showMyAlertConfirm() {
        setshowAlert(!showAlert)
    }


    return (
        <View style={styles.container}>
            <Header textCenter="New Vaccine" itemRight={""} />
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
                        <TextInputCustom title='Type the title' value={title} icon='edit-3' onTextChangeFunc={setTitle} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type date' value={date} icon='calendar' onTextChangeFunc={setDate} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='Type date return' value={date} icon='calendar' onTextChangeFunc={setDate} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='local' value={doctorsName} icon='map-pin' onTextChangeFunc={setDoctorsName} />
                    </Animatable.View>
                    <Animatable.View animation="bounceIn" style={styles.formInputContainer}>
                        <TextInputCustom title='How many doses' value={date} icon='activity' onTextChangeFunc={setDate} />
                    </Animatable.View>

                    <View style={styles.containerBottomButtons}>
                        <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]} onPress={() => showMyAlertConfirm()}>
                            <Text style={[styles.text, styles.buttonText,]}>Save</Text>
                            <Icon style={{ marginStart: 5 }} name={"plus"} size={22} color="#FFC633" />
                        </RectButton>
                        <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonEdit, { backgroundColor: '#E9585E', }]} onPress={() => { }}>
                            <Text style={[styles.text, styles.buttonText]}>Cancel</Text>
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
        borderWidth: 2
    },


    formInputContainer: {
        marginVertical: 15,
        marginHorizontal: 5,
    },



    buttonEdit: {
        marginTop: 10,
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