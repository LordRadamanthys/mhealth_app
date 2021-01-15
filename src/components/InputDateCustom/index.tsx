
import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import DatePickerr from 'react-native-datepicker'
import { color } from 'react-native-reanimated'

interface TextInputCustom {
    title: string
    value: string
    onTextChangeFunc: Function
    security?: boolean
    icon?: string
    iconColor?: string
    editable?: boolean
    keyboardType?: string
    length?: number
}

const InputDateCustom: React.FC<TextInputCustom> = ({ title, value, onTextChangeFunc, security, icon, editable, iconColor, keyboardType = '', length }) => {

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
            <Icon name={icon ? icon : ""} size={20} color={iconColor ? iconColor : "#6562ff"} />
            {/* <TextInput
                style={styles.text}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                placeholder={title}
                secureTextEntry={security}
                editable={editable}
                value={value}
                maxLength={length}
                keyboardType={selectTypeKeyboard(keyboardType)}
                onChangeText={(props) => onTextChangeFunc(props)} /> */}

            <DatePickerr
                style={{ width: '100%', placeholderTextColor: 'rgba(255, 255, 255, 0.5)', colorDateInput: '#fff' }}
                date={value}
                mode="date"
                placeholder="select date"
                customStyles={{
                    dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        marginLeft: 10
                    },

                    dateText: {
                        color: '#fff',

                    }
                }}
                
                disabled={editable}
                format="DD-MM-YYYY"
                minDate="01-01-2020"
                maxDate="01-02-2024"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={0}
                onDateChange={(props) => onTextChangeFunc(props)}
            />
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
        width: '95%'
    }
})
export default InputDateCustom

