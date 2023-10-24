import { View, Text, StyleSheet,SafeAreaView, Dimensions, Image, TouchableOpacity,Modal} from 'react-native'
import React, { useState, useEffect }  from 'react'
import COLOR from '../consts/colors';
import usrIcon from '../../assets/images/usr.png';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const deviceHeight = Dimensions.get("window").height

const CancelOrder = ({navigation, route}) => {
    const [show, setShow] = useState(false)
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
                  backgroundColor:COLOR.light,
                  width:'100%',
                  maxHeight: deviceHeight * 0.4,
              }}>
                <View style={{alignItems:'center',padding:15,paddingTop:40}}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>Do you want to cancel the order permanently?</Text>
                </View>
                <View style={{
                  flexDirection:'row',
                  justifyContent:'space-evenly',
                  paddingBottom:40,
                  paddingTop:10
                }}>
                    <TouchableOpacity onPress={Close}>
                        <View style={{
                            padding:10,
                            backgroundColor:'white',
                            borderRadius:20,
                            paddingHorizontal:60,
                        }}>
                            <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>No</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={RemoveData}>
                        <View style={{
                            padding:10,
                            backgroundColor:COLOR.green,
                            borderRadius:20,
                            paddingHorizontal:60,
                        }}>
                            <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Yes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </View>
          </Modal>
        )
      }
      const Open = () => {
        setShow(true)
      }
      const Close = () => {
        setShow(false)
      }
    const myData = route.params;
    const [Showoptions, setShowoptions] = useState(false);
    const [UserOption, setUserOption] = useState('');
    const RemoveData = async () => {
        try {
            const data = await database().ref('/orders/'+ myData.orderID).remove()
            .then(()=> alert('Completed'), navigation.navigate('OrderHistory',{paramKey: '2',}))
        }
        catch (err) {
            console.log(err);
        }
    }
    const Options = ({title}) => {
        setShowoptions(true)
        setUserOption(title)
    }
    const Reasons = (num,title) => {
        return(
            <View>
                <TouchableOpacity onPress={() => Options({title})}>
                    <Text style={styles.text}>{num}: {title}</Text>
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
                  marginRight:100,
                }}>
                  <Text style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: 'bold',
                    
                  }}>Cancel Order</Text>
                </View>
            </View>
          </View>
          <View style={{
            marginVertical:10,
            padding:10,
            backgroundColor:'white',
          }}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:15,}}>Why do you want to cancel your order ?</Text>
          </View>
          {Reasons('1' ,'Change of mind.')}
          {Reasons('2' ,'High shipping costs and service charges.')}
          {Reasons('3' ,'Long delivery time.')}
          {Reasons('4','Payment options.')}
          {Reasons('5','Order placed by mistake')}
          {Reasons('6','Other Reasons.')}
          {Showoptions ? (
            <>
                <View style={{
                    marginVertical:10,
                    padding:10,
                    backgroundColor:'white',
                }}>
                    <Text style={{color:'black',fontSize:15,}}>Option Selected : {UserOption}</Text>
                </View>
                <TouchableOpacity onPress={Open}>
                    <View style={{
                        backgroundColor:COLOR.green,
                        marginHorizontal:80,
                        alignItems:'center',
                        justifyContent:'center',
                        paddingVertical:5,
                        marginVertical:10,
                        borderRadius:20,
                    }}>
                        <Text style={{color:'white',fontSize:20}}>Cancel Order</Text>
                    </View>
                </TouchableOpacity>
                {show ? (
                    <>
                        <ModalView/>
                    </>
                ):(
                    <>
                    </>
                )}
            </>
          ): (
            <>
                <View style={{
                    marginVertical:10,
                    padding:10,
                    backgroundColor:'white',
                }}>
                    <Text style={{color:'black',fontSize:15,}}>Select Any Option</Text>
                </View>
            </>
          )}
          
        </View>
    </SafeAreaView>
  )
}

export default CancelOrder
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
    text:{
        color:'black',
        fontWeight:'bold',
        fontSize:14,
        marginVertical:5,
        marginLeft:10,
    },
    
  })