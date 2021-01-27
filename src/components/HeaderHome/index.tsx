import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logoApp from '../../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

interface HeaderHomeInterface {

    itemCenter?: any
    textCenter?: string
    itemRight?: any
    funcItemRight(): void
}

const HeaderHome: React.FC<HeaderHomeInterface> = ({ itemCenter, itemRight, funcItemRight, children }) => {
    const navigate = useNavigation()

    return (
        <View style={styles.header}>
            <View style={styles.containerItemCenter}>
                <Text style={styles.titleHeader}>Hi, what do you want to do?</Text>
            </View>
            <Animatable.View animation="swing" iterationCount={2}>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => funcItemRight()}>
                    <Icon style={{ marginEnd: 10 }} name={"settings"} size={35} color="#6562ff" />
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

export default HeaderHome
const styles = StyleSheet.create({

    header: {
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        maxHeight: 200,
        height: 100
    },

    titleHeader: {
        color: '#D8DFFD',
        marginStart: 20,
        marginEnd: 50,
        fontSize: 21,
        fontFamily: 'Nunito_600SemiBold'
    },

    containerItemCenter: {
        flex: 1,
        alignItems: 'flex-start'
    },

    containerItemRight: {
        marginEnd: 15
    }
})