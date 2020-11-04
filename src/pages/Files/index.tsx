import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { RectButton } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import ModalAddFile from '../../components/ModalAddFile'
import ModalYesNo from '../../components/ModalYesNo'
import EmptyListComponent from '../../components/EmptyList'
const teste = [1, 1, 1, 1, 1, 1]
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const Files = () => {
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
            <Header textCenter="Files" itemRight={iconRightHeader} funcItemRight={showModal} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <View style={styles.main}>
                {teste != null ? teste.map(t => {
                    return (
                        <View style={styles.containerButtons}>
                            <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonFile, { backgroundColor: '#3D5089', }]} onPress={() => { }}>
                                <Text style={[styles.text, styles.buttonText]}>File_dddname.jpg</Text>
                            </RectButton>
                            <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={[styles.buttonDelete, { backgroundColor: '#E9585E', }]} onPress={deleteFile}>
                                <Icon style={{ marginStart: 5 }} name={"trash"} size={22} color="#FFC633" />
                            </RectButton>
                        </View>
                    )
                }) : <EmptyListComponent />}

            </View>
        </View>
    )
}

export default Files
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
        flexDirection: 'row',
        marginTop: 20
    },

    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17
    },

    buttonFile: {
        marginHorizontal: 5,
        borderRadius: 25,
        minWidth: 220,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    buttonDelete: {
        marginHorizontal: 5,
        borderRadius: 25,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
})