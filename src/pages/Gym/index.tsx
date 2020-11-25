import React, { useContext, useEffect, useState } from 'react'
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
import { getGyms } from '../../controller/GymController'
import AuthContext from '../../providers/AuthProvider'
import GymsInterface from '../../interfaces/GymsInterface'


const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const Gyms = () => {
    const { user } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [listGyms, setListGyms] = useState([])
    const navigate = useNavigation()

    async function get() {
        const response = await getGyms(user).catch(error => {
            console.log("sas" + error)
        })
        return setListGyms(response);
    }

    function goToTraining(gym: GymsInterface) {
        navigate.navigate('Training', { gym:gym })
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <View style={styles.container}>
            <Header textCenter="Gyms" itemRight={iconRightHeader} funcItemRight={() => setShowModal(!showModal)} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search for title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <ModalAddGym show={showModal} setShow={() => setShowModal(!showModal)} />
            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {listGyms.length > 0 ? listGyms.map((gym: GymsInterface) => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerMainButton} key={gym.id}>
                                <MainButton text={gym.name} image="gym" action={() => goToTraining(gym)} >
                                    <Text style={{ color: '#fff' }}>{gym.days}</Text>
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