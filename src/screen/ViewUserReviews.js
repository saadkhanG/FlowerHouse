import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,Image,Dimensions, FlatList,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import usrIcon from '../../assets/images/usr.png';
import COLOR from '../consts/colors';
import orders from '../consts/orders';
import CustomFooter from '../component/CustomFooter';
import database from '@react-native-firebase/database';
import {Auth} from '../services'
import auth from '@react-native-firebase/auth';


const ViewUserReviews = ({navigation,route}) => {
    const plant = route.params
    const [loading, setLoading] = React.useState(true);
    const [activityloader, setActivityloader] = useState(true);
    const startLoading = () => {
        setActivityloader(true);
        setTimeout(() => {
            setActivityloader(false);
        }, 2000);
    };
    // Fetching Firebase............................................
    const [myData, setMyData] = useState(null);
    useEffect(() => {
      startLoading()  
      getDatabase()
      Refreshh()
    },[])
    const getDatabase = async () => {
        try {
            const data = await database().ref('review/').once("value");
            setMyData(data?.val());
        }
        catch (err) {
            console.log(err);
        }
    }
    
    // Fetching ends here................................................
    const Refreshh = () => {
        startLoading()
        getDatabase();
        setLoading(false)
    }
    const FilterData = ({order}) => {
        if (order != null) {
          if (order.name == plant.name) {
              return(
                  <ViewData order={order}/>
              );
          }  
      }
      }
    const ViewData = ({order}) => {
        return(
            <View style={{
                padding:10,
                backgroundColor:COLOR.light,
                margin:2,
                borderRadius:10,
            }}>
                <View style={{
                    alignItems: 'center',
                    borderColor: 'grey',
                    borderBottomWidth:0.5,
                    marginBottom:8,
                }}>
                    <Text style={{
                        color:COLOR.green,
                        fontSize:18,
                        fontWeight: 'bold',
                    }}>{order.name}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection:'row'
                }}>
                    <View style={{
                        alignItems:'center'
                    }}>
                        <Image source={{uri: order.image ? order.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtyPishkiWCUGbNOw8rPELb2GTLTjI9AZtZ-80MwI&s'}} style={{
                            width:150,
                            height:150,
                            borderRadius:15,
                            borderWidth:2,
                            borderColor:'grey',
                        }} />
                    </View>
                    <View style={{
                      padding:10,
                      justifyContent: 'center',
                    }}>
                      <Text style={styles.text}> Review by : {order.username ? order.username : 'Username not available'}</Text>
                    </View>
                    
                </View>
                <View style={{
                    marginTop:8, 
                    borderRadius:15,
                    borderWidth:2,
                    borderColor:COLOR.green,
                    backgroundColor: 'white',
                    padding:10,
                }}>
                    <Text style={styles.text}>{order.review}</Text>
                    
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
                    flex:0.4,
                    alignItems:'flex-start',
                    justifyContent:'center',
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                            <Image source={usrIcon}style={{
                            height:30,
                            width:30,
                            resizeMode: 'contain',
                            tintColor:COLOR.white,
                        }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex:1,
                        alignItems:'flex-start',
                        justifyContent:'center',
                    }}>
                        <Text style={{
                            fontSize: 28,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>Product Reviews</Text>
                    </View>
                </View>    
            </View>
            {/* header closed */}
            <View style={{
                backgroundColor:'white',
                padding:20,
            }}>
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
                            data={myData}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom: 120,
                            }} 
                            renderItem={({item}) => <FilterData order={item}/>} 
                            onRefresh={()=>Refreshh()}
                            refreshing={loading}
                        />
                    </>
                )}
                

            </View>
      </View>
      
    </SafeAreaView>
  )
}


export default ViewUserReviews

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
        color: 'black',
        marginTop:5,
        fontSize:15,
        fontWeight: 'bold',
    },
})