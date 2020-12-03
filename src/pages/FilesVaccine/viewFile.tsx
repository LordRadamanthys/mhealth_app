
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'
import Header from '../../components/Header';
import { Feather as Icon } from '@expo/vector-icons'
import LoadingModal from '../../components/Loading';
import api from '../../services/api';
import AuthContext from '../../providers/AuthProvider';
import { useRoute } from '@react-navigation/native';
import FileInterface from '../../interfaces/FilesInterface';
import FileVaccineInterface from '../../interfaces/FilesVaccineInterface';




const ViewFileVaccine = () => {
    const [showLoading, setShowLoading] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const route = useRoute()
    const { user } = useContext(AuthContext)
    const fileReceived: FileVaccineInterface = route.params.data

    useEffect(() => {
        console.log(`http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_vaccines}/${fileReceived.name_file}`);
        
        if(fileReceived.name_file.includes('.pdf')){
            setShowImage(false)
        }else{
            setShowImage(true)
        }

    }, [])
    return (
        <View style={styles.container}>
            <Header textCenter="" itemRight={<></>} funcItemRight={() => { }} />
            <LoadingModal setShow={() => setShowLoading(!showLoading)} show={showLoading} />
            {showImage ?
                <Image
                    style={styles.image}
                    resizeMode='center'
                    source={{
                        uri: `http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_vaccines}/${fileReceived.name_file}`,
                    }}
                />
                :
                <PDFReader
                    source={{
                        uri: `http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_vaccines}/${fileReceived.name_file}`,
                    }}
                    webviewStyle={{ flex: 1 }}
                    withPinchZoom={true}
                    onLoad={() => setShowLoading(true)}
                    onLoadEnd={() => setShowLoading(false)}
                    onError={()=>console.log('erro')}
                    
                    //useGoogleReader={true}
                />
            }
        </View>
    )
}

export default ViewFileVaccine
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D2541',
        paddingTop: 40,
    },

    main: {
        justifyContent: 'center',

    },

    image: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    }
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