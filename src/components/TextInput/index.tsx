import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'

interface TextInputCustom {
    title: string
    value: string
    onTextChangeFunc: Function
    security?: boolean
}

const TextInputCustom: React.FC<TextInputCustom> = ({ title, value, onTextChangeFunc, security }) => {
    return (
        <View style={styles.containerTextInput}>
            <Icon style={{ marginEnd: 10 }} name="key" size={25} color="#FFC633" />
            <TextInput
                style={styles.text}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                placeholder={title}
                secureTextEntry={security}
                value={value}
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
        borderRadius: 20,
        marginBottom: 70,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 24,
        fontSize: 16,
    },

    text:{
        color: 'white',
        width:'90%'
    }
})
export default TextInputCustom