import { View, Text, TouchableOpacity,Image,ActivityIndicator } from 'react-native'
import storage from '@react-native-firebase/storage';
import React, { useState, useEffect }  from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';

const Images = () => {
    const OpenCamera = () => {
        const options ={
        storageOptions:{
            path:'images',
            mediaType:'photo',
        },
        includeBase64:true,
        };
        launchCamera(options,response => {
        if (response.didCancel) {
            console.log('User cancelled image picker')
        }
        else if (response.error) {
            console.log('Image Picker = ' , response.error)
        }
        else if (response.didCancel) {
            console.log('User cancelled image picker')
        }
        else{
            const Add = async () => {
                const reference = storage().ref('userreview/'+ response.assets[0].fileName)
                try {
                    setLoading(true)
                    await reference.putFile(response.assets[0].uri)
                    console.log('--Donee--')
                    getdatabase(response.assets[0].fileName)                
                } catch (err) {
                    console.log(err)
                }
            }
            Add()
        }
        })
    }
    const [loading , setLoading] = useState(false);
    const Tryy = async (URL) => {
        try {
            const data = await database().ref('test/2')
            .update({
                image: URL,
            })
            .then(getInfo())
        } catch (err) {
            console.log(err);
        }
    }
    const getdatabase = async (title) => {
        const url = await storage().ref('userreview/' + title).getDownloadURL();
        Tryy(url)
    }
    const [myData, setMyData] = useState('');
    useEffect(() => {
        getInfo()
    },[])
    
    const getInfo = async () => {
        const data = await database().ref('test/2').once("value");
        setMyData(data?.val());
        console.log('updated')
        setLoading(false)
    }

    let opt = {
        saveToPhotos: true,
        mediaType:'photos',
    };

    const openGallery = async () => {
        const result = await launchImageLibrary(opt);
        if (result.didCancel) {
        console.log('User cancelled image picker')
        }
        else if (result.error) {
        console.log('Image Picker = ' , response.error)
        }
        else if (result.didCancel) {
        console.log('User cancelled image picker')
        }
        else{
            const reference = storage().ref('userreview/'+result.assets[0].fileName)
            try {
                setLoading(true)
                await reference.putFile(result.assets[0].uri)
                console.log('--Donee--')
                getdatabase(result.assets[0].fileName)    
                console.log(result.assets[0].fileName)   
                console.log(result.assets[0].uri)           
            } catch (err) {
                console.log(err)
            }
        }

    }
    
  return (
    <View>
        {loading ? (
            <>
                <ActivityIndicator
                    visible={loading}
                    textContent={'Updating...'}
                />
            </>
        ):(
            <>
                <Text style={{fontSize:55,padding:20}}>{myData.name ? myData.name : 'default'}</Text>
                <Image 
                    style={{width:150,height:150}}
                    source={{uri: myData.image ? myData.image : 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}}
                />
            </>
        )}

      
      <TouchableOpacity onPress={openGallery}>
        <Text style={{fontSize:55}}>Change picture</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={OpenCamera}>
        <Text style={{fontSize:55}}>Camera</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Images