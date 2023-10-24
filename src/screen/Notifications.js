import { View, Text, StyleSheet,SafeAreaView, Dimensions, Image, TouchableOpacity,ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect }  from 'react'
import COLOR from '../consts/colors';
import dotIcon from '../../assets/images/dots.png';
import usrIcon from '../../assets/images/usr.png';
import CustomFooter from '../component/CustomFooter';
import database from '@react-native-firebase/database';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get("screen").width/2-30



const Notifications = ({navigation}) => {

  const [loading, setLoading] = React.useState(true);
  const [activityloader, setActivityloader] = useState(true);
  const startLoading = () => {
      setActivityloader(true);
      setTimeout(() => {
          setActivityloader(false);
      }, 2000);
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
      if (order.userID === auth().currentUser.uid && order.status === 'Pending') {
          return(
            <Notii order={order}/>
          );
      }  
    }    
      
  }
  const Notii = ({order}) => {
    return(
      <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", order)}>
          <View style={styles.card}>
          <Text style={{color:'black',fontWeight: 'bold',fontSize:20, color:COLOR.green}}>{order.name}</Text>
              <View style={{alignItems:'center'}}>
              </View>
              <View style={{
                flexDirection:'row',
              }}>
                  <View>
                      <Image style={{width:70, height: 100,resizeMode: 'contain'}} source={{uri: order.image}} />
                  </View>
                  <View>
                    <Text style={styles.pending}>Your order request is pending !</Text>
                    <Text style={styles.text}>Quantity : {order.quantity}</Text>
                    <Text style={styles.text}>Total Rs : {order.price}</Text>
                    <Text style={styles.text}>Date: {order.date}</Text>
                  </View>
              </View>
                  
                
          </View>
      </TouchableOpacity>
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
                  marginRight:80,
                }}>
                  <Text style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: 'bold',
                    
                  }}>Notifications</Text>
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

export default Notifications

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
    width: '100%',
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