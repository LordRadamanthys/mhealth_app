import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import MainButton from '../../components/MainButton'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import EmptyListComponent from '../../components/EmptyList'
import ModalAddGym from './modalAddGym'


const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const Gyms = () => {
    const [showModal, setShowModal] = useState(false)
    const teste = [1, 1, 1, 1, 1, 1, 1]
    const navigate = useNavigation()



    return (
        <View style={styles.container}>
            <Header textCenter="Gyms" itemRight={iconRightHeader} funcItemRight={() => setShowModal(!showModal)} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search for title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <ModalAddGym show={showModal} setShow={() => setShowModal(!showModal)} />
            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {teste != null ? teste.map(t => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerMainButton}>
                                <MainButton text="test tes t de teset stetatdsasd tets" image="gym" action={() => navigate.navigate('Training')} >

                                </MainButton>
                            </Animatable.View>
                        )
                    }) : <EmptyListComponent />}
                </ScrollView>
            </View>
        </View>
    )
}

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
        flex: 1,
        marginHorizontal: 30
    },
    containerMainButton: {
        marginVertical: 10
    }
})

export default Gyms