import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import Header from '../../components/Header'
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
import { ScrollView } from 'react-native-gesture-handler'
import EmptyListComponent from '../../components/EmptyList'
import ExpandCard from '../../components/ExpandCard'
import ModalAddTraining from './modalAddTraining'
import { useRoute } from '@react-navigation/native'
import GymsInterface from '../../interfaces/GymsInterface'
import { getTraining } from '../../controller/TrainingController'
import AuthContext from '../../providers/AuthProvider'
import TrainingInterface from '../../interfaces/TrainingInterface'
import LoadingModal from '../../components/Loading'
const teste = [1]

const Training = () => {
    const { user } = useContext(AuthContext)
    const route = useRoute()
    const gym: GymsInterface = route.params.gym
    const [showModalAddTraining, setShowModalAddTraining] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [listTraining, setListTraining] = useState([])

    function showModal() {
        setShowModalAddTraining(!showModalAddTraining)
    }

    async function get() {
        setShowLoading(true)
        const response = await getTraining(gym, user).catch(err => {
            console.log(err)
            return setShowLoading(false)
        })

        setListTraining(response)
        return setShowLoading(false)

    }

    useEffect(() => {
        get()
    }, [])

    return (
        <View style={styles.container}>

            <Header textCenter="Training" itemRight={iconRightHeader} funcItemRight={showModal} />
            <ModalAddTraining setShow={setShowModalAddTraining} show={showModalAddTraining} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <View style={styles.main}>
                <ScrollView style={{ marginBottom: 150 }} showsVerticalScrollIndicator={false}>

                    {listTraining.length > 0 ? listTraining.map((training: TrainingInterface) => {
                        return (
                            <ExpandCard
                                image='gym'
                                title={training.name}
                                description={training.description}
                                key={training.id}
                            >
                                <View style={{ marginVertical: 10 }}>
                                    <TextInputCustom
                                        editable={false}
                                        title="Number moviments"
                                        value={`Numero de movimentos: ${training.number_moviments}`}
                                        onTextChangeFunc={() => { }}
                                        icon="activity"
                                    />
                                </View>

                                <View style={{ marginVertical: 10 }}>
                                    <TextInputCustom editable={false}
                                        title="Number repetitions"
                                        value={`Numero de repetições: ${training.number_repetitions}`}
                                        onTextChangeFunc={() => { }}
                                        icon="activity"
                                    />
                                </View>
                            </ExpandCard>
                        )
                    }) : <EmptyListComponent />}
                </ScrollView>
            </View>
        </View>
    )
}

export default Training

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