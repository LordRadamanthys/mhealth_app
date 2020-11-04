import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import Header from '../../components/Header'
import ModalAddFile from '../../components/ModalAddFile'
import ModalYesNo from '../../components/ModalYesNo'
import * as Animatable from 'react-native-animatable'
import examsIcon from '../../assets/images/medicines.png'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
import CollapsibleView from "@eliav2/react-native-collapsible-view"
import { ScrollView } from 'react-native-gesture-handler'
import EmptyListComponent from '../../components/EmptyList'
const teste = null

const Medicines = () => {
    const [showAlertFile, setShowAlertFile] = useState(false)
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    function showModal() {
        setShowAlertFile(!showAlertFile)
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    {teste != null?teste.map(t => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerButtons}>
                                <CollapsibleView style={[styles.buttonFile, { backgroundColor: '#3D5089' }]}
                                    title={<Text style={[styles.text, styles.buttonText]}>Loratadina</Text>}
                                    collapsibleContainerStyle={{ borderRadius: 5 }}
                                    noArrow={true}
                                    unmountOnCollapse={true}
                                >
                                    <Animatable.Image animation="pulse" delay={800} source={examsIcon} style={styles.image} />
                                    <Text style={[styles.text, styles.buttonTextDescription]}>Rules Loratasdsdsdssdsdsdsdinadsdsdsdsd</Text>
                                    <Text style={[styles.text, styles.buttonTextDescription]}>Comments Loratasdsdsdssdsdsdsdinadsdsdsdsd</Text>
                                </CollapsibleView>
                            </Animatable.View>
                        )
                    }): <EmptyListComponent />}
                </ScrollView>
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
        marginTop: 15,
    },

    text: {
        color: '#D8DFFD'
    },

    buttonText: {
        fontSize: 17,
        alignSelf: 'center',
    },

    buttonTextDescription: {
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'center',

    },


    buttonFile: {
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 30,
        alignItems: 'center',
        flexDirection: 'column',
        width: 300
    },


    image: {
        marginTop: 20,
        width: 50,
        height: 50,
        alignSelf: 'center'

    },
})