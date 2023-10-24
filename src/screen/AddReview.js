import { View, Text, StyleSheet,SafeAreaView, Dimensions, Image, TouchableOpacity,ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect }  from 'react'
import COLOR from '../consts/colors';
import dotIcon from '../../assets/images/dots.png';
import usrIcon from '../../assets/images/usr.png';
import CustomFooter from '../component/CustomFooter';
import orders from '../consts/orders';
import database from '@react-native-firebase/database';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get("screen").width/2-30



const AddReview = ({navigation}) => {

  const [loading, setLoading] = React.useState(true);
    const Refreshh = () => {
        console.log('Refreshh')
        getDatabase();
        setLoading(false)
    }
  // Fetching Firebase............................................
  const [myData, setMyData] = useState(null);
  useEffect(() => {
    Refreshh()
  }, [])
  const getDatabase = async () => {
      try {
          const data = await database().ref('orders/').once("value");
          setMyData(data?.val());
      }
      catch (err) {
          console.log(err);
      }
  }
  // Fetching ends here................................................
  const FilterData = ({order}) => {
      if (order != null) {
        if ((order.status == 'Paid') && (order.userID == auth().currentUser.uid) && (order.review == 'Review')) {
          return(
            <View style={styles.card}>
              <View style={{
                  flexDirection:'row',
              }}>
                  <View>
                      <Image
                          style={{width:120,height:120, resizeMode:'contain'}}
                          source={{uri:order.image}}
                      />
                  </View>
                  <View style={{
                      marginTop:25,
                  }}>
                      <Text style={styles.text}>Order ID : {order.orderID}</Text>
                      <Text style={styles.text}>Name : {order.name}</Text>
                      <Text style={styles.text}>Price Rs : {order.price}</Text>
                      <Text style={styles.text}>Status : {order.status}</Text>
                  </View>
                  
              </View>
              <View style={{
                  alignItems:'flex-end',
                  justifyContent:'center',
              }}>
                  <TouchableOpacity onPress={() => navigation.navigate("SubmitReview", order)}>
                  <View style={{
                      padding:7,
                      borderRadius:15,
                      backgroundColor:COLOR.green,
                  }}>
                      <Text style={{
                      color:'white',
                      fontSize:15,
                      }}>Review</Text>
                  </View>
                  </TouchableOpacity>
              </View>
          </View>
          );
              
        }
        
    }
  
  }
  const Notii = ({order}) => {
    return(
          <View style={styles.card}>
          <Text style={{color:'black',fontWeight: 'bold',fontSize:20, color:COLOR.green}}>{order.name}</Text>
              <View style={{alignItems:'center'}}>
              </View>
              <View style={{alignItems:'center'}}>
                  <Image style={{width:70, height: 100,resizeMode: 'contain'}} source={{uri: order.image}} />
              </View>
              <View style={{
                alignItems:'center',
                justifyContent:'center',
              }}>
                    
                <View style={{
                    marginTop:5,
                }}>
                    <Text style={{
                        marginTop:5,
                        fontSize:15,
                        color:'black'
                        }}>Total PKR : {order.price}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems:'center',
                    }}>
                    <Text style={{
                        marginTop:10,
                        fontSize:15,
                        color:'black'
                        }}>Date: {order.date}</Text>
                </View>
              </View>
              <View style={{
                    marginTop:10,
                    justifyContent:'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("SubmitReview", order)}>
                    <View style={{
                        padding:7,
                        borderRadius:15,
                        backgroundColor:COLOR.green,
                        alignItems:'center',
                    }}>
                        <Text style={{
                        color:'white',
                        fontSize:15,
                        }}>Review</Text>
                    </View>
                    </TouchableOpacity>
                </View>
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
                  marginRight:110,
                }}>
                  <Text style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: 'bold',
                    
                  }}>Reviews</Text>
                </View>
            </View>
            
            <TouchableOpacity>
              <Image source={dotIcon} style={{
                height:20,
                tintColor:'white',
                width:30,
                resizeMode: 'contain',
              }} />
            </TouchableOpacity>
            
          </View>
          <View>
            <ScrollView style={{
              marginBottom:0,
            }}>
              
            </ScrollView>
            
          </View>
          {/* <FlatList
              columnWrapperStyle={{justifyContent: 'space-between'}}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                  marginTop: 1,
                  paddingBottom: 70,
                  paddingHorizontal: 20,
              }}
              numColumns={2}
              data={myData} 
              renderItem={({item}) => <FilterData order={item}/>} 
              onRefresh={()=>Refreshh()}
              refreshing={loading}
          /> */}
          <FlatList
              contentContainerStyle={{
                paddingBottom: 40,
            }}
            data={myData} 
            renderItem={({item}) => <FilterData order={item}/>} 
            onRefresh={()=>Refreshh()}
            refreshing={loading}
          />
          
        </View>
    </SafeAreaView>
    
  )
}

export default AddReview

const styles = StyleSheet.create({
  root:{
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    
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
    backgroundColor: COLOR.light,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    borderRadius: 10,
    padding: 15,
   },
   text:{
    marginTop: 1,
    fontSize: 15,
    width: '100%',
    fontWeight:'bold',
    color: 'black'
   },
})