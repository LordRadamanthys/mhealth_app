import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
}

const ModalAddFile: React.FC<AlertInterface> = ({ show, setShow }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>Alert</Text>
                    <Icon name="smile" size={50} color='#FFC633' />
                    <Text style={[styles.text, styles.description]}>Done!</Text>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.buttonEdit, { backgroundColor: '#3D5089', }]}
                        onPress={() => setShow(false)}>
                        <Icon style={{ marginStart: 5 }} name={"check"} size={22} color="#FFC633" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


export default ModalAddFile



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(34, 43, 74, 0.65)'
    },

    mainView: {
        paddingHorizontal: 40,
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

    buttonEdit: {
        marginTop: 15,
        borderRadius: 25,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },


})