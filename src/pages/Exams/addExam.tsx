import React, { useContext, useState } from 'react'
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



const AddExam = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [doctorsName, setDoctorsName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [showAlertDelete, setshowAlertDelete] = useState(false)



    async function createExam() {
        if (title == '' || date == '' || doctorsName == '' || descriptions == '') return alert('erro')
        const data = {
            title: title,
            date: date,
            doctors_name: doctorsName,
            description: descriptions,
            id_speciality: 2
        }

        try {
            const result = await insert(data, user)
            console.log(result);
            // setshowAlertDelete(false)
        } catch (error) {
            console.log(error);
            // setshowAlertDelete(false)
        }
    }


    return (
        <View style={styles.container}>
            <Header textCenter="New Exam" itemRight={""} funcItemRight={() => navigate.navigate('Files')} />
            <ScrollView>
                <View style={styles.formContainer}>
                    <LottieView
                        autoPlay
                        speed={0.5}
                        style={styles.lottieImage}
                        source={require('../../assets/animations/register_exam.json')}
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
        borderWidth: 2,
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
        marginVertical: 10
    },

    lottieImage: {
        width: 130,
        height: 130,
    },
})

export default AddExam