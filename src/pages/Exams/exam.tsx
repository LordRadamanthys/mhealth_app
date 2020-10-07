import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Header from '../../components/Header'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/exams.png'
import MainButton from '../../components/MainButton'
import { useNavigation } from '@react-navigation/native'

const iconRightHeader = <Icon name="plus" size={35} color="#FFC633" />
const Exam = () => {
    const navigate = useNavigation()

    function goToExam() {
        navigate.navigate("Exam")
    }
    return (
        <View style={styles.container}>
            <Header textCenter="Exam" itemRight={iconRightHeader} />
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

export default Exam