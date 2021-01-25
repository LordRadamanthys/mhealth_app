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
import LoadingModal from '../../components/Loading'


const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />
const Gyms = () => {
    const { user } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [listGyms, setListGyms] = useState([])
    const [listGymsSearch, setListGymsSearch] = useState([])
    const navigate = useNavigation()
    const [search, setSearch] = useState("")


    async function get() {
        setShowLoading(true)
        await getGyms(user).then(response=>{
            setListGyms(response)
            setListGymsSearch(response)
            console.log("kljlkjkljkl"+response);
            return
        }).catch(error => {
            console.log(listGyms)
            return setShowLoading(false)
        })
         
         
        
        return setShowLoading(false)
    }

    function goToTraining(gym: GymsInterface) {
        navigate.navigate('Training', { gym: gym })
    }

    async function searchBar(text: string) {
        setSearch(text)

        var s = listGymsSearch.filter((m: GymsInterface) => m.name.toLowerCase().includes(text.toLowerCase()))

        setListGyms(s.length != 0 || text.includes("") ? s : listGymsSearch)
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <View style={styles.container}>
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <Header textCenter="Gyms" itemRight={iconRightHeader} funcItemRight={() => setShowModal(!showModal)} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search for title" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
            </View>
            <ModalAddGym show={showModal} callback={get} setShow={() => setShowModal(!showModal)} />
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
        backgroundColor: '#1a1a1f',
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