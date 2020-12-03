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
const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />


const Vaccines = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigation()
    const [listVaccines, setListVaccines] = useState([])


    async function getListVaccine() {
        const response = await getVaccines(user).catch(error => {
            return console.log(error);

        })

        return setListVaccines(response)
    }

    function goToVaccine(vaccine: VaccinesInterface) {
        navigate.navigate("Vaccine", { data: vaccine })
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
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search for title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
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
        backgroundColor: '#1D2541',
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