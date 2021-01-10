import React, { useContext, useEffect, useState } from 'react'
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
import MedicineInterface from '../../interfaces/MedicinesInterface'
import ExpandCard from '../../components/ExpandCard'
import { getMedicine, getAllMedicine, formatExams } from '../../controller/MedicinesController'
import AuthContext from '../../providers/AuthProvider'
import { getExams } from '../../controller/ExamsController'
import AddMedicine from './addMedicine'
import { useNavigation } from '@react-navigation/native'
const teste = [1]

const Medicines = () => {
    const navigate = useNavigation()
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState("")
    const [showAlertDelete, setShowAlertDelete] = useState(false)
    const [listMedicines, setListMedicines] = useState([])
    const [listMedicinesSearch, setListMedicinesSearch] = useState([])




    async function getAll() {
        const response = await getAllMedicine(user).catch(error => {
            return console.log(error);
        })
        setListMedicinesSearch(response)
        return setListMedicines(response)
    }


    async function get(id: string) {
        const response = await getMedicine(id, user).catch(error => {
            return console.log(error);
        })
        setListMedicines(response)
        setListMedicinesSearch(response)

    }

    async function searchBar(text: string) {
        setSearch(text)

        var s = listMedicinesSearch.filter((m: MedicineInterface) => m.name.includes(text))

        setListMedicines(s.length != 0 || text.includes("") ? s : listMedicinesSearch)

    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <View style={styles.container}>

            <Header textCenter="Medicines" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddMedicine')} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
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