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
}

const TextAreaCustom: React.FC<TextInputCustom> = ({ title, value, onTextChangeFunc, security, icon }) => {
    return (
        <View style={styles.containerTextInput}>
            <Icon style={{ marginEnd: 10 }} name={icon ? icon : ""} size={20} color="#FFC633" />
            <TextInput
                style={styles.text}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                placeholder={title}
                multiline={true}
                numberOfLines={5}
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
        paddingHorizontal: 24,
        fontSize: 16,
    },

    text: {
        color: 'white',
        width: '95%'
    }
})
export default TextAreaCustom