import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'

interface TextInputCustom {
    title: string
    value: string
    onTextChangeFunc: Function
    security?: boolean
    icon?: string
    iconColor?: string
    editable?: boolean
    keyboardType?: string
    length?:number
}

const TextInputCustom: React.FC<TextInputCustom> = ({ title, value, onTextChangeFunc, security, icon, editable, iconColor, keyboardType='', length }) => {

    function selectTypeKeyboard(type: string) {
        switch (type) {
            case 'email':
                return 'email-address'
            case 'number':
                return 'number-pad'
            default:
                return 'default'
        }
    }

    return (
        <View style={styles.containerTextInput}>
            <Icon style={{ marginEnd: 10 }} name={icon ? icon : ""} size={20} color={iconColor ? iconColor : "#6562ff"} />
            <TextInput
                style={styles.text}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                placeholder={title}
                secureTextEntry={security}
                editable={editable}
                value={value}
                maxLength={length}
                keyboardType={selectTypeKeyboard(keyboardType)}
                onChangeText={(props) => onTextChangeFunc(props)} />
        </View>
    )
}


const styles = StyleSheet.create({
    containerTextInput: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 15,
        fontSize: 16,
    },

    text: {
        color: 'white',
        width: '95%',
        fontFamily: 'Nunito_400Regular'
    }
})
export default TextInputCustom