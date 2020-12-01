import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import TextAreaCustom from '../../components/TextAreaCustom'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
}

const ModalAddTraining: React.FC<AlertInterface> = ({ show, setShow }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>New Training</Text>
                    <View style={styles.containerText}>
                        <TextInputCustom title="Name" value={""} onTextChangeFunc={() => { }} icon="edit-2" />
                    </View>

                    <View style={styles.containerText}>
                        <TextInputCustom title="Number Moviments" value={""} onTextChangeFunc={() => { }} icon="smile" />
                    </View>

                    <View style={styles.containerText}>
                        <TextInputCustom title="Number repetitions" value={""} onTextChangeFunc={() => { }} icon="smile" />
                    </View>
                    <View style={styles.containerText}>
                        <TextAreaCustom title='Description' value={''} icon='edit-2' onTextChangeFunc={() => { }} />
                    </View>
                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                            activeOpacity={0.9} style={[styles.button, { backgroundColor: '#3D5089', }]}
                            onPress={() => { }}
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