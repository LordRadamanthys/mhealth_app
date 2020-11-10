import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import TextInput from '../../components/TextInput'
import { Feather as Icon } from '@expo/vector-icons'
import logoApp from '../../../assets/logo.png'
import Header from '../../components/Header'

const Profile = () => {

    return (
        <View style={styles.container}>
            <Header itemRightDisabled={true} itemRight={<Image style={{ width: 80, height: 170 }}  source={logoApp} resizeMode='contain' />}/>

            <ScrollView>
                <View style={styles.createContainer}>
                    <Text style={styles.titleCreate}>Mateus Lima</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.profileImgContainer}>
                        <Image source={undefined} style={styles.profileImg} />
                    </TouchableOpacity>
                    <View style={styles.containerInputText}>
                        <TextInput title='E-Mail' value={"email"} onTextChangeFunc={()=>{}} icon='user' />
                    </View>
                    <View style={styles.containerInputText}>
                        <TextInput title='Password' value={""} onTextChangeFunc={()=>{}} icon='key' />
                    </View>
                  
                    <RectButton activeOpacity={0.9} rippleColor={'#FFC633'} style={styles.buttonCreate} onPress={()=>{}}>
                        <Text style={styles.textButtonCreate}>Edit</Text>
                        <Icon style={{ marginStart: 10 }} name={"save"} size={22} color="#FFC633" />
                    </RectButton>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },
    containerInputText: {
        marginTop: 30,
    },


    createContainer: {
        backgroundColor: '#222B4A',
        alignItems: 'center',
        padding: 30,
        marginTop: 20,
        marginHorizontal: 25,
        borderRadius: 25,
        borderColor: '#E9585E',
        borderWidth: 2
    },

    titleCreate: {
        color: '#D8DFFD',
        fontSize: 26,
        marginBottom: 20
    },

    buttonCreate: {
        marginTop: 40,
        backgroundColor: '#3D5089',
        borderRadius: 25,
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15
    },


    textButtonCreate: {
        color: '#D8DFFD',
        fontSize: 18,
    },


    profileImgContainer: {
        alignSelf: 'center',
        marginHorizontal: 40,
        marginBottom: 15,
        height: 80,
        width: 80,
        borderRadius: 40,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#eeefffff'
    },

})
export default Profile
