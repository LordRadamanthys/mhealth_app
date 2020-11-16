import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import TextInputCustom from '../TextInput'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
    onOkPress():void
}

const ModalYesNo: React.FC<AlertInterface> = ({ show, setShow, onOkPress }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>You really want delete this file?</Text>

                    <View style={styles.containerBottomButtons}>
                        <TouchableOpacity
                             style={[styles.button, { backgroundColor: '#3D5089', }]}
                            onPress={onOkPress}>
                            <Icon style={{ marginStart: 5 }} name={"check"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#E9585E', }]}
                            onPress={() => setShow(false)}>
                            <Icon style={{ marginStart: 5 }} name={"x"} size={22} color="#FFC633" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default ModalYesNo



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(34, 43, 74, 0.65)'
    },

    mainView: {
        paddingHorizontal: 20,
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
        marginBottom: 40,
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