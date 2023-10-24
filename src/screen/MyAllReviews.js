import { View, Text, StyleSheet,SafeAreaView, Dimensions, Image, 
  TouchableOpacity,ScrollView, Modal,
  FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect }  from 'react'
import COLOR from '../consts/colors';
import dotIcon from '../../assets/images/dots.png';
import usrIcon from '../../assets/images/usr.png';
import CustomFooter from '../component/CustomFooter';
import database from '@react-native-firebase/database';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';
const deviceHeight = Dimensions.get("window").height

const width = Dimensions.get("screen").width/2-30

const MyReviews = ({navigation}) => {

  const [loading, setLoading] = React.useState(true);
  const [activityloader, setActivityloader] = useState(true);
  const [show, setShow] = useState(false)
  const [DeleteNo, setDeleteNo] = useState(null);
  const startLoading = () => {
      setActivityloader(true);
      setTimeout(() => {
          setActivityloader(false);
      }, 1000);
  };
    const Refreshh = () => {
        startLoading()
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
          const data = await database().ref('review/').once("value");
          setMyData(data?.val());
          console.log(auth().currentUser.uid)
      }
      catch (err) {
          console.log(err);
      }
  }
  // Fetching ends here................................................
  const FilterData = ({order}) => {
    if (order != null) {
      if (order.userID === auth().currentUser.uid) {
          return(
            <Notii order={order}/>
          );
      }  
    }    
      
  }
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
                <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>Do you want to delete the review permanently?</Text>
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
  const RemoveData = async () => {
    console.log(DeleteNo)
    try {
      const data = await database().ref('/review/'+ DeleteNo).remove()
      .then(()=> alert('Completed'), Close(),Refreshh())
    }
    catch (err) {
        console.log(err);
    }
  }
  
  const Notii = ({order}) => {
    const DeleteReview = () => {
      setDeleteNo(order.orderID)
      Open()
    }
    return(
          <View style={styles.card}>
          <Text style={{color:'black',fontWeight: 'bold',fontSize:20, color:COLOR.green}}>{order.name}</Text>
              <View style={{alignItems:'center'}}>
              </View>
              <View style={{
                flexDirection:'row',
                alignItems:'center',
              }}>
                  <View>
                      <Image style={{width:70, height: 100,resizeMode: 'contain'}} source={{uri: order.image}} />
                  </View>
                  <View style={{
                    width:'80%'
                  }}>
                    <Text style={styles.text}>Review: {order.review}</Text>
                  </View>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                <TouchableOpacity onPress={DeleteReview}>
                  <Text style={{
                    backgroundColor: COLOR.green,
                    padding:5,
                    borderRadius: 15,
                    color: 'white',
                    paddingHorizontal: 10,
                  }}>Delete</Text>
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
                  marginRight: 90,
                }}>
                  <Text style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: 'bold',
                    
                  }}>My Reviews</Text>
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
          
          {activityloader ? (
            <>
                <ActivityIndicator
                    visible={loading}
                    textContent={'Loading...'}
                    size="small"
                />
            </>
          ):(
            <>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 70,
                    }}
                    data={myData} 
                    renderItem={({item}) => <FilterData order={item}/>} 
                    onRefresh={()=>Refreshh()}
                    refreshing={loading}
                />
                {show ? (
                    <>
                        <ModalView/>
                    </>
                ):(
                    <>
                    </>
                )}
            </>
          )}
              
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

export default MyReviews

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
    marginTop: 4,
    fontSize: 15,
    paddingLeft: 10,
    fontWeight:'bold',
    color: 'black'
   },
   pending:{
    marginTop: 4,
    fontSize: 15,
    paddingLeft: 10,
    fontWeight:'bold',
    color: 'grey'
   },
})