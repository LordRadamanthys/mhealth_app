import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import HeaderHome from '../../components/HeaderHome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/exams.png'
import ButtonHome from '../../components/ButtonsHome'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
    const navigate = useNavigation()
    function goTo() {
        navigate.navigate('Exams')
    }

    return (
        <View style={styles.container}>
            <HeaderHome />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="teste" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <View style={styles.main}>

                <View style={styles.recentActivitiesContainer}>
                    <Text style={[styles.text, { fontSize: 19 }]}>Recent Activity</Text>
                    <TouchableOpacity style={styles.recentActvities}>
                        <View style={styles.textsRecentActivities}>
                            <Text style={[styles.text, styles.textRecentActivitiesCard]}>test te st ets te st ets e ts te </Text>
                        </View>
                        <Image source={examsIcon} style={styles.image} />
                    </TouchableOpacity>
                </View>


                <View style={styles.mainButtons}>
                    <ButtonHome text="Exams" action={goTo} image="exams" />
                    <ButtonHome text="Gyn" action={() => { }} image="gym" />
                </View>
                <View style={styles.mainButtons}>
                    <ButtonHome text="Vaccines" action={() => { }} image="vaccines" />
                    <ButtonHome text="Medicines" action={() => { }} image="medicines" />
                </View>


            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 20,
    },

    containerInputSearch: {
        marginHorizontal: 20,
        marginTop: 20
    },

    main: {
        marginVertical: 0,
        padding: 5,
        alignItems: 'center',
    },

    recentActivitiesContainer: {
        flexDirection: 'column',
        marginTop: 20
    },

    recentActvities: {
        borderColor: '#E9585E',
        borderWidth: 1,
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
        borderRadius: 15
    },

    textsRecentActivities: {
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '70%',
    },

    text: {
        color: '#D8DFFD'
    },

    textRecentActivitiesCard: {
        fontSize: 16
    },

    image: {
        marginStart: 10,
        width: 60,
        height: 60
    },
    mainButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        maxWidth: 400,
    }
})