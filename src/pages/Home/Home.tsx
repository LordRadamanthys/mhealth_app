import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import TextInputCustom from '../../components/TextInput'
import HeaderHome from '../../components/HeaderHome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import examsIcon from '../../assets/images/relatorio_medico.png'
import ButtonHome from '../../components/ButtonsHome'
const Home = () => {
    return (
        <View style={styles.container}>
            <HeaderHome />
            <View style={styles.containerInputSearch}>
                <TextInputCustom title="teste" value="" security={false} icon="search" onTextChangeFunc={() => { }} />
            </View>
            <View style={styles.main}>

                <View style={styles.recentActivitiesContainer}>
                    <Text style={styles.text}>Recent Activity</Text>
                    <TouchableOpacity style={styles.recentActvities}>
                        <View style={styles.textsRecentActivities}>
                            <Text style={[styles.text, styles.textRecentActivitiesCard]}>test te st ets te st ets e ts te </Text>
                        </View>
                        <Image source={examsIcon} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainButtons}>
                    <ButtonHome text="teste" action={() => { }} image="s" />
                    <ButtonHome text="teste" action={() => { }} image="s" />
                </View>
                <View style={styles.mainButtons}>
                    <ButtonHome text="teste" action={() => { }} image="s" />
                    <ButtonHome text="teste" action={() => { }} image="s" />
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
        marginHorizontal: 20
    },

    main: {
        margin: 30,
        padding: 5,
    },

    recentActivitiesContainer: {
        flexDirection: 'column'
    },

    recentActvities: {
        borderColor: '#E9585E',
        borderWidth: 1,
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        borderRadius: 25
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
    mainButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-between',
        margin:20,
        maxWidth:300
    }
})