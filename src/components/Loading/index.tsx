import React, { useEffect, useState } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import TextInputCustom from '../TextInput'
import * as Animatable from 'react-native-animatable'
import ImageLoading from '../../svg/image_loading'
import NewImageLoading from '../../svg/new_image_loading'
interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
}
const LoadingModal: React.FC<AlertInterface> = ({ show, setShow }) => {
    return (
        <Modal animationType="fade"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Animatable.View animation='pulse' iterationCount='infinite' iterationDelay={1000}>
                        <NewImageLoading />
                    </Animatable.View>
                    <ActivityIndicator size={100} color='#ddd' />
                    <Text style={[styles.text, styles.title]}>Wait a moment</Text>
                    <View style={styles.containerBottomButtons}>
                        
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default LoadingModal


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(26, 26, 15, 0.65)'
    },

    mainView: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#1a1a1f',
        borderRadius: 15,
        minWidth:300,
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
        fontFamily: 'Nunito_600SemiBold', 
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