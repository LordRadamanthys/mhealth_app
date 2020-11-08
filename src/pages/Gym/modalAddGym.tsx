import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import SelectDaysWeek from '../../components/SelectDaysWeek'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
}

const ModalAddGym: React.FC<AlertInterface> = ({ show, setShow }) => {
    const [monday, setMonday] = useState({ text: 'Mon', select: false })
    const [tuesday, setTuesday] = useState({ text: 'Tue', select: false })
    const [wednesday, setWednesday] = useState({ text: 'Wed', select: false })
    const [thursday, setThursday] = useState({ text: 'Thu', select: false })
    const [friday, setFriday] = useState({ text: 'Fri', select: false })
    const [saturday, setSat] = useState({ text: 'Sat', select: false })

    function getDaysWeek() {
        const textDaysWeek = []
        if (monday.select) {
            textDaysWeek.push(monday.text)
        }
        if (tuesday.select) {
            textDaysWeek.push(tuesday.text)
        }
        if (wednesday.select) {
            textDaysWeek.push(wednesday.text)
        }
        if (thursday.select) {
            textDaysWeek.push(thursday.text)
        }
        if (friday.select) {
            textDaysWeek.push(friday.text)
        }
        if (saturday.select) {
            textDaysWeek.push(saturday.text)
        }
        console.log(textDaysWeek)
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>New Gym</Text>
                    <View style={styles.containerText}>
                        <TextInputCustom title="Title" value={""} onTextChangeFunc={() => { }} icon="edit-2" />
                    </View>

                    <View style={styles.containerText}>
                        <SelectDaysWeek
                            monday={monday} tuesday={tuesday} wednesday={wednesday} thursday={thursday} friday={friday} saturday={saturday}
                            setMonday={setMonday} setTuesday={setTuesday} setWednesday={setWednesday} setThursday={setThursday} setFriday={setFriday} setSat={setSat}
                        />
                    </View>

                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#3D5089', }]}
                            onPress={getDaysWeek}
                        >
                            <Icon style={{ marginStart: 5 }} name={"check"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#E9585E', }]}
                            onPress={() => setShow(false)}>
                            <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default ModalAddGym



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(34, 43, 74, 0.65)'
    },

    mainView: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#222B4A',
        borderRadius: 25,
        borderColor: '#E9585E',
        borderWidth: 2,
        alignItems: 'center',

    },
    text: {
        color: '#D8DFFD'
    },
    title: {
        fontSize: 24,
        marginBottom: 40
    },

    description: {
        fontSize: 20,
        marginBottom: 30
    },

    buttonText: {
        fontSize: 17
    },

    button: {
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 25,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,

    },

    containerBottomButtons: {
        flexDirection: 'row',
    },

    containerText: {
        marginVertical: 10
    }


})