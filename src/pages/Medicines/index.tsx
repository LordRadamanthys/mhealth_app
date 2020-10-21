import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import ModalAddFile from '../../components/ModalAddFile'
import ModalYesNo from '../../components/ModalYesNo'
import * as Animatable from 'react-native-animatable'
import examsIcon from '../../assets/images/medicines.png'
const teste = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />


const Medicines = () => {
    const [showAlertFile, setShowAlertFile] = useState(false)
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    function showModal() {
        setShowAlertFile(!showAlertFile)
    }

    function deleteFile() {
        setShowAlertDelete(!showAlertFile)
    }

    return (
        <View style={styles.container}>
            <ModalAddFile show={showAlertFile} setShow={setShowAlertFile} />
            <ModalYesNo show={showAlertDelete} setShow={setShowAlertDelete} />
            <Header textCenter="Medicines" itemRight={iconRightHeader} funcItemRight={showModal} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <View style={styles.main}>
                {teste.map(t => {
                    return (
                        <View style={styles.containerButtons}>
                            <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonFile, { backgroundColor: '#3D5089', }]} onPress={() => { }}>
                                <Animatable.View style={[styles.buttonFileAnimated, { marginBottom: 0 }]}>
                                    <Text style={[styles.text, styles.buttonText]}>Loratadina</Text>
                                    <Animatable.Image animation="pulse" delay={800} source={examsIcon} style={styles.image} />
                                </Animatable.View>
                            </RectButton>
                        </View>
                    )
                })}

            </View>
        </View>
    )
}

export default Medicines

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },

    containerInputSearch: {
        marginHorizontal: 20,
        marginTop: 20
    },

    main: {
        margin: 20,
        alignItems: 'center',
    },
    containerButtons: {
        marginTop: 20
    },

    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17,
        alignSelf: 'center',
        marginRight: 20
    },

    buttonFile: {
        borderRadius: 25,
    },

    buttonFileAnimated: {
        marginHorizontal: 5,
        borderRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 55,
        paddingVertical: 15,
    },

    image: {
        marginStart: 10,
        width: 40,
        height: 40
    },
})