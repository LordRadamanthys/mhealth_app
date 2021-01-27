import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import TextAreaCustom from '../../components/TextAreaCustom'
import { insertTraining } from '../../controller/TrainingController'
import AuthContext from '../../providers/AuthProvider'
import LoadingModal from '../../components/Loading'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
    id_gym: number
    callback(): void
}

const ModalAddTraining: React.FC<AlertInterface> = ({ show, setShow, id_gym, callback }) => {
    const { user } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [numberMoviments, setNumberMoviments] = useState('')
    const [numberRepetitions, setNumberRepetitions] = useState('')
    const [description, setDescription] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    async function addTraining() {
        if (name === '' || numberMoviments === '' || numberRepetitions === '' || description === '') return console.log('Fill in the fields');
        setShowLoading(true)
        const data = {
            id_gym: id_gym,
            name: name,
            number_moviments: numberMoviments,
            number_repetitions: numberRepetitions,
            description: description
        }

        const response = await insertTraining(data, user).catch(error => {
            setShowLoading(false)
            return console.log(error)
        })
        cleanFields()
        setShowLoading(false)
        setShow(false)
        return callback()

    }

    function cleanFields() {
        setName('')
        setDescription('')
        setNumberMoviments('')
        setNumberRepetitions('')
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false)
            }}>
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>New Training</Text>
                    <View style={styles.containerText}>
                        <TextInputCustom title="Name" value={name} onTextChangeFunc={setName} icon="edit-2" />
                    </View>

                    <View style={styles.containerText}>
                        <TextInputCustom title="Number Moviments" keyboardType='number' value={numberMoviments} onTextChangeFunc={setNumberMoviments} icon="smile" />
                    </View>

                    <View style={styles.containerText}>
                        <TextInputCustom title="Number repetitions" keyboardType='number' value={numberRepetitions} onTextChangeFunc={setNumberRepetitions} icon="smile" />
                    </View>
                    <View style={styles.containerText}>
                        <TextAreaCustom title='Description' value={description} icon='edit-2' onTextChangeFunc={setDescription} />
                    </View>
                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#6562ff', }]}
                            onPress={addTraining}
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


export default ModalAddTraining



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
        borderRadius: 15,
        borderColor: '#6562ff',
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