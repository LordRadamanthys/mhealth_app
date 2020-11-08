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
import ExpandCard from '../../components/ExpandCard'
const teste = [1]

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
                            <ExpandCard image='exam' title='Loratadina' description='Lorem ipsum rhoncus cursus vestibulum, ullamcorper erat nostra leo rutrum, ullamcorper semper viverra. nulla porttitor blandit curae in proin elementum in pretium, ornare fusce consectetur pretium semper conubia nullam proin, praesent potenti mi augue et consectetur platea. enim himenaeos mollis laoreet arcu viverra lobortis, vehicula orci arcu maecenas hac aliquam euismod, nam vel ante nibh sit. condimentum aenean nam ligula porttitor euismod urna tempor per, ullamcorper non nostra risus pellentesque mollis fames sagittis, phasellus praesent sodales curabitur dictumst curabitur lobortis, himenaeos tempor consequat tortor congue a nam. curabitur nibh amet eros donec aenean ullamcorper orci et volutpat, curabitur arcu platea ad posuere fringilla nulla interdum nisi euismod, pellentesque augue maecenas posuere in porta dapibus praesent.'  />
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