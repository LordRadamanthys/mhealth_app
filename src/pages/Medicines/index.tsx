import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import Header from '../../components/Header'
const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />
import { ScrollView } from 'react-native-gesture-handler'
import EmptyListComponent from '../../components/EmptyList'
import MedicineInterface from '../../interfaces/MedicinesInterface'
import ExpandCard from '../../components/ExpandCard'
import { getMedicine, getAllMedicine, formatExams } from '../../controller/MedicinesController'
import AuthContext from '../../providers/AuthProvider'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LoadingModal from '../../components/Loading'
const teste = [1]

const Medicines = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("")
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [listMedicines, setListMedicines] = useState([])
    const [listMedicinesSearch, setListMedicinesSearch] = useState([])




    async function getAll() {
        await getAllMedicine(user).then(response=>{
            setListMedicinesSearch(response)
            return setListMedicines(response)
        }).catch(error => {
            return 
        })
        
    }


    async function get(id: string) {
        await getMedicine(id, user).then(response=>{
            setListMedicines(response)
            setListMedicinesSearch(response)
        }).catch(error => {
            return 
        })

    }

    async function searchBar(text: string) {
        setSearch(text)

        var s = listMedicinesSearch.filter((m: MedicineInterface) => m.name.toLowerCase().includes(text.toLowerCase()))

        setListMedicines(s.length != 0 || text.includes("") ? s : listMedicinesSearch)

    }

    useFocusEffect(
        React.useCallback(() => {
            getAll()
            return () => { };
        }, [])
    )
    useEffect(() => {
        getAll()
    }, [])

    return (
        <View style={styles.container}>

            <Header textCenter="Remédios" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddMedicine')} />
            <LoadingModal show={showLoading} setShow={setShowLoading}/>
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Pesquise pelo nome" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
            </View>
            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {listMedicines.length > 0 ? listMedicines.map((m: MedicineInterface) => {
                        return (
                            <ExpandCard
                                key={m.id}
                                image='exam'
                                title={m.name}
                                description={m.how_to_use}
                            />
                        )
                    }) : <EmptyListComponent />}
                </ScrollView>
            </View>
        </View>
    )
}

export default Medicines

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
        borderRadius: 15,
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