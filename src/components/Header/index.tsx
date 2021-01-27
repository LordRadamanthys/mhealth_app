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
    funcItemRight():void 
}

const Header: React.FC<HeaderInterface> = ({ itemCenter, textCenter, itemRight, funcItemRight, itemRightDisabled, children }) => {
    const navigate = useNavigation()
    function goBack() {
        navigate.goBack()
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
                <Icon name={"chevron-left"} size={40} color="#6562ff" />
            </TouchableOpacity>
            <View style={styles.containerItemCenter}>
                <Text style={styles.titleHeader}>{itemCenter ? itemCenter : textCenter}</Text>
            </View>
            <TouchableOpacity disabled={itemRightDisabled} style={styles.containerItemRight} onPress={funcItemRight? ()=>funcItemRight() : ()=>{}}>
                {itemRight? itemRight: <Text>  </Text>}
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
        height: 80,

    },

    titleHeader: {
        color: '#D8DFFD',
        marginStart: 0,
        fontSize: 24,
        fontFamily: 'Nunito_700Bold'
    },

    containerItemCenter: {
        alignItems: 'center',
    },

    containerItemRight: {
        marginEnd: 20,
    }
})