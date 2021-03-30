import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import Header from '../../components/Header'
const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />
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

const Training = () => {
    const { user } = useContext(AuthContext)
    const route = useRoute()
    const gym: GymsInterface = route.params.gym
    const [showModalAddTraining, setShowModalAddTraining] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [listTraining, setListTraining] = useState([])
    const [listTrainingSearch, setListTrainingSearch] = useState([])
    const [search, setSearch] = useState("")

    function showModal() {
        setShowModalAddTraining(!showModalAddTraining)
    }

    async function get() {
        setShowLoading(true)
        await getTraining(gym, user).then(response => {
            setListTraining(response)
            setListTrainingSearch(response)
            return setShowLoading(false)
        }).catch(err => {
            console.log(err)
            return setShowLoading(false)
        })


    }

    async function searchBar(text: string) {
        setSearch(text)

        var s = listTrainingSearch.filter((m: TrainingInterface) => m.name.toLowerCase().includes(text.toLowerCase()))

        setListTraining(s.length != 0 || text.includes("") ? s : listTrainingSearch)
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <View style={styles.container}>

            <Header textCenter="Exercicios" itemRight={iconRightHeader} funcItemRight={showModal} />
            <ModalAddTraining callback={() => get()} id_gym={gym.id} setShow={setShowModalAddTraining} show={showModalAddTraining} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Pesquise pelo nome" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
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
                                        value={`Number moviments: ${training.number_moviments}`}
                                        onTextChangeFunc={() => { }}
                                        icon="activity"
                                    />
                                </View>

                                <View style={{ marginVertical: 10 }}>
                                    <TextInputCustom editable={false}
                                        title="Number repetitions"
                                        value={`Number repetitions: ${training.number_repetitions}`}
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
        backgroundColor: '#1a1a1f',
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