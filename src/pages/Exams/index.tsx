import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler'
import MainButton from '../../components/MainButton'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import EmptyListComponent from '../../components/EmptyList'
import AuthContext from '../../providers/AuthProvider'
import { getExams } from '../../controller/ExamsController'
import { ExamsInterface } from '../../interfaces/ExamsInterface'

const iconRightHeader = <Icon name="plus" size={35} color="#6562ff" />
const Exams = () => {
    const { user } = useContext(AuthContext)
    const [listExams, setListExams] = useState<ExamsInterface[]>()
    const [listExamsSearch, setListExamsSearch] = useState([])
    const [showEmptyComponent, setShowEmptyComponent] = useState(true)
    const [search, setSearch] = useState("")
    const navigate = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            getListExam()

            return () => { };
        }, [])
    )


    async function searchBar(text: string) {
        setSearch(text)

        var s = listExamsSearch.filter((m: ExamsInterface) => m.title.toLowerCase().includes(text.toLowerCase()))

        setListExams(s.length != 0 || text.includes("") ? s : listExamsSearch)

    }

    async function getListExam() {
        try {
            const result = await getExams(user)
            if (result.length == 0) return setShowEmptyComponent(true)

            setListExams(result)
            setListExamsSearch(result)
            setShowEmptyComponent(false)

        } catch (error) {
            console.log(error);
        }
    }
    function goToExam(exam: ExamsInterface) {
        navigate.navigate("Exam", { data: exam })
    }
    return (
        <View style={styles.container}>
            <Header textCenter="Exames" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddExam')} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Pesquise pelo nome" value={search} security={false} icon="search" onTextChangeFunc={searchBar} />
            </View>

            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {!showEmptyComponent ? listExams.map(exam => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerMainButton} key={exam.id}>
                                <MainButton text={exam.title} image="exams" action={() => goToExam(exam)} >
                                    <Text style={styles.text}>{exam.date}</Text>

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
    },
    text: {
        color: '#D8DFFD',
        marginStart: 5
    }
})

export default Exams