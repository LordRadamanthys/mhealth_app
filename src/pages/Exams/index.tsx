import React from 'react'
import { View, StyleSheet} from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler'
import MainButton from '../../components/MainButton'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import EmptyListComponent from '../../components/EmptyList'


const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const Exams = () => {
    const teste = [1, 1, 1, 1, 1, 1, 1]
    const navigate = useNavigation()

    function goToExam() {
        navigate.navigate("Exam")
    }
    return (
        <View style={styles.container}>
            <Header textCenter="Exams" itemRight={iconRightHeader} funcItemRight={() => navigate.navigate('AddExam')} />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="Search by title" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>

            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {teste != null ? teste.map(t => {
                        return (
                            <Animatable.View animation="fadeInUp" style={styles.containerMainButton}>
                                <MainButton text="test tes t de teset stetatdsasd tets" image="exams" action={goToExam} />
                            </Animatable.View>
                        )
                    }): <EmptyListComponent />}
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

export default Exams