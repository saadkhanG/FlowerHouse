import {
    View, Text, SafeAreaView,
    StyleSheet, Image, TextInput, KeyboardAvoidingView,
    TouchableOpacity, ScrollView,ActivityIndicator,
    Dimensions } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import COLORS from '../consts/colors';
  import carton from '../../assets/images/carton.png';
  import camera from '../../assets/images/camera.png';
  import van from '../../assets/images/van.png';
  import tickicon from '../../assets/images/tick.png';
  import closeicon from '../../assets/images/close.png';
  const width = Dimensions.get("screen").width / 2 - 30
  const deviceHeight = Dimensions.get("window").height
  import database from '@react-native-firebase/database';
  import storage from '@react-native-firebase/storage';
  import auth from '@react-native-firebase/auth';
  import { create } from 'react-test-renderer';
  import usrIcon from '../../assets/images/usr.png';
  import {launchImageLibrary} from 'react-native-image-picker';
  
  const SubmitReview = ({navigation, route}) => {
    const [tick , setTick] = useState(true)
    const [SHimage, setSHimage] = useState(true)
    const [loading , setLoading] = useState(true)
    const [Uploadloading , setUploadLoading] = useState(false)
    const [imageuri , setImageuri] = useState('')
    const [imagename , setImagename] = useState('')
    const [userReview, setUserReview] = useState('')
    const [userRiderReview, setRiderUserReview] = useState('')
    const [username, setUsername] = useState('');
    useEffect(() => {
      getUsername()
    },[])
    const getUsername = async () => {
      try {
          const data = await database().ref('users/'+ auth().currentUser.uid).once("value");
          setUsername(data?.val());
      }
      catch (err) {
          console.log(err);
        }
      }
    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    const Close = () => {
      setImageuri()
      setSHimage(true)
    }
    const Change = () => {
      if (tick == true) {
        setTick(false)
      }
      else if (tick == false) {
        setTick(true)
      }
    }
    
    const Upload = async () => {
      if (tick == false) {
        alert('Agree to privacy policy in order to post a review')
      }
      else if (userReview.trim() == '') {
        alert('Please fill the reviews form')
      }
      else if (userRiderReview.trim() == '')
      {
        alert('fill riders review form')
      }
      else if (imageuri == '' && imagename == '')
      {
        alert('please upload picture of the product')
      }
      else{
        console.log(imagename)
        setUploadLoading(true)
        const reference = storage().ref('userreview/'+ imagename)
        try {
            await reference.putFile(imageuri)
            console.log('--Donee--')
            getUrl(imagename)

        } catch (err) {
            console.log(err)
        }
      }
    }
    const getUrl = async (imagename) => {
      const url = await storage().ref('userreview/' + imagename).getDownloadURL();
      submitData(url)
    }
    const submitData = async (url) => {
      const add = async () => {
        try {
          const response = await database().ref('review/'+ order.orderID).set(
          {
            name: order.name,
            image: url,
            review: userReview,
            userID : auth().currentUser.uid,
            username: username.name,
            orderID: order.orderID,
          });
          
        } catch (err) {
          console.log(err);
        }
      }
      const Update = async () => {
        try {
          const data = await database().ref('orders/'+ order.orderID)
          .update({
            review: 'done',
          })
          .then(navigation.navigate('AddReview'),alert('Thankyou for your kind review'),setUploadLoading(false))
        } catch (err) {
          console.log(err);
        }
      }
      Update()
      add()
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
          setSHimage(false)
          startLoading()
          setImageuri(result.assets[0].uri)
          setImagename(result.assets[0].fileName)
      }
  
  }
    const order = route.params;
    return (
      <View style={{backgroundColor:'white'}}>
          <SafeAreaView>
              <View style={styles.root}>
              <View style={styles.container}>
                  <View style={{
                  flex: 0.8,
                  flexDirection:'row',
                  justifyContent:'center',
                  }}>
                      <View style={{
                      flex:0.65,
                      alignItems:'flex-start',
                      justifyContent:'center',
                      }}>
                          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                          <Image source={usrIcon} style={{
                              height:30,
                              width:30,
                              resizeMode: 'contain',
                              tintColor:COLORS.white,
                          }}/>
                          </TouchableOpacity>
                      
                      </View>
                      <View style={{
                          flex:1,
                          alignItems:'flex-start',
                      }}>
                      <Text style={{
                          fontSize: 28,
                          color: 'white',
                          fontWeight: 'bold',
                          
                      }}>Write Review</Text>
                      </View>
                  </View>
              </View>
              {Uploadloading ? (
                <>
                  <ActivityIndicator
                    visible={loading}
                    textContent={'Loading...'}
                    size="small"
                  />
                </>
              ):(
                <>
                    <ScrollView contentContainerStyle={{
                      paddingBottom:300,
                    }}>
                    <View style={{marginTop:10}}>
                      <View style={{
                        marginTop:10,
                        backgroundColor:COLORS.light,
                        flexDirection:'row',
                        paddingLeft:10,
                        padding:5,
                      }}>
                        <Image
                          source={carton}
                          style={{
                            height:20,
                            width:20
                          }}
                        />
                        <Text style={{
                          paddingLeft:10,
                          color:'black',
                          fontWeight:'bold'
                        }}>Product Quality</Text>
                      </View>
                      <View style={{
                        flexDirection:'row',
                        borderBottomWidth:0.7,
                      }}>
                        <Image 
                          style={{
                            margin:5,
                            borderRadius:15,
                            backgroundColor:COLORS.light,
                            height:80,
                            width:80,
                            resizeMode:'contain'
                          }}
                          source={{uri: order.image}}
                        />
                        <View style={{
                          margin:5,
                          borderRadius:15,
                          width:'75%',
                          backgroundColor:COLORS.light,
                        }}>
                          <View style={{
                            padding:15,
                          }}>
                            <Text style={{
                              paddingLeft:5,
                              fontSize:15,
                              color:'black',
                              fontWeight:'bold'
                            }}>{order.name}</Text>
                            <Text style={{
                              paddingLeft:5,
                              fontSize:15,
                              color:'black',
                              fontWeight:'bold'
                            }}>Rs : {order.price}</Text>
                          </View>
                          
                        </View>
                      </View>
                      {SHimage ? (
                        <>
                          <TouchableOpacity onPress={openGallery}>
                            <View style={{
                              borderWidth:1,
                              margin:10,
                              borderStyle: 'dashed',
                              flexDirection:'row',
                              justifyContent:'center',
                              alignItems:'center',
                              padding:20,
                            }}>
                              <View>
                                <Image
                                  style={{
                                    width:25,
                                    height:25,
                                    resizeMode:'contain',
                                    marginRight:5,
                                  }}
                                  source={camera}
                                />
                              </View>
                              <Text style={styles.text}>Upload Photo</Text>
                            </View>
                          </TouchableOpacity>
                        </>
                      ):
                      (
                        <>
                          {loading ? (
                            <>
                              <ActivityIndicator
                                  visible={loading}
                                  textContent={'Loading...'}
                                  textStyle={styles.spinnerTextStyle}
                              />
                            </>
                          ):(
                            <>
                              <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                padding:10
                              }}>
                                <Image
                                  style={{
                                    width:100,
                                    height:100,
                                    resizeMode:'contain'
                                  }}
                                  source={{uri:imageuri}}
                                />
                                <TouchableOpacity onPress={Close}>
                                  <Image
                                    style={{
                                      width:30,
                                      height:30,
                                      borderWidth:1,
                                      borderColor:'black',
                                      borderRadius:60,
                                      resizeMode:'contain'
                                    }}
                                    source={closeicon}
                                  />
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                          
                        </>
                      )}
                      
                        <View style={{
                          backgroundColor: COLORS.light,
                          margin:5,
                          minHeight:100,
                        }}>
                          <TextInput 
                              placeholder="Don't be shy, tell us more!" 
                              style={styles.input} 
                              multiline={true}
                              value={userReview}
                              onChangeText={e => setUserReview(e)}
                          />
                        </View>
      
                        <View style={{
                          marginTop:10,
                          paddingTop:15,
                          borderTopWidth:1,
                          backgroundColor:COLORS.light,
                          flexDirection:'row',
                          paddingLeft:10,
                          padding:5,
                        }}>
                          <Image
                            source={van}
                            style={{
                              height:20,
                              width:20
                            }}
                          />
                          <Text style={{
                            paddingLeft:10,
                            color:'black',
                            fontWeight:'bold'
                          }}>Rate Your Rider</Text>
                        </View>
                        <View style={{
                          backgroundColor: COLORS.light,
                          margin:5,
                          minHeight:100,
                        }}>
                            <TextInput 
                                placeholder="How was your experience with our rider ?" 
                                style={styles.input} 
                                multiline={true}
                                value={userRiderReview}
                                onChangeText={e => setRiderUserReview(e)}
                            />
                        </View>
                      <TouchableOpacity onPress={Change}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                        }}>
                          <Image 
                            style={{
                              height:15,
                              width:15,
                              resizeMode:'contain',
                              tintColor: tick ? COLORS.green : 'silver'
                            }}
                            source={tickicon}
                          />
                          <View style={{
                            flexDirection:'row',
                          }}>
                            <Text> I agree to </Text>
                            <Text style={{color:COLORS.green}}>Flower House's Privacy Policy</Text>
                          </View>
                        </View>
                      </TouchableOpacity>  
                    </View>
                    
                  </ScrollView>  

                  <View style={{
                      marginTop:20,
                      bottom:22,
                      width:'100%',
                  }}>
                    <TouchableOpacity onPress={Upload}>
                      <View style={{
                        backgroundColor: COLORS.green,
                        margin:15,
                        borderRadius:15,
                        alignItems:'center',
                        justifyContent:'center',
                        padding:11,
                      }}>
                        <Text style={{
                          color:'white',
                          fontSize:20,
                        }}>Share Review</Text>
                      </View>
                    </TouchableOpacity>
                  </View>        
                </>
              )}
                  
              
                  
              
              </View>
          </SafeAreaView>
      </View>
    )
  }
  
  export default SubmitReview
  const styles = StyleSheet.create({
    root:{
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
        
    },
    container:{
        backgroundColor: COLORS.green,
        padding:11,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    text:{
        fontSize:15,
        color:'black',
        fontWeight:'bold'
    },
    input:{
      fontSize:15,
      fontWeight: 'bold',
      color: 'black',
    },
  })