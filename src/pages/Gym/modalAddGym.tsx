import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import SelectDaysWeek from '../../components/SelectDaysWeek'
import { insertGym } from '../../controller/GymController'
import AuthContext from '../../providers/AuthProvider'
import LoadingModal from '../../components/Loading'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
    callback(): void
}

const ModalAddGym: React.FC<AlertInterface> = ({ show, setShow, callback }) => {
    const { user } = useContext(AuthContext)
    const [monday, setMonday] = useState({ text: 'Mon', select: false })
    const [tuesday, setTuesday] = useState({ text: 'Tue', select: false })
    const [wednesday, setWednesday] = useState({ text: 'Wed', select: false })
    const [thursday, setThursday] = useState({ text: 'Thu', select: false })
    const [friday, setFriday] = useState({ text: 'Fri', select: false })
    const [saturday, setSat] = useState({ text: 'Sat', select: false })
    const [title, setTitle] = useState('')
    const [selectedDays, setSelectedDays] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    function getDaysWeek() {
        const textDaysWeek = []
        if (monday.select) {
            textDaysWeek.push("Monday")
        }
        if (tuesday.select) {
            textDaysWeek.push("Tuesday")
        }
        if (wednesday.select) {
            textDaysWeek.push("Wednesday")
        }
        if (thursday.select) {
            textDaysWeek.push("Thursday")
        }
        if (friday.select) {
            textDaysWeek.push("Friday")
        }
        if (saturday.select) {
            textDaysWeek.push("Saturday")
        }
        
        setSelectedDays(textDaysWeek.toString())
        
    }
    
    async function createGym() {
        setShowLoading(true)
        getDaysWeek()
        
        if (selectedDays.length==0){
            setShowLoading(false)
            return
        }
        const data = {
            name: title,
            week_name: selectedDays
        }
        
        await insertGym(data, user).then(response => {
            console.log(response);
            setShowLoading(false)
            setShow(false)
            callback()
        }).catch(error => {
            console.log(error);
            setShowLoading(false)
        })
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <LoadingModal setShow={setShowLoading} show={showLoading} />
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>Adicionar treino</Text>
                    <View style={styles.containerText}>
                        <TextInputCustom title="Title" value={title} onTextChangeFunc={setTitle} icon="edit-2" />
                    </View>

                    <View style={styles.containerText}>
                        <SelectDaysWeek
                            monday={monday} tuesday={tuesday} wednesday={wednesday} thursday={thursday} friday={friday} saturday={saturday}
                            setMonday={setMonday} setTuesday={setTuesday} setWednesday={setWednesday} setThursday={setThursday} setFriday={setFriday} setSat={setSat}
                        />
                    </View>

                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#6562ff', }]}
                            onPress={createGym}
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
        backgroundColor: 'rgba(26, 26, 15, 0.65)'
    },

    mainView: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#1a1a1f',
        borderRadius: 25,
        borderColor: '#6562ff',
        borderWidth: 2,
        alignItems: 'center',

    },
    text: {
        color: '#D8DFFD'
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        fontFamily: 'Nunito_700Bold',
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