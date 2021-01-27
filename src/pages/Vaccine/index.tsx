import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler'
import MainButton from '../../components/MainButton'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import EmptyListComponent from '../../components/EmptyList'
import { getVaccines } from '../../controller/VaccinesController'
import AuthContext from '../../providers/AuthProvider'
import VaccinesInterface from '../../interfaces/VaccinesInterface'
import LoadingModal from '../../components/Loading'
const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />


const Vaccines = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigation()
    const [listVaccines, setListVaccines] = useState([])
    const [listVaccinesSearch, setListVaccinesSearch] = useState([])
    const [search, setSearch] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    async function getListVaccine() {
        setShowLoading(true)
        await getVaccines(user).then(response=>{
            setListVaccines(response)
            setListVaccinesSearch(response)
            return setShowLoading(false)
        }).catch(error => {
            return setShowLoading(false)
        })

        
    }

    function goToVaccine(vaccine: VaccinesInterface) {
        navigate.navigate("Vaccine", { data: vaccine })
    }


    async function searchBar(text: string) {
        setSearch(text)

        var s = listVaccinesSearch.filter((m: VaccinesInterface) => m.title.toLowerCase().includes(text.toLowerCase()))

        setListVaccines(s.length != 0 || text.includes("") ? s : listVaccinesSearch)
    }

    useFocusEffect(
        React.useCallback(() => {
            getListVaccine()
            return () => { };
        }, [])
    )

    useEffect(() => {
        getListVaccine()
    }, [])

    return (
        <View style={styles.container}>
            <Header textCenter="Vaccines" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddVaccine')} />
            <LoadingModal setShow={setShowLoading} show={showLoading}/>
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search for title" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
            </View>

            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {listVaccines.length > 0 ? listVaccines.map((vaccine: VaccinesInterface) => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerMainButton} key={vaccine.id}>
                                <MainButton text={vaccine.title} image="vaccines" action={() => goToVaccine(vaccine)} >
                                    <Text style={styles.subTitles}>{vaccine.date}</Text>
                                    <Text style={styles.subTitles}>{vaccine.local}</Text>
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
        marginTop: 20,
        marginHorizontal: 30
    },
    containerMainButton: {
        marginVertical: 10
    },

    subTitles: {
        color: '#D8DFFD',
        marginVertical: 2
    }
})

export default Vaccines