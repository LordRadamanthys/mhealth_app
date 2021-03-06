
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import Header from '../../components/Header';
import LoadingModal from '../../components/Loading';
import AuthContext from '../../providers/AuthProvider';
import { useRoute } from '@react-navigation/native';
import FileInterface from '../../interfaces/FilesInterface';




const ViewFile = () => {
    const [showLoading, setShowLoading] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const route = useRoute()
    const { user } = useContext(AuthContext)
    const fileReceived: FileInterface = route.params.data

    useEffect(() => {
        console.log(`http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_exams}/${fileReceived.name_file}`);
        
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
                        // uri: `http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_exams}/${fileReceived.name_file}`,
                        uri: `${user?.link_files}${user?.id}/${fileReceived.page}/${fileReceived.id_exams}/${fileReceived.name_file}`
                    }}
                />
                :
                <PDFReader
                    source={{
                        // uri: `http://192.168.100.10:2222/file/${fileReceived.page}/${user?.id}/${fileReceived.id_exams}/${fileReceived.name_file}`,
                        uri: `${user?.link_files}${user?.id}/${fileReceived.page}/${fileReceived.id_exams}/${fileReceived.name_file}`,
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

export default ViewFile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1f',
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