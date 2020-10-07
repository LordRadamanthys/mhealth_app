import React from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import logoApp from '../../../assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
interface HeaderInterface {

    itemCenter?: any
    textCenter?: string
    itemRight?: any
    itemRightDisabled?: boolean
    funcItemRight?: Function
}

const Header: React.FC<HeaderInterface> = ({ itemCenter, textCenter, itemRight, funcItemRight, itemRightDisabled, children }) => {
    const navigate = useNavigation()
    function goBack() {
        navigate.goBack()
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity style={{ padding: 10 }} onPress={goBack}>
                <Icon style={{ marginStart: 5 }} name={"chevron-left"} size={40} color="#FFC633" />
            </TouchableOpacity>
            <View style={styles.containerItemCenter}>
                <Text style={styles.titleHeader}>{itemCenter ? itemCenter : textCenter}</Text>
            </View>
            <TouchableOpacity disabled={itemRightDisabled} style={styles.containerItemRight}>
                {itemRight}
            </TouchableOpacity>
        </View>
    )
}

export default Header
const styles = StyleSheet.create({

    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 100
    },

    titleHeader: {
        color: '#fff',
        marginStart: 10,
        fontSize: 24
    },

    containerItemCenter: {
        flex: 1,
        alignItems: 'center'
    },

    containerItemRight: {
        marginEnd: 20
    }
})