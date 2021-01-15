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
    editable: boolean
}

const TextAreaCustom: React.FC<TextInputCustom> = ({ title, value, onTextChangeFunc, security, icon, editable, iconColor }) => {
    return (
        <View style={styles.containerTextInput}>
            <Icon style={{ marginEnd: 10 }} name={icon ? icon : ""} size={20} color={iconColor ? iconColor : "#6562ff"} />
            <TextInput
                style={styles.text}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                placeholder={title}
                multiline={true}
                numberOfLines={5}
                editable={editable}
                secureTextEntry={security}
                value={value}
                onChangeText={(props) => onTextChangeFunc(props)} />
        </View>
    )
}


const styles = StyleSheet.create({
    containerTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
    },

    text: {
        color: 'white',
        width: '95%'
    }
})
export default TextAreaCustom