import React from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'

interface AlertInterface {
    show: boolean,
    setShow(key: boolean): void
}

const ModalConfirm: React.FC<AlertInterface> = ({ show, setShow }) => {

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setShow(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.mainView}>
                    <Text style={[styles.text, styles.title]}>Message</Text>
                    <Icon name="smile" size={50} color='#FFC633' />
                    <Text style={[styles.text, styles.description]}>All done!</Text>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={[styles.buttonEdit, { backgroundColor: '#6562ff', }]}
                        onPress={() => setShow(false)}>
                        <Icon style={{ marginStart: 5 }} name={"check"} size={22} color="#FFC633" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


export default ModalConfirm



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(26, 26, 15, 0.65)'
    },

    mainView: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: '#1a1a1f',
        borderRadius: 15,
        borderColor: '#E9585E',
        borderWidth: 2,
        alignItems: 'center',

    },
    text: {
        color: '#D8DFFD',
        
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        fontFamily: 'Nunito_600SemiBold'
    },

    description: {
        fontSize: 20,
        marginBottom: 30,
        fontFamily: 'Nunito_400Regular'
    },

    buttonText: {
        fontSize: 17,
        fontFamily: 'Nunito_700Bold'
    },

    buttonEdit: {
        marginTop: 15,
        borderRadius: 15,
        minWidth: 130,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        
    },


})