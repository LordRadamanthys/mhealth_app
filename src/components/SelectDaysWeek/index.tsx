import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'


const SelectDaysWeek = ({
    monday = {}, tuesday = {}, wednesday = {}, thursday = {}, friday = {}, saturday = {},
    setMonday, setTuesday, setWednesday, setThursday, setFriday, setSat
}) => {


    return (
        <View style={styles.containerTextInput} >
            <Icon style={{ marginEnd: 5 }} name={'calendar'} size={20} color="#FFC633" />

            <TouchableOpacity onPress={() => setMonday({ text: 'Mon', select: !monday.select })} >
                <Text style={monday.select ? styles.textSelected : styles.text}>{monday.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTuesday({ text: 'Tue', select: !tuesday.select })} >
                <Text style={tuesday.select ? styles.textSelected : styles.text}>{tuesday.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setWednesday({ text: 'Wed', select: !wednesday.select })} >
                <Text style={wednesday.select ? styles.textSelected : styles.text}>{wednesday.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setThursday({ text: 'Thu', select: !thursday.select })} >
                <Text style={thursday.select ? styles.textSelected : styles.text}>{thursday.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFriday({ text: 'Fri', select: !friday.select })} >
                <Text style={friday.select ? styles.textSelected : styles.text}>{friday.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSat({ text: 'Sat', select: !saturday.select })} >
                <Text style={saturday.select ? styles.textSelected : styles.text}>{saturday.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectDaysWeek

const styles = StyleSheet.create({

    text: {
        padding: 5,
        color: '#fff',
        fontSize: 15
    },

    textSelected: {
        padding: 5,
        color: '#FFC633',
        fontSize: 15,
        fontWeight: 'bold'
    },

    containerTextInput: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        borderRadius: 10,
        width: '100%',
        maxWidth: 270,
        alignSelf: 'center',
        paddingHorizontal: 15,
    },

})