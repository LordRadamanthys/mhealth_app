import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import ImageEmptyList from '../../svg/image_empty_list'

const EmptyListComponent = () => {

    return (
        <View style={styles.container}>
            <Animatable.View animation='bounce' style={{ alignItems: 'center' }}>
                <ImageEmptyList />
                <Text style={styles.text}>Ops, não encontramos nada no momento</Text>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:10
    },

    text: {
        color: '#D8DFFD',
        fontSize: 17,
        textAlign:'center',
    },


})

export default EmptyListComponent