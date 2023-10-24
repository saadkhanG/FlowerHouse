import { View, Text,FlatList,StyleSheet,Dimensions,Image, TouchableOpacity,Modal } from 'react-native'
import React, { useState, useEffect }  from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import COLOR from '../consts/colors';
import COLORS from '../consts/colors';
const Stack = createStackNavigator();
const deviceHeight = Dimensions.get("window").height

const OrderDetails = ({navigation, route}) => {
  const order = route.params;
  const [myData, setMyData] = useState(order);
  const [show, setShow] = useState(true)
  const [address , setAddress] = useState()
  const [adrstatus , setAdrstatus] = useState(false)
  const Adr = () => {
    if (data.address === '') {
      setAdrstatus(false)
    }
    else if (data.address === ' ') {
      setAdrstatus(false)
    }
    else (
      setAddress(data.address),
      setAdrstatus(true)
    )
  }
  const Update = async () => {
    try {
      const data = await database().ref('orders/'+ myData.orderID)
      .update({
        status: 'Paid',
        price: myData.price +150,
      })
      .then(navigation.navigate('OrderHistory',{paramKey: 0}),alert('Order has been placed'))
    } catch (err) {
      console.log(err);
    }
  }
  // Fetching Firebase............................................
  const [data, setData] = useState('Loading');
  useEffect(() => {
      getDatabase()
  },[])
  const getDatabase = async () => {
      try {
          const data = await database().ref('users/'+ auth().currentUser.uid).once("value");
          setData(data?.val());
      }
      catch (err) {
          console.log(err);
      }
  }

  // Fetching ends here................................................
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
          }}>
            <View style={{
              padding:30
            }}>
              <View style={{
                backgroundColor:COLOR.green,
                padding:15,
                borderRadius:15,
              }}>
                <Text style={{
                  color:'white',
                  fontSize:15
                }}>Adress : {data.address ? data.address : 'Enter address from account settings'}</Text>
              </View>

              <View style={{
                marginTop:10,
                padding:10,
                justifyContent:'center'
              }}>
                <Text style={{
                  color:'black',
                  backgroundColor:COLOR.light,
                  padding:15,
                  borderRadius:15,
                  fontSize:15,
                  marginBottom:5,
                }}>Delivery Options Available : COD</Text>
                <Text style={{
                  color:'black',
                  fontSize:15,
                  marginBottom:5,
                }}>Quantity : {myData.quantity}</Text>
                
                <Text style={{
                  color:'black',
                  fontSize:15,
                  marginBottom:5,
                }}>Total : ------------------- Rs : {myData.price}</Text>
                <Text style={{
                  color:'black',
                  fontSize:15,
                  marginBottom:5,
                }}>Delievery Charges : -------- Rs : 150</Text>
                <Text style={{
                  color:'black',
                  backgroundColor:COLOR.light,
                  padding:15,
                  borderRadius:15,
                  fontSize:15,
                  marginBottom:5,
                }}>Sub-Total : ------------- Rs : {myData.price + 150}</Text>
              </View>

            </View>
            {adrstatus ? (
              <>
                <View style={{
                    alignItems:'flex-end',
                    marginRight:30,
                    marginBottom:15,
                  }}>
                    <TouchableOpacity onPress={Update}>
                      <View style={{
                        backgroundColor:COLOR.green,
                        padding:15,
                        borderRadius:15,
                      }}>
                        <Text style={{
                          color:'white',
                          fontSize:15,
                          fontWeight:'bold'
                        }}>Check-out</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              </>
            ):(
              <>
                <View style={{
                  padding:15,
                }}>
                  <Text style={{
                    color:'black',
                    fontSize:15
                  }}>NOTE : Add your address in order to checkout !</Text>
                </View>
              </>
            )}
          </View>
      </Modal>
    )
  }
  const Open = () => {
    setShow(false),
    Adr()
  }
  const Close = () => {
    setShow(true)
  }
  function Review ({navigation}) {
    return(
      <View>
        <Text>Add a review</Text>
      </View>
    )
  }
  function Paid ({navigation}) {
    return(
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={{
            justifyContent:'center',
            }}>
              <View style={{
                flex:1,
                justifyContent:'center',
                }}>
                </View>
                <View>
                <Text style={{
                  fontSize: 28,
                  color: 'white',
                  fontWeight: 'bold',
                }}>Paid Orders</Text>
              </View>
          </View>    
        </View>
        {/* header closed */}
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:30,
          marginBottom:20,
        }}>
          <Image 
            source={{uri : myData.image}}
            style={{
              width:150,
              height:150,
              borderWidth:2,
              borderRadius:30,
              backgroundColor:'white'
            }}
          />       
        </View>
        <View style={{
          backgroundColor:'white',
          margin:10,
          padding:5,
          borderRadius:15,
        }}>
          <Text style={styles.text}>Order Details :</Text>
          <View style={{
            justifyContent:'center',
          }}>
            <View>
              <Text style={styles.text1}>Tracking No. : {myData.orderID}</Text>
              <Text style={styles.text}>Order Info : </Text>
              <Text style={styles.text1}>Name : {myData.name}</Text>
              <Text style={styles.text1}>Quantity : {myData.quantity}</Text>
              <Text style={styles.text1}>Sub-Total Rs : {myData.price}</Text>
              <Text style={styles.text}>Delivery Status : </Text>
              <Text style={styles.text1}>Your order has been placed. The order is getting 
              prepared to get delivered for further details contact us on
              'saadk2487@gmail.com'</Text>
            </View>
          </View>
        </View>
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:20,
        }}>
          <TouchableOpacity onPress={()=> {navigation.navigate('HomeScreen')}}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            marginTop:20,
          }}>
            <Text style={{
              color: COLOR.green,
              paddingBottom:5,
              fontSize:16,
            }}>Continue Shopping </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  function ToPay ({navigation}) {
    return(
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={{
            justifyContent:'center',
            }}>
              <View style={{
                flex:1,
                justifyContent:'center',
                }}>
                </View>
                <View>
                <Text style={{
                  fontSize: 28,
                  color: 'white',
                  fontWeight: 'bold',
                }}>Check Out</Text>
              </View>
          </View>    
        </View>
        {/* header closed */}
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:30,
          marginBottom:20,
        }}>
          <Image 
            source={{uri : myData.image}}
            style={{
              width:150,
              height:150,
              borderWidth:2,
              borderRadius:30,
              backgroundColor:'white'
            }}
          />       
        </View>
        <View style={{
          backgroundColor:'white',
          margin:10,
          padding:5,
          borderRadius:15,
        }}>
          <Text style={{
            fontSize:15,
            marginTop:10,
            fontWeight:'bold',
          }}>Order Details :</Text>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
          }}>
            <View>
              <Text style={styles.text1}>Order No. : </Text>
              <Text style={styles.text1}>Status : </Text>
              <Text style={styles.text1}>Name : </Text>
              <Text style={styles.text1}>Price Rs : </Text>
              <Text style={styles.text1}>Quantity : </Text>
              <Text style={styles.text1}>Date : </Text>
            </View>
            <View>
              <Text style={styles.text}>{myData.orderID}</Text>
              <Text style={{
                fontSize:16,
                fontWeight:'bold',
                color:COLOR.green,
                marginTop:5,
              }}>{myData.status}</Text>
              <Text style={styles.text}>{myData.name}</Text>
              <Text style={styles.text}>{myData.price}</Text>
              <Text style={styles.text}>{myData.quantity}</Text>
              <Text style={styles.text}>{myData.date}</Text>
            </View>
            
          </View>
          <View style={{
            marginTop:30,
            alignItems:'center',
            justifyContent:'center',
          }}>
            <TouchableOpacity onPress={Open}>
              <View style={{
                padding:10,
                paddingLeft:40,
                paddingRight:40,
                borderRadius:15,
                backgroundColor:COLOR.green,
              }}>
                <Text style={{
                  color:'white',
                  fontSize:15,
                }}>Pay</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:20,
        }}>
          <TouchableOpacity onPress={()=> {navigation.navigate('HomeScreen')}}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            marginTop:20,
          }}>
            <Text style={{
              color: COLOR.green,
              paddingBottom:5,
              fontSize:16,
            }}>Continue Shopping </Text>
          </View>
        </TouchableOpacity>
        </View>
        {show ? (
          <>
          </>
        ):(
          <>
            <ModalView/>
          </>
        )}
      </View>
    )
  }
  function Pending ({navigation}) {
    return(
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={{
            justifyContent:'center',
            }}>
              <View style={{
                flex:1,
                justifyContent:'center',
                }}>
                </View>
                <View>
                <Text style={{
                  fontSize: 28,
                  color: 'white',
                  fontWeight: 'bold',
                }}>Pending Order</Text>
              </View>
          </View>    
        </View>
        {/* header closed */}
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:30,
          marginBottom:20,
        }}>
          <Image 
            source={{uri : myData.image}}
            style={{
              width:150,
              height:150,
              borderWidth:2,
              borderRadius:30,
              backgroundColor:'white'
            }}
          />       
        </View>
        <View style={{
          backgroundColor:'white',
          margin:10,
          padding:5,
          borderRadius:15,
        }}>
          <Text style={{
            fontSize:15,
            marginTop:10,
            fontWeight:'bold',
          }}>Order Details :</Text>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
          }}>
            <View>
              <Text style={styles.text1}>Order No. : </Text>
              <Text style={styles.text1}>Status : </Text>
              <Text style={styles.text1}>Name : </Text>
              <Text style={styles.text1}>Price Rs : </Text>
              <Text style={styles.text1}>Quantity : </Text>
              <Text style={styles.text1}>Date : </Text>
            </View>
            <View>
              <Text style={styles.text}>{myData.orderID}</Text>
              <Text style={{
                fontSize:16,
                fontWeight:'bold',
                color:COLOR.green,
                marginTop:5,
              }}>{myData.status}</Text>
              <Text style={styles.text}>{myData.name}</Text>
              <Text style={styles.text}>{myData.price}</Text>
              <Text style={styles.text}>{myData.quantity}</Text>
              <Text style={styles.text}>{myData.date}</Text>
            </View>
            
          </View>
          <View style={{
            borderTopWidth:1,
            marginTop:10,
          }}>
            <Text style={styles.text}>Note !</Text>
            <Text style={{
              fontSize:16,
              padding:5,
            }}>Your order for {myData.name} is under review, 
            it will be soon accepted by our representative.
            Thankyou for shopping with FLOWER HOUSE.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CancelOrder", myData)}>
              <View style={{
                backgroundColor:COLORS.green,
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
          </View>
        </View>
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:20,
        }}>
          <TouchableOpacity onPress={()=> {navigation.navigate('HomeScreen')}}>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            marginTop:20,
          }}>
            <Text style={{
              color: COLOR.green,
              paddingBottom:5,
              fontSize:16,
            }}>Continue Shopping </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  if (order.status === 'Pending') {
    return(
      <Stack.Navigator 
        screenOptions={{
            headerShown : false ,
            gestureEnabled:true,
            gestureDirection: "horizontal",
            cardStyleInterpolator :CardStyleInterpolators.forHorizontalIOS,
            }} >
            
            <Stack.Screen name="Pending" component={Pending}/>
        </Stack.Navigator>
    )
  }
  else if (order.status === 'To Pay') {
    return(
      <Stack.Navigator 
        screenOptions={{
            headerShown : false ,
            gestureEnabled:true,
            gestureDirection: "horizontal",
            cardStyleInterpolator :CardStyleInterpolators.forHorizontalIOS,
            }} >
            
            <Stack.Screen name="ToPay" component={ToPay}/>
        </Stack.Navigator>
    )
  }
  else if (order.status === 'Paid') {
    return(
      <Stack.Navigator 
        screenOptions={{
            headerShown : false ,
            gestureEnabled:true,
            gestureDirection: "horizontal",
            cardStyleInterpolator :CardStyleInterpolators.forHorizontalIOS,
            }} >
            
            <Stack.Screen name="Paid" component={Paid}/>
        </Stack.Navigator>
    )
  }
  else if (order.review === 'Review') {
    return(
      <Stack.Navigator 
        screenOptions={{
            headerShown : false ,
            gestureEnabled:true,
            gestureDirection: "horizontal",
            cardStyleInterpolator :CardStyleInterpolators.forHorizontalIOS,
            }} >
            
            <Stack.Screen name="Review" component={Review}/>
        </Stack.Navigator>
    )
  }
}

export default OrderDetails
const styles = StyleSheet.create({
  root:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
  container:{
      backgroundColor: COLOR.green,
      padding:11,
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      justifyContent: 'center',
  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    color:'black',
    marginTop:5,
  },
  text1:{
    fontSize:16,
    fontWeight:'bold',
    color:'grey',
    marginTop:5,
  }
})