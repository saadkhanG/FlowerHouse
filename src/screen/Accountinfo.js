import { View,Modal, Text, StyleSheet,SafeAreaView,TextInput, Dimensions, Image, TouchableOpacity,ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect }  from 'react';
import auth from '@react-native-firebase/auth';
import dotIcon from '../../assets/images/dots.png';
import usrIcon from '../../assets/images/usr.png';
import CustomFooter from '../component/CustomFooter';
import COLOR from '../consts/colors';
import {Auth} from '../services';
import storage from '@react-native-firebase/storage';
import camimg from '../../assets/images/cam.png';
import greaterimg from '../../assets/images/greater.png';
import database from '@react-native-firebase/database';
import gallery from '../../assets/images/gallery.png';
import camera from '../../assets/images/camera.png';
const deviceHeight = Dimensions.get("window").height
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const width = Dimensions.get("screen").width/2-30

const Accountinfo = ({navigation}) => {

    // Fetching Firebase............................................
    const [myData, setMyData] = useState('Loading');
    const [loading, setLoading] = useState(false);
    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
     };
    useEffect(() => {
        startLoading()
        getDatabase()
    },[])
    const getDatabase = async () => {
        try {
            const data = await database().ref('users/'+ auth().currentUser.uid).once("value");
            setMyData(data?.val());
        }
        catch (err) {
            console.log(err);
        }
    }
    const ImageDatabase = async (title) => {
        const url = await storage().ref('userprofiles/' + title).getDownloadURL();
        UpdateImage(url)
    }
    const UpdateImage = async (URL) => {
        try {
            const data = await database().ref('users/'+ auth().currentUser.uid)
            .update({
                image: URL,
            })
            .then(getDatabase(),setLoading(false))
        } catch (err) {
            console.log(err);
        }
    }

    // Fetching ends here................................................
    //Images part//////////////////////
    const [show, setShow] = useState(true)
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
            const reference = storage().ref('userprofiles/'+result.assets[0].fileName)
            try {
                setLoading(true)
                Close()
                await reference.putFile(result.assets[0].uri)
                console.log('--Donee--')
                ImageDatabase(result.assets[0].fileName)                
            } catch (err) {
                console.log(err)
            }
        }

    }
    //Till here////////////////////////
    //MOddalllll................
    const ModalView = () => {
        return(
          <Modal
              animationType={'slide'}
              transparent={true}
          >
            <View onStartShouldSetResponder={() => Close()}
              style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
            </View>
              <View style={{
                  backgroundColor:'white',
                  width:'100%',
                  width: '100%',
                  maxHeight: deviceHeight * 0.4,
              }}>
                <View style={{
                  justifyContent:'space-evenly',
                }}>
                  
                  <TouchableOpacity onPress={openGallery}>
                    <View style={{
                      alignItems:'center',
                      padding:30,
                    }}>
                      <Image 
                      source={gallery}
                      style={{height:50,width:50,resizeMode:'contain'}}
                    />
                      <Text style={{
                        fontSize:15,
                        color:'black',
                        paddingTop:5,
                        }}>Open Gallery</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
          </Modal>
        )
      }
      const Open = () => {
        setShow(false)
      }
      const Close = () => {
        setShow(true)
      }
    //Till here/////////////////
    const Details = () => {
        return(
            <View>
                {loading ? (
                    <ActivityIndicator
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    ) : (
                    <>
                    <View style={{
                        marginTop:50,
                        alignItems: 'center',
                        justifyContent:'center',
                    }}>
                        <Image 
                            source={{uri : myData.image ? myData.image : 'https://www.portmelbournefc.com.au/wp-content/uploads/2022/03/avatar-1.jpeg'}}
                            style={{
                                borderWidth:1,
                                borderColor:'black',
                                width:150,
                                height:150,
                                borderRadius:100,
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={Open}
                    style={{
                        backgroundColor:COLOR.green,
                        padding:8,
                        alignItems:'center',
                        borderRadius:10,
                        marginTop:30,
                        marginBottom:50,
                        marginLeft:'20%',
                        marginRight:'20%',
                    }}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'center',
                        }}>
                            <View style={{
                                alignItems:'flex-start',
                                justifyContent:'center',
                                paddingRight:10,
                            }}>
                                <Text style={{
                                    fontSize:15,
                                    color:'white',
                                    fontWeight:'bold',
                                }}>Change Profile Picture</Text>
                            </View>
                            <View style={{
                                alignItems:'flex-start',
                                justifyContent:'center',
                            }}>
                                <Image 
                                    source={camimg}
                                    style={{
                                        width:22,
                                        height:22,
                                        resizeMode: 'contain',
                                        tintColor:COLOR.white,
                                }}
                                />
                            </View>
                        </View>
                </TouchableOpacity>
                
                        {Buttons('name', myData.name ? myData.name : 'enter name')}
                        {Buttons('email', myData.email ? myData.email : 'enter email')}
                        {Buttons('number', myData.number ? myData.number : 'enter number')}
                        {Buttons('gender', myData.gender ? myData.gender : 'choose gender')}
                        {Buttons('address', myData.address ? myData.address : 'enter address')}
                    </>
                )}
                {show ? (
                    <></>
                    ) : (
                    <>
                    <ModalView/>
                    </>
                )}
            </View>
        )
    }
    const Buttons = (title,text) => {
        return(
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginLeft:10,
                marginRight:10,
                marginBottom:5,
                paddingTop:13,
                borderTopStartRadius:10,
                borderTopEndRadius:10,
                paddingBottom:13,
                borderBottomWidth:0.6,
                backgroundColor:'white',
                borderColor:'grey',
            }}>
                <View style={{
                    paddingLeft:10,
                }}>
                    <Text style={{
                        fontSize:18,
                        color:'black',
                    }}>{title}</Text>
                    
                </View>
                <View style={{
                    justifyContent:'center',
                }}>
                    <Text style={{
                        fontSize:16,
                        paddingLeft:5,
                        color:'grey',
                    }}>{text ? text : 'Loading'}</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Editinfo',title)}>
                    <View style={{
                        position:'relative',
                        marginRight:5,
                    }}>
                        <Image 
                            source={greaterimg}
                            style={{
                                width:22,
                                height:22,
                                resizeMode: 'contain',
                                tintColor:COLOR.green,
                        }}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
  return (
    
    <SafeAreaView style={{flex:1}}>
        <View style={styles.root}>
          <View style={styles.container}>
            <View style={{
              flex: 1,
              flexDirection:'row',
              justifyContent:'center',
              }}>
                <View style={{
                  flex:1,
                  alignItems:'flex-start',
                  justifyContent:'center',
                  }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                      <Image source={usrIcon} style={{
                        height:30,
                        width:30,
                        resizeMode: 'contain',
                        tintColor:COLOR.white,
                      }}/>
                    </TouchableOpacity>
                  
                </View>
                <View style={{
                  marginRight:60,
                }}>
                  <Text style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: 'bold',
                    
                  }}>Account Information</Text>
                </View>
            </View>
     
          </View>
          <View>
            <Details/>
          </View>

          {/* Footerrr */}
            <View style={{
                marginTop:20,
                position:'absolute',
                bottom:22,
                width:'100%',
            }}>
                <CustomFooter
                t1= {() => navigation.navigate('HomeScreen')}
                t2= {() => navigation.navigate('Notifications')}
                t3= {() => navigation.navigate('Settings')}
                t4= {() => Auth.signOut()}
                
                /> 
            </View>
          </View>
    </SafeAreaView>
  )
}

export default Accountinfo

const styles = StyleSheet.create({
    root:{
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: COLOR.light,
        
    },
    container:{
        backgroundColor: COLOR.green,
        padding:11,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    card:{
        height: 330,
        backgroundColor: COLOR.light,
        width,
        marginHorizontal: 2,
        marginTop:10,
        marginBottom:8,
        borderRadius: 10,
        padding:10,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})