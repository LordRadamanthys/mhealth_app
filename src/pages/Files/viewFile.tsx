
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'
import Header from '../../components/Header';
import { Feather as Icon } from '@expo/vector-icons'
import LoadingModal from '../../components/Loading';
import api from '../../services/api';
import AuthContext from '../../providers/AuthProvider';




const ViewFile = () => {
    const [showLoading, setShowLoading] = useState(false)
    const [file, setFile] = useState()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        getFile()
    }, [])

    async function getFile() {
        const data = {
            id_exam: 42,
            name_file: 'opa.jpg'
        }

        await api.get(`file/exams/30/opa.jpg`, {

            headers: { 'Authorization': 'Bearer' + user.token },

        }).then(resp => {
            console.log(resp.data);
            setFile(resp.data)

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={styles.container}>
            <Header textCenter="" itemRight={<></>} funcItemRight={() => { }} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            <Image
            style={{width:300,height:300}}
            resizeMode='center'
                source={{
                    uri: 'http://192.168.100.10:2222/file/exams/2/30/opa.jpg',
                }}
            />
            <PDFReader
                source={{
                    uri: 'https://www.eso.org/public/archives/presskits/pdf/presskit_0001.pdf',
                }}
                webviewStyle={{ flex: 1 }}

                onLoad={() => setShowLoading(true)}
                onLoadEnd={() => setShowLoading(false)}
                useGoogleReader={true}
            />
        </View>
    )
}

export default ViewFile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },
})

// <WebView
        //     originWhitelist={['*']}
        //     bounces={false}
        //     useWebKit={true}
        //     scrollEnabled={true}
        //     javaScriptEnabled={true}
        //     allowFileAccess={true}
        //     allowFileAccessFromFileURLs={true}
        //     style={{ flex: 1 }}
        //     source={{ uri: 'https://www.eso.org/public/archives/presskits/pdf/presskit_0001.pdf' }}
        // />